import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{G as m,a as r}from"./Container-CICDKvyA.js";import{B as n}from"./Button-_O9VEUtI.js";import{C as i}from"./Card-Bp6dcI4n.js";import{B as s}from"./Block-Cg-hEmIq.js";import"./index-BVDOR7y2.js";import"./components-BrxBU25R.js";const Q={title:"Components/Block",component:s,parameters:{layout:"fullscreen",docs:{description:{component:`
The Block component is a flexible layout container designed for creating consistent section layouts.
It provides standardized spacing, background variants, and container behavior for organizing content
into distinct sections or blocks.

## Key Features
- **Flexible spacing**: Multiple spacing sizes (xs, sm, md, lg, xl, none)
- **Background variants**: Transparent, subtle, muted, primary, secondary, accent
- **Container integration**: Built-in Container support for responsive layouts
- **Semantic HTML**: Configurable as section, div, article, aside, or main
- **Full-width support**: Option for edge-to-edge content

## Usage Guidelines
Use Block components to:
- Create consistent section spacing across pages
- Group related content with appropriate backgrounds
- Build hero sections, content areas, and feature blocks
- Maintain visual hierarchy and rhythm in layouts
        `}}},argTypes:{as:{control:"select",options:["section","div","article","aside","main"],description:"The HTML element to render as"},spacing:{control:"select",options:["xs","sm","md","lg","xl","none"],description:"Vertical padding size"},fullWidth:{control:"boolean",description:"Enable full-width content"},children:{control:!1,description:"Content to render within the block"}}},a={args:{children:e.jsxs("div",{children:[e.jsx("h2",{children:"Default Block Section"}),e.jsx("p",{children:"This is a basic block component with default settings (medium spacing, transparent background)."}),e.jsx("p",{children:"Use Block components to create consistent section layouts throughout your application."})]})}},c={render:()=>e.jsxs("div",{children:[e.jsxs(s,{background:"primary",spacing:"xs",children:[e.jsx("h3",{children:"Extra Small Spacing"}),e.jsx("p",{children:"This block has minimal vertical padding (xs)."})]}),e.jsxs(s,{background:"secondary",spacing:"sm",children:[e.jsx("h3",{children:"Small Spacing"}),e.jsx("p",{children:"This block has small vertical padding (sm)."})]}),e.jsxs(s,{background:"tertiary",spacing:"md",children:[e.jsx("h3",{children:"Medium Spacing"}),e.jsx("p",{children:"This block has medium vertical padding (md) - the default."})]}),e.jsxs(s,{background:"brand",spacing:"lg",children:[e.jsx("h3",{children:"Large Spacing"}),e.jsx("p",{children:"This block has large vertical padding (lg)."})]}),e.jsxs(s,{background:"success",spacing:"xl",children:[e.jsx("h3",{children:"Extra Large Spacing"}),e.jsx("p",{children:"This block has extra large vertical padding (xl)."})]})]})},t={render:()=>e.jsx(s,{background:"success",spacing:"xl",fullWidth:!0,children:e.jsxs("div",{className:"u-text-center",children:[e.jsx("h1",{children:"Welcome to Our Platform"}),e.jsx("p",{children:"Experience the power of modern web development with our comprehensive design system."}),e.jsx(n,{size:"lg",variant:"secondary",children:"Get Started"})]})})},o={render:()=>e.jsxs(s,{background:"success",spacing:"lg",children:[e.jsx("h2",{style:{textAlign:"center",marginBottom:"3rem"},children:"Our Features"}),e.jsxs(m,{children:[e.jsx(r,{xs:12,md:6,lg:4,children:e.jsxs(i,{children:[e.jsx("h3",{children:"Responsive Design"}),e.jsx("p",{children:"Fully responsive components that work seamlessly across all devices."})]})}),e.jsx(r,{xs:12,md:6,lg:4,children:e.jsxs(i,{children:[e.jsx("h3",{children:"TypeScript Support"}),e.jsx("p",{children:"Built with TypeScript for enhanced developer experience and type safety."})]})}),e.jsx(r,{xs:12,md:6,lg:4,children:e.jsxs(i,{children:[e.jsx("h3",{children:"Accessibility First"}),e.jsx("p",{children:"WCAG 2.1 AA compliant components for inclusive user experiences."})]})})]})]})},d={render:()=>e.jsxs("div",{children:[e.jsxs(s,{as:"article",background:"success",spacing:"lg",container:{type:"md"},children:[e.jsxs("header",{children:[e.jsx("h1",{children:"Building Modern Web Applications"}),e.jsx("p",{children:"Published on March 15, 2024 • 5 min read"})]}),e.jsx("p",{children:"In today's fast-paced digital landscape, building modern web applications requires a thoughtful approach to design systems and component architecture. This article explores best practices for creating scalable, maintainable, and user-friendly web experiences."}),e.jsx("h2",{children:"Key Principles"}),e.jsx("p",{children:"Modern web development is built on several key principles that ensure both developer productivity and user satisfaction. These include responsive design, accessibility, performance optimization, and maintainable code architecture."}),e.jsx("p",{children:"By following established design systems like Atomix, development teams can focus on delivering value rather than reinventing common patterns and components."})]}),e.jsxs(s,{spacing:"md",container:{type:"sm"},background:"secondary",children:[e.jsx("h3",{children:"Ready to get started?"}),e.jsx("p",{children:"Join thousands of developers building with our design system."}),e.jsx(n,{variant:"primary",children:"Start Building"})]})]})},l={render:()=>e.jsxs("div",{children:[e.jsx(s,{background:"brand",spacing:"xl",fullWidth:!0,children:e.jsx("h1",{className:"u-text-center",children:"Page Header"})}),e.jsxs(s,{background:"success",spacing:"lg",children:[e.jsx("h2",{children:"Main Content"}),e.jsx("p",{children:"This section contains the primary content of the page."})]}),e.jsxs(s,{background:"warning",spacing:"lg",children:[e.jsx("h2",{children:"Secondary Content"}),e.jsx("p",{children:"This section provides additional information or features."})]}),e.jsxs(s,{background:"error",spacing:"lg",children:[e.jsx("h2",{children:"Related Content"}),e.jsx("p",{children:"This section offers related articles or resources."})]}),e.jsx(s,{background:"info",spacing:"xl",fullWidth:!0,children:e.jsx("h2",{className:"u-text-center",children:"Footer Section"})})]})},h={args:{as:"section",spacing:"md",background:"transparent",fullWidth:!1,children:e.jsxs("div",{children:[e.jsx("h2",{children:"Interactive Block"}),e.jsx("p",{children:"Adjust the controls above to see how the Block component responds to different props."}),e.jsx("p",{children:"This playground allows you to experiment with all available options."})]})}},p={render:()=>e.jsxs("div",{children:[e.jsxs(s,{background:"primary",spacing:"md",children:[e.jsx("h3",{children:"Primary Background"}),e.jsx("p",{children:"This block uses the primary background color from the design system."})]}),e.jsxs(s,{background:"secondary",spacing:"md",children:[e.jsx("h3",{children:"Secondary Background"}),e.jsx("p",{children:"This block uses the secondary background color from the design system."})]}),e.jsxs(s,{background:"tertiary",spacing:"md",children:[e.jsx("h3",{children:"Tertiary Background"}),e.jsx("p",{children:"This block uses the tertiary background color from the design system."})]}),e.jsxs(s,{background:"invert",spacing:"md",children:[e.jsx("h3",{className:"u-text-error",children:"Invert Background"}),e.jsx("p",{className:"u-text-error",children:"This block uses the invert background color from the design system."})]}),e.jsxs(s,{background:"brand",spacing:"md",children:[e.jsx("h3",{children:"Brand Background"}),e.jsx("p",{children:"This block uses the brand background color from the design system."})]}),e.jsxs(s,{background:"error",spacing:"md",children:[e.jsx("h3",{children:"Error Background"}),e.jsx("p",{children:"This block uses the error background color from the design system."})]}),e.jsxs(s,{background:"success",spacing:"md",children:[e.jsx("h3",{children:"Success Background"}),e.jsx("p",{children:"This block uses the success background color from the design system."})]}),e.jsxs(s,{background:"warning",spacing:"md",children:[e.jsx("h3",{children:"Warning Background"}),e.jsx("p",{children:"This block uses the warning background color from the design system."})]}),e.jsxs(s,{background:"info",spacing:"md",children:[e.jsx("h3",{children:"Info Background"}),e.jsx("p",{children:"This block uses the info background color from the design system."})]}),e.jsxs(s,{background:"light",spacing:"md",children:[e.jsx("h3",{children:"Light Background"}),e.jsx("p",{children:"This block uses the light background color from the design system."})]})]})},u={render:()=>e.jsxs("div",{children:[e.jsx(s,{background:"brand",spacing:"lg",fullWidth:!0,children:e.jsxs("div",{className:"u-text-center",children:[e.jsx("h1",{className:" u-mb-2",children:"Welcome to Atomix Design System"}),e.jsx("p",{className:"u-mb-4",style:{maxWidth:"600px",margin:"0 auto 2rem"},children:"A comprehensive design system with reusable components and consistent design patterns"}),e.jsxs("div",{className:"u-mb-4",children:[e.jsx(n,{size:"lg",variant:"secondary",className:"u-me-2",children:"Get Started"}),e.jsx(n,{size:"lg",variant:"invert",className:"u-ms-2",children:"Learn More"})]})]})}),e.jsxs(s,{spacing:"lg",children:[e.jsx("h2",{className:"u-text-center u-mb-4",children:"Our Core Components"}),e.jsxs(m,{children:[e.jsx(r,{xs:12,md:6,lg:4,children:e.jsx(i,{title:"Buttons",text:"Multiple variants and sizes for all use cases",actions:e.jsxs("div",{children:[e.jsx(n,{variant:"primary",size:"sm",className:"u-me-1",children:"Primary"}),e.jsx(n,{variant:"secondary",size:"sm",children:"Secondary"})]})})}),e.jsx(r,{xs:12,md:6,lg:4,children:e.jsx(i,{title:"Cards",text:"Flexible content containers with multiple options",actions:e.jsx(n,{variant:"primary",children:"View Details"})})}),e.jsx(r,{xs:12,md:6,lg:4,children:e.jsx(i,{title:"Blocks",text:"Layout containers with consistent spacing and backgrounds",actions:e.jsx(n,{variant:"primary",children:"Learn More"})})})]})]}),e.jsxs(s,{background:"secondary",spacing:"lg",children:[e.jsxs("div",{className:"u-text-center u-mb-4",children:[e.jsx("h2",{children:"Design System Benefits"}),e.jsx("p",{className:"u-mb-0",children:"Built with developers and designers in mind"})]}),e.jsxs(m,{children:[e.jsx(r,{xs:12,md:6,lg:3,children:e.jsxs("div",{className:"u-text-center u-p-3",children:[e.jsx("h3",{className:"u-fs-h4",children:"Consistency"}),e.jsx("p",{className:"u-mb-0",children:"Unified design language across all products"})]})}),e.jsx(r,{xs:12,md:6,lg:3,children:e.jsxs("div",{className:"u-text-center u-p-3",children:[e.jsx("h3",{className:"u-fs-h4",children:"Accessibility"}),e.jsx("p",{className:"u-mb-0",children:"WCAG 2.1 AA compliant components"})]})}),e.jsx(r,{xs:12,md:6,lg:3,children:e.jsxs("div",{className:"u-text-center u-p-3",children:[e.jsx("h3",{className:"u-fs-h4",children:"Responsive"}),e.jsx("p",{className:"u-mb-0",children:"Mobile-first approach for all devices"})]})}),e.jsx(r,{xs:12,md:6,lg:3,children:e.jsxs("div",{className:"u-text-center u-p-3",children:[e.jsx("h3",{className:"u-fs-h4",children:"Customizable"}),e.jsx("p",{className:"u-mb-0",children:"Easily extend and modify components"})]})})]})]}),e.jsx(s,{spacing:"xl",children:e.jsxs("div",{className:"u-d-flex u-flex-column u-align-items-center u-text-center",children:[e.jsx("h2",{className:"u-mb-3",children:"Ready to Get Started?"}),e.jsx("p",{className:"u-mb-4",style:{maxWidth:"600px"},children:"Join thousands of developers and designers building with Atomix Design System"}),e.jsxs("div",{children:[e.jsx(n,{size:"lg",variant:"primary",className:"u-me-2",children:"Documentation"}),e.jsx(n,{size:"lg",variant:"secondary",className:"u-ms-2",children:"Examples"})]})]})})]})};var g,x,k;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    children: <div>
        <h2>Default Block Section</h2>
        <p>
          This is a basic block component with default settings (medium spacing, transparent
          background).
        </p>
        <p>
          Use Block components to create consistent section layouts throughout your application.
        </p>
      </div>
  }
}`,...(k=(x=a.parameters)==null?void 0:x.docs)==null?void 0:k.source}}};var b,y,j;c.parameters={...c.parameters,docs:{...(b=c.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => <div>
      <Block background="primary" spacing="xs">
        <h3>Extra Small Spacing</h3>
        <p>This block has minimal vertical padding (xs).</p>
      </Block>

      <Block background="secondary" spacing="sm">
        <h3>Small Spacing</h3>
        <p>This block has small vertical padding (sm).</p>
      </Block>

      <Block background="tertiary" spacing="md">
        <h3>Medium Spacing</h3>
        <p>This block has medium vertical padding (md) - the default.</p>
      </Block>

      <Block background="brand" spacing="lg">
        <h3>Large Spacing</h3>
        <p>This block has large vertical padding (lg).</p>
      </Block>

      <Block background="success" spacing="xl">
        <h3>Extra Large Spacing</h3>
        <p>This block has extra large vertical padding (xl).</p>
      </Block>
    </div>
}`,...(j=(y=c.parameters)==null?void 0:y.docs)==null?void 0:j.source}}};var v,B,f;t.parameters={...t.parameters,docs:{...(v=t.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <Block background="success" spacing="xl" fullWidth>
      <div className="u-text-center">
        <h1>Welcome to Our Platform</h1>
        <p>Experience the power of modern web development with our comprehensive design system.</p>
        <Button size="lg" variant="secondary">
          Get Started
        </Button>
      </div>
    </Block>
}`,...(f=(B=t.parameters)==null?void 0:B.docs)==null?void 0:f.source}}};var N,S,C;o.parameters={...o.parameters,docs:{...(N=o.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => <Block background="success" spacing="lg">
      <h2 style={{
      textAlign: 'center',
      marginBottom: '3rem'
    }}>Our Features</h2>
      <Grid>
        <GridCol xs={12} md={6} lg={4}>
          <Card>
            <h3>Responsive Design</h3>
            <p>Fully responsive components that work seamlessly across all devices.</p>
          </Card>
        </GridCol>
        <GridCol xs={12} md={6} lg={4}>
          <Card>
            <h3>TypeScript Support</h3>
            <p>Built with TypeScript for enhanced developer experience and type safety.</p>
          </Card>
        </GridCol>
        <GridCol xs={12} md={6} lg={4}>
          <Card>
            <h3>Accessibility First</h3>
            <p>WCAG 2.1 AA compliant components for inclusive user experiences.</p>
          </Card>
        </GridCol>
      </Grid>
    </Block>
}`,...(C=(S=o.parameters)==null?void 0:S.docs)==null?void 0:C.source}}};var T,w,G;d.parameters={...d.parameters,docs:{...(T=d.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => <div>
      <Block as="article" background="success" spacing="lg" container={{
      type: 'md'
    }}>
        <header>
          <h1>Building Modern Web Applications</h1>
          <p>Published on March 15, 2024 • 5 min read</p>
        </header>

        <p>
          In today's fast-paced digital landscape, building modern web applications requires a
          thoughtful approach to design systems and component architecture. This article explores
          best practices for creating scalable, maintainable, and user-friendly web experiences.
        </p>

        <h2>Key Principles</h2>
        <p>
          Modern web development is built on several key principles that ensure both developer
          productivity and user satisfaction. These include responsive design, accessibility,
          performance optimization, and maintainable code architecture.
        </p>

        <p>
          By following established design systems like Atomix, development teams can focus on
          delivering value rather than reinventing common patterns and components.
        </p>
      </Block>

      <Block spacing="md" container={{
      type: 'sm'
    }} background="secondary">
        <h3>Ready to get started?</h3>
        <p>Join thousands of developers building with our design system.</p>
        <Button variant="primary">Start Building</Button>
      </Block>
    </div>
}`,...(G=(w=d.parameters)==null?void 0:w.docs)==null?void 0:G.source}}};var A,W,z;l.parameters={...l.parameters,docs:{...(A=l.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => <div>
      <Block background="brand" spacing="xl" fullWidth>
        <h1 className="u-text-center">Page Header</h1>
      </Block>

      <Block background="success" spacing="lg">
        <h2>Main Content</h2>
        <p>This section contains the primary content of the page.</p>
      </Block>

      <Block background="warning" spacing="lg">
        <h2>Secondary Content</h2>
        <p>This section provides additional information or features.</p>
      </Block>

      <Block background="error" spacing="lg">
        <h2>Related Content</h2>
        <p>This section offers related articles or resources.</p>
      </Block>

      <Block background="info" spacing="xl" fullWidth>
        <h2 className="u-text-center">Footer Section</h2>
      </Block>
    </div>
}`,...(z=(W=l.parameters)==null?void 0:W.docs)==null?void 0:z.source}}};var M,D,L;h.parameters={...h.parameters,docs:{...(M=h.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    as: 'section',
    spacing: 'md',
    background: 'transparent',
    fullWidth: false,
    children: <div>
        <h2>Interactive Block</h2>
        <p>Adjust the controls above to see how the Block component responds to different props.</p>
        <p>This playground allows you to experiment with all available options.</p>
      </div>
  }
}`,...(L=(D=h.parameters)==null?void 0:D.docs)==null?void 0:L.source}}};var P,E,F;p.parameters={...p.parameters,docs:{...(P=p.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => <div>
      <Block background="primary" spacing="md">
        <h3>Primary Background</h3>
        <p>This block uses the primary background color from the design system.</p>
      </Block>

      <Block background="secondary" spacing="md">
        <h3>Secondary Background</h3>
        <p>This block uses the secondary background color from the design system.</p>
      </Block>

      <Block background="tertiary" spacing="md">
        <h3>Tertiary Background</h3>
        <p>This block uses the tertiary background color from the design system.</p>
      </Block>

      <Block background="invert" spacing="md">
        <h3 className="u-text-error">Invert Background</h3>
        <p className="u-text-error">
          This block uses the invert background color from the design system.
        </p>
      </Block>

      <Block background="brand" spacing="md">
        <h3>Brand Background</h3>
        <p>This block uses the brand background color from the design system.</p>
      </Block>

      <Block background="error" spacing="md">
        <h3>Error Background</h3>
        <p>This block uses the error background color from the design system.</p>
      </Block>

      <Block background="success" spacing="md">
        <h3>Success Background</h3>
        <p>This block uses the success background color from the design system.</p>
      </Block>

      <Block background="warning" spacing="md">
        <h3>Warning Background</h3>
        <p>This block uses the warning background color from the design system.</p>
      </Block>

      <Block background="info" spacing="md">
        <h3>Info Background</h3>
        <p>This block uses the info background color from the design system.</p>
      </Block>

      <Block background="light" spacing="md">
        <h3>Light Background</h3>
        <p>This block uses the light background color from the design system.</p>
      </Block>
    </div>
}`,...(F=(E=p.parameters)==null?void 0:E.docs)==null?void 0:F.source}}};var R,I,O;u.parameters={...u.parameters,docs:{...(R=u.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => <div>
      <Block background="brand" spacing="lg" fullWidth>
        <div className="u-text-center">
          <h1 className=" u-mb-2">Welcome to Atomix Design System</h1>
          <p className="u-mb-4" style={{
          maxWidth: '600px',
          margin: '0 auto 2rem'
        }}>
            A comprehensive design system with reusable components and consistent design patterns
          </p>
          <div className="u-mb-4">
            <Button size="lg" variant="secondary" className="u-me-2">
              Get Started
            </Button>
            <Button size="lg" variant="invert" className="u-ms-2">
              Learn More
            </Button>
          </div>
        </div>
      </Block>

      <Block spacing="lg">
        <h2 className="u-text-center u-mb-4">Our Core Components</h2>
        <Grid>
          <GridCol xs={12} md={6} lg={4}>
            <Card title="Buttons" text="Multiple variants and sizes for all use cases" actions={<div>
                  <Button variant="primary" size="sm" className="u-me-1">
                    Primary
                  </Button>
                  <Button variant="secondary" size="sm">
                    Secondary
                  </Button>
                </div>} />
          </GridCol>
          <GridCol xs={12} md={6} lg={4}>
            <Card title="Cards" text="Flexible content containers with multiple options" actions={<Button variant="primary">View Details</Button>} />
          </GridCol>
          <GridCol xs={12} md={6} lg={4}>
            <Card title="Blocks" text="Layout containers with consistent spacing and backgrounds" actions={<Button variant="primary">Learn More</Button>} />
          </GridCol>
        </Grid>
      </Block>

      <Block background="secondary" spacing="lg">
        <div className="u-text-center u-mb-4">
          <h2>Design System Benefits</h2>
          <p className="u-mb-0">Built with developers and designers in mind</p>
        </div>
        <Grid>
          <GridCol xs={12} md={6} lg={3}>
            <div className="u-text-center u-p-3">
              <h3 className="u-fs-h4">Consistency</h3>
              <p className="u-mb-0">Unified design language across all products</p>
            </div>
          </GridCol>
          <GridCol xs={12} md={6} lg={3}>
            <div className="u-text-center u-p-3">
              <h3 className="u-fs-h4">Accessibility</h3>
              <p className="u-mb-0">WCAG 2.1 AA compliant components</p>
            </div>
          </GridCol>
          <GridCol xs={12} md={6} lg={3}>
            <div className="u-text-center u-p-3">
              <h3 className="u-fs-h4">Responsive</h3>
              <p className="u-mb-0">Mobile-first approach for all devices</p>
            </div>
          </GridCol>
          <GridCol xs={12} md={6} lg={3}>
            <div className="u-text-center u-p-3">
              <h3 className="u-fs-h4">Customizable</h3>
              <p className="u-mb-0">Easily extend and modify components</p>
            </div>
          </GridCol>
        </Grid>
      </Block>

      <Block spacing="xl">
        <div className="u-d-flex u-flex-column u-align-items-center u-text-center">
          <h2 className="u-mb-3">Ready to Get Started?</h2>
          <p className="u-mb-4" style={{
          maxWidth: '600px'
        }}>
            Join thousands of developers and designers building with Atomix Design System
          </p>
          <div>
            <Button size="lg" variant="primary" className="u-me-2">
              Documentation
            </Button>
            <Button size="lg" variant="secondary" className="u-ms-2">
              Examples
            </Button>
          </div>
        </div>
      </Block>
    </div>
}`,...(O=(I=u.parameters)==null?void 0:I.docs)==null?void 0:O.source}}};const X=["Default","SpacingVariants","HeroSection","ContentGrid","ArticleLayout","StackedSections","Playground","BackgroundVariants","ContentPreview"];export{d as ArticleLayout,p as BackgroundVariants,o as ContentGrid,u as ContentPreview,a as Default,t as HeroSection,h as Playground,c as SpacingVariants,l as StackedSections,X as __namedExportsOrder,Q as default};
