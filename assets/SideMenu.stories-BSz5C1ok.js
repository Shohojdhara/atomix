import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{f as t}from"./index-BxLnRenJ.js";import{e as L}from"./index-BVDOR7y2.js";import{S as T,a as i,b as n}from"./SideMenuList-DK1L7cHY.js";import{I as s}from"./Icon-k4CeN--q.js";import"./components-BrxBU25R.js";import"./SpeakerX.es-Cg-mjUf1.js";const je={title:"Components/Navigation/SideMenu",component:T,parameters:{layout:"centered",docs:{description:{component:`
The SideMenu component provides a collapsible navigation menu with title and menu items. It automatically collapses on mobile devices and can be toggled via a header button. The component follows the Atomix design system guidelines and includes both React and vanilla JavaScript implementations.

## Features

- **Responsive Design**: Automatically collapses on mobile devices
- **Collapsible**: Can be toggled open/closed with smooth animations
- **Accessibility**: Full keyboard navigation and screen reader support
- **Active States**: Support for active menu items
- **Icon Support**: Menu items can include Phosphor icons
- **Vanilla JS Support**: Complete vanilla JavaScript implementation available

## Usage

### Basic SideMenu
\`\`\`tsx
<SideMenu title="Navigation">
  <SideMenuList>
    <SideMenuItem href="/" active>Home</SideMenuItem>
    <SideMenuItem href="/about">About</SideMenuItem>
    <SideMenuItem href="/contact">Contact</SideMenuItem>
  </SideMenuList>
</SideMenu>
\`\`\`

### With Icons
\`\`\`tsx
<SideMenu title="Navigation">
  <SideMenuList>
    <SideMenuItem href="/" icon={<Icon name="House" />} active>
      Home
    </SideMenuItem>
    <SideMenuItem href="/about" icon={<Icon name="Info" />}>
      About
    </SideMenuItem>
  </SideMenuList>
</SideMenu>
\`\`\`

### Vanilla JavaScript
\`\`\`html
<div class="c-side-menu" data-side-menu data-collapsible="true">
  <div class="c-side-menu__toggler">
    <span class="c-side-menu__title">Navigation</span>
    <span class="c-side-menu__toggler-icon">▶</span>
  </div>
  <div class="c-side-menu__wrapper">
    <div class="c-side-menu__inner">
      <ul class="c-side-menu__list">
        <li class="c-side-menu__item">
          <a href="/" class="c-side-menu__link is-active">Home</a>
        </li>
        <li class="c-side-menu__item">
          <a href="/about" class="c-side-menu__link">About</a>
        </li>
      </ul>
    </div>
  </div>
</div>
\`\`\`
        `}}},argTypes:{title:{control:"text",description:"Menu title displayed at the top",table:{type:{summary:"ReactNode"},defaultValue:{summary:"undefined"}}},isOpen:{control:"boolean",description:"Whether the menu is open (for controlled component)",table:{type:{summary:"boolean"},defaultValue:{summary:"undefined"}}},collapsible:{control:"boolean",description:"Whether the menu is collapsible on mobile",table:{type:{summary:"boolean"},defaultValue:{summary:"true"}}},disabled:{control:"boolean",description:"Whether the menu is disabled",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}}},args:{onToggle:t()}},h={args:{title:"Navigation",children:e.jsxs(i,{children:[e.jsx(n,{href:"/",active:!0,children:"Home"}),e.jsx(n,{href:"/about",children:"About"}),e.jsx(n,{href:"/services",children:"Services"}),e.jsx(n,{href:"/contact",children:"Contact"})]}),collapsible:!0,onToggle:t()}},S={args:{title:"Main Menu",children:e.jsxs(i,{children:[e.jsx(n,{href:"/",icon:e.jsx(s,{name:"House",size:"sm"}),active:!0,children:"Home"}),e.jsx(n,{href:"/about",icon:e.jsx(s,{name:"Info",size:"sm"}),children:"About"}),e.jsx(n,{href:"/services",icon:e.jsx(s,{name:"Gear",size:"sm"}),children:"Services"}),e.jsx(n,{href:"/portfolio",icon:e.jsx(s,{name:"Briefcase",size:"sm"}),children:"Portfolio"}),e.jsx(n,{href:"/contact",icon:e.jsx(s,{name:"Envelope",size:"sm"}),children:"Contact"})]}),collapsible:!0,onToggle:t()}},I={args:{title:"Dashboard",children:e.jsxs(e.Fragment,{children:[e.jsxs(i,{children:[e.jsx(n,{href:"/dashboard",icon:e.jsx(s,{name:"ChartBar",size:"sm"}),active:!0,children:"Dashboard"}),e.jsx(n,{href:"/analytics",icon:e.jsx(s,{name:"TrendUp",size:"sm"}),children:"Analytics"}),e.jsx(n,{href:"/reports",icon:e.jsx(s,{name:"FileText",size:"sm"}),children:"Reports"})]}),e.jsxs(i,{children:[e.jsx(n,{href:"/users",icon:e.jsx(s,{name:"Users",size:"sm"}),children:"Users"}),e.jsx(n,{href:"/settings",icon:e.jsx(s,{name:"Gear",size:"sm"}),children:"Settings"}),e.jsx(n,{href:"/help",icon:e.jsx(s,{name:"Question",size:"sm"}),children:"Help"})]})]}),collapsible:!0,onToggle:t()}},p={args:{title:"Navigation",children:e.jsxs(i,{children:[e.jsx(n,{href:"/",icon:e.jsx(s,{name:"House",size:"sm"}),active:!0,children:"Home"}),e.jsx(n,{href:"/about",icon:e.jsx(s,{name:"Info",size:"sm"}),children:"About"}),e.jsx(n,{href:"/services",icon:e.jsx(s,{name:"Gear",size:"sm"}),disabled:!0,children:"Services (Coming Soon)"}),e.jsx(n,{href:"/contact",icon:e.jsx(s,{name:"Envelope",size:"sm"}),children:"Contact"})]}),collapsible:!0,onToggle:t()}},g={args:{title:"Quick Links",children:e.jsxs(i,{children:[e.jsx(n,{href:"/dashboard",icon:e.jsx(s,{name:"ChartBar",size:"sm"}),active:!0,children:"Dashboard"}),e.jsx(n,{href:"/profile",icon:e.jsx(s,{name:"User",size:"sm"}),children:"Profile"}),e.jsx(n,{href:"/settings",icon:e.jsx(s,{name:"Gear",size:"sm"}),children:"Settings"}),e.jsx(n,{href:"/logout",icon:e.jsx(s,{name:"SignOut",size:"sm"}),children:"Logout"})]}),collapsible:!1,onToggle:t()}},M={render:o=>{const[r,y]=L.useState(!1),a=m=>{var l;y(m),(l=o.onToggle)==null||l.call(o,m)};return e.jsxs("div",{children:[e.jsxs("button",{onClick:()=>a(!r),style:{marginBottom:"1rem"},children:["Toggle Menu (Currently: ",r?"Open":"Closed",")"]}),e.jsx(T,{...o,title:"Controlled Menu",isOpen:r,onToggle:a,collapsible:!0,children:e.jsxs(i,{children:[e.jsx(n,{href:"/",icon:e.jsx(s,{name:"House",size:"sm"}),active:!0,children:"Home"}),e.jsx(n,{href:"/about",icon:e.jsx(s,{name:"Info",size:"sm"}),children:"About"}),e.jsx(n,{href:"/contact",icon:e.jsx(s,{name:"Envelope",size:"sm"}),children:"Contact"})]})})]})},args:{onToggle:t()}},f={args:{title:"Actions",children:e.jsxs(i,{children:[e.jsx(n,{onClick:t(),icon:e.jsx(s,{name:"ChartBar",size:"sm"}),active:!0,children:"Dashboard"}),e.jsx(n,{onClick:t(),icon:e.jsx(s,{name:"Plus",size:"sm"}),children:"Create New"}),e.jsx(n,{onClick:t(),icon:e.jsx(s,{name:"Export",size:"sm"}),children:"Export Data"}),e.jsx(n,{onClick:t(),icon:e.jsx(s,{name:"Gear",size:"sm"}),children:"Settings"})]}),collapsible:!0,onToggle:t()}},x={args:{title:"Custom Menu",toggleIcon:e.jsx(s,{name:"CaretDown",size:"xs"}),children:e.jsxs(i,{children:[e.jsx(n,{href:"/",icon:e.jsx(s,{name:"House",size:"sm"}),active:!0,children:"Home"}),e.jsx(n,{href:"/about",icon:e.jsx(s,{name:"Info",size:"sm"}),children:"About"}),e.jsx(n,{href:"/contact",icon:e.jsx(s,{name:"Envelope",size:"sm"}),children:"Contact"})]}),collapsible:!0,onToggle:t()}},j={args:{title:"Disabled Menu",disabled:!0,children:e.jsxs(i,{children:[e.jsx(n,{href:"/",icon:e.jsx(s,{name:"House",size:"sm"}),active:!0,children:"Home"}),e.jsx(n,{href:"/about",icon:e.jsx(s,{name:"Info",size:"sm"}),children:"About"}),e.jsx(n,{href:"/contact",icon:e.jsx(s,{name:"Envelope",size:"sm"}),children:"Contact"})]}),collapsible:!0,onToggle:t()}},b={args:{title:"Admin Panel",children:e.jsxs(e.Fragment,{children:[e.jsx(i,{children:e.jsx(n,{href:"/dashboard",icon:e.jsx(s,{name:"ChartBar",size:"sm"}),active:!0,children:"Dashboard"})}),e.jsxs(i,{children:[e.jsx(n,{href:"/users",icon:e.jsx(s,{name:"Users",size:"sm"}),children:"User Management"}),e.jsx(n,{href:"/roles",icon:e.jsx(s,{name:"Shield",size:"sm"}),children:"Roles & Permissions"}),e.jsx(n,{href:"/audit",icon:e.jsx(s,{name:"FileText",size:"sm"}),children:"Audit Logs"})]}),e.jsxs(i,{children:[e.jsx(n,{href:"/content",icon:e.jsx(s,{name:"Article",size:"sm"}),children:"Content Management"}),e.jsx(n,{href:"/media",icon:e.jsx(s,{name:"Image",size:"sm"}),children:"Media Library"}),e.jsx(n,{href:"/seo",icon:e.jsx(s,{name:"MagnifyingGlass",size:"sm"}),children:"SEO Settings"})]}),e.jsxs(i,{children:[e.jsx(n,{href:"/analytics",icon:e.jsx(s,{name:"TrendUp",size:"sm"}),children:"Analytics"}),e.jsx(n,{href:"/reports",icon:e.jsx(s,{name:"ChartBar",size:"sm"}),children:"Reports"}),e.jsx(n,{href:"/exports",icon:e.jsx(s,{name:"Export",size:"sm"}),children:"Data Exports"})]}),e.jsxs(i,{children:[e.jsx(n,{href:"/settings",icon:e.jsx(s,{name:"Gear",size:"sm"}),children:"System Settings"}),e.jsx(n,{href:"/integrations",icon:e.jsx(s,{name:"Plugs",size:"sm"}),children:"Integrations"}),e.jsx(n,{href:"/backup",icon:e.jsx(s,{name:"Database",size:"sm"}),children:"Backup & Restore"})]})]}),collapsible:!0,onToggle:t()}},z={render:o=>e.jsxs("div",{style:{maxWidth:"300px"},children:[e.jsx("p",{style:{marginBottom:"1rem",fontSize:"0.875rem",color:"#666"},children:"Resize your browser window to see the responsive behavior. On mobile (less than 768px), the menu becomes collapsible."}),e.jsxs(T,{...o,title:"Responsive Menu",collapsible:!0,children:[e.jsxs(i,{children:[e.jsx(n,{href:"/",icon:e.jsx(s,{name:"House",size:"sm"}),active:!0,children:"Home"}),e.jsx(n,{href:"/products",icon:e.jsx(s,{name:"Package",size:"sm"}),children:"Products"}),e.jsx(n,{href:"/services",icon:e.jsx(s,{name:"Gear",size:"sm"}),children:"Services"}),e.jsx(n,{href:"/about",icon:e.jsx(s,{name:"Info",size:"sm"}),children:"About Us"}),e.jsx(n,{href:"/contact",icon:e.jsx(s,{name:"Envelope",size:"sm"}),children:"Contact"})]}),e.jsxs(i,{children:[e.jsx(n,{href:"/account",icon:e.jsx(s,{name:"User",size:"sm"}),children:"My Account"}),e.jsx(n,{href:"/orders",icon:e.jsx(s,{name:"FileText",size:"sm"}),children:"Order History"}),e.jsx(n,{href:"/support",icon:e.jsx(s,{name:"Question",size:"sm"}),children:"Support"})]})]})]}),args:{onToggle:t()}},v={args:{title:"Shop Categories",children:e.jsxs(e.Fragment,{children:[e.jsxs(i,{children:[e.jsx(n,{href:"/electronics",icon:e.jsx(s,{name:"DeviceMobile",size:"sm"}),active:!0,children:"Electronics"}),e.jsx(n,{href:"/clothing",icon:e.jsx(s,{name:"TShirt",size:"sm"}),children:"Clothing"}),e.jsx(n,{href:"/home-garden",icon:e.jsx(s,{name:"House",size:"sm"}),children:"Home & Garden"}),e.jsx(n,{href:"/sports",icon:e.jsx(s,{name:"Basketball",size:"sm"}),children:"Sports & Outdoors"})]}),e.jsxs(i,{children:[e.jsx(n,{href:"/account",icon:e.jsx(s,{name:"User",size:"sm"}),children:"My Account"}),e.jsx(n,{href:"/orders",icon:e.jsx(s,{name:"Package",size:"sm"}),children:"Order History"}),e.jsx(n,{href:"/wishlist",icon:e.jsx(s,{name:"Heart",size:"sm"}),children:"Wishlist"}),e.jsx(n,{href:"/cart",icon:e.jsx(s,{name:"ShoppingCart",size:"sm"}),children:"Shopping Cart"})]})]}),collapsible:!0,onToggle:t()}},C={render:o=>{const[r,y]=L.useState("/dashboard"),[a,m]=L.useState(!1),l=u=>{var c;m(u),(c=o.onToggle)==null||c.call(o,u)},d=u=>{var c;y(u),(c=o.onToggle)==null||c.call(o,!1)};return e.jsxs("div",{children:[e.jsxs("div",{style:{marginBottom:"1rem",padding:"0.5rem",backgroundColor:"#f5f5f5",borderRadius:"4px"},children:[e.jsx("strong",{children:"Current Page:"})," ",r," | ",e.jsx("strong",{children:"Menu:"})," ",a?"Open":"Closed"]}),e.jsxs(T,{...o,title:"Interactive Menu",isOpen:a,onToggle:l,collapsible:!0,children:[e.jsxs(i,{children:[e.jsx(n,{href:"/dashboard",icon:e.jsx(s,{name:"ChartBar",size:"sm"}),active:r==="/dashboard",onClick:()=>d("/dashboard"),children:"Dashboard"}),e.jsx(n,{href:"/analytics",icon:e.jsx(s,{name:"TrendUp",size:"sm"}),active:r==="/analytics",onClick:()=>d("/analytics"),children:"Analytics"}),e.jsx(n,{href:"/users",icon:e.jsx(s,{name:"Users",size:"sm"}),active:r==="/users",onClick:()=>d("/users"),children:"Users"})]}),e.jsxs(i,{children:[e.jsx(n,{href:"/settings",icon:e.jsx(s,{name:"Gear",size:"sm"}),active:r==="/settings",onClick:()=>d("/settings"),children:"Settings"}),e.jsx(n,{onClick:t(),icon:e.jsx(s,{name:"SignOut",size:"sm"}),children:"Logout"})]})]})]})},args:{onToggle:t()}};var k,A,H;h.parameters={...h.parameters,docs:{...(k=h.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    title: 'Navigation',
    children: <SideMenuList>
        <SideMenuItem href="/" active>
          Home
        </SideMenuItem>
        <SideMenuItem href="/about">About</SideMenuItem>
        <SideMenuItem href="/services">Services</SideMenuItem>
        <SideMenuItem href="/contact">Contact</SideMenuItem>
      </SideMenuList>,
    collapsible: true,
    onToggle: fn()
  }
}`,...(H=(A=h.parameters)==null?void 0:A.docs)==null?void 0:H.source}}};var O,D,E;S.parameters={...S.parameters,docs:{...(O=S.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    title: 'Main Menu',
    children: <SideMenuList>
        <SideMenuItem href="/" icon={<Icon name="House" size="sm" />} active>
          Home
        </SideMenuItem>
        <SideMenuItem href="/about" icon={<Icon name="Info" size="sm" />}>
          About
        </SideMenuItem>
        <SideMenuItem href="/services" icon={<Icon name="Gear" size="sm" />}>
          Services
        </SideMenuItem>
        <SideMenuItem href="/portfolio" icon={<Icon name="Briefcase" size="sm" />}>
          Portfolio
        </SideMenuItem>
        <SideMenuItem href="/contact" icon={<Icon name="Envelope" size="sm" />}>
          Contact
        </SideMenuItem>
      </SideMenuList>,
    collapsible: true,
    onToggle: fn()
  }
}`,...(E=(D=S.parameters)==null?void 0:D.docs)==null?void 0:E.source}}};var B,U,R;I.parameters={...I.parameters,docs:{...(B=I.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    title: 'Dashboard',
    children: <>
        <SideMenuList>
          <SideMenuItem href="/dashboard" icon={<Icon name="ChartBar" size="sm" />} active>
            Dashboard
          </SideMenuItem>
          <SideMenuItem href="/analytics" icon={<Icon name="TrendUp" size="sm" />}>
            Analytics
          </SideMenuItem>
          <SideMenuItem href="/reports" icon={<Icon name="FileText" size="sm" />}>
            Reports
          </SideMenuItem>
        </SideMenuList>

        <SideMenuList>
          <SideMenuItem href="/users" icon={<Icon name="Users" size="sm" />}>
            Users
          </SideMenuItem>
          <SideMenuItem href="/settings" icon={<Icon name="Gear" size="sm" />}>
            Settings
          </SideMenuItem>
          <SideMenuItem href="/help" icon={<Icon name="Question" size="sm" />}>
            Help
          </SideMenuItem>
        </SideMenuList>
      </>,
    collapsible: true,
    onToggle: fn()
  }
}`,...(R=(U=I.parameters)==null?void 0:U.docs)==null?void 0:R.source}}};var _,P,w;p.parameters={...p.parameters,docs:{...(_=p.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    title: 'Navigation',
    children: <SideMenuList>
        <SideMenuItem href="/" icon={<Icon name="House" size="sm" />} active>
          Home
        </SideMenuItem>
        <SideMenuItem href="/about" icon={<Icon name="Info" size="sm" />}>
          About
        </SideMenuItem>
        <SideMenuItem href="/services" icon={<Icon name="Gear" size="sm" />} disabled>
          Services (Coming Soon)
        </SideMenuItem>
        <SideMenuItem href="/contact" icon={<Icon name="Envelope" size="sm" />}>
          Contact
        </SideMenuItem>
      </SideMenuList>,
    collapsible: true,
    onToggle: fn()
  }
}`,...(w=(P=p.parameters)==null?void 0:P.docs)==null?void 0:w.source}}};var G,N,W;g.parameters={...g.parameters,docs:{...(G=g.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    title: 'Quick Links',
    children: <SideMenuList>
        <SideMenuItem href="/dashboard" icon={<Icon name="ChartBar" size="sm" />} active>
          Dashboard
        </SideMenuItem>
        <SideMenuItem href="/profile" icon={<Icon name="User" size="sm" />}>
          Profile
        </SideMenuItem>
        <SideMenuItem href="/settings" icon={<Icon name="Gear" size="sm" />}>
          Settings
        </SideMenuItem>
        <SideMenuItem href="/logout" icon={<Icon name="SignOut" size="sm" />}>
          Logout
        </SideMenuItem>
      </SideMenuList>,
    collapsible: false,
    onToggle: fn()
  }
}`,...(W=(N=g.parameters)==null?void 0:N.docs)==null?void 0:W.source}}};var F,Q,V;M.parameters={...M.parameters,docs:{...(F=M.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: args => {
    const [isOpen, setIsOpen] = React.useState(false);
    const handleToggle = (newIsOpen: boolean) => {
      setIsOpen(newIsOpen);
      args.onToggle?.(newIsOpen);
    };
    return <div>
        <button onClick={() => handleToggle(!isOpen)} style={{
        marginBottom: '1rem'
      }}>
          Toggle Menu (Currently: {isOpen ? 'Open' : 'Closed'})
        </button>

        <SideMenu {...args} title="Controlled Menu" isOpen={isOpen} onToggle={handleToggle} collapsible>
          <SideMenuList>
            <SideMenuItem href="/" icon={<Icon name="House" size="sm" />} active>
              Home
            </SideMenuItem>
            <SideMenuItem href="/about" icon={<Icon name="Info" size="sm" />}>
              About
            </SideMenuItem>
            <SideMenuItem href="/contact" icon={<Icon name="Envelope" size="sm" />}>
              Contact
            </SideMenuItem>
          </SideMenuList>
        </SideMenu>
      </div>;
  },
  args: {
    onToggle: fn()
  }
}`,...(V=(Q=M.parameters)==null?void 0:Q.docs)==null?void 0:V.source}}};var J,q,K;f.parameters={...f.parameters,docs:{...(J=f.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    title: 'Actions',
    children: <SideMenuList>
        <SideMenuItem onClick={fn()} icon={<Icon name="ChartBar" size="sm" />} active>
          Dashboard
        </SideMenuItem>
        <SideMenuItem onClick={fn()} icon={<Icon name="Plus" size="sm" />}>
          Create New
        </SideMenuItem>
        <SideMenuItem onClick={fn()} icon={<Icon name="Export" size="sm" />}>
          Export Data
        </SideMenuItem>
        <SideMenuItem onClick={fn()} icon={<Icon name="Gear" size="sm" />}>
          Settings
        </SideMenuItem>
      </SideMenuList>,
    collapsible: true,
    onToggle: fn()
  }
}`,...(K=(q=f.parameters)==null?void 0:q.docs)==null?void 0:K.source}}};var X,Y,Z;x.parameters={...x.parameters,docs:{...(X=x.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    title: 'Custom Menu',
    toggleIcon: <Icon name="CaretDown" size="xs" />,
    children: <SideMenuList>
        <SideMenuItem href="/" icon={<Icon name="House" size="sm" />} active>
          Home
        </SideMenuItem>
        <SideMenuItem href="/about" icon={<Icon name="Info" size="sm" />}>
          About
        </SideMenuItem>
        <SideMenuItem href="/contact" icon={<Icon name="Envelope" size="sm" />}>
          Contact
        </SideMenuItem>
      </SideMenuList>,
    collapsible: true,
    onToggle: fn()
  }
}`,...(Z=(Y=x.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var $,ee,ne;j.parameters={...j.parameters,docs:{...($=j.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    title: 'Disabled Menu',
    disabled: true,
    children: <SideMenuList>
        <SideMenuItem href="/" icon={<Icon name="House" size="sm" />} active>
          Home
        </SideMenuItem>
        <SideMenuItem href="/about" icon={<Icon name="Info" size="sm" />}>
          About
        </SideMenuItem>
        <SideMenuItem href="/contact" icon={<Icon name="Envelope" size="sm" />}>
          Contact
        </SideMenuItem>
      </SideMenuList>,
    collapsible: true,
    onToggle: fn()
  }
}`,...(ne=(ee=j.parameters)==null?void 0:ee.docs)==null?void 0:ne.source}}};var se,ie,te;b.parameters={...b.parameters,docs:{...(se=b.parameters)==null?void 0:se.docs,source:{originalSource:`{
  args: {
    title: 'Admin Panel',
    children: <>
        <SideMenuList>
          <SideMenuItem href="/dashboard" icon={<Icon name="ChartBar" size="sm" />} active>
            Dashboard
          </SideMenuItem>
        </SideMenuList>

        <SideMenuList>
          <SideMenuItem href="/users" icon={<Icon name="Users" size="sm" />}>
            User Management
          </SideMenuItem>
          <SideMenuItem href="/roles" icon={<Icon name="Shield" size="sm" />}>
            Roles & Permissions
          </SideMenuItem>
          <SideMenuItem href="/audit" icon={<Icon name="FileText" size="sm" />}>
            Audit Logs
          </SideMenuItem>
        </SideMenuList>

        <SideMenuList>
          <SideMenuItem href="/content" icon={<Icon name="Article" size="sm" />}>
            Content Management
          </SideMenuItem>
          <SideMenuItem href="/media" icon={<Icon name="Image" size="sm" />}>
            Media Library
          </SideMenuItem>
          <SideMenuItem href="/seo" icon={<Icon name="MagnifyingGlass" size="sm" />}>
            SEO Settings
          </SideMenuItem>
        </SideMenuList>

        <SideMenuList>
          <SideMenuItem href="/analytics" icon={<Icon name="TrendUp" size="sm" />}>
            Analytics
          </SideMenuItem>
          <SideMenuItem href="/reports" icon={<Icon name="ChartBar" size="sm" />}>
            Reports
          </SideMenuItem>
          <SideMenuItem href="/exports" icon={<Icon name="Export" size="sm" />}>
            Data Exports
          </SideMenuItem>
        </SideMenuList>

        <SideMenuList>
          <SideMenuItem href="/settings" icon={<Icon name="Gear" size="sm" />}>
            System Settings
          </SideMenuItem>
          <SideMenuItem href="/integrations" icon={<Icon name="Plugs" size="sm" />}>
            Integrations
          </SideMenuItem>
          <SideMenuItem href="/backup" icon={<Icon name="Database" size="sm" />}>
            Backup & Restore
          </SideMenuItem>
        </SideMenuList>
      </>,
    collapsible: true,
    onToggle: fn()
  }
}`,...(te=(ie=b.parameters)==null?void 0:ie.docs)==null?void 0:te.source}}};var oe,re,ae;z.parameters={...z.parameters,docs:{...(oe=z.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  render: args => <div style={{
    maxWidth: '300px'
  }}>
      <p style={{
      marginBottom: '1rem',
      fontSize: '0.875rem',
      color: '#666'
    }}>
        Resize your browser window to see the responsive behavior. On mobile (less than 768px), the
        menu becomes collapsible.
      </p>

      <SideMenu {...args} title="Responsive Menu" collapsible>
        <SideMenuList>
          <SideMenuItem href="/" icon={<Icon name="House" size="sm" />} active>
            Home
          </SideMenuItem>
          <SideMenuItem href="/products" icon={<Icon name="Package" size="sm" />}>
            Products
          </SideMenuItem>
          <SideMenuItem href="/services" icon={<Icon name="Gear" size="sm" />}>
            Services
          </SideMenuItem>
          <SideMenuItem href="/about" icon={<Icon name="Info" size="sm" />}>
            About Us
          </SideMenuItem>
          <SideMenuItem href="/contact" icon={<Icon name="Envelope" size="sm" />}>
            Contact
          </SideMenuItem>
        </SideMenuList>

        <SideMenuList>
          <SideMenuItem href="/account" icon={<Icon name="User" size="sm" />}>
            My Account
          </SideMenuItem>
          <SideMenuItem href="/orders" icon={<Icon name="FileText" size="sm" />}>
            Order History
          </SideMenuItem>
          <SideMenuItem href="/support" icon={<Icon name="Question" size="sm" />}>
            Support
          </SideMenuItem>
        </SideMenuList>
      </SideMenu>
    </div>,
  args: {
    onToggle: fn()
  }
}`,...(ae=(re=z.parameters)==null?void 0:re.docs)==null?void 0:ae.source}}};var ce,me,le;v.parameters={...v.parameters,docs:{...(ce=v.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  args: {
    title: 'Shop Categories',
    children: <>
        <SideMenuList>
          <SideMenuItem href="/electronics" icon={<Icon name="DeviceMobile" size="sm" />} active>
            Electronics
          </SideMenuItem>
          <SideMenuItem href="/clothing" icon={<Icon name="TShirt" size="sm" />}>
            Clothing
          </SideMenuItem>
          <SideMenuItem href="/home-garden" icon={<Icon name="House" size="sm" />}>
            Home & Garden
          </SideMenuItem>
          <SideMenuItem href="/sports" icon={<Icon name="Basketball" size="sm" />}>
            Sports & Outdoors
          </SideMenuItem>
        </SideMenuList>

        <SideMenuList>
          <SideMenuItem href="/account" icon={<Icon name="User" size="sm" />}>
            My Account
          </SideMenuItem>
          <SideMenuItem href="/orders" icon={<Icon name="Package" size="sm" />}>
            Order History
          </SideMenuItem>
          <SideMenuItem href="/wishlist" icon={<Icon name="Heart" size="sm" />}>
            Wishlist
          </SideMenuItem>
          <SideMenuItem href="/cart" icon={<Icon name="ShoppingCart" size="sm" />}>
            Shopping Cart
          </SideMenuItem>
        </SideMenuList>
      </>,
    collapsible: true,
    onToggle: fn()
  }
}`,...(le=(me=v.parameters)==null?void 0:me.docs)==null?void 0:le.source}}};var de,ue,he;C.parameters={...C.parameters,docs:{...(de=C.parameters)==null?void 0:de.docs,source:{originalSource:`{
  render: args => {
    const [activeItem, setActiveItem] = React.useState('/dashboard');
    const [isOpen, setIsOpen] = React.useState(false);
    const handleToggle = (newIsOpen: boolean) => {
      setIsOpen(newIsOpen);
      args.onToggle?.(newIsOpen);
    };
    const handleItemClick = (href: string) => {
      setActiveItem(href);
      // Simulate navigation action
      args.onToggle?.(false); // Close menu on mobile after selection
    };
    return <div>
        <div style={{
        marginBottom: '1rem',
        padding: '0.5rem',
        backgroundColor: '#f5f5f5',
        borderRadius: '4px'
      }}>
          <strong>Current Page:</strong> {activeItem} | <strong>Menu:</strong>{' '}
          {isOpen ? 'Open' : 'Closed'}
        </div>

        <SideMenu {...args} title="Interactive Menu" isOpen={isOpen} onToggle={handleToggle} collapsible>
          <SideMenuList>
            <SideMenuItem href="/dashboard" icon={<Icon name="ChartBar" size="sm" />} active={activeItem === '/dashboard'} onClick={() => handleItemClick('/dashboard')}>
              Dashboard
            </SideMenuItem>
            <SideMenuItem href="/analytics" icon={<Icon name="TrendUp" size="sm" />} active={activeItem === '/analytics'} onClick={() => handleItemClick('/analytics')}>
              Analytics
            </SideMenuItem>
            <SideMenuItem href="/users" icon={<Icon name="Users" size="sm" />} active={activeItem === '/users'} onClick={() => handleItemClick('/users')}>
              Users
            </SideMenuItem>
          </SideMenuList>

          <SideMenuList>
            <SideMenuItem href="/settings" icon={<Icon name="Gear" size="sm" />} active={activeItem === '/settings'} onClick={() => handleItemClick('/settings')}>
              Settings
            </SideMenuItem>
            <SideMenuItem onClick={fn()} icon={<Icon name="SignOut" size="sm" />}>
              Logout
            </SideMenuItem>
          </SideMenuList>
        </SideMenu>
      </div>;
  },
  args: {
    onToggle: fn()
  }
}`,...(he=(ue=C.parameters)==null?void 0:ue.docs)==null?void 0:he.source}}};const be=["Default","WithIcons","MultipleLists","WithDisabledItems","NonCollapsible","Controlled","ButtonItems","CustomToggleIcon","DisabledMenu","ComplexNavigation","ResponsiveDemo","EcommerceNavigation","InteractiveDemo"];export{f as ButtonItems,b as ComplexNavigation,M as Controlled,x as CustomToggleIcon,h as Default,j as DisabledMenu,v as EcommerceNavigation,C as InteractiveDemo,I as MultipleLists,g as NonCollapsible,z as ResponsiveDemo,p as WithDisabledItems,S as WithIcons,be as __namedExportsOrder,je as default};
