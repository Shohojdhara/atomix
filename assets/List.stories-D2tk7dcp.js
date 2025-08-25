import{j as t}from"./jsx-runtime-BjG_zV1W.js";import{e as u,g as I}from"./index-BVDOR7y2.js";import{L as E,w as q}from"./components-BrxBU25R.js";const l=({children:a,variant:i="default",className:r="",...d})=>{const o=[E.BASE_CLASS,i!=="default"&&`c-list--${i}`,r].filter(Boolean).join(" "),e=["number","text"].includes(i)?"ol":"ul";return t.jsx(e,{className:o,...d,children:u.Children.map(a,s=>u.isValidElement(s)?t.jsx("li",{className:"c-list__item",children:s}):t.jsx("li",{className:"c-list__item",children:s}))})};l.displayName="List";try{l.displayName="List",l.__docgenInfo={description:"",displayName:"List",props:{items:{defaultValue:null,description:"List items",name:"items",required:!1,type:{name:"ReactNode[]"}},variant:{defaultValue:{value:"default"},description:"List variant",name:"variant",required:!1,type:{name:"enum",value:[{value:'"number"'},{value:'"text"'},{value:'"dash"'}]}},size:{defaultValue:null,description:"List size",name:"size",required:!1,type:{name:"enum",value:[{value:'"md"'},{value:'"sm"'},{value:'"lg"'}]}},ordered:{defaultValue:null,description:"Whether the list is ordered",name:"ordered",required:!1,type:{name:"boolean"}},inline:{defaultValue:null,description:"Whether to display list items inline",name:"inline",required:!1,type:{name:"boolean"}},className:{defaultValue:{value:""},description:"Additional CSS class names",name:"className",required:!1,type:{name:"string"}},disabled:{defaultValue:null,description:"Component disabled state",name:"disabled",required:!1,type:{name:"boolean"}}}}}catch{}try{ListProps.displayName="ListProps",ListProps.__docgenInfo={description:`;
List component properties`,displayName:"ListProps",props:{}}}catch{}var G={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(a){(function(){var i={}.hasOwnProperty;function r(){for(var e="",s=0;s<arguments.length;s++){var n=arguments[s];n&&(e=o(e,d(n)))}return e}function d(e){if(typeof e=="string"||typeof e=="number")return e;if(typeof e!="object")return"";if(Array.isArray(e))return r.apply(null,e);if(e.toString!==Object.prototype.toString&&!e.toString.toString().includes("[native code]"))return e.toString();var s="";for(var n in e)i.call(e,n)&&e[n]&&(s=o(s,n));return s}function o(e,s){return s?e?e+" "+s:e+s:e}a.exports?(r.default=r,a.exports=r):window.classNames=r})()})(G);var A=G.exports;const w=I(A),c=({children:a,className:i="",variant:r="default"})=>{const d=w(q.BASE_CLASS,i),o=u.Children.toArray(a).filter(e=>u.isValidElement(e)&&e.type===l);return t.jsx("div",{className:d,children:o.map((e,s)=>{const n=e.props;return u.cloneElement(e,{key:s,variant:(n==null?void 0:n.variant)??r})})})};c.displayName="ListGroup";try{c.displayName="ListGroup",c.__docgenInfo={description:"",displayName:"ListGroup",props:{children:{defaultValue:null,description:"List group children",name:"children",required:!1,type:{name:"ReactNode"}},variant:{defaultValue:{value:"default"},description:"List group variant",name:"variant",required:!1,type:{name:"enum",value:[{value:'"link"'},{value:'"primary"'},{value:'"secondary"'},{value:'"tertiary"'},{value:'"invert"'},{value:'"brand"'},{value:'"error"'},{value:'"success"'},{value:'"warning"'},{value:'"info"'},{value:'"light"'},{value:'"dark"'},{value:'"outline-primary"'},{value:'"outline-secondary"'},{value:'"outline-tertiary"'},{value:'"outline-invert"'},{value:'"outline-brand"'},{value:'"outline-error"'},{value:'"outline-success"'},{value:'"outline-warning"'},{value:'"outline-info"'},{value:'"outline-light"'},{value:'"outline-dark"'}]}},size:{defaultValue:null,description:"List group size",name:"size",required:!1,type:{name:"enum",value:[{value:'"md"'},{value:'"sm"'},{value:'"lg"'}]}},className:{defaultValue:{value:""},description:"Additional CSS class names",name:"className",required:!1,type:{name:"string"}},disabled:{defaultValue:null,description:"Component disabled state",name:"disabled",required:!1,type:{name:"boolean"}}}}}catch{}const k={title:"Components/List",component:l,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{variant:{control:{type:"select"},options:["default","dash","number","text"],description:"List style variant"},children:{control:{type:"text"},description:"List items content"},className:{control:"text",description:"Additional CSS class names"}}},h=["item 1","item 2","item 3"],$={marginBottom:"16px"},x={fontWeight:"normal",marginBottom:"8px"},V=({children:a})=>t.jsx("span",{children:a}),f=({variant:a})=>t.jsx(t.Fragment,{children:h.map((i,r)=>t.jsx(V,{children:a==="number"?`${r+1}. ${i}`:i},r))}),T=(a,i)=>t.jsxs("div",{style:$,children:[t.jsx("h3",{style:x,children:a}),t.jsx(l,{variant:i,children:t.jsx(f,{variant:i})})]}),p={args:{children:h}},m={render:()=>t.jsx("div",{className:"u-d-flex u-flex-column u-gap-8",children:["Default","Dash","Number","Text"].map((a,i)=>{const r=i===0?"default":a.toLowerCase();return T(`${a} List`,r)})})},v={render:()=>{const a=[{title:"Standard",compact:!1,divided:!1},{title:"Compact",compact:!0,divided:!1},{title:"Divided",compact:!1,divided:!0}];return t.jsxs("div",{className:"u-d-flex u-flex-column u-gap-8",children:[t.jsxs("div",{children:[t.jsx("h3",{style:x,children:"Mixed Variants ListGroup"}),t.jsxs(c,{children:[t.jsx(l,{variant:"dash",children:t.jsx(f,{variant:"dash"})}),t.jsx(l,{variant:"number",children:t.jsx(f,{variant:"number"})}),t.jsx(l,{variant:"text",children:t.jsx(f,{variant:"text"})})]})]}),a.map(({title:i,compact:r,divided:d})=>t.jsxs("div",{children:[t.jsxs("h3",{style:x,children:[i," ListGroup"]}),t.jsx(c,{children:h.map((o,e)=>t.jsx(l,{children:[1,2].map(s=>t.jsx(V,{children:`${o.charAt(0).toUpperCase()+o.slice(1)} - item ${s}`},s))},e))})]},i))]})}};var y,L,S;p.parameters={...p.parameters,docs:{...(y=p.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    children: ITEMS
  }
}`,...(S=(L=p.parameters)==null?void 0:L.docs)==null?void 0:S.source}}};var g,j,_;m.parameters={...m.parameters,docs:{...(g=m.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => {
    return <div className="u-d-flex u-flex-column u-gap-8">
        {['Default', 'Dash', 'Number', 'Text'].map((title, index) => {
        const variant = index === 0 ? 'default' : title.toLowerCase();
        return createListSection(\`\${title} List\`, variant);
      })}
      </div>;
  }
}`,...(_=(j=m.parameters)==null?void 0:j.docs)==null?void 0:_.source}}};var N,b,C;v.parameters={...v.parameters,docs:{...(N=v.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => {
    const listGroupConfig = [{
      title: 'Standard',
      compact: false,
      divided: false
    }, {
      title: 'Compact',
      compact: true,
      divided: false
    }, {
      title: 'Divided',
      compact: false,
      divided: true
    }];
    return <div className="u-d-flex u-flex-column u-gap-8">
        <div>
          <h3 style={titleStyle}>Mixed Variants ListGroup</h3>
          <ListGroup>
            <List variant="dash">
              <ListItems variant="dash" />
            </List>
            <List variant="number">
              <ListItems variant="number" />
            </List>
            <List variant="text">
              <ListItems variant="text" />
            </List>
          </ListGroup>
        </div>

        {listGroupConfig.map(({
        title,
        compact,
        divided
      }) => <div key={title}>
            <h3 style={titleStyle}>{title} ListGroup</h3>
            <ListGroup>
              {ITEMS.map((section, idx) => <List key={idx}>
                  {[1, 2].map(item => <ListItem key={item}>
                      {\`\${section.charAt(0).toUpperCase() + section.slice(1)} - item \${item}\`}
                    </ListItem>)}
                </List>)}
            </ListGroup>
          </div>)}
      </div>;
  }
}`,...(C=(b=v.parameters)==null?void 0:b.docs)==null?void 0:C.source}}};const M=["Basic","VariantsShowcase","ListGroupShowcase"];export{p as Basic,v as ListGroupShowcase,m as VariantsShowcase,M as __namedExportsOrder,k as default};
