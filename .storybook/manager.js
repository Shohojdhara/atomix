import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';
import packageJson from '../package.json';

addons.setConfig({
  navSize: 200, // pixels
  bottomPanelHeight: 80, // pixels
  panelPosition: 'bottom', // bottom or right
  enableShortcuts: false,
  showToolbar: true,
  selectedPanel: null, 
  initialActive: 'sidebar',

  sidebar: {
    showRoots: true, // Display the top-level nodes as a "root" in the sidebar
    collapsedRoots: [], // Set of root node IDs to visually collapse by default
  },

  theme: create({
    base: 'dark',
    brandTitle: `
    <div style="display: flex; align-items: center; flex-direction: column; justify-content: center; ">
      <img src="/assets/images/logo-transparent.png" alt="Atomix" style="width: 80px;" />
      <p style="font-weight: bold; margin-bottom: 0px; font-size: 12px;">v${packageJson.version}</p>
    </div>`,
    brandUrl: 'https://github.com/liimonx/atomix',
    brandTarget: '_self',
    
    // Use hex colors to avoid issues with polished
    colorPrimary: '#6c757d',
    colorSecondary: '#7C3AED',

    // ui
    appBg: '#171f2a',
    appContentBg: '#171f2a',
    appPreviewBg: '#171f2a',
    appBorderColor: '#212936',
    appBorderRadius: 4,


  // Text colors
  textColor: '#6c757d',
  textInverseColor: '#ffffff',
 
  // Toolbar default and active colors
  barTextColor: '#6c757d',
  barSelectedColor: '#7C3AED',
  barHoverColor: '#7C3AED',
  barBg: '#171f2a',

  })
}); 