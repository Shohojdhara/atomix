import{j as l}from"./jsx-runtime-BjG_zV1W.js";import{r as k}from"./index-BVDOR7y2.js";import{S as a}from"./Select-lkWIRGDx.js";import"./components-BrxBU25R.js";const R={title:"Components/Form/Select",component:a,parameters:{layout:"centered"},argTypes:{size:{control:{type:"select"},options:["sm","md","lg"],description:"Size of the select"},disabled:{control:"boolean",description:"Whether the select is disabled"},invalid:{control:"boolean",description:"Whether the select is invalid"},valid:{control:"boolean",description:"Whether the select is valid"},placeholder:{control:"text",description:"Placeholder text"},multiple:{control:"boolean",description:"Whether multiple options can be selected"}}},e=[{value:"us",label:"United States"},{value:"ca",label:"Canada"},{value:"mx",label:"Mexico"},{value:"uk",label:"United Kingdom"},{value:"fr",label:"France"},{value:"de",label:"Germany"},{value:"jp",label:"Japan"}],t={args:{options:e,placeholder:"Select a country"}},s={args:{options:e,value:"ca",placeholder:"Select a country"}},o={args:{options:e},render:()=>{const[d,E]=k.useState(""),F=I=>{E(I.target.value)};return l.jsxs("div",{className:"u-d-flex u-flex-column u-gap-3",style:{width:"300px"},children:[l.jsx(a,{options:e,placeholder:"Select a country",value:d,onChange:F}),d&&l.jsxs("div",{className:"u-mt-3",children:["Selected value: ",l.jsx("strong",{children:d})]})]})}},r={args:{options:e},render:()=>l.jsxs("div",{className:"u-d-flex u-flex-column u-gap-3",style:{width:"300px"},children:[l.jsx(a,{size:"sm",options:e,placeholder:"Small select"}),l.jsx(a,{size:"md",options:e,placeholder:"Medium select (default)"}),l.jsx(a,{size:"lg",options:e,placeholder:"Large select"})]})},c={args:{options:e},render:()=>l.jsxs("div",{className:"u-d-flex u-flex-column u-gap-3",style:{width:"300px"},children:[l.jsx(a,{options:e,placeholder:"Default select"}),l.jsx(a,{options:e,placeholder:"Disabled select",disabled:!0}),l.jsx(a,{options:e,placeholder:"Valid select",valid:!0,value:"us"}),l.jsx(a,{options:e,placeholder:"Invalid select",invalid:!0})]})},n={args:{options:e,placeholder:"Select multiple countries",multiple:!0}},i={args:{options:[{value:"us",label:"United States"},{value:"ca",label:"Canada"},{value:"mx",label:"Mexico",disabled:!0},{value:"uk",label:"United Kingdom"},{value:"fr",label:"France",disabled:!0}],placeholder:"Select a country"}};var u,p,m;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    options: countries,
    placeholder: 'Select a country'
  }
}`,...(m=(p=t.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var h,v,g;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    options: countries,
    value: 'ca',
    placeholder: 'Select a country'
  }
}`,...(g=(v=s.parameters)==null?void 0:v.docs)==null?void 0:g.source}}};var S,x,b;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    options: countries
  },
  render: () => {
    const [selectedValue, setSelectedValue] = useState('');
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedValue(e.target.value);
    };
    return <div className="u-d-flex u-flex-column u-gap-3" style={{
      width: '300px'
    }}>
        <Select options={countries} placeholder="Select a country" value={selectedValue} onChange={handleChange} />
        {selectedValue && <div className="u-mt-3">
            Selected value: <strong>{selectedValue}</strong>
          </div>}
      </div>;
  }
}`,...(b=(x=o.parameters)==null?void 0:x.docs)==null?void 0:b.source}}};var f,y,j;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    options: countries
  },
  render: () => <div className="u-d-flex u-flex-column u-gap-3" style={{
    width: '300px'
  }}>
      <Select size="sm" options={countries} placeholder="Small select" />
      <Select size="md" options={countries} placeholder="Medium select (default)" />
      <Select size="lg" options={countries} placeholder="Large select" />
    </div>
}`,...(j=(y=r.parameters)==null?void 0:y.docs)==null?void 0:j.source}}};var V,z,C;c.parameters={...c.parameters,docs:{...(V=c.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    options: countries
  },
  render: () => <div className="u-d-flex u-flex-column u-gap-3" style={{
    width: '300px'
  }}>
      <Select options={countries} placeholder="Default select" />
      <Select options={countries} placeholder="Disabled select" disabled />
      <Select options={countries} placeholder="Valid select" valid value="us" />
      <Select options={countries} placeholder="Invalid select" invalid />
    </div>
}`,...(C=(z=c.parameters)==null?void 0:z.docs)==null?void 0:C.source}}};var M,N,w;n.parameters={...n.parameters,docs:{...(M=n.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    options: countries,
    placeholder: 'Select multiple countries',
    multiple: true
  }
}`,...(w=(N=n.parameters)==null?void 0:N.docs)==null?void 0:w.source}}};var D,U,W;i.parameters={...i.parameters,docs:{...(D=i.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    options: [{
      value: 'us',
      label: 'United States'
    }, {
      value: 'ca',
      label: 'Canada'
    }, {
      value: 'mx',
      label: 'Mexico',
      disabled: true
    }, {
      value: 'uk',
      label: 'United Kingdom'
    }, {
      value: 'fr',
      label: 'France',
      disabled: true
    }],
    placeholder: 'Select a country'
  }
}`,...(W=(U=i.parameters)==null?void 0:U.docs)==null?void 0:W.source}}};const T=["Basic","WithValue","Interactive","Sizes","States","Multiple","DisabledOptions"];export{t as Basic,i as DisabledOptions,o as Interactive,n as Multiple,r as Sizes,c as States,s as WithValue,T as __namedExportsOrder,R as default};
