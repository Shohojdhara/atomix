import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{r as a}from"./index-BVDOR7y2.js";import{D as J}from"./components-BrxBU25R.js";import{I as f}from"./Icon-k4CeN--q.js";import"./SpeakerX.es-Cg-mjUf1.js";const Ke=a.createContext({isOpen:!1,close:()=>{},id:"",trigger:"click"}),t=({children:n,href:i,active:u=!1,disabled:o=!1,icon:l,onClick:v,className:x="",LinkComponent:I,...y})=>{const{close:H}=a.useContext(Ke),g=A=>{if(o){A.preventDefault();return}v&&v(A),H()},b=["c-dropdown__menu-item",u?"is-active":"",o?"is-disabled":"",x].filter(Boolean).join(" "),M={href:i,className:b,onClick:g,role:"menuitem",tabIndex:0,...y};return i&&!o?e.jsx("li",{children:I?e.jsxs(I,{...M,children:[l&&e.jsx("span",{className:"c-dropdown__menu-item-icon",children:l}),n]}):e.jsxs("a",{...M,children:[l&&e.jsx("span",{className:"c-dropdown__menu-item-icon",children:l}),n]})}):e.jsx("li",{children:e.jsxs("button",{type:"button",className:b,onClick:g,disabled:o,role:"menuitem",tabIndex:0,...y,children:[l&&e.jsx("span",{className:"c-dropdown__menu-item-icon",children:l}),n]})})},rn=({className:n=""})=>e.jsx("li",{className:`c-dropdown__divider ${n}`,role:"separator"}),Q=({children:n,className:i=""})=>e.jsx("li",{className:`c-dropdown__header ${i}`,children:n}),D=({children:n,menu:i,placement:u="bottom-start",trigger:o="click",offset:l=J.DEFAULTS.OFFSET,isOpen:v,onOpenChange:x,closeOnClickOutside:I=!0,closeOnEscape:y=!0,maxHeight:H,minWidth:g=J.DEFAULTS.MIN_WIDTH,variant:b,className:M="",...A})=>{const[Ge,Je]=a.useState(!1),L=v!==void 0,c=L?v:Ge,z=a.useRef(null),W=a.useRef(null),j=a.useRef(null),F=a.useRef(`dropdown-${Math.random().toString(36).substring(2,9)}`).current,p=a.useCallback(r=>{L||Je(r),x&&x(r)},[L,x]),q=a.useCallback(()=>p(!c),[c,p]),h=a.useCallback(()=>{p(!1),setTimeout(()=>{var r;(r=W.current)==null||r.focus()},0)},[p]);a.useEffect(()=>{if(!c||!I)return;const r=s=>{z.current&&!z.current.contains(s.target)&&h()};return document.addEventListener("mousedown",r),()=>document.removeEventListener("mousedown",r)},[c,I,h]),a.useEffect(()=>{if(!c||!y)return;const r=s=>{s.key==="Escape"&&h()};return document.addEventListener("keydown",r),()=>document.removeEventListener("keydown",r)},[c,y,h]);const Qe=a.useCallback(r=>{var U,V,$,B,K,G;if(!j.current)return;const s=j.current.querySelectorAll('[role="menuitem"]:not([disabled])');if(!s.length)return;const w=Array.from(s).findIndex(nn=>nn===document.activeElement);switch(r.key){case"ArrowDown":r.preventDefault(),w<s.length-1?(U=s[w+1])==null||U.focus():(V=s[0])==null||V.focus();break;case"ArrowUp":r.preventDefault(),w>0?($=s[w-1])==null||$.focus():(B=s[s.length-1])==null||B.focus();break;case"Home":r.preventDefault(),(K=s[0])==null||K.focus();break;case"End":r.preventDefault(),(G=s[s.length-1])==null||G.focus();break}},[]),Xe=a.useCallback(r=>{o==="click"&&(r.preventDefault(),r.stopPropagation(),q())},[o,q]),Ye=a.useCallback(r=>{(r.key==="Enter"||r.key===" "||r.key==="ArrowDown")&&!c?(r.preventDefault(),p(!0),r.key==="ArrowDown"&&j.current&&setTimeout(()=>{var w;const s=(w=j.current)==null?void 0:w.querySelector('[role="menuitem"]');s==null||s.focus()},100)):r.key==="Escape"&&c&&(r.preventDefault(),h())},[c,p,h]),Ze=a.useCallback(()=>{o==="hover"&&p(!0)},[o,p]),en=["c-dropdown",o==="click"?"c-dropdown--onclick":"",b?`c-dropdown--${b}`:"",c?"is-open":"",M].filter(Boolean).join(" "),P={};return H&&(P.maxHeight=H),g!==void 0&&(P.minWidth=typeof g=="number"?`${g}px`:g),e.jsxs("div",{ref:z,className:en,onMouseEnter:o==="hover"?Ze:void 0,...A,children:[e.jsx("div",{ref:W,className:"c-dropdown__toggle",onClick:Xe,onKeyDown:Ye,"aria-haspopup":"menu","aria-expanded":c,"aria-controls":F,tabIndex:0,children:n}),e.jsx("div",{ref:j,id:F,className:`c-dropdown__menu-wrapper c-dropdown__menu-wrapper--${u} ${c?"is-open":""}`,role:"menu","aria-orientation":"vertical","aria-hidden":!c,onKeyDown:Qe,children:e.jsx("div",{className:"c-dropdown__menu-inner",style:P,children:e.jsx(Ke.Provider,{value:{isOpen:c,close:h,id:F,trigger:o},children:e.jsx("ul",{className:"c-dropdown__menu",children:i})})})})]})};D.displayName="Dropdown";try{D.displayName="Dropdown",D.__docgenInfo={description:"DropdownItem component for menu items",displayName:"Dropdown",props:{children:{defaultValue:null,description:"Item content",name:"children",required:!0,type:{name:"ReactNode"}},href:{defaultValue:null,description:"Item href",name:"href",required:!1,type:{name:"string"}},active:{defaultValue:{value:"false"},description:"Whether item is active",name:"active",required:!1,type:{name:"boolean"}},disabled:{defaultValue:{value:"false"},description:"Whether item is disabled",name:"disabled",required:!1,type:{name:"boolean"}},icon:{defaultValue:null,description:"Item icon",name:"icon",required:!1,type:{name:"ReactNode"}},onClick:{defaultValue:null,description:"Item click handler",name:"onClick",required:!1,type:{name:"((event: MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => void)"}},LinkComponent:{defaultValue:null,description:"Optional custom link component",name:"LinkComponent",required:!1,type:{name:"ElementType<any, keyof IntrinsicElements>"}},className:{defaultValue:{value:""},description:"Additional CSS class names",name:"className",required:!1,type:{name:"string"}}}}}catch{}const dn={title:"Components/Dropdown",component:D,parameters:{layout:"centered",docs:{description:{component:"Dropdown component with a toggleable menu. The dropdown menu appears on click or hover, depending on the trigger prop."}}},argTypes:{placement:{control:"select",options:["bottom-start","bottom-end","top-start","top-end","left-start","left-end","right-start","right-end"],description:"The placement of the dropdown menu relative to the trigger element"},trigger:{control:"radio",options:["click","hover"],description:"How the dropdown is triggered - by click or hover"},variant:{control:"select",options:["primary","secondary","tertiary","success","info","warning","error","light","dark"],description:"The color variant of the dropdown"},minWidth:{control:"text",description:"Minimum width of the dropdown menu"},maxHeight:{control:"text",description:"Maximum height of the dropdown menu"},closeOnClickOutside:{control:"boolean",description:"Whether to close the dropdown when clicking outside"},closeOnEscape:{control:"boolean",description:"Whether to close the dropdown when pressing the Escape key"}}},m=n=>{const[i,u]=a.useState(!1);return e.jsx("div",{className:"u-p-4",style:{minHeight:"300px",display:"flex",alignItems:"flex-start"},children:e.jsx(D,{...n,isOpen:i,onOpenChange:u})})},d={args:{trigger:"click",placement:"bottom-start",children:e.jsxs("button",{className:"c-btn c-btn--primary",children:["Dropdown ",e.jsx(f,{name:"CaretDown",className:"c-dropdown__toggle-icon",size:"sm"})]}),menu:e.jsxs(e.Fragment,{children:[e.jsx(t,{children:"Menu item 1"}),e.jsx(t,{children:"Menu item 2"}),e.jsx(t,{children:"Menu item 3"})]})},render:n=>e.jsx(m,{...n})},k={args:{...d.args,trigger:"click"},render:n=>e.jsx(m,{...n})},C={args:{...d.args,trigger:"hover"},render:n=>e.jsx(m,{...n})},_={args:{...d.args,menu:e.jsxs(e.Fragment,{children:[e.jsx(t,{icon:e.jsx(f,{name:"House",size:"sm"}),children:"Home"}),e.jsx(t,{icon:e.jsx(f,{name:"User",size:"sm"}),children:"Profile"}),e.jsx(t,{icon:e.jsx(f,{name:"Gear",size:"sm"}),children:"Settings"}),e.jsx(t,{icon:e.jsx(f,{name:"SignOut",size:"sm"}),children:"Logout"})]})},render:n=>e.jsx(m,{...n})},N={args:{...d.args,menu:e.jsxs(e.Fragment,{children:[e.jsx(t,{href:"#home",children:"Home"}),e.jsx(t,{href:"#about",children:"About"}),e.jsx(t,{href:"#services",children:"Services"}),e.jsx(t,{href:"#contact",children:"Contact"})]})},render:n=>e.jsx(m,{...n})},S={args:{...d.args,menu:e.jsxs(e.Fragment,{children:[e.jsx(Q,{children:"Account Options"}),e.jsx(t,{children:"Profile"}),e.jsx(t,{children:"Settings"}),e.jsx(rn,{}),e.jsx(Q,{children:"Help & Support"}),e.jsx(t,{children:"Documentation"}),e.jsx(t,{children:"Contact Support"})]})},render:n=>e.jsx(m,{...n})},O={args:{...d.args,menu:e.jsxs(e.Fragment,{children:[e.jsx(t,{active:!0,children:"Active Item"}),e.jsx(t,{children:"Regular Item"}),e.jsx(t,{children:"Regular Item"})]})},render:n=>e.jsx(m,{...n})},E={args:{...d.args,menu:e.jsxs(e.Fragment,{children:[e.jsx(t,{children:"Regular Item"}),e.jsx(t,{disabled:!0,children:"Disabled Item"}),e.jsx(t,{children:"Regular Item"})]})},render:n=>e.jsx(m,{...n})},T={parameters:{docs:{description:{story:"The Dropdown component supports various placement options to position the menu relative to the trigger element."}}},render:()=>{const n=[{value:"bottom-start",label:"Bottom Start",icon:"CaretDown"},{value:"bottom-end",label:"Bottom End",icon:"CaretDown"},{value:"top-start",label:"Top Start",icon:"CaretUp"},{value:"top-end",label:"Top End",icon:"CaretUp"},{value:"left-start",label:"Left Start",icon:"CaretLeft"},{value:"left-end",label:"Left End",icon:"CaretLeft"},{value:"right-start",label:"Right Start",icon:"CaretRight"},{value:"right-end",label:"Right End",icon:"CaretRight"}];return e.jsx("div",{className:"u-p-5",style:{height:"650px"},children:e.jsx("div",{className:"u-d-grid",style:{gridTemplateColumns:"repeat(4, 1fr)",gridTemplateRows:"repeat(2, 1fr)",gap:"1.5rem",height:"100%"},children:n.map(i=>e.jsx("div",{className:"u-d-flex u-align-items-center u-justify-content-center",children:e.jsx(D,{trigger:"click",placement:i.value,defaultOpen:!0,closeOnClickOutside:!1,closeOnEscape:!1,children:e.jsxs("button",{className:"c-btn c-btn--primary",children:[i.label," ",e.jsx(f,{name:i.icon,className:"c-dropdown__toggle-icon",size:"sm"})]}),menu:e.jsxs(e.Fragment,{children:[e.jsx(t,{children:"Menu item 1"}),e.jsx(t,{children:"Menu item 2"}),e.jsx(t,{children:"Menu item 3"})]})})},i.value))})})}},R={parameters:{docs:{description:{story:"The Dropdown component supports various color variants to match your design system."}}},render:()=>{const[n,i]=a.useState(null),u=(o,l)=>{l?i(o):n===o&&i(null)};return e.jsx("div",{className:"u-p-4",style:{minHeight:"300px"},children:e.jsx("div",{className:"u-d-flex u-flex-wrap u-gap-3",children:["primary","secondary","tertiary","success","info","warning","error","light","dark"].map(o=>e.jsx(D,{variant:o,trigger:"click",isOpen:n===o,onOpenChange:l=>u(o,l),children:e.jsxs("button",{className:`c-btn c-btn--${o}`,children:[o," ",e.jsx(f,{name:"CaretDown",className:"c-dropdown__toggle-icon",size:"sm"})]}),menu:e.jsxs(e.Fragment,{children:[e.jsx(t,{children:"Menu item 1"}),e.jsx(t,{children:"Menu item 2"})]})},o))})})}};var X,Y,Z,ee,ne;d.parameters={...d.parameters,docs:{...(X=d.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    trigger: 'click',
    placement: 'bottom-start',
    children: <button className="c-btn c-btn--primary">
        Dropdown <Icon name="CaretDown" className="c-dropdown__toggle-icon" size="sm" />
      </button>,
    menu: <>
        <DropdownItem>Menu item 1</DropdownItem>
        <DropdownItem>Menu item 2</DropdownItem>
        <DropdownItem>Menu item 3</DropdownItem>
      </>
  },
  render: args => <InteractiveDropdown {...args} />
}`,...(Z=(Y=d.parameters)==null?void 0:Y.docs)==null?void 0:Z.source},description:{story:"Basic dropdown example with default settings",...(ne=(ee=d.parameters)==null?void 0:ee.docs)==null?void 0:ne.description}}};var re,te,oe,se,ae;k.parameters={...k.parameters,docs:{...(re=k.parameters)==null?void 0:re.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    trigger: 'click'
  },
  render: args => <InteractiveDropdown {...args} />
}`,...(oe=(te=k.parameters)==null?void 0:te.docs)==null?void 0:oe.source},description:{story:"Dropdown that opens on click",...(ae=(se=k.parameters)==null?void 0:se.docs)==null?void 0:ae.description}}};var ie,ce,de,le,pe;C.parameters={...C.parameters,docs:{...(ie=C.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    trigger: 'hover'
  },
  render: args => <InteractiveDropdown {...args} />
}`,...(de=(ce=C.parameters)==null?void 0:ce.docs)==null?void 0:de.source},description:{story:"Dropdown that opens on hover",...(pe=(le=C.parameters)==null?void 0:le.docs)==null?void 0:pe.description}}};var me,ue,ge,he,we;_.parameters={..._.parameters,docs:{...(me=_.parameters)==null?void 0:me.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    menu: <>
        <DropdownItem icon={<Icon name="House" size="sm" />}>Home</DropdownItem>
        <DropdownItem icon={<Icon name="User" size="sm" />}>Profile</DropdownItem>
        <DropdownItem icon={<Icon name="Gear" size="sm" />}>Settings</DropdownItem>
        <DropdownItem icon={<Icon name="SignOut" size="sm" />}>Logout</DropdownItem>
      </>
  },
  render: args => <InteractiveDropdown {...args} />
}`,...(ge=(ue=_.parameters)==null?void 0:ue.docs)==null?void 0:ge.source},description:{story:"Dropdown menu items with icons",...(we=(he=_.parameters)==null?void 0:he.docs)==null?void 0:we.description}}};var fe,De,ve,xe,Ie;N.parameters={...N.parameters,docs:{...(fe=N.parameters)==null?void 0:fe.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    menu: <>
        <DropdownItem href="#home">Home</DropdownItem>
        <DropdownItem href="#about">About</DropdownItem>
        <DropdownItem href="#services">Services</DropdownItem>
        <DropdownItem href="#contact">Contact</DropdownItem>
      </>
  },
  render: args => <InteractiveDropdown {...args} />
}`,...(ve=(De=N.parameters)==null?void 0:De.docs)==null?void 0:ve.source},description:{story:"Dropdown menu items as links",...(Ie=(xe=N.parameters)==null?void 0:xe.docs)==null?void 0:Ie.description}}};var ye,be,je,ke,Ce;S.parameters={...S.parameters,docs:{...(ye=S.parameters)==null?void 0:ye.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    menu: <>
        <DropdownHeader>Account Options</DropdownHeader>
        <DropdownItem>Profile</DropdownItem>
        <DropdownItem>Settings</DropdownItem>
        <DropdownDivider />
        <DropdownHeader>Help & Support</DropdownHeader>
        <DropdownItem>Documentation</DropdownItem>
        <DropdownItem>Contact Support</DropdownItem>
      </>
  },
  render: args => <InteractiveDropdown {...args} />
}`,...(je=(be=S.parameters)==null?void 0:be.docs)==null?void 0:je.source},description:{story:"Dropdown with section headers and dividers",...(Ce=(ke=S.parameters)==null?void 0:ke.docs)==null?void 0:Ce.description}}};var _e,Ne,Se,Oe,Ee;O.parameters={...O.parameters,docs:{...(_e=O.parameters)==null?void 0:_e.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    menu: <>
        <DropdownItem active>Active Item</DropdownItem>
        <DropdownItem>Regular Item</DropdownItem>
        <DropdownItem>Regular Item</DropdownItem>
      </>
  },
  render: args => <InteractiveDropdown {...args} />
}`,...(Se=(Ne=O.parameters)==null?void 0:Ne.docs)==null?void 0:Se.source},description:{story:"Dropdown with an active menu item",...(Ee=(Oe=O.parameters)==null?void 0:Oe.docs)==null?void 0:Ee.description}}};var Te,Re,He,Me,Ae;E.parameters={...E.parameters,docs:{...(Te=E.parameters)==null?void 0:Te.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    menu: <>
        <DropdownItem>Regular Item</DropdownItem>
        <DropdownItem disabled>Disabled Item</DropdownItem>
        <DropdownItem>Regular Item</DropdownItem>
      </>
  },
  render: args => <InteractiveDropdown {...args} />
}`,...(He=(Re=E.parameters)==null?void 0:Re.docs)==null?void 0:He.source},description:{story:"Dropdown with a disabled menu item",...(Ae=(Me=E.parameters)==null?void 0:Me.docs)==null?void 0:Ae.description}}};var Le,ze,Fe,Pe,We;T.parameters={...T.parameters,docs:{...(Le=T.parameters)==null?void 0:Le.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'The Dropdown component supports various placement options to position the menu relative to the trigger element.'
      }
    }
  },
  render: () => {
    // All possible placement options with properly typed icon names
    const placements = [{
      value: 'bottom-start',
      label: 'Bottom Start',
      icon: 'CaretDown' as const
    }, {
      value: 'bottom-end',
      label: 'Bottom End',
      icon: 'CaretDown' as const
    }, {
      value: 'top-start',
      label: 'Top Start',
      icon: 'CaretUp' as const
    }, {
      value: 'top-end',
      label: 'Top End',
      icon: 'CaretUp' as const
    }, {
      value: 'left-start',
      label: 'Left Start',
      icon: 'CaretLeft' as const
    }, {
      value: 'left-end',
      label: 'Left End',
      icon: 'CaretLeft' as const
    }, {
      value: 'right-start',
      label: 'Right Start',
      icon: 'CaretRight' as const
    }, {
      value: 'right-end',
      label: 'Right End',
      icon: 'CaretRight' as const
    }];

    // Create a grid layout with plenty of space for dropdowns to display correctly
    return <div className="u-p-5" style={{
      height: '650px'
    }}>
        <div className="u-d-grid" style={{
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)',
        gap: '1.5rem',
        height: '100%'
      }}>
          {placements.map(placement => <div key={placement.value} className="u-d-flex u-align-items-center u-justify-content-center">
              <Dropdown trigger="click" placement={placement.value as any} defaultOpen={true} closeOnClickOutside={false} closeOnEscape={false} children={<button className="c-btn c-btn--primary">
                    {placement.label}{' '}
                    <Icon name={placement.icon} className="c-dropdown__toggle-icon" size="sm" />
                  </button>} menu={<>
                    <DropdownItem>Menu item 1</DropdownItem>
                    <DropdownItem>Menu item 2</DropdownItem>
                    <DropdownItem>Menu item 3</DropdownItem>
                  </>} />
            </div>)}
        </div>
      </div>;
  }
}`,...(Fe=(ze=T.parameters)==null?void 0:ze.docs)==null?void 0:Fe.source},description:{story:"Shows all possible dropdown placement options",...(We=(Pe=T.parameters)==null?void 0:Pe.docs)==null?void 0:We.description}}};var qe,Ue,Ve,$e,Be;R.parameters={...R.parameters,docs:{...(qe=R.parameters)==null?void 0:qe.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'The Dropdown component supports various color variants to match your design system.'
      }
    }
  },
  render: () => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const handleOpenChange = (variant: string, isOpen: boolean) => {
      if (isOpen) {
        setOpenDropdown(variant);
      } else if (openDropdown === variant) {
        setOpenDropdown(null);
      }
    };
    return <div className="u-p-4" style={{
      minHeight: '300px'
    }}>
        <div className="u-d-flex u-flex-wrap u-gap-3">
          {['primary', 'secondary', 'tertiary', 'success', 'info', 'warning', 'error', 'light', 'dark'].map(color => <Dropdown key={color} variant={color as ThemeColor} trigger="click" isOpen={openDropdown === color} onOpenChange={isOpen => handleOpenChange(color, isOpen)} children={<button className={\`c-btn c-btn--\${color}\`}>
                  {color} <Icon name="CaretDown" className="c-dropdown__toggle-icon" size="sm" />
                </button>} menu={<>
                  <DropdownItem>Menu item 1</DropdownItem>
                  <DropdownItem>Menu item 2</DropdownItem>
                </>} />)}
        </div>
      </div>;
  }
}`,...(Ve=(Ue=R.parameters)==null?void 0:Ue.docs)==null?void 0:Ve.source},description:{story:"Dropdown with all color variants",...(Be=($e=R.parameters)==null?void 0:$e.docs)==null?void 0:Be.description}}};const ln=["Default","ClickTrigger","HoverTrigger","WithIcons","WithLinks","WithHeader","ActiveItem","DisabledItem","AllPlacements","AllVariants"];export{O as ActiveItem,T as AllPlacements,R as AllVariants,k as ClickTrigger,d as Default,E as DisabledItem,C as HoverTrigger,S as WithHeader,_ as WithIcons,N as WithLinks,ln as __namedExportsOrder,dn as default};
