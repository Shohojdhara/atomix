import{j as t}from"./jsx-runtime-BjG_zV1W.js";import{H as Se}from"./Hero-BUW2kM2P.js";import{B as g}from"./Button-_O9VEUtI.js";import"./index-BVDOR7y2.js";import"./components-BrxBU25R.js";const He={title:"Components/Hero",component:Se,parameters:{layout:"padded"},tags:["autodocs"],argTypes:{title:{control:"text",description:"Hero title"},subtitle:{control:"text",description:"Hero subtitle"},text:{control:"text",description:"Hero text content"},imageSrc:{control:"text",description:"Image source URL"},imageAlt:{control:"text",description:"Image alt text"},alignment:{control:{type:"select",options:["left","center","right"]},description:"Content alignment"},backgroundImageSrc:{control:"text",description:"Background image source URL"},showOverlay:{control:"boolean",description:"Show background overlay"},fullViewportHeight:{control:"boolean",description:"Make hero full viewport height"},imageColSize:{control:{type:"range",min:1,max:12,step:1},description:"Image column size (1-12)"},contentColSize:{control:{type:"range",min:1,max:12,step:1},description:"Content column size (1-12)"},contentWidth:{control:"text",description:'Custom width for the hero content (e.g., "800px", "50%")',table:{defaultValue:{summary:"536px"}}},parallax:{control:"boolean",description:"Enable parallax effect on background image"},parallaxIntensity:{control:{type:"range",min:0,max:1,step:.1},description:"Parallax effect intensity (0-1)"},videoBackground:{control:"text",description:"Video background URL"},videoOptions:{control:"object",description:"Video background options"}}},ke=t.jsxs(t.Fragment,{children:[t.jsx(g,{label:"Get Started",variant:"primary"}),t.jsx(g,{label:"Learn More",variant:"outline-secondary"})]}),u=t.jsxs(t.Fragment,{children:[t.jsx(g,{label:"Explore Components",variant:"primary"}),t.jsx(g,{label:"View Documentation",variant:"outline-secondary"})]}),ve="Build modern, responsive interfaces with a clean, consistent design language. Our component library helps you create beautiful user experiences with minimal effort.",Be="Atomix provides a complete design system with powerful, flexible components that follow best practices for accessibility, performance, and user experience.",e={args:{title:"Modern UI Components for Developers",subtitle:"Atomix Design System",text:ve,imageSrc:"https://picsum.photos/id/0/712/500",imageAlt:"Developer working with code",alignment:"right",actions:ke}},i={args:{...e.args,title:"Crafted for Developer Experience",alignment:"left",imageSrc:"https://picsum.photos/id/3/712/500"}},n={args:{...e.args,title:"Build Faster with Atomix",text:"Our components follow best practices for accessibility, performance, and responsive design. Start building beautiful interfaces in minutes.",alignment:"center",imageSrc:"https://picsum.photos/id/1/1024/300"}},o={args:{...e.args,title:"Powerful Design System",text:Be,actions:u,backgroundImageSrc:"https://picsum.photos/id/24/1920/1080",showOverlay:!0}},r={args:{...e.args,title:"Beautiful & Accessible Components",text:"Atomix is built with accessibility in mind, ensuring your applications work for everyone. Our components are fully responsive and follow WAI-ARIA guidelines.",imageSrc:void 0,backgroundImageSrc:"https://picsum.photos/id/1067/1920/1080",showOverlay:!0,alignment:"center",actions:u,contentWidth:"800px"}},s={args:{...r.args,title:"Atomix. Build Once. Use Everywhere.",text:"A flexible, scalable design system that works seamlessly across all devices and platforms.",fullViewportHeight:!0}},c={args:{...o.args,title:"Customizable & Extensible",text:"Easily customize components to match your brand. Built with a flexible architecture that allows for easy extension and adaptation.",alignment:"left"}},l={args:{...o.args,title:"Based on Modern Standards",text:"Built with the latest technologies like React, TypeScript, and SCSS. Follows BEM, ITCSS, and OOCSS methodologies for clean, maintainable CSS.",alignment:"center",imageSrc:"https://picsum.photos/id/160/1312/280"}},d={args:{...n.args,title:"Hero with Custom Content Width",text:"This hero component has a custom content width set through the contentWidth prop, which sets the --atomix-hero-content-width CSS variable.",contentWidth:"800px"}},p={args:{...r.args,title:"Parallax Background Effect",text:"This hero features a parallax scrolling effect on the background image, creating depth and visual interest as the user scrolls.",backgroundImageSrc:"https://picsum.photos/id/1015/1920/1080",parallax:!0,parallaxIntensity:.5,fullViewportHeight:!0}},a={args:{title:"Video Background Hero",subtitle:"Dynamic & Engaging",text:"Add motion and visual interest to your hero sections with video backgrounds. Perfect for creating immersive landing pages.",alignment:"center",videoBackground:"https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4",videoOptions:{autoplay:!0,loop:!0,muted:!0,posterUrl:"https://picsum.photos/id/1018/1920/1080"},showOverlay:!0,actions:u,contentWidth:"800px"}},m={args:{...a.args,title:"Complete Media Support",text:"Combine video backgrounds with foreground images for rich, layered visual presentations.",alignment:"left",imageSrc:"https://picsum.photos/id/180/712/500",imageAlt:"Product showcase"}};var h,f,x,w,y;e.parameters={...e.parameters,docs:{...(h=e.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    title: 'Modern UI Components for Developers',
    subtitle: 'Atomix Design System',
    text: demoText,
    imageSrc: 'https://picsum.photos/id/0/712/500',
    imageAlt: 'Developer working with code',
    alignment: 'right',
    actions: primaryActionButtons
  }
}`,...(x=(f=e.parameters)==null?void 0:f.docs)==null?void 0:x.source},description:{story:"Default Hero component with right-aligned content and image",...(y=(w=e.parameters)==null?void 0:w.docs)==null?void 0:y.description}}};var b,S,k,v,B;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    title: 'Crafted for Developer Experience',
    alignment: 'left',
    imageSrc: 'https://picsum.photos/id/3/712/500'
  }
}`,...(k=(S=i.parameters)==null?void 0:S.docs)==null?void 0:k.source},description:{story:"Hero with left-aligned content and image on right",...(B=(v=i.parameters)==null?void 0:v.docs)==null?void 0:B.description}}};var C,A,I,W,O;n.parameters={...n.parameters,docs:{...(C=n.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    title: 'Build Faster with Atomix',
    text: 'Our components follow best practices for accessibility, performance, and responsive design. Start building beautiful interfaces in minutes.',
    alignment: 'center',
    imageSrc: 'https://picsum.photos/id/1/1024/300'
  }
}`,...(I=(A=n.parameters)==null?void 0:A.docs)==null?void 0:I.source},description:{story:"Hero with center-aligned content and image below",...(O=(W=n.parameters)==null?void 0:W.docs)==null?void 0:O.description}}};var H,D,E,V,T;o.parameters={...o.parameters,docs:{...(H=o.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    title: 'Powerful Design System',
    text: showcaseText,
    actions: showcaseActionButtons,
    backgroundImageSrc: 'https://picsum.photos/id/24/1920/1080',
    showOverlay: true
  }
}`,...(E=(D=o.parameters)==null?void 0:D.docs)==null?void 0:E.source},description:{story:"Hero with background image",...(T=(V=o.parameters)==null?void 0:V.docs)==null?void 0:T.description}}};var M,P,j,F,L;r.parameters={...r.parameters,docs:{...(M=r.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    title: 'Beautiful & Accessible Components',
    text: 'Atomix is built with accessibility in mind, ensuring your applications work for everyone. Our components are fully responsive and follow WAI-ARIA guidelines.',
    imageSrc: undefined,
    backgroundImageSrc: 'https://picsum.photos/id/1067/1920/1080',
    showOverlay: true,
    alignment: 'center',
    actions: showcaseActionButtons,
    contentWidth: '800px'
  }
}`,...(j=(P=r.parameters)==null?void 0:P.docs)==null?void 0:j.source},description:{story:"Hero with background image and no foreground image",...(L=(F=r.parameters)==null?void 0:F.docs)==null?void 0:L.description}}};var U,z,R,_,G;s.parameters={...s.parameters,docs:{...(U=s.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    ...BackgroundImageOnly.args,
    title: 'Atomix. Build Once. Use Everywhere.',
    text: 'A flexible, scalable design system that works seamlessly across all devices and platforms.',
    fullViewportHeight: true
  }
}`,...(R=(z=s.parameters)==null?void 0:z.docs)==null?void 0:R.source},description:{story:"Full viewport height hero",...(G=(_=s.parameters)==null?void 0:_.docs)==null?void 0:G.description}}};var q,J,K,N,Q;c.parameters={...c.parameters,docs:{...(q=c.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    ...WithBackgroundImage.args,
    title: 'Customizable & Extensible',
    text: 'Easily customize components to match your brand. Built with a flexible architecture that allows for easy extension and adaptation.',
    alignment: 'left'
  }
}`,...(K=(J=c.parameters)==null?void 0:J.docs)==null?void 0:K.source},description:{story:"Left-aligned content with background image",...(Q=(N=c.parameters)==null?void 0:N.docs)==null?void 0:Q.description}}};var X,Y,Z,$,ee;l.parameters={...l.parameters,docs:{...(X=l.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    ...WithBackgroundImage.args,
    title: 'Based on Modern Standards',
    text: 'Built with the latest technologies like React, TypeScript, and SCSS. Follows BEM, ITCSS, and OOCSS methodologies for clean, maintainable CSS.',
    alignment: 'center',
    imageSrc: 'https://picsum.photos/id/160/1312/280'
  }
}`,...(Z=(Y=l.parameters)==null?void 0:Y.docs)==null?void 0:Z.source},description:{story:"Center-aligned content with background and foreground image",...(ee=($=l.parameters)==null?void 0:$.docs)==null?void 0:ee.description}}};var te,oe,re,ne,ae;d.parameters={...d.parameters,docs:{...(te=d.parameters)==null?void 0:te.docs,source:{originalSource:`{
  args: {
    ...CenterAligned.args,
    title: 'Hero with Custom Content Width',
    text: 'This hero component has a custom content width set through the contentWidth prop, which sets the --atomix-hero-content-width CSS variable.',
    contentWidth: '800px'
  }
}`,...(re=(oe=d.parameters)==null?void 0:oe.docs)==null?void 0:re.source},description:{story:"Center-aligned content with custom content width",...(ae=(ne=d.parameters)==null?void 0:ne.docs)==null?void 0:ae.description}}};var ie,se,ce,le,de;p.parameters={...p.parameters,docs:{...(ie=p.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  args: {
    ...BackgroundImageOnly.args,
    title: 'Parallax Background Effect',
    text: 'This hero features a parallax scrolling effect on the background image, creating depth and visual interest as the user scrolls.',
    backgroundImageSrc: 'https://picsum.photos/id/1015/1920/1080',
    parallax: true,
    parallaxIntensity: 0.5,
    fullViewportHeight: true
  }
}`,...(ce=(se=p.parameters)==null?void 0:se.docs)==null?void 0:ce.source},description:{story:"Hero with parallax background effect",...(de=(le=p.parameters)==null?void 0:le.docs)==null?void 0:de.description}}};var pe,me,ge,ue,he;a.parameters={...a.parameters,docs:{...(pe=a.parameters)==null?void 0:pe.docs,source:{originalSource:`{
  args: {
    title: 'Video Background Hero',
    subtitle: 'Dynamic & Engaging',
    text: 'Add motion and visual interest to your hero sections with video backgrounds. Perfect for creating immersive landing pages.',
    alignment: 'center',
    videoBackground: 'https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4',
    videoOptions: {
      autoplay: true,
      loop: true,
      muted: true,
      posterUrl: 'https://picsum.photos/id/1018/1920/1080'
    },
    showOverlay: true,
    actions: showcaseActionButtons,
    contentWidth: '800px'
  }
}`,...(ge=(me=a.parameters)==null?void 0:me.docs)==null?void 0:ge.source},description:{story:"Hero with video background",...(he=(ue=a.parameters)==null?void 0:ue.docs)==null?void 0:he.description}}};var fe,xe,we,ye,be;m.parameters={...m.parameters,docs:{...(fe=m.parameters)==null?void 0:fe.docs,source:{originalSource:`{
  args: {
    ...WithVideoBackground.args,
    title: 'Complete Media Support',
    text: 'Combine video backgrounds with foreground images for rich, layered visual presentations.',
    alignment: 'left',
    imageSrc: 'https://picsum.photos/id/180/712/500',
    imageAlt: 'Product showcase'
  }
}`,...(we=(xe=m.parameters)==null?void 0:xe.docs)==null?void 0:we.source},description:{story:"Hero with video background and foreground image",...(be=(ye=m.parameters)==null?void 0:ye.docs)==null?void 0:be.description}}};const De=["Default","LeftAligned","CenterAligned","WithBackgroundImage","BackgroundImageOnly","FullViewportHeight","LeftAlignedWithBackground","CenterAlignedWithImageBackground","CustomContentWidth","WithParallaxEffect","WithVideoBackground","VideoBackgroundWithImage"];export{r as BackgroundImageOnly,n as CenterAligned,l as CenterAlignedWithImageBackground,d as CustomContentWidth,e as Default,s as FullViewportHeight,i as LeftAligned,c as LeftAlignedWithBackground,m as VideoBackgroundWithImage,o as WithBackgroundImage,p as WithParallaxEffect,a as WithVideoBackground,De as __namedExportsOrder,He as default};
