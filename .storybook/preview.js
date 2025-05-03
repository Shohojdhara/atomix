// Import the main styles
import '../src/styles/index.scss';

// Set up the decorator for theme switching
export const decorators = [
  (Story, context) => {
    const { globals } = context;
    const colorMode = globals.colorMode || 'light';
    
    // Update the data-atomix-theme attribute on the root element
    document.documentElement.setAttribute('data-atomix-theme', colorMode);
    
    return Story();
  },
];

// Using ES Modules export syntax instead of CommonJS
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

// Define global values that can be controlled in the toolbar
export const globalTypes = {
  colorMode: {
    name: 'Color Mode',
    description: 'Global color mode for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: [
        { value: 'light', icon: 'circlehollow', title: 'Light Mode' },
        { value: 'dark', icon: 'circle', title: 'Dark Mode' },
      ],
      showName: true,
    },
  },
};