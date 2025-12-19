import { defineConfig } from './src/lib/config';
import { createTheme } from './src/lib/theme/createTheme';

export default defineConfig({
    theme: {
        // Default system tokens can be extended here
        extend: {
            colors: {
                primary: {
                    main: '#3b82f6',
                },
            },
        },
        // Registered themes
        themes: {},
    },
    build: {
        output: {
            directory: 'themes',
            formats: {
                expanded: '.css',
                compressed: '.min.css',
            },
        },
        sass: {
            style: 'expanded',
            sourceMap: true,
            loadPaths: ['src'],
        },
    },
    runtime: {
        basePath: '/themes',
        cdnPath: null,
        preload: [],
        lazy: true,
        defaultTheme: '',
        storageKey: 'atomix-theme',
        dataAttribute: 'data-theme',
        enablePersistence: true,
        useMinified: process.env.NODE_ENV === 'production',
    },
    integration: {
        cssVariables: {
            colorMode: '--storybook-color-mode',
        },
        classNames: {
            theme: 'data-theme',
            colorMode: 'data-atomix-color-mode',
        },
    },
});
