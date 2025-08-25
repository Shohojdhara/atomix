import{j as s}from"./jsx-runtime-BjG_zV1W.js";import{r as j}from"./index-BVDOR7y2.js";import{g as l}from"./index-kdCLY6-3.js";import{u as z}from"./components-BrxBU25R.js";import{I as E}from"./Icon-k4CeN--q.js";import"./SpeakerX.es-Cg-mjUf1.js";function de(i){const p={items:[],size:"md",...i},[c,u]=j.useState(p.items||[]),[f,x]=j.useState(""),T=o=>{const{size:e=p.size,className:a="",disabled:n=!1}=o,L=e==="md"?"":`c-todo--${e}`,k=n?"c-todo--disabled":"";return`${z.CLASSES.BASE} ${L} ${k} ${a}`.trim()},_=o=>{const e=o.completed?z.CLASSES.COMPLETED:"";return`${z.CLASSES.ITEM} ${e}`.trim()},b=o=>{if(!o.trim())return null;const e={id:l(),text:o.trim(),completed:!1};return u(a=>[...a,e]),x(""),e};return{items:c,inputText:f,setInputText:x,addTodo:b,toggleTodo:o=>{let e=null;return u(a=>a.map(n=>n.id===o?(e={...n,completed:!n.completed},e):n)),e},deleteTodo:o=>{const e=c.length;return u(a=>a.filter(n=>n.id!==o)),c.length!==e},handleSubmit:(o,e)=>{if(o.preventDefault(),!f.trim())return;const a=b(f);a&&e&&e(a.text)},generateTodoClasses:T,generateItemClasses:_,getFilteredItems:(o=!0)=>o?c:c.filter(e=>!e.completed)}}const w=({items:i=[],title:p="Todo List",onAddTodo:c,onToggleTodo:u,onDeleteTodo:f,size:x="md",placeholder:T="Add a new todo",showCompleted:_=!0,className:b="",disabled:r=!1})=>{const{inputText:g,setInputText:U,generateTodoClasses:A,generateItemClasses:o}=de({items:i,title:p,size:x,placeholder:T,showCompleted:_,disabled:r}),[e,a]=j.useState(i);j.useEffect(()=>{a(i)},[i]);const n=t=>{r||(a(h=>h.map(m=>m.id===t?{...m,completed:!m.completed}:m)),u&&u(t))},L=t=>{r||(a(h=>h.filter(m=>m.id!==t)),f&&f(t))},k=t=>{if(t.preventDefault(),r||!g.trim())return;const h={id:l(),text:g.trim(),completed:!1};a(m=>[...m,h]),c&&c(g),U("")},q=_?e:e.filter(t=>!t.completed),le=A({size:x,className:b,disabled:r});return s.jsxs("div",{className:le,children:[p&&s.jsx("h2",{className:"c-todo__title",children:p}),s.jsx("form",{className:"c-todo__form",onSubmit:k,children:s.jsxs("div",{className:"c-todo__form-group",children:[s.jsx("input",{type:"text",className:"c-todo__input c-input",placeholder:T,value:g,onChange:t=>U(t.target.value),disabled:r,"aria-label":"Add a new todo"}),s.jsx("button",{type:"submit",className:"c-todo__add-btn c-btn c-btn--primary",disabled:r||!g.trim(),"aria-label":"Add todo",children:s.jsx(E,{name:"Plus",size:"sm"})})]})}),s.jsx("ul",{className:"c-todo__list",children:q.length===0?s.jsx("li",{className:"c-todo__empty",children:"No items to display"}):q.map(t=>s.jsx("li",{className:o(t),children:s.jsxs("div",{className:"c-todo__item-content",children:[s.jsxs("label",{className:"c-todo__checkbox-label",children:[s.jsx("input",{type:"checkbox",className:"c-todo__checkbox c-checkbox",checked:t.completed,onChange:()=>n(t.id),disabled:r,"aria-label":`Mark "${t.text}" as ${t.completed?"incomplete":"complete"}`}),s.jsx("span",{className:"c-todo__item-text",children:t.text})]}),s.jsx("button",{type:"button",className:"c-todo__delete-btn c-btn c-btn--error c-btn--sm",onClick:()=>L(t.id),disabled:r,"aria-label":`Delete "${t.text}"`,children:s.jsx(E,{name:"Trash",size:"sm"})})]})},t.id))})]})};w.displayName="Todo";try{w.displayName="Todo",w.__docgenInfo={description:"",displayName:"Todo",props:{items:{defaultValue:{value:"[]"},description:"List of todo items",name:"items",required:!1,type:{name:"TodoItem[]"}},onAddTodo:{defaultValue:null,description:"Callback when a todo item is added",name:"onAddTodo",required:!1,type:{name:"((text: string) => void)"}},onToggleTodo:{defaultValue:null,description:"Callback when a todo item is toggled",name:"onToggleTodo",required:!1,type:{name:"((id: string) => void)"}},onDeleteTodo:{defaultValue:null,description:"Callback when a todo item is deleted",name:"onDeleteTodo",required:!1,type:{name:"((id: string) => void)"}},title:{defaultValue:{value:"Todo List"},description:"Title of the todo list",name:"title",required:!1,type:{name:"string"}},size:{defaultValue:{value:"md"},description:"Size variant for the todo component",name:"size",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}},placeholder:{defaultValue:{value:"Add a new todo"},description:"Placeholder text for the new todo input",name:"placeholder",required:!1,type:{name:"string"}},showCompleted:{defaultValue:{value:"true"},description:"Whether to show the completed todos",name:"showCompleted",required:!1,type:{name:"boolean"}},className:{defaultValue:{value:""},description:"Additional CSS class names",name:"className",required:!1,type:{name:"string"}},disabled:{defaultValue:{value:"false"},description:"Component disabled state",name:"disabled",required:!1,type:{name:"boolean"}}}}}catch{}try{TodoProps.displayName="TodoProps",TodoProps.__docgenInfo={description:"Todo component properties",displayName:"TodoProps",props:{}}}catch{}const ge={title:"Components/Todo",component:w,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{items:{control:"object"},title:{control:"text"},size:{control:{type:"select"},options:["sm","md","lg"]},placeholder:{control:"text"},showCompleted:{control:"boolean"},className:{control:"text"},disabled:{control:"boolean"}}},d={args:{items:[{id:"1",text:"Learn React",completed:!0},{id:"2",text:"Build a todo app",completed:!1},{id:"3",text:"Deploy to production",completed:!1}],title:"Todo List",placeholder:"Add a new task",size:"md",showCompleted:!0,disabled:!1}},y={args:{items:[{id:l(),text:"Complete project documentation",completed:!1},{id:l(),text:"Review pull requests",completed:!0},{id:l(),text:"Update dependencies",completed:!1},{id:l(),text:"Write unit tests",completed:!1},{id:l(),text:"Fix accessibility issues",completed:!0}],title:"Project Tasks",showCompleted:!0}},C={args:{...d.args,size:"sm"}},I={args:{...d.args,size:"lg"}},S={args:{items:[{id:l(),text:"Learn React",completed:!0},{id:l(),text:"Build a todo app",completed:!1},{id:l(),text:"Deploy to production",completed:!1}],showCompleted:!1,title:"Active Tasks"}},D={args:{...d.args,disabled:!0}},v={args:{...d.args,title:"My Custom Todo List"}},N={args:{...d.args,title:""}};var P,V,$;d.parameters={...d.parameters,docs:{...(P=d.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    items: [{
      id: '1',
      text: 'Learn React',
      completed: true
    }, {
      id: '2',
      text: 'Build a todo app',
      completed: false
    }, {
      id: '3',
      text: 'Deploy to production',
      completed: false
    }],
    title: 'Todo List',
    placeholder: 'Add a new task',
    size: 'md',
    showCompleted: true,
    disabled: false
  }
}`,...($=(V=d.parameters)==null?void 0:V.docs)==null?void 0:$.source}}};var M,R,B;y.parameters={...y.parameters,docs:{...(M=y.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    items: [{
      id: generateUUID(),
      text: 'Complete project documentation',
      completed: false
    }, {
      id: generateUUID(),
      text: 'Review pull requests',
      completed: true
    }, {
      id: generateUUID(),
      text: 'Update dependencies',
      completed: false
    }, {
      id: generateUUID(),
      text: 'Write unit tests',
      completed: false
    }, {
      id: generateUUID(),
      text: 'Fix accessibility issues',
      completed: true
    }],
    title: 'Project Tasks',
    showCompleted: true
  }
}`,...(B=(R=y.parameters)==null?void 0:R.docs)==null?void 0:B.source}}};var F,W,O;C.parameters={...C.parameters,docs:{...(F=C.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    size: 'sm'
  }
}`,...(O=(W=C.parameters)==null?void 0:W.docs)==null?void 0:O.source}}};var H,G,J;I.parameters={...I.parameters,docs:{...(H=I.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    size: 'lg'
  }
}`,...(J=(G=I.parameters)==null?void 0:G.docs)==null?void 0:J.source}}};var K,Q,X;S.parameters={...S.parameters,docs:{...(K=S.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    items: [{
      id: generateUUID(),
      text: 'Learn React',
      completed: true
    }, {
      id: generateUUID(),
      text: 'Build a todo app',
      completed: false
    }, {
      id: generateUUID(),
      text: 'Deploy to production',
      completed: false
    }],
    showCompleted: false,
    title: 'Active Tasks'
  }
}`,...(X=(Q=S.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};var Y,Z,ee;D.parameters={...D.parameters,docs:{...(Y=D.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    disabled: true
  }
}`,...(ee=(Z=D.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};var te,oe,se;v.parameters={...v.parameters,docs:{...(te=v.parameters)==null?void 0:te.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    title: 'My Custom Todo List'
  }
}`,...(se=(oe=v.parameters)==null?void 0:oe.docs)==null?void 0:se.source}}};var ae,re,ne;N.parameters={...N.parameters,docs:{...(ae=N.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    title: ''
  }
}`,...(ne=(re=N.parameters)==null?void 0:re.docs)==null?void 0:ne.source}}};const xe=["Default","WithManyItems","Small","Large","HideCompleted","Disabled","CustomTitle","NoTitle"];export{v as CustomTitle,d as Default,D as Disabled,S as HideCompleted,I as Large,N as NoTitle,C as Small,y as WithManyItems,xe as __namedExportsOrder,ge as default};
