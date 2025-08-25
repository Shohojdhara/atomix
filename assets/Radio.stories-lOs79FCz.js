import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{R as a}from"./Radio-B6X5LtW0.js";import"./components-BrxBU25R.js";const C={title:"Components/Form/Radio",component:a,parameters:{layout:"centered"},argTypes:{label:{control:"text",description:"Radio button label text"},checked:{control:"boolean",description:"Whether the radio button is checked"},disabled:{control:"boolean",description:"Whether the radio button is disabled"},invalid:{control:"boolean",description:"Whether the radio button is invalid"},valid:{control:"boolean",description:"Whether the radio button is valid"}}},o={args:{label:"Option 1",name:"option",value:"option1"}},l={args:{label:"Option 1",name:"option",value:"option1",checked:!0}},t={render:j=>e.jsxs("div",{className:"u-d-flex u-flex-column u-gap-2",children:[e.jsx(a,{label:"Option 1",name:"radioGroup",value:"option1",checked:!0}),e.jsx(a,{label:"Option 2",name:"radioGroup",value:"option2"}),e.jsx(a,{label:"Option 3",name:"radioGroup",value:"option3"})]})},r={render:j=>e.jsxs("div",{className:"u-d-flex u-flex-column u-gap-2",children:[e.jsx(a,{label:"Default radio",name:"states",value:"default"}),e.jsx(a,{label:"Checked radio",name:"states",value:"checked",checked:!0}),e.jsx(a,{label:"Disabled radio",name:"states",value:"disabled",disabled:!0}),e.jsx(a,{label:"Disabled and checked radio",name:"states",value:"disabledChecked",disabled:!0,checked:!0}),e.jsx(a,{label:"Valid radio",name:"states",value:"valid",valid:!0,checked:!0}),e.jsx(a,{label:"Invalid radio",name:"states",value:"invalid",invalid:!0})]})},i={args:{name:"noLabel",value:"noLabel",ariaLabel:"Radio button without visible label"}};var n,s,d;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    label: 'Option 1',
    name: 'option',
    value: 'option1'
  }
}`,...(d=(s=o.parameters)==null?void 0:s.docs)==null?void 0:d.source}}};var c,u,p;l.parameters={...l.parameters,docs:{...(c=l.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    label: 'Option 1',
    name: 'option',
    value: 'option1',
    checked: true
  }
}`,...(p=(u=l.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};var m,b,v;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: args => <div className="u-d-flex u-flex-column u-gap-2">
      <Radio label="Option 1" name="radioGroup" value="option1" checked />
      <Radio label="Option 2" name="radioGroup" value="option2" />
      <Radio label="Option 3" name="radioGroup" value="option3" />
    </div>
}`,...(v=(b=t.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};var h,x,k;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: args => <div className="u-d-flex u-flex-column u-gap-2">
      <Radio label="Default radio" name="states" value="default" />
      <Radio label="Checked radio" name="states" value="checked" checked />
      <Radio label="Disabled radio" name="states" value="disabled" disabled />
      <Radio label="Disabled and checked radio" name="states" value="disabledChecked" disabled checked />
      <Radio label="Valid radio" name="states" value="valid" valid checked />
      <Radio label="Invalid radio" name="states" value="invalid" invalid />
    </div>
}`,...(k=(x=r.parameters)==null?void 0:x.docs)==null?void 0:k.source}}};var g,R,f;i.parameters={...i.parameters,docs:{...(g=i.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    name: 'noLabel',
    value: 'noLabel',
    ariaLabel: 'Radio button without visible label'
  }
}`,...(f=(R=i.parameters)==null?void 0:R.docs)==null?void 0:f.source}}};const S=["Basic","Checked","RadioGroup","States","WithoutLabel"];export{o as Basic,l as Checked,t as RadioGroup,r as States,i as WithoutLabel,S as __namedExportsOrder,C as default};
