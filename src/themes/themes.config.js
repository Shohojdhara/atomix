/**
 * Theme Configuration
 *
 * This file is auto-generated from theme.config.ts
 * DO NOT EDIT MANUALLY - Edit theme.config.ts instead
 * Run 'npm run sync:config' to regenerate
 * 
 * Generated on: 2025-12-18T00:53:32.051Z
 */

export const themesConfig = {
  // Theme metadata
  metadata: {
    shaj-default: {
        name: "Shaj Default",
        description: "The default theme for the Atomix Design System",
        author: "Shohoj Dhara",
        version: "1.0.0",
        tags: [
            "default",
            "light"
        ],
        supportsDarkMode: true,
        status: "stable",
        a11y: {
            contrastTarget: 4.5,
            modes: [
                "light",
                "dark"
            ]
        },
        color: "#3b82f6"
    },
    boomdevs: {
        name: "BoomDevs",
        description: "BoomDevs theme for the Atomix Design System",
        author: "BoomDevs Team",
        version: "1.0.0",
        tags: [
            "dark",
            "modern"
        ],
        supportsDarkMode: true,
        status: "beta",
        a11y: {
            contrastTarget: 4.5,
            modes: [
                "light",
                "dark"
            ]
        },
        color: "#8b5cf6"
    },
    esrar: {
        name: "Esrar",
        description: "Esrar theme for the Atomix Design System",
        author: "Esrar Team",
        version: "1.0.0",
        tags: [
            "light",
            "minimal"
        ],
        supportsDarkMode: true,
        status: "beta",
        a11y: {
            contrastTarget: 4.5,
            modes: [
                "light",
                "dark"
            ]
        },
        color: "#10b981"
    },
    mashroom: {
        name: "Mashroom",
        description: "Mashroom theme for the Atomix Design System",
        author: "Mashroom Team",
        version: "1.0.0",
        tags: [
            "dark",
            "contrast"
        ],
        supportsDarkMode: true,
        status: "beta",
        a11y: {
            contrastTarget: 4.5,
            modes: [
                "light",
                "dark"
            ]
        },
        color: "#f59e0b"
    },
    applemix: {
        name: "Applemix",
        description: "Apple Mac OS 2026 Liquid Glass inspired theme with morphism effects",
        author: "Atomix Design System",
        version: "1.0.0",
        tags: [
            "glass",
            "apple",
            "modern",
            "liquid",
            "morphism"
        ],
        supportsDarkMode: true,
        status: "experimental",
        a11y: {
            contrastTarget: 4.5,
            modes: [
                "light",
                "dark"
            ]
        },
        color: "#f5f5f5",
        features: [
            "Liquid glass morphism effects",
            "Apple-inspired color palette",
            "Chromatic aberration effects",
            "Smooth animations and transitions",
            "AtomixGlass component integration",
            "Comprehensive component overrides",
            "Light and dark mode support"
        ]
    },
    flashtrade: {
        name: "Flash Trade",
        description: "Professional dark crypto perpetuals trading platform theme inspired by flash.trade",
        author: "Atomix Design System",
        version: "1.1.0",
        tags: [
            "dark",
            "crypto",
            "trading",
            "glass",
            "modern",
            "decentralized",
            "defi"
        ],
        supportsDarkMode: true,
        status: "stable",
        a11y: {
            contrastTarget: 4.5,
            modes: [
                "dark"
            ]
        },
        color: "#06b6d4",
        features: [
            "Ultra-dark trading interface aesthetic matching flash.trade",
            "Bright cyan (#06b6d4) primary color for brand consistency",
            "High contrast for financial data readability",
            "Trading-focused color palette (green for long/profit, red for short/loss)",
            "Glass morphism effects for modern UI depth",
            "Optimized Inter typography for trading information",
            "Fast animations for real-time data updates",
            "Professional navbar with asset selector bar",
            "Trading cards with hover effects and glass morphism",
            "Comprehensive button styles for trading actions",
            "Price change badges with glow effects",
            "Responsive mobile-first design",
            "AtomixGlass component integration"
        ]
    }
},

  // Build configuration
  build: {
    output: {
        directory: "themes",
        formats: {
            expanded: ".css",
            compressed: ".min.css"
        }
    },
    sass: {
        style: "expanded",
        sourceMap: true,
        loadPaths: [
            "src"
        ]
    }
},

  // Export configuration for package.json
  exports: {
    './themes/*': './dist/themes/*.css',
    './themes/*.min': './dist/themes/*.min.css',
  },

  // Theme integration settings
  integration: {
    cssVariables: {
        colorMode: "--storybook-color-mode"
    },
    classNames: {
        theme: "data-theme",
        colorMode: "data-atomix-color-mode"
    }
},

  // Runtime theme loading configuration
  runtime: {
    basePath: "/themes",
    cdnPath: null,
    preload: [
        "shaj-default"
    ],
    lazy: true,
    defaultTheme: "shaj-default",
    storageKey: "atomix-theme",
    dataAttribute: "data-theme",
    enablePersistence: true,
    useMinified: process.env.NODE_ENV === 'production'
},

  // Theme dependencies (if a theme requires another theme to be loaded)
  dependencies: {},
};