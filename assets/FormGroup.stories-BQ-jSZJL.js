import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{F as r}from"./FormGroup-nZLxhk3o.js";import{I as l}from"./Input-BD7PDG9W.js";import{S as I}from"./Select-DM4sxyWL.js";import{C as f}from"./Checkbox-BzZ8CJSP.js";import{R as z}from"./Radio-B6X5LtW0.js";import{T as G}from"./Textarea-CjDgD4Kv.js";import"./components-BrxBU25R.js";import"./index-BVDOR7y2.js";const O={title:"Components/Form/FormGroup",component:r,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{label:{control:"text",description:"Label for the form group"},helperText:{control:"text",description:"Helper text displayed below the input"},htmlFor:{control:"text",description:"ID of the form control this label is for"},required:{control:"boolean",description:"Whether the field is required"},invalid:{control:"boolean",description:"Whether the field is invalid"},valid:{control:"boolean",description:"Whether the field is valid"},size:{control:{type:"select"},options:["sm","md","lg"],description:"Size variant"}}},a={args:{label:"Username",htmlFor:"username",helperText:"Enter your username",required:!0,children:e.jsx(l,{id:"username",placeholder:"Enter username"})}},t={args:{label:"Email",htmlFor:"email",required:!0,helperText:"We will never share your email",children:e.jsx(l,{id:"email",type:"email",placeholder:"name@example.com",required:!0})}},o={args:{children:e.jsx(l,{id:"username",placeholder:"Enter username"}),label:"Validation States",htmlFor:"username",helperText:"This is a helper text",required:!0},render:m=>e.jsxs("div",{className:"u-d-flex u-flex-column u-gap-3",style:{width:"300px"},children:[e.jsx(r,{label:"Username",htmlFor:"username",helperText:"Username is available",valid:!0,children:e.jsx(l,{id:"username",value:"johndoe",valid:!0})}),e.jsx(r,{label:"Password",htmlFor:"password",helperText:"Password must be at least 8 characters",invalid:!0,children:e.jsx(l,{id:"password",type:"password",value:"1234",invalid:!0})})]})},i={args:{children:e.jsx(l,{id:"text-input",placeholder:"Type something..."}),label:"Form Controls",htmlFor:"text-input"},render:m=>e.jsxs("div",{style:{display:"grid",gap:"1rem",width:"100%",maxWidth:"400px"},children:[e.jsx(r,{label:"Text Input",htmlFor:"text-input",children:e.jsx(l,{id:"text-input",placeholder:"Type something..."})}),e.jsx(r,{label:"Select",htmlFor:"select",children:e.jsx(I,{id:"select",options:[{value:"",label:"Select an option"},{value:"1",label:"Option 1"},{value:"2",label:"Option 2"}]})}),e.jsx(r,{label:"Checkbox",htmlFor:"checkbox",children:e.jsx(f,{id:"checkbox",label:"Check me"})}),e.jsx(r,{label:"Radio",htmlFor:"radio",children:e.jsx(z,{id:"radio",name:"radio-group",label:"Select me"})}),e.jsx(r,{label:"Textarea",htmlFor:"textarea",children:e.jsx(G,{id:"textarea",placeholder:"Enter your message...",rows:3})})]})},s={args:{children:e.jsx(l,{id:"small-input",size:"sm",placeholder:"Small input..."}),label:"Input Sizes",htmlFor:"small-input",size:"sm"},render:m=>e.jsxs("div",{style:{display:"grid",gap:"1rem",width:"100%",maxWidth:"400px"},children:[e.jsx(r,{label:"Small Input",htmlFor:"small-input",size:"sm",children:e.jsx(l,{id:"small-input",size:"sm",placeholder:"Small input..."})}),e.jsx(r,{label:"Medium Input (default)",htmlFor:"medium-input",size:"md",children:e.jsx(l,{id:"medium-input",size:"md",placeholder:"Medium input..."})}),e.jsx(r,{label:"Large Input",htmlFor:"large-input",size:"lg",children:e.jsx(l,{id:"large-input",size:"lg",placeholder:"Large input..."})})]})};var d,p,n;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    label: 'Username',
    htmlFor: 'username',
    helperText: 'Enter your username',
    required: true,
    children: <Input id="username" placeholder="Enter username" />
  }
}`,...(n=(p=a.parameters)==null?void 0:p.docs)==null?void 0:n.source}}};var u,c,h;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    label: 'Email',
    htmlFor: 'email',
    required: true,
    helperText: 'We will never share your email',
    children: <Input id="email" type="email" placeholder="name@example.com" required />
  }
}`,...(h=(c=t.parameters)==null?void 0:c.docs)==null?void 0:h.source}}};var x,b,F;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    children: <Input id="username" placeholder="Enter username" />,
    label: 'Validation States',
    htmlFor: 'username',
    helperText: 'This is a helper text',
    required: true
  },
  render: args => <div className="u-d-flex u-flex-column u-gap-3" style={{
    width: '300px'
  }}>
      <FormGroup label="Username" htmlFor="username" helperText="Username is available" valid>
        <Input id="username" value="johndoe" valid />
      </FormGroup>

      <FormGroup label="Password" htmlFor="password" helperText="Password must be at least 8 characters" invalid>
        <Input id="password" type="password" value="1234" invalid />
      </FormGroup>
    </div>
}`,...(F=(b=o.parameters)==null?void 0:b.docs)==null?void 0:F.source}}};var g,v,j;i.parameters={...i.parameters,docs:{...(g=i.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    children: <Input id="text-input" placeholder="Type something..." />,
    label: 'Form Controls',
    htmlFor: 'text-input'
  },
  render: args => <div style={{
    display: 'grid',
    gap: '1rem',
    width: '100%',
    maxWidth: '400px'
  }}>
      <FormGroup label="Text Input" htmlFor="text-input">
        <Input id="text-input" placeholder="Type something..." />
      </FormGroup>

      <FormGroup label="Select" htmlFor="select">
        <Select id="select" options={[{
        value: '',
        label: 'Select an option'
      }, {
        value: '1',
        label: 'Option 1'
      }, {
        value: '2',
        label: 'Option 2'
      }]} />
      </FormGroup>

      <FormGroup label="Checkbox" htmlFor="checkbox">
        <Checkbox id="checkbox" label="Check me" />
      </FormGroup>

      <FormGroup label="Radio" htmlFor="radio">
        <Radio id="radio" name="radio-group" label="Select me" />
      </FormGroup>

      <FormGroup label="Textarea" htmlFor="textarea">
        <Textarea id="textarea" placeholder="Enter your message..." rows={3} />
      </FormGroup>
    </div>
}`,...(j=(v=i.parameters)==null?void 0:v.docs)==null?void 0:j.source}}};var S,y,T;s.parameters={...s.parameters,docs:{...(S=s.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    children: <Input id="small-input" size="sm" placeholder="Small input..." />,
    label: 'Input Sizes',
    htmlFor: 'small-input',
    size: 'sm'
  },
  render: args => <div style={{
    display: 'grid',
    gap: '1rem',
    width: '100%',
    maxWidth: '400px'
  }}>
      <FormGroup label="Small Input" htmlFor="small-input" size="sm">
        <Input id="small-input" size="sm" placeholder="Small input..." />
      </FormGroup>

      <FormGroup label="Medium Input (default)" htmlFor="medium-input" size="md">
        <Input id="medium-input" size="md" placeholder="Medium input..." />
      </FormGroup>

      <FormGroup label="Large Input" htmlFor="large-input" size="lg">
        <Input id="large-input" size="lg" placeholder="Large input..." />
      </FormGroup>
    </div>
}`,...(T=(y=s.parameters)==null?void 0:y.docs)==null?void 0:T.source}}};const M=["Basic","Required","ValidationStates","FormControls","Sizes"];export{a as Basic,i as FormControls,t as Required,s as Sizes,o as ValidationStates,M as __namedExportsOrder,O as default};
