import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{S as we,T as y}from"./components-BrxBU25R.js";import{B as a}from"./Badge-DMpyJ-Oc.js";const ke={title:"Components/Badge",component:a,parameters:{layout:"centered"},argTypes:{variant:{control:{type:"select"},options:y,description:"The visual style of the badge"},size:{control:{type:"select"},options:we,description:"The size of the badge"},disabled:{control:"boolean",description:"Whether the badge is disabled"},icon:{control:"text",description:"Optional icon element to display in the badge"}}},r=()=>e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"}),e.jsx("path",{d:"M12 8v8"}),e.jsx("path",{d:"M8 12h8"})]}),i={args:{label:"Primary",variant:"primary",size:"md"}},l={args:{label:"Secondary",variant:"secondary",size:"md"}},n={args:{label:"Success",variant:"success",size:"md"}},t={args:{label:"Info",variant:"info",size:"md"}},d={args:{label:"Warning",variant:"warning",size:"md"}},c={args:{label:"Error",variant:"error",size:"md"}},o={args:{label:"Light",variant:"light",size:"md"}},m={args:{label:"Dark",variant:"dark",size:"md"}},u={args:{label:"Small",variant:"primary",size:"sm"}},p={args:{label:"Medium",variant:"primary",size:"md"}},g={args:{label:"Large",variant:"primary",size:"lg"}},v={args:{label:"Disabled",variant:"primary",size:"md",disabled:!0}},x={args:{label:"With Icon",variant:"primary",size:"md",icon:e.jsx(r,{})}},b={args:{label:"Badge",variant:"primary"},render:()=>e.jsx("div",{className:"u-d-flex u-flex-wrap u-gap-2",children:y.map(s=>e.jsx(a,{label:s,variant:s},s))})},h={args:{label:"Badge",variant:"primary"},render:()=>e.jsxs("div",{className:"u-d-flex u-align-items-center u-gap-2",children:[e.jsx(a,{label:"Small",variant:"primary",size:"sm"}),e.jsx(a,{label:"Medium",variant:"primary",size:"md"}),e.jsx(a,{label:"Large",variant:"primary",size:"lg"})]})},j={args:{label:"Badge with different content"},render:()=>e.jsxs("div",{className:"u-d-flex u-flex-column u-gap-4",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"u-mt-0 u-mb-2",children:"Numeric Badges"}),e.jsxs("div",{className:"u-d-flex u-gap-2",children:[e.jsx(a,{label:"1",variant:"primary"}),e.jsx(a,{label:"2",variant:"secondary"}),e.jsx(a,{label:"3",variant:"success"}),e.jsx(a,{label:"4",variant:"error"}),e.jsx(a,{label:"5",variant:"warning"}),e.jsx(a,{label:"6",variant:"info"})]})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"u-mt-0 u-mb-2",children:"Status Badges"}),e.jsxs("div",{className:"u-d-flex u-gap-2",children:[e.jsx(a,{label:"New",variant:"primary"}),e.jsx(a,{label:"Active",variant:"success"}),e.jsx(a,{label:"Pending",variant:"warning"}),e.jsx(a,{label:"Failed",variant:"error"}),e.jsx(a,{label:"Blocked",variant:"secondary"})]})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"u-mt-0 u-mb-2",children:"Badges with Icons"}),e.jsxs("div",{className:"u-d-flex u-gap-2",children:[e.jsx(a,{label:"Info",variant:"info",icon:e.jsx(r,{})}),e.jsx(a,{label:"Warning",variant:"warning",icon:e.jsx(r,{})}),e.jsx(a,{label:"Success",variant:"success",icon:e.jsx(r,{})}),e.jsx(a,{label:"Error",variant:"error",icon:e.jsx(r,{})})]})]})]})},f={args:{label:"Usage examples"},render:()=>e.jsxs("div",{className:"u-d-flex u-flex-column u-gap-6 u-max-width-80",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"u-mt-0 u-mb-2",children:"In navigation"}),e.jsxs("div",{className:"u-d-flex u-gap-4",children:[e.jsxs("div",{className:"u-d-flex u-align-items-center u-gap-2",children:[e.jsx("span",{children:"Inbox"}),e.jsx(a,{label:"24",variant:"error",size:"sm"})]}),e.jsxs("div",{className:"u-d-flex u-align-items-center u-gap-2",children:[e.jsx("span",{children:"Notifications"}),e.jsx(a,{label:"3",variant:"primary",size:"sm"})]}),e.jsxs("div",{className:"u-d-flex u-align-items-center u-gap-2",children:[e.jsx("span",{children:"Messages"}),e.jsx(a,{label:"New",variant:"success",size:"sm"})]})]})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"u-mt-0 u-mb-2",children:"In cards"}),e.jsxs("div",{className:"u-p-4 u-shadow u-d-flex u-flex-column u-gap-2",children:[e.jsxs("div",{className:"u-d-flex u-justify-content-between",children:[e.jsx("h4",{className:"u-m-0",children:"Product Title"}),e.jsx(a,{label:"Sale",variant:"error"})]}),e.jsx("p",{className:"u-my-2",children:"This is a sample product description."}),e.jsxs("div",{className:"u-d-flex u-gap-2",children:[e.jsx(a,{label:"In Stock",variant:"success",size:"sm"}),e.jsx(a,{label:"Free Shipping",variant:"info",size:"sm"})]})]})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"u-mt-0 u-mb-2",children:"In lists"}),e.jsxs("ul",{className:"u-p-0 u-m-0",style:{listStyle:"none"},children:[e.jsxs("li",{className:"u-py-2 u-d-flex u-justify-content-between",style:{borderBottom:"1px solid #e0e0e0"},children:[e.jsx("span",{children:"Task 1"}),e.jsx(a,{label:"Completed",variant:"success",size:"sm"})]}),e.jsxs("li",{className:"u-py-2 u-d-flex u-justify-content-between",style:{borderBottom:"1px solid #e0e0e0"},children:[e.jsx("span",{children:"Task 2"}),e.jsx(a,{label:"In Progress",variant:"warning",size:"sm"})]}),e.jsxs("li",{className:"u-py-2 u-d-flex u-justify-content-between",children:[e.jsx("span",{children:"Task 3"}),e.jsx(a,{label:"Not Started",variant:"secondary",size:"sm"})]})]})]})]})},N={args:{label:"Badge",variant:"primary"},render:()=>e.jsxs("div",{className:"u-d-flex u-flex-column u-gap-6",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"u-mt-0 u-mb-2",children:"Theme Aware Badges"}),e.jsx("p",{className:"u-mb-4",children:"The badges below demonstrate how they adapt to different theme modes."}),e.jsx("div",{className:"u-d-flex u-gap-5 u-mt-4",children:e.jsxs("div",{className:"u-p-5 u-shadow u-flex-1",children:[e.jsx("h4",{className:"u-mt-0",children:"Current Theme"}),e.jsx("div",{className:"u-d-flex u-flex-wrap u-gap-2",children:y.map(s=>e.jsx(a,{label:s,variant:s},s))})]})})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"u-mt-2 u-mb-2",children:"Accessibility Considerations"}),e.jsx("p",{className:"u-mb-2",children:"Our badges are designed to maintain proper contrast in both light and dark modes."}),e.jsxs("div",{className:"u-d-flex u-flex-column u-gap-2 u-mt-2",children:[e.jsxs("div",{className:"u-d-flex u-align-items-center u-gap-2",children:[e.jsx("span",{className:"u-d-inline-block",style:{width:"120px"},children:"Primary:"}),e.jsx(a,{label:"New Feature",variant:"primary"})]}),e.jsxs("div",{className:"u-d-flex u-align-items-center u-gap-2",children:[e.jsx("span",{className:"u-d-inline-block",style:{width:"120px"},children:"Success:"}),e.jsx(a,{label:"Completed",variant:"success"})]}),e.jsxs("div",{className:"u-d-flex u-align-items-center u-gap-2",children:[e.jsx("span",{className:"u-d-inline-block",style:{width:"120px"},children:"Warning:"}),e.jsx(a,{label:"In Progress",variant:"warning"})]}),e.jsxs("div",{className:"u-d-flex u-align-items-center u-gap-2",children:[e.jsx("span",{className:"u-d-inline-block",style:{width:"120px"},children:"error:"}),e.jsx(a,{label:"Failed",variant:"error"})]})]})]}),e.jsx("div",{className:"u-mt-4",children:e.jsx("p",{children:"Use the Color Mode toggle in the Storybook toolbar to switch between light and dark mode!"})})]})};var w,B,S;i.parameters={...i.parameters,docs:{...(w=i.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    label: 'Primary',
    variant: 'primary',
    size: 'md'
  }
}`,...(S=(B=i.parameters)==null?void 0:B.docs)==null?void 0:S.source}}};var z,k,I;l.parameters={...l.parameters,docs:{...(z=l.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    label: 'Secondary',
    variant: 'secondary',
    size: 'md'
  }
}`,...(I=(k=l.parameters)==null?void 0:k.docs)==null?void 0:I.source}}};var T,C,M;n.parameters={...n.parameters,docs:{...(T=n.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    label: 'Success',
    variant: 'success',
    size: 'md'
  }
}`,...(M=(C=n.parameters)==null?void 0:C.docs)==null?void 0:M.source}}};var W,E,L;t.parameters={...t.parameters,docs:{...(W=t.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    label: 'Info',
    variant: 'info',
    size: 'md'
  }
}`,...(L=(E=t.parameters)==null?void 0:E.docs)==null?void 0:L.source}}};var P,A,D;d.parameters={...d.parameters,docs:{...(P=d.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    label: 'Warning',
    variant: 'warning',
    size: 'md'
  }
}`,...(D=(A=d.parameters)==null?void 0:A.docs)==null?void 0:D.source}}};var O,F,U;c.parameters={...c.parameters,docs:{...(O=c.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    label: 'Error',
    variant: 'error',
    size: 'md'
  }
}`,...(U=(F=c.parameters)==null?void 0:F.docs)==null?void 0:U.source}}};var _,R,H;o.parameters={...o.parameters,docs:{...(_=o.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    label: 'Light',
    variant: 'light',
    size: 'md'
  }
}`,...(H=(R=o.parameters)==null?void 0:R.docs)==null?void 0:H.source}}};var V,Z,q;m.parameters={...m.parameters,docs:{...(V=m.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    label: 'Dark',
    variant: 'dark',
    size: 'md'
  }
}`,...(q=(Z=m.parameters)==null?void 0:Z.docs)==null?void 0:q.source}}};var G,J,K;u.parameters={...u.parameters,docs:{...(G=u.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    label: 'Small',
    variant: 'primary',
    size: 'sm'
  }
}`,...(K=(J=u.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var Q,X,Y;p.parameters={...p.parameters,docs:{...(Q=p.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    label: 'Medium',
    variant: 'primary',
    size: 'md'
  }
}`,...(Y=(X=p.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};var $,ee,ae;g.parameters={...g.parameters,docs:{...($=g.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    label: 'Large',
    variant: 'primary',
    size: 'lg'
  }
}`,...(ae=(ee=g.parameters)==null?void 0:ee.docs)==null?void 0:ae.source}}};var se,re,ie;v.parameters={...v.parameters,docs:{...(se=v.parameters)==null?void 0:se.docs,source:{originalSource:`{
  args: {
    label: 'Disabled',
    variant: 'primary',
    size: 'md',
    disabled: true
  }
}`,...(ie=(re=v.parameters)==null?void 0:re.docs)==null?void 0:ie.source}}};var le,ne,te;x.parameters={...x.parameters,docs:{...(le=x.parameters)==null?void 0:le.docs,source:{originalSource:`{
  args: {
    label: 'With Icon',
    variant: 'primary',
    size: 'md',
    icon: <Icon />
  }
}`,...(te=(ne=x.parameters)==null?void 0:ne.docs)==null?void 0:te.source}}};var de,ce,oe;b.parameters={...b.parameters,docs:{...(de=b.parameters)==null?void 0:de.docs,source:{originalSource:`{
  args: {
    label: 'Badge',
    variant: 'primary'
  },
  render: () => <div className="u-d-flex u-flex-wrap u-gap-2">
      {THEME_COLORS.map(color => <Badge key={color} label={color} variant={color} />)}
    </div>
}`,...(oe=(ce=b.parameters)==null?void 0:ce.docs)==null?void 0:oe.source}}};var me,ue,pe;h.parameters={...h.parameters,docs:{...(me=h.parameters)==null?void 0:me.docs,source:{originalSource:`{
  args: {
    label: 'Badge',
    variant: 'primary'
  },
  render: () => <div className="u-d-flex u-align-items-center u-gap-2">
      <Badge label="Small" variant="primary" size="sm" />
      <Badge label="Medium" variant="primary" size="md" />
      <Badge label="Large" variant="primary" size="lg" />
    </div>
}`,...(pe=(ue=h.parameters)==null?void 0:ue.docs)==null?void 0:pe.source}}};var ge,ve,xe;j.parameters={...j.parameters,docs:{...(ge=j.parameters)==null?void 0:ge.docs,source:{originalSource:`{
  args: {
    label: 'Badge with different content'
  },
  render: () => <div className="u-d-flex u-flex-column u-gap-4">
      <div>
        <h3 className="u-mt-0 u-mb-2">Numeric Badges</h3>
        <div className="u-d-flex u-gap-2">
          <Badge label="1" variant="primary" />
          <Badge label="2" variant="secondary" />
          <Badge label="3" variant="success" />
          <Badge label="4" variant="error" />
          <Badge label="5" variant="warning" />
          <Badge label="6" variant="info" />
        </div>
      </div>
      <div>
        <h3 className="u-mt-0 u-mb-2">Status Badges</h3>
        <div className="u-d-flex u-gap-2">
          <Badge label="New" variant="primary" />
          <Badge label="Active" variant="success" />
          <Badge label="Pending" variant="warning" />
          <Badge label="Failed" variant="error" />
          <Badge label="Blocked" variant="secondary" />
        </div>
      </div>
      <div>
        <h3 className="u-mt-0 u-mb-2">Badges with Icons</h3>
        <div className="u-d-flex u-gap-2">
          <Badge label="Info" variant="info" icon={<Icon />} />
          <Badge label="Warning" variant="warning" icon={<Icon />} />
          <Badge label="Success" variant="success" icon={<Icon />} />
          <Badge label="Error" variant="error" icon={<Icon />} />
        </div>
      </div>
    </div>
}`,...(xe=(ve=j.parameters)==null?void 0:ve.docs)==null?void 0:xe.source}}};var be,he,je;f.parameters={...f.parameters,docs:{...(be=f.parameters)==null?void 0:be.docs,source:{originalSource:`{
  args: {
    label: 'Usage examples'
  },
  render: () => <div className="u-d-flex u-flex-column u-gap-6 u-max-width-80">
      <div>
        <h3 className="u-mt-0 u-mb-2">In navigation</h3>
        <div className="u-d-flex u-gap-4">
          <div className="u-d-flex u-align-items-center u-gap-2">
            <span>Inbox</span>
            <Badge label="24" variant="error" size="sm" />
          </div>
          <div className="u-d-flex u-align-items-center u-gap-2">
            <span>Notifications</span>
            <Badge label="3" variant="primary" size="sm" />
          </div>
          <div className="u-d-flex u-align-items-center u-gap-2">
            <span>Messages</span>
            <Badge label="New" variant="success" size="sm" />
          </div>
        </div>
      </div>

      <div>
        <h3 className="u-mt-0 u-mb-2">In cards</h3>
        <div className="u-p-4 u-shadow u-d-flex u-flex-column u-gap-2">
          <div className="u-d-flex u-justify-content-between">
            <h4 className="u-m-0">Product Title</h4>
            <Badge label="Sale" variant="error" />
          </div>
          <p className="u-my-2">This is a sample product description.</p>
          <div className="u-d-flex u-gap-2">
            <Badge label="In Stock" variant="success" size="sm" />
            <Badge label="Free Shipping" variant="info" size="sm" />
          </div>
        </div>
      </div>

      <div>
        <h3 className="u-mt-0 u-mb-2">In lists</h3>
        <ul className="u-p-0 u-m-0" style={{
        listStyle: 'none'
      }}>
          <li className="u-py-2 u-d-flex u-justify-content-between" style={{
          borderBottom: '1px solid #e0e0e0'
        }}>
            <span>Task 1</span>
            <Badge label="Completed" variant="success" size="sm" />
          </li>
          <li className="u-py-2 u-d-flex u-justify-content-between" style={{
          borderBottom: '1px solid #e0e0e0'
        }}>
            <span>Task 2</span>
            <Badge label="In Progress" variant="warning" size="sm" />
          </li>
          <li className="u-py-2 u-d-flex u-justify-content-between">
            <span>Task 3</span>
            <Badge label="Not Started" variant="secondary" size="sm" />
          </li>
        </ul>
      </div>
    </div>
}`,...(je=(he=f.parameters)==null?void 0:he.docs)==null?void 0:je.source}}};var fe,Ne,ye;N.parameters={...N.parameters,docs:{...(fe=N.parameters)==null?void 0:fe.docs,source:{originalSource:`{
  args: {
    label: 'Badge',
    variant: 'primary'
  },
  render: () => <div className="u-d-flex u-flex-column u-gap-6">
      <div>
        <h3 className="u-mt-0 u-mb-2">Theme Aware Badges</h3>
        <p className="u-mb-4">
          The badges below demonstrate how they adapt to different theme modes.
        </p>
        <div className="u-d-flex u-gap-5 u-mt-4">
          <div className="u-p-5 u-shadow u-flex-1">
            <h4 className="u-mt-0">Current Theme</h4>
            <div className="u-d-flex u-flex-wrap u-gap-2">
              {THEME_COLORS.map(color => <Badge key={color} label={color} variant={color} />)}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="u-mt-2 u-mb-2">Accessibility Considerations</h3>
        <p className="u-mb-2">
          Our badges are designed to maintain proper contrast in both light and dark modes.
        </p>
        <div className="u-d-flex u-flex-column u-gap-2 u-mt-2">
          <div className="u-d-flex u-align-items-center u-gap-2">
            <span className="u-d-inline-block" style={{
            width: '120px'
          }}>
              Primary:
            </span>
            <Badge label="New Feature" variant="primary" />
          </div>
          <div className="u-d-flex u-align-items-center u-gap-2">
            <span className="u-d-inline-block" style={{
            width: '120px'
          }}>
              Success:
            </span>
            <Badge label="Completed" variant="success" />
          </div>
          <div className="u-d-flex u-align-items-center u-gap-2">
            <span className="u-d-inline-block" style={{
            width: '120px'
          }}>
              Warning:
            </span>
            <Badge label="In Progress" variant="warning" />
          </div>
          <div className="u-d-flex u-align-items-center u-gap-2">
            <span className="u-d-inline-block" style={{
            width: '120px'
          }}>
              error:
            </span>
            <Badge label="Failed" variant="error" />
          </div>
        </div>
      </div>

      <div className="u-mt-4">
        <p>
          Use the Color Mode toggle in the Storybook toolbar to switch between light and dark mode!
        </p>
      </div>
    </div>
}`,...(ye=(Ne=N.parameters)==null?void 0:Ne.docs)==null?void 0:ye.source}}};const Ie=["Primary","Secondary","Success","Info","Warning","error","Light","Dark","Small","Medium","Large","Disabled","WithIcon","AllVariants","AllSizes","WithDifferentContent","UsageExamples","ThemeAwareBadges"];export{h as AllSizes,b as AllVariants,m as Dark,v as Disabled,t as Info,g as Large,o as Light,p as Medium,i as Primary,l as Secondary,u as Small,n as Success,N as ThemeAwareBadges,f as UsageExamples,d as Warning,j as WithDifferentContent,x as WithIcon,Ie as __namedExportsOrder,ke as default,c as error};
