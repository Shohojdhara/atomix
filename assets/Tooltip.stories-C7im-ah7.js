import{j as t}from"./jsx-runtime-BjG_zV1W.js";import{r as C}from"./index-BVDOR7y2.js";import{q as o}from"./components-BrxBU25R.js";const f=({content:m,children:X,position:y=o.DEFAULTS.POSITION,trigger:b=o.DEFAULTS.TRIGGER,className:T="",delay:v=o.DEFAULTS.DELAY,offset:et=o.DEFAULTS.OFFSET})=>{const[x,h]=C.useState(!1),s=C.useRef(null),j=()=>{s.current&&clearTimeout(s.current),v>0?s.current=setTimeout(()=>{h(!0)},v):h(!0)},N=()=>{s.current&&clearTimeout(s.current),h(!1)},Z=()=>{x?N():j()},tt=()=>{switch(y){case"top":return"c-tooltip--top";case"bottom":return"c-tooltip--bottom";case"left":return"c-tooltip--left";case"right":return"c-tooltip--right";case"top-left":return"c-tooltip--top-left";case"top-right":return"c-tooltip--top-right";case"bottom-left":return"c-tooltip--bottom-left";case"bottom-right":return"c-tooltip--bottom-right";default:return"c-tooltip--top"}},g={};return b==="hover"?(g.onMouseEnter=j,g.onMouseLeave=N):b==="click"&&(g.onClick=Z),t.jsxs("div",{className:"u-position-relative u-d-inline-block",children:[t.jsx("div",{className:`${o.SELECTORS.TRIGGER.substring(1)}${T?` ${T}`:""}`,...g,children:X}),x&&t.jsx("div",{className:`c-tooltip ${o.SELECTORS.TOOLTIP.substring(1)} ${tt()}`,"data-tooltip-position":y,"data-tooltip-trigger":b,children:t.jsxs("div",{className:`c-tooltip__content ${o.SELECTORS.CONTENT.substring(1)}`,children:[t.jsx("span",{className:o.SELECTORS.ARROW.substring(1)}),m]})})]})};try{f.displayName="Tooltip",f.__docgenInfo={description:"",displayName:"Tooltip",props:{content:{defaultValue:null,description:"Content to be displayed in the tooltip",name:"content",required:!0,type:{name:"ReactNode"}},children:{defaultValue:null,description:"The element that will trigger the tooltip",name:"children",required:!0,type:{name:"ReactNode"}},position:{defaultValue:{value:"top"},description:"The position of the tooltip relative to the trigger",name:"position",required:!1,type:{name:"enum",value:[{value:'"left"'},{value:'"right"'},{value:'"top"'},{value:'"bottom"'},{value:'"top-left"'},{value:'"top-right"'},{value:'"bottom-left"'},{value:'"bottom-right"'}]}},trigger:{defaultValue:{value:"hover"},description:"How the tooltip is triggered",name:"trigger",required:!1,type:{name:"enum",value:[{value:'"click"'},{value:'"hover"'}]}},className:{defaultValue:{value:""},description:"Additional CSS class for the tooltip",name:"className",required:!1,type:{name:"string"}},delay:{defaultValue:{value:"200"},description:"Delay before showing the tooltip (in milliseconds)",name:"delay",required:!1,type:{name:"number"}},offset:{defaultValue:{value:"10"},description:"Offset from the trigger element (in pixels)",name:"offset",required:!1,type:{name:"number"}}}}}catch{}const it={title:"Components/Tooltip",component:f,argTypes:{position:{control:{type:"select"},options:["top","bottom","left","right","top-left","top-right","bottom-left","bottom-right"],defaultValue:"top"},trigger:{control:{type:"select"},options:["hover","click"],defaultValue:"hover"},delay:{control:{type:"number"},defaultValue:200},offset:{control:{type:"number"},defaultValue:10}}},e=m=>t.jsx("div",{style:{display:"flex",justifyContent:"center",padding:"100px"},children:t.jsx(f,{...m,children:t.jsx("button",{className:"c-btn c-btn--primary",children:"Hover me"})})}),r=e.bind({});r.args={content:t.jsx("p",{className:"u-mb-0",children:"This is a tooltip on top"}),position:"top",trigger:"hover"};const i=e.bind({});i.args={content:t.jsx("p",{className:"u-mb-0",children:"Click anywhere to close this tooltip"}),position:"top",trigger:"click"};const a=e.bind({});a.args={content:t.jsx("p",{className:"u-mb-0",children:"This tooltip appears below the trigger"}),position:"bottom"};const n=e.bind({});n.args={content:t.jsx("p",{className:"u-mb-0",children:"This tooltip appears to the left"}),position:"left"};const l=e.bind({});l.args={content:t.jsx("p",{className:"u-mb-0",children:"This tooltip appears to the right"}),position:"right"};const c=e.bind({});c.args={content:t.jsx("p",{className:"u-mb-0",children:"Tooltips work great with icons"}),position:"top",children:t.jsx("i",{className:"icon-lux-info",style:{fontSize:"24px",cursor:"pointer"}})};const p=e.bind({});p.args={content:t.jsx("p",{className:"u-mb-0",children:"This tooltip has a longer delay"}),position:"top",delay:500};const u=e.bind({});u.args={content:t.jsx("p",{className:"u-mb-0",children:"This tooltip has a larger offset from the trigger"}),position:"top",offset:20};const d=e.bind({});d.args={content:t.jsxs("div",{children:[t.jsx("h4",{style:{marginTop:0,marginBottom:"8px"},children:"Rich Tooltip Content"}),t.jsxs("ul",{style:{margin:0,paddingLeft:"16px"},children:[t.jsx("li",{children:"Supports HTML content"}),t.jsx("li",{children:"Can include multiple elements"}),t.jsx("li",{children:"Helpful for complex information"})]})]}),position:"bottom",trigger:"click",offset:15};var S,E,R;r.parameters={...r.parameters,docs:{...(S=r.parameters)==null?void 0:S.docs,source:{originalSource:`args => <div style={{
  display: 'flex',
  justifyContent: 'center',
  padding: '100px'
}}>
    <Tooltip {...args}>
      <button className="c-btn c-btn--primary">Hover me</button>
    </Tooltip>
  </div>`,...(R=(E=r.parameters)==null?void 0:E.docs)==null?void 0:R.source}}};var O,L,H;i.parameters={...i.parameters,docs:{...(O=i.parameters)==null?void 0:O.docs,source:{originalSource:`args => <div style={{
  display: 'flex',
  justifyContent: 'center',
  padding: '100px'
}}>
    <Tooltip {...args}>
      <button className="c-btn c-btn--primary">Hover me</button>
    </Tooltip>
  </div>`,...(H=(L=i.parameters)==null?void 0:L.docs)==null?void 0:H.source}}};var V,_,k;a.parameters={...a.parameters,docs:{...(V=a.parameters)==null?void 0:V.docs,source:{originalSource:`args => <div style={{
  display: 'flex',
  justifyContent: 'center',
  padding: '100px'
}}>
    <Tooltip {...args}>
      <button className="c-btn c-btn--primary">Hover me</button>
    </Tooltip>
  </div>`,...(k=(_=a.parameters)==null?void 0:_.docs)==null?void 0:k.source}}};var P,D,I;n.parameters={...n.parameters,docs:{...(P=n.parameters)==null?void 0:P.docs,source:{originalSource:`args => <div style={{
  display: 'flex',
  justifyContent: 'center',
  padding: '100px'
}}>
    <Tooltip {...args}>
      <button className="c-btn c-btn--primary">Hover me</button>
    </Tooltip>
  </div>`,...(I=(D=n.parameters)==null?void 0:D.docs)==null?void 0:I.source}}};var w,q,A;l.parameters={...l.parameters,docs:{...(w=l.parameters)==null?void 0:w.docs,source:{originalSource:`args => <div style={{
  display: 'flex',
  justifyContent: 'center',
  padding: '100px'
}}>
    <Tooltip {...args}>
      <button className="c-btn c-btn--primary">Hover me</button>
    </Tooltip>
  </div>`,...(A=(q=l.parameters)==null?void 0:q.docs)==null?void 0:A.source}}};var F,$,G;c.parameters={...c.parameters,docs:{...(F=c.parameters)==null?void 0:F.docs,source:{originalSource:`args => <div style={{
  display: 'flex',
  justifyContent: 'center',
  padding: '100px'
}}>
    <Tooltip {...args}>
      <button className="c-btn c-btn--primary">Hover me</button>
    </Tooltip>
  </div>`,...(G=($=c.parameters)==null?void 0:$.docs)==null?void 0:G.source}}};var U,B,M;p.parameters={...p.parameters,docs:{...(U=p.parameters)==null?void 0:U.docs,source:{originalSource:`args => <div style={{
  display: 'flex',
  justifyContent: 'center',
  padding: '100px'
}}>
    <Tooltip {...args}>
      <button className="c-btn c-btn--primary">Hover me</button>
    </Tooltip>
  </div>`,...(M=(B=p.parameters)==null?void 0:B.docs)==null?void 0:M.source}}};var W,z,Y;u.parameters={...u.parameters,docs:{...(W=u.parameters)==null?void 0:W.docs,source:{originalSource:`args => <div style={{
  display: 'flex',
  justifyContent: 'center',
  padding: '100px'
}}>
    <Tooltip {...args}>
      <button className="c-btn c-btn--primary">Hover me</button>
    </Tooltip>
  </div>`,...(Y=(z=u.parameters)==null?void 0:z.docs)==null?void 0:Y.source}}};var J,K,Q;d.parameters={...d.parameters,docs:{...(J=d.parameters)==null?void 0:J.docs,source:{originalSource:`args => <div style={{
  display: 'flex',
  justifyContent: 'center',
  padding: '100px'
}}>
    <Tooltip {...args}>
      <button className="c-btn c-btn--primary">Hover me</button>
    </Tooltip>
  </div>`,...(Q=(K=d.parameters)==null?void 0:K.docs)==null?void 0:Q.source}}};const at=["Default","ClickTrigger","BottomPosition","LeftPosition","RightPosition","WithIcon","CustomDelay","CustomOffset","RichContent"];export{a as BottomPosition,i as ClickTrigger,p as CustomDelay,u as CustomOffset,r as Default,n as LeftPosition,d as RichContent,l as RightPosition,c as WithIcon,at as __namedExportsOrder,it as default};
