import{j as s}from"./jsx-runtime-BjG_zV1W.js";import{G as a,a as e,C as r}from"./Container-CXdNHNc5.js";import{R as i}from"./Row-BOpniq1U.js";import"./index-BVDOR7y2.js";const cs={title:"Layouts/Grid",component:a,parameters:{layout:"fullscreen",docs:{description:{component:"A responsive grid system for creating flexible layouts. Based on a 12-column system with responsive breakpoints."}}},decorators:[d=>s.jsx("div",{style:{padding:"1rem"},children:s.jsx(d,{})})]},n=({children:d,variant:C="primary",height:as="auto"})=>{const is={auto:"60px",sm:"50px",md:"75px",lg:"100px"},rs={primary:"u-bg-brand-subtle u-border-brand-subtle",secondary:"u-bg-success-subtle u-border-success-subtle",accent:"u-bg-info-subtle u-border-info-subtle"},ds={primary:"u-text-brand-emphasis",secondary:"u-text-success-emphasis",accent:"u-text-info-emphasis"};return s.jsx("div",{className:`u-p-4 u-rounded u-border u-text-center u-d-flex u-align-items-center u-justify-content-center ${rs[C]}`,style:{minHeight:is[as]},children:s.jsx("div",{className:`${ds[C]} u-fw-medium`,children:d})})},b=({children:d})=>s.jsx("pre",{className:"u-bg-dark-subtle u-text-error-emphasis u-p-3 u-rounded u-fs-sm u-fw-normal",style:{fontFamily:"monospace"},children:d}),m={render:()=>s.jsxs("div",{className:"u-mb-8",children:[s.jsx("h2",{className:"u-mb-1 u-text-brand-emphasis",children:"Basic Grid Layout"}),s.jsx("p",{className:"u-mb-6 u-text-secondary-emphasis",children:"Equal columns that stack on mobile and expand on larger screens:"}),s.jsxs(a,{className:"u-mb-6",children:[s.jsx(e,{xs:12,md:4,children:s.jsx(n,{children:"Column 1"})}),s.jsx(e,{xs:12,md:4,children:s.jsx(n,{children:"Column 2"})}),s.jsx(e,{xs:12,md:4,children:s.jsx(n,{children:"Column 3"})})]}),s.jsx(b,{children:`<Grid>
  <GridCol xs={12} md={4}> Column 1 </GridCol>
  <GridCol xs={12} md={4}> Column 2 </GridCol>
  <GridCol xs={12} md={4}> Column 3 </GridCol>
</Grid>`}),s.jsxs("div",{className:"u-mt-8",children:[s.jsx("h3",{className:"u-mb-1 u-text-brand-emphasis",children:"Responsive Behavior"}),s.jsx("p",{className:"u-mb-4 u-text-secondary-emphasis",children:"Columns automatically adjust at different screen sizes:"}),s.jsxs(a,{className:"u-mb-6",children:[s.jsx(e,{xs:12,sm:6,md:4,lg:3,children:s.jsxs(n,{variant:"secondary",children:[s.jsx("div",{children:"Mobile: Full width"}),s.jsx("div",{children:"Tablet: Half width"}),s.jsx("div",{children:"Desktop: 1/3 width"}),s.jsx("div",{children:"Large: 1/4 width"})]})}),s.jsx(e,{xs:12,sm:6,md:4,lg:3,children:s.jsx(n,{variant:"secondary",children:"Responsive"})}),s.jsx(e,{xs:12,sm:6,md:4,lg:3,children:s.jsx(n,{variant:"secondary",children:"Columns"})}),s.jsx(e,{xs:12,sm:6,md:4,lg:3,children:s.jsx(n,{variant:"secondary",children:"Example"})})]}),s.jsx(b,{children:`<GridCol xs={12} sm={6} md={4} lg={3}>
  Responsive column
</GridCol>`})]})]})},l={render:()=>s.jsxs("div",{className:"u-mb-8",children:[s.jsx("h2",{className:"u-mb-6 u-text-brand-emphasis",children:"Common Layout Patterns"}),s.jsxs("div",{className:"u-mb-8",children:[s.jsx("h3",{className:"u-mb-1 u-text-brand-emphasis",children:"Sidebar Layout"}),s.jsx("p",{className:"u-mb-4",children:"Perfect for dashboards and admin interfaces:"}),s.jsxs(a,{className:"u-mb-6",children:[s.jsx(e,{xs:12,md:3,children:s.jsxs(n,{variant:"accent",height:"lg",children:[s.jsx("div",{children:"Sidebar"}),s.jsx("div",{className:"u-fs-sm ",children:"Navigation, filters, etc."})]})}),s.jsx(e,{xs:12,md:9,children:s.jsxs(n,{height:"lg",children:[s.jsx("div",{children:"Main Content"}),s.jsx("div",{className:"u-fs-sm",children:"Primary content area"})]})})]})]}),s.jsxs("div",{className:"u-mb-8",children:[s.jsx("h3",{className:"u-mb-1 u-text-brand-emphasis",children:"Hero + Features"}),s.jsx("p",{className:"u-mb-4 ",children:"Landing page layout with hero section and feature cards:"}),s.jsx(a,{className:"u-mb-4",children:s.jsx(e,{xs:12,children:s.jsxs(n,{variant:"accent",height:"md",children:[s.jsx("div",{children:"Hero Section"}),s.jsx("div",{className:"u-fs-sm",children:"Full-width banner"})]})})}),s.jsxs(a,{className:"u-mb-6",children:[s.jsx(e,{xs:12,sm:6,lg:4,children:s.jsx(n,{variant:"secondary",children:"Feature 1"})}),s.jsx(e,{xs:12,sm:6,lg:4,children:s.jsx(n,{variant:"secondary",children:"Feature 2"})}),s.jsx(e,{xs:12,sm:12,lg:4,children:s.jsx(n,{variant:"secondary",children:"Feature 3"})})]})]}),s.jsxs("div",{className:"u-mb-8",children:[s.jsx("h3",{className:"u-mb-1 u-text-brand-emphasis",children:"Article Layout"}),s.jsx("p",{className:"u-mb-4 u-text-secondary-emphasis",children:"Centered content with optional sidebar:"}),s.jsx(a,{className:"u-mb-6",children:s.jsx(e,{xs:12,md:8,offsetMd:2,children:s.jsxs(n,{height:"lg",children:[s.jsx("div",{children:"Article Content"}),s.jsx("div",{className:"u-fs-sm u-text-secondary-emphasis",children:"Centered, readable width"})]})})})]})]})},t={render:()=>s.jsxs("div",{className:"u-mb-8",children:[s.jsx("h2",{className:"u-mb-6 u-text-brand-emphasis",children:"Column Sizing Options"}),s.jsxs("div",{className:"u-mb-8",children:[s.jsx("h3",{className:"u-mb-1 u-text-brand-emphasis",children:"Fixed Column Sizes"}),s.jsx("p",{className:"u-mb-4 u-text-secondary-emphasis",children:"Specify exact column widths (1-12):"}),s.jsxs(a,{className:"u-mb-4",children:[s.jsx(e,{xs:2,children:s.jsx(n,{variant:"secondary",children:"2 cols"})}),s.jsx(e,{xs:10,children:s.jsx(n,{children:"10 cols"})})]}),s.jsxs(a,{className:"u-mb-4",children:[s.jsx(e,{xs:4,children:s.jsx(n,{variant:"secondary",children:"4 cols"})}),s.jsx(e,{xs:8,children:s.jsx(n,{children:"8 cols"})})]}),s.jsxs(a,{className:"u-mb-6",children:[s.jsx(e,{xs:6,children:s.jsx(n,{variant:"secondary",children:"6 cols"})}),s.jsx(e,{xs:6,children:s.jsx(n,{children:"6 cols"})})]})]}),s.jsxs("div",{className:"u-mb-8",children:[s.jsx("h3",{className:"u-mb-1 u-text-brand-emphasis",children:"Auto-Sizing Columns"}),s.jsx("p",{className:"u-mb-4 u-text-secondary-emphasis",children:"Columns that automatically size based on content:"}),s.jsxs(a,{className:"u-mb-4",children:[s.jsx(e,{children:s.jsx(n,{variant:"accent",children:"Auto"})}),s.jsx(e,{children:s.jsx(n,{variant:"accent",children:"Auto Width"})}),s.jsx(e,{children:s.jsx(n,{variant:"accent",children:"Auto"})})]}),s.jsxs(a,{className:"u-mb-6",children:[s.jsx(e,{xs:4,children:s.jsx(n,{variant:"secondary",children:"Fixed (4 cols)"})}),s.jsx(e,{children:s.jsx(n,{variant:"accent",children:"Auto (fills remaining)"})}),s.jsx(e,{children:s.jsx(n,{variant:"accent",children:"Auto"})})]})]}),s.jsxs("div",{className:"u-mb-8",children:[s.jsx("h3",{className:"u-mb-1 u-text-brand-emphasis",children:"Mixed Sizing"}),s.jsx("p",{className:"u-mb-4 u-text-secondary-emphasis",children:"Combine fixed and auto sizing for flexible layouts:"}),s.jsxs(a,{className:"u-mb-6",children:[s.jsx(e,{xs:12,sm:6,md:4,lg:"auto",children:s.jsxs(n,{variant:"secondary",children:[s.jsx("div",{children:"Responsive"}),s.jsx("div",{className:"u-fs-sm",children:"xs=12, sm=6, md=4, lg=auto"})]})}),s.jsx(e,{xs:12,sm:6,md:4,lg:"auto",children:s.jsxs(n,{variant:"secondary",children:[s.jsx("div",{children:"Responsive"}),s.jsx("div",{className:"u-fs-sm",children:"xs=12, sm=6, md=4, lg=auto"})]})}),s.jsx(e,{xs:12,sm:12,md:4,lg:"auto",children:s.jsxs(n,{variant:"secondary",children:[s.jsx("div",{children:"Responsive"}),s.jsx("div",{className:"u-fs-sm",children:"xs=12, sm=12, md=4, lg=auto"})]})})]})]})]})},o={render:()=>s.jsxs("div",{className:"u-mb-8",children:[s.jsx("h2",{className:"u-mb-6 u-text-brand-emphasis",children:"Column Offsets"}),s.jsxs("div",{className:"u-mb-8",children:[s.jsx("h3",{className:"u-mb-1 u-text-brand-emphasis",children:"Basic Offsets"}),s.jsx("p",{className:"u-mb-4 u-text-secondary-emphasis",children:"Push columns to the right using offsets:"}),s.jsxs(a,{className:"u-mb-4",children:[s.jsx(e,{xs:4,children:s.jsx(n,{variant:"secondary",children:"4 columns"})}),s.jsx(e,{xs:4,offsetXs:4,children:s.jsx(n,{children:"4 columns, offset 4"})})]}),s.jsxs(a,{className:"u-mb-6",children:[s.jsx(e,{xs:3,offsetXs:3,children:s.jsx(n,{variant:"secondary",children:"3 cols, offset 3"})}),s.jsx(e,{xs:3,offsetXs:3,children:s.jsx(n,{children:"3 cols, offset 3"})})]})]}),s.jsxs("div",{className:"u-mb-8",children:[s.jsx("h3",{className:"u-mb-1 u-text-brand-emphasis",children:"Centering Content"}),s.jsx("p",{className:"u-mb-4 u-text-secondary-emphasis",children:"Center columns using equal offsets:"}),s.jsx(a,{className:"u-mb-4",children:s.jsx(e,{xs:6,offsetXs:3,children:s.jsx(n,{variant:"accent",children:"Centered (6 cols, offset 3)"})})}),s.jsx(a,{className:"u-mb-6",children:s.jsx(e,{xs:8,offsetXs:2,children:s.jsx(n,{variant:"accent",children:"Centered (8 cols, offset 2)"})})})]}),s.jsxs("div",{className:"u-mb-8",children:[s.jsx("h3",{className:"u-mb-1 u-text-brand-emphasis",children:"Responsive Offsets"}),s.jsx("p",{className:"u-mb-4 u-text-secondary-emphasis",children:"Different offsets at different screen sizes:"}),s.jsx(a,{className:"u-mb-6",children:s.jsx(e,{xs:12,sm:6,offsetSm:3,md:4,offsetMd:4,lg:3,offsetLg:3,children:s.jsxs(n,{variant:"secondary",children:[s.jsx("div",{children:"Responsive Offsets"}),s.jsx("div",{className:"u-fs-sm",children:"Changes at each breakpoint"})]})})})]})]})},c={render:()=>s.jsxs("div",{className:"u-mb-8",children:[s.jsx("h2",{className:"u-mb-6 u-text-brand-emphasis",children:"Container Types"}),s.jsxs("div",{className:"u-mb-8",children:[s.jsx("h3",{className:"u-mb-1 u-text-brand-emphasis",children:"Default Container"}),s.jsx("p",{className:"u-mb-4 u-text-secondary-emphasis",children:"Responsive container with max-width at each breakpoint:"}),s.jsx(r,{className:"u-mb-6",children:s.jsxs(n,{variant:"accent",height:"md",children:[s.jsx("div",{children:"Default Container"}),s.jsx("div",{className:"u-fs-sm u-text-secondary-emphasis",children:"Responsive max-width, centered"})]})})]}),s.jsxs("div",{className:"u-mb-8",children:[s.jsx("h3",{className:"u-mb-1 u-text-brand-emphasis",children:"Fluid Container"}),s.jsx("p",{className:"u-mb-4 u-text-secondary-emphasis",children:"Full-width container that spans the entire viewport:"}),s.jsx(r,{type:"fluid",className:"u-mb-6",children:s.jsxs(n,{variant:"secondary",height:"md",children:[s.jsx("div",{children:"Fluid Container"}),s.jsx("div",{className:"u-fs-sm u-text-secondary-emphasis",children:"Full viewport width"})]})})]}),s.jsxs("div",{className:"u-mb-8",children:[s.jsx("h3",{className:"u-mb-1 u-text-brand-emphasis",children:"Breakpoint Containers"}),s.jsx("p",{className:"u-mb-4 u-text-secondary-emphasis",children:"Containers with max-width at specific breakpoints:"}),s.jsx(r,{type:"sm",className:"u-mb-4",children:s.jsx(n,{variant:"secondary",children:"Small Container (max-width: sm)"})}),s.jsx(r,{type:"md",className:"u-mb-4",children:s.jsx(n,{variant:"secondary",children:"Medium Container (max-width: md)"})}),s.jsx(r,{type:"lg",className:"u-mb-4",children:s.jsx(n,{variant:"secondary",children:"Large Container (max-width: lg)"})})]}),s.jsxs("div",{className:"u-mb-8",children:[s.jsx("h3",{className:"u-mb-1 u-text-brand-emphasis",children:"Container with Grid"}),s.jsx("p",{className:"u-mb-4 u-text-secondary-emphasis",children:"Combine containers with grids for structured layouts:"}),s.jsx(r,{className:"u-mb-6",children:s.jsxs(a,{children:[s.jsx(e,{xs:12,md:4,children:s.jsx(n,{children:"Column 1"})}),s.jsx(e,{xs:12,md:4,children:s.jsx(n,{children:"Column 2"})}),s.jsx(e,{xs:12,md:4,children:s.jsx(n,{children:"Column 3"})})]})})]})]})},u={render:()=>s.jsxs("div",{className:"u-mb-8",children:[s.jsx("h2",{className:"u-mb-6 u-text-brand-emphasis",children:"Alignment & Spacing"}),s.jsxs("div",{className:"u-mb-8",children:[s.jsx("h3",{className:"u-mb-1 u-text-brand-emphasis",children:"Horizontal Alignment"}),s.jsx("p",{className:"u-mb-4 u-text-secondary-emphasis",children:"Control how columns are distributed horizontally:"}),s.jsxs("div",{className:"u-mb-4",children:[s.jsx("h4",{className:"u-mb-3 u-text-secondary-emphasis u-fw-medium",children:'justify-content="start"'}),s.jsxs(i,{justifyContent:"start",className:"u-mb-4",children:[s.jsx(e,{xs:3,children:s.jsx(n,{variant:"secondary",children:"Col 1"})}),s.jsx(e,{xs:3,children:s.jsx(n,{variant:"secondary",children:"Col 2"})})]})]}),s.jsxs("div",{className:"u-mb-4",children:[s.jsx("h4",{className:"u-mb-3 u-text-secondary-emphasis u-fw-medium",children:'justify-content="center"'}),s.jsxs(i,{justifyContent:"center",className:"u-mb-4",children:[s.jsx(e,{xs:3,children:s.jsx(n,{variant:"secondary",children:"Col 1"})}),s.jsx(e,{xs:3,children:s.jsx(n,{variant:"secondary",children:"Col 2"})})]})]}),s.jsxs("div",{className:"u-mb-4",children:[s.jsx("h4",{className:"u-mb-3 u-text-secondary-emphasis u-fw-medium",children:'justify-content="between"'}),s.jsxs(i,{justifyContent:"between",className:"u-mb-4",children:[s.jsx(e,{xs:3,children:s.jsx(n,{variant:"secondary",children:"Col 1"})}),s.jsx(e,{xs:3,children:s.jsx(n,{variant:"secondary",children:"Col 2"})})]})]}),s.jsxs("div",{className:"u-mb-6",children:[s.jsx("h4",{className:"u-mb-3 u-text-secondary-emphasis u-fw-medium",children:'justify-content="around"'}),s.jsxs(i,{justifyContent:"around",className:"u-mb-4",children:[s.jsx(e,{xs:3,children:s.jsx(n,{variant:"secondary",children:"Col 1"})}),s.jsx(e,{xs:3,children:s.jsx(n,{variant:"secondary",children:"Col 2"})})]})]})]}),s.jsxs("div",{className:"u-mb-8",children:[s.jsx("h3",{className:"u-mb-1 u-text-brand-emphasis",children:"Vertical Alignment"}),s.jsx("p",{className:"u-mb-4 u-text-secondary-emphasis",children:"Control how columns align vertically when they have different heights:"}),s.jsxs("div",{className:"u-mb-4",children:[s.jsx("h4",{className:"u-mb-3 u-text-secondary-emphasis u-fw-medium",children:'align-items="start"'}),s.jsxs(i,{alignItems:"start",className:"u-mb-4 u-bg-brand-subtle",style:{minHeight:"150px"},children:[s.jsx(e,{xs:4,children:s.jsx(n,{height:"sm",children:"Short"})}),s.jsx(e,{xs:4,children:s.jsx(n,{height:"md",children:"Medium"})}),s.jsx(e,{xs:4,children:s.jsx(n,{height:"lg",children:"Tall"})})]})]}),s.jsxs("div",{className:"u-mb-4",children:[s.jsx("h4",{className:"u-mb-3 u-text-secondary-emphasis u-fw-medium",children:'align-items="center"'}),s.jsxs(i,{alignItems:"center",className:"u-mb-4 u-bg-brand-subtle",style:{minHeight:"150px"},children:[s.jsx(e,{xs:4,children:s.jsx(n,{height:"sm",children:"Short"})}),s.jsx(e,{xs:4,children:s.jsx(n,{height:"md",children:"Medium"})}),s.jsx(e,{xs:4,children:s.jsx(n,{height:"lg",children:"Tall"})})]})]}),s.jsxs("div",{className:"u-mb-6",children:[s.jsx("h4",{className:"u-mb-3 u-text-secondary-emphasis u-fw-medium",children:'align-items="end"'}),s.jsxs(i,{alignItems:"end",className:"u-mb-4 u-bg-brand-subtle",style:{minHeight:"150px"},children:[s.jsx(e,{xs:4,children:s.jsx(n,{height:"sm",children:"Short"})}),s.jsx(e,{xs:4,children:s.jsx(n,{height:"md",children:"Medium"})}),s.jsx(e,{xs:4,children:s.jsx(n,{height:"lg",children:"Tall"})})]})]})]}),s.jsxs("div",{className:"u-mb-8",children:[s.jsx("h3",{className:"u-mb-1 u-text-brand-emphasis",children:"No Gutters"}),s.jsx("p",{className:"u-mb-4 u-text-secondary-emphasis",children:"Remove spacing between columns:"}),s.jsxs("div",{className:"u-mb-4",children:[s.jsx("h4",{className:"u-mb-3 u-text-secondary-emphasis u-fw-medium",children:"With gutters (default)"}),s.jsxs(i,{className:"u-mb-4",children:[s.jsx(e,{xs:4,children:s.jsx(n,{variant:"secondary",children:"Column 1"})}),s.jsx(e,{xs:4,children:s.jsx(n,{variant:"secondary",children:"Column 2"})}),s.jsx(e,{xs:4,children:s.jsx(n,{variant:"secondary",children:"Column 3"})})]})]}),s.jsxs("div",{className:"u-mb-6",children:[s.jsx("h4",{className:"u-mb-3 u-text-secondary-emphasis u-fw-medium",children:"No gutters"}),s.jsxs(i,{noGutters:!0,className:"u-mb-4",children:[s.jsx(e,{xs:4,children:s.jsx(n,{variant:"accent",children:"Column 1"})}),s.jsx(e,{xs:4,children:s.jsx(n,{variant:"accent",children:"Column 2"})}),s.jsx(e,{xs:4,children:s.jsx(n,{variant:"accent",children:"Column 3"})})]})]})]})]})},h={render:()=>s.jsxs("div",{className:"u-mb-8",children:[s.jsx("h2",{className:"u-mb-6 u-text-brand-emphasis",children:"Nested Grids"}),s.jsx("p",{className:"u-mb-6 u-text-secondary-emphasis",children:"Create complex layouts by nesting grids within columns. Each nested grid starts fresh with 12 columns."}),s.jsxs(a,{children:[s.jsx(e,{xs:12,md:6,children:s.jsxs("div",{className:"u-p-4 u-border u-rounded u-bg-info-subtle u-mb-4",children:[s.jsx("h4",{className:"u-mb-4 u-text-info-emphasis",children:"Left Section"}),s.jsxs(a,{children:[s.jsx(e,{xs:12,className:"u-mb-4",children:s.jsx(n,{variant:"secondary",children:"Nested Full Width"})}),s.jsx(e,{xs:6,children:s.jsx(n,{variant:"secondary",children:"Nested 1/2"})}),s.jsx(e,{xs:6,children:s.jsx(n,{variant:"secondary",children:"Nested 1/2"})})]})]})}),s.jsx(e,{xs:12,md:6,children:s.jsxs("div",{className:"u-p-4 u-border u-rounded u-bg-success-subtle u-mb-4",children:[s.jsx("h4",{className:"u-mb-4 u-text-success-emphasis",children:"Right Section"}),s.jsxs(a,{children:[s.jsx(e,{xs:4,children:s.jsx(n,{variant:"accent",children:"1/3"})}),s.jsx(e,{xs:4,children:s.jsx(n,{variant:"accent",children:"1/3"})}),s.jsx(e,{xs:4,children:s.jsx(n,{variant:"accent",children:"1/3"})})]})]})})]}),s.jsxs("div",{className:"u-mt-8",children:[s.jsx("h3",{className:"u-mb-1 u-text-brand-emphasis",children:"Complex Nested Example"}),s.jsx("p",{className:"u-mb-4 u-text-brand-emphasis",children:"Dashboard-style layout with multiple levels of nesting:"}),s.jsxs(a,{children:[s.jsx(e,{xs:12,children:s.jsxs("div",{className:"u-p-4 u-border u-rounded u-bg-warning-subtle u-mb-4",children:[s.jsx("h4",{className:"u-mb-4 u-text-warning-emphasis",children:"Header"}),s.jsxs(a,{children:[s.jsx(e,{xs:12,sm:6,md:8,children:s.jsx(n,{variant:"secondary",children:"Logo & Navigation"})}),s.jsx(e,{xs:12,sm:6,md:4,children:s.jsx(n,{variant:"secondary",children:"User Actions"})})]})]})}),s.jsx(e,{xs:12,md:3,children:s.jsxs("div",{className:"u-p-4 u-border u-rounded u-bg-info-subtle u-mb-4",children:[s.jsx("h4",{className:"u-mb-4 u-text-info-emphasis",children:"Sidebar"}),s.jsxs(a,{children:[s.jsx(e,{xs:12,className:"u-mb-2",children:s.jsx(n,{variant:"accent",height:"sm",children:"Menu Item 1"})}),s.jsx(e,{xs:12,className:"u-mb-2",children:s.jsx(n,{variant:"accent",height:"sm",children:"Menu Item 2"})}),s.jsx(e,{xs:12,children:s.jsx(n,{variant:"accent",height:"sm",children:"Menu Item 3"})})]})]})}),s.jsx(e,{xs:12,md:9,children:s.jsxs("div",{className:"u-p-4 u-border u-rounded u-bg-success-subtle",children:[s.jsx("h4",{className:"u-mb-4 u-text-success-emphasis",children:"Main Content"}),s.jsxs(a,{children:[s.jsx(e,{xs:12,className:"u-mb-4",children:s.jsx(n,{height:"sm",children:"Content Header"})}),s.jsx(e,{xs:12,sm:6,lg:4,children:s.jsx(n,{variant:"secondary",children:"Widget 1"})}),s.jsx(e,{xs:12,sm:6,lg:4,children:s.jsx(n,{variant:"secondary",children:"Widget 2"})}),s.jsx(e,{xs:12,sm:12,lg:4,children:s.jsx(n,{variant:"secondary",children:"Widget 3"})})]})]})})]})]})]})},x={render:()=>s.jsxs("div",{className:"u-mb-8",children:[s.jsx("h2",{className:"u-mb-6 u-text-brand-emphasis",children:"Breakpoint Reference"}),s.jsx("p",{className:"u-mb-6 u-text-secondary-emphasis",children:"The grid system uses these breakpoints. Resize your browser to see how columns adapt."}),s.jsxs("div",{className:"u-mb-6 u-p-4 u-border u-rounded u-bg-brand-subtle",children:[s.jsx("h4",{className:"u-mb-4 u-text-brand-emphasis",children:"Breakpoint Sizes"}),s.jsxs("ul",{className:"u-text-secondary-emphasis",children:[s.jsxs("li",{children:[s.jsx("strong",{children:"xs:"})," 0px and up (all devices)"]}),s.jsxs("li",{children:[s.jsx("strong",{children:"sm:"})," 576px and up (tablets)"]}),s.jsxs("li",{children:[s.jsx("strong",{children:"md:"})," 768px and up (small laptops)"]}),s.jsxs("li",{children:[s.jsx("strong",{children:"lg:"})," 992px and up (large laptops)"]}),s.jsxs("li",{children:[s.jsx("strong",{children:"xl:"})," 1200px and up (desktops)"]}),s.jsxs("li",{children:[s.jsx("strong",{children:"xxl:"})," 1440px and up (large desktops)"]})]})]}),s.jsx("h3",{className:"u-mb-1 u-text-brand-emphasis",children:"Responsive Behavior Demo"}),s.jsx("p",{className:"u-mb-4 u-text-secondary-emphasis",children:"These columns show different layouts at each breakpoint:"}),s.jsxs(a,{className:"u-mb-6",children:[s.jsx(e,{xs:12,sm:6,md:4,lg:3,xl:2,children:s.jsxs(n,{variant:"secondary",children:[s.jsx("div",{className:"u-fw-bold",children:"Column 1"}),s.jsx("div",{className:"u-fs-sm",children:"xs=12, sm=6, md=4, lg=3, xl=2"})]})}),s.jsx(e,{xs:12,sm:6,md:4,lg:3,xl:2,children:s.jsxs(n,{variant:"secondary",children:[s.jsx("div",{className:"u-fw-bold",children:"Column 2"}),s.jsx("div",{className:"u-fs-sm",children:"xs=12, sm=6, md=4, lg=3, xl=2"})]})}),s.jsx(e,{xs:12,sm:6,md:4,lg:3,xl:2,children:s.jsxs(n,{variant:"secondary",children:[s.jsx("div",{className:"u-fw-bold",children:"Column 3"}),s.jsx("div",{className:"u-fs-sm",children:"xs=12, sm=6, md=4, lg=3, xl=2"})]})}),s.jsx(e,{xs:12,sm:6,md:4,lg:3,xl:2,children:s.jsxs(n,{variant:"secondary",children:[s.jsx("div",{className:"u-fw-bold",children:"Column 4"}),s.jsx("div",{className:"u-fs-sm",children:"xs=12, sm=6, md=4, lg=3, xl=2"})]})}),s.jsx(e,{xs:12,sm:6,md:4,lg:3,xl:2,children:s.jsxs(n,{variant:"secondary",children:[s.jsx("div",{className:"u-fw-bold",children:"Column 5"}),s.jsx("div",{className:"u-fs-sm",children:"xs=12, sm=6, md=4, lg=3, xl=2"})]})}),s.jsx(e,{xs:12,sm:6,md:4,lg:3,xl:2,children:s.jsxs(n,{variant:"secondary",children:[s.jsx("div",{className:"u-fw-bold",children:"Column 6"}),s.jsx("div",{className:"u-fs-sm",children:"xs=12, sm=6, md=4, lg=3, xl=2"})]})})]}),s.jsxs("div",{className:"u-p-4 u-border u-rounded u-bg-warning-subtle",children:[s.jsx("h4",{className:"u-mb-3 u-text-brand-emphasis",children:"Current Breakpoint"}),s.jsx("p",{className:"u-text-secondary-emphasis u-mb-0",children:"Resize your browser window to see how the columns above adapt to different screen sizes. The grid system automatically adjusts the layout based on the available space."})]})]})};var p,v,j,N,g;m.parameters={...m.parameters,docs:{...(p=m.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => <div className="u-mb-8">
      <h2 className="u-mb-1 u-text-brand-emphasis">Basic Grid Layout</h2>
      <p className="u-mb-6 u-text-secondary-emphasis">
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
  <GridCol xs={12} md={4}> Column 1 </GridCol>
  <GridCol xs={12} md={4}> Column 2 </GridCol>
  <GridCol xs={12} md={4}> Column 3 </GridCol>
</Grid>\`}
      </CodeSnippet>

      <div className="u-mt-8">
        <h3 className="u-mb-1 u-text-brand-emphasis">Responsive Behavior</h3>
        <p className="u-mb-4 u-text-secondary-emphasis">
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
}`,...(j=(v=m.parameters)==null?void 0:v.docs)==null?void 0:j.source},description:{story:`## Getting Started

The Grid system uses a 12-column layout with responsive breakpoints.
Start with these basic examples to understand the fundamentals.`,...(g=(N=m.parameters)==null?void 0:N.docs)==null?void 0:g.description}}};var f,y,G,D,w;l.parameters={...l.parameters,docs:{...(f=l.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => <div className="u-mb-8">
      <h2 className="u-mb-6 u-text-brand-emphasis">Common Layout Patterns</h2>

      {/* Sidebar Layout */}
      <div className="u-mb-8">
        <h3 className="u-mb-1 u-text-brand-emphasis">Sidebar Layout</h3>
        <p className="u-mb-4">Perfect for dashboards and admin interfaces:</p>

        <Grid className="u-mb-6">
          <GridCol xs={12} md={3}>
            <DemoCard variant="accent" height="lg">
              <div>Sidebar</div>
              <div className="u-fs-sm ">Navigation, filters, etc.</div>
            </DemoCard>
          </GridCol>
          <GridCol xs={12} md={9}>
            <DemoCard height="lg">
              <div>Main Content</div>
              <div className="u-fs-sm">Primary content area</div>
            </DemoCard>
          </GridCol>
        </Grid>
      </div>

      {/* Hero + Features */}
      <div className="u-mb-8">
        <h3 className="u-mb-1 u-text-brand-emphasis">Hero + Features</h3>
        <p className="u-mb-4 ">Landing page layout with hero section and feature cards:</p>

        <Grid className="u-mb-4">
          <GridCol xs={12}>
            <DemoCard variant="accent" height="md">
              <div>Hero Section</div>
              <div className="u-fs-sm">Full-width banner</div>
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
        <h3 className="u-mb-1 u-text-brand-emphasis">Article Layout</h3>
        <p className="u-mb-4 u-text-secondary-emphasis">Centered content with optional sidebar:</p>

        <Grid className="u-mb-6">
          <GridCol xs={12} md={8} offsetMd={2}>
            <DemoCard height="lg">
              <div>Article Content</div>
              <div className="u-fs-sm u-text-secondary-emphasis">Centered, readable width</div>
            </DemoCard>
          </GridCol>
        </Grid>
      </div>
    </div>
}`,...(G=(y=l.parameters)==null?void 0:y.docs)==null?void 0:G.source},description:{story:`## Layout Patterns

Common layout patterns for real-world applications.`,...(w=(D=l.parameters)==null?void 0:D.docs)==null?void 0:w.description}}};var S,R,z,A,k;t.parameters={...t.parameters,docs:{...(S=t.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <div className="u-mb-8">
      <h2 className="u-mb-6 u-text-brand-emphasis">Column Sizing Options</h2>

      {/* Fixed Sizes */}
      <div className="u-mb-8">
        <h3 className="u-mb-1 u-text-brand-emphasis">Fixed Column Sizes</h3>
        <p className="u-mb-4 u-text-secondary-emphasis">Specify exact column widths (1-12):</p>

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
        <h3 className="u-mb-1 u-text-brand-emphasis">Auto-Sizing Columns</h3>
        <p className="u-mb-4 u-text-secondary-emphasis">
          Columns that automatically size based on content:
        </p>

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
        <h3 className="u-mb-1 u-text-brand-emphasis">Mixed Sizing</h3>
        <p className="u-mb-4 u-text-secondary-emphasis">
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
      <h2 className="u-mb-6 u-text-brand-emphasis">Column Offsets</h2>

      {/* Basic Offsets */}
      <div className="u-mb-8">
        <h3 className="u-mb-1 u-text-brand-emphasis">Basic Offsets</h3>
        <p className="u-mb-4 u-text-secondary-emphasis">Push columns to the right using offsets:</p>

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
        <h3 className="u-mb-1 u-text-brand-emphasis">Centering Content</h3>
        <p className="u-mb-4 u-text-secondary-emphasis">Center columns using equal offsets:</p>

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
        <h3 className="u-mb-1 u-text-brand-emphasis">Responsive Offsets</h3>
        <p className="u-mb-4 u-text-secondary-emphasis">
          Different offsets at different screen sizes:
        </p>

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
      <h2 className="u-mb-6 u-text-brand-emphasis">Container Types</h2>

      {/* Default Container */}
      <div className="u-mb-8">
        <h3 className="u-mb-1 u-text-brand-emphasis">Default Container</h3>
        <p className="u-mb-4 u-text-secondary-emphasis">
          Responsive container with max-width at each breakpoint:
        </p>

        <Container className="u-mb-6">
          <DemoCard variant="accent" height="md">
            <div>Default Container</div>
            <div className="u-fs-sm u-text-secondary-emphasis">Responsive max-width, centered</div>
          </DemoCard>
        </Container>
      </div>

      {/* Fluid Container */}
      <div className="u-mb-8">
        <h3 className="u-mb-1 u-text-brand-emphasis">Fluid Container</h3>
        <p className="u-mb-4 u-text-secondary-emphasis">
          Full-width container that spans the entire viewport:
        </p>

        <Container type="fluid" className="u-mb-6">
          <DemoCard variant="secondary" height="md">
            <div>Fluid Container</div>
            <div className="u-fs-sm u-text-secondary-emphasis">Full viewport width</div>
          </DemoCard>
        </Container>
      </div>

      {/* Breakpoint Containers */}
      <div className="u-mb-8">
        <h3 className="u-mb-1 u-text-brand-emphasis">Breakpoint Containers</h3>
        <p className="u-mb-4 u-text-secondary-emphasis">
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
        <h3 className="u-mb-1 u-text-brand-emphasis">Container with Grid</h3>
        <p className="u-mb-4 u-text-secondary-emphasis">
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
      <h2 className="u-mb-6 u-text-brand-emphasis">Alignment & Spacing</h2>

      {/* Horizontal Alignment */}
      <div className="u-mb-8">
        <h3 className="u-mb-1 u-text-brand-emphasis">Horizontal Alignment</h3>
        <p className="u-mb-4 u-text-secondary-emphasis">
          Control how columns are distributed horizontally:
        </p>

        <div className="u-mb-4">
          <h4 className="u-mb-3 u-text-secondary-emphasis u-fw-medium">justify-content="start"</h4>
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
          <h4 className="u-mb-3 u-text-secondary-emphasis u-fw-medium">justify-content="center"</h4>
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
          <h4 className="u-mb-3 u-text-secondary-emphasis u-fw-medium">
            justify-content="between"
          </h4>
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
          <h4 className="u-mb-3 u-text-secondary-emphasis u-fw-medium">justify-content="around"</h4>
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
        <h3 className="u-mb-1 u-text-brand-emphasis">Vertical Alignment</h3>
        <p className="u-mb-4 u-text-secondary-emphasis">
          Control how columns align vertically when they have different heights:
        </p>

        <div className="u-mb-4">
          <h4 className="u-mb-3 u-text-secondary-emphasis u-fw-medium">align-items="start"</h4>
          <Row alignItems="start" className="u-mb-4 u-bg-brand-subtle" style={{
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
          <h4 className="u-mb-3 u-text-secondary-emphasis u-fw-medium">align-items="center"</h4>
          <Row alignItems="center" className="u-mb-4 u-bg-brand-subtle" style={{
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
          <h4 className="u-mb-3 u-text-secondary-emphasis u-fw-medium">align-items="end"</h4>
          <Row alignItems="end" className="u-mb-4 u-bg-brand-subtle" style={{
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
        <h3 className="u-mb-1 u-text-brand-emphasis">No Gutters</h3>
        <p className="u-mb-4 u-text-secondary-emphasis">Remove spacing between columns:</p>

        <div className="u-mb-4">
          <h4 className="u-mb-3 u-text-secondary-emphasis u-fw-medium">With gutters (default)</h4>
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
          <h4 className="u-mb-3 u-text-secondary-emphasis u-fw-medium">No gutters</h4>
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

Control alignment and spacing within grids and rows.`,...(U=(V=u.parameters)==null?void 0:V.docs)==null?void 0:U.description}}};var _,$,J,K,Q;h.parameters={...h.parameters,docs:{...(_=h.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => <div className="u-mb-8">
      <h2 className="u-mb-6 u-text-brand-emphasis">Nested Grids</h2>
      <p className="u-mb-6 u-text-secondary-emphasis">
        Create complex layouts by nesting grids within columns. Each nested grid starts fresh with
        12 columns.
      </p>

      <Grid>
        <GridCol xs={12} md={6}>
          <div className="u-p-4 u-border u-rounded u-bg-info-subtle u-mb-4">
            <h4 className="u-mb-4 u-text-info-emphasis">Left Section</h4>
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
            <h4 className="u-mb-4 u-text-success-emphasis">Right Section</h4>
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
        <h3 className="u-mb-1 u-text-brand-emphasis">Complex Nested Example</h3>
        <p className="u-mb-4 u-text-brand-emphasis">
          Dashboard-style layout with multiple levels of nesting:
        </p>

        <Grid>
          <GridCol xs={12}>
            <div className="u-p-4 u-border u-rounded u-bg-warning-subtle u-mb-4">
              <h4 className="u-mb-4 u-text-warning-emphasis">Header</h4>
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
              <h4 className="u-mb-4 u-text-info-emphasis">Sidebar</h4>
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
              <h4 className="u-mb-4 u-text-success-emphasis">Main Content</h4>
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
}`,...(J=($=h.parameters)==null?void 0:$.docs)==null?void 0:J.source},description:{story:`## Nested Grids

Create complex layouts by nesting grids within columns.`,...(Q=(K=h.parameters)==null?void 0:K.docs)==null?void 0:Q.description}}};var Y,Z,ss,es,ns;x.parameters={...x.parameters,docs:{...(Y=x.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: () => <div className="u-mb-8">
      <h2 className="u-mb-6 u-text-brand-emphasis">Breakpoint Reference</h2>
      <p className="u-mb-6 u-text-secondary-emphasis">
        The grid system uses these breakpoints. Resize your browser to see how columns adapt.
      </p>

      <div className="u-mb-6 u-p-4 u-border u-rounded u-bg-brand-subtle">
        <h4 className="u-mb-4 u-text-brand-emphasis">Breakpoint Sizes</h4>
        <ul className="u-text-secondary-emphasis">
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

      <h3 className="u-mb-1 u-text-brand-emphasis">Responsive Behavior Demo</h3>
      <p className="u-mb-4 u-text-secondary-emphasis">
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
        <h4 className="u-mb-3 u-text-brand-emphasis">Current Breakpoint</h4>
        <p className="u-text-secondary-emphasis u-mb-0">
          Resize your browser window to see how the columns above adapt to different screen sizes.
          The grid system automatically adjusts the layout based on the available space.
        </p>
      </div>
    </div>
}`,...(ss=(Z=x.parameters)==null?void 0:Z.docs)==null?void 0:ss.source},description:{story:`## Breakpoint Reference

Visual reference for how the grid system responds at different screen sizes.`,...(ns=(es=x.parameters)==null?void 0:es.docs)==null?void 0:ns.description}}};const us=["GettingStarted","LayoutPatterns","ColumnSizing","ColumnOffsets","Containers","AlignmentAndSpacing","NestedGrids","BreakpointReference"];export{u as AlignmentAndSpacing,x as BreakpointReference,o as ColumnOffsets,t as ColumnSizing,c as Containers,m as GettingStarted,l as LayoutPatterns,h as NestedGrids,us as __namedExportsOrder,cs as default};
