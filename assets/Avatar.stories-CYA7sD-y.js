import{j as a}from"./jsx-runtime-BjG_zV1W.js";import{A as r}from"./Avatar-DnD2V9sG.js";import{A as c}from"./AvatarGroup-DR447Zag.js";import{I as f}from"./Icon-k4CeN--q.js";import"./index-BVDOR7y2.js";import"./components-BrxBU25R.js";import"./SpeakerX.es-Cg-mjUf1.js";const b={title:"Components/Avatar",component:r,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{src:{control:"text",description:"Avatar image source URL"},alt:{control:"text",description:"Alt text for the avatar image"},initials:{control:"text",description:"Initials to display when no image is available"},icon:{control:{disable:!0},description:"Icon to display when no image or initials are available"},size:{control:{type:"select"},options:["xs","sm","md","lg","xl"],description:"Size variant for the avatar"},circle:{control:"boolean",description:"Whether to make the avatar circular"},disabled:{control:"boolean",description:"Whether the avatar is disabled"}}},t={args:{src:"https://i.pravatar.cc/150?img=1",alt:"User Avatar",size:"md",circle:!1}},l={render:()=>{const i=["xs","sm","md","lg","xl"],s={square:"https://i.pravatar.cc/150?img=2",circle:"https://i.pravatar.cc/150?img=3",fallback:"invalid-url.jpg"};return a.jsxs("div",{className:"u-d-grid u-gap-6",style:{gridTemplateColumns:"auto 1fr 1fr 1fr 1fr 1fr"},children:[a.jsx("div",{className:"u-fw-bold",children:"Type"}),i.map(e=>a.jsx("div",{className:"u-fw-bold u-text-center",children:e.toUpperCase()},e)),a.jsx("div",{children:"Square"}),i.map(e=>a.jsx("div",{className:"u-d-flex u-justify-content-center",children:a.jsx(r,{src:s.square,size:e})},e)),a.jsx("div",{children:"Circle"}),i.map(e=>a.jsx("div",{className:"u-d-flex u-justify-content-center",children:a.jsx(r,{src:s.circle,size:e,circle:!0})},e)),a.jsx("div",{children:"Initials"}),i.map(e=>a.jsx("div",{className:"u-d-flex u-justify-content-center",children:a.jsx(r,{initials:"JD",size:e})},e)),a.jsx("div",{children:"Icon"}),i.map(e=>a.jsx("div",{className:"u-d-flex u-justify-content-center",children:a.jsx(r,{icon:a.jsx(f,{name:"User",size:e==="xs"?"xs":e==="sm"?"sm":"md"}),size:e})},e)),a.jsx("div",{children:"Fallback"}),i.map(e=>a.jsx("div",{className:"u-d-flex u-justify-content-center",children:a.jsx(r,{src:s.fallback,size:e})},e)),a.jsx("div",{children:"Interactive"}),i.map(e=>a.jsx("div",{className:"u-d-flex u-justify-content-center",children:a.jsx(r,{src:`https://i.pravatar.cc/150?img=${e==="xs"?4:e==="sm"?5:e==="md"?6:e==="lg"?7:8}`,size:e,circle:!0,onClick:()=>alert(`${e.toUpperCase()} Avatar clicked!`)})},e)),a.jsx("div",{children:"Disabled"}),i.map(e=>a.jsx("div",{className:"u-d-flex u-justify-content-center",children:a.jsx(r,{src:`https://i.pravatar.cc/150?img=${e==="xs"?9:e==="sm"?10:e==="md"?11:e==="lg"?12:13}`,size:e,circle:!0,disabled:!0,onClick:()=>alert("This will not be triggered")})},e))]})}},n={render:()=>{const i=["xs","sm","md","lg","xl"];return a.jsxs("div",{className:"u-d-flex u-flex-column u-gap-8",children:[a.jsxs("div",{className:"u-d-flex u-gap-12",children:[a.jsxs("div",{className:"u-flex-grow-1",children:[a.jsx("h3",{className:"u-mb-4 u-fw-normal",children:"Standard Avatar Groups"}),a.jsx("div",{className:"u-d-flex u-flex-column u-gap-4",children:i.map(s=>a.jsxs("div",{className:"u-d-flex u-align-items-center u-gap-4",children:[a.jsx("div",{className:"u-w-12",children:s.toUpperCase()}),a.jsxs(c,{children:[a.jsx(r,{src:"https://i.pravatar.cc/150?img=14",size:s,circle:!0}),a.jsx(r,{src:"https://i.pravatar.cc/150?img=15",size:s,circle:!0}),a.jsx(r,{src:"https://i.pravatar.cc/150?img=16",size:s,circle:!0}),a.jsx(r,{src:"https://i.pravatar.cc/150?img=17",size:s,circle:!0}),a.jsx(r,{src:"https://i.pravatar.cc/150?img=18",size:s,circle:!0})]})]},s))})]}),a.jsxs("div",{className:"u-flex-grow-1",children:[a.jsx("h3",{className:"u-mb-4 u-fw-normal",children:"Stacked Avatar Groups"}),a.jsx("div",{className:"u-d-flex u-flex-column u-gap-4",children:i.map(s=>a.jsxs("div",{className:"u-d-flex u-align-items-center u-gap-4",children:[a.jsx("div",{className:"u-w-12",children:s.toUpperCase()}),a.jsxs(c,{stacked:!0,children:[a.jsx(r,{src:"https://i.pravatar.cc/150?img=24",size:s,circle:!0}),a.jsx(r,{src:"https://i.pravatar.cc/150?img=25",size:s,circle:!0}),a.jsx(r,{src:"https://i.pravatar.cc/150?img=26",size:s,circle:!0}),a.jsx(r,{src:"https://i.pravatar.cc/150?img=27",size:s,circle:!0}),a.jsx(r,{src:"https://i.pravatar.cc/150?img=28",size:s,circle:!0})]})]},s))})]})]}),a.jsxs("div",{className:"u-d-flex u-gap-12",children:[a.jsxs("div",{className:"u-flex-grow-1",children:[a.jsx("h3",{className:"u-mb-4 u-fw-normal",children:"Avatar Groups with Max Limit"}),a.jsx("div",{className:"u-d-flex u-flex-column u-gap-4",children:i.map(s=>a.jsxs("div",{className:"u-d-flex u-align-items-center u-gap-4",children:[a.jsx("div",{className:"u-w-12",children:s.toUpperCase()}),a.jsxs(c,{max:3,children:[a.jsx(r,{src:"https://i.pravatar.cc/150?img=19",size:s,circle:!0}),a.jsx(r,{src:"https://i.pravatar.cc/150?img=20",size:s,circle:!0}),a.jsx(r,{src:"https://i.pravatar.cc/150?img=21",size:s,circle:!0}),a.jsx(r,{src:"https://i.pravatar.cc/150?img=22",size:s,circle:!0}),a.jsx(r,{src:"https://i.pravatar.cc/150?img=23",size:s,circle:!0})]})]},s))})]}),a.jsxs("div",{className:"u-flex-grow-1",children:[a.jsx("h3",{className:"u-mb-4 u-fw-normal",children:"Stacked Groups with Max Limit"}),a.jsx("div",{className:"u-d-flex u-flex-column u-gap-4",children:i.map(s=>a.jsxs("div",{className:"u-d-flex u-align-items-center u-gap-4",children:[a.jsx("div",{className:"u-w-12",children:s.toUpperCase()}),a.jsxs(c,{stacked:!0,max:3,moreText:"+more",children:[a.jsx(r,{src:"https://i.pravatar.cc/150?img=29",size:s,circle:!0}),a.jsx(r,{src:"https://i.pravatar.cc/150?img=30",size:s,circle:!0}),a.jsx(r,{src:"https://i.pravatar.cc/150?img=31",size:s,circle:!0}),a.jsx(r,{src:"https://i.pravatar.cc/150?img=32",size:s,circle:!0}),a.jsx(r,{src:"https://i.pravatar.cc/150?img=33",size:s,circle:!0})]})]},s))})]})]}),a.jsxs("div",{children:[a.jsx("h3",{className:"u-mb-4 u-fw-normal",children:"Mixed Content Avatar Groups"}),a.jsxs(c,{children:[a.jsx(r,{src:"https://i.pravatar.cc/150?img=34",size:"md",circle:!0}),a.jsx(r,{initials:"JD",size:"md",circle:!0}),a.jsx(r,{src:"https://i.pravatar.cc/150?img=35",size:"md",circle:!0}),a.jsx(r,{icon:a.jsx(f,{name:"User",size:"md"}),size:"md",circle:!0}),a.jsx(r,{src:"https://i.pravatar.cc/150?img=36",size:"md",circle:!0})]})]})]})}};var d,m,p;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    src: 'https://i.pravatar.cc/150?img=1',
    alt: 'User Avatar',
    size: 'md',
    circle: false
  }
}`,...(p=(m=t.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var u,v,o;l.parameters={...l.parameters,docs:{...(u=l.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => {
    const sizeOptions = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
    const variantImages = {
      square: 'https://i.pravatar.cc/150?img=2',
      circle: 'https://i.pravatar.cc/150?img=3',
      initials: null,
      icon: null,
      fallback: 'invalid-url.jpg'
    };
    return <div className="u-d-grid u-gap-6" style={{
      gridTemplateColumns: 'auto 1fr 1fr 1fr 1fr 1fr'
    }}>
        {/* Header Row */}
        <div className="u-fw-bold">Type</div>
        {sizeOptions.map(size => <div key={size} className="u-fw-bold u-text-center">
            {size.toUpperCase()}
          </div>)}

        {/* Square Avatars */}
        <div>Square</div>
        {sizeOptions.map(size => <div key={size} className="u-d-flex u-justify-content-center">
            <Avatar src={variantImages.square} size={size} />
          </div>)}

        {/* Circle Avatars */}
        <div>Circle</div>
        {sizeOptions.map(size => <div key={size} className="u-d-flex u-justify-content-center">
            <Avatar src={variantImages.circle} size={size} circle={true} />
          </div>)}

        {/* Initials Avatars */}
        <div>Initials</div>
        {sizeOptions.map(size => <div key={size} className="u-d-flex u-justify-content-center">
            <Avatar initials="JD" size={size} />
          </div>)}

        {/* Icon Avatars */}
        <div>Icon</div>
        {sizeOptions.map(size => <div key={size} className="u-d-flex u-justify-content-center">
            <Avatar icon={<Icon name="User" size={size === 'xs' ? 'xs' : size === 'sm' ? 'sm' : 'md'} />} size={size} />
          </div>)}

        {/* Fallback Avatars */}
        <div>Fallback</div>
        {sizeOptions.map(size => <div key={size} className="u-d-flex u-justify-content-center">
            <Avatar src={variantImages.fallback} size={size} />
          </div>)}

        {/* Interactive Avatars */}
        <div>Interactive</div>
        {sizeOptions.map(size => <div key={size} className="u-d-flex u-justify-content-center">
            <Avatar src={\`https://i.pravatar.cc/150?img=\${size === 'xs' ? 4 : size === 'sm' ? 5 : size === 'md' ? 6 : size === 'lg' ? 7 : 8}\`} size={size} circle={true} onClick={() => alert(\`\${size.toUpperCase()} Avatar clicked!\`)} />
          </div>)}

        {/* Disabled Avatars */}
        <div>Disabled</div>
        {sizeOptions.map(size => <div key={size} className="u-d-flex u-justify-content-center">
            <Avatar src={\`https://i.pravatar.cc/150?img=\${size === 'xs' ? 9 : size === 'sm' ? 10 : size === 'md' ? 11 : size === 'lg' ? 12 : 13}\`} size={size} circle={true} disabled={true} onClick={() => alert('This will not be triggered')} />
          </div>)}
      </div>;
  }
}`,...(o=(v=l.parameters)==null?void 0:v.docs)==null?void 0:o.source}}};var x,h,g;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
    return <div className="u-d-flex u-flex-column u-gap-8">
        {/* First row: Standard and Stacked side by side */}
        <div className="u-d-flex u-gap-12">
          {/* Standard Avatar Groups */}
          <div className="u-flex-grow-1">
            <h3 className="u-mb-4 u-fw-normal">Standard Avatar Groups</h3>
            <div className="u-d-flex u-flex-column u-gap-4">
              {sizes.map(size => <div key={size} className="u-d-flex u-align-items-center u-gap-4">
                  <div className="u-w-12">{size.toUpperCase()}</div>
                  <AvatarGroup>
                    <Avatar src={\`https://i.pravatar.cc/150?img=\${14}\`} size={size} circle />
                    <Avatar src={\`https://i.pravatar.cc/150?img=\${15}\`} size={size} circle />
                    <Avatar src={\`https://i.pravatar.cc/150?img=\${16}\`} size={size} circle />
                    <Avatar src={\`https://i.pravatar.cc/150?img=\${17}\`} size={size} circle />
                    <Avatar src={\`https://i.pravatar.cc/150?img=\${18}\`} size={size} circle />
                  </AvatarGroup>
                </div>)}
            </div>
          </div>

          {/* Stacked Avatar Groups */}
          <div className="u-flex-grow-1">
            <h3 className="u-mb-4 u-fw-normal">Stacked Avatar Groups</h3>
            <div className="u-d-flex u-flex-column u-gap-4">
              {sizes.map(size => <div key={size} className="u-d-flex u-align-items-center u-gap-4">
                  <div className="u-w-12">{size.toUpperCase()}</div>
                  <AvatarGroup stacked>
                    <Avatar src={\`https://i.pravatar.cc/150?img=\${24}\`} size={size} circle />
                    <Avatar src={\`https://i.pravatar.cc/150?img=\${25}\`} size={size} circle />
                    <Avatar src={\`https://i.pravatar.cc/150?img=\${26}\`} size={size} circle />
                    <Avatar src={\`https://i.pravatar.cc/150?img=\${27}\`} size={size} circle />
                    <Avatar src={\`https://i.pravatar.cc/150?img=\${28}\`} size={size} circle />
                  </AvatarGroup>
                </div>)}
            </div>
          </div>
        </div>

        {/* Second row: Max and Stacked+Max side by side */}
        <div className="u-d-flex u-gap-12">
          {/* Avatar Groups with Max Limit */}
          <div className="u-flex-grow-1">
            <h3 className="u-mb-4 u-fw-normal">Avatar Groups with Max Limit</h3>
            <div className="u-d-flex u-flex-column u-gap-4">
              {sizes.map(size => <div key={size} className="u-d-flex u-align-items-center u-gap-4">
                  <div className="u-w-12">{size.toUpperCase()}</div>
                  <AvatarGroup max={3}>
                    <Avatar src={\`https://i.pravatar.cc/150?img=\${19}\`} size={size} circle />
                    <Avatar src={\`https://i.pravatar.cc/150?img=\${20}\`} size={size} circle />
                    <Avatar src={\`https://i.pravatar.cc/150?img=\${21}\`} size={size} circle />
                    <Avatar src={\`https://i.pravatar.cc/150?img=\${22}\`} size={size} circle />
                    <Avatar src={\`https://i.pravatar.cc/150?img=\${23}\`} size={size} circle />
                  </AvatarGroup>
                </div>)}
            </div>
          </div>

          {/* Stacked Avatar Groups with Max Limit */}
          <div className="u-flex-grow-1">
            <h3 className="u-mb-4 u-fw-normal">Stacked Groups with Max Limit</h3>
            <div className="u-d-flex u-flex-column u-gap-4">
              {sizes.map(size => <div key={size} className="u-d-flex u-align-items-center u-gap-4">
                  <div className="u-w-12">{size.toUpperCase()}</div>
                  <AvatarGroup stacked max={3} moreText={\`+more\`}>
                    <Avatar src={\`https://i.pravatar.cc/150?img=\${29}\`} size={size} circle />
                    <Avatar src={\`https://i.pravatar.cc/150?img=\${30}\`} size={size} circle />
                    <Avatar src={\`https://i.pravatar.cc/150?img=\${31}\`} size={size} circle />
                    <Avatar src={\`https://i.pravatar.cc/150?img=\${32}\`} size={size} circle />
                    <Avatar src={\`https://i.pravatar.cc/150?img=\${33}\`} size={size} circle />
                  </AvatarGroup>
                </div>)}
            </div>
          </div>
        </div>

        {/* Mixed Content Avatar Groups */}
        <div>
          <h3 className="u-mb-4 u-fw-normal">Mixed Content Avatar Groups</h3>
          <AvatarGroup>
            <Avatar src={\`https://i.pravatar.cc/150?img=\${34}\`} size="md" circle />
            <Avatar initials="JD" size="md" circle />
            <Avatar src={\`https://i.pravatar.cc/150?img=\${35}\`} size="md" circle />
            <Avatar icon={<Icon name="User" size="md" />} size="md" circle />
            <Avatar src={\`https://i.pravatar.cc/150?img=\${36}\`} size="md" circle />
          </AvatarGroup>
        </div>
      </div>;
  }
}`,...(g=(h=n.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};const y=["Basic","VariantsShowcase","AvatarGroupShowcase"];export{n as AvatarGroupShowcase,t as Basic,l as VariantsShowcase,y as __namedExportsOrder,b as default};
