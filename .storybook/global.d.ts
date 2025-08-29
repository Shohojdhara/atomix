// .storybook/global.d.ts
declare module '@storybook/manager-api' {
  export interface API {
    getCurrentStoryData(): any;
  }
}

declare module '@storybook/components' {
  export const Icons: any;
  export const IconButton: any;
}

declare module '@storybook/theming' {
  export interface ThemeVars {
    colorSecondary: string;
  }
}