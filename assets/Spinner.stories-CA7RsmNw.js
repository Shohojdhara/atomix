import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{S as r}from"./Spinner-puYPCf0E.js";import"./components-BrxBU25R.js";const g={title:"Components/Spinner",component:r,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{variant:{control:{type:"select"},options:["primary","secondary","success","info","warning","error","light","dark"],description:"The color variant of the spinner"},size:{control:{type:"select"},options:["sm","md","lg"],description:"The size of the spinner"},fullscreen:{control:"boolean",description:"Whether the spinner should be centered and fixed in the viewport"}}},n={args:{variant:"primary",size:"md",fullscreen:!1}},a={render:()=>e.jsxs("div",{className:"u-d-flex u-flex-wrap u-gap-3 u-align-items-center",children:[e.jsx(r,{size:"sm"}),e.jsx(r,{size:"md"}),e.jsx(r,{size:"lg"})]})},s={render:()=>e.jsxs("div",{className:"u-d-flex u-flex-wrap u-gap-3 u-align-items-center",children:[e.jsx(r,{variant:"primary"}),e.jsx(r,{variant:"secondary"}),e.jsx(r,{variant:"success"}),e.jsx(r,{variant:"info"}),e.jsx(r,{variant:"warning"}),e.jsx(r,{variant:"error"}),e.jsx(r,{variant:"light"}),e.jsx(r,{variant:"dark"})]})};var i,t,o;n.parameters={...n.parameters,docs:{...(i=n.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    size: 'md',
    fullscreen: false
  }
}`,...(o=(t=n.parameters)==null?void 0:t.docs)==null?void 0:o.source}}};var p,c,l;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => <div className="u-d-flex u-flex-wrap u-gap-3 u-align-items-center">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
}`,...(l=(c=a.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};var d,m,u;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => <div className="u-d-flex u-flex-wrap u-gap-3 u-align-items-center">
      <Spinner variant="primary" />
      <Spinner variant="secondary" />
      <Spinner variant="success" />
      <Spinner variant="info" />
      <Spinner variant="warning" />
      <Spinner variant="error" />
      <Spinner variant="light" />
      <Spinner variant="dark" />
    </div>
}`,...(u=(m=s.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};const S=["Default","Sizes","ColorVariants"];export{s as ColorVariants,n as Default,a as Sizes,S as __namedExportsOrder,g as default};
