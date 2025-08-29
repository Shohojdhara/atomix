// .storybook/theme-switcher.ts
import type { API } from '@storybook/manager-api';
import { addons, types } from '@storybook/manager-api';
import React from 'react';

// Theme options
const themes = [
  { name: 'Shaj', class: 'shaj-default', color: '#3b82f6' },
  { name: 'BoomDevs', class: 'boomdevs', color: '#8b5cf6' },
  { name: 'Esrar', class: 'esrar', color: '#10b981' },
  { name: 'Mashroom', class: 'mashroom', color: '#f59e0b' },
  { name: 'Yabai', class: 'yabai', color: '#ef4444' },
];

interface ThemeSwitcherProps {
  api: API;
}

// Theme switcher component
const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ api }) => {
  const [currentTheme, setCurrentTheme] = React.useState('shaj-default');

  React.useEffect(() => {
    // Listen for story changes to update the theme state
    const handleStoryChanged = () => {
      const storyContext: any = api.getCurrentStoryData?.();
      if (storyContext?.globals?.theme) {
        setCurrentTheme(storyContext.globals.theme);
      }
    };

    // Set initial theme
    const storyContext: any = api.getCurrentStoryData?.();
    if (storyContext?.globals?.theme) {
      setCurrentTheme(storyContext.globals.theme);
    }

    // Listen for story changes
    api.getChannel().on('storyChanged', handleStoryChanged);

    return () => {
      api.getChannel().off('storyChanged', handleStoryChanged);
    };
  }, [api]);

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTheme = event.target.value;
    api.updateGlobals({ theme: selectedTheme });
  };

  return React.createElement(
    'div',
    {
      style: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 10,
        height: '100%',
        fontFamily: 'sans-serif',
      },
    },
    React.createElement(
      'span',
      {
        style: {
          marginRight: 8,
          fontSize: 12,
          fontWeight: 'bold',
        },
      },
      'Theme:'
    ),
    React.createElement(
      'select',
      {
        value: currentTheme,
        onChange: handleThemeChange,
        style: {
          padding: '3px 8px',
          borderRadius: 4,
          border: '1px solid #ccc',
          backgroundColor: '#fff',
          fontSize: 12,
          height: '26px',
          minWidth: '120px',
          cursor: 'pointer',
        },
      },
      themes.map(theme =>
        React.createElement(
          'option',
          {
            key: theme.class,
            value: theme.class,
            style: {
              padding: '4px 8px',
            },
          },
          theme.name
        )
      )
    )
  );
};

// Register the theme switcher addon
addons.register('theme-switcher', api => {
  // Add the theme switcher to the toolbar
  addons.add('theme-switcher/toolbar', {
    title: 'Theme Switcher',
    type: types.TOOL,
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: () => React.createElement(ThemeSwitcher, { api: api as API }),
  });
});
