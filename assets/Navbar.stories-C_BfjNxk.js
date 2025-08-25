import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{r as B,e as N}from"./index-BVDOR7y2.js";import{I as R}from"./Icon-k4CeN--q.js";import{m as Ne,M as g,a as s,b as W}from"./Menu-ha4iUxaI.js";import{N as a,a as n,b as u}from"./NavDropdown-9rGURmDU.js";import{N as i}from"./Navbar-v5DcPTAO.js";import"./SpeakerX.es-Cg-mjUf1.js";import"./components-BrxBU25R.js";const w=({height:c=40,width:l=100,className:v=""})=>e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:l,height:c,viewBox:"0 0 120 48",className:v,children:[e.jsx("g",{transform:"translate(0, 8) scale(0.06)",children:e.jsx("path",{fill:"currentColor",d:"M256 398.8c-11.8 5.1-23.4 9.7-34.9 13.5c16.7 33.8 31 35.7 34.9 35.7s18.1-1.9 34.9-35.7c-11.4-3.9-23.1-8.4-34.9-13.5zM446 256c33 45.2 44.3 90.9 23.6 128c-20.2 36.3-62.5 49.3-115.2 43.2c-22 52.1-55.6 84.8-98.4 84.8s-76.4-32.7-98.4-84.8c-52.7 6.1-95-6.8-115.2-43.2C21.7 346.9 33 301.2 66 256c-33-45.2-44.3-90.9-23.6-128c20.2-36.3 62.5-49.3 115.2-43.2C179.6 32.7 213.2 0 256 0s76.4 32.7 98.4 84.8c52.7-6.1 95 6.8 115.2 43.2c20.7 37.1 9.4 82.8-23.6 128zm-65.8 67.4c-1.7 14.2-3.9 28-6.7 41.2c31.8 1.4 38.6-8.7 40.2-11.7c2.3-4.2 7-17.9-11.9-48.1c-6.8 6.3-14 12.5-21.6 18.6zm-6.7-175.9c2.8 13.1 5 26.9 6.7 41.2c7.6 6.1 14.8 12.3 21.6 18.6c18.9-30.2 14.2-44 11.9-48.1c-1.6-2.9-8.4-13-40.2-11.7zM290.9 99.7C274.1 65.9 259.9 64 256 64s-18.1 1.9-34.9 35.7c11.4 3.9 23.1 8.4 34.9 13.5c11.8-5.1 23.4-9.7 34.9-13.5zm-159 88.9c1.7-14.3 3.9-28 6.7-41.2c-31.8-1.4-38.6 8.7-40.2 11.7c-2.3 4.2-7 17.9 11.9 48.1c6.8-6.3 14-12.5 21.6-18.6zM110.2 304.8C91.4 335 96 348.7 98.3 352.9c1.6 2.9 8.4 13 40.2 11.7c-2.8-13.1-5-26.9-6.7-41.2c-7.6-6.1-14.8-12.3-21.6-18.6zM336 256a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zm-80-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"})}),e.jsx("text",{x:"32",y:"32",fontSize:"22",fontWeight:"700",fill:"currentColor",children:"Atomix"})]});w.displayName="AtomixLogo";try{w.displayName="AtomixLogo",w.__docgenInfo={description:"",displayName:"AtomixLogo",props:{height:{defaultValue:{value:"40"},description:"",name:"height",required:!1,type:{name:"number"}},width:{defaultValue:{value:"100"},description:"",name:"width",required:!1,type:{name:"number"}},className:{defaultValue:{value:""},description:"",name:"className",required:!1,type:{name:"string"}}}}}catch{}const p=B.forwardRef(({children:c,className:l="",disabled:v=!1},h)=>e.jsx("div",{ref:h,className:`c-menu c-menu--mega ${l}`,children:e.jsx("div",{className:"c-menu__container",children:e.jsx("div",{className:"c-menu__grid o-grid",children:N.Children.map(c,d=>{if(N.isValidElement(d)){const m=d.props;return N.cloneElement(d,{...m,disabled:v?!0:m==null?void 0:m.disabled})}return d})})})})),o=B.forwardRef(({title:c,icon:l,children:v,width:h="auto",className:d="",disabled:m=!1},D)=>{const A=`o-grid__col o-grid__col--${h} ${d}`;return e.jsxs("div",{ref:D,className:A,children:[(c||l)&&e.jsxs("div",{className:"c-menu__header",children:[l&&(typeof l=="string"?l.startsWith("c-icon-")?e.jsx(R,{name:Ne(l.replace("c-icon-","")),size:"sm",className:"c-menu__header-icon"}):e.jsx("i",{className:`c-menu__header-icon ${l}`,children:typeof l!="string"&&l}):e.jsx("span",{className:"c-menu__header-icon",children:l})),c&&e.jsx("div",{className:"c-menu__header-title",children:c})]}),e.jsx("ul",{className:"c-menu__subitems-list",role:"menu",children:N.Children.map(v,V=>{if(N.isValidElement(V)){const M=V.props;return e.jsx("li",{className:"c-menu__subitem",role:"menuitem",children:N.cloneElement(V,{...M,disabled:m?!0:M==null?void 0:M.disabled})})}return null})})]})}),r=B.forwardRef(({href:c,children:l,className:v="",disabled:h=!1,onClick:d},m)=>{const D=A=>{if(h){A.preventDefault();return}d&&d()};return e.jsx("a",{ref:m,href:c,className:`c-menu__subitem-link ${h?"is-disabled":""} ${v}`,onClick:D,"aria-disabled":h,children:l})});try{p.displayName="MegaMenu",p.__docgenInfo={description:"",displayName:"MegaMenu",props:{children:{defaultValue:null,description:"MegaMenu content",name:"children",required:!0,type:{name:"ReactNode"}},className:{defaultValue:{value:""},description:"Additional CSS class names",name:"className",required:!1,type:{name:"string"}},disabled:{defaultValue:{value:"false"},description:"Component disabled state",name:"disabled",required:!1,type:{name:"boolean"}}}}}catch{}try{o.displayName="MegaMenuColumn",o.__docgenInfo={description:"",displayName:"MegaMenuColumn",props:{title:{defaultValue:null,description:"Column title",name:"title",required:!1,type:{name:"ReactNode"}},icon:{defaultValue:null,description:"Column icon",name:"icon",required:!1,type:{name:"ReactNode"}},children:{defaultValue:null,description:"Column content",name:"children",required:!0,type:{name:"ReactNode"}},width:{defaultValue:{value:"auto"},description:"Column width (auto by default)",name:"width",required:!1,type:{name:'number | "auto"'}},className:{defaultValue:{value:""},description:"Additional CSS class names",name:"className",required:!1,type:{name:"string"}},disabled:{defaultValue:{value:"false"},description:"Component disabled state",name:"disabled",required:!1,type:{name:"boolean"}}}}}catch{}try{r.displayName="MegaMenuLink",r.__docgenInfo={description:"",displayName:"MegaMenuLink",props:{href:{defaultValue:null,description:"Link href",name:"href",required:!0,type:{name:"string"}},children:{defaultValue:null,description:"Link content",name:"children",required:!0,type:{name:"ReactNode"}},onClick:{defaultValue:null,description:"Link click handler",name:"onClick",required:!1,type:{name:"(() => void)"}},className:{defaultValue:{value:""},description:"Additional CSS class names",name:"className",required:!1,type:{name:"string"}},disabled:{defaultValue:{value:"false"},description:"Component disabled state",name:"disabled",required:!1,type:{name:"boolean"}}}}}catch{}const ke={title:"Components/Navigation/Navbar",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
The Navbar component provides a responsive navigation header with brand, navigation items, and collapsible mobile menu functionality. It follows the Atomix design system guidelines and includes both React and vanilla JavaScript implementations.

## Features

- **Responsive Design**: Automatically collapses on mobile devices
- **Multiple Positions**: Static, fixed top, or fixed bottom positioning
- **Theme Variants**: Support for all theme colors
- **Accessibility**: Full keyboard navigation and screen reader support
- **Dropdown & Mega Menus**: Support for both regular dropdowns and full-width mega menus
- **Vanilla JS Support**: Complete vanilla JavaScript implementation available

## Usage

### Basic Navbar
\`\`\`tsx
<Navbar brand="My App">
  <Nav>
    <NavItem href="/">Home</NavItem>
    <NavItem href="/about">About</NavItem>
  </Nav>
</Navbar>
\`\`\`

### With Dropdown
\`\`\`tsx
<Navbar brand="My App">
  <Nav>
    <NavDropdown title="Services">
      <Menu>
        <MenuItem href="/web">Web Design</MenuItem>
        <MenuItem href="/mobile">Mobile Apps</MenuItem>
      </Menu>
    </NavDropdown>
  </Nav>
</Navbar>
\`\`\`

### Vanilla JavaScript
\`\`\`html
<nav class="c-navbar" data-navbar data-collapsible="true">
  <div class="c-navbar__container">
    <a href="/" class="c-navbar__brand">My App</a>
    <button class="c-navbar__toggler" aria-expanded="false">
      <span class="c-navbar__toggler-icon"></span>
    </button>
    <div class="c-navbar__collapse">
      <!-- Navigation content -->
    </div>
  </div>
</nav>
\`\`\`
        `}}},argTypes:{position:{control:{type:"select"},options:["static","fixed","fixed-bottom"],description:"Position of the navbar",table:{type:{summary:"string"},defaultValue:{summary:"static"}}},variant:{control:{type:"select"},options:["primary","secondary","tertiary","invert","brand","success","error","warning","info","light","dark"],description:"The color variant of the navbar",table:{type:{summary:"ThemeColor"},defaultValue:{summary:"undefined"}}},collapsible:{control:"boolean",description:"Whether the navbar should collapse on small screens",table:{type:{summary:"boolean"},defaultValue:{summary:"true"}}},containerWidth:{control:"text",description:"Custom width for the navbar container",table:{type:{summary:"string"},defaultValue:{summary:"undefined"}}},backdrop:{control:"boolean",description:"Whether to show backdrop when expanded on mobile",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},closeOnOutsideClick:{control:"boolean",description:"Whether to close navbar when clicking outside",table:{type:{summary:"boolean"},defaultValue:{summary:"true"}}},closeOnEscape:{control:"boolean",description:"Whether to close navbar on escape key press",table:{type:{summary:"boolean"},defaultValue:{summary:"true"}}}}},t=()=>e.jsx(w,{height:40}),x={args:{brand:e.jsx(t,{}),children:e.jsxs(a,{alignment:"end",children:[e.jsx(n,{children:"Home"}),e.jsx(n,{children:"About"}),e.jsx(n,{children:"Services"}),e.jsx(n,{children:"Contact"}),e.jsx(u,{title:"Dropdown",children:e.jsxs(g,{children:[e.jsx(s,{href:"#",icon:"icon-lux-circle",children:"Menu Item 1"}),e.jsx(s,{href:"#",icon:"icon-lux-circle",children:"Menu Item 2"}),e.jsx(s,{href:"#",icon:"icon-lux-circle",children:"Menu Item 3"}),e.jsx(W,{}),e.jsx(s,{href:"#",icon:"icon-lux-circle",children:"Menu Item 4"}),e.jsx(s,{href:"#",icon:"icon-lux-circle",children:"Menu Item 5"})]})})]}),position:"static",variant:"primary",collapsible:!0}},f={args:{...x.args,position:"fixed"}},b={args:{...x.args,position:"fixed-bottom"}},j={render:()=>e.jsxs("div",{className:"u-d-flex u-flex-column u-gap-3",children:[e.jsx(i,{brand:e.jsx(t,{}),variant:"primary",children:e.jsxs(a,{alignment:"end",children:[e.jsx(n,{children:"Link 1"}),e.jsx(n,{children:"Link 2"})]})}),e.jsx(i,{brand:e.jsx(t,{}),variant:"secondary",children:e.jsxs(a,{alignment:"end",children:[e.jsx(n,{children:"Link 1"}),e.jsx(n,{children:"Link 2"})]})}),e.jsx(i,{brand:e.jsx(t,{}),variant:"tertiary",children:e.jsxs(a,{alignment:"end",children:[e.jsx(n,{children:"Link 1"}),e.jsx(n,{children:"Link 2"})]})}),e.jsx(i,{brand:e.jsx(t,{}),variant:"invert",children:e.jsxs(a,{alignment:"end",children:[e.jsx(n,{children:"Link 1"}),e.jsx(n,{children:"Link 2"})]})}),e.jsx(i,{brand:e.jsx(t,{}),variant:"brand",children:e.jsxs(a,{alignment:"end",children:[e.jsx(n,{children:"Link 1"}),e.jsx(n,{children:"Link 2"})]})}),e.jsx(i,{brand:e.jsx(t,{}),variant:"success",children:e.jsxs(a,{alignment:"end",children:[e.jsx(n,{children:"Link 1"}),e.jsx(n,{children:"Link 2"})]})}),e.jsx(i,{brand:e.jsx(t,{}),variant:"error",children:e.jsxs(a,{alignment:"end",children:[e.jsx(n,{children:"Link 1"}),e.jsx(n,{children:"Link 2"})]})}),e.jsx(i,{brand:e.jsx(t,{}),variant:"warning",children:e.jsxs(a,{alignment:"end",children:[e.jsx(n,{children:"Link 1"}),e.jsx(n,{children:"Link 2"})]})}),e.jsx(i,{brand:e.jsx(t,{}),variant:"info",children:e.jsxs(a,{alignment:"end",children:[e.jsx(n,{children:"Link 1"}),e.jsx(n,{children:"Link 2"})]})}),e.jsx(i,{brand:e.jsx(t,{}),variant:"light",children:e.jsxs(a,{alignment:"end",children:[e.jsx(n,{children:"Link 1"}),e.jsx(n,{children:"Link 2"})]})}),e.jsx(i,{brand:e.jsx(t,{}),variant:"dark",children:e.jsxs(a,{alignment:"end",children:[e.jsx(n,{children:"Link 1"}),e.jsx(n,{children:"Link 2"})]})})]})},I={render:()=>e.jsxs("div",{className:"u-d-flex u-flex-column u-gap-3",children:[e.jsx(i,{brand:e.jsx(t,{}),children:e.jsxs(a,{alignment:"start",children:[e.jsx(n,{children:"Link 1"}),e.jsx(n,{children:"Link 2"}),e.jsx(n,{children:"Link 3"})]})}),e.jsx(i,{brand:e.jsx(t,{}),children:e.jsxs(a,{alignment:"center",children:[e.jsx(n,{children:"Link 1"}),e.jsx(n,{children:"Link 2"}),e.jsx(n,{children:"Link 3"})]})}),e.jsx(i,{brand:e.jsx(t,{}),children:e.jsxs(a,{alignment:"end",children:[e.jsx(n,{children:"Link 1"}),e.jsx(n,{children:"Link 2"}),e.jsx(n,{children:"Link 3"})]})})]})},L={render:()=>e.jsx(i,{brand:e.jsx(t,{}),children:e.jsxs(a,{alignment:"end",children:[e.jsx(n,{children:"Link 1"}),e.jsx(n,{children:"Link 2"}),e.jsx(u,{title:"Mega Menu",megaMenu:!0,children:e.jsxs(p,{children:[e.jsxs(o,{title:"Column 1",icon:"icon-lux-circle",children:[e.jsx(r,{href:"#",children:"Sub Menu 1"}),e.jsx(r,{href:"#",children:"Sub Menu 2"}),e.jsx(r,{href:"#",children:"Sub Menu 3"})]}),e.jsxs(o,{title:"Column 2",icon:"icon-lux-circle",children:[e.jsx(r,{href:"#",children:"Sub Menu 1"}),e.jsx(r,{href:"#",children:"Sub Menu 2"}),e.jsx(r,{href:"#",children:"Sub Menu 3"})]}),e.jsxs(o,{title:"Column 3",icon:"icon-lux-circle",children:[e.jsx(r,{href:"#",children:"Sub Menu 1"}),e.jsx(r,{href:"#",children:"Sub Menu 2"}),e.jsx(r,{href:"#",children:"Sub Menu 3"})]})]})})]})})},k={render:()=>e.jsx(i,{brand:e.jsx(t,{}),children:e.jsxs(a,{alignment:"end",children:[e.jsx(n,{active:!0,children:"Active Link"}),e.jsx(n,{disabled:!0,children:"Disabled Link"}),e.jsx(u,{title:"Dropdown",children:e.jsxs(g,{children:[e.jsx(s,{href:"#",active:!0,children:"Active Item"}),e.jsx(s,{href:"#",disabled:!0,children:"Disabled Item"}),e.jsx(s,{href:"#",children:"Regular Item"})]})})]})})},y={render:()=>e.jsxs(i,{brand:e.jsx(t,{}),children:[e.jsxs(a,{alignment:"start",children:[e.jsx(n,{children:"Link 1"}),e.jsx(n,{children:"Link 2"}),e.jsx(n,{children:"Link 3"})]}),e.jsx("div",{className:"u-ms-auto u-d-flex u-align-items-center",children:e.jsxs("div",{className:"c-search-form u-d-flex u-gap-2",children:[e.jsx("input",{type:"text",className:"c-input c-input--sm",placeholder:"Search..."}),e.jsx("button",{className:"c-btn c-btn--primary c-btn--sm",children:e.jsx(R,{name:"MagnifyingGlass",size:"sm"})})]})})]})},C={render:()=>e.jsxs(i,{brand:e.jsx(t,{}),children:[e.jsxs(a,{alignment:"start",children:[e.jsx(n,{children:"Link 1"}),e.jsx(n,{children:"Link 2"}),e.jsx(n,{children:"Link 3"})]}),e.jsx(a,{alignment:"end",children:e.jsx(u,{title:e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"c-avatar c-avatar--sm c-avatar--circle",style:{backgroundColor:"#7C3AED",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:"12px",fontWeight:"bold"},children:"JD"}),e.jsx("span",{className:"u-ms-2",children:"User Name"})]}),children:e.jsxs(g,{children:[e.jsx(s,{href:"#",icon:"icon-lux-user",children:"Profile"}),e.jsx(s,{href:"#",icon:"icon-lux-settings",children:"Settings"}),e.jsx(W,{}),e.jsx(s,{href:"#",icon:"icon-lux-sign-out",children:"Logout"})]})})})]})},S={render:()=>e.jsxs(i,{brand:e.jsx(t,{}),collapsible:!0,children:[e.jsxs(a,{alignment:"start",children:[e.jsx(n,{children:"Home"}),e.jsx(n,{children:"Products"}),e.jsx(u,{title:"Services",children:e.jsxs(g,{children:[e.jsx(s,{href:"#",children:"Service 1"}),e.jsx(s,{href:"#",children:"Service 2"}),e.jsx(s,{href:"#",children:"Service 3"})]})}),e.jsx(u,{title:"Resources",megaMenu:!0,children:e.jsxs(p,{children:[e.jsxs(o,{title:"Documentation",icon:"icon-lux-file",children:[e.jsx(r,{href:"#",children:"Getting Started"}),e.jsx(r,{href:"#",children:"Components"}),e.jsx(r,{href:"#",children:"API Reference"})]}),e.jsxs(o,{title:"Resources",icon:"icon-lux-bookmark",children:[e.jsx(r,{href:"#",children:"Blog"}),e.jsx(r,{href:"#",children:"Tutorials"}),e.jsx(r,{href:"#",children:"Examples"})]}),e.jsxs(o,{title:"Support",icon:"icon-lux-question-circle",children:[e.jsx(r,{href:"#",children:"FAQs"}),e.jsx(r,{href:"#",children:"Community"}),e.jsx(r,{href:"#",children:"Contact Us"})]})]})}),e.jsx(n,{children:"Contact"})]}),e.jsxs(a,{alignment:"end",children:[e.jsxs(n,{children:[e.jsx(R,{name:"Bell",size:"sm",className:"u-me-2"}),"Notifications"]}),e.jsx(u,{title:e.jsx(e.Fragment,{children:e.jsx("div",{className:"c-avatar c-avatar--sm c-avatar--circle",style:{backgroundColor:"#7C3AED",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:"12px",fontWeight:"bold"},children:"JD"})}),children:e.jsxs(g,{children:[e.jsx(s,{href:"#",icon:"icon-lux-user",children:"Profile"}),e.jsx(s,{href:"#",icon:"icon-lux-settings",children:"Settings"}),e.jsx(W,{}),e.jsx(s,{href:"#",icon:"icon-lux-sign-out",children:"Logout"})]})})]})]})},_={render:()=>e.jsxs("div",{className:"u-d-flex u-flex-column u-gap-3",children:[e.jsxs("div",{children:[e.jsx("h4",{className:"u-mb-3",children:"Regular Dropdown"}),e.jsx(i,{brand:e.jsx(t,{}),children:e.jsxs(a,{alignment:"start",children:[e.jsx(n,{children:"Home"}),e.jsx(u,{title:"Regular Dropdown",megaMenu:!1,children:e.jsxs(g,{children:[e.jsx(s,{href:"#",children:"Menu Item 1"}),e.jsx(s,{href:"#",children:"Menu Item 2"}),e.jsx(s,{href:"#",children:"Menu Item 3"})]})})]})})]}),e.jsxs("div",{children:[e.jsx("h4",{className:"u-mb-3",children:"Mega Menu"}),e.jsx(i,{brand:e.jsx(t,{}),children:e.jsxs(a,{alignment:"start",children:[e.jsx(n,{children:"Home"}),e.jsx(u,{title:"Mega Menu",megaMenu:!0,children:e.jsxs(p,{children:[e.jsxs(o,{title:"Column 1",icon:"icon-lux-circle",children:[e.jsx(r,{href:"#",children:"Link 1"}),e.jsx(r,{href:"#",children:"Link 2"})]}),e.jsxs(o,{title:"Column 2",icon:"icon-lux-circle",children:[e.jsx(r,{href:"#",children:"Link 1"}),e.jsx(r,{href:"#",children:"Link 2"})]})]})})]})})]})]})};var q,z,E;x.parameters={...x.parameters,docs:{...(q=x.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    brand: <LogoBrand />,
    children: <Nav alignment="end">
        <NavItem>Home</NavItem>
        <NavItem>About</NavItem>
        <NavItem>Services</NavItem>
        <NavItem>Contact</NavItem>
        <NavDropdown title="Dropdown">
          <Menu>
            <MenuItem href="#" icon="icon-lux-circle">
              Menu Item 1
            </MenuItem>
            <MenuItem href="#" icon="icon-lux-circle">
              Menu Item 2
            </MenuItem>
            <MenuItem href="#" icon="icon-lux-circle">
              Menu Item 3
            </MenuItem>
            <MenuDivider />
            <MenuItem href="#" icon="icon-lux-circle">
              Menu Item 4
            </MenuItem>
            <MenuItem href="#" icon="icon-lux-circle">
              Menu Item 5
            </MenuItem>
          </Menu>
        </NavDropdown>
      </Nav>,
    position: 'static',
    variant: 'primary',
    collapsible: true
  }
}`,...(E=(z=x.parameters)==null?void 0:z.docs)==null?void 0:E.source}}};var F,H,J;f.parameters={...f.parameters,docs:{...(F=f.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    position: 'fixed'
  }
}`,...(J=(H=f.parameters)==null?void 0:H.docs)==null?void 0:J.source}}};var P,T,$;b.parameters={...b.parameters,docs:{...(P=b.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    position: 'fixed-bottom'
  }
}`,...($=(T=b.parameters)==null?void 0:T.docs)==null?void 0:$.source}}};var U,G,O;j.parameters={...j.parameters,docs:{...(U=j.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: () => <div className="u-d-flex u-flex-column u-gap-3">
      <Navbar brand={<LogoBrand />} variant="primary">
        <Nav alignment="end">
          <NavItem>Link 1</NavItem>
          <NavItem>Link 2</NavItem>
        </Nav>
      </Navbar>

      <Navbar brand={<LogoBrand />} variant="secondary">
        <Nav alignment="end">
          <NavItem>Link 1</NavItem>
          <NavItem>Link 2</NavItem>
        </Nav>
      </Navbar>

      <Navbar brand={<LogoBrand />} variant="tertiary">
        <Nav alignment="end">
          <NavItem>Link 1</NavItem>
          <NavItem>Link 2</NavItem>
        </Nav>
      </Navbar>

      <Navbar brand={<LogoBrand />} variant="invert">
        <Nav alignment="end">
          <NavItem>Link 1</NavItem>
          <NavItem>Link 2</NavItem>
        </Nav>
      </Navbar>

      <Navbar brand={<LogoBrand />} variant="brand">
        <Nav alignment="end">
          <NavItem>Link 1</NavItem>
          <NavItem>Link 2</NavItem>
        </Nav>
      </Navbar>

      <Navbar brand={<LogoBrand />} variant="success">
        <Nav alignment="end">
          <NavItem>Link 1</NavItem>
          <NavItem>Link 2</NavItem>
        </Nav>
      </Navbar>

      <Navbar brand={<LogoBrand />} variant="error">
        <Nav alignment="end">
          <NavItem>Link 1</NavItem>
          <NavItem>Link 2</NavItem>
        </Nav>
      </Navbar>

      <Navbar brand={<LogoBrand />} variant="warning">
        <Nav alignment="end">
          <NavItem>Link 1</NavItem>
          <NavItem>Link 2</NavItem>
        </Nav>
      </Navbar>

      <Navbar brand={<LogoBrand />} variant="info">
        <Nav alignment="end">
          <NavItem>Link 1</NavItem>
          <NavItem>Link 2</NavItem>
        </Nav>
      </Navbar>

      <Navbar brand={<LogoBrand />} variant="light">
        <Nav alignment="end">
          <NavItem>Link 1</NavItem>
          <NavItem>Link 2</NavItem>
        </Nav>
      </Navbar>

      <Navbar brand={<LogoBrand />} variant="dark">
        <Nav alignment="end">
          <NavItem>Link 1</NavItem>
          <NavItem>Link 2</NavItem>
        </Nav>
      </Navbar>
    </div>
}`,...(O=(G=j.parameters)==null?void 0:G.docs)==null?void 0:O.source}}};var Q,K,X;I.parameters={...I.parameters,docs:{...(Q=I.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  render: () => <div className="u-d-flex u-flex-column u-gap-3">
      <Navbar brand={<LogoBrand />}>
        <Nav alignment="start">
          <NavItem>Link 1</NavItem>
          <NavItem>Link 2</NavItem>
          <NavItem>Link 3</NavItem>
        </Nav>
      </Navbar>

      <Navbar brand={<LogoBrand />}>
        <Nav alignment="center">
          <NavItem>Link 1</NavItem>
          <NavItem>Link 2</NavItem>
          <NavItem>Link 3</NavItem>
        </Nav>
      </Navbar>

      <Navbar brand={<LogoBrand />}>
        <Nav alignment="end">
          <NavItem>Link 1</NavItem>
          <NavItem>Link 2</NavItem>
          <NavItem>Link 3</NavItem>
        </Nav>
      </Navbar>
    </div>
}`,...(X=(K=I.parameters)==null?void 0:K.docs)==null?void 0:X.source}}};var Y,Z,ee;L.parameters={...L.parameters,docs:{...(Y=L.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: () => <Navbar brand={<LogoBrand />}>
      <Nav alignment="end">
        <NavItem>Link 1</NavItem>
        <NavItem>Link 2</NavItem>
        <NavDropdown title="Mega Menu" megaMenu>
          <MegaMenu>
            <MegaMenuColumn title="Column 1" icon="icon-lux-circle">
              <MegaMenuLink href="#">Sub Menu 1</MegaMenuLink>
              <MegaMenuLink href="#">Sub Menu 2</MegaMenuLink>
              <MegaMenuLink href="#">Sub Menu 3</MegaMenuLink>
            </MegaMenuColumn>

            <MegaMenuColumn title="Column 2" icon="icon-lux-circle">
              <MegaMenuLink href="#">Sub Menu 1</MegaMenuLink>
              <MegaMenuLink href="#">Sub Menu 2</MegaMenuLink>
              <MegaMenuLink href="#">Sub Menu 3</MegaMenuLink>
            </MegaMenuColumn>

            <MegaMenuColumn title="Column 3" icon="icon-lux-circle">
              <MegaMenuLink href="#">Sub Menu 1</MegaMenuLink>
              <MegaMenuLink href="#">Sub Menu 2</MegaMenuLink>
              <MegaMenuLink href="#">Sub Menu 3</MegaMenuLink>
            </MegaMenuColumn>
          </MegaMenu>
        </NavDropdown>
      </Nav>
    </Navbar>
}`,...(ee=(Z=L.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};var ne,ae,re;k.parameters={...k.parameters,docs:{...(ne=k.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  render: () => <Navbar brand={<LogoBrand />}>
      <Nav alignment="end">
        <NavItem active>Active Link</NavItem>
        <NavItem disabled>Disabled Link</NavItem>
        <NavDropdown title="Dropdown">
          <Menu>
            <MenuItem href="#" active>
              Active Item
            </MenuItem>
            <MenuItem href="#" disabled>
              Disabled Item
            </MenuItem>
            <MenuItem href="#">Regular Item</MenuItem>
          </Menu>
        </NavDropdown>
      </Nav>
    </Navbar>
}`,...(re=(ae=k.parameters)==null?void 0:ae.docs)==null?void 0:re.source}}};var ie,te,se;y.parameters={...y.parameters,docs:{...(ie=y.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  render: () => <Navbar brand={<LogoBrand />}>
      <Nav alignment="start">
        <NavItem>Link 1</NavItem>
        <NavItem>Link 2</NavItem>
        <NavItem>Link 3</NavItem>
      </Nav>
      <div className="u-ms-auto u-d-flex u-align-items-center">
        <div className="c-search-form u-d-flex u-gap-2">
          <input type="text" className="c-input c-input--sm" placeholder="Search..." />
          <button className="c-btn c-btn--primary c-btn--sm">
            <Icon name="MagnifyingGlass" size="sm" />
          </button>
        </div>
      </div>
    </Navbar>
}`,...(se=(te=y.parameters)==null?void 0:te.docs)==null?void 0:se.source}}};var le,ce,oe;C.parameters={...C.parameters,docs:{...(le=C.parameters)==null?void 0:le.docs,source:{originalSource:`{
  render: () => <Navbar brand={<LogoBrand />}>
      <Nav alignment="start">
        <NavItem>Link 1</NavItem>
        <NavItem>Link 2</NavItem>
        <NavItem>Link 3</NavItem>
      </Nav>
      <Nav alignment="end">
        <NavDropdown title={<>
              <div className="c-avatar c-avatar--sm c-avatar--circle" style={{
          backgroundColor: '#7C3AED',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '12px',
          fontWeight: 'bold'
        }}>
                JD
              </div>
              <span className="u-ms-2">User Name</span>
            </>}>
          <Menu>
            <MenuItem href="#" icon="icon-lux-user">
              Profile
            </MenuItem>
            <MenuItem href="#" icon="icon-lux-settings">
              Settings
            </MenuItem>
            <MenuDivider />
            <MenuItem href="#" icon="icon-lux-sign-out">
              Logout
            </MenuItem>
          </Menu>
        </NavDropdown>
      </Nav>
    </Navbar>
}`,...(oe=(ce=C.parameters)==null?void 0:ce.docs)==null?void 0:oe.source}}};var de,ue,me;S.parameters={...S.parameters,docs:{...(de=S.parameters)==null?void 0:de.docs,source:{originalSource:`{
  render: () => <Navbar brand={<LogoBrand />} collapsible={true}>
      <Nav alignment="start">
        <NavItem>Home</NavItem>
        <NavItem>Products</NavItem>
        <NavDropdown title="Services">
          <Menu>
            <MenuItem href="#">Service 1</MenuItem>
            <MenuItem href="#">Service 2</MenuItem>
            <MenuItem href="#">Service 3</MenuItem>
          </Menu>
        </NavDropdown>
        <NavDropdown title="Resources" megaMenu>
          <MegaMenu>
            <MegaMenuColumn title="Documentation" icon="icon-lux-file">
              <MegaMenuLink href="#">Getting Started</MegaMenuLink>
              <MegaMenuLink href="#">Components</MegaMenuLink>
              <MegaMenuLink href="#">API Reference</MegaMenuLink>
            </MegaMenuColumn>
            <MegaMenuColumn title="Resources" icon="icon-lux-bookmark">
              <MegaMenuLink href="#">Blog</MegaMenuLink>
              <MegaMenuLink href="#">Tutorials</MegaMenuLink>
              <MegaMenuLink href="#">Examples</MegaMenuLink>
            </MegaMenuColumn>
            <MegaMenuColumn title="Support" icon="icon-lux-question-circle">
              <MegaMenuLink href="#">FAQs</MegaMenuLink>
              <MegaMenuLink href="#">Community</MegaMenuLink>
              <MegaMenuLink href="#">Contact Us</MegaMenuLink>
            </MegaMenuColumn>
          </MegaMenu>
        </NavDropdown>
        <NavItem>Contact</NavItem>
      </Nav>
      <Nav alignment="end">
        <NavItem>
          <Icon name="Bell" size="sm" className="u-me-2" />
          Notifications
        </NavItem>
        <NavDropdown title={<>
              <div className="c-avatar c-avatar--sm c-avatar--circle" style={{
          backgroundColor: '#7C3AED',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '12px',
          fontWeight: 'bold'
        }}>
                JD
              </div>
            </>}>
          <Menu>
            <MenuItem href="#" icon="icon-lux-user">
              Profile
            </MenuItem>
            <MenuItem href="#" icon="icon-lux-settings">
              Settings
            </MenuItem>
            <MenuDivider />
            <MenuItem href="#" icon="icon-lux-sign-out">
              Logout
            </MenuItem>
          </Menu>
        </NavDropdown>
      </Nav>
    </Navbar>
}`,...(me=(ue=S.parameters)==null?void 0:ue.docs)==null?void 0:me.source}}};var ve,he,xe;_.parameters={..._.parameters,docs:{...(ve=_.parameters)==null?void 0:ve.docs,source:{originalSource:`{
  render: () => <div className="u-d-flex u-flex-column u-gap-3">
      <div>
        <h4 className="u-mb-3">Regular Dropdown</h4>
        <Navbar brand={<LogoBrand />}>
          <Nav alignment="start">
            <NavItem>Home</NavItem>
            <NavDropdown title="Regular Dropdown" megaMenu={false}>
              <Menu>
                <MenuItem href="#">Menu Item 1</MenuItem>
                <MenuItem href="#">Menu Item 2</MenuItem>
                <MenuItem href="#">Menu Item 3</MenuItem>
              </Menu>
            </NavDropdown>
          </Nav>
        </Navbar>
      </div>

      <div>
        <h4 className="u-mb-3">Mega Menu</h4>
        <Navbar brand={<LogoBrand />}>
          <Nav alignment="start">
            <NavItem>Home</NavItem>
            <NavDropdown title="Mega Menu" megaMenu={true}>
              <MegaMenu>
                <MegaMenuColumn title="Column 1" icon="icon-lux-circle">
                  <MegaMenuLink href="#">Link 1</MegaMenuLink>
                  <MegaMenuLink href="#">Link 2</MegaMenuLink>
                </MegaMenuColumn>
                <MegaMenuColumn title="Column 2" icon="icon-lux-circle">
                  <MegaMenuLink href="#">Link 1</MegaMenuLink>
                  <MegaMenuLink href="#">Link 2</MegaMenuLink>
                </MegaMenuColumn>
              </MegaMenu>
            </NavDropdown>
          </Nav>
        </Navbar>
      </div>
    </div>
}`,...(xe=(he=_.parameters)==null?void 0:he.docs)==null?void 0:xe.source}}};const ye=["Default","Fixed","FixedBottom","Variants","NavAlignments","WithMegaMenu","WithStateModifiers","WithSearchField","WithAvatarDropdown","ResponsiveNavbar","MegaMenuVsDropdown"];export{x as Default,f as Fixed,b as FixedBottom,_ as MegaMenuVsDropdown,I as NavAlignments,S as ResponsiveNavbar,j as Variants,C as WithAvatarDropdown,L as WithMegaMenu,y as WithSearchField,k as WithStateModifiers,ye as __namedExportsOrder,ke as default};
