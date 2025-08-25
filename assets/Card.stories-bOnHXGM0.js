import{j as s}from"./jsx-runtime-BjG_zV1W.js";import{r as t,e as le}from"./index-BVDOR7y2.js";import{C as ae}from"./Card-Bp6dcI4n.js";import{C as c}from"./components-BrxBU25R.js";const ie=(r={})=>{const{elevationEffect:l=!1,elevationClass:d=c.CLASSES.ACTIVE,flipEffect:a=!1,flipTrigger:o="click",focusEffect:u=!1,clickable:e=!1,onClick:i}=r,T=t.useRef(null),oe=t.useRef(null),re=t.useRef(null),[y,m]=t.useState(!1),[E,_]=t.useState(!1),[k,P]=t.useState(!1),[ne,V]=t.useState(!1),S=t.useCallback(n=>{a&&o==="click"&&m(L=>!L),i&&i(n)},[a,o,i]),w=t.useCallback(n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),a&&o==="click"&&m(L=>!L),i&&i(n))},[a,o,i]),A=t.useCallback(()=>{V(!0),l&&_(!0),a&&o==="hover"&&m(!0)},[l,a,o]),N=t.useCallback(()=>{V(!1),l&&_(!1),a&&o==="hover"&&m(!1)},[l,a,o]),R=t.useCallback(()=>{P(!0)},[]),F=t.useCallback(()=>{P(!1)},[]),se=t.useCallback(()=>({className:[c.CLASSES.BASE,E?d:"",y?c.CLASSES.FLIPPED:"",k&&u?c.CLASSES.FOCUSED:"",e?c.CLASSES.CLICKABLE:""].filter(Boolean).join(" "),ref:T,tabxwIndex:e||a?0:-1,role:e?"button":void 0,onMouseEnter:A,onMouseLeave:N,onFocus:R,onBlur:F,onClick:S,onKeyDown:w}),[E,y,k,d,u,e,A,N,R,F,S,w,a]);return{cardRef:T,frontRef:oe,backRef:re,isFlipped:y,isElevated:E,isFocused:k,isHovered:ne,handleClick:S,handleKeyDown:w,handleMouseEnter:A,handleMouseLeave:N,handleFocus:R,handleBlur:F,getCardProps:se}},x=({elevationClass:r="is-elevated",className:l="",children:d,onClick:a,...o})=>{const{getCardProps:u}=ie({elevationEffect:!0,elevationClass:r,clickable:!!a,onClick:a,focusEffect:!0}),e=u();return s.jsx("div",{className:`${l} ${e.className}`,ref:e.ref,tabIndex:e.tabIndex,role:e.role,onMouseEnter:e.onMouseEnter,onMouseLeave:e.onMouseLeave,onFocus:e.onFocus,onBlur:e.onBlur,onClick:e.onClick,onKeyDown:e.onKeyDown,children:s.jsx(ae,{...o,className:"",onClick:void 0,children:d})})};x.displayName="ElevationCard";try{x.displayName="ElevationCard",x.__docgenInfo={description:"",displayName:"ElevationCard",props:{elevationClass:{defaultValue:{value:"is-elevated"},description:"CSS class for elevation effect",name:"elevationClass",required:!1,type:{name:"string"}},header:{defaultValue:null,description:"Card header content",name:"header",required:!1,type:{name:"ReactNode"}},image:{defaultValue:null,description:"Card image source URL",name:"image",required:!1,type:{name:"string"}},imageAlt:{defaultValue:null,description:"Alternative text for the image",name:"imageAlt",required:!1,type:{name:"string"}},title:{defaultValue:null,description:"Card title",name:"title",required:!1,type:{name:"ReactNode"}},text:{defaultValue:null,description:"Card text content",name:"text",required:!1,type:{name:"ReactNode"}},actions:{defaultValue:null,description:"Card actions (buttons, links, etc.)",name:"actions",required:!1,type:{name:"ReactNode"}},icon:{defaultValue:null,description:"Card icon",name:"icon",required:!1,type:{name:"ReactNode"}},footer:{defaultValue:null,description:"Card footer content",name:"footer",required:!1,type:{name:"ReactNode"}},row:{defaultValue:null,description:"Row layout (horizontal card)",name:"row",required:!1,type:{name:"boolean"}},flat:{defaultValue:null,description:"Flat style (no padding on image container)",name:"flat",required:!1,type:{name:"boolean"}},active:{defaultValue:null,description:"Active state",name:"active",required:!1,type:{name:"boolean"}},children:{defaultValue:null,description:"Card content (body)",name:"children",required:!1,type:{name:"ReactNode"}},onClick:{defaultValue:null,description:"Optional click handler",name:"onClick",required:!1,type:{name:"((event: MouseEvent<HTMLDivElement, MouseEvent>) => void)"}},className:{defaultValue:{value:""},description:"Additional CSS class names",name:"className",required:!1,type:{name:"string"}},disabled:{defaultValue:null,description:"Component disabled state",name:"disabled",required:!1,type:{name:"boolean"}}}}}catch{}try{ElevationCardProps.displayName="ElevationCardProps",ElevationCardProps.__docgenInfo={description:"Elevation Card component props",displayName:"ElevationCardProps",props:{}}}catch{}const pe={title:"Components/Card",component:ae,parameters:{layout:"centered"},argTypes:{header:{control:"text"},title:{control:"text"},text:{control:"text"},image:{control:"text"},imageAlt:{control:"text"},footer:{control:"text"},row:{control:"boolean"},flat:{control:"boolean"},active:{control:"boolean"},className:{control:"text"}}},p={args:{title:"Card Title",text:"This is a basic card with title and text content.",className:"custom-card"}},f={args:{title:"Card with Image",text:"This card includes an image above the content.",image:"https://placehold.co/600x400",imageAlt:"Placeholder image"}},h={args:{title:"Card with Actions",text:"This card includes buttons at the bottom.",actions:s.jsxs(le.Fragment,{children:[s.jsx("button",{className:"c-btn c-btn--primary c-btn--sm",children:"Learn More"}),s.jsx("button",{className:"c-btn c-btn--secondary c-btn--sm",children:"Cancel"})]})}},C={args:{title:"Row Layout Card",text:"This card uses a horizontal layout with the image on the left.",image:"https://placehold.co/300x300",imageAlt:"Placeholder",row:!0}},g={args:{title:"Flat Style Card",text:"This card uses the flat style with the image extending to the edges.",image:"https://placehold.co/600x400",imageAlt:"Placeholder",flat:!0}},b={args:{title:"Clickable Card",text:"Click me! This card has an onClick handler attached.",onClick:()=>alert("Card clicked!")}},v={render:r=>s.jsx("div",{style:{padding:"20px",width:"300px"},children:s.jsx(x,{...r})}),args:{title:"Elevation Effect Card",text:"Hover over this card to see an elevation effect.",image:"https://picsum.photos/id/0/712/500",imageAlt:"Placeholder"}};var q,I,M;p.parameters={...p.parameters,docs:{...(q=p.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    title: 'Card Title',
    text: 'This is a basic card with title and text content.',
    className: 'custom-card'
  }
}`,...(M=(I=p.parameters)==null?void 0:I.docs)==null?void 0:M.source}}};var j,B,D;f.parameters={...f.parameters,docs:{...(j=f.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    title: 'Card with Image',
    text: 'This card includes an image above the content.',
    image: 'https://placehold.co/600x400',
    imageAlt: 'Placeholder image'
  }
}`,...(D=(B=f.parameters)==null?void 0:B.docs)==null?void 0:D.source}}};var W,H,K;h.parameters={...h.parameters,docs:{...(W=h.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    title: 'Card with Actions',
    text: 'This card includes buttons at the bottom.',
    actions: <React.Fragment>
        <button className="c-btn c-btn--primary c-btn--sm">Learn More</button>
        <button className="c-btn c-btn--secondary c-btn--sm">Cancel</button>
      </React.Fragment>
  }
}`,...(K=(H=h.parameters)==null?void 0:H.docs)==null?void 0:K.source}}};var z,O,U;C.parameters={...C.parameters,docs:{...(z=C.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    title: 'Row Layout Card',
    text: 'This card uses a horizontal layout with the image on the left.',
    image: 'https://placehold.co/300x300',
    imageAlt: 'Placeholder',
    row: true
  }
}`,...(U=(O=C.parameters)==null?void 0:O.docs)==null?void 0:U.source}}};var $,G,J;g.parameters={...g.parameters,docs:{...($=g.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    title: 'Flat Style Card',
    text: 'This card uses the flat style with the image extending to the edges.',
    image: 'https://placehold.co/600x400',
    imageAlt: 'Placeholder',
    flat: true
  }
}`,...(J=(G=g.parameters)==null?void 0:G.docs)==null?void 0:J.source}}};var Q,X,Y;b.parameters={...b.parameters,docs:{...(Q=b.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    title: 'Clickable Card',
    text: 'Click me! This card has an onClick handler attached.',
    onClick: () => alert('Card clicked!')
  }
}`,...(Y=(X=b.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};var Z,ee,te;v.parameters={...v.parameters,docs:{...(Z=v.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  render: args => <div style={{
    padding: '20px',
    width: '300px'
  }}>
      <ElevationCard {...args} />
    </div>,
  args: {
    title: 'Elevation Effect Card',
    text: 'Hover over this card to see an elevation effect.',
    image: 'https://picsum.photos/id/0/712/500',
    imageAlt: 'Placeholder'
  }
}`,...(te=(ee=v.parameters)==null?void 0:ee.docs)==null?void 0:te.source}}};const fe=["Basic","WithImage","WithActions","Row","Flat","Clickable","WithElevation"];export{p as Basic,b as Clickable,g as Flat,C as Row,h as WithActions,v as WithElevation,f as WithImage,fe as __namedExportsOrder,pe as default};
