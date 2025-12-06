// Adapted from https://github.com/shuding/liquid-glass

export interface Vec2 {
  x: number;
  y: number;
}

export interface ShaderOptions {
  width: number;
  height: number;
  fragment: (uv: Vec2, mousePosition?: Vec2) => Vec2;
  mousePosition?: Vec2;
}

// Constants
const MIN_SCALE = 1;
const EDGE_SMOOTHING_FACTOR = 0.2;
const EDGE_FADE_PIXELS = 2;
const NORMALIZATION_CLAMP = { min: 0, max: 255 };

// Apple-style liquid glass constants
const FLUID_VISCOSITY = 0.85;
const REFRACTION_INTENSITY = 1.2;
const CHROMATIC_SPREAD = 0.015;
const TIME_SCALE = 0.0008;
const DEPTH_LAYERS = 3;
const ORGANIC_FLOW_SCALE = 12;
const RADIAL_DISTORTION_STRENGTH = 0.4;

// Enhanced error handling constants
const MAX_CANVAS_DIMENSION = 4096;
const MIN_CANVAS_DIMENSION = 1;
const DEFAULT_CANVAS_WIDTH = 256;
const DEFAULT_CANVAS_HEIGHT = 256;

// Utility functions
const smoothStep = (a: number, b: number, t: number): number => {
  // Add input validation
  if (typeof a !== 'number' || typeof b !== 'number' || typeof t !== 'number') {
    return 0;
  }
  
  const clamped = Math.max(0, Math.min(1, (t - a) / (b - a)));
  return clamped * clamped * (3 - 2 * clamped);
};

const calculateLength = (x: number, y: number): number => {
  // Add input validation and error handling
  if (typeof x !== 'number' || typeof y !== 'number' || isNaN(x) || isNaN(y)) {
    return 0;
  }
  
  // Prevent potential overflow
  const maxX = Math.max(Math.abs(x), Math.abs(y));
  if (maxX === 0) return 0;
  
  const scaledX = x / maxX;
  const scaledY = y / maxX;
  return maxX * Math.sqrt(scaledX * scaledX + scaledY * scaledY);
};

const roundedRectSDF = (
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
): number => {
  // Add input validation
  if (typeof x !== 'number' || typeof y !== 'number' || 
      typeof width !== 'number' || typeof height !== 'number' || 
      typeof radius !== 'number') {
    return 0;
  }
  
  const qx = Math.abs(x) - width + radius;
  const qy = Math.abs(y) - height + radius;
  return Math.min(Math.max(qx, qy), 0) + calculateLength(Math.max(qx, 0), Math.max(qy, 0)) - radius;
};

const createTexture = (x: number, y: number): Vec2 => {
  // Add input validation and clamping
  const clampedX = typeof x === 'number' && !isNaN(x) ? Math.max(0, Math.min(1, x)) : 0.5;
  const clampedY = typeof y === 'number' && !isNaN(y) ? Math.max(0, Math.min(1, y)) : 0.5;
  return { x: clampedX, y: clampedY };
};

// Validation helpers
const validateVec2 = (vec: Vec2): boolean => {
  return (
    vec && typeof vec.x === 'number' && typeof vec.y === 'number' && !isNaN(vec.x) && !isNaN(vec.y)
  );
};

const clampValue = (value: number, min: number, max: number): number => {
  // Add input validation
  if (typeof value !== 'number' || typeof min !== 'number' || typeof max !== 'number') {
    return min;
  }
  
  if (isNaN(value)) return min;
  if (isNaN(min)) return 0;
  if (isNaN(max)) return 1;
  
  return Math.max(min, Math.min(max, value));
};

// Advanced easing functions for Apple-style smooth animations
const easeInOutCubic = (t: number): number => {
  // Add input validation
  if (typeof t !== 'number' || isNaN(t)) {
    return 0;
  }
  
  const clampedT = Math.max(0, Math.min(1, t));
  return clampedT < 0.5 ? 4 * clampedT * clampedT * clampedT : 1 - Math.pow(-2 * clampedT + 2, 3) / 2;
};

const easeOutQuart = (t: number): number => {
  // Add input validation
  if (typeof t !== 'number' || isNaN(t)) {
    return 0;
  }
  
  const clampedT = Math.max(0, Math.min(1, t));
  return 1 - Math.pow(1 - clampedT, 4);
};

// Perlin-like noise for organic distortion
const noise2D = (x: number, y: number): number => {
  // Add input validation
  if (typeof x !== 'number' || typeof y !== 'number' || isNaN(x) || isNaN(y)) {
    return 0;
  }
  
  const X = Math.floor(x) & 255;
  const Y = Math.floor(y) & 255;

  const xf = x - Math.floor(x);
  const yf = y - Math.floor(y);

  const u = easeInOutCubic(xf);
  const v = easeInOutCubic(yf);

  // Simple hash-based pseudo-random
  const hash = (i: number, j: number): number => {
    // Add input validation
    if (typeof i !== 'number' || typeof j !== 'number') {
      return 0;
    }
    
    const n = i + j * 57;
    // Use a more stable hash function
    const hashed = Math.sin(n * 12.9898 + 78.233) * 43758.5453;
    return hashed - Math.floor(hashed);
  };

  const a = hash(X, Y);
  const b = hash(X + 1, Y);
  const c = hash(X, Y + 1);
  const d = hash(X + 1, Y + 1);

  const x1 = a + u * (b - a);
  const x2 = c + u * (d - c);

  return x1 + v * (x2 - x1);
};

// Multi-octave noise for complex organic patterns
const fbm = (x: number, y: number, octaves: number = 4): number => {
  // Add input validation
  if (typeof x !== 'number' || typeof y !== 'number' || isNaN(x) || isNaN(y)) {
    return 0;
  }
  
  // Clamp octaves to prevent performance issues
  const clampedOctaves = Math.max(1, Math.min(8, Math.floor(octaves)));
  
  let value = 0;
  let amplitude = 0.5;
  let frequency = 1;

  for (let i = 0; i < clampedOctaves; i++) {
    value += amplitude * noise2D(x * frequency, y * frequency);
    frequency *= 2;
    amplitude *= 0.5;
  }

  return value;
};

// Radial distortion for glass-like refraction
const calculateRadialDistortion = (x: number, y: number, strength: number): Vec2 => {
  // Add input validation
  if (typeof x !== 'number' || typeof y !== 'number' || typeof strength !== 'number' || 
      isNaN(x) || isNaN(y) || isNaN(strength)) {
    return { x: 0, y: 0 };
  }
  
  const distance = calculateLength(x, y);
  const distortion = Math.pow(Math.min(distance, 10), 2) * strength; // Limit distance to prevent extreme values

  return {
    x: x * (1 + distortion),
    y: y * (1 + distortion),
  };
};

// Chromatic aberration calculation
const calculateChromaticOffset = (x: number, y: number, intensity: number): Vec2 => {
  // Add input validation
  if (typeof x !== 'number' || typeof y !== 'number' || typeof intensity !== 'number' || 
      isNaN(x) || isNaN(y) || isNaN(intensity)) {
    return { x: 0, y: 0 };
  }
  
  const distance = calculateLength(x, y);
  // Prevent division by zero and extreme values
  if (distance === 0) {
    return { x: 0, y: 0 };
  }
  
  const angle = Math.atan2(y, x);

  return {
    x: Math.cos(angle) * distance * intensity,
    y: Math.sin(angle) * distance * intensity,
  };
};

// Advanced caustic pattern generator for glass refraction
const calculateCaustics = (x: number, y: number, time: number, intensity: number = 1): number => {
  // Add input validation
  if (typeof x !== 'number' || typeof y !== 'number' || typeof time !== 'number' || 
      typeof intensity !== 'number' || isNaN(x) || isNaN(y) || isNaN(time) || isNaN(intensity)) {
    return 0.5; // Return middle value on error
  }
  
  const scale = 8;
  const speed = 2;

  // Multiple caustic layers for realistic light refraction
  const caustic1 = Math.sin(x * scale + time * speed) * Math.cos(y * scale - time * speed);
  const caustic2 =
    Math.sin((x + 0.5) * scale * 1.3 - time * speed * 0.8) *
    Math.cos((y - 0.3) * scale * 1.3 + time * speed * 0.8);
  const caustic3 =
    Math.sin((x - 0.3) * scale * 0.7 + time * speed * 1.2) *
    Math.cos((y + 0.4) * scale * 0.7 - time * speed * 1.2);

  // Combine caustic layers with varying intensities
  const combined = caustic1 * 0.5 + caustic2 * 0.3 + caustic3 * 0.2;

  // Apply intensity and normalize to 0-1 range
  return (combined + 1) * 0.5 * intensity;
};

// Spectral dispersion for rainbow-like chromatic effects
const calculateSpectralDispersion = (
  x: number,
  y: number,
  angle: number,
  intensity: number
): { r: Vec2; g: Vec2; b: Vec2 } => {
  // Add input validation
  if (typeof x !== 'number' || typeof y !== 'number' || typeof angle !== 'number' || 
      typeof intensity !== 'number' || isNaN(x) || isNaN(y) || isNaN(angle) || isNaN(intensity)) {
    return {
      r: { x: 0, y: 0 },
      g: { x: 0, y: 0 },
      b: { x: 0, y: 0 }
    };
  }
  
  const distance = calculateLength(x, y);
  const dispersionStrength = Math.min(distance * intensity, 1); // Limit strength to prevent extreme values

  // Different wavelengths refract at different angles (like a prism)
  const redOffset = dispersionStrength * 0.8;
  const greenOffset = dispersionStrength * 1.0;
  const blueOffset = dispersionStrength * 1.2;

  return {
    r: {
      x: Math.cos(angle) * redOffset,
      y: Math.sin(angle) * redOffset,
    },
    g: {
      x: Math.cos(angle) * greenOffset,
      y: Math.sin(angle) * greenOffset,
    },
    b: {
      x: Math.cos(angle) * blueOffset,
      y: Math.sin(angle) * blueOffset,
    },
  };
};

// Parallax depth offset calculation for multi-layer effects
const calculateParallaxOffset = (
  x: number,
  y: number,
  depth: number,
  mouseX: number = 0,
  mouseY: number = 0
): Vec2 => {
  // Add input validation
  if (typeof x !== 'number' || typeof y !== 'number' || typeof depth !== 'number' || 
      typeof mouseX !== 'number' || typeof mouseY !== 'number' || 
      isNaN(x) || isNaN(y) || isNaN(depth) || isNaN(mouseX) || isNaN(mouseY)) {
    return { x: 0, y: 0 };
  }
  
  const parallaxStrength = Math.min(0.02 * depth, 0.1); // Limit strength to prevent extreme values

  // Calculate offset based on view angle (simulated by mouse position)
  const offsetX = (x - mouseX) * parallaxStrength;
  const offsetY = (y - mouseY) * parallaxStrength;

  return { x: offsetX, y: offsetY };
};

// Volumetric density for depth perception and scattering
const calculateVolumetricDensity = (x: number, y: number, depth: number, time: number): number => {
  // Add input validation
  if (typeof x !== 'number' || typeof y !== 'number' || typeof depth !== 'number' || 
      typeof time !== 'number' || isNaN(x) || isNaN(y) || isNaN(depth) || isNaN(time)) {
    return 0.5; // Return middle value on error
  }
  
  const noiseValue = fbm(x * 5 + time * 0.5, y * 5 - time * 0.5, 3);
  const depthFalloff = Math.exp(-Math.max(0, depth) * 2); // Ensure depth is not negative

  return noiseValue * depthFalloff * 0.5 + 0.5;
};

// Advanced turbulence for organic glass distortion
const calculateTurbulence = (x: number, y: number, time: number, octaves: number = 5): number => {
  // Add input validation
  if (typeof x !== 'number' || typeof y !== 'number' || typeof time !== 'number' || 
      typeof octaves !== 'number' || isNaN(x) || isNaN(y) || isNaN(time) || isNaN(octaves)) {
    return 0;
  }
  
  // Clamp octaves to prevent performance issues
  const clampedOctaves = Math.max(1, Math.min(8, Math.floor(octaves)));
  
  let turbulence = 0;
  let amplitude = 1;
  let frequency = 1;

  for (let i = 0; i < clampedOctaves; i++) {
    const noiseVal = Math.abs(noise2D(x * frequency + time, y * frequency - time));
    turbulence += noiseVal * amplitude;
    frequency *= 2;
    amplitude *= 0.5;
  }

  return turbulence;
};

// Micro-surface detail for high-quality glass texture
const calculateMicroSurface = (x: number, y: number, time: number): number => {
  // Add input validation
  if (typeof x !== 'number' || typeof y !== 'number' || typeof time !== 'number' || 
      isNaN(x) || isNaN(y) || isNaN(time)) {
    return 0.5; // Return middle value on error
  }
  
  const highFreqNoise = fbm(x * 40 + time * 0.3, y * 40 - time * 0.3, 6);
  const microDetail = fbm(x * 80, y * 80, 4);

  return (highFreqNoise * 0.7 + microDetail * 0.3) * 0.5;
};

// Shader fragment functions for different effects
export const fragmentShaders = {
  liquidGlass: (uv: Vec2, mousePosition?: Vec2): Vec2 => {
    if (!validateVec2(uv)) {
      return { x: 0.5, y: 0.5 };
    }

    const ix = uv.x - 0.5;
    const iy = uv.y - 0.5;
    const time = Date.now() * TIME_SCALE;

    // Enhanced distortion with mouse influence
    const mouseX = mousePosition && validateVec2(mousePosition) ? mousePosition.x - 0.5 : 0;
    const mouseY = mousePosition && validateVec2(mousePosition) ? mousePosition.y - 0.5 : 0;
    const mouseDistance = calculateLength(mouseX, mouseY);
    const mouseFalloff = easeOutQuart(1 - Math.min(mouseDistance * 2, 1));

    // Multi-layered organic distortion using FBM noise
    const noiseScale = ORGANIC_FLOW_SCALE;
    const organicFlow =
      fbm(
        (ix + mouseX * 0.5) * noiseScale + time,
        (iy + mouseY * 0.5) * noiseScale + time * 0.7,
        3
      ) - 0.5;

    // Enhanced Apple-like liquid distortion with rounded rect SDF
    const distanceToEdge = roundedRectSDF(ix, iy, 0.4, 0.3, 0.35);
    const baseDisplacement = smoothStep(0.8, 0, distanceToEdge - 0.05);

    // Radial distortion for glass-like refraction
    const radialDist = calculateRadialDistortion(ix, iy, RADIAL_DISTORTION_STRENGTH * 0.1);
    const refractionX = (radialDist.x - ix) * REFRACTION_INTENSITY * baseDisplacement;
    const refractionY = (radialDist.y - iy) * REFRACTION_INTENSITY * baseDisplacement;

    // Apple-style liquid flow with time-based animation
    const flowX = Math.sin((ix + mouseX * 2) * 8 + time * 2) * 0.018;
    const flowY = Math.cos((iy + mouseY * 2) * 8 + time * 1.5) * 0.018;

    // Multi-directional ripples with mouse influence
    const ripple1 = Math.sin((ix - mouseX) * 12 + (iy - mouseY) * 12 + time * 3) * 0.015;
    const ripple2 = Math.cos((ix + mouseX) * 10 - (iy - mouseY) * 10 - time * 2) * 0.012;
    const rippleEffect = (ripple1 + ripple2) * mouseFalloff * mouseDistance;

    // Depth-based layering for premium glass effect
    const depthLayer1 = Math.sin(ix * 15 + time) * Math.cos(iy * 15 - time) * 0.008;
    const depthLayer2 = Math.sin(ix * 20 - time * 0.5) * Math.cos(iy * 20 + time * 0.5) * 0.006;
    const depthEffect = (depthLayer1 + depthLayer2) * baseDisplacement;

    // Combine all distortion effects with fluid viscosity
    const liquidFlow = (flowX + flowY + organicFlow * 0.025) * FLUID_VISCOSITY;
    const totalDistortionX = refractionX + liquidFlow + rippleEffect + depthEffect;
    const totalDistortionY = refractionY + liquidFlow * 0.8 + rippleEffect * 0.9 + depthEffect;

    // Apply chromatic aberration for premium glass look
    const chromaticOffset = calculateChromaticOffset(ix, iy, CHROMATIC_SPREAD * baseDisplacement);

    const displacement = baseDisplacement * 1.15;
    const scaled = smoothStep(0, 1, displacement);

    // Final position with all effects combined
    const finalX = ix + totalDistortionX + chromaticOffset.x * 0.5;
    const finalY = iy + totalDistortionY + chromaticOffset.y * 0.5;

    return createTexture(
      clampValue(finalX * scaled + 0.5, 0, 1),
      clampValue(finalY * scaled + 0.5, 0, 1)
    );
  },

  // Premium Apple-style fluid glass with enhanced organic flow
  appleFluid: (uv: Vec2, mousePosition?: Vec2): Vec2 => {
    if (!validateVec2(uv)) {
      return { x: 0.5, y: 0.5 };
    }

    const ix = uv.x - 0.5;
    const iy = uv.y - 0.5;
    const time = Date.now() * TIME_SCALE * 0.6;

    const mouseX = mousePosition && validateVec2(mousePosition) ? mousePosition.x - 0.5 : 0;
    const mouseY = mousePosition && validateVec2(mousePosition) ? mousePosition.y - 0.5 : 0;
    const mouseDistance = calculateLength(mouseX, mouseY);
    const mouseFalloff = easeOutQuart(1 - Math.min(mouseDistance * 1.5, 1));

    // High-quality organic distortion with multiple octaves
    const organicX = fbm((ix + mouseX * 0.3) * 10 + time, (iy + mouseY * 0.3) * 10, 5) - 0.5;
    const organicY = fbm((ix - mouseX * 0.3) * 10, (iy - mouseY * 0.3) * 10 + time * 0.8, 5) - 0.5;

    // Smooth rounded rectangle mask
    const distanceToEdge = roundedRectSDF(ix, iy, 0.42, 0.32, 0.38);
    const mask = smoothStep(0.85, -0.1, distanceToEdge);

    // Fluid dynamics simulation
    const fluidVelocityX = Math.sin(ix * 6 + time * 2) * Math.cos(iy * 4 - time) * 0.025;
    const fluidVelocityY = Math.cos(ix * 4 - time) * Math.sin(iy * 6 + time * 2) * 0.025;

    // Mouse-driven vortex effect
    const vortexAngle = Math.atan2(iy - mouseY, ix - mouseX);
    const vortexStrength = mouseFalloff * mouseDistance * 0.08;
    const vortexX = Math.cos(vortexAngle + time) * vortexStrength;
    const vortexY = Math.sin(vortexAngle + time) * vortexStrength;

    // Combine effects with premium smoothing
    const totalX = ix + (organicX * 0.035 + fluidVelocityX + vortexX) * mask;
    const totalY = iy + (organicY * 0.035 + fluidVelocityY + vortexY) * mask;

    return createTexture(clampValue(totalX + 0.5, 0, 1), clampValue(totalY + 0.5, 0, 1));
  },

  // High-end glass with advanced refraction and depth
  premiumGlass: (uv: Vec2, mousePosition?: Vec2): Vec2 => {
    if (!validateVec2(uv)) {
      return { x: 0.5, y: 0.5 };
    }

    const ix = uv.x - 0.5;
    const iy = uv.y - 0.5;
    const time = Date.now() * TIME_SCALE * 0.4;

    const mouseX = mousePosition && validateVec2(mousePosition) ? mousePosition.x - 0.5 : 0;
    const mouseY = mousePosition && validateVec2(mousePosition) ? mousePosition.y - 0.5 : 0;
    const mouseDistance = calculateLength(mouseX, mouseY);

    // Advanced radial distortion with depth
    const centerDistance = calculateLength(ix, iy);
    const refractionStrength = Math.pow(Math.min(centerDistance, 1), 1.5) * 0.3; // Limit centerDistance
    const refractionAngle = Math.atan2(iy, ix);

    // Multi-layer depth effect
    let depthX = 0;
    let depthY = 0;
    for (let layer = 0; layer < DEPTH_LAYERS; layer++) {
      const layerScale = (layer + 1) * 5;
      const layerTime = time * (1 + layer * 0.3);
      const layerStrength = 0.01 / (layer + 1);

      depthX += Math.sin(ix * layerScale + layerTime) * layerStrength;
      depthY += Math.cos(iy * layerScale - layerTime) * layerStrength;
    }

    // Glass refraction with mouse influence
    const refractionX = Math.cos(refractionAngle) * refractionStrength * (1 + mouseDistance * 0.5);
    const refractionY = Math.sin(refractionAngle) * refractionStrength * (1 + mouseDistance * 0.5);

    // Subtle organic movement
    const organicNoise = fbm(ix * 8 + time, iy * 8 - time, 2) - 0.5;

    // Edge-aware distortion
    const distanceToEdge = roundedRectSDF(ix, iy, 0.43, 0.33, 0.36);
    const edgeMask = smoothStep(0.9, -0.05, distanceToEdge);

    const finalX = ix + (refractionX + depthX + organicNoise * 0.015) * edgeMask;
    const finalY = iy + (refractionY + depthY + organicNoise * 0.015) * edgeMask;

    return createTexture(clampValue(finalX + 0.5, 0, 1), clampValue(finalY + 0.5, 0, 1));
  },

  // Metallic liquid effect with shimmer
  liquidMetal: (uv: Vec2, mousePosition?: Vec2): Vec2 => {
    if (!validateVec2(uv)) {
      return { x: 0.5, y: 0.5 };
    }

    const ix = uv.x - 0.5;
    const iy = uv.y - 0.5;
    const time = Date.now() * TIME_SCALE * 1.2;

    const mouseX = mousePosition && validateVec2(mousePosition) ? mousePosition.x - 0.5 : 0;
    const mouseY = mousePosition && validateVec2(mousePosition) ? mousePosition.y - 0.5 : 0;

    // Metallic wave patterns
    const wave1 = Math.sin(ix * 20 + time * 4) * Math.cos(iy * 15 - time * 3) * 0.02;
    const wave2 = Math.cos(ix * 15 - time * 2) * Math.sin(iy * 20 + time * 5) * 0.015;

    // Shimmer effect
    const shimmer = fbm(ix * 25 + time * 2, iy * 25 - time * 2, 4) * 0.025;

    // Mouse interaction with metallic flow
    const flowAngle = Math.atan2(iy - mouseY, ix - mouseX);
    const flowDistance = calculateLength(ix - mouseX, iy - mouseY);
    const flowEffect =
      Math.sin(flowDistance * 15 - time * 6) *
      0.02 *
      easeOutQuart(1 - Math.min(flowDistance * 2, 1));

    const distanceToEdge = roundedRectSDF(ix, iy, 0.41, 0.31, 0.37);
    const mask = smoothStep(0.88, -0.08, distanceToEdge);

    const totalX = ix + (wave1 + shimmer + Math.cos(flowAngle) * flowEffect) * mask;
    const totalY = iy + (wave2 + shimmer * 0.8 + Math.sin(flowAngle) * flowEffect) * mask;

    return createTexture(clampValue(totalX + 0.5, 0, 1), clampValue(totalY + 0.5, 0, 1));
  },

  // basiBasi - Expert Premium Glass Shader
  // The most advanced shader with caustics, spectral dispersion, parallax depth, and volumetric effects
  basiBasi: (uv: Vec2, mousePosition?: Vec2): Vec2 => {
    if (!validateVec2(uv)) {
      return { x: 0.5, y: 0.5 };
    }

    const ix = uv.x - 0.5;
    const iy = uv.y - 0.5;
    const time = Date.now() * TIME_SCALE * 0.5;

    // Mouse interaction setup
    const mouseX = mousePosition && validateVec2(mousePosition) ? mousePosition.x - 0.5 : 0;
    const mouseY = mousePosition && validateVec2(mousePosition) ? mousePosition.y - 0.5 : 0;
    const mouseDistance = calculateLength(mouseX, mouseY);
    const mouseFalloff = easeOutQuart(1 - Math.min(mouseDistance * 1.2, 1));

    // === CAUSTIC LIGHT PATTERNS ===
    // Simulate light refraction through glass creating caustic patterns
    const causticIntensity = calculateCaustics(ix, iy, time, 0.8);
    const causticDistortion = (causticIntensity - 0.5) * 0.02;

    // === SPECTRAL DISPERSION ===
    // Rainbow-like chromatic effects from light splitting
    const refractionAngle = Math.atan2(iy, ix);
    const spectralDispersion = calculateSpectralDispersion(ix, iy, refractionAngle, 0.025);

    // Average the RGB channels for displacement (simulating prism effect)
    const spectralX =
      (spectralDispersion.r.x + spectralDispersion.g.x + spectralDispersion.b.x) / 3;
    const spectralY =
      (spectralDispersion.r.y + spectralDispersion.g.y + spectralDispersion.b.y) / 3;

    // === MULTI-LAYER PARALLAX DEPTH ===
    // Create depth perception with 7 layers
    let parallaxX = 0;
    let parallaxY = 0;
    const numParallaxLayers = 7;

    for (let layer = 0; layer < numParallaxLayers; layer++) {
      const depth = (layer + 1) / numParallaxLayers;
      const parallaxOffset = calculateParallaxOffset(ix, iy, depth, mouseX, mouseY);

      // Layer-specific distortion
      const layerNoise =
        fbm(
          (ix + parallaxOffset.x) * (8 + layer * 2) + time * (0.5 + layer * 0.1),
          (iy + parallaxOffset.y) * (8 + layer * 2) - time * (0.5 + layer * 0.1),
          3
        ) - 0.5;

      const layerWeight = 1 / (layer + 1);
      parallaxX += (parallaxOffset.x + layerNoise * 0.01) * layerWeight;
      parallaxY += (parallaxOffset.y + layerNoise * 0.01) * layerWeight;
    }

    // Normalize parallax effect
    parallaxX /= numParallaxLayers;
    parallaxY /= numParallaxLayers;

    // === VOLUMETRIC SCATTERING ===
    // Simulate light scattering through glass volume
    const volumetricDensity = calculateVolumetricDensity(ix, iy, 0.5, time);
    const scatteringX = Math.cos(refractionAngle) * volumetricDensity * 0.015;
    const scatteringY = Math.sin(refractionAngle) * volumetricDensity * 0.015;

    // === ADVANCED TURBULENCE ===
    // High-quality organic distortion
    const turbulence = calculateTurbulence(ix * 6, iy * 6, time, 6);
    const turbulenceX = Math.cos(turbulence * Math.PI * 2) * 0.012;
    const turbulenceY = Math.sin(turbulence * Math.PI * 2) * 0.012;

    // === MICRO-SURFACE DETAIL ===
    // Fine glass texture details
    const microSurface = calculateMicroSurface(ix, iy, time);
    const microDetailX = (microSurface - 0.5) * 0.008;
    const microDetailY = (microSurface - 0.5) * 0.008;

    // === ADVANCED RADIAL REFRACTION ===
    // Enhanced glass-like refraction with depth
    const centerDistance = calculateLength(ix, iy);
    const refractionStrength = Math.pow(Math.min(centerDistance, 1), 1.8) * 0.35; // Limit centerDistance
    const dynamicRefraction = refractionStrength * (1 + mouseFalloff * mouseDistance * 0.8);

    const refractionX = Math.cos(refractionAngle) * dynamicRefraction;
    const refractionY = Math.sin(refractionAngle) * dynamicRefraction;

    // === MOUSE-DRIVEN VORTEX ===
    // Interactive swirl effect
    const vortexAngle = Math.atan2(iy - mouseY, ix - mouseX);
    const vortexDistance = calculateLength(ix - mouseX, iy - mouseY);
    const vortexStrength = mouseFalloff * Math.sin(vortexDistance * 10 - time * 3) * 0.025;
    const vortexX = Math.cos(vortexAngle + time * 2) * vortexStrength;
    const vortexY = Math.sin(vortexAngle + time * 2) * vortexStrength;

    // === FLUID DYNAMICS ===
    // Liquid-like flow patterns
    const fluidX =
      Math.sin(ix * 10 + mouseX * 5 + time * 2.5) * Math.cos(iy * 8 - time * 2) * 0.018;
    const fluidY =
      Math.cos(ix * 8 - time * 2) * Math.sin(iy * 10 + mouseY * 5 + time * 2.5) * 0.018;

    // === RIPPLE EFFECTS ===
    // Multi-directional wave propagation
    const ripple1 = Math.sin(Math.min(centerDistance, 10) * 15 - time * 4) * 0.012; // Limit centerDistance
    const ripple2 = Math.cos(Math.min(centerDistance, 10) * 20 + time * 3) * 0.008; // Limit centerDistance
    const rippleEffect = (ripple1 + ripple2) * mouseFalloff;
    const rippleX = Math.cos(refractionAngle) * rippleEffect;
    const rippleY = Math.sin(refractionAngle) * rippleEffect;

    // === EDGE-AWARE MASKING ===
    // Smooth rounded rectangle with premium edge handling
    const distanceToEdge = roundedRectSDF(ix, iy, 0.44, 0.34, 0.39);
    const edgeMask = smoothStep(0.92, -0.12, distanceToEdge);
    const edgeSoftness = smoothStep(0.85, 0.1, distanceToEdge);

    // === COMBINE ALL EFFECTS ===
    // Layer all distortions with proper weighting
    const totalDistortionX =
      (refractionX * 1.2 +
        spectralX * 0.8 +
        parallaxX * 1.5 +
        scatteringX * 0.9 +
        turbulenceX * 1.0 +
        microDetailX * 0.6 +
        vortexX * 1.3 +
        fluidX * 1.1 +
        rippleX * 0.7 +
        causticDistortion) *
      edgeMask *
      edgeSoftness;

    const totalDistortionY =
      (refractionY * 1.2 +
        spectralY * 0.8 +
        parallaxY * 1.5 +
        scatteringY * 0.9 +
        turbulenceY * 1.0 +
        microDetailY * 0.6 +
        vortexY * 1.3 +
        fluidY * 1.1 +
        rippleY * 0.7 +
        causticDistortion * 0.8) *
      edgeMask *
      edgeSoftness;

    // === FINAL POSITION ===
    // Apply all distortions with smooth falloff
    const finalX = ix + totalDistortionX * 0.85; // Scale down for subtlety
    const finalY = iy + totalDistortionY * 0.85;

    return createTexture(clampValue(finalX + 0.5, 0, 1), clampValue(finalY + 0.5, 0, 1));
  },
};

export type FragmentShaderType = keyof typeof fragmentShaders;

export class ShaderDisplacementGenerator {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private canvasDPI = 1;

  constructor(private options: ShaderOptions) {
    if (!this.validateOptions(options)) {
      throw new Error('Invalid shader options provided');
    }

    this.canvas = document.createElement('canvas');
    // Enhanced validation for canvas dimensions
    this.canvas.width = Math.max(MIN_CANVAS_DIMENSION, 
                               Math.min(MAX_CANVAS_DIMENSION, 
                                       Math.round(options.width * this.canvasDPI || DEFAULT_CANVAS_WIDTH)));
    this.canvas.height = Math.max(MIN_CANVAS_DIMENSION, 
                                 Math.min(MAX_CANVAS_DIMENSION, 
                                         Math.round(options.height * this.canvasDPI || DEFAULT_CANVAS_HEIGHT)));
    this.canvas.style.display = 'none';

    const context = this.canvas.getContext('2d');
    if (!context) {
      throw new Error('AtomixGlass: Could not get 2D canvas context');
    }
    this.context = context;
  }

  private validateOptions(options: ShaderOptions): boolean {
    try {
      return (
        options &&
        typeof options.width === 'number' &&
        options.width > 0 &&
        options.width <= MAX_CANVAS_DIMENSION &&
        typeof options.height === 'number' &&
        options.height > 0 &&
        options.height <= MAX_CANVAS_DIMENSION &&
        typeof options.fragment === 'function'
      );
    } catch (e) {
      // Graceful error handling
      return false;
    }
  }

  updateShader(mousePosition?: Vec2): string {
    try {
      const w = this.options.width * this.canvasDPI;
      const h = this.options.height * this.canvasDPI;

      let maxScale = 0;
      const rawValues: number[] = [];

      // Calculate displacement values with enhanced smoothing
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const uv: Vec2 = { x: x / w, y: y / h };

          const pos = this.options.fragment(uv, mousePosition);
          let dx = pos.x * w - x;
          let dy = pos.y * h - y;

          // Apply edge smoothing for Apple-like effect
          const edgeX = Math.min(x / w, (w - x) / w) * 2;
          const edgeY = Math.min(y / h, (h - y) / h) * 2;
          const edgeFactor = Math.min(edgeX, edgeY);

          dx *= smoothStep(0, EDGE_SMOOTHING_FACTOR, edgeFactor);
          dy *= smoothStep(0, EDGE_SMOOTHING_FACTOR, edgeFactor);

          maxScale = Math.max(maxScale, Math.abs(dx), Math.abs(dy));
          rawValues.push(dx, dy);
        }
      }

      // Improved normalization to prevent artifacts while maintaining intensity
      maxScale = Math.max(maxScale, MIN_SCALE);

      // Create ImageData and fill it
      const imageData = this.context.createImageData(w, h);
      const data = imageData.data;

      // Convert to image data with smoother normalization
      let rawIndex = 0;
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const dx = rawValues[rawIndex++] || 0;
          const dy = rawValues[rawIndex++] || 0;

          // Smooth the displacement values at edges to prevent hard transitions
          const edgeDistance = Math.min(x, y, w - x - 1, h - y - 1);
          const edgeFactor = Math.min(1, edgeDistance / EDGE_FADE_PIXELS);

          const smoothedDx = dx * edgeFactor;
          const smoothedDy = dy * edgeFactor;

          const r = smoothedDx / maxScale + 0.5;
          const g = smoothedDy / maxScale + 0.5;

          const pixelIndex = (y * w + x) * 4;
          data[pixelIndex] = clampValue(r * 255, NORMALIZATION_CLAMP.min, NORMALIZATION_CLAMP.max); // Red channel (X displacement)
          data[pixelIndex + 1] = clampValue(
            g * 255,
            NORMALIZATION_CLAMP.min,
            NORMALIZATION_CLAMP.max
          ); // Green channel (Y displacement)
          data[pixelIndex + 2] = clampValue(
            g * 255,
            NORMALIZATION_CLAMP.min,
            NORMALIZATION_CLAMP.max
          ); // Blue channel (Y displacement for SVG filter compatibility)
          data[pixelIndex + 3] = 255; // Alpha channel
        }
      }

      this.context.putImageData(imageData, 0, 0);
      return this.canvas.toDataURL();
    } catch (error) {
      // Graceful fallback on error
      console.warn('ShaderDisplacementGenerator: Error generating shader map, using fallback', error);
      return ''; // Return empty string as fallback
    }
  }

  destroy(): void {
    try {
      // Clear canvas data to free memory
      if (this.context) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
      // Reduce memory footprint by setting dimensions to 0
      this.canvas.width = 0;
      this.canvas.height = 0;
      // Remove from DOM
      this.canvas.remove();
    } catch (e) {
      // Silently handle cleanup errors
      console.warn('ShaderDisplacementGenerator: Error during cleanup', e);
    }
  }

  getScale(): number {
    return this.canvasDPI;
  }
}