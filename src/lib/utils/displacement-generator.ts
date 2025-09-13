export interface Vec2 {
  x: number
  y: number
}

export interface ShaderOptions {
  width: number
  height: number
  fragment: (uv: Vec2) => Vec2
}

function smoothStep(a: number, b: number, t: number): number {
  t = Math.max(0, Math.min(1, (t - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

function length(x: number, y: number): number {
  return Math.sqrt(x * x + y * y)
}

function roundedRectSDF(x: number, y: number, width: number, height: number, radius: number): number {
  const qx = Math.abs(x) - width + radius
  const qy = Math.abs(y) - height + radius
  return Math.min(Math.max(qx, qy), 0) + length(Math.max(qx, 0), Math.max(qy, 0)) - radius
}

export const fragmentShaders = {
  liquidGlass: (uv: Vec2): Vec2 => {
    const ix = uv.x - 0.5
    const iy = uv.y - 0.5
    const distanceToEdge = roundedRectSDF(ix, iy, 0.3, 0.2, 0.6)
    const displacement = smoothStep(0.8, 0, distanceToEdge - 0.15)
    const scaled = smoothStep(0, 1, displacement)
    return { x: ix * scaled + 0.5, y: iy * scaled + 0.5 }
  },
}

export class ShaderDisplacementGenerator {
  private canvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D

  constructor(private options: ShaderOptions) {
    this.canvas = document.createElement("canvas")
    this.canvas.width = options.width
    this.canvas.height = options.height
    this.canvas.style.display = "none"

    const context = this.canvas.getContext("2d")
    if (!context) {
      throw new Error("Could not get 2D context")
    }
    this.context = context
  }

  updateShader(): string {
    const { width, height } = this.options
    const imageData = this.context.createImageData(width, height)
    const data = imageData.data

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const uv: Vec2 = { x: x / width, y: y / height }
        const pos = this.options.fragment(uv)
        
        const dx = pos.x * width - x
        const dy = pos.y * height - y
        
        const r = (dx / 10) + 0.5
        const g = (dy / 10) + 0.5
        
        const pixelIndex = (y * width + x) * 4
        data[pixelIndex] = Math.max(0, Math.min(255, r * 255))
        data[pixelIndex + 1] = Math.max(0, Math.min(255, g * 255))
        data[pixelIndex + 2] = Math.max(0, Math.min(255, g * 255))
        data[pixelIndex + 3] = 255
      }
    }

    this.context.putImageData(imageData, 0, 0)
    return this.canvas.toDataURL()
  }

  destroy(): void {
    this.canvas.remove()
  }
}