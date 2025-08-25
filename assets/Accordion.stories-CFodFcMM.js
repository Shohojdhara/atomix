import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{e as R}from"./index-BVDOR7y2.js";import{A as i}from"./Accordion-CFbJkc_F.js";import"./components-BrxBU25R.js";const H={title:"Components/Accordion",component:i,parameters:{layout:"padded",docs:{description:{component:"The Accordion component follows Atomix guidelines for accessibility, styling, and state. It supports both controlled and uncontrolled modes, custom icons, and full keyboard navigation."}}},argTypes:{iconPosition:{control:{type:"radio"},options:["right","left"],description:"Position of the icon"},defaultOpen:{control:"boolean",description:"Whether the accordion is initially open"},disabled:{control:"boolean",description:"Whether the accordion is disabled"},title:{control:"text",description:"Title of the accordion"},children:{control:"text",description:"Content inside the accordion"}}},o={args:{title:"Accordion Title",children:e.jsx("p",{children:"This is the content of the accordion that appears when expanded."})}},n={args:{title:"Open Accordion",children:e.jsx("p",{children:"This accordion is open, showing its content."}),defaultOpen:!0}},t={args:{title:"Disabled Accordion",children:e.jsx("p",{children:"This accordion is disabled."}),disabled:!0}},c={args:{title:"Icon on Left",children:e.jsx("p",{children:"This accordion has the icon on the left side."}),iconPosition:"left"}},r={args:{title:"Custom Icon",children:e.jsx("p",{children:"This accordion uses a custom plus icon."}),icon:e.jsx("i",{className:"c-accordion__icon",children:e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("circle",{cx:"12",cy:"12",r:"10"}),e.jsx("line",{x1:"12",y1:"8",x2:"12",y2:"16"}),e.jsx("line",{x1:"8",y1:"12",x2:"16",y2:"12"})]})})}},s={args:{title:"Accordion Group",children:e.jsx("p",{children:"Group example - see render function"})},render:()=>e.jsxs("div",{children:[e.jsx("h2",{children:"Accordion Group"}),e.jsxs("div",{className:"u-d-flex u-flex-column u-gap-3",style:{width:"500px"},children:[e.jsx(i,{title:"First Accordion",defaultOpen:!0,children:e.jsx("p",{children:"Content of the first accordion."})}),e.jsx(i,{title:"Second Accordion",children:e.jsx("p",{children:"Content of the second accordion."})}),e.jsxs(i,{title:"Third Accordion",children:[e.jsx("p",{children:"Content of the third accordion with more content."}),e.jsx("p",{children:"Additional paragraph to demonstrate scrolling."}),e.jsxs("ul",{children:[e.jsx("li",{children:"List item 1"}),e.jsx("li",{children:"List item 2"}),e.jsx("li",{children:"List item 3"})]})]})]})]})},d={args:{title:"All Variants",children:e.jsx("p",{children:"See render function for all variants"})},render:()=>e.jsxs("div",{children:[e.jsx("h2",{children:"All Accordion Variants"}),e.jsxs("div",{className:"u-d-flex u-flex-column u-gap-5",children:[e.jsxs("div",{children:[e.jsx("h3",{children:"Default"}),e.jsx(i,{title:"Default Accordion",children:e.jsx("p",{children:"This is the default accordion."})})]}),e.jsxs("div",{children:[e.jsx("h3",{children:"Initially Open"}),e.jsx(i,{title:"Initially Open Accordion",defaultOpen:!0,children:e.jsx("p",{children:"This accordion starts in the open state."})})]}),e.jsxs("div",{children:[e.jsx("h3",{children:"Disabled"}),e.jsx(i,{title:"Disabled Accordion",disabled:!0,children:e.jsx("p",{children:"This accordion is disabled and cannot be interacted with."})})]}),e.jsxs("div",{children:[e.jsx("h3",{children:"Icon on Left"}),e.jsx(i,{title:"Icon on Left",iconPosition:"left",children:e.jsx("p",{children:"This accordion has its icon positioned on the left."})})]}),e.jsxs("div",{children:[e.jsx("h3",{children:"Custom Icon"}),e.jsx(i,{title:"Custom Icon",icon:e.jsx("i",{className:"c-accordion__icon",children:e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("circle",{cx:"12",cy:"12",r:"10"}),e.jsx("line",{x1:"12",y1:"8",x2:"12",y2:"16"}),e.jsx("line",{x1:"8",y1:"12",x2:"16",y2:"12"})]})}),children:e.jsx("p",{children:"This accordion uses a custom plus icon."})})]}),e.jsxs("div",{children:[e.jsx("h3",{children:"With Rich Content"}),e.jsx(i,{title:"Rich Content",children:e.jsxs("div",{children:[e.jsx("h4",{children:"Section Title"}),e.jsx("p",{children:"This accordion contains rich HTML content including headings, paragraphs, and lists."}),e.jsxs("ul",{children:[e.jsxs("li",{children:["List item with ",e.jsx("a",{href:"#",children:"link"})]}),e.jsxs("li",{children:["List item with ",e.jsx("strong",{children:"bold text"})]}),e.jsxs("li",{children:["List item with ",e.jsx("em",{children:"italic text"})]})]}),e.jsx("div",{className:"u-p-3 u-mt-3 u-bg-light u-border-radius-1",children:e.jsx("code",{children:"This is a code block inside the accordion"})})]})})]})]})]})},l={args:{title:"Controlled Accordion",children:e.jsx("p",{children:"This accordion is controlled by external state."})},render:()=>{const[W,a]=R.useState(!1);return e.jsxs("div",{children:[e.jsx("button",{className:"c-btn c-btn--primary u-mb-3",onClick:()=>a(P=>!P),children:"Toggle Accordion (Controlled)"}),e.jsx(i,{title:"Controlled Accordion",isOpen:W,onOpenChange:a,children:e.jsx("p",{children:"This accordion is controlled by external state."})})]})},parameters:{docs:{description:{story:"This story demonstrates a controlled Accordion using the `isOpen` and `onOpenChange` props."}}}};var h,p,u;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    title: 'Accordion Title',
    children: <p>This is the content of the accordion that appears when expanded.</p>
  }
}`,...(u=(p=o.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var x,m,g;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    title: 'Open Accordion',
    children: <p>This accordion is open, showing its content.</p>,
    defaultOpen: true
  }
}`,...(g=(m=n.parameters)==null?void 0:m.docs)==null?void 0:g.source}}};var j,f,A;t.parameters={...t.parameters,docs:{...(j=t.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    title: 'Disabled Accordion',
    children: <p>This accordion is disabled.</p>,
    disabled: true
  }
}`,...(A=(f=t.parameters)==null?void 0:f.docs)==null?void 0:A.source}}};var v,b,y;c.parameters={...c.parameters,docs:{...(v=c.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    title: 'Icon on Left',
    children: <p>This accordion has the icon on the left side.</p>,
    iconPosition: 'left'
  }
}`,...(y=(b=c.parameters)==null?void 0:b.docs)==null?void 0:y.source}}};var T,w,C;r.parameters={...r.parameters,docs:{...(T=r.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    title: 'Custom Icon',
    children: <p>This accordion uses a custom plus icon.</p>,
    icon: <i className="c-accordion__icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="16" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
      </i>
  }
}`,...(C=(w=r.parameters)==null?void 0:w.docs)==null?void 0:C.source}}};var L,O,k;s.parameters={...s.parameters,docs:{...(L=s.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    title: 'Accordion Group',
    children: <p>Group example - see render function</p>
  },
  render: () => <div>
      <h2>Accordion Group</h2>
      <div className="u-d-flex u-flex-column u-gap-3" style={{
      width: '500px'
    }}>
        <Accordion title="First Accordion" defaultOpen={true}>
          <p>Content of the first accordion.</p>
        </Accordion>

        <Accordion title="Second Accordion">
          <p>Content of the second accordion.</p>
        </Accordion>

        <Accordion title="Third Accordion">
          <p>Content of the third accordion with more content.</p>
          <p>Additional paragraph to demonstrate scrolling.</p>
          <ul>
            <li>List item 1</li>
            <li>List item 2</li>
            <li>List item 3</li>
          </ul>
        </Accordion>
      </div>
    </div>
}`,...(k=(O=s.parameters)==null?void 0:O.docs)==null?void 0:k.source}}};var I,S,D;d.parameters={...d.parameters,docs:{...(I=d.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    title: 'All Variants',
    children: <p>See render function for all variants</p>
  },
  render: () => <div>
      <h2>All Accordion Variants</h2>
      <div className="u-d-flex u-flex-column u-gap-5">
        <div>
          <h3>Default</h3>
          <Accordion title="Default Accordion">
            <p>This is the default accordion.</p>
          </Accordion>
        </div>

        <div>
          <h3>Initially Open</h3>
          <Accordion title="Initially Open Accordion" defaultOpen={true}>
            <p>This accordion starts in the open state.</p>
          </Accordion>
        </div>

        <div>
          <h3>Disabled</h3>
          <Accordion title="Disabled Accordion" disabled={true}>
            <p>This accordion is disabled and cannot be interacted with.</p>
          </Accordion>
        </div>

        <div>
          <h3>Icon on Left</h3>
          <Accordion title="Icon on Left" iconPosition="left">
            <p>This accordion has its icon positioned on the left.</p>
          </Accordion>
        </div>

        <div>
          <h3>Custom Icon</h3>
          <Accordion title="Custom Icon" icon={<i className="c-accordion__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="16" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
              </i>}>
            <p>This accordion uses a custom plus icon.</p>
          </Accordion>
        </div>

        <div>
          <h3>With Rich Content</h3>
          <Accordion title="Rich Content">
            <div>
              <h4>Section Title</h4>
              <p>
                This accordion contains rich HTML content including headings, paragraphs, and lists.
              </p>
              <ul>
                <li>
                  List item with <a href="#">link</a>
                </li>
                <li>
                  List item with <strong>bold text</strong>
                </li>
                <li>
                  List item with <em>italic text</em>
                </li>
              </ul>
              <div className="u-p-3 u-mt-3 u-bg-light u-border-radius-1">
                <code>This is a code block inside the accordion</code>
              </div>
            </div>
          </Accordion>
        </div>
      </div>
    </div>
}`,...(D=(S=d.parameters)==null?void 0:S.docs)==null?void 0:D.source}}};var N,_,G;l.parameters={...l.parameters,docs:{...(N=l.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    title: 'Controlled Accordion',
    children: <p>This accordion is controlled by external state.</p>
  },
  render: () => {
    const [open, setOpen] = React.useState(false);
    return <div>
        <button className="c-btn c-btn--primary u-mb-3" onClick={() => setOpen(prev => !prev)}>
          Toggle Accordion (Controlled)
        </button>
        <Accordion title="Controlled Accordion" isOpen={open} onOpenChange={setOpen}>
          <p>This accordion is controlled by external state.</p>
        </Accordion>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates a controlled Accordion using the \`isOpen\` and \`onOpenChange\` props.'
      }
    }
  }
}`,...(G=(_=l.parameters)==null?void 0:_.docs)==null?void 0:G.source}}};const M=["Default","Open","Disabled","IconLeft","CustomIcon","AccordionGroup","AllVariants","Controlled"];export{s as AccordionGroup,d as AllVariants,l as Controlled,r as CustomIcon,o as Default,t as Disabled,c as IconLeft,n as Open,M as __namedExportsOrder,H as default};
