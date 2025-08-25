import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{I as r}from"./Input-CPdh8XDx.js";import"./components-BrxBU25R.js";const z={title:"Components/Form/Input",component:r,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{type:{control:{type:"select"},options:["text","email","password","number","search","tel","url"],description:"Input type"},size:{control:{type:"select"},options:["sm","md","lg"],description:"Size of the input"},variant:{control:{type:"select"},options:["primary","success","danger","warning","info"],description:"Color variant of the input"},disabled:{control:"boolean",description:"Whether the input is disabled"},invalid:{control:"boolean",description:"Whether the input is invalid"},valid:{control:"boolean",description:"Whether the input is valid"},placeholder:{control:"text",description:"Placeholder text"}}},t={args:{placeholder:"Enter text here",type:"text"}},a={render:()=>e.jsxs("div",{className:"u-d-flex u-flex-column u-gap-3",style:{width:"300px"},children:[e.jsx(r,{size:"sm",placeholder:"Small input"}),e.jsx(r,{size:"md",placeholder:"Medium input (default)"}),e.jsx(r,{size:"lg",placeholder:"Large input"})]})},l={render:()=>e.jsxs("div",{className:"u-d-flex u-flex-column u-gap-3",style:{width:"300px"},children:[e.jsx(r,{type:"text",placeholder:"Text input"}),e.jsx(r,{type:"email",placeholder:"Email input"}),e.jsx(r,{type:"password",placeholder:"Password input"}),e.jsx(r,{type:"number",placeholder:"Number input"}),e.jsx(r,{type:"search",placeholder:"Search input"}),e.jsx(r,{type:"tel",placeholder:"Tel input"}),e.jsx(r,{type:"url",placeholder:"URL input"})]})},p={render:()=>e.jsxs("div",{className:"u-d-flex u-flex-column u-gap-3",style:{width:"300px"},children:[e.jsx(r,{variant:"primary",placeholder:"Primary input"}),e.jsx(r,{variant:"secondary",placeholder:"Secondary input"}),e.jsx(r,{variant:"success",placeholder:"Success input"}),e.jsx(r,{variant:"error",placeholder:"Error input"}),e.jsx(r,{variant:"warning",placeholder:"Warning input"}),e.jsx(r,{variant:"info",placeholder:"Info input"})]})},s={render:()=>e.jsxs("div",{className:"u-d-flex u-flex-column u-gap-3",style:{width:"300px"},children:[e.jsx(r,{placeholder:"Default input"}),e.jsx(r,{placeholder:"Disabled input",disabled:!0}),e.jsx(r,{placeholder:"Valid input",valid:!0}),e.jsx(r,{placeholder:"Invalid input",invalid:!0})]})};var n,i,o;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    placeholder: 'Enter text here',
    type: 'text'
  }
}`,...(o=(i=t.parameters)==null?void 0:i.docs)==null?void 0:o.source}}};var d,c,u;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => <div className="u-d-flex u-flex-column u-gap-3" style={{
    width: '300px'
  }}>
      <Input size="sm" placeholder="Small input" />
      <Input size="md" placeholder="Medium input (default)" />
      <Input size="lg" placeholder="Large input" />
    </div>
}`,...(u=(c=a.parameters)==null?void 0:c.docs)==null?void 0:u.source}}};var h,m,x;l.parameters={...l.parameters,docs:{...(h=l.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <div className="u-d-flex u-flex-column u-gap-3" style={{
    width: '300px'
  }}>
      <Input type="text" placeholder="Text input" />
      <Input type="email" placeholder="Email input" />
      <Input type="password" placeholder="Password input" />
      <Input type="number" placeholder="Number input" />
      <Input type="search" placeholder="Search input" />
      <Input type="tel" placeholder="Tel input" />
      <Input type="url" placeholder="URL input" />
    </div>
}`,...(x=(m=l.parameters)==null?void 0:m.docs)==null?void 0:x.source}}};var y,v,f;p.parameters={...p.parameters,docs:{...(y=p.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <div className="u-d-flex u-flex-column u-gap-3" style={{
    width: '300px'
  }}>
      <Input variant="primary" placeholder="Primary input" />
      <Input variant="secondary" placeholder="Secondary input" />
      <Input variant="success" placeholder="Success input" />
      <Input variant="error" placeholder="Error input" />
      <Input variant="warning" placeholder="Warning input" />
      <Input variant="info" placeholder="Info input" />
    </div>
}`,...(f=(v=p.parameters)==null?void 0:v.docs)==null?void 0:f.source}}};var g,I,j;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <div className="u-d-flex u-flex-column u-gap-3" style={{
    width: '300px'
  }}>
      <Input placeholder="Default input" />
      <Input placeholder="Disabled input" disabled />
      <Input placeholder="Valid input" valid />
      <Input placeholder="Invalid input" invalid />
    </div>
}`,...(j=(I=s.parameters)==null?void 0:I.docs)==null?void 0:j.source}}};const N=["Basic","Sizes","Types","Variants","States"];export{t as Basic,a as Sizes,s as States,l as Types,p as Variants,N as __namedExportsOrder,z as default};
