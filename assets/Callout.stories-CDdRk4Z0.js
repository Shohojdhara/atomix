import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{r as I}from"./index-BVDOR7y2.js";import{C as i}from"./Callout-u_wggMUf.js";import{B as a}from"./Button-_O9VEUtI.js";import"./Icon-k4CeN--q.js";import"./SpeakerX.es-Cg-mjUf1.js";const We={title:"Components/Callout",component:i,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:"Callout components are used to display important messages, notifications, or alerts to users. They can be used to provide feedback, warnings, errors, or general information."}}},argTypes:{variant:{control:"select",options:["primary","secondary","success","info","warning","error","light","dark"],description:"The color variant of the callout",table:{defaultValue:{summary:"primary"},type:{summary:"string"}}},title:{control:"text",description:"The title of the callout",table:{type:{summary:"ReactNode"}}},children:{control:"text",description:"The content of the callout",table:{type:{summary:"ReactNode"}}},icon:{control:"boolean",description:"Optional icon to display in the callout",table:{type:{summary:"ReactNode"}}},oneLine:{control:"boolean",description:"Display the callout in one line",table:{defaultValue:{summary:"false"},type:{summary:"boolean"}}},toast:{control:"boolean",description:"Display the callout as a toast notification",table:{defaultValue:{summary:"false"},type:{summary:"boolean"}}},actions:{control:!1,description:"Optional action buttons to display in the callout",table:{type:{summary:"ReactNode"}}},className:{control:"text",description:"Additional CSS class names",table:{type:{summary:"string"}}}}},n=()=>e.jsx("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),S=()=>e.jsx("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),D=()=>e.jsx("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M12 9V13M12 17H12.01M3.98069 8.00001C3.32275 9.15122 3 10.5502 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C10.5502 3 9.15122 3.32275 8.00001 3.98069",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),W=()=>e.jsx("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M12 9V13M12 17H12.01M11.2926 3.05737C11.5093 3.01652 11.7321 3 11.9565 3C16.3908 3 20 6.60914 20 11.0435C20 11.2679 19.9835 11.4907 19.9426 11.7074C19.4862 15.0952 16.5609 17.7241 13 17.9711C12.6712 17.9903 12.3375 18 12 18C7.58172 18 4 14.4183 4 10C4 6.43913 6.62884 3.51375 10.0166 3.05736C10.2333 3.01652 10.4561 3 10.6805 3C10.9049 3 11.1277 3.01652 11.3444 3.05736L11.2926 3.05737Z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),p={args:{title:"Information",children:"This is a default callout with some information.",variant:"primary",icon:e.jsx(n,{})},parameters:{docs:{description:{story:"The default callout with a title, content, and an icon."}}}},m={args:{title:"Success",children:"Your changes have been saved successfully.",variant:"success",icon:e.jsx(S,{})},parameters:{docs:{description:{story:"Use success callouts to confirm that an action was completed successfully."}}}},h={args:{title:"Warning",children:"Please review your information before proceeding.",variant:"warning",icon:e.jsx(D,{})},parameters:{docs:{description:{story:"Warning callouts alert users to potential issues or important information they should be aware of."}}}},g={args:{title:"Error",children:"There was a problem processing your request.",variant:"error",icon:e.jsx(W,{})},parameters:{docs:{description:{story:"Error callouts indicate that something went wrong and requires attention."}}}},f={args:{title:"Update Available",children:"A new version is available. Would you like to update now?",variant:"info",icon:e.jsx(n,{}),actions:e.jsxs(e.Fragment,{children:[e.jsx(a,{label:"Update Now",variant:"primary",size:"sm"}),e.jsx(a,{label:"Later",variant:"outline-primary",size:"sm"})]})},parameters:{docs:{description:{story:"Callouts can include action buttons to allow users to respond directly to the message."}}}},y={args:{title:"Notification",children:"This is a dismissible callout that can be closed.",variant:"primary",icon:e.jsx(n,{}),onClose:()=>console.log("Callout closed")},parameters:{docs:{description:{story:"Dismissible callouts include a close button that allows users to remove the callout from view."}}}},x={args:{title:"Quick notification",variant:"info",icon:e.jsx(n,{}),oneLine:!0},parameters:{docs:{description:{story:"One-line callouts are more compact and display the title and icon in a single line."}}}},v={args:{title:"Toast Notification",children:"This callout is styled as a toast notification.",variant:"success",icon:e.jsx(S,{}),toast:!0,onClose:()=>console.log("Toast closed")},parameters:{docs:{description:{story:"Toast notifications are temporary messages that appear and disappear automatically."}}}},w={args:{title:"Dark Mode",children:"This is a dark variant of the callout component.",variant:"dark",icon:e.jsx(n,{})},parameters:{docs:{description:{story:"Dark callouts are useful for dark-themed interfaces or for creating visual contrast."}}}},C={args:{title:"Light Mode",children:"This is a light variant of the callout component.",variant:"light",icon:e.jsx(n,{})},parameters:{docs:{description:{story:"Light callouts are useful for light-themed interfaces or for creating visual contrast."}}}},Ce=()=>{const[r,o]=I.useState([]),s=t=>{const u=Math.random().toString(36).substring(2,9);o([...r,{id:u,variant:t}]),setTimeout(()=>{o(A=>A.filter(we=>we.id!==u))},5e3)},c=t=>{o(u=>u.filter(A=>A.id!==t))},L=t=>{switch(t){case"success":return e.jsx(S,{});case"warning":return e.jsx(D,{});case"error":return e.jsx(W,{});default:return e.jsx(n,{})}},l=t=>{switch(t){case"success":return"Success";case"warning":return"Warning";case"error":return"Error";default:return"Information"}},d=t=>{switch(t){case"success":return"Operation completed successfully!";case"warning":return"Please review before continuing.";case"error":return"An error occurred. Please try again.";default:return"This is an informational message."}};return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsxs("div",{style:{display:"flex",gap:"8px"},children:[e.jsx(a,{label:"Add Info Toast",variant:"primary",size:"sm",onClick:()=>s("info")}),e.jsx(a,{label:"Add Success Toast",variant:"success",size:"sm",onClick:()=>s("success")}),e.jsx(a,{label:"Add Warning Toast",variant:"warning",size:"sm",onClick:()=>s("warning")}),e.jsx(a,{label:"Add Error Toast",variant:"error",size:"sm",onClick:()=>s("error")})]}),e.jsxs("div",{style:{position:"relative",height:"300px",border:"1px dashed #ccc",borderRadius:"8px",padding:"16px",overflow:"hidden"},children:[e.jsx("div",{style:{position:"absolute",top:"16px",right:"16px",display:"flex",flexDirection:"column",gap:"8px",maxWidth:"350px"},children:r.map(t=>e.jsx(i,{title:l(t.variant),variant:t.variant,icon:L(t.variant),toast:!0,onClose:()=>c(t.id),children:d(t.variant)},t.id))}),r.length===0&&e.jsx("div",{style:{display:"flex",height:"100%",alignItems:"center",justifyContent:"center",color:"#666"},children:"Click a button above to show toast notifications here"})]})]})},b={render:()=>e.jsx(Ce,{}),parameters:{docs:{description:{story:"Interactive demo showing how toast notifications can be triggered and displayed in different variants."}}}},be=()=>{const[r,o]=I.useState(!0),[s,c]=I.useState(5);I.useEffect(()=>{if(!r)return;const l=setInterval(()=>{c(d=>d<=1?(clearInterval(l),o(!1),0):d-1)},1e3);return()=>clearInterval(l)},[r]);const L=()=>{o(!0),c(5)};return e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:r?e.jsx(i,{title:`Auto-dismissing in ${s} seconds`,variant:"warning",icon:e.jsx(D,{}),onClose:()=>o(!1),children:"This callout will automatically dismiss after the countdown. You can also dismiss it manually."}):e.jsx(a,{label:"Show Auto-dismiss Callout",variant:"primary",onClick:L})})},j={render:()=>e.jsx(be,{}),parameters:{docs:{description:{story:"Example of a callout that automatically dismisses after a countdown."}}}},je=()=>{const r=["primary","secondary","success","info","warning","error","light","dark"],o=s=>{switch(s){case"success":return e.jsx(S,{});case"warning":return e.jsx(D,{});case"error":return e.jsx(W,{});default:return e.jsx(n,{})}};return e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:r.map(s=>e.jsxs(i,{title:`${s.charAt(0).toUpperCase()+s.slice(1)} Variant`,variant:s,icon:o(s),children:["This is an example of the ",s," callout variant."]},s))})},T={render:()=>e.jsx(je,{}),parameters:{docs:{description:{story:"Overview of all available callout color variants."}}}},Te=()=>e.jsx(i,{title:"Custom Content Example",variant:"primary",icon:e.jsx(n,{}),children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"12px"},children:[e.jsx("p",{children:"Callouts can contain rich content including:"}),e.jsxs("ul",{style:{margin:0,paddingLeft:"20px"},children:[e.jsx("li",{children:"Lists of items"}),e.jsx("li",{children:"Formatted text"}),e.jsx("li",{children:"Custom components"})]}),e.jsx("div",{style:{backgroundColor:"rgba(0,0,0,0.05)",padding:"8px",borderRadius:"4px"},children:e.jsx("code",{children:"This is a code example"})})]})}),k={render:()=>e.jsx(Te,{}),parameters:{docs:{description:{story:"Callouts can contain rich, custom content beyond simple text."}}}};var E,M,V;p.parameters={...p.parameters,docs:{...(E=p.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    title: 'Information',
    children: 'This is a default callout with some information.',
    variant: 'primary',
    icon: <InfoIcon />
  },
  parameters: {
    docs: {
      description: {
        story: 'The default callout with a title, content, and an icon.'
      }
    }
  }
}`,...(V=(M=p.parameters)==null?void 0:M.docs)==null?void 0:V.source}}};var N,O,z;m.parameters={...m.parameters,docs:{...(N=m.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    title: 'Success',
    children: 'Your changes have been saved successfully.',
    variant: 'success',
    icon: <SuccessIcon />
  },
  parameters: {
    docs: {
      description: {
        story: 'Use success callouts to confirm that an action was completed successfully.'
      }
    }
  }
}`,...(z=(O=m.parameters)==null?void 0:O.docs)==null?void 0:z.source}}};var B,R,U;h.parameters={...h.parameters,docs:{...(B=h.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    title: 'Warning',
    children: 'Please review your information before proceeding.',
    variant: 'warning',
    icon: <WarningIcon />
  },
  parameters: {
    docs: {
      description: {
        story: 'Warning callouts alert users to potential issues or important information they should be aware of.'
      }
    }
  }
}`,...(U=(R=h.parameters)==null?void 0:R.docs)==null?void 0:U.source}}};var q,P,H;g.parameters={...g.parameters,docs:{...(q=g.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    title: 'Error',
    children: 'There was a problem processing your request.',
    variant: 'error',
    icon: <ErrorIcon />
  },
  parameters: {
    docs: {
      description: {
        story: 'Error callouts indicate that something went wrong and requires attention.'
      }
    }
  }
}`,...(H=(P=g.parameters)==null?void 0:P.docs)==null?void 0:H.source}}};var Y,Z,F;f.parameters={...f.parameters,docs:{...(Y=f.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    title: 'Update Available',
    children: 'A new version is available. Would you like to update now?',
    variant: 'info',
    icon: <InfoIcon />,
    actions: <>
        <Button label="Update Now" variant="primary" size="sm" />
        <Button label="Later" variant="outline-primary" size="sm" />
      </>
  },
  parameters: {
    docs: {
      description: {
        story: 'Callouts can include action buttons to allow users to respond directly to the message.'
      }
    }
  }
}`,...(F=(Z=f.parameters)==null?void 0:Z.docs)==null?void 0:F.source}}};var Q,_,$;y.parameters={...y.parameters,docs:{...(Q=y.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    title: 'Notification',
    children: 'This is a dismissible callout that can be closed.',
    variant: 'primary',
    icon: <InfoIcon />,
    onClose: () => console.log('Callout closed')
  },
  parameters: {
    docs: {
      description: {
        story: 'Dismissible callouts include a close button that allows users to remove the callout from view.'
      }
    }
  }
}`,...($=(_=y.parameters)==null?void 0:_.docs)==null?void 0:$.source}}};var G,J,K;x.parameters={...x.parameters,docs:{...(G=x.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    title: 'Quick notification',
    variant: 'info',
    icon: <InfoIcon />,
    oneLine: true
  },
  parameters: {
    docs: {
      description: {
        story: 'One-line callouts are more compact and display the title and icon in a single line.'
      }
    }
  }
}`,...(K=(J=x.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var X,ee,te;v.parameters={...v.parameters,docs:{...(X=v.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    title: 'Toast Notification',
    children: 'This callout is styled as a toast notification.',
    variant: 'success',
    icon: <SuccessIcon />,
    toast: true,
    onClose: () => console.log('Toast closed')
  },
  parameters: {
    docs: {
      description: {
        story: 'Toast notifications are temporary messages that appear and disappear automatically.'
      }
    }
  }
}`,...(te=(ee=v.parameters)==null?void 0:ee.docs)==null?void 0:te.source}}};var se,re,oe;w.parameters={...w.parameters,docs:{...(se=w.parameters)==null?void 0:se.docs,source:{originalSource:`{
  args: {
    title: 'Dark Mode',
    children: 'This is a dark variant of the callout component.',
    variant: 'dark',
    icon: <InfoIcon />
  },
  parameters: {
    docs: {
      description: {
        story: 'Dark callouts are useful for dark-themed interfaces or for creating visual contrast.'
      }
    }
  }
}`,...(oe=(re=w.parameters)==null?void 0:re.docs)==null?void 0:oe.source}}};var ne,ae,ie;C.parameters={...C.parameters,docs:{...(ne=C.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  args: {
    title: 'Light Mode',
    children: 'This is a light variant of the callout component.',
    variant: 'light',
    icon: <InfoIcon />
  },
  parameters: {
    docs: {
      description: {
        story: 'Light callouts are useful for light-themed interfaces or for creating visual contrast.'
      }
    }
  }
}`,...(ie=(ae=C.parameters)==null?void 0:ae.docs)==null?void 0:ie.source}}};var ce,le,de;b.parameters={...b.parameters,docs:{...(ce=b.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  render: () => <ToastDemoTemplate />,
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo showing how toast notifications can be triggered and displayed in different variants.'
      }
    }
  }
}`,...(de=(le=b.parameters)==null?void 0:le.docs)==null?void 0:de.source}}};var ue,pe,me;j.parameters={...j.parameters,docs:{...(ue=j.parameters)==null?void 0:ue.docs,source:{originalSource:`{
  render: () => <AutoDismissTemplate />,
  parameters: {
    docs: {
      description: {
        story: 'Example of a callout that automatically dismisses after a countdown.'
      }
    }
  }
}`,...(me=(pe=j.parameters)==null?void 0:pe.docs)==null?void 0:me.source}}};var he,ge,fe;T.parameters={...T.parameters,docs:{...(he=T.parameters)==null?void 0:he.docs,source:{originalSource:`{
  render: () => <AllVariantsTemplate />,
  parameters: {
    docs: {
      description: {
        story: 'Overview of all available callout color variants.'
      }
    }
  }
}`,...(fe=(ge=T.parameters)==null?void 0:ge.docs)==null?void 0:fe.source}}};var ye,xe,ve;k.parameters={...k.parameters,docs:{...(ye=k.parameters)==null?void 0:ye.docs,source:{originalSource:`{
  render: () => <CalloutWithCustomContentTemplate />,
  parameters: {
    docs: {
      description: {
        story: 'Callouts can contain rich, custom content beyond simple text.'
      }
    }
  }
}`,...(ve=(xe=k.parameters)==null?void 0:xe.docs)==null?void 0:ve.source}}};const Ee=["Default","Success","Warning","Error","WithActions","Dismissible","OneLine","Toast","Dark","Light","ToastDemo","AutoDismiss","AllVariants","CustomContent"];export{T as AllVariants,j as AutoDismiss,k as CustomContent,w as Dark,p as Default,y as Dismissible,g as Error,C as Light,x as OneLine,m as Success,v as Toast,b as ToastDemo,h as Warning,f as WithActions,Ee as __namedExportsOrder,We as default};
