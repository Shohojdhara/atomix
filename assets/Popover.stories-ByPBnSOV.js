import{j as l}from"./jsx-runtime-BjG_zV1W.js";import{r as c,e as M}from"./index-BVDOR7y2.js";import{r as Oe}from"./index-CItE_xiA.js";import{r as ye}from"./components-BrxBU25R.js";import{B as be}from"./Button-_O9VEUtI.js";const we=({position:o="top",trigger:y="click",offset:a=12,delay:u=0,defaultOpen:v=!1,isOpen:b,onOpenChange:w,closeOnClickOutside:S=!0,closeOnEscape:m=!0,id:p})=>{const[T,E]=c.useState(v),[k,d]=c.useState(o==="auto"?"top":o),i=c.useRef(null),r=c.useRef(null),W=c.useRef(null),s=c.useRef(null),B=p||`popover-${Math.random().toString(36).slice(2,11)}`,H=b!==void 0,C=H?b:T,P=n=>{H||E(n),w&&w(n)};c.useEffect(()=>{if(y!=="hover"||!i.current||!r.current)return;const n=()=>{s.current!==null&&(clearTimeout(s.current),s.current=null),u>0?s.current=setTimeout(()=>{P(!0)},u):P(!0)},e=()=>{s.current!==null&&(clearTimeout(s.current),s.current=null),s.current=setTimeout(()=>{var x;(x=r.current)!=null&&x.matches(":hover")||P(!1)},100)},t=()=>{s.current!==null&&(clearTimeout(s.current),s.current=null)},h=()=>{P(!1)};return i.current.addEventListener("mouseenter",n),i.current.addEventListener("mouseleave",e),r.current.addEventListener("mouseenter",t),r.current.addEventListener("mouseleave",h),()=>{i.current&&(i.current.removeEventListener("mouseenter",n),i.current.removeEventListener("mouseleave",e)),r.current&&(r.current.removeEventListener("mouseenter",t),r.current.removeEventListener("mouseleave",h)),s.current!==null&&window.clearTimeout(s.current)}},[y,u,C]);const _=n=>{var Y;if(!i.current||!r.current)return;const e=i.current.getBoundingClientRect(),t=r.current.getBoundingClientRect(),h=window.innerWidth,x=window.innerHeight,ve=e.top<50||e.bottom>x-50||e.left<50||e.right>h-50;if((n==null?void 0:n.type)==="scroll"&&!ve)return;const A=e.top,F=x-e.bottom,z=e.left,K=h-e.right;let $=o==="auto"?"top":o;if(o==="auto"){const X=[{position:"top",space:A},{position:"right",space:K},{position:"bottom",space:F},{position:"left",space:z}];X.sort((G,fe)=>fe.space-G.space),$=(Y=X[0])==null?void 0:Y.position}else(o==="top"&&A<t.height+a&&F>=t.height+a||o==="bottom"&&F<t.height+a&&A>=t.height+a||o==="left"&&z<t.width+a&&K>=t.width+a||o==="right"&&K<t.width+a&&z>=t.width+a)&&($={top:"bottom",bottom:"top",left:"right",right:"left",auto:"bottom"}[o]);d($);let f=0,O=0;switch($){case"top":f=e.top-t.height-a,O=e.left+e.width/2-t.width/2;break;case"bottom":f=e.bottom+a,O=e.left+e.width/2-t.width/2;break;case"left":f=e.top+e.height/2-t.height/2,O=e.left-t.width-a;break;case"right":f=e.top+e.height/2-t.height/2,O=e.right+a;break}O<0?O=5:O+t.width>h&&(O=h-t.width-5),f<0?f=5:f+t.height>x&&(f=x-t.height-5);const me=f+window.scrollY,he=O+window.scrollX;r.current.style.position="absolute",r.current.style.top=`${me}px`,r.current.style.left=`${he}px`};return c.useEffect(()=>{if(!C||!i.current||!r.current)return;_(),window.addEventListener("resize",_);let n=null;const e=h=>{n||(n=setTimeout(()=>{_(h),n=null},100))};window.addEventListener("scroll",e,{passive:!0});const t=setInterval(()=>{_()},500);return()=>{window.removeEventListener("resize",_),window.removeEventListener("scroll",e),n&&clearTimeout(n),clearInterval(t)}},[C,o,a]),c.useEffect(()=>{if(!C||!S)return;const n=e=>{r.current&&!r.current.contains(e.target)&&i.current&&!i.current.contains(e.target)&&P(!1)};return document.addEventListener("mousedown",n),()=>{document.removeEventListener("mousedown",n)}},[C,S]),c.useEffect(()=>{if(!C||!m)return;const n=e=>{e.key==="Escape"&&P(!1)};return document.addEventListener("keydown",n),()=>{document.removeEventListener("keydown",n)}},[C,m]),c.useEffect(()=>()=>{s.current!==null&&window.clearTimeout(s.current)},[]),{isOpen:C,setIsOpen:P,triggerRef:i,popoverRef:r,arrowRef:W,popoverId:B,currentPosition:k,updatePosition:_}},D=c.createContext({isOpen:!1,setIsOpen:()=>{},triggerRef:{current:null},popoverId:"",triggerType:"click"}),q=({content:o,position:y="top",trigger:a="click",className:u="",delay:v=0,offset:b=12,defaultOpen:w=!1,isOpen:S,onOpenChange:m,closeOnClickOutside:p=!0,closeOnEscape:T=!0,id:E,children:k})=>{const{isOpen:d,setIsOpen:i,triggerRef:r,popoverRef:W,arrowRef:s,popoverId:B,currentPosition:H}=we({position:y,trigger:a,offset:b,delay:v,defaultOpen:w,isOpen:S,onOpenChange:m,closeOnClickOutside:p,closeOnEscape:T,id:E});return l.jsxs(D.Provider,{value:{isOpen:d,setIsOpen:i,triggerRef:r,popoverId:B,triggerType:a},children:[k,typeof document<"u"&&Oe.createPortal(l.jsxs("div",{ref:W,className:`c-popover c-popover--${H} ${d?ye.CLASSES.IS_OPEN:""} ${u}`,id:B,role:"tooltip","aria-hidden":!d,children:[l.jsx("div",{className:"c-popover__content",children:l.jsx("div",{className:"c-popover__content-inner",children:o})}),l.jsx("div",{ref:s,className:"c-popover__arrow"})]}),document.body)]})},Se=c.forwardRef(({children:o,trigger:y},a)=>{const{isOpen:u,setIsOpen:v,triggerRef:b,popoverId:w,triggerType:S}=M.useContext(D),m=y||S,p=()=>{v(!u)},T=()=>{v(!0)},E=()=>{v(!1)},k=M.Children.only(o),d={ref:a||b,"aria-describedby":w,"aria-expanded":u};return m==="click"?d.onClick=p:m==="hover"&&(d.onMouseEnter=T,d.onMouseLeave=E),M.cloneElement(k,d)});q.displayName="Popover";try{D.displayName="PopoverContext",D.__docgenInfo={description:"",displayName:"PopoverContext",props:{}}}catch{}try{q.displayName="Popover",q.__docgenInfo={description:"Popover component for displaying floating content",displayName:"Popover",props:{content:{defaultValue:null,description:"Content to be displayed in the popover",name:"content",required:!0,type:{name:"ReactNode"}},position:{defaultValue:{value:"top"},description:"The position of the popover relative to the trigger",name:"position",required:!1,type:{name:"enum",value:[{value:'"top"'},{value:'"bottom"'},{value:'"left"'},{value:'"right"'},{value:'"auto"'}]}},trigger:{defaultValue:{value:"click"},description:"How the popover is triggered",name:"trigger",required:!1,type:{name:"enum",value:[{value:'"click"'},{value:'"hover"'}]}},className:{defaultValue:{value:""},description:"Additional CSS class for the popover",name:"className",required:!1,type:{name:"string"}},delay:{defaultValue:{value:"0"},description:"Delay before showing the popover (in milliseconds)",name:"delay",required:!1,type:{name:"number"}},offset:{defaultValue:{value:"12"},description:"Offset from the trigger element (in pixels)",name:"offset",required:!1,type:{name:"number"}},defaultOpen:{defaultValue:{value:"false"},description:"Whether the popover should be open initially",name:"defaultOpen",required:!1,type:{name:"boolean"}},isOpen:{defaultValue:null,description:"Controlled state of the popover",name:"isOpen",required:!1,type:{name:"boolean"}},onOpenChange:{defaultValue:null,description:"Callback when the popover open state changes",name:"onOpenChange",required:!1,type:{name:"((isOpen: boolean) => void)"}},closeOnClickOutside:{defaultValue:{value:"true"},description:"Whether to close the popover when clicking outside",name:"closeOnClickOutside",required:!1,type:{name:"boolean"}},closeOnEscape:{defaultValue:{value:"true"},description:"Whether to close the popover when pressing escape key",name:"closeOnEscape",required:!1,type:{name:"boolean"}},id:{defaultValue:null,description:"Optional ID for the popover",name:"id",required:!1,type:{name:"string"}},children:{defaultValue:null,description:"Children content (removed in favor of using PopoverTrigger)",name:"children",required:!1,type:{name:"ReactNode"}}}}}catch{}try{PopoverTriggerProps.displayName="PopoverTriggerProps",PopoverTriggerProps.__docgenInfo={description:"Popover component properties",displayName:"PopoverTriggerProps",props:{}}}catch{}const Te={title:"Components/Popover",component:q,argTypes:{position:{control:{type:"select"},options:["top","bottom","left","right","auto"],defaultValue:"top"},trigger:{control:{type:"select"},options:["click","hover"],defaultValue:"click"},delay:{control:{type:"number"},defaultValue:0},offset:{control:{type:"number"},defaultValue:12},defaultOpen:{control:{type:"boolean"},defaultValue:!1},closeOnClickOutside:{control:{type:"boolean"},defaultValue:!0},closeOnEscape:{control:{type:"boolean"},defaultValue:!0},className:{control:{type:"text"}}}},N=o=>{const y=[{value:"1",label:"Option 1"},{value:"2",label:"Option 2"},{value:"3",label:"Option 3"},{value:"4",label:"Option 4"}],[a,u]=M.useState("1"),[v,b]=M.useState(!1),w=p=>{u(p.target.value)},S=()=>{b(!v)},m=l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"u-d-flex u-align-items-center u-gap-7",children:[l.jsx("span",{className:"u-text-nowrap",children:"Sort by"}),l.jsx("div",{className:"c-select",children:l.jsx("select",{value:a,onChange:w,children:y.map(p=>l.jsx("option",{value:p.value,children:p.label},p.value))})})]}),l.jsxs("div",{className:"c-toggle",onClick:S,children:[l.jsx("div",{className:"c-toggle__label",children:"Show internal comments only"}),l.jsx("div",{className:"c-toggle__switch"})]})]});return l.jsx("div",{style:{padding:"80px",display:"flex",justifyContent:"center",background:"#f5f5f5"},children:l.jsx(q,{...o,content:m,children:l.jsx(Se,{trigger:o.trigger,children:l.jsx(be,{variant:"primary",label:"Open Popover"})})})})},g=N.bind({});g.args={position:"top",trigger:"click",offset:12,delay:0,defaultOpen:!1,closeOnClickOutside:!0,closeOnEscape:!0};const R=N.bind({});R.args={...g.args,trigger:"hover",delay:200};const I=N.bind({});I.args={...g.args,position:"bottom"};const L=N.bind({});L.args={...g.args,position:"left"};const j=N.bind({});j.args={...g.args,position:"right"};const V=N.bind({});V.args={...g.args,position:"auto",defaultOpen:!0};var J,Q,U;g.parameters={...g.parameters,docs:{...(J=g.parameters)==null?void 0:J.docs,source:{originalSource:`args => {
  const selectOptions = [{
    value: '1',
    label: 'Option 1'
  }, {
    value: '2',
    label: 'Option 2'
  }, {
    value: '3',
    label: 'Option 3'
  }, {
    value: '4',
    label: 'Option 4'
  }];
  const [selectedOption, setSelectedOption] = React.useState('1');
  const [showInternalOnly, setShowInternalOnly] = React.useState(false);
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };
  const handleToggleChange = () => {
    setShowInternalOnly(!showInternalOnly);
  };
  const content = <>
      <div className="u-d-flex u-align-items-center u-gap-7">
        <span className="u-text-nowrap">Sort by</span>
        <div className="c-select">
          <select value={selectedOption} onChange={handleSelectChange}>
            {selectOptions.map(option => <option key={option.value} value={option.value}>
                {option.label}
              </option>)}
          </select>
        </div>
      </div>
      <div className="c-toggle" onClick={handleToggleChange}>
        <div className="c-toggle__label">Show internal comments only</div>
        <div className="c-toggle__switch"></div>
      </div>
    </>;
  return <div style={{
    padding: '80px',
    display: 'flex',
    justifyContent: 'center',
    background: '#f5f5f5'
  }}>
      <Popover {...args} content={content}>
        <PopoverTrigger trigger={args.trigger}>
          <Button variant="primary" label="Open Popover" />
        </PopoverTrigger>
      </Popover>
    </div>;
}`,...(U=(Q=g.parameters)==null?void 0:Q.docs)==null?void 0:U.source}}};var Z,ee,te;R.parameters={...R.parameters,docs:{...(Z=R.parameters)==null?void 0:Z.docs,source:{originalSource:`args => {
  const selectOptions = [{
    value: '1',
    label: 'Option 1'
  }, {
    value: '2',
    label: 'Option 2'
  }, {
    value: '3',
    label: 'Option 3'
  }, {
    value: '4',
    label: 'Option 4'
  }];
  const [selectedOption, setSelectedOption] = React.useState('1');
  const [showInternalOnly, setShowInternalOnly] = React.useState(false);
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };
  const handleToggleChange = () => {
    setShowInternalOnly(!showInternalOnly);
  };
  const content = <>
      <div className="u-d-flex u-align-items-center u-gap-7">
        <span className="u-text-nowrap">Sort by</span>
        <div className="c-select">
          <select value={selectedOption} onChange={handleSelectChange}>
            {selectOptions.map(option => <option key={option.value} value={option.value}>
                {option.label}
              </option>)}
          </select>
        </div>
      </div>
      <div className="c-toggle" onClick={handleToggleChange}>
        <div className="c-toggle__label">Show internal comments only</div>
        <div className="c-toggle__switch"></div>
      </div>
    </>;
  return <div style={{
    padding: '80px',
    display: 'flex',
    justifyContent: 'center',
    background: '#f5f5f5'
  }}>
      <Popover {...args} content={content}>
        <PopoverTrigger trigger={args.trigger}>
          <Button variant="primary" label="Open Popover" />
        </PopoverTrigger>
      </Popover>
    </div>;
}`,...(te=(ee=R.parameters)==null?void 0:ee.docs)==null?void 0:te.source}}};var oe,ne,ae;I.parameters={...I.parameters,docs:{...(oe=I.parameters)==null?void 0:oe.docs,source:{originalSource:`args => {
  const selectOptions = [{
    value: '1',
    label: 'Option 1'
  }, {
    value: '2',
    label: 'Option 2'
  }, {
    value: '3',
    label: 'Option 3'
  }, {
    value: '4',
    label: 'Option 4'
  }];
  const [selectedOption, setSelectedOption] = React.useState('1');
  const [showInternalOnly, setShowInternalOnly] = React.useState(false);
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };
  const handleToggleChange = () => {
    setShowInternalOnly(!showInternalOnly);
  };
  const content = <>
      <div className="u-d-flex u-align-items-center u-gap-7">
        <span className="u-text-nowrap">Sort by</span>
        <div className="c-select">
          <select value={selectedOption} onChange={handleSelectChange}>
            {selectOptions.map(option => <option key={option.value} value={option.value}>
                {option.label}
              </option>)}
          </select>
        </div>
      </div>
      <div className="c-toggle" onClick={handleToggleChange}>
        <div className="c-toggle__label">Show internal comments only</div>
        <div className="c-toggle__switch"></div>
      </div>
    </>;
  return <div style={{
    padding: '80px',
    display: 'flex',
    justifyContent: 'center',
    background: '#f5f5f5'
  }}>
      <Popover {...args} content={content}>
        <PopoverTrigger trigger={args.trigger}>
          <Button variant="primary" label="Open Popover" />
        </PopoverTrigger>
      </Popover>
    </div>;
}`,...(ae=(ne=I.parameters)==null?void 0:ne.docs)==null?void 0:ae.source}}};var le,re,se;L.parameters={...L.parameters,docs:{...(le=L.parameters)==null?void 0:le.docs,source:{originalSource:`args => {
  const selectOptions = [{
    value: '1',
    label: 'Option 1'
  }, {
    value: '2',
    label: 'Option 2'
  }, {
    value: '3',
    label: 'Option 3'
  }, {
    value: '4',
    label: 'Option 4'
  }];
  const [selectedOption, setSelectedOption] = React.useState('1');
  const [showInternalOnly, setShowInternalOnly] = React.useState(false);
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };
  const handleToggleChange = () => {
    setShowInternalOnly(!showInternalOnly);
  };
  const content = <>
      <div className="u-d-flex u-align-items-center u-gap-7">
        <span className="u-text-nowrap">Sort by</span>
        <div className="c-select">
          <select value={selectedOption} onChange={handleSelectChange}>
            {selectOptions.map(option => <option key={option.value} value={option.value}>
                {option.label}
              </option>)}
          </select>
        </div>
      </div>
      <div className="c-toggle" onClick={handleToggleChange}>
        <div className="c-toggle__label">Show internal comments only</div>
        <div className="c-toggle__switch"></div>
      </div>
    </>;
  return <div style={{
    padding: '80px',
    display: 'flex',
    justifyContent: 'center',
    background: '#f5f5f5'
  }}>
      <Popover {...args} content={content}>
        <PopoverTrigger trigger={args.trigger}>
          <Button variant="primary" label="Open Popover" />
        </PopoverTrigger>
      </Popover>
    </div>;
}`,...(se=(re=L.parameters)==null?void 0:re.docs)==null?void 0:se.source}}};var ie,ce,pe;j.parameters={...j.parameters,docs:{...(ie=j.parameters)==null?void 0:ie.docs,source:{originalSource:`args => {
  const selectOptions = [{
    value: '1',
    label: 'Option 1'
  }, {
    value: '2',
    label: 'Option 2'
  }, {
    value: '3',
    label: 'Option 3'
  }, {
    value: '4',
    label: 'Option 4'
  }];
  const [selectedOption, setSelectedOption] = React.useState('1');
  const [showInternalOnly, setShowInternalOnly] = React.useState(false);
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };
  const handleToggleChange = () => {
    setShowInternalOnly(!showInternalOnly);
  };
  const content = <>
      <div className="u-d-flex u-align-items-center u-gap-7">
        <span className="u-text-nowrap">Sort by</span>
        <div className="c-select">
          <select value={selectedOption} onChange={handleSelectChange}>
            {selectOptions.map(option => <option key={option.value} value={option.value}>
                {option.label}
              </option>)}
          </select>
        </div>
      </div>
      <div className="c-toggle" onClick={handleToggleChange}>
        <div className="c-toggle__label">Show internal comments only</div>
        <div className="c-toggle__switch"></div>
      </div>
    </>;
  return <div style={{
    padding: '80px',
    display: 'flex',
    justifyContent: 'center',
    background: '#f5f5f5'
  }}>
      <Popover {...args} content={content}>
        <PopoverTrigger trigger={args.trigger}>
          <Button variant="primary" label="Open Popover" />
        </PopoverTrigger>
      </Popover>
    </div>;
}`,...(pe=(ce=j.parameters)==null?void 0:ce.docs)==null?void 0:pe.source}}};var ue,de,ge;V.parameters={...V.parameters,docs:{...(ue=V.parameters)==null?void 0:ue.docs,source:{originalSource:`args => {
  const selectOptions = [{
    value: '1',
    label: 'Option 1'
  }, {
    value: '2',
    label: 'Option 2'
  }, {
    value: '3',
    label: 'Option 3'
  }, {
    value: '4',
    label: 'Option 4'
  }];
  const [selectedOption, setSelectedOption] = React.useState('1');
  const [showInternalOnly, setShowInternalOnly] = React.useState(false);
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };
  const handleToggleChange = () => {
    setShowInternalOnly(!showInternalOnly);
  };
  const content = <>
      <div className="u-d-flex u-align-items-center u-gap-7">
        <span className="u-text-nowrap">Sort by</span>
        <div className="c-select">
          <select value={selectedOption} onChange={handleSelectChange}>
            {selectOptions.map(option => <option key={option.value} value={option.value}>
                {option.label}
              </option>)}
          </select>
        </div>
      </div>
      <div className="c-toggle" onClick={handleToggleChange}>
        <div className="c-toggle__label">Show internal comments only</div>
        <div className="c-toggle__switch"></div>
      </div>
    </>;
  return <div style={{
    padding: '80px',
    display: 'flex',
    justifyContent: 'center',
    background: '#f5f5f5'
  }}>
      <Popover {...args} content={content}>
        <PopoverTrigger trigger={args.trigger}>
          <Button variant="primary" label="Open Popover" />
        </PopoverTrigger>
      </Popover>
    </div>;
}`,...(ge=(de=V.parameters)==null?void 0:de.docs)==null?void 0:ge.source}}};const Ee=["Default","Hover","BottomPosition","LeftPosition","RightPosition","AutoPosition"];export{V as AutoPosition,I as BottomPosition,g as Default,R as Hover,L as LeftPosition,j as RightPosition,Ee as __namedExportsOrder,Te as default};
