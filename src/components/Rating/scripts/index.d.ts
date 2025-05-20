declare module './scripts' {
  export default class Rating {
    constructor(element: HTMLElement, options?: any);
    init(): void;
    handleMouseMove(e: MouseEvent): void;
    handleMouseLeave(): void;
    handleClick(e: MouseEvent): void;
    setValue(value: number): void;
    updateStarsDisplay(value: number, isHover?: boolean): void;
    destroy(): void;
  }
}
