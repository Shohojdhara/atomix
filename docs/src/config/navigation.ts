export const navigationItems = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/" },
      { title: "Installation", href: "/getting-started/installation" },
      { title: "Quick Start", href: "/getting-started/quick-start" },
      { title: "Theming", href: "/getting-started/theming" },
    ],
  },
  {
    title: "Design Tokens",
    items: [
      { title: "Colors", href: "/design-tokens/colors" },
      { title: "Typography", href: "/design-tokens/typography" },
      { title: "Spacing", href: "/design-tokens/spacing" },
      { title: "Shadows", href: "/design-tokens/shadows" },
    ],
  },
  {
    title: "Components",
    items: [
      { title: "Accordion", href: "/components/accordion" },
      { title: "Avatar", href: "/components/avatar" },
      { title: "Badge", href: "/components/badge" },
      { title: "Breadcrumb", href: "/components/breadcrumb" },
      { title: "Button", href: "/components/button" },
      { title: "Card", href: "/components/card" },
      { title: "Countdown", href: "/components/countdown" },
      { title: "DataTable", href: "/components/data-table" },
      { title: "DatePicker", href: "/components/date-picker" },
      { title: "Dropdown", href: "/components/dropdown" },
      { title: "Form", href: "/components/form" },
      { title: "Hero", href: "/components/hero" },
      { title: "Icon", href: "/components/icon" },
      { title: "Messages", href: "/components/messages" },
      { title: "Modal", href: "/components/modal" },
      { title: "Navbar", href: "/components/navbar" },
      { title: "Pagination", href: "/components/pagination" },
      { title: "Popover", href: "/components/popover" },
      { title: "Progress", href: "/components/progress" },
      { title: "Rating", href: "/components/rating" },
      { title: "Spinner", href: "/components/spinner" },
      { title: "Steps", href: "/components/steps" },
      { title: "Tab", href: "/components/tab" },
      { title: "Toggle", href: "/components/toggle" },
      { title: "Tooltip", href: "/components/tooltip" },
      { title: "Upload", href: "/components/upload" },
    ],
  },
  {
    title: "Utilities",
    items: [
      { title: "Overview", href: "/utilities/overview" },
      { title: "Spacing", href: "/utilities/spacing" },
    ],
  },
];

export type NavigationItem = {
  title: string;
  href: string;
};

export type NavigationSection = {
  title: string;
  items: NavigationItem[];
};