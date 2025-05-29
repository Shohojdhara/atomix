import { useGlobals } from '@storybook/addons';
import { IconButton } from '@storybook/components';
import { FORCE_RE_RENDER } from '@storybook/core-events';
import { addons, types } from '@storybook/manager-api';

// Addon ID and panel title
const ADDON_ID = 'atomix-color-mode';
const TOOL_ID = `${ADDON_ID}/tool`;

// Define the actual addon
addons.register(ADDON_ID, () => {
  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: 'Color Mode',
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: function() {
      const [globals, updateGlobals] = useGlobals();
      const colorMode = globals['colorMode'] || 'light';

      const toggleColorMode = () => {
        const newColorMode = colorMode === 'light' ? 'dark' : 'light';
        updateGlobals({
          colorMode: newColorMode,
        });
        // Force re-render stories
        addons.getChannel().emit(FORCE_RE_RENDER);
      };

      // Create SVG string for light icon
      const lightIconSvg = '<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41.39.39 1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41.39.39 1.03.39 1.41 0l1.06-1.06z"></path></svg>';

      // Create SVG string for dark icon
      const darkIconSvg = '<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M9.37 5.51c-.18.64-.27 1.31-.27 1.99 0 4.08 3.32 7.4 7.4 7.4.68 0 1.35-.09 1.99-.27C17.45 17.19 14.93 19 12 19c-3.86 0-7-3.14-7-7 0-2.93 1.81-5.45 4.37-6.49zM12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"></path></svg>';

      return IconButton({
        key: "color-mode",
        title: `Toggle ${colorMode === 'light' ? 'dark' : 'light'} mode`,
        onClick: toggleColorMode,
        children: [
          {
            type: 'html',
            value: colorMode === 'light' ? darkIconSvg : lightIconSvg,
          }
        ]
      });
    },
  });
}); 