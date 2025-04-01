declare module 'gsap' {
  export interface GSAPTweenVars {
    [key: string]: any;
    delay?: number;
    duration?: number;
    ease?: string;
    onComplete?: () => void;
    opacity?: number;
    y?: number;
  }

  export function to(
    targets: Element | Element[] | string,
    vars: GSAPTweenVars
  ): void;
}