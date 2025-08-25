import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{r as f}from"./index-BVDOR7y2.js";import{C as n}from"./Checkbox-BzZ8CJSP.js";import{F as t}from"./Form-D5hd4ooy.js";import{F as a}from"./FormGroup-BINhNO24.js";import{I as r}from"./Input-CPdh8XDx.js";import{R as j}from"./Radio-B6X5LtW0.js";import{S as o}from"./Select-lkWIRGDx.js";import{T as H}from"./Textarea-BZZsfKcc.js";import"./components-BrxBU25R.js";const le={title:"Components/Form",component:t,parameters:{layout:"centered"},argTypes:{disabled:{control:"boolean",description:"Whether the form is disabled"},className:{control:"text",description:"Additional CSS class names"},method:{control:{type:"select"},options:["get","post"],description:"Form submission method"},noValidate:{control:"boolean",description:"Whether to disable browser validation"},autoComplete:{control:"text",description:"Form autocomplete setting"}}},u={args:{children:void 0},render:l=>e.jsxs(t,{...l,children:[e.jsx(a,{label:"Name",htmlFor:"name",children:e.jsx(r,{id:"name",placeholder:"Enter your name"})}),e.jsx(a,{label:"Email",htmlFor:"email",children:e.jsx(r,{type:"email",id:"email",placeholder:"Enter your email"})}),e.jsx("button",{type:"submit",className:"c-btn c-btn--primary",children:"Submit"})]})},c={args:{children:void 0},render:()=>e.jsx("div",{style:{width:"500px"},children:e.jsxs(t,{children:[e.jsx("h2",{className:"u-mb-4",children:"Registration Form"}),e.jsx(a,{label:"Full Name",htmlFor:"fullName",required:!0,children:e.jsx(r,{id:"fullName",name:"fullName",placeholder:"Enter your full name",required:!0})}),e.jsx(a,{label:"Email Address",htmlFor:"email",required:!0,children:e.jsx(r,{type:"email",id:"email",name:"email",placeholder:"Enter your email address",required:!0})}),e.jsx(a,{label:"Password",htmlFor:"password",required:!0,children:e.jsx(r,{type:"password",id:"password",name:"password",placeholder:"Create a password",required:!0})}),e.jsx(a,{label:"Country",htmlFor:"country",children:e.jsx(o,{id:"country",name:"country",options:[{value:"us",label:"United States"},{value:"ca",label:"Canada"},{value:"mx",label:"Mexico"},{value:"uk",label:"United Kingdom"}],placeholder:"Select your country"})}),e.jsx(a,{label:"About yourself",htmlFor:"bio",children:e.jsx(H,{id:"bio",name:"bio",placeholder:"Tell us about yourself",rows:4})}),e.jsx(a,{children:e.jsx(n,{id:"terms",name:"terms",label:"I agree to the Terms and Conditions",required:!0})}),e.jsx(a,{label:"Preferred contact method",children:e.jsxs("div",{className:"u-d-flex u-flex-column u-gap-2",children:[e.jsx(j,{id:"contact-email",name:"contactMethod",value:"email",label:"Email",checked:!0}),e.jsx(j,{id:"contact-phone",name:"contactMethod",value:"phone",label:"Phone"}),e.jsx(j,{id:"contact-mail",name:"contactMethod",value:"mail",label:"Mail"})]})}),e.jsxs("div",{className:"u-d-flex u-gap-3 u-mt-4",children:[e.jsx("button",{type:"submit",className:"c-btn c-btn--primary",children:"Register"}),e.jsx("button",{type:"reset",className:"c-btn c-btn--outline-secondary",children:"Reset"})]})]})})},p={args:{children:void 0},render:()=>{const[l,g]=f.useState({username:"",email:"",message:"",agree:!1}),[s,d]=f.useState({username:!1,email:!1,message:!1,agree:!1}),[W,S]=f.useState(!1),m=x=>{const{name:i,value:F,type:B,checked:J}=x.target;g(y=>({...y,[i]:B==="checkbox"?J:F})),s[i]&&d(y=>({...y,[i]:!1}))},O=x=>{x.preventDefault();const i={username:!l.username,email:!l.email||!/^\S+@\S+\.\S+$/.test(l.email),message:!l.message,agree:!l.agree};d(i),!Object.values(i).some(F=>F)&&S(!0)};return W?e.jsxs("div",{className:"u-p-4 u-border u-border-success u-rounded u-bg-success-subtle",children:[e.jsx("h3",{children:"Thank you for your submission!"}),e.jsx("p",{children:"We received your message and will get back to you shortly."}),e.jsx("button",{className:"c-btn c-btn--outline-primary u-mt-3",onClick:()=>{g({username:"",email:"",message:"",agree:!1}),d({username:!1,email:!1,message:!1,agree:!1}),S(!1)},children:"Send another message"})]}):e.jsx("div",{style:{width:"500px"},children:e.jsxs(t,{onSubmit:O,children:[e.jsx("h2",{className:"u-mb-4",children:"Contact Us"}),e.jsx(a,{label:"Username",htmlFor:"username",required:!0,invalid:s.username,helperText:s.username?"Username is required":"",children:e.jsx(r,{id:"username",name:"username",value:l.username,onChange:m,placeholder:"Enter your username",invalid:s.username})}),e.jsx(a,{label:"Email",htmlFor:"email",required:!0,invalid:s.email,helperText:s.email?"Please enter a valid email address":"",children:e.jsx(r,{type:"email",id:"email",name:"email",value:l.email,onChange:m,placeholder:"Enter your email",invalid:s.email})}),e.jsx(a,{label:"Message",htmlFor:"message",required:!0,invalid:s.message,helperText:s.message?"Message is required":"",children:e.jsx(H,{id:"message",name:"message",value:l.message,onChange:m,placeholder:"Enter your message",rows:4,invalid:s.message})}),e.jsx(a,{invalid:s.agree,helperText:s.agree?"You must agree to the terms":"",children:e.jsx(n,{id:"agree",name:"agree",checked:l.agree,onChange:m,label:"I agree to the terms and conditions",invalid:s.agree})}),e.jsxs("div",{className:"u-d-flex u-gap-3 u-mt-4",children:[e.jsx("button",{type:"submit",className:"c-btn c-btn--primary",children:"Submit"}),e.jsx("button",{type:"button",className:"c-btn c-btn--outline-secondary",onClick:()=>{g({username:"",email:"",message:"",agree:!1}),d({username:!1,email:!1,message:!1,agree:!1})},children:"Clear"})]})]})})}},h={args:{disabled:!0,children:void 0},render:l=>e.jsxs(t,{...l,children:[e.jsx(a,{label:"Name",htmlFor:"name-disabled",children:e.jsx(r,{id:"name-disabled",placeholder:"Enter your name",disabled:!0})}),e.jsx(a,{label:"Email",htmlFor:"email-disabled",children:e.jsx(r,{type:"email",id:"email-disabled",placeholder:"Enter your email",disabled:!0})}),e.jsx(a,{label:"Country",htmlFor:"country-disabled",children:e.jsx(o,{id:"country-disabled",name:"country",options:[{value:"us",label:"United States"},{value:"ca",label:"Canada"}],placeholder:"Select your country",disabled:!0})}),e.jsx(a,{children:e.jsx(n,{id:"terms-disabled",name:"terms",label:"I agree to the Terms and Conditions",disabled:!0})}),e.jsx("button",{type:"submit",className:"c-btn c-btn--primary",disabled:!0,children:"Submit"})]})},b={args:{children:void 0},render:()=>e.jsx("div",{style:{width:"500px"},children:e.jsxs(t,{children:[e.jsx("h2",{className:"u-mb-4",children:"Form Validation"}),e.jsx(a,{label:"Valid Input",htmlFor:"valid-input",valid:!0,helperText:"This input is valid",children:e.jsx(r,{id:"valid-input",value:"John Doe",valid:!0})}),e.jsx(a,{label:"Invalid Input",htmlFor:"invalid-input",invalid:!0,helperText:"This input is invalid",children:e.jsx(r,{id:"invalid-input",value:"test",invalid:!0})}),e.jsx(a,{label:"Valid Select",htmlFor:"valid-select",valid:!0,helperText:"This select is valid",children:e.jsx(o,{id:"valid-select",options:[{value:"us",label:"United States"},{value:"ca",label:"Canada"}],value:"us",valid:!0})}),e.jsx(a,{label:"Invalid Select",htmlFor:"invalid-select",invalid:!0,helperText:"This select is invalid",children:e.jsx(o,{id:"invalid-select",options:[{value:"us",label:"United States"},{value:"ca",label:"Canada"}],invalid:!0})}),e.jsx(a,{valid:!0,helperText:"This checkbox is valid",children:e.jsx(n,{id:"valid-checkbox",label:"Valid Checkbox",checked:!0,onChange:()=>{},valid:!0})}),e.jsx(a,{invalid:!0,helperText:"This checkbox is invalid",children:e.jsx(n,{id:"invalid-checkbox",label:"Invalid Checkbox",invalid:!0})})]})})},v={args:{children:void 0},render:()=>e.jsx("div",{style:{width:"500px"},children:e.jsxs(t,{children:[e.jsx("h2",{className:"u-mb-4",children:"Input Sizes"}),e.jsx(a,{label:"Small Input",htmlFor:"small-input",size:"sm",children:e.jsx(r,{id:"small-input",placeholder:"Small input",size:"sm"})}),e.jsx(a,{label:"Medium Input (Default)",htmlFor:"medium-input",children:e.jsx(r,{id:"medium-input",placeholder:"Medium input"})}),e.jsx(a,{label:"Large Input",htmlFor:"large-input",size:"lg",children:e.jsx(r,{id:"large-input",placeholder:"Large input",size:"lg"})}),e.jsx(a,{label:"Small Select",htmlFor:"small-select",size:"sm",children:e.jsx(o,{id:"small-select",options:[{value:"us",label:"United States"},{value:"ca",label:"Canada"}],placeholder:"Small select",size:"sm"})}),e.jsx(a,{label:"Large Select",htmlFor:"large-select",size:"lg",children:e.jsx(o,{id:"large-select",options:[{value:"us",label:"United States"},{value:"ca",label:"Canada"}],placeholder:"Large select",size:"lg"})})]})})};var C,G,T;u.parameters={...u.parameters,docs:{...(C=u.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    children: undefined
  },
  render: args => <Form {...args}>
      <FormGroup label="Name" htmlFor="name">
        <Input id="name" placeholder="Enter your name" />
      </FormGroup>
      <FormGroup label="Email" htmlFor="email">
        <Input type="email" id="email" placeholder="Enter your email" />
      </FormGroup>
      <button type="submit" className="c-btn c-btn--primary">
        Submit
      </button>
    </Form>
}`,...(T=(G=u.parameters)==null?void 0:G.docs)==null?void 0:T.source}}};var E,I,N;c.parameters={...c.parameters,docs:{...(E=c.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    children: undefined
  },
  render: () => <div style={{
    width: '500px'
  }}>
      <Form>
        <h2 className="u-mb-4">Registration Form</h2>

        <FormGroup label="Full Name" htmlFor="fullName" required>
          <Input id="fullName" name="fullName" placeholder="Enter your full name" required />
        </FormGroup>

        <FormGroup label="Email Address" htmlFor="email" required>
          <Input type="email" id="email" name="email" placeholder="Enter your email address" required />
        </FormGroup>

        <FormGroup label="Password" htmlFor="password" required>
          <Input type="password" id="password" name="password" placeholder="Create a password" required />
        </FormGroup>

        <FormGroup label="Country" htmlFor="country">
          <Select id="country" name="country" options={[{
          value: 'us',
          label: 'United States'
        }, {
          value: 'ca',
          label: 'Canada'
        }, {
          value: 'mx',
          label: 'Mexico'
        }, {
          value: 'uk',
          label: 'United Kingdom'
        }]} placeholder="Select your country" />
        </FormGroup>

        <FormGroup label="About yourself" htmlFor="bio">
          <Textarea id="bio" name="bio" placeholder="Tell us about yourself" rows={4} />
        </FormGroup>

        <FormGroup>
          <Checkbox id="terms" name="terms" label="I agree to the Terms and Conditions" required />
        </FormGroup>

        <FormGroup label="Preferred contact method">
          <div className="u-d-flex u-flex-column u-gap-2">
            <Radio id="contact-email" name="contactMethod" value="email" label="Email" checked />
            <Radio id="contact-phone" name="contactMethod" value="phone" label="Phone" />
            <Radio id="contact-mail" name="contactMethod" value="mail" label="Mail" />
          </div>
        </FormGroup>

        <div className="u-d-flex u-gap-3 u-mt-4">
          <button type="submit" className="c-btn c-btn--primary">
            Register
          </button>
          <button type="reset" className="c-btn c-btn--outline-secondary">
            Reset
          </button>
        </div>
      </Form>
    </div>
}`,...(N=(I=c.parameters)==null?void 0:I.docs)==null?void 0:N.source}}};var k,w,q;p.parameters={...p.parameters,docs:{...(k=p.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    children: undefined
  },
  render: () => {
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      message: '',
      agree: false
    });
    const [errors, setErrors] = useState({
      username: false,
      email: false,
      message: false,
      agree: false
    });
    const [submitted, setSubmitted] = useState(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const {
        name,
        value,
        type,
        checked
      } = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));

      // Clear error on change
      if (errors[name as keyof typeof errors]) {
        setErrors(prev => ({
          ...prev,
          [name]: false
        }));
      }
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Validate
      const newErrors = {
        username: !formData.username,
        email: !formData.email || !/^\\S+@\\S+\\.\\S+$/.test(formData.email),
        message: !formData.message,
        agree: !formData.agree
      };
      setErrors(newErrors);

      // Check if any errors
      if (Object.values(newErrors).some(error => error)) {
        return;
      }

      // Form is valid
      setSubmitted(true);
    };
    if (submitted) {
      return <div className="u-p-4 u-border u-border-success u-rounded u-bg-success-subtle">
          <h3>Thank you for your submission!</h3>
          <p>We received your message and will get back to you shortly.</p>
          <button className="c-btn c-btn--outline-primary u-mt-3" onClick={() => {
          setFormData({
            username: '',
            email: '',
            message: '',
            agree: false
          });
          setErrors({
            username: false,
            email: false,
            message: false,
            agree: false
          });
          setSubmitted(false);
        }}>
            Send another message
          </button>
        </div>;
    }
    return <div style={{
      width: '500px'
    }}>
        <Form onSubmit={handleSubmit}>
          <h2 className="u-mb-4">Contact Us</h2>

          <FormGroup label="Username" htmlFor="username" required invalid={errors.username} helperText={errors.username ? 'Username is required' : ''}>
            <Input id="username" name="username" value={formData.username} onChange={handleChange} placeholder="Enter your username" invalid={errors.username} />
          </FormGroup>

          <FormGroup label="Email" htmlFor="email" required invalid={errors.email} helperText={errors.email ? 'Please enter a valid email address' : ''}>
            <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" invalid={errors.email} />
          </FormGroup>

          <FormGroup label="Message" htmlFor="message" required invalid={errors.message} helperText={errors.message ? 'Message is required' : ''}>
            <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Enter your message" rows={4} invalid={errors.message} />
          </FormGroup>

          <FormGroup invalid={errors.agree} helperText={errors.agree ? 'You must agree to the terms' : ''}>
            <Checkbox id="agree" name="agree" checked={formData.agree} onChange={handleChange} label="I agree to the terms and conditions" invalid={errors.agree} />
          </FormGroup>

          <div className="u-d-flex u-gap-3 u-mt-4">
            <button type="submit" className="c-btn c-btn--primary">
              Submit
            </button>
            <button type="button" className="c-btn c-btn--outline-secondary" onClick={() => {
            setFormData({
              username: '',
              email: '',
              message: '',
              agree: false
            });
            setErrors({
              username: false,
              email: false,
              message: false,
              agree: false
            });
          }}>
              Clear
            </button>
          </div>
        </Form>
      </div>;
  }
}`,...(q=(w=p.parameters)==null?void 0:w.docs)==null?void 0:q.source}}};var D,M,z;h.parameters={...h.parameters,docs:{...(D=h.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    disabled: true,
    children: undefined
  },
  render: args => <Form {...args}>
      <FormGroup label="Name" htmlFor="name-disabled">
        <Input id="name-disabled" placeholder="Enter your name" disabled />
      </FormGroup>
      <FormGroup label="Email" htmlFor="email-disabled">
        <Input type="email" id="email-disabled" placeholder="Enter your email" disabled />
      </FormGroup>
      <FormGroup label="Country" htmlFor="country-disabled">
        <Select id="country-disabled" name="country" options={[{
        value: 'us',
        label: 'United States'
      }, {
        value: 'ca',
        label: 'Canada'
      }]} placeholder="Select your country" disabled />
      </FormGroup>
      <FormGroup>
        <Checkbox id="terms-disabled" name="terms" label="I agree to the Terms and Conditions" disabled />
      </FormGroup>
      <button type="submit" className="c-btn c-btn--primary" disabled>
        Submit
      </button>
    </Form>
}`,...(z=(M=h.parameters)==null?void 0:M.docs)==null?void 0:z.source}}};var U,R,L;b.parameters={...b.parameters,docs:{...(U=b.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    children: undefined
  },
  render: () => <div style={{
    width: '500px'
  }}>
      <Form>
        <h2 className="u-mb-4">Form Validation</h2>

        <FormGroup label="Valid Input" htmlFor="valid-input" valid={true} helperText="This input is valid">
          <Input id="valid-input" value="John Doe" valid={true} />
        </FormGroup>

        <FormGroup label="Invalid Input" htmlFor="invalid-input" invalid={true} helperText="This input is invalid">
          <Input id="invalid-input" value="test" invalid={true} />
        </FormGroup>

        <FormGroup label="Valid Select" htmlFor="valid-select" valid={true} helperText="This select is valid">
          <Select id="valid-select" options={[{
          value: 'us',
          label: 'United States'
        }, {
          value: 'ca',
          label: 'Canada'
        }]} value="us" valid={true} />
        </FormGroup>

        <FormGroup label="Invalid Select" htmlFor="invalid-select" invalid={true} helperText="This select is invalid">
          <Select id="invalid-select" options={[{
          value: 'us',
          label: 'United States'
        }, {
          value: 'ca',
          label: 'Canada'
        }]} invalid={true} />
        </FormGroup>

        <FormGroup valid={true} helperText="This checkbox is valid">
          <Checkbox id="valid-checkbox" label="Valid Checkbox" checked={true} onChange={() => {}} valid={true} />
        </FormGroup>

        <FormGroup invalid={true} helperText="This checkbox is invalid">
          <Checkbox id="invalid-checkbox" label="Invalid Checkbox" invalid={true} />
        </FormGroup>
      </Form>
    </div>
}`,...(L=(R=b.parameters)==null?void 0:R.docs)==null?void 0:L.source}}};var V,P,A;v.parameters={...v.parameters,docs:{...(V=v.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    children: undefined
  },
  render: () => <div style={{
    width: '500px'
  }}>
      <Form>
        <h2 className="u-mb-4">Input Sizes</h2>

        <FormGroup label="Small Input" htmlFor="small-input" size="sm">
          <Input id="small-input" placeholder="Small input" size="sm" />
        </FormGroup>

        <FormGroup label="Medium Input (Default)" htmlFor="medium-input">
          <Input id="medium-input" placeholder="Medium input" />
        </FormGroup>

        <FormGroup label="Large Input" htmlFor="large-input" size="lg">
          <Input id="large-input" placeholder="Large input" size="lg" />
        </FormGroup>

        <FormGroup label="Small Select" htmlFor="small-select" size="sm">
          <Select id="small-select" options={[{
          value: 'us',
          label: 'United States'
        }, {
          value: 'ca',
          label: 'Canada'
        }]} placeholder="Small select" size="sm" />
        </FormGroup>

        <FormGroup label="Large Select" htmlFor="large-select" size="lg">
          <Select id="large-select" options={[{
          value: 'us',
          label: 'United States'
        }, {
          value: 'ca',
          label: 'Canada'
        }]} placeholder="Large select" size="lg" />
        </FormGroup>
      </Form>
    </div>
}`,...(A=(P=v.parameters)==null?void 0:P.docs)==null?void 0:A.source}}};const se=["Basic","CompleteForm","Interactive","Disabled","ValidationStates","InputSizes"];export{u as Basic,c as CompleteForm,h as Disabled,v as InputSizes,p as Interactive,b as ValidationStates,se as __namedExportsOrder,le as default};
