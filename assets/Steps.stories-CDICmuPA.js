import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{e as T}from"./index-BVDOR7y2.js";import{S as m}from"./Steps-B_pwleuS.js";import"./components-BrxBU25R.js";const A={title:"Components/Steps",component:m,argTypes:{activeIndex:{control:{type:"number"},defaultValue:1},vertical:{control:{type:"boolean"},defaultValue:!1}}},o=t=>e.jsx("div",{style:{padding:"30px"},children:e.jsx(m,{...t})}),n=o.bind({});n.args={items:[{number:1,text:"Step 1"},{number:2,text:"Step 2"},{number:3,text:"Step 3"},{number:4,text:"Step 4"},{number:5,text:"Step 5"}],activeIndex:1,vertical:!1};const s=o.bind({});s.args={items:[{number:1,text:"Step 1"},{number:2,text:"Step 2"},{number:3,text:"Step 3"},{number:4,text:"Step 4"},{number:5,text:"Step 5"}],activeIndex:1,vertical:!0};const r=o.bind({});r.args={items:[{number:1,text:"Registration",content:e.jsx("p",{style:{marginTop:"10px",fontSize:"0.85em"},children:"Create your account"})},{number:2,text:"Personal Info",content:e.jsx("p",{style:{marginTop:"10px",fontSize:"0.85em"},children:"Tell us about yourself"})},{number:3,text:"Preferences",content:e.jsx("p",{style:{marginTop:"10px",fontSize:"0.85em"},children:"Select your preferences"})},{number:4,text:"Payment",content:e.jsx("p",{style:{marginTop:"10px",fontSize:"0.85em"},children:"Add payment information"})},{number:5,text:"Confirmation",content:e.jsx("p",{style:{marginTop:"10px",fontSize:"0.85em"},children:"Complete your signup"})}],activeIndex:1,vertical:!1};const a=o.bind({});a.args={items:[{number:e.jsx("i",{className:"icon-lux-user",style:{fontSize:"16px"}}),text:"Account"},{number:e.jsx("i",{className:"icon-lux-settings",style:{fontSize:"16px"}}),text:"Settings"},{number:e.jsx("i",{className:"icon-lux-calendar",style:{fontSize:"16px"}}),text:"Schedule"},{number:e.jsx("i",{className:"icon-lux-card",style:{fontSize:"16px"}}),text:"Payment"},{number:e.jsx("i",{className:"icon-lux-check",style:{fontSize:"16px"}}),text:"Complete"}],activeIndex:1,vertical:!1};const N=()=>{const[t,c]=T.useState(0),p=[{number:1,text:"Step 1"},{number:2,text:"Step 2"},{number:3,text:"Step 3"},{number:4,text:"Step 4"},{number:5,text:"Step 5"}];return e.jsxs("div",{children:[e.jsx(m,{items:p,activeIndex:t,onStepChange:c}),e.jsxs("div",{style:{marginTop:"30px",display:"flex",gap:"10px"},children:[e.jsx("button",{className:"c-btn c-btn--primary",onClick:()=>c(Math.max(0,t-1)),disabled:t===0,children:"Previous"}),e.jsx("button",{className:"c-btn c-btn--primary",onClick:()=>c(Math.min(p.length-1,t+1)),disabled:t===p.length-1,children:"Next"})]})]})},i=()=>e.jsx("div",{style:{padding:"30px"},children:e.jsx(N,{})});var l,x,d;n.parameters={...n.parameters,docs:{...(l=n.parameters)==null?void 0:l.docs,source:{originalSource:`args => <div style={{
  padding: '30px'
}}>
    <Steps {...args} />
  </div>`,...(d=(x=n.parameters)==null?void 0:x.docs)==null?void 0:d.source}}};var u,S,b;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`args => <div style={{
  padding: '30px'
}}>
    <Steps {...args} />
  </div>`,...(b=(S=s.parameters)==null?void 0:S.docs)==null?void 0:b.source}}};var g,v,y;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`args => <div style={{
  padding: '30px'
}}>
    <Steps {...args} />
  </div>`,...(y=(v=r.parameters)==null?void 0:v.docs)==null?void 0:y.source}}};var f,h,j;a.parameters={...a.parameters,docs:{...(f=a.parameters)==null?void 0:f.docs,source:{originalSource:`args => <div style={{
  padding: '30px'
}}>
    <Steps {...args} />
  </div>`,...(j=(h=a.parameters)==null?void 0:h.docs)==null?void 0:j.source}}};var I,C,z;i.parameters={...i.parameters,docs:{...(I=i.parameters)==null?void 0:I.docs,source:{originalSource:`() => <div style={{
  padding: '30px'
}}>
    <InteractiveSteps />
  </div>`,...(z=(C=i.parameters)==null?void 0:C.docs)==null?void 0:z.source}}};const _=["Default","Vertical","WithCustomContent","WithIcons","Interactive"];export{n as Default,i as Interactive,s as Vertical,r as WithCustomContent,a as WithIcons,_ as __namedExportsOrder,A as default};
