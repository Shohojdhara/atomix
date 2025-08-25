import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{T as a}from"./Textarea-BZZsfKcc.js";import"./components-BrxBU25R.js";const V={title:"Components/Form/Textarea",component:a,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{value:{control:"text",description:"Textarea value"},placeholder:{control:"text",description:"Placeholder text"},rows:{control:"number",description:"Number of visible text lines"},cols:{control:"number",description:"Number of average character widths"},size:{control:{type:"select"},options:["sm","md","lg"],description:"Size of the textarea"},variant:{control:{type:"select"},options:["primary","secondary","success","error","warning","info"],description:"Color variant of the textarea"},disabled:{control:"boolean",description:"Whether the textarea is disabled"},invalid:{control:"boolean",description:"Whether the textarea is invalid"},valid:{control:"boolean",description:"Whether the textarea is valid"}}},r={args:{placeholder:"Enter text here",rows:4}},t={args:{value:"This is some sample text in the textarea.",rows:4}},s={render:()=>e.jsxs("div",{className:"u-d-flex u-flex-column u-gap-3",style:{width:"300px"},children:[e.jsx(a,{size:"sm",placeholder:"Small textarea",rows:3}),e.jsx(a,{size:"md",placeholder:"Medium textarea (default)",rows:3}),e.jsx(a,{size:"lg",placeholder:"Large textarea",rows:3})]})},o={render:()=>e.jsxs("div",{className:"u-d-flex u-flex-column u-gap-3",style:{width:"300px"},children:[e.jsx(a,{placeholder:"2 rows",rows:2}),e.jsx(a,{placeholder:"4 rows",rows:4}),e.jsx(a,{placeholder:"6 rows",rows:6})]})},l={render:()=>e.jsxs("div",{className:"u-d-flex u-flex-column u-gap-3",style:{width:"300px"},children:[e.jsx(a,{variant:"primary",placeholder:"Primary textarea",rows:2}),e.jsx(a,{variant:"secondary",placeholder:"Secondary textarea",rows:2}),e.jsx(a,{variant:"success",placeholder:"Success textarea",rows:2}),e.jsx(a,{variant:"error",placeholder:"Error textarea",rows:2}),e.jsx(a,{variant:"warning",placeholder:"Warning textarea",rows:2}),e.jsx(a,{variant:"info",placeholder:"Info textarea",rows:2})]})},d={render:()=>e.jsxs("div",{className:"u-d-flex u-flex-column u-gap-3",style:{width:"300px"},children:[e.jsx(a,{placeholder:"Default textarea",rows:2}),e.jsx(a,{placeholder:"Disabled textarea",disabled:!0,rows:2}),e.jsx(a,{placeholder:"Valid textarea",valid:!0,rows:2}),e.jsx(a,{placeholder:"Invalid textarea",invalid:!0,rows:2}),e.jsx(a,{placeholder:"Read-only textarea",readOnly:!0,value:"This content cannot be edited",rows:2})]})};var c,i,n;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    placeholder: 'Enter text here',
    rows: 4
  }
}`,...(n=(i=r.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};var x,p,u;t.parameters={...t.parameters,docs:{...(x=t.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    value: 'This is some sample text in the textarea.',
    rows: 4
  }
}`,...(u=(p=t.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var m,h,w;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => <div className="u-d-flex u-flex-column u-gap-3" style={{
    width: '300px'
  }}>
      <Textarea size="sm" placeholder="Small textarea" rows={3} />
      <Textarea size="md" placeholder="Medium textarea (default)" rows={3} />
      <Textarea size="lg" placeholder="Large textarea" rows={3} />
    </div>
}`,...(w=(h=s.parameters)==null?void 0:h.docs)==null?void 0:w.source}}};var v,f,g;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <div className="u-d-flex u-flex-column u-gap-3" style={{
    width: '300px'
  }}>
      <Textarea placeholder="2 rows" rows={2} />
      <Textarea placeholder="4 rows" rows={4} />
      <Textarea placeholder="6 rows" rows={6} />
    </div>
}`,...(g=(f=o.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};var y,T,j;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <div className="u-d-flex u-flex-column u-gap-3" style={{
    width: '300px'
  }}>
      <Textarea variant="primary" placeholder="Primary textarea" rows={2} />
      <Textarea variant="secondary" placeholder="Secondary textarea" rows={2} />
      <Textarea variant="success" placeholder="Success textarea" rows={2} />
      <Textarea variant="error" placeholder="Error textarea" rows={2} />
      <Textarea variant="warning" placeholder="Warning textarea" rows={2} />
      <Textarea variant="info" placeholder="Info textarea" rows={2} />
    </div>
}`,...(j=(T=l.parameters)==null?void 0:T.docs)==null?void 0:j.source}}};var S,b,z;d.parameters={...d.parameters,docs:{...(S=d.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <div className="u-d-flex u-flex-column u-gap-3" style={{
    width: '300px'
  }}>
      <Textarea placeholder="Default textarea" rows={2} />
      <Textarea placeholder="Disabled textarea" disabled rows={2} />
      <Textarea placeholder="Valid textarea" valid rows={2} />
      <Textarea placeholder="Invalid textarea" invalid rows={2} />
      <Textarea placeholder="Read-only textarea" readOnly value="This content cannot be edited" rows={2} />
    </div>
}`,...(z=(b=d.parameters)==null?void 0:b.docs)==null?void 0:z.source}}};const R=["Basic","WithValue","Sizes","Rows","Variants","States"];export{r as Basic,o as Rows,s as Sizes,d as States,l as Variants,t as WithValue,R as __namedExportsOrder,V as default};
