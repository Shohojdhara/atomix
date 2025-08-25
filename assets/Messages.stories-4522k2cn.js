import{j as H}from"./jsx-runtime-BjG_zV1W.js";import{r as y}from"./index-BVDOR7y2.js";import{M}from"./Messages-DwlibaMP.js";import"./Icon-k4CeN--q.js";import"./SpeakerX.es-Cg-mjUf1.js";import"./Avatar-DnD2V9sG.js";import"./components-BrxBU25R.js";const V={title:"Components/Messages",component:M,parameters:{layout:"centered",docs:{description:{component:"Messages component for displaying chat conversations with support for text messages, images, and file attachments."}}},tags:["autodocs"],argTypes:{messages:{control:"object"},width:{control:"text"},bodyHeight:{control:"text"},otherName:{control:"text"},otherAvatar:{control:"text"},selfAvatar:{control:"text"},placeholder:{control:"text"},disabled:{control:"boolean"}}},e={args:{width:"800px",bodyHeight:"400px",otherName:"Meghan",otherAvatar:"https://images.unsplash.com/photo-1648074074225-16189e7ad8c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80",selfAvatar:"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80",messages:[{id:"1",text:"Hi, I hope you're having a good day.",time:"12:12 AM",isSelf:!1},{id:"2",text:"I'm writing to remind you of your appointment tomorrow at 10 am. Please confirm if you can make it or reschedule if needed.",time:"12:13 AM",isSelf:!1},{id:"3",image:"https://picsum.photos/g/400/260",time:"12:14 AM",isSelf:!1},{id:"4",file:{name:"File ABCDE.pdf",size:"1.2 MB"},time:"12:15 AM",isSelf:!1},{id:"5",text:"Sure, I'll be there",time:"12:18 AM",isSelf:!0},{id:"6",file:{name:"Meeting Notes.pdf",size:"2.4 MB"},time:"12:19 AM",isSelf:!0},{id:"7",image:"https://picsum.photos/400/260",time:"12:20 AM",isSelf:!0}]}},t={args:{width:"800px",bodyHeight:"400px",otherName:"Meghan",otherAvatar:"https://images.unsplash.com/photo-1648074074225-16189e7ad8c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80",selfAvatar:"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80",messages:[]}},s={args:{...e.args,disabled:!0}},a={render:o=>{const[i,w]=y.useState(o.messages||[]),D=A=>{const b={id:`msg-${Date.now()}`,text:A,time:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),isSelf:!0};w([...i,b])};return H.jsx(M,{...o,messages:i,onSendMessage:D})},args:{width:"800px",bodyHeight:"400px",otherName:"Meghan",otherAvatar:"https://images.unsplash.com/photo-1648074074225-16189e7ad8c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80",selfAvatar:"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80",messages:[{id:"1",text:"Hi there! How can I help you today?",time:"12:00 PM",isSelf:!1}],placeholder:"Type your message here..."},parameters:{docs:{description:{story:"An interactive example where you can send messages and see them appear in the chat."}}}};var r,n,m;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`{
  args: {
    width: '800px',
    bodyHeight: '400px',
    otherName: 'Meghan',
    otherAvatar: 'https://images.unsplash.com/photo-1648074074225-16189e7ad8c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80',
    selfAvatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80',
    messages: [{
      id: '1',
      text: "Hi, I hope you're having a good day.",
      time: '12:12 AM',
      isSelf: false
    }, {
      id: '2',
      text: "I'm writing to remind you of your appointment tomorrow at 10 am. Please confirm if you can make it or reschedule if needed.",
      time: '12:13 AM',
      isSelf: false
    }, {
      id: '3',
      image: 'https://picsum.photos/g/400/260',
      time: '12:14 AM',
      isSelf: false
    }, {
      id: '4',
      file: {
        name: 'File ABCDE.pdf',
        size: '1.2 MB'
      },
      time: '12:15 AM',
      isSelf: false
    }, {
      id: '5',
      text: "Sure, I'll be there",
      time: '12:18 AM',
      isSelf: true
    }, {
      id: '6',
      file: {
        name: 'Meeting Notes.pdf',
        size: '2.4 MB'
      },
      time: '12:19 AM',
      isSelf: true
    }, {
      id: '7',
      image: 'https://picsum.photos/400/260',
      time: '12:20 AM',
      isSelf: true
    }]
  }
}`,...(m=(n=e.parameters)==null?void 0:n.docs)==null?void 0:m.source}}};var f,d,p;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    width: '800px',
    bodyHeight: '400px',
    otherName: 'Meghan',
    otherAvatar: 'https://images.unsplash.com/photo-1648074074225-16189e7ad8c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80',
    selfAvatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80',
    messages: []
  }
}`,...(p=(d=t.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};var l,c,h;s.parameters={...s.parameters,docs:{...(l=s.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    disabled: true
  }
}`,...(h=(c=s.parameters)==null?void 0:c.docs)==null?void 0:h.source}}};var x,g,u;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: args => {
    const [messages, setMessages] = useState<MessageItem[]>(args.messages || []);
    const handleSendMessage = (text: string) => {
      const newMessage: MessageItem = {
        id: \`msg-\${Date.now()}\`,
        text,
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        }),
        isSelf: true
      };
      setMessages([...messages, newMessage]);
    };
    return <Messages {...args} messages={messages} onSendMessage={handleSendMessage} />;
  },
  args: {
    width: '800px',
    bodyHeight: '400px',
    otherName: 'Meghan',
    otherAvatar: 'https://images.unsplash.com/photo-1648074074225-16189e7ad8c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80',
    selfAvatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80',
    messages: [{
      id: '1',
      text: 'Hi there! How can I help you today?',
      time: '12:00 PM',
      isSelf: false
    }],
    placeholder: 'Type your message here...'
  },
  parameters: {
    docs: {
      description: {
        story: 'An interactive example where you can send messages and see them appear in the chat.'
      }
    }
  }
}`,...(u=(g=a.parameters)==null?void 0:g.docs)==null?void 0:u.source}}};const W=["Default","EmptyChat","DisabledChat","Interactive"];export{e as Default,s as DisabledChat,t as EmptyChat,a as Interactive,W as __namedExportsOrder,V as default};
