import{j as r}from"./jsx-runtime-BjG_zV1W.js";import{B as y}from"./Breadcrumb-DgOUEAKq.js";import{I as a}from"./Icon-k4CeN--q.js";import"./components-BrxBU25R.js";import"./index-BVDOR7y2.js";import"./SpeakerX.es-Cg-mjUf1.js";const N={title:"Components/Breadcrumb",component:y,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{items:{control:"object"},divider:{control:"text"},className:{control:"text"},ariaLabel:{control:"text"}}},t={args:{items:[{label:"Home",href:"/"},{label:"Products",href:"/products"},{label:"Category",href:"/products/category"},{label:"Product Name",active:!0}]}},o={args:{items:[{label:"Home",href:"/",icon:r.jsx(a,{name:"House",size:"sm"})},{label:"Products",href:"/products",icon:r.jsx(a,{name:"Package",size:"sm"})},{label:"Category",href:"/products/category",icon:r.jsx(a,{name:"Folder",size:"sm"})},{label:"Product Name",active:!0,icon:r.jsx(a,{name:"Tag",size:"sm"})}]}},c={args:{items:[{label:"Home",href:"/"},{label:"Products",href:"/products"},{label:"Category",href:"/products/category"},{label:"Product Name",active:!0}],divider:"/"}},s={args:{items:[{label:"Home",href:"/",onClick:e=>{e.preventDefault(),alert("Home clicked")}},{label:"Products",href:"/products",onClick:e=>{e.preventDefault(),alert("Products clicked")}},{label:"Category",href:"/products/category",onClick:e=>{e.preventDefault(),alert("Category clicked")}},{label:"Product Name",active:!0}]}};var n,l,m;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    items: [{
      label: 'Home',
      href: '/'
    }, {
      label: 'Products',
      href: '/products'
    }, {
      label: 'Category',
      href: '/products/category'
    }, {
      label: 'Product Name',
      active: true
    }]
  }
}`,...(m=(l=t.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};var i,u,d;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    items: [{
      label: 'Home',
      href: '/',
      icon: <Icon name="House" size="sm" />
    }, {
      label: 'Products',
      href: '/products',
      icon: <Icon name="Package" size="sm" />
    }, {
      label: 'Category',
      href: '/products/category',
      icon: <Icon name="Folder" size="sm" />
    }, {
      label: 'Product Name',
      active: true,
      icon: <Icon name="Tag" size="sm" />
    }]
  }
}`,...(d=(u=o.parameters)==null?void 0:u.docs)==null?void 0:d.source}}};var p,b,f;c.parameters={...c.parameters,docs:{...(p=c.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    items: [{
      label: 'Home',
      href: '/'
    }, {
      label: 'Products',
      href: '/products'
    }, {
      label: 'Category',
      href: '/products/category'
    }, {
      label: 'Product Name',
      active: true
    }],
    divider: '/'
  }
}`,...(f=(b=c.parameters)==null?void 0:b.docs)==null?void 0:f.source}}};var g,h,C;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    items: [{
      label: 'Home',
      href: '/',
      onClick: e => {
        e.preventDefault();
        alert('Home clicked');
      }
    }, {
      label: 'Products',
      href: '/products',
      onClick: e => {
        e.preventDefault();
        alert('Products clicked');
      }
    }, {
      label: 'Category',
      href: '/products/category',
      onClick: e => {
        e.preventDefault();
        alert('Category clicked');
      }
    }, {
      label: 'Product Name',
      active: true
    }]
  }
}`,...(C=(h=s.parameters)==null?void 0:h.docs)==null?void 0:C.source}}};const z=["Default","WithIcons","CustomDivider","WithClickHandlers"];export{c as CustomDivider,t as Default,s as WithClickHandlers,o as WithIcons,z as __namedExportsOrder,N as default};
