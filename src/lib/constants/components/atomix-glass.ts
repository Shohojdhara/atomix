/**
 * AtomixGlass-specific constants
 */
export const ATOMIX_GLASS = {
  BASE_CLASS: 'c-atomix-glass',
  CONTAINER_CLASS: 'c-atomix-glass__container',
  INNER_CLASS: 'c-atomix-glass__inner',
  FILTER_CLASS: 'c-atomix-glass__filter',
  FILTER_OVERLAY_CLASS: 'c-atomix-glass__filter-overlay',
  FILTER_SHADOW_CLASS: 'c-atomix-glass__filter-shadow',
  CONTENT_CLASS: 'c-atomix-glass__content',
  BORDER_1_CLASS: 'c-atomix-glass__border-1',
  BORDER_2_CLASS: 'c-atomix-glass__border-2',
  HOVER_1_CLASS: 'c-atomix-glass__hover-1',
  HOVER_2_CLASS: 'c-atomix-glass__hover-2',
  HOVER_3_CLASS: 'c-atomix-glass__hover-3',
  BASE_LAYER_CLASS: 'c-atomix-glass__base',
  OVERLAY_LAYER_CLASS: 'c-atomix-glass__overlay',
  OVERLAY_HIGHLIGHT_CLASS: 'c-atomix-glass__overlay-highlight',
  BACKGROUND_LAYER_CLASS: 'c-atomix-glass__background-layer',
  BACKGROUND_LAYER_DARK_CLASS: 'c-atomix-glass__background-layer--dark',
  BACKGROUND_LAYER_BLACK_CLASS: 'c-atomix-glass__background-layer--black',
  BACKGROUND_LAYER_OVER_LIGHT_CLASS: 'c-atomix-glass__background-layer--over-light',
  BACKGROUND_LAYER_HIDDEN_CLASS: 'c-atomix-glass__background-layer--hidden',
  VARIANT_PREFIX: 'c-atomix-glass--',
  MODE_PREFIX: 'c-atomix-glass--',
  CLASSES: {
    BASE: 'c-atomix-glass',
    CONTAINER: 'c-atomix-glass__container',
    INNER: 'c-atomix-glass__inner',
    FILTER: 'c-atomix-glass__filter',
    CONTENT: 'c-atomix-glass__content',
    ACTIVE: 'active',
    OVER_LIGHT: 'c-atomix-glass__container--over-light',
    // Mode variants
    STANDARD: 'c-atomix-glass--standard',
    POLAR: 'c-atomix-glass--polar',
    PROMINENT: 'c-atomix-glass--prominent',
    SHADER: 'c-atomix-glass--shader',
  },
  DEFAULTS: {
    DISPLACEMENT_SCALE: 20,
    BLUR_AMOUNT: 1,
    SATURATION: 140,
    ABERRATION_INTENSITY: 2.5,
    ELASTICITY: 0.05,
    CORNER_RADIUS: 16, // Default border-radius matching design system
    PADDING: '0 0',
    MODE: 'standard' as const,
    OVER_LIGHT: false as const,
    ENABLE_OVER_LIGHT_LAYERS: true,
  },
  CONSTANTS: {
    ACTIVATION_ZONE: 200,
    MIN_BLUR: 0.1,
    MOUSE_INFLUENCE_DIVISOR: 100,
    EDGE_FADE_PIXELS: 2,
    // Note: This default must match the SCSS variable --atomix-radius-md
    // @see src/styles/01-settings/_settings.global.scss
    DEFAULT_CORNER_RADIUS: 16,
    MAX_SIZE: 4096, // Maximum width/height for glass size

    // Palette for internal calculations (matches design system base colors)
    PALETTE: {
      WHITE: '255, 255, 255',
      BLACK: '0, 0, 0',
    },

    // Gradient calculation constants
    GRADIENT: {
      BASE_ANGLE: 135, // Base angle for border gradients (degrees)
      ANGLE_MULTIPLIER: 1.2, // Multiplier for mouse influence on angle
      BORDER_STOP_1: {
        MIN: 10, // Minimum percentage for border stop 1
        BASE: 33, // Base percentage for border stop 1
        MULTIPLIER: 0.3, // Multiplier for mouse Y influence
      },
      BORDER_STOP_2: {
        MAX: 90, // Maximum percentage for border stop 2
        BASE: 66, // Base percentage for border stop 2
        MULTIPLIER: 0.4, // Multiplier for mouse Y influence
      },
      BORDER_OPACITY: {
        BASE_1: 0.12, // Base opacity for border gradient 1
        BASE_2: 0.4, // Base opacity for border gradient 2
        BASE_3: 0.32, // Base opacity for border gradient 3
        BASE_4: 0.6, // Base opacity for border gradient 4
        MULTIPLIER_LOW: 0.008, // Low multiplier for mouse influence on opacity
        MULTIPLIER_HIGH: 0.012, // High multiplier for mouse influence on opacity
      },
      CENTER_POSITION: 50, // Center position percentage (50%)
      HOVER_POSITION: {
        DIVISOR_1: 2, // Divisor for hover 1 position calculation
        DIVISOR_2: 1.5, // Divisor for hover 2 position calculation
        MULTIPLIER_3: 1, // Direct multiplier for hover 3 (no division)
      },
      BASE_LAYER_MULTIPLIER: 0.5, // Multiplier for base layer position
    },

    // Gradient opacity values for hover effects
    GRADIENT_OPACITY: {
      HOVER_1: {
        BLACK_START: 0.3, // Start opacity for black hover 1
        BLACK_MID: 0.1, // Mid opacity for black hover 1
        BLACK_STOP: 30, // Stop percentage for black hover 1
        BLACK_END: 60, // End percentage for black hover 1
        WHITE_START: 0.5, // Start opacity for white hover 1
        WHITE_STOP: 50, // Stop percentage for white hover 1
      },
      HOVER_2: {
        BLACK_START: 0.4, // Start opacity for black hover 2
        BLACK_MID: 0.15, // Mid opacity for black hover 2
        BLACK_STOP: 40, // Stop percentage for black hover 2
        BLACK_END: 80, // End percentage for black hover 2
        WHITE_START: 1, // Start opacity for white hover 2
        WHITE_STOP: 80, // Stop percentage for white hover 2
      },
      HOVER_3: {
        BLACK_START: 0.5, // Start opacity for black hover 3
        BLACK_MID: 0.2, // Mid opacity for black hover 3
        BLACK_STOP: 50, // Stop percentage for black hover 3
        BLACK_END: 100, // End percentage for black hover 3
        WHITE_START: 1, // Start opacity for white hover 3
        WHITE_STOP: 100, // Stop percentage for white hover 3
      },
    },

    // Base and overlay gradient constants
    BASE_GRADIENT: {
      ANGLE: 135, // Gradient angle in degrees
      BLACK_START_BASE: 0.15, // Base start opacity for black
      BLACK_START_MULTIPLIER: 0.003, // Multiplier for mouse X influence on start
      BLACK_MID_BASE: 0.1, // Base mid opacity for black
      BLACK_MID_MULTIPLIER: 0.002, // Multiplier for mouse Y influence on mid
      BLACK_MID_STOP: 50, // Mid stop percentage
      BLACK_END_BASE: 0.18, // Base end opacity for black
      BLACK_END_MULTIPLIER: 0.004, // Multiplier for mouse X influence on end
      WHITE_OPACITY: 0.1, // White opacity for non-overlight mode
    },

    OVERLAY_GRADIENT: {
      BLACK_START_BASE: 0.12, // Base start opacity for black overlay
      BLACK_START_MULTIPLIER: 0.003, // Multiplier for mouse X influence on start
      BLACK_MID: 0.06, // Mid opacity for black overlay
      BLACK_MID_STOP: 40, // Mid stop percentage
      BLACK_END_BASE: 0.15, // Base end opacity for black overlay
      BLACK_END_MULTIPLIER: 0.003, // Multiplier for mouse Y influence on end
      WHITE_OPACITY: 0.05, // White opacity for non-overlight mode
    },

    // Overlay highlight constants
    OVERLAY_HIGHLIGHT: {
      POSITION_X: 20, // X position percentage
      POSITION_Y: 20, // Y position percentage
      WHITE_OPACITY: 0.4, // White opacity in gradient
      STOP: 60, // Stop percentage
      OPACITY_MULTIPLIER: 0.7, // Multiplier for overlay highlight opacity
    },

    // Displacement and aberration multipliers
    MULTIPLIERS: {
      SHADER_DISPLACEMENT: 0.8, // Displacement scale multiplier for shader mode
      OVER_LIGHT_DISPLACEMENT: 0.6, // Displacement scale multiplier for over-light mode
      SHADER_ABERRATION: 0.7, // Aberration intensity multiplier for shader mode
    },

    // Saturation constants
    SATURATION: {
      HIGH_CONTRAST: 200, // Saturation value for high contrast mode
    },
  },
};
