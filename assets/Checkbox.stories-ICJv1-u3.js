import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{C as c}from"./Checkbox-BzZ8CJSP.js";import"./index-BVDOR7y2.js";const f={title:"Components/Form/Checkbox",component:c,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{label:{control:"text",description:"Checkbox label text"},checked:{control:"boolean",description:"Whether the checkbox is checked"},disabled:{control:"boolean",description:"Whether the checkbox is disabled"},invalid:{control:"boolean",description:"Whether the checkbox is invalid"},valid:{control:"boolean",description:"Whether the checkbox is valid"},indeterminate:{control:"boolean",description:"Whether the checkbox is in indeterminate state"}}},a={args:{label:"Accept terms and conditions"}},o={args:{label:"Accept terms and conditions",checked:!0}},t={render:C=>e.jsxs("div",{className:"u-d-flex u-flex-column u-gap-3",children:[e.jsx(c,{label:"Default checkbox"}),e.jsx(c,{label:"Checked checkbox",checked:!0}),e.jsx(c,{label:"Disabled checkbox",disabled:!0}),e.jsx(c,{label:"Disabled and checked checkbox",disabled:!0,checked:!0}),e.jsx(c,{label:"Valid checkbox",valid:!0,checked:!0}),e.jsx(c,{label:"Invalid checkbox",invalid:!0}),e.jsx(c,{label:"Indeterminate checkbox",indeterminate:!0})]})},r={args:{ariaLabel:"Checkbox without visible label"}};var s,l,n;a.parameters={...a.parameters,docs:{...(s=a.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    label: 'Accept terms and conditions'
  }
}`,...(n=(l=a.parameters)==null?void 0:l.docs)==null?void 0:n.source}}};var d,i,b;o.parameters={...o.parameters,docs:{...(d=o.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    label: 'Accept terms and conditions',
    checked: true
  }
}`,...(b=(i=o.parameters)==null?void 0:i.docs)==null?void 0:b.source}}};var h,x,k;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: args => <div className="u-d-flex u-flex-column u-gap-3">
      <Checkbox label="Default checkbox" />
      <Checkbox label="Checked checkbox" checked />
      <Checkbox label="Disabled checkbox" disabled />
      <Checkbox label="Disabled and checked checkbox" disabled checked />
      <Checkbox label="Valid checkbox" valid checked />
      <Checkbox label="Invalid checkbox" invalid />
      <Checkbox label="Indeterminate checkbox" indeterminate />
    </div>
}`,...(k=(x=t.parameters)==null?void 0:x.docs)==null?void 0:k.source}}};var m,u,p;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    ariaLabel: 'Checkbox without visible label'
  }
}`,...(p=(u=r.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};const W=["Basic","Checked","States","WithoutLabel"];export{a as Basic,o as Checked,t as States,r as WithoutLabel,W as __namedExportsOrder,f as default};
