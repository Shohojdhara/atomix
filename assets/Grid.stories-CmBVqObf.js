import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{G as a,a as s,C as i}from"./Container-CXdNHNc5.js";import{R as r}from"./Row-BOpniq1U.js";import"./index-BVDOR7y2.js";const oe={title:"Layouts/Grid",component:a,parameters:{layout:"fullscreen",docs:{description:{component:"A responsive grid system for creating flexible layouts. Based on a 12-column system with responsive breakpoints."}}},decorators:[d=>e.jsx("div",{style:{padding:"1rem"},children:e.jsx(d,{})})]},n=({children:d,variant:ae="primary",height:C="auto"})=>{const re={primary:"u-bg-primary-subtle u-border-primary-subtle",secondary:"u-bg-secondary-subtle u-border-secondary-subtle",accent:"u-bg-info-subtle u-border-info-subtle"},ie={auto:"",sm:"u-h-25",md:"u-h-50",lg:"u-h-75"};return e.jsx("div",{className:`u-p-4 u-rounded u-border u-text-center u-d-flex u-align-items-center u-justify-content-center ${re[ae]} ${ie[C]}`,style:{minHeight:C==="auto"?"60px":void 0},children:e.jsx("div",{className:"u-text-primary u-fw-medium",children:d})})},b=({children:d})=>e.jsx("div",{className:"u-bg-dark u-text-light u-p-3 u-rounded u-fs-sm u-fw-normal",style:{fontFamily:"monospace"},children:d}),l={render:()=>e.jsxs("div",{className:"u-mb-8",children:[e.jsx("h2",{className:"u-mb-4 u-text-primary",children:"Basic Grid Layout"}),e.jsx("p",{className:"u-mb-6 u-text-secondary",children:"Equal columns that stack on mobile and expand on larger screens:"}),e.jsxs(a,{className:"u-mb-6",children:[e.jsx(s,{xs:12,md:4,children:e.jsx(n,{children:"Column 1"})}),e.jsx(s,{xs:12,md:4,children:e.jsx(n,{children:"Column 2"})}),e.jsx(s,{xs:12,md:4,children:e.jsx(n,{children:"Column 3"})})]}),e.jsx(b,{children:`<Grid>
  <GridCol xs={12} md={4}>Column 1</GridCol>
  <GridCol xs={12} md={4}>Column 2</GridCol>
  <GridCol xs={12} md={4}>Column 3</GridCol>
</Grid>`}),e.jsxs("div",{className:"u-mt-8",children:[e.jsx("h3",{className:"u-mb-4 u-text-primary",children:"Responsive Behavior"}),e.jsx("p",{className:"u-mb-4 u-text-secondary",children:"Columns automatically adjust at different screen sizes:"}),e.jsxs(a,{className:"u-mb-6",children:[e.jsx(s,{xs:12,sm:6,md:4,lg:3,children:e.jsxs(n,{variant:"secondary",children:[e.jsx("div",{children:"Mobile: Full width"}),e.jsx("div",{children:"Tablet: Half width"}),e.jsx("div",{children:"Desktop: 1/3 width"}),e.jsx("div",{children:"Large: 1/4 width"})]})}),e.jsx(s,{xs:12,sm:6,md:4,lg:3,children:e.jsx(n,{variant:"secondary",children:"Responsive"})}),e.jsx(s,{xs:12,sm:6,md:4,lg:3,children:e.jsx(n,{variant:"secondary",children:"Columns"})}),e.jsx(s,{xs:12,sm:6,md:4,lg:3,children:e.jsx(n,{variant:"secondary",children:"Example"})})]}),e.jsx(b,{children:`<GridCol xs={12} sm={6} md={4} lg={3}>
  Responsive column
</GridCol>`})]})]})},m={render:()=>e.jsxs("div",{className:"u-mb-8",children:[e.jsx("h2",{className:"u-mb-6 u-text-primary",children:"Common Layout Patterns"}),e.jsxs("div",{className:"u-mb-8",children:[e.jsx("h3",{className:"u-mb-4 u-text-primary",children:"Sidebar Layout"}),e.jsx("p",{className:"u-mb-4 u-text-secondary",children:"Perfect for dashboards and admin interfaces:"}),e.jsxs(a,{className:"u-mb-6",children:[e.jsx(s,{xs:12,md:3,children:e.jsxs(n,{variant:"accent",height:"lg",children:[e.jsx("div",{children:"Sidebar"}),e.jsx("div",{className:"u-fs-sm u-text-secondary",children:"Navigation, filters, etc."})]})}),e.jsx(s,{xs:12,md:9,children:e.jsxs(n,{height:"lg",children:[e.jsx("div",{children:"Main Content"}),e.jsx("div",{className:"u-fs-sm u-text-secondary",children:"Primary content area"})]})})]})]}),e.jsxs("div",{className:"u-mb-8",children:[e.jsx("h3",{className:"u-mb-4 u-text-primary",children:"Hero + Features"}),e.jsx("p",{className:"u-mb-4 u-text-secondary",children:"Landing page layout with hero section and feature cards:"}),e.jsx(a,{className:"u-mb-4",children:e.jsx(s,{xs:12,children:e.jsxs(n,{variant:"accent",height:"md",children:[e.jsx("div",{children:"Hero Section"}),e.jsx("div",{className:"u-fs-sm u-text-secondary",children:"Full-width banner"})]})})}),e.jsxs(a,{className:"u-mb-6",children:[e.jsx(s,{xs:12,sm:6,lg:4,children:e.jsx(n,{variant:"secondary",children:"Feature 1"})}),e.jsx(s,{xs:12,sm:6,lg:4,children:e.jsx(n,{variant:"secondary",children:"Feature 2"})}),e.jsx(s,{xs:12,sm:12,lg:4,children:e.jsx(n,{variant:"secondary",children:"Feature 3"})})]})]}),e.jsxs("div",{className:"u-mb-8",children:[e.jsx("h3",{className:"u-mb-4 u-text-primary",children:"Article Layout"}),e.jsx("p",{className:"u-mb-4 u-text-secondary",children:"Centered content with optional sidebar:"}),e.jsx(a,{className:"u-mb-6",children:e.jsx(s,{xs:12,md:8,offsetMd:2,children:e.jsxs(n,{height:"lg",children:[e.jsx("div",{children:"Article Content"}),e.jsx("div",{className:"u-fs-sm u-text-secondary",children:"Centered, readable width"})]})})})]})]})},t={render:()=>e.jsxs("div",{className:"u-mb-8",children:[e.jsx("h2",{className:"u-mb-6 u-text-primary",children:"Column Sizing Options"}),e.jsxs("div",{className:"u-mb-8",children:[e.jsx("h3",{className:"u-mb-4 u-text-primary",children:"Fixed Column Sizes"}),e.jsx("p",{className:"u-mb-4 u-text-secondary",children:"Specify exact column widths (1-12):"}),e.jsxs(a,{className:"u-mb-4",children:[e.jsx(s,{xs:2,children:e.jsx(n,{variant:"secondary",children:"2 cols"})}),e.jsx(s,{xs:10,children:e.jsx(n,{children:"10 cols"})})]}),e.jsxs(a,{className:"u-mb-4",children:[e.jsx(s,{xs:4,children:e.jsx(n,{variant:"secondary",children:"4 cols"})}),e.jsx(s,{xs:8,children:e.jsx(n,{children:"8 cols"})})]}),e.jsxs(a,{className:"u-mb-6",children:[e.jsx(s,{xs:6,children:e.jsx(n,{variant:"secondary",children:"6 cols"})}),e.jsx(s,{xs:6,children:e.jsx(n,{children:"6 cols"})})]})]}),e.jsxs("div",{className:"u-mb-8",children:[e.jsx("h3",{className:"u-mb-4 u-text-primary",children:"Auto-Sizing Columns"}),e.jsx("p",{className:"u-mb-4 u-text-secondary",children:"Columns that automatically size based on content:"}),e.jsxs(a,{className:"u-mb-4",children:[e.jsx(s,{children:e.jsx(n,{variant:"accent",children:"Auto"})}),e.jsx(s,{children:e.jsx(n,{variant:"accent",children:"Auto Width"})}),e.jsx(s,{children:e.jsx(n,{variant:"accent",children:"Auto"})})]}),e.jsxs(a,{className:"u-mb-6",children:[e.jsx(s,{xs:4,children:e.jsx(n,{variant:"secondary",children:"Fixed (4 cols)"})}),e.jsx(s,{children:e.jsx(n,{variant:"accent",children:"Auto (fills remaining)"})}),e.jsx(s,{children:e.jsx(n,{variant:"accent",children:"Auto"})})]})]}),e.jsxs("div",{className:"u-mb-8",children:[e.jsx("h3",{className:"u-mb-4 u-text-primary",children:"Mixed Sizing"}),e.jsx("p",{className:"u-mb-4 u-text-secondary",children:"Combine fixed and auto sizing for flexible layouts:"}),e.jsxs(a,{className:"u-mb-6",children:[e.jsx(s,{xs:12,sm:6,md:4,lg:"auto",children:e.jsxs(n,{variant:"secondary",children:[e.jsx("div",{children:"Responsive"}),e.jsx("div",{className:"u-fs-sm",children:"xs=12, sm=6, md=4, lg=auto"})]})}),e.jsx(s,{xs:12,sm:6,md:4,lg:"auto",children:e.jsxs(n,{variant:"secondary",children:[e.jsx("div",{children:"Responsive"}),e.jsx("div",{className:"u-fs-sm",children:"xs=12, sm=6, md=4, lg=auto"})]})}),e.jsx(s,{xs:12,sm:12,md:4,lg:"auto",children:e.jsxs(n,{variant:"secondary",children:[e.jsx("div",{children:"Responsive"}),e.jsx("div",{className:"u-fs-sm",children:"xs=12, sm=12, md=4, lg=auto"})]})})]})]})]})},o={render:()=>e.jsxs("div",{className:"u-mb-8",children:[e.jsx("h2",{className:"u-mb-6 u-text-primary",children:"Column Offsets"}),e.jsxs("div",{className:"u-mb-8",children:[e.jsx("h3",{className:"u-mb-4 u-text-primary",children:"Basic Offsets"}),e.jsx("p",{className:"u-mb-4 u-text-secondary",children:"Push columns to the right using offsets:"}),e.jsxs(a,{className:"u-mb-4",children:[e.jsx(s,{xs:4,children:e.jsx(n,{variant:"secondary",children:"4 columns"})}),e.jsx(s,{xs:4,offsetXs:4,children:e.jsx(n,{children:"4 columns, offset 4"})})]}),e.jsxs(a,{className:"u-mb-6",children:[e.jsx(s,{xs:3,offsetXs:3,children:e.jsx(n,{variant:"secondary",children:"3 cols, offset 3"})}),e.jsx(s,{xs:3,offsetXs:3,children:e.jsx(n,{children:"3 cols, offset 3"})})]})]}),e.jsxs("div",{className:"u-mb-8",children:[e.jsx("h3",{className:"u-mb-4 u-text-primary",children:"Centering Content"}),e.jsx("p",{className:"u-mb-4 u-text-secondary",children:"Center columns using equal offsets:"}),e.jsx(a,{className:"u-mb-4",children:e.jsx(s,{xs:6,offsetXs:3,children:e.jsx(n,{variant:"accent",children:"Centered (6 cols, offset 3)"})})}),e.jsx(a,{className:"u-mb-6",children:e.jsx(s,{xs:8,offsetXs:2,children:e.jsx(n,{variant:"accent",children:"Centered (8 cols, offset 2)"})})})]}),e.jsxs("div",{className:"u-mb-8",children:[e.jsx("h3",{className:"u-mb-4 u-text-primary",children:"Responsive Offsets"}),e.jsx("p",{className:"u-mb-4 u-text-secondary",children:"Different offsets at different screen sizes:"}),e.jsx(a,{className:"u-mb-6",children:e.jsx(s,{xs:12,sm:6,offsetSm:3,md:4,offsetMd:4,lg:3,offsetLg:3,children:e.jsxs(n,{variant:"secondary",children:[e.jsx("div",{children:"Responsive Offsets"}),e.jsx("div",{className:"u-fs-sm",children:"Changes at each breakpoint"})]})})})]})]})},c={render:()=>e.jsxs("div",{className:"u-mb-8",children:[e.jsx("h2",{className:"u-mb-6 u-text-primary",children:"Container Types"}),e.jsxs("div",{className:"u-mb-8",children:[e.jsx("h3",{className:"u-mb-4 u-text-primary",children:"Default Container"}),e.jsx("p",{className:"u-mb-4 u-text-secondary",children:"Responsive container with max-width at each breakpoint:"}),e.jsx(i,{className:"u-mb-6",children:e.jsxs(n,{variant:"accent",height:"md",children:[e.jsx("div",{children:"Default Container"}),e.jsx("div",{className:"u-fs-sm u-text-secondary",children:"Responsive max-width, centered"})]})})]}),e.jsxs("div",{className:"u-mb-8",children:[e.jsx("h3",{className:"u-mb-4 u-text-primary",children:"Fluid Container"}),e.jsx("p",{className:"u-mb-4 u-text-secondary",children:"Full-width container that spans the entire viewport:"}),e.jsx(i,{type:"fluid",className:"u-mb-6",children:e.jsxs(n,{variant:"secondary",height:"md",children:[e.jsx("div",{children:"Fluid Container"}),e.jsx("div",{className:"u-fs-sm u-text-secondary",children:"Full viewport width"})]})})]}),e.jsxs("div",{className:"u-mb-8",children:[e.jsx("h3",{className:"u-mb-4 u-text-primary",children:"Breakpoint Containers"}),e.jsx("p",{className:"u-mb-4 u-text-secondary",children:"Containers with max-width at specific breakpoints:"}),e.jsx(i,{type:"sm",className:"u-mb-4",children:e.jsx(n,{variant:"secondary",children:"Small Container (max-width: sm)"})}),e.jsx(i,{type:"md",className:"u-mb-4",children:e.jsx(n,{variant:"secondary",children:"Medium Container (max-width: md)"})}),e.jsx(i,{type:"lg",className:"u-mb-4",children:e.jsx(n,{variant:"secondary",children:"Large Container (max-width: lg)"})})]}),e.jsxs("div",{className:"u-mb-8",children:[e.jsx("h3",{className:"u-mb-4 u-text-primary",children:"Container with Grid"}),e.jsx("p",{className:"u-mb-4 u-text-secondary",children:"Combine containers with grids for structured layouts:"}),e.jsx(i,{className:"u-mb-6",children:e.jsxs(a,{children:[e.jsx(s,{xs:12,md:4,children:e.jsx(n,{children:"Column 1"})}),e.jsx(s,{xs:12,md:4,children:e.jsx(n,{children:"Column 2"})}),e.jsx(s,{xs:12,md:4,children:e.jsx(n,{children:"Column 3"})})]})})]})]})},u={render:()=>e.jsxs("div",{className:"u-mb-8",children:[e.jsx("h2",{className:"u-mb-6 u-text-primary",children:"Alignment & Spacing"}),e.jsxs("div",{className:"u-mb-8",children:[e.jsx("h3",{className:"u-mb-4 u-text-primary",children:"Horizontal Alignment"}),e.jsx("p",{className:"u-mb-4 u-text-secondary",children:"Control how columns are distributed horizontally:"}),e.jsxs("div",{className:"u-mb-4",children:[e.jsx("h4",{className:"u-mb-3 u-text-secondary u-fw-medium",children:'justify-content="start"'}),e.jsxs(r,{justifyContent:"start",className:"u-mb-4",children:[e.jsx(s,{xs:3,children:e.jsx(n,{variant:"secondary",children:"Col 1"})}),e.jsx(s,{xs:3,children:e.jsx(n,{variant:"secondary",children:"Col 2"})})]})]}),e.jsxs("div",{className:"u-mb-4",children:[e.jsx("h4",{className:"u-mb-3 u-text-secondary u-fw-medium",children:'justify-content="center"'}),e.jsxs(r,{justifyContent:"center",className:"u-mb-4",children:[e.jsx(s,{xs:3,children:e.jsx(n,{variant:"secondary",children:"Col 1"})}),e.jsx(s,{xs:3,children:e.jsx(n,{variant:"secondary",children:"Col 2"})})]})]}),e.jsxs("div",{className:"u-mb-4",children:[e.jsx("h4",{className:"u-mb-3 u-text-secondary u-fw-medium",children:'justify-content="between"'}),e.jsxs(r,{justifyContent:"between",className:"u-mb-4",children:[e.jsx(s,{xs:3,children:e.jsx(n,{variant:"secondary",children:"Col 1"})}),e.jsx(s,{xs:3,children:e.jsx(n,{variant:"secondary",children:"Col 2"})})]})]}),e.jsxs("div",{className:"u-mb-6",children:[e.jsx("h4",{className:"u-mb-3 u-text-secondary u-fw-medium",children:'justify-content="around"'}),e.jsxs(r,{justifyContent:"around",className:"u-mb-4",children:[e.jsx(s,{xs:3,children:e.jsx(n,{variant:"secondary",children:"Col 1"})}),e.jsx(s,{xs:3,children:e.jsx(n,{variant:"secondary",children:"Col 2"})})]})]})]}),e.jsxs("div",{className:"u-mb-8",children:[e.jsx("h3",{className:"u-mb-4 u-text-primary",children:"Vertical Alignment"}),e.jsx("p",{className:"u-mb-4 u-text-secondary",children:"Control how columns align vertically when they have different heights:"}),e.jsxs("div",{className:"u-mb-4",children:[e.jsx("h4",{className:"u-mb-3 u-text-secondary u-fw-medium",children:'align-items="start"'}),e.jsxs(r,{alignItems:"start",className:"u-mb-4 u-bg-light",style:{minHeight:"150px"},children:[e.jsx(s,{xs:4,children:e.jsx(n,{height:"sm",children:"Short"})}),e.jsx(s,{xs:4,children:e.jsx(n,{height:"md",children:"Medium"})}),e.jsx(s,{xs:4,children:e.jsx(n,{height:"lg",children:"Tall"})})]})]}),e.jsxs("div",{className:"u-mb-4",children:[e.jsx("h4",{className:"u-mb-3 u-text-secondary u-fw-medium",children:'align-items="center"'}),e.jsxs(r,{alignItems:"center",className:"u-mb-4 u-bg-light",style:{minHeight:"150px"},children:[e.jsx(s,{xs:4,children:e.jsx(n,{height:"sm",children:"Short"})}),e.jsx(s,{xs:4,children:e.jsx(n,{height:"md",children:"Medium"})}),e.jsx(s,{xs:4,children:e.jsx(n,{height:"lg",children:"Tall"})})]})]}),e.jsxs("div",{className:"u-mb-6",children:[e.jsx("h4",{className:"u-mb-3 u-text-secondary u-fw-medium",children:'align-items="end"'}),e.jsxs(r,{alignItems:"end",className:"u-mb-4 u-bg-light",style:{minHeight:"150px"},children:[e.jsx(s,{xs:4,children:e.jsx(n,{height:"sm",children:"Short"})}),e.jsx(s,{xs:4,children:e.jsx(n,{height:"md",children:"Medium"})}),e.jsx(s,{xs:4,children:e.jsx(n,{height:"lg",children:"Tall"})})]})]})]}),e.jsxs("div",{className:"u-mb-8",children:[e.jsx("h3",{className:"u-mb-4 u-text-primary",children:"No Gutters"}),e.jsx("p",{className:"u-mb-4 u-text-secondary",children:"Remove spacing between columns:"}),e.jsxs("div",{className:"u-mb-4",children:[e.jsx("h4",{className:"u-mb-3 u-text-secondary u-fw-medium",children:"With gutters (default)"}),e.jsxs(r,{className:"u-mb-4",children:[e.jsx(s,{xs:4,children:e.jsx(n,{variant:"secondary",children:"Column 1"})}),e.jsx(s,{xs:4,children:e.jsx(n,{variant:"secondary",children:"Column 2"})}),e.jsx(s,{xs:4,children:e.jsx(n,{variant:"secondary",children:"Column 3"})})]})]}),e.jsxs("div",{className:"u-mb-6",children:[e.jsx("h4",{className:"u-mb-3 u-text-secondary u-fw-medium",children:"No gutters"}),e.jsxs(r,{noGutters:!0,className:"u-mb-4",children:[e.jsx(s,{xs:4,children:e.jsx(n,{variant:"accent",children:"Column 1"})}),e.jsx(s,{xs:4,children:e.jsx(n,{variant:"accent",children:"Column 2"})}),e.jsx(s,{xs:4,children:e.jsx(n,{variant:"accent",children:"Column 3"})})]})]})]})]})},x={render:()=>e.jsxs("div",{className:"u-mb-8",children:[e.jsx("h2",{className:"u-mb-6 u-text-primary",children:"Nested Grids"}),e.jsx("p",{className:"u-mb-6 u-text-secondary",children:"Create complex layouts by nesting grids within columns. Each nested grid starts fresh with 12 columns."}),e.jsxs(a,{children:[e.jsx(s,{xs:12,md:6,children:e.jsxs("div",{className:"u-p-4 u-border u-rounded u-bg-info-subtle u-mb-4",children:[e.jsx("h4",{className:"u-mb-4 u-text-primary",children:"Left Section"}),e.jsxs(a,{children:[e.jsx(s,{xs:12,className:"u-mb-4",children:e.jsx(n,{variant:"secondary",children:"Nested Full Width"})}),e.jsx(s,{xs:6,children:e.jsx(n,{variant:"secondary",children:"Nested 1/2"})}),e.jsx(s,{xs:6,children:e.jsx(n,{variant:"secondary",children:"Nested 1/2"})})]})]})}),e.jsx(s,{xs:12,md:6,children:e.jsxs("div",{className:"u-p-4 u-border u-rounded u-bg-success-subtle u-mb-4",children:[e.jsx("h4",{className:"u-mb-4 u-text-primary",children:"Right Section"}),e.jsxs(a,{children:[e.jsx(s,{xs:4,children:e.jsx(n,{variant:"accent",children:"1/3"})}),e.jsx(s,{xs:4,children:e.jsx(n,{variant:"accent",children:"1/3"})}),e.jsx(s,{xs:4,children:e.jsx(n,{variant:"accent",children:"1/3"})})]})]})})]}),e.jsxs("div",{className:"u-mt-8",children:[e.jsx("h3",{className:"u-mb-4 u-text-primary",children:"Complex Nested Example"}),e.jsx("p",{className:"u-mb-4 u-text-secondary",children:"Dashboard-style layout with multiple levels of nesting:"}),e.jsxs(a,{children:[e.jsx(s,{xs:12,children:e.jsxs("div",{className:"u-p-4 u-border u-rounded u-bg-warning-subtle u-mb-4",children:[e.jsx("h4",{className:"u-mb-4 u-text-primary",children:"Header"}),e.jsxs(a,{children:[e.jsx(s,{xs:12,sm:6,md:8,children:e.jsx(n,{variant:"secondary",children:"Logo & Navigation"})}),e.jsx(s,{xs:12,sm:6,md:4,children:e.jsx(n,{variant:"secondary",children:"User Actions"})})]})]})}),e.jsx(s,{xs:12,md:3,children:e.jsxs("div",{className:"u-p-4 u-border u-rounded u-bg-info-subtle u-mb-4",children:[e.jsx("h4",{className:"u-mb-4 u-text-primary",children:"Sidebar"}),e.jsxs(a,{children:[e.jsx(s,{xs:12,className:"u-mb-2",children:e.jsx(n,{variant:"accent",height:"sm",children:"Menu Item 1"})}),e.jsx(s,{xs:12,className:"u-mb-2",children:e.jsx(n,{variant:"accent",height:"sm",children:"Menu Item 2"})}),e.jsx(s,{xs:12,children:e.jsx(n,{variant:"accent",height:"sm",children:"Menu Item 3"})})]})]})}),e.jsx(s,{xs:12,md:9,children:e.jsxs("div",{className:"u-p-4 u-border u-rounded u-bg-success-subtle",children:[e.jsx("h4",{className:"u-mb-4 u-text-primary",children:"Main Content"}),e.jsxs(a,{children:[e.jsx(s,{xs:12,className:"u-mb-4",children:e.jsx(n,{height:"sm",children:"Content Header"})}),e.jsx(s,{xs:12,sm:6,lg:4,children:e.jsx(n,{variant:"secondary",children:"Widget 1"})}),e.jsx(s,{xs:12,sm:6,lg:4,children:e.jsx(n,{variant:"secondary",children:"Widget 2"})}),e.jsx(s,{xs:12,sm:12,lg:4,children:e.jsx(n,{variant:"secondary",children:"Widget 3"})})]})]})})]})]})]})},h={render:()=>e.jsxs("div",{className:"u-mb-8",children:[e.jsx("h2",{className:"u-mb-6 u-text-primary",children:"Breakpoint Reference"}),e.jsx("p",{className:"u-mb-6 u-text-secondary",children:"The grid system uses these breakpoints. Resize your browser to see how columns adapt."}),e.jsxs("div",{className:"u-mb-6 u-p-4 u-border u-rounded u-bg-light",children:[e.jsx("h4",{className:"u-mb-4 u-text-primary",children:"Breakpoint Sizes"}),e.jsxs("ul",{className:"u-text-secondary",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"xs:"})," 0px and up (all devices)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"sm:"})," 576px and up (tablets)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"md:"})," 768px and up (small laptops)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"lg:"})," 992px and up (large laptops)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"xl:"})," 1200px and up (desktops)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"xxl:"})," 1440px and up (large desktops)"]})]})]}),e.jsx("h3",{className:"u-mb-4 u-text-primary",children:"Responsive Behavior Demo"}),e.jsx("p",{className:"u-mb-4 u-text-secondary",children:"These columns show different layouts at each breakpoint:"}),e.jsxs(a,{className:"u-mb-6",children:[e.jsx(s,{xs:12,sm:6,md:4,lg:3,xl:2,children:e.jsxs(n,{variant:"secondary",children:[e.jsx("div",{className:"u-fw-bold",children:"Column 1"}),e.jsx("div",{className:"u-fs-sm",children:"xs=12, sm=6, md=4, lg=3, xl=2"})]})}),e.jsx(s,{xs:12,sm:6,md:4,lg:3,xl:2,children:e.jsxs(n,{variant:"secondary",children:[e.jsx("div",{className:"u-fw-bold",children:"Column 2"}),e.jsx("div",{className:"u-fs-sm",children:"xs=12, sm=6, md=4, lg=3, xl=2"})]})}),e.jsx(s,{xs:12,sm:6,md:4,lg:3,xl:2,children:e.jsxs(n,{variant:"secondary",children:[e.jsx("div",{className:"u-fw-bold",children:"Column 3"}),e.jsx("div",{className:"u-fs-sm",children:"xs=12, sm=6, md=4, lg=3, xl=2"})]})}),e.jsx(s,{xs:12,sm:6,md:4,lg:3,xl:2,children:e.jsxs(n,{variant:"secondary",children:[e.jsx("div",{className:"u-fw-bold",children:"Column 4"}),e.jsx("div",{className:"u-fs-sm",children:"xs=12, sm=6, md=4, lg=3, xl=2"})]})}),e.jsx(s,{xs:12,sm:6,md:4,lg:3,xl:2,children:e.jsxs(n,{variant:"secondary",children:[e.jsx("div",{className:"u-fw-bold",children:"Column 5"}),e.jsx("div",{className:"u-fs-sm",children:"xs=12, sm=6, md=4, lg=3, xl=2"})]})}),e.jsx(s,{xs:12,sm:6,md:4,lg:3,xl:2,children:e.jsxs(n,{variant:"secondary",children:[e.jsx("div",{className:"u-fw-bold",children:"Column 6"}),e.jsx("div",{className:"u-fs-sm",children:"xs=12, sm=6, md=4, lg=3, xl=2"})]})})]}),e.jsxs("div",{className:"u-p-4 u-border u-rounded u-bg-warning-subtle",children:[e.jsx("h4",{className:"u-mb-3 u-text-primary",children:"Current Breakpoint"}),e.jsx("p",{className:"u-text-secondary u-mb-0",children:"Resize your browser window to see how the columns above adapt to different screen sizes. The grid system automatically adjusts the layout based on the available space."})]})]})};var v,j,p,N,y;l.parameters={...l.parameters,docs:{...(v=l.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <div className="u-mb-8">
      <h2 className="u-mb-4 u-text-primary">Basic Grid Layout</h2>
      <p className="u-mb-6 u-text-secondary">
        Equal columns that stack on mobile and expand on larger screens:
      </p>

      <Grid className="u-mb-6">
        <GridCol xs={12} md={4}>
          <DemoCard>Column 1</DemoCard>
        </GridCol>
        <GridCol xs={12} md={4}>
          <DemoCard>Column 2</DemoCard>
        </GridCol>
        <GridCol xs={12} md={4}>
          <DemoCard>Column 3</DemoCard>
        </GridCol>
      </Grid>

      <CodeSnippet>
        {\`<Grid>
  <GridCol xs={12} md={4}>Column 1</GridCol>
  <GridCol xs={12} md={4}>Column 2</GridCol>
  <GridCol xs={12} md={4}>Column 3</GridCol>
</Grid>\`}
      </CodeSnippet>

      <div className="u-mt-8">
        <h3 className="u-mb-4 u-text-primary">Responsive Behavior</h3>
        <p className="u-mb-4 u-text-secondary">
          Columns automatically adjust at different screen sizes:
        </p>

        <Grid className="u-mb-6">
          <GridCol xs={12} sm={6} md={4} lg={3}>
            <DemoCard variant="secondary">
              <div>Mobile: Full width</div>
              <div>Tablet: Half width</div>
              <div>Desktop: 1/3 width</div>
              <div>Large: 1/4 width</div>
            </DemoCard>
          </GridCol>
          <GridCol xs={12} sm={6} md={4} lg={3}>
            <DemoCard variant="secondary">Responsive</DemoCard>
          </GridCol>
          <GridCol xs={12} sm={6} md={4} lg={3}>
            <DemoCard variant="secondary">Columns</DemoCard>
          </GridCol>
          <GridCol xs={12} sm={6} md={4} lg={3}>
            <DemoCard variant="secondary">Example</DemoCard>
          </GridCol>
        </Grid>

        <CodeSnippet>
          {\`<GridCol xs={12} sm={6} md={4} lg={3}>
  Responsive column
</GridCol>\`}
        </CodeSnippet>
      </div>
    </div>
}`,...(p=(j=l.parameters)==null?void 0:j.docs)==null?void 0:p.source},description:{story:`## Getting Started

The Grid system uses a 12-column layout with responsive breakpoints.
Start with these basic examples to understand the fundamentals.`,...(y=(N=l.parameters)==null?void 0:N.docs)==null?void 0:y.description}}};var g,f,G,D,w;m.parameters={...m.parameters,docs:{...(g=m.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <div className="u-mb-8">
      <h2 className="u-mb-6 u-text-primary">Common Layout Patterns</h2>

      {/* Sidebar Layout */}
      <div className="u-mb-8">
        <h3 className="u-mb-4 u-text-primary">Sidebar Layout</h3>
        <p className="u-mb-4 u-text-secondary">Perfect for dashboards and admin interfaces:</p>

        <Grid className="u-mb-6">
          <GridCol xs={12} md={3}>
            <DemoCard variant="accent" height="lg">
              <div>Sidebar</div>
              <div className="u-fs-sm u-text-secondary">Navigation, filters, etc.</div>
            </DemoCard>
          </GridCol>
          <GridCol xs={12} md={9}>
            <DemoCard height="lg">
              <div>Main Content</div>
              <div className="u-fs-sm u-text-secondary">Primary content area</div>
            </DemoCard>
          </GridCol>
        </Grid>
      </div>

      {/* Hero + Features */}
      <div className="u-mb-8">
        <h3 className="u-mb-4 u-text-primary">Hero + Features</h3>
        <p className="u-mb-4 u-text-secondary">
          Landing page layout with hero section and feature cards:
        </p>

        <Grid className="u-mb-4">
          <GridCol xs={12}>
            <DemoCard variant="accent" height="md">
              <div>Hero Section</div>
              <div className="u-fs-sm u-text-secondary">Full-width banner</div>
            </DemoCard>
          </GridCol>
        </Grid>

        <Grid className="u-mb-6">
          <GridCol xs={12} sm={6} lg={4}>
            <DemoCard variant="secondary">Feature 1</DemoCard>
          </GridCol>
          <GridCol xs={12} sm={6} lg={4}>
            <DemoCard variant="secondary">Feature 2</DemoCard>
          </GridCol>
          <GridCol xs={12} sm={12} lg={4}>
            <DemoCard variant="secondary">Feature 3</DemoCard>
          </GridCol>
        </Grid>
      </div>

      {/* Article Layout */}
      <div className="u-mb-8">
        <h3 className="u-mb-4 u-text-primary">Article Layout</h3>
        <p className="u-mb-4 u-text-secondary">Centered content with optional sidebar:</p>

        <Grid className="u-mb-6">
          <GridCol xs={12} md={8} offsetMd={2}>
            <DemoCard height="lg">
              <div>Article Content</div>
              <div className="u-fs-sm u-text-secondary">Centered, readable width</div>
            </DemoCard>
          </GridCol>
        </Grid>
      </div>
    </div>
}`,...(G=(f=m.parameters)==null?void 0:f.docs)==null?void 0:G.source},description:{story:`## Layout Patterns

Common layout patterns for real-world applications.`,...(w=(D=m.parameters)==null?void 0:D.docs)==null?void 0:w.description}}};var S,R,z,A,k;t.parameters={...t.parameters,docs:{...(S=t.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <div className="u-mb-8">
      <h2 className="u-mb-6 u-text-primary">Column Sizing Options</h2>

      {/* Fixed Sizes */}
      <div className="u-mb-8">
        <h3 className="u-mb-4 u-text-primary">Fixed Column Sizes</h3>
        <p className="u-mb-4 u-text-secondary">Specify exact column widths (1-12):</p>

        <Grid className="u-mb-4">
          <GridCol xs={2}>
            <DemoCard variant="secondary">2 cols</DemoCard>
          </GridCol>
          <GridCol xs={10}>
            <DemoCard>10 cols</DemoCard>
          </GridCol>
        </Grid>

        <Grid className="u-mb-4">
          <GridCol xs={4}>
            <DemoCard variant="secondary">4 cols</DemoCard>
          </GridCol>
          <GridCol xs={8}>
            <DemoCard>8 cols</DemoCard>
          </GridCol>
        </Grid>

        <Grid className="u-mb-6">
          <GridCol xs={6}>
            <DemoCard variant="secondary">6 cols</DemoCard>
          </GridCol>
          <GridCol xs={6}>
            <DemoCard>6 cols</DemoCard>
          </GridCol>
        </Grid>
      </div>

      {/* Auto Sizing */}
      <div className="u-mb-8">
        <h3 className="u-mb-4 u-text-primary">Auto-Sizing Columns</h3>
        <p className="u-mb-4 u-text-secondary">Columns that automatically size based on content:</p>

        <Grid className="u-mb-4">
          <GridCol>
            <DemoCard variant="accent">Auto</DemoCard>
          </GridCol>
          <GridCol>
            <DemoCard variant="accent">Auto Width</DemoCard>
          </GridCol>
          <GridCol>
            <DemoCard variant="accent">Auto</DemoCard>
          </GridCol>
        </Grid>

        <Grid className="u-mb-6">
          <GridCol xs={4}>
            <DemoCard variant="secondary">Fixed (4 cols)</DemoCard>
          </GridCol>
          <GridCol>
            <DemoCard variant="accent">Auto (fills remaining)</DemoCard>
          </GridCol>
          <GridCol>
            <DemoCard variant="accent">Auto</DemoCard>
          </GridCol>
        </Grid>
      </div>

      {/* Mixed Sizes */}
      <div className="u-mb-8">
        <h3 className="u-mb-4 u-text-primary">Mixed Sizing</h3>
        <p className="u-mb-4 u-text-secondary">
          Combine fixed and auto sizing for flexible layouts:
        </p>

        <Grid className="u-mb-6">
          <GridCol xs={12} sm={6} md={4} lg="auto">
            <DemoCard variant="secondary">
              <div>Responsive</div>
              <div className="u-fs-sm">xs=12, sm=6, md=4, lg=auto</div>
            </DemoCard>
          </GridCol>
          <GridCol xs={12} sm={6} md={4} lg="auto">
            <DemoCard variant="secondary">
              <div>Responsive</div>
              <div className="u-fs-sm">xs=12, sm=6, md=4, lg=auto</div>
            </DemoCard>
          </GridCol>
          <GridCol xs={12} sm={12} md={4} lg="auto">
            <DemoCard variant="secondary">
              <div>Responsive</div>
              <div className="u-fs-sm">xs=12, sm=12, md=4, lg=auto</div>
            </DemoCard>
          </GridCol>
        </Grid>
      </div>
    </div>
}`,...(z=(R=t.parameters)==null?void 0:R.docs)==null?void 0:z.source},description:{story:`## Column Sizing

Flexible column sizing options for different content needs.`,...(k=(A=t.parameters)==null?void 0:A.docs)==null?void 0:k.description}}};var F,M,L,B,H;o.parameters={...o.parameters,docs:{...(F=o.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => <div className="u-mb-8">
      <h2 className="u-mb-6 u-text-primary">Column Offsets</h2>

      {/* Basic Offsets */}
      <div className="u-mb-8">
        <h3 className="u-mb-4 u-text-primary">Basic Offsets</h3>
        <p className="u-mb-4 u-text-secondary">Push columns to the right using offsets:</p>

        <Grid className="u-mb-4">
          <GridCol xs={4}>
            <DemoCard variant="secondary">4 columns</DemoCard>
          </GridCol>
          <GridCol xs={4} offsetXs={4}>
            <DemoCard>4 columns, offset 4</DemoCard>
          </GridCol>
        </Grid>

        <Grid className="u-mb-6">
          <GridCol xs={3} offsetXs={3}>
            <DemoCard variant="secondary">3 cols, offset 3</DemoCard>
          </GridCol>
          <GridCol xs={3} offsetXs={3}>
            <DemoCard>3 cols, offset 3</DemoCard>
          </GridCol>
        </Grid>
      </div>

      {/* Centering */}
      <div className="u-mb-8">
        <h3 className="u-mb-4 u-text-primary">Centering Content</h3>
        <p className="u-mb-4 u-text-secondary">Center columns using equal offsets:</p>

        <Grid className="u-mb-4">
          <GridCol xs={6} offsetXs={3}>
            <DemoCard variant="accent">Centered (6 cols, offset 3)</DemoCard>
          </GridCol>
        </Grid>

        <Grid className="u-mb-6">
          <GridCol xs={8} offsetXs={2}>
            <DemoCard variant="accent">Centered (8 cols, offset 2)</DemoCard>
          </GridCol>
        </Grid>
      </div>

      {/* Responsive Offsets */}
      <div className="u-mb-8">
        <h3 className="u-mb-4 u-text-primary">Responsive Offsets</h3>
        <p className="u-mb-4 u-text-secondary">Different offsets at different screen sizes:</p>

        <Grid className="u-mb-6">
          <GridCol xs={12} sm={6} offsetSm={3} md={4} offsetMd={4} lg={3} offsetLg={3}>
            <DemoCard variant="secondary">
              <div>Responsive Offsets</div>
              <div className="u-fs-sm">Changes at each breakpoint</div>
            </DemoCard>
          </GridCol>
        </Grid>
      </div>
    </div>
}`,...(L=(M=o.parameters)==null?void 0:M.docs)==null?void 0:L.source},description:{story:`## Column Offsets

Create spacing and alignment using column offsets.`,...(H=(B=o.parameters)==null?void 0:B.docs)==null?void 0:H.description}}};var T,O,I,W,P;c.parameters={...c.parameters,docs:{...(T=c.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => <div className="u-mb-8">
      <h2 className="u-mb-6 u-text-primary">Container Types</h2>

      {/* Default Container */}
      <div className="u-mb-8">
        <h3 className="u-mb-4 u-text-primary">Default Container</h3>
        <p className="u-mb-4 u-text-secondary">
          Responsive container with max-width at each breakpoint:
        </p>

        <Container className="u-mb-6">
          <DemoCard variant="accent" height="md">
            <div>Default Container</div>
            <div className="u-fs-sm u-text-secondary">Responsive max-width, centered</div>
          </DemoCard>
        </Container>
      </div>

      {/* Fluid Container */}
      <div className="u-mb-8">
        <h3 className="u-mb-4 u-text-primary">Fluid Container</h3>
        <p className="u-mb-4 u-text-secondary">
          Full-width container that spans the entire viewport:
        </p>

        <Container type="fluid" className="u-mb-6">
          <DemoCard variant="secondary" height="md">
            <div>Fluid Container</div>
            <div className="u-fs-sm u-text-secondary">Full viewport width</div>
          </DemoCard>
        </Container>
      </div>

      {/* Breakpoint Containers */}
      <div className="u-mb-8">
        <h3 className="u-mb-4 u-text-primary">Breakpoint Containers</h3>
        <p className="u-mb-4 u-text-secondary">
          Containers with max-width at specific breakpoints:
        </p>

        <Container type="sm" className="u-mb-4">
          <DemoCard variant="secondary">Small Container (max-width: sm)</DemoCard>
        </Container>

        <Container type="md" className="u-mb-4">
          <DemoCard variant="secondary">Medium Container (max-width: md)</DemoCard>
        </Container>

        <Container type="lg" className="u-mb-4">
          <DemoCard variant="secondary">Large Container (max-width: lg)</DemoCard>
        </Container>
      </div>

      {/* Container with Grid */}
      <div className="u-mb-8">
        <h3 className="u-mb-4 u-text-primary">Container with Grid</h3>
        <p className="u-mb-4 u-text-secondary">
          Combine containers with grids for structured layouts:
        </p>

        <Container className="u-mb-6">
          <Grid>
            <GridCol xs={12} md={4}>
              <DemoCard>Column 1</DemoCard>
            </GridCol>
            <GridCol xs={12} md={4}>
              <DemoCard>Column 2</DemoCard>
            </GridCol>
            <GridCol xs={12} md={4}>
              <DemoCard>Column 3</DemoCard>
            </GridCol>
          </Grid>
        </Container>
      </div>
    </div>
}`,...(I=(O=c.parameters)==null?void 0:O.docs)==null?void 0:I.source},description:{story:`## Containers

Container components for controlling max-width and centering content.`,...(P=(W=c.parameters)==null?void 0:W.docs)==null?void 0:P.description}}};var E,X,q,V,U;u.parameters={...u.parameters,docs:{...(E=u.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => <div className="u-mb-8">
      <h2 className="u-mb-6 u-text-primary">Alignment & Spacing</h2>

      {/* Horizontal Alignment */}
      <div className="u-mb-8">
        <h3 className="u-mb-4 u-text-primary">Horizontal Alignment</h3>
        <p className="u-mb-4 u-text-secondary">Control how columns are distributed horizontally:</p>

        <div className="u-mb-4">
          <h4 className="u-mb-3 u-text-secondary u-fw-medium">justify-content="start"</h4>
          <Row justifyContent="start" className="u-mb-4">
            <GridCol xs={3}>
              <DemoCard variant="secondary">Col 1</DemoCard>
            </GridCol>
            <GridCol xs={3}>
              <DemoCard variant="secondary">Col 2</DemoCard>
            </GridCol>
          </Row>
        </div>

        <div className="u-mb-4">
          <h4 className="u-mb-3 u-text-secondary u-fw-medium">justify-content="center"</h4>
          <Row justifyContent="center" className="u-mb-4">
            <GridCol xs={3}>
              <DemoCard variant="secondary">Col 1</DemoCard>
            </GridCol>
            <GridCol xs={3}>
              <DemoCard variant="secondary">Col 2</DemoCard>
            </GridCol>
          </Row>
        </div>

        <div className="u-mb-4">
          <h4 className="u-mb-3 u-text-secondary u-fw-medium">justify-content="between"</h4>
          <Row justifyContent="between" className="u-mb-4">
            <GridCol xs={3}>
              <DemoCard variant="secondary">Col 1</DemoCard>
            </GridCol>
            <GridCol xs={3}>
              <DemoCard variant="secondary">Col 2</DemoCard>
            </GridCol>
          </Row>
        </div>

        <div className="u-mb-6">
          <h4 className="u-mb-3 u-text-secondary u-fw-medium">justify-content="around"</h4>
          <Row justifyContent="around" className="u-mb-4">
            <GridCol xs={3}>
              <DemoCard variant="secondary">Col 1</DemoCard>
            </GridCol>
            <GridCol xs={3}>
              <DemoCard variant="secondary">Col 2</DemoCard>
            </GridCol>
          </Row>
        </div>
      </div>

      {/* Vertical Alignment */}
      <div className="u-mb-8">
        <h3 className="u-mb-4 u-text-primary">Vertical Alignment</h3>
        <p className="u-mb-4 u-text-secondary">
          Control how columns align vertically when they have different heights:
        </p>

        <div className="u-mb-4">
          <h4 className="u-mb-3 u-text-secondary u-fw-medium">align-items="start"</h4>
          <Row alignItems="start" className="u-mb-4 u-bg-light" style={{
          minHeight: '150px'
        }}>
            <GridCol xs={4}>
              <DemoCard height="sm">Short</DemoCard>
            </GridCol>
            <GridCol xs={4}>
              <DemoCard height="md">Medium</DemoCard>
            </GridCol>
            <GridCol xs={4}>
              <DemoCard height="lg">Tall</DemoCard>
            </GridCol>
          </Row>
        </div>

        <div className="u-mb-4">
          <h4 className="u-mb-3 u-text-secondary u-fw-medium">align-items="center"</h4>
          <Row alignItems="center" className="u-mb-4 u-bg-light" style={{
          minHeight: '150px'
        }}>
            <GridCol xs={4}>
              <DemoCard height="sm">Short</DemoCard>
            </GridCol>
            <GridCol xs={4}>
              <DemoCard height="md">Medium</DemoCard>
            </GridCol>
            <GridCol xs={4}>
              <DemoCard height="lg">Tall</DemoCard>
            </GridCol>
          </Row>
        </div>

        <div className="u-mb-6">
          <h4 className="u-mb-3 u-text-secondary u-fw-medium">align-items="end"</h4>
          <Row alignItems="end" className="u-mb-4 u-bg-light" style={{
          minHeight: '150px'
        }}>
            <GridCol xs={4}>
              <DemoCard height="sm">Short</DemoCard>
            </GridCol>
            <GridCol xs={4}>
              <DemoCard height="md">Medium</DemoCard>
            </GridCol>
            <GridCol xs={4}>
              <DemoCard height="lg">Tall</DemoCard>
            </GridCol>
          </Row>
        </div>
      </div>

      {/* No Gutters */}
      <div className="u-mb-8">
        <h3 className="u-mb-4 u-text-primary">No Gutters</h3>
        <p className="u-mb-4 u-text-secondary">Remove spacing between columns:</p>

        <div className="u-mb-4">
          <h4 className="u-mb-3 u-text-secondary u-fw-medium">With gutters (default)</h4>
          <Row className="u-mb-4">
            <GridCol xs={4}>
              <DemoCard variant="secondary">Column 1</DemoCard>
            </GridCol>
            <GridCol xs={4}>
              <DemoCard variant="secondary">Column 2</DemoCard>
            </GridCol>
            <GridCol xs={4}>
              <DemoCard variant="secondary">Column 3</DemoCard>
            </GridCol>
          </Row>
        </div>

        <div className="u-mb-6">
          <h4 className="u-mb-3 u-text-secondary u-fw-medium">No gutters</h4>
          <Row noGutters className="u-mb-4">
            <GridCol xs={4}>
              <DemoCard variant="accent">Column 1</DemoCard>
            </GridCol>
            <GridCol xs={4}>
              <DemoCard variant="accent">Column 2</DemoCard>
            </GridCol>
            <GridCol xs={4}>
              <DemoCard variant="accent">Column 3</DemoCard>
            </GridCol>
          </Row>
        </div>
      </div>
    </div>
}`,...(q=(X=u.parameters)==null?void 0:X.docs)==null?void 0:q.source},description:{story:`## Alignment & Spacing

Control alignment and spacing within grids and rows.`,...(U=(V=u.parameters)==null?void 0:V.docs)==null?void 0:U.description}}};var _,$,J,K,Q;x.parameters={...x.parameters,docs:{...(_=x.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => <div className="u-mb-8">
      <h2 className="u-mb-6 u-text-primary">Nested Grids</h2>
      <p className="u-mb-6 u-text-secondary">
        Create complex layouts by nesting grids within columns. Each nested grid starts fresh with
        12 columns.
      </p>

      <Grid>
        <GridCol xs={12} md={6}>
          <div className="u-p-4 u-border u-rounded u-bg-info-subtle u-mb-4">
            <h4 className="u-mb-4 u-text-primary">Left Section</h4>
            <Grid>
              <GridCol xs={12} className="u-mb-4">
                <DemoCard variant="secondary">Nested Full Width</DemoCard>
              </GridCol>
              <GridCol xs={6}>
                <DemoCard variant="secondary">Nested 1/2</DemoCard>
              </GridCol>
              <GridCol xs={6}>
                <DemoCard variant="secondary">Nested 1/2</DemoCard>
              </GridCol>
            </Grid>
          </div>
        </GridCol>

        <GridCol xs={12} md={6}>
          <div className="u-p-4 u-border u-rounded u-bg-success-subtle u-mb-4">
            <h4 className="u-mb-4 u-text-primary">Right Section</h4>
            <Grid>
              <GridCol xs={4}>
                <DemoCard variant="accent">1/3</DemoCard>
              </GridCol>
              <GridCol xs={4}>
                <DemoCard variant="accent">1/3</DemoCard>
              </GridCol>
              <GridCol xs={4}>
                <DemoCard variant="accent">1/3</DemoCard>
              </GridCol>
            </Grid>
          </div>
        </GridCol>
      </Grid>

      <div className="u-mt-8">
        <h3 className="u-mb-4 u-text-primary">Complex Nested Example</h3>
        <p className="u-mb-4 u-text-secondary">
          Dashboard-style layout with multiple levels of nesting:
        </p>

        <Grid>
          <GridCol xs={12}>
            <div className="u-p-4 u-border u-rounded u-bg-warning-subtle u-mb-4">
              <h4 className="u-mb-4 u-text-primary">Header</h4>
              <Grid>
                <GridCol xs={12} sm={6} md={8}>
                  <DemoCard variant="secondary">Logo & Navigation</DemoCard>
                </GridCol>
                <GridCol xs={12} sm={6} md={4}>
                  <DemoCard variant="secondary">User Actions</DemoCard>
                </GridCol>
              </Grid>
            </div>
          </GridCol>

          <GridCol xs={12} md={3}>
            <div className="u-p-4 u-border u-rounded u-bg-info-subtle u-mb-4">
              <h4 className="u-mb-4 u-text-primary">Sidebar</h4>
              <Grid>
                <GridCol xs={12} className="u-mb-2">
                  <DemoCard variant="accent" height="sm">
                    Menu Item 1
                  </DemoCard>
                </GridCol>
                <GridCol xs={12} className="u-mb-2">
                  <DemoCard variant="accent" height="sm">
                    Menu Item 2
                  </DemoCard>
                </GridCol>
                <GridCol xs={12}>
                  <DemoCard variant="accent" height="sm">
                    Menu Item 3
                  </DemoCard>
                </GridCol>
              </Grid>
            </div>
          </GridCol>

          <GridCol xs={12} md={9}>
            <div className="u-p-4 u-border u-rounded u-bg-success-subtle">
              <h4 className="u-mb-4 u-text-primary">Main Content</h4>
              <Grid>
                <GridCol xs={12} className="u-mb-4">
                  <DemoCard height="sm">Content Header</DemoCard>
                </GridCol>
                <GridCol xs={12} sm={6} lg={4}>
                  <DemoCard variant="secondary">Widget 1</DemoCard>
                </GridCol>
                <GridCol xs={12} sm={6} lg={4}>
                  <DemoCard variant="secondary">Widget 2</DemoCard>
                </GridCol>
                <GridCol xs={12} sm={12} lg={4}>
                  <DemoCard variant="secondary">Widget 3</DemoCard>
                </GridCol>
              </Grid>
            </div>
          </GridCol>
        </Grid>
      </div>
    </div>
}`,...(J=($=x.parameters)==null?void 0:$.docs)==null?void 0:J.source},description:{story:`## Nested Grids

Create complex layouts by nesting grids within columns.`,...(Q=(K=x.parameters)==null?void 0:K.docs)==null?void 0:Q.description}}};var Y,Z,ee,se,ne;h.parameters={...h.parameters,docs:{...(Y=h.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: () => <div className="u-mb-8">
      <h2 className="u-mb-6 u-text-primary">Breakpoint Reference</h2>
      <p className="u-mb-6 u-text-secondary">
        The grid system uses these breakpoints. Resize your browser to see how columns adapt.
      </p>

      <div className="u-mb-6 u-p-4 u-border u-rounded u-bg-light">
        <h4 className="u-mb-4 u-text-primary">Breakpoint Sizes</h4>
        <ul className="u-text-secondary">
          <li>
            <strong>xs:</strong> 0px and up (all devices)
          </li>
          <li>
            <strong>sm:</strong> 576px and up (tablets)
          </li>
          <li>
            <strong>md:</strong> 768px and up (small laptops)
          </li>
          <li>
            <strong>lg:</strong> 992px and up (large laptops)
          </li>
          <li>
            <strong>xl:</strong> 1200px and up (desktops)
          </li>
          <li>
            <strong>xxl:</strong> 1440px and up (large desktops)
          </li>
        </ul>
      </div>

      <h3 className="u-mb-4 u-text-primary">Responsive Behavior Demo</h3>
      <p className="u-mb-4 u-text-secondary">
        These columns show different layouts at each breakpoint:
      </p>

      <Grid className="u-mb-6">
        <GridCol xs={12} sm={6} md={4} lg={3} xl={2}>
          <DemoCard variant="secondary">
            <div className="u-fw-bold">Column 1</div>
            <div className="u-fs-sm">xs=12, sm=6, md=4, lg=3, xl=2</div>
          </DemoCard>
        </GridCol>
        <GridCol xs={12} sm={6} md={4} lg={3} xl={2}>
          <DemoCard variant="secondary">
            <div className="u-fw-bold">Column 2</div>
            <div className="u-fs-sm">xs=12, sm=6, md=4, lg=3, xl=2</div>
          </DemoCard>
        </GridCol>
        <GridCol xs={12} sm={6} md={4} lg={3} xl={2}>
          <DemoCard variant="secondary">
            <div className="u-fw-bold">Column 3</div>
            <div className="u-fs-sm">xs=12, sm=6, md=4, lg=3, xl=2</div>
          </DemoCard>
        </GridCol>
        <GridCol xs={12} sm={6} md={4} lg={3} xl={2}>
          <DemoCard variant="secondary">
            <div className="u-fw-bold">Column 4</div>
            <div className="u-fs-sm">xs=12, sm=6, md=4, lg=3, xl=2</div>
          </DemoCard>
        </GridCol>
        <GridCol xs={12} sm={6} md={4} lg={3} xl={2}>
          <DemoCard variant="secondary">
            <div className="u-fw-bold">Column 5</div>
            <div className="u-fs-sm">xs=12, sm=6, md=4, lg=3, xl=2</div>
          </DemoCard>
        </GridCol>
        <GridCol xs={12} sm={6} md={4} lg={3} xl={2}>
          <DemoCard variant="secondary">
            <div className="u-fw-bold">Column 6</div>
            <div className="u-fs-sm">xs=12, sm=6, md=4, lg=3, xl=2</div>
          </DemoCard>
        </GridCol>
      </Grid>

      <div className="u-p-4 u-border u-rounded u-bg-warning-subtle">
        <h4 className="u-mb-3 u-text-primary">Current Breakpoint</h4>
        <p className="u-text-secondary u-mb-0">
          Resize your browser window to see how the columns above adapt to different screen sizes.
          The grid system automatically adjusts the layout based on the available space.
        </p>
      </div>
    </div>
}`,...(ee=(Z=h.parameters)==null?void 0:Z.docs)==null?void 0:ee.source},description:{story:`## Breakpoint Reference

Visual reference for how the grid system responds at different screen sizes.`,...(ne=(se=h.parameters)==null?void 0:se.docs)==null?void 0:ne.description}}};const ce=["GettingStarted","LayoutPatterns","ColumnSizing","ColumnOffsets","Containers","AlignmentAndSpacing","NestedGrids","BreakpointReference"];export{u as AlignmentAndSpacing,h as BreakpointReference,o as ColumnOffsets,t as ColumnSizing,c as Containers,l as GettingStarted,m as LayoutPatterns,x as NestedGrids,ce as __namedExportsOrder,oe as default};
