import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{B as r}from"./Button-_O9VEUtI.js";import{C as a}from"./Card-Bp6dcI4n.js";import{B as s}from"./Badge-Dm5vey4G.js";import"./index-BVDOR7y2.js";import"./components-BrxBU25R.js";const u=()=>e.jsxs("div",{className:"theme-showcase",style:{padding:"2rem",minHeight:"100vh"},children:[e.jsxs("section",{className:"showcase-header",style:{marginBottom:"3rem"},children:[e.jsx("h1",{style:{fontSize:"var(--shaj-font-size-3xl, 1.875rem)",fontWeight:"700",color:"var(--shaj-neutral-900, #171717)",marginBottom:"1rem"},children:"Shaj Theme System Showcase"}),e.jsx("p",{style:{fontSize:"var(--shaj-font-size-lg, 1.125rem)",color:"var(--shaj-neutral-700, #404040)",marginBottom:"2rem"},children:"Explore all Shaj themes and see how they transform the entire component library. Use the theme selector in the Storybook toolbar to switch between themes."})]}),e.jsxs("section",{className:"showcase-buttons",style:{marginBottom:"3rem"},children:[e.jsx("h2",{style:{fontSize:"var(--shaj-font-size-2xl, 1.5rem)",fontWeight:"600",color:"var(--shaj-neutral-900, #171717)",marginBottom:"1rem"},children:"Button Variants"}),e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:"1rem",marginBottom:"1rem"},children:[e.jsx(r,{variant:"primary",children:"Primary"}),e.jsx(r,{variant:"secondary",children:"Secondary"}),e.jsx(r,{variant:"outline",children:"Outline"}),e.jsx(r,{variant:"ghost",children:"Ghost"}),e.jsx(r,{variant:"success",children:"Success"}),e.jsx(r,{variant:"error",children:"Error"}),e.jsx(r,{variant:"primary",disabled:!0,children:"Disabled"})]}),e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:"1rem",alignItems:"center"},children:[e.jsx(r,{size:"sm",children:"Small"}),e.jsx(r,{size:"md",children:"Medium"}),e.jsx(r,{size:"lg",children:"Large"})]})]}),e.jsxs("section",{className:"showcase-cards",style:{marginBottom:"3rem"},children:[e.jsx("h2",{style:{fontSize:"var(--shaj-font-size-2xl, 1.5rem)",fontWeight:"600",color:"var(--shaj-neutral-900, #171717)",marginBottom:"1rem"},children:"Cards and Content"}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:"1.5rem"},children:[e.jsx(a,{title:"Theme Information",text:"This card demonstrates how theme colors are applied to components.",children:e.jsxs("div",{style:{marginTop:"1rem"},children:[e.jsxs("p",{children:["Primary Color:"," ",e.jsx("span",{style:{display:"inline-block",width:"20px",height:"20px",backgroundColor:"var(--shaj-primary-500)",borderRadius:"4px",verticalAlign:"middle",marginLeft:"8px"}})]}),e.jsxs("div",{style:{marginTop:"1rem"},children:[e.jsx(s,{variant:"primary",label:"Primary"}),e.jsx(s,{variant:"secondary",label:"Secondary"}),e.jsx(s,{variant:"success",label:"Success"})]})]})}),e.jsx(a,{title:"Dynamic Theming",text:"All components automatically adapt to theme changes using CSS custom properties.",children:e.jsxs("div",{style:{marginTop:"1rem"},children:[e.jsx("p",{style:{color:"var(--shaj-neutral-600)"},children:"Switch themes using the Storybook toolbar to see live updates."}),e.jsx("div",{style:{marginTop:"1rem"},children:e.jsx(s,{variant:"info",label:"Live Updates"})})]})}),e.jsx(a,{title:"Theme Features",text:"Comprehensive theming system with multiple variants.",children:e.jsx("div",{style:{marginTop:"1rem"},children:e.jsxs("ul",{style:{color:"var(--shaj-neutral-700)",paddingLeft:"1.5rem"},children:[e.jsx("li",{children:"6 Complete Themes"}),e.jsx("li",{children:"Runtime Theme Switching"}),e.jsx("li",{children:"Component Integration"}),e.jsx("li",{children:"Accessibility Compliant"})]})})})]})]}),e.jsxs("section",{className:"showcase-colors",style:{marginBottom:"3rem"},children:[e.jsx("h2",{style:{fontSize:"var(--shaj-font-size-2xl, 1.5rem)",fontWeight:"600",color:"var(--shaj-neutral-900, #171717)",marginBottom:"1rem"},children:"Theme Colors"}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:"1rem"},children:[e.jsxs("div",{children:[e.jsx("h3",{style:{fontSize:"var(--shaj-font-size-lg, 1.125rem)",color:"var(--shaj-neutral-800)",marginBottom:"0.5rem"},children:"Primary"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"0.25rem"},children:["300","500","700"].map(t=>e.jsx("div",{style:{backgroundColor:`var(--shaj-primary-${t})`,height:"3rem",borderRadius:"var(--shaj-border-radius-base, 0.5rem)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.75rem",fontWeight:"600",color:parseInt(t)>=500?"white":"var(--shaj-neutral-900)"},children:t},t))})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{fontSize:"var(--shaj-font-size-lg, 1.125rem)",color:"var(--shaj-neutral-800)",marginBottom:"0.5rem"},children:"Secondary"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"0.25rem"},children:["300","500","700"].map(t=>e.jsx("div",{style:{backgroundColor:`var(--shaj-secondary-${t})`,height:"3rem",borderRadius:"var(--shaj-border-radius-base, 0.5rem)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.75rem",fontWeight:"600",color:parseInt(t)>=500?"white":"var(--shaj-neutral-900)"},children:t},t))})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{fontSize:"var(--shaj-font-size-lg, 1.125rem)",color:"var(--shaj-neutral-800)",marginBottom:"0.5rem"},children:"Semantic"}),e.jsx("div",{style:{display:"grid",gap:"0.25rem"},children:[{name:"Success",var:"--shaj-success"},{name:"Warning",var:"--shaj-warning"},{name:"Error",var:"--shaj-error"},{name:"Info",var:"--shaj-info"}].map(t=>e.jsx("div",{style:{backgroundColor:`var(${t.var})`,height:"2rem",borderRadius:"var(--shaj-border-radius-base, 0.5rem)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.75rem",fontWeight:"600",color:"white"},children:t.name},t.name))})]})]})]})]}),B={title:"Design Tokens/Theme Showcase",component:u,parameters:{layout:"fullscreen",docs:{description:{component:`
# Shaj Theme System Showcase

This comprehensive showcase demonstrates all Shaj themes across the Atomix component library.

## Available Themes

- **🔵 Shaj Default**: Clean, modern, professional with vibrant blue
- **🌊 Shaj Ocean**: Calm, serene, aquatic with ocean blue
- **🌅 Shaj Sunset**: Warm, energetic, creative with sunset orange  
- **🌲 Shaj Forest**: Natural, organic with forest green
- **🌙 Shaj Midnight**: Dark, sophisticated with deep purple
- **🌸 Shaj Pastel**: Soft, gentle with pastel pink

## Features

- **Runtime Theme Switching**: Change themes instantly without page reload
- **Component Integration**: All components automatically adapt to theme changes
- **CSS Custom Properties**: Modern CSS variables for optimal performance
- **Accessibility**: WCAG 2.1 AA compliant color contrasts
- **Responsive Design**: Themes work across all screen sizes
- **Dark Mode Support**: Automatic and manual dark mode variants

## Usage

Use the theme selector in the Storybook toolbar to switch between themes and see how they transform the entire interface.
        `}}},argTypes:{}},i={name:"Complete Theme Showcase",render:()=>e.jsx(u,{}),parameters:{docs:{description:{story:"Complete showcase of all Shaj themes across Atomix components. Use the theme toolbar to switch between themes."}}}},n={name:"Buttons Across Themes",render:()=>e.jsxs("div",{style:{padding:"2rem"},children:[e.jsx("h2",{style:{marginBottom:"2rem",color:"var(--shaj-neutral-900)"},children:"Button Variants Across Themes"}),e.jsxs("div",{style:{display:"grid",gap:"2rem"},children:[e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"1rem",color:"var(--shaj-neutral-800)"},children:"Primary Actions"}),e.jsxs("div",{style:{display:"flex",gap:"1rem",flexWrap:"wrap"},children:[e.jsx(r,{variant:"primary",children:"Primary"}),e.jsx(r,{variant:"secondary",children:"Secondary"}),e.jsx(r,{variant:"success",children:"Success"}),e.jsx(r,{variant:"error",children:"Error"})]})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"1rem",color:"var(--shaj-neutral-800)"},children:"Secondary Actions"}),e.jsxs("div",{style:{display:"flex",gap:"1rem",flexWrap:"wrap"},children:[e.jsx(r,{variant:"outline",children:"Outline"}),e.jsx(r,{variant:"ghost",children:"Ghost"}),e.jsx(r,{variant:"outline",disabled:!0,children:"Disabled"})]})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"1rem",color:"var(--shaj-neutral-800)"},children:"Sizes"}),e.jsxs("div",{style:{display:"flex",gap:"1rem",alignItems:"center",flexWrap:"wrap"},children:[e.jsx(r,{variant:"primary",size:"sm",children:"Small"}),e.jsx(r,{variant:"primary",size:"md",children:"Medium"}),e.jsx(r,{variant:"primary",size:"lg",children:"Large"})]})]})]})]}),parameters:{docs:{description:{story:"Focused showcase of button variants across different themes."}}}},o={name:"Cards and Content Across Themes",render:()=>e.jsxs("div",{style:{padding:"2rem"},children:[e.jsx("h2",{style:{marginBottom:"2rem",color:"var(--shaj-neutral-900)"},children:"Cards and Content Across Themes"}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:"1.5rem"},children:[e.jsx(a,{title:"Theme Statistics",text:"Overview of the Shaj theme system capabilities.",children:e.jsxs("div",{style:{marginTop:"1rem"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"0.5rem"},children:[e.jsx("span",{children:"Active Themes"}),e.jsx(s,{variant:"primary",label:"6"})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"0.5rem"},children:[e.jsx("span",{children:"Components"}),e.jsx(s,{variant:"secondary",label:"25+"})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"0.5rem"},children:[e.jsx("span",{children:"CSS Variables"}),e.jsx(s,{variant:"success",label:"100+"})]})]})}),e.jsx(a,{title:"Theme Features",text:"Key features of the Shaj theming system.",children:e.jsx("div",{style:{marginTop:"1rem"},children:e.jsxs("ul",{style:{color:"var(--shaj-neutral-700)",paddingLeft:"1.5rem"},children:[e.jsx("li",{children:"Runtime theme switching"}),e.jsx("li",{children:"Component integration"}),e.jsx("li",{children:"Accessibility compliance"}),e.jsx("li",{children:"Responsive design"})]})})}),e.jsx(a,{title:"Getting Started",text:"How to use the Shaj theme system in your projects.",children:e.jsxs("div",{style:{marginTop:"1rem"},children:[e.jsx("p",{style:{color:"var(--shaj-neutral-600)",fontSize:"0.875rem"},children:"Use the theme selector in the Storybook toolbar to switch between themes and see live updates."}),e.jsx("div",{style:{marginTop:"1rem"},children:e.jsx(s,{variant:"info",label:"Try It Now"})})]})})]})]}),parameters:{docs:{description:{story:"Showcase of cards and content components across themes."}}}};var l,m,d;i.parameters={...i.parameters,docs:{...(l=i.parameters)==null?void 0:l.docs,source:{originalSource:`{
  name: 'Complete Theme Showcase',
  render: () => <ThemeShowcase />,
  parameters: {
    docs: {
      description: {
        story: 'Complete showcase of all Shaj themes across Atomix components. Use the theme toolbar to switch between themes.'
      }
    }
  }
}`,...(d=(m=i.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};var c,h,p;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`{
  name: 'Buttons Across Themes',
  render: () => <div style={{
    padding: '2rem'
  }}>
      <h2 style={{
      marginBottom: '2rem',
      color: 'var(--shaj-neutral-900)'
    }}>
        Button Variants Across Themes
      </h2>
      <div style={{
      display: 'grid',
      gap: '2rem'
    }}>
        <div>
          <h3 style={{
          marginBottom: '1rem',
          color: 'var(--shaj-neutral-800)'
        }}>
            Primary Actions
          </h3>
          <div style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="success">Success</Button>
            <Button variant="error">Error</Button>
          </div>
        </div>

        <div>
          <h3 style={{
          marginBottom: '1rem',
          color: 'var(--shaj-neutral-800)'
        }}>
            Secondary Actions
          </h3>
          <div style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="outline" disabled>
              Disabled
            </Button>
          </div>
        </div>

        <div>
          <h3 style={{
          marginBottom: '1rem',
          color: 'var(--shaj-neutral-800)'
        }}>Sizes</h3>
          <div style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
            <Button variant="primary" size="sm">
              Small
            </Button>
            <Button variant="primary" size="md">
              Medium
            </Button>
            <Button variant="primary" size="lg">
              Large
            </Button>
          </div>
        </div>
      </div>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Focused showcase of button variants across different themes.'
      }
    }
  }
}`,...(p=(h=n.parameters)==null?void 0:h.docs)==null?void 0:p.source}}};var y,j,v;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
  name: 'Cards and Content Across Themes',
  render: () => <div style={{
    padding: '2rem'
  }}>
      <h2 style={{
      marginBottom: '2rem',
      color: 'var(--shaj-neutral-900)'
    }}>
        Cards and Content Across Themes
      </h2>

      <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1.5rem'
    }}>
        <Card title="Theme Statistics" text="Overview of the Shaj theme system capabilities.">
          <div style={{
          marginTop: '1rem'
        }}>
            <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '0.5rem'
          }}>
              <span>Active Themes</span>
              <Badge variant="primary" label="6" />
            </div>
            <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '0.5rem'
          }}>
              <span>Components</span>
              <Badge variant="secondary" label="25+" />
            </div>
            <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '0.5rem'
          }}>
              <span>CSS Variables</span>
              <Badge variant="success" label="100+" />
            </div>
          </div>
        </Card>

        <Card title="Theme Features" text="Key features of the Shaj theming system.">
          <div style={{
          marginTop: '1rem'
        }}>
            <ul style={{
            color: 'var(--shaj-neutral-700)',
            paddingLeft: '1.5rem'
          }}>
              <li>Runtime theme switching</li>
              <li>Component integration</li>
              <li>Accessibility compliance</li>
              <li>Responsive design</li>
            </ul>
          </div>
        </Card>

        <Card title="Getting Started" text="How to use the Shaj theme system in your projects.">
          <div style={{
          marginTop: '1rem'
        }}>
            <p style={{
            color: 'var(--shaj-neutral-600)',
            fontSize: '0.875rem'
          }}>
              Use the theme selector in the Storybook toolbar to switch between themes and see live
              updates.
            </p>
            <div style={{
            marginTop: '1rem'
          }}>
              <Badge variant="info" label="Try It Now" />
            </div>
          </div>
        </Card>
      </div>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Showcase of cards and content components across themes.'
      }
    }
  }
}`,...(v=(j=o.parameters)==null?void 0:j.docs)==null?void 0:v.source}}};const C=["AllThemes","ButtonsShowcase","CardsShowcase"];export{i as AllThemes,n as ButtonsShowcase,o as CardsShowcase,C as __namedExportsOrder,B as default};
