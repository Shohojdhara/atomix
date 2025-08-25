import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{r as c}from"./index-BVDOR7y2.js";import{M as d}from"./Modal-Dl4qfha8.js";import"./components-BrxBU25R.js";const E={title:"Components/Modal",component:d,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{size:{control:"select",options:["sm","md","lg","xl"],description:"Size of the modal",defaultValue:"md"},backdrop:{control:"boolean",description:"Whether clicking the backdrop closes the modal",defaultValue:!0},keyboard:{control:"boolean",description:"Whether pressing Escape key closes the modal",defaultValue:!0},closeButton:{control:"boolean",description:"Whether to show the close button",defaultValue:!0}}},a={render:n=>{const[t,s]=c.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"c-btn c-btn--primary",onClick:()=>s(!0),style:{cursor:"pointer",padding:"8px 16px",display:"inline-block"},children:"Open Modal"}),e.jsx(d,{...n,isOpen:t,onOpenChange:s,title:"Title",subtitle:"This is some description text. This text is only a placeholder and should be replaced with the actual content of the modal.",children:e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, odio vitae faucibus luctus, elit nisi tincidunt justo, in malesuada enim nisl eget nisl. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."})})]})}},l={render:n=>{const[t,s]=c.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"c-btn c-btn--primary",onClick:()=>s(!0),style:{cursor:"pointer",padding:"8px 16px",display:"inline-block"},children:"Open Modal with Footer"}),e.jsxs(d,{...n,isOpen:t,onOpenChange:s,title:"Modal with Footer",subtitle:"This is some description text. This text is only a placeholder and should be replaced with the actual content of the modal.",footer:e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"c-btn c-btn--outline-secondary",onClick:()=>s(!1),style:{cursor:"pointer",padding:"8px 16px",display:"inline-block",marginRight:"8px"},children:"Cancel"}),e.jsx("div",{className:"c-btn c-btn--primary",onClick:()=>{alert("Action confirmed!"),s(!1)},style:{cursor:"pointer",padding:"8px 16px",display:"inline-block"},children:"Confirm"})]}),children:[e.jsx("p",{children:"This modal has a title, subtitle, and footer with action buttons."}),e.jsx("p",{children:"The footer is ideal for placing action buttons or other controls."})]})]})}},o={render:n=>{const[t,s]=c.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"c-btn c-btn--primary",onClick:()=>s(!0),style:{cursor:"pointer",padding:"8px 16px",display:"inline-block"},children:"Open Small Modal"}),e.jsx(d,{...n,isOpen:t,onOpenChange:s,title:"Small Modal",subtitle:"This is some description text.",size:"sm",footer:e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"c-btn c-btn--outline-secondary",onClick:()=>s(!1),style:{cursor:"pointer",padding:"8px 16px",display:"inline-block",marginRight:"8px"},children:"Cancel"}),e.jsx("div",{className:"c-btn c-btn--primary",onClick:()=>s(!1),style:{cursor:"pointer",padding:"8px 16px",display:"inline-block"},children:"OK"})]}),children:e.jsx("img",{src:"https://unsplash.it/g/400/200",alt:"Example image",style:{maxWidth:"100%"}})})]})}},r={render:()=>{const[n,t]=c.useState("md"),[s,i]=c.useState(!1);return e.jsxs("div",{className:"u-d-flex u-flex-column u-gap-4",children:[e.jsxs("div",{className:"u-d-flex u-gap-4",children:[e.jsx("div",{className:`c-btn ${n==="sm"?"c-btn--primary":"c-btn--secondary"}`,onClick:()=>{t("sm"),i(!0)},style:{cursor:"pointer",padding:"8px 16px",display:"inline-block"},children:"Small Modal"}),e.jsx("div",{className:`c-btn ${n==="md"?"c-btn--primary":"c-btn--secondary"}`,onClick:()=>{t("md"),i(!0)},style:{cursor:"pointer",padding:"8px 16px",display:"inline-block"},children:"Medium Modal"}),e.jsx("div",{className:`c-btn ${n==="lg"?"c-btn--primary":"c-btn--secondary"}`,onClick:()=>{t("lg"),i(!0)},style:{cursor:"pointer",padding:"8px 16px",display:"inline-block"},children:"Large Modal"}),e.jsx("div",{className:`c-btn ${n==="xl"?"c-btn--primary":"c-btn--secondary"}`,onClick:()=>{t("xl"),i(!0)},style:{cursor:"pointer",padding:"8px 16px",display:"inline-block"},children:"Extra Large Modal"})]}),e.jsxs(d,{isOpen:s,onOpenChange:i,title:`${n.toUpperCase()} Modal`,subtitle:"This modal demonstrates different size variants.",size:n,footer:e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"c-btn c-btn--outline-secondary",onClick:()=>i(!1),style:{cursor:"pointer",padding:"8px 16px",display:"inline-block",marginRight:"8px"},children:"Button"}),e.jsx("div",{className:"c-btn c-btn--primary",onClick:()=>i(!1),style:{cursor:"pointer",padding:"8px 16px",display:"inline-block"},children:"Button"})]}),children:[e.jsxs("p",{children:["This is a ",n.toUpperCase()," sized modal."]}),e.jsx("p",{children:"Modal sizes can be adjusted based on the content needs."})]})]})}};var p,m,u,b,x;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: args => {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <div className="c-btn c-btn--primary" onClick={() => setIsOpen(true)} style={{
        cursor: 'pointer',
        padding: '8px 16px',
        display: 'inline-block'
      }}>
          Open Modal
        </div>

        <Modal {...args} isOpen={isOpen} onOpenChange={setIsOpen} title="Title" subtitle="This is some description text. This text is only a placeholder and should be replaced with the actual content of the modal.">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, odio vitae
            faucibus luctus, elit nisi tincidunt justo, in malesuada enim nisl eget nisl.
            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
            egestas.
          </p>
        </Modal>
      </>;
  }
}`,...(u=(m=a.parameters)==null?void 0:m.docs)==null?void 0:u.source},description:{story:"Basic modal example with a button to trigger opening.",...(x=(b=a.parameters)==null?void 0:b.docs)==null?void 0:x.description}}};var h,y,g,f,O;l.parameters={...l.parameters,docs:{...(h=l.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: args => {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <div className="c-btn c-btn--primary" onClick={() => setIsOpen(true)} style={{
        cursor: 'pointer',
        padding: '8px 16px',
        display: 'inline-block'
      }}>
          Open Modal with Footer
        </div>

        <Modal {...args} isOpen={isOpen} onOpenChange={setIsOpen} title="Modal with Footer" subtitle="This is some description text. This text is only a placeholder and should be replaced with the actual content of the modal." footer={<>
              <div className="c-btn c-btn--outline-secondary" onClick={() => setIsOpen(false)} style={{
          cursor: 'pointer',
          padding: '8px 16px',
          display: 'inline-block',
          marginRight: '8px'
        }}>
                Cancel
              </div>
              <div className="c-btn c-btn--primary" onClick={() => {
          alert('Action confirmed!');
          setIsOpen(false);
        }} style={{
          cursor: 'pointer',
          padding: '8px 16px',
          display: 'inline-block'
        }}>
                Confirm
              </div>
            </>}>
          <p>This modal has a title, subtitle, and footer with action buttons.</p>
          <p>The footer is ideal for placing action buttons or other controls.</p>
        </Modal>
      </>;
  }
}`,...(g=(y=l.parameters)==null?void 0:y.docs)==null?void 0:g.source},description:{story:"Modal with a title, subtitle, and footer actions.",...(O=(f=l.parameters)==null?void 0:f.docs)==null?void 0:O.description}}};var k,v,C,j,M;o.parameters={...o.parameters,docs:{...(k=o.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: args => {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <div className="c-btn c-btn--primary" onClick={() => setIsOpen(true)} style={{
        cursor: 'pointer',
        padding: '8px 16px',
        display: 'inline-block'
      }}>
          Open Small Modal
        </div>

        <Modal {...args} isOpen={isOpen} onOpenChange={setIsOpen} title="Small Modal" subtitle="This is some description text." size="sm" footer={<>
              <div className="c-btn c-btn--outline-secondary" onClick={() => setIsOpen(false)} style={{
          cursor: 'pointer',
          padding: '8px 16px',
          display: 'inline-block',
          marginRight: '8px'
        }}>
                Cancel
              </div>
              <div className="c-btn c-btn--primary" onClick={() => setIsOpen(false)} style={{
          cursor: 'pointer',
          padding: '8px 16px',
          display: 'inline-block'
        }}>
                OK
              </div>
            </>}>
          <img src="https://unsplash.it/g/400/200" alt="Example image" style={{
          maxWidth: '100%'
        }} />
        </Modal>
      </>;
  }
}`,...(C=(v=o.parameters)==null?void 0:v.docs)==null?void 0:C.source},description:{story:"Small size modal variant.",...(M=(j=o.parameters)==null?void 0:j.docs)==null?void 0:M.description}}};var N,S,z,I,T;r.parameters={...r.parameters,docs:{...(N=r.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => {
    const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
    const [isOpen, setIsOpen] = useState(false);
    return <div className="u-d-flex u-flex-column u-gap-4">
        <div className="u-d-flex u-gap-4">
          <div className={\`c-btn \${size === 'sm' ? 'c-btn--primary' : 'c-btn--secondary'}\`} onClick={() => {
          setSize('sm');
          setIsOpen(true);
        }} style={{
          cursor: 'pointer',
          padding: '8px 16px',
          display: 'inline-block'
        }}>
            Small Modal
          </div>

          <div className={\`c-btn \${size === 'md' ? 'c-btn--primary' : 'c-btn--secondary'}\`} onClick={() => {
          setSize('md');
          setIsOpen(true);
        }} style={{
          cursor: 'pointer',
          padding: '8px 16px',
          display: 'inline-block'
        }}>
            Medium Modal
          </div>

          <div className={\`c-btn \${size === 'lg' ? 'c-btn--primary' : 'c-btn--secondary'}\`} onClick={() => {
          setSize('lg');
          setIsOpen(true);
        }} style={{
          cursor: 'pointer',
          padding: '8px 16px',
          display: 'inline-block'
        }}>
            Large Modal
          </div>

          <div className={\`c-btn \${size === 'xl' ? 'c-btn--primary' : 'c-btn--secondary'}\`} onClick={() => {
          setSize('xl');
          setIsOpen(true);
        }} style={{
          cursor: 'pointer',
          padding: '8px 16px',
          display: 'inline-block'
        }}>
            Extra Large Modal
          </div>
        </div>

        <Modal isOpen={isOpen} onOpenChange={setIsOpen} title={\`\${size.toUpperCase()} Modal\`} subtitle="This modal demonstrates different size variants." size={size} footer={<>
              <div className="c-btn c-btn--outline-secondary" onClick={() => setIsOpen(false)} style={{
          cursor: 'pointer',
          padding: '8px 16px',
          display: 'inline-block',
          marginRight: '8px'
        }}>
                Button
              </div>
              <div className="c-btn c-btn--primary" onClick={() => setIsOpen(false)} style={{
          cursor: 'pointer',
          padding: '8px 16px',
          display: 'inline-block'
        }}>
                Button
              </div>
            </>}>
          <p>This is a {size.toUpperCase()} sized modal.</p>
          <p>Modal sizes can be adjusted based on the content needs.</p>
        </Modal>
      </div>;
  }
}`,...(z=(S=r.parameters)==null?void 0:S.docs)==null?void 0:z.source},description:{story:"Different size variants of the modal component.",...(T=(I=r.parameters)==null?void 0:I.docs)==null?void 0:T.description}}};const R=["Basic","WithFooter","Small","Sizes"];export{a as Basic,r as Sizes,o as Small,l as WithFooter,R as __namedExportsOrder,E as default};
