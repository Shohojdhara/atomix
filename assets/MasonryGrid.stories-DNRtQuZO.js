import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{r as t,e as V}from"./index-BVDOR7y2.js";import{C as R}from"./Card-Bp6dcI4n.js";import"./components-BrxBU25R.js";const h=t.forwardRef(({children:r,className:s="",xs:o=1,sm:m,md:l,lg:c,xl:p,xxl:u,gap:M=16,animate:H=!0,imagesLoaded:f=!0,onLayoutComplete:x,onImageLoad:$,...B},qe)=>{const[w,We]=t.useState(o),[Ve,Re]=t.useState([]),[Oe,F]=t.useState(!1),[He,N]=t.useState(!1),y=t.useRef(null),j=t.useRef([]),q=t.useRef(0),W=t.useRef(0),D=t.useRef(new Map);t.useEffect(()=>{N(!!f)},[w,f]),t.useImperativeHandle(qe,()=>y.current);const O=t.useCallback(()=>{const n=window.innerWidth;return n>=1400&&u!==void 0?u:n>=1200&&p!==void 0?p:n>=992&&c!==void 0?c:n>=768&&l!==void 0?l:n>=576&&m!==void 0?m:o},[o,m,l,c,p,u]);t.useEffect(()=>{const n=()=>We(O());return n(),window.addEventListener("resize",n),()=>window.removeEventListener("resize",n)},[O]);const[C,Fe]=t.useState([]);t.useEffect(()=>{const n=[];t.Children.forEach(r,(a,i)=>{var v;t.isValidElement(a)&&n.push({id:((v=a.key)==null?void 0:v.toString())||`masonry-item-${i}`,element:a,position:null,ref:V.createRef()})}),Fe(n)},[r]);const P=t.useCallback(n=>{if(!D.current.get(n)){if(D.current.set(n,!0),q.current+=1,y.current&&f){const a=n.closest(".o-masonry-grid > div");a&&(a.offsetHeight,a.classList.add("o-masonry-grid__item-loaded"),a.classList.remove("o-masonry-grid__item-loading"))}requestAnimationFrame(()=>{requestAnimationFrame(()=>{b()})}),$==null||$(q.current,W.current),q.current>=W.current&&W.current>0&&(F(!0),N(!1),requestAnimationFrame(()=>{requestAnimationFrame(()=>{b(),N(!1)})}),x==null||x())}},[$,x,f]),U=t.useCallback(()=>{if(!f||!y.current)return;D.current.clear(),q.current=0;const n=y.current.querySelectorAll("img");if(W.current=n.length,n.length===0){F(!0),N(!1),x==null||x();return}return N(!0),n.forEach(a=>{const i=a,v=a.closest(".o-masonry-grid > div");if(v&&v.classList.add("o-masonry-grid__item-loading"),a.complete)P(a);else{const I=()=>P(a);a.addEventListener("load",I),a.addEventListener("error",I),i._masonryLoadHandler=I}}),()=>{n.forEach(a=>{const i=a;i._masonryLoadHandler&&(a.removeEventListener("load",i._masonryLoadHandler),a.removeEventListener("error",i._masonryLoadHandler),delete i._masonryLoadHandler)})}},[f,P,x]),b=t.useCallback(()=>{if(!y.current||C.length===0)return;const a=(y.current.offsetWidth-M*(w-1))/w;j.current=Array(w).fill(0);const i=[];C.forEach((v,I)=>{if(v.ref.current){const z=j.current.indexOf(Math.min(...j.current)),ze=z*(a+M),J=j.current[z]??0,K=v.ref.current.offsetHeight;j.current[z]=J+K+M,i[I]={left:ze,top:J,width:a,height:K}}}),Re(i)},[C,w,M]);t.useEffect(()=>{if(!y.current)return;let n=null;const a=new ResizeObserver(()=>{n&&cancelAnimationFrame(n),n=requestAnimationFrame(()=>b())});return a.observe(y.current),()=>{a.disconnect(),n&&cancelAnimationFrame(n)}},[b]),V.useLayoutEffect(()=>{if(f)return U();b(),F(!0),N(!1)},[C,w,b,f,U]),V.useEffect(()=>{const n=[];return C.forEach(a=>{if(a.ref.current){const i=new ResizeObserver(()=>{requestAnimationFrame(()=>{requestAnimationFrame(()=>{b()})})});i.observe(a.ref.current),n.push(i)}}),()=>{n.forEach(a=>a.disconnect())}},[C,b]);const De=j.current.length>0?Math.max(...j.current):0,Pe=["o-masonry-grid",s,H?"o-masonry-grid--animate":"",He?"o-masonry-grid--loading-images":""].filter(Boolean).join(" ");return e.jsx("div",{ref:y,className:Pe,style:{position:"relative",width:"100%",height:`${De}px`,...B.style},...B,children:C.map((n,a)=>{const i=Ve[a];return i?e.jsx("div",{ref:n.ref,className:"o-masonry-grid__item",style:{position:"absolute",left:`${i.left}px`,top:`${i.top}px`,width:`${i.width}px`,opacity:1},children:n.element},n.id):e.jsx("div",{ref:n.ref,style:{opacity:0,position:"absolute"},children:n.element},n.id)})})});h.displayName="MasonryGrid";try{h.displayName="MasonryGrid",h.__docgenInfo={description:`MasonryGrid component for creating a responsive masonry layout.
Uses JavaScript to position items optimally based on available vertical space,
similar to how a mason fits stones in a wall.`,displayName:"MasonryGrid",props:{children:{defaultValue:null,description:"The content to be rendered within the masonry grid",name:"children",required:!0,type:{name:"ReactNode"}},className:{defaultValue:{value:""},description:"Additional CSS class names",name:"className",required:!1,type:{name:"string"}},xs:{defaultValue:{value:"1"},description:"Number of columns at extra small breakpoint (default)",name:"xs",required:!1,type:{name:"number"}},sm:{defaultValue:null,description:"Number of columns at small breakpoint",name:"sm",required:!1,type:{name:"number"}},md:{defaultValue:null,description:"Number of columns at medium breakpoint",name:"md",required:!1,type:{name:"number"}},lg:{defaultValue:null,description:"Number of columns at large breakpoint",name:"lg",required:!1,type:{name:"number"}},xl:{defaultValue:null,description:"Number of columns at extra large breakpoint",name:"xl",required:!1,type:{name:"number"}},xxl:{defaultValue:null,description:"Number of columns at extra extra large breakpoint",name:"xxl",required:!1,type:{name:"number"}},gap:{defaultValue:{value:"16"},description:"Gap between items (in pixels)",name:"gap",required:!1,type:{name:"number"}},animate:{defaultValue:{value:"true"},description:"Whether to animate item transitions",name:"animate",required:!1,type:{name:"boolean"}},imagesLoaded:{defaultValue:{value:"true"},description:`Whether to handle image loading to prevent layout shifts
When true, items will be shown immediately and positions updated as images load`,name:"imagesLoaded",required:!1,type:{name:"boolean"}},onLayoutComplete:{defaultValue:null,description:"Callback fired when all images are loaded and layout is complete",name:"onLayoutComplete",required:!1,type:{name:"(() => void)"}},onImageLoad:{defaultValue:null,description:"Callback fired each time an image loads and layout is updated",name:"onImageLoad",required:!1,type:{name:"((loadedCount: number, totalCount: number) => void)"}}}}}catch{}const d=t.forwardRef(({children:r,className:s="",...o},m)=>{const l=["o-masonry-grid__item-inner"];return s&&l.push(s),e.jsx("div",{ref:m,className:l.join(" "),...o,children:r})});d.displayName="MasonryGridItem";try{d.displayName="MasonryGridItem",d.__docgenInfo={description:`MasonryGridItem component for creating items within a MasonryGrid.
Each item will be positioned optimally by the parent MasonryGrid component.`,displayName:"MasonryGridItem",props:{children:{defaultValue:null,description:"The content to be rendered within the masonry grid item",name:"children",required:!0,type:{name:"ReactNode"}},className:{defaultValue:{value:""},description:"Additional CSS class names",name:"className",required:!1,type:{name:"string"}}}}}catch{}const Xe={title:"Layouts/MasonryGrid",component:h,parameters:{layout:"fullscreen"},decorators:[r=>e.jsx("div",{style:{padding:"1rem"},children:e.jsx(r,{})})]},Be=(r,s=600,o)=>{const m=[300,400,500,350,450,550,320,420],l=o||m[r%m.length];return`https://picsum.photos/id/${r%30+10}/${s}/${l}`},g=({index:r,title:s,text:o,useElevation:m=!1,width:l,height:c})=>{const p=m?R:R,u=Be(r,l,c),M=s||`Card Title ${r+1}`,H=o||(r%2===0?"This is a short description for this card item.":"This is a longer description that takes up more space to demonstrate how the masonry layout handles different content heights effectively.");return e.jsx(p,{image:u,imageAlt:`Image ${r+1}`,title:M,text:H,className:"u-h-100",actions:e.jsxs(V.Fragment,{children:[e.jsx("button",{className:"c-btn c-btn--primary c-btn--sm",children:"View"}),e.jsx("button",{className:"c-btn c-btn--outline-primary c-btn--sm",children:"More"})]})})},G={render:()=>e.jsxs("div",{children:[e.jsx("h3",{className:"u-mb-4",children:"Basic Masonry Grid"}),e.jsx("p",{className:"u-mb-4",children:"Items are automatically positioned in the optimal location based on available vertical space."}),e.jsx(h,{xs:1,sm:2,md:3,lg:4,children:Array.from({length:8}).map((r,s)=>e.jsx(d,{children:e.jsx(g,{index:s})},s))})]})},T={render:()=>e.jsxs("div",{children:[e.jsx("h3",{className:"u-mb-4",children:"Custom Gap (24px)"}),e.jsx("p",{className:"u-mb-4",children:"The gap between items can be customized."}),e.jsx(h,{xs:1,sm:2,md:3,lg:4,gap:24,children:Array.from({length:6}).map((r,s)=>e.jsx(d,{children:e.jsx(g,{index:s+10,title:`Card with Gap ${s+1}`})},s))})]})},_={render:()=>{const r=()=>{const[s,o]=t.useState([]),[m,l]=t.useState(!0);return t.useEffect(()=>{(()=>{l(!0),setTimeout(()=>{o([0,1,2,3,4,5]),l(!1)},1e3),setTimeout(()=>{o(p=>[...p,6,7,8,9,10,11])},3e3)})()},[]),e.jsxs("div",{children:[e.jsx("h3",{className:"u-mb-4",children:"Dynamic Loading"}),e.jsx("p",{className:"u-mb-4",children:"The masonry grid recalculates positions as new items are added."}),m&&e.jsxs("div",{className:"u-p-4 u-mb-4 u-bg-light u-border u-rounded u-text-center",children:[e.jsx("div",{className:"u-spinner u-spinner-primary u-mb-3"}),e.jsx("p",{className:"u-m-0",children:"Loading initial items..."})]}),e.jsx(h,{xs:1,sm:2,md:3,lg:4,children:s.map(c=>e.jsx(d,{children:e.jsx(g,{index:c+20,useElevation:!0,title:`Dynamic Card ${c+1}`})},c))})]})};return e.jsx(r,{})}},E={render:()=>e.jsxs("div",{children:[e.jsx("h3",{className:"u-mb-4",children:"Custom Column Configuration"}),e.jsx("p",{className:"u-mb-4",children:"Different column counts can be specified for each breakpoint."}),e.jsx(h,{xs:1,sm:2,md:2,lg:3,xl:4,xxl:5,children:Array.from({length:10}).map((r,s)=>e.jsx(d,{children:e.jsx(g,{index:s+30,title:`Column Config ${s+1}`,text:s%2===0?void 0:"This card demonstrates the custom column configuration across different breakpoints."})},s))})]})},L={render:()=>e.jsxs("div",{children:[e.jsx("h3",{className:"u-mb-4",children:"Elevation Cards in Masonry Layout"}),e.jsx("p",{className:"u-mb-4",children:"The masonry grid works well with elevation card components that have hover effects."}),e.jsx(h,{xs:1,sm:2,md:3,lg:4,children:Array.from({length:8}).map((r,s)=>e.jsx(d,{children:e.jsx(g,{index:s+40,useElevation:!0,title:`Elevation Card ${s+1}`,text:s%2===0?"Hover over this card to see the elevation effect.":"This card demonstrates the elevation effect when hovered. The masonry layout handles different content heights automatically."})},s))})]})},A={render:()=>e.jsxs("div",{children:[e.jsx("h3",{className:"u-mb-4",children:"No Animation"}),e.jsx("p",{className:"u-mb-4",children:"The animation can be disabled for immediate positioning."}),e.jsx(h,{xs:1,sm:2,md:3,lg:4,animate:!1,children:Array.from({length:6}).map((r,s)=>e.jsx(d,{children:e.jsx(g,{index:s+50,title:`No Animation ${s+1}`})},s))})]})},S={render:()=>{const[r,s]=t.useState(0),[o,m]=t.useState(0),[l,c]=t.useState(!1);return e.jsxs("div",{children:[e.jsx("h3",{className:"u-mb-4",children:"Progressive Image Loading"}),e.jsx("p",{className:"u-mb-4",children:"The grid shows items immediately and updates positions as each image loads."}),e.jsxs("div",{className:"u-bg-light u-p-3 u-rounded u-mb-4",children:[e.jsx("h4",{className:"u-mb-2",children:"Loading Progress"}),o>0&&e.jsxs("div",{className:"u-mb-2",children:[e.jsxs("div",{className:"u-d-flex u-justify-content-between u-mb-1",children:[e.jsxs("span",{children:["Loading images: ",r," of ",o]}),e.jsxs("span",{children:[Math.round(r/o*100),"%"]})]}),e.jsx("div",{className:"u-progress u-mb-2",style:{height:"8px"},children:e.jsx("div",{className:"u-progress-bar u-bg-primary",style:{width:`${r/o*100}%`}})}),l&&e.jsx("div",{className:"u-text-success",children:e.jsx("span",{children:"✓ All images loaded and layout complete!"})})]})]}),e.jsx(h,{xs:1,sm:2,md:3,lg:4,gap:16,imagesLoaded:!0,onLayoutComplete:()=>c(!0),onImageLoad:(p,u)=>{s(p),m(u)},children:Array.from({length:8}).map((p,u)=>e.jsx(d,{children:e.jsx(g,{index:u+70,title:`Progressive Loading ${u+1}`,text:"This card's image loads independently and updates the layout as it loads.",height:200+u%3*100,width:400+u%2*100})},u))})]})}},k={render:()=>e.jsxs("div",{children:[e.jsx("h3",{className:"u-mb-4",children:"Mixed Content Types"}),e.jsx("p",{className:"u-mb-4",children:"The masonry grid can handle various content types with different heights."}),e.jsxs(h,{xs:1,sm:2,md:3,lg:4,children:[e.jsx(d,{children:e.jsx(R,{title:"Text Only Card",text:"This card contains only text content with no image.",className:"u-h-100",actions:e.jsx("button",{className:"u-btn u-btn-primary u-btn-sm u-mt-3",children:"Action"})})}),e.jsx(d,{children:e.jsx(g,{index:60,useElevation:!0})}),e.jsx(d,{children:e.jsxs("div",{className:"u-p-4 u-border u-rounded u-bg-light u-h-100",children:[e.jsx("h4",{className:"u-mb-3",children:"Custom Content"}),e.jsx("p",{children:"This is a custom content block using utility classes."}),e.jsxs("div",{className:"u-d-flex u-justify-content-between u-mt-3",children:[e.jsx("span",{className:"u-badge u-badge-primary",children:"New"}),e.jsx("span",{className:"u-badge u-badge-secondary",children:"Featured"})]})]})}),e.jsx(d,{children:e.jsx(g,{index:61})}),e.jsx(d,{children:e.jsx("div",{className:"u-p-0 u-border u-rounded u-overflow-hidden u-shadow-sm",children:e.jsx("img",{src:"https://picsum.photos/id/15/600/400",alt:"Nature",className:"u-w-100"})})}),e.jsx(d,{children:e.jsx(R,{title:"Card with Icon",text:"This card includes an icon and uses utility classes for styling.",className:"u-h-100",icon:e.jsx("span",{className:"u-icon u-icon-lg u-text-primary",children:"★"})})})]})]})};var Q,X,Y,Z,ee;G.parameters={...G.parameters,docs:{...(Q=G.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  render: () => <div>
      <h3 className="u-mb-4">Basic Masonry Grid</h3>
      <p className="u-mb-4">
        Items are automatically positioned in the optimal location based on available vertical
        space.
      </p>

      <MasonryGrid xs={1} sm={2} md={3} lg={4}>
        {Array.from({
        length: 8
      }).map((_, index) => <MasonryGridItem key={index}>
            <CardWithImage index={index} />
          </MasonryGridItem>)}
      </MasonryGrid>
    </div>
}`,...(Y=(X=G.parameters)==null?void 0:X.docs)==null?void 0:Y.source},description:{story:"Basic masonry grid layout with responsive columns",...(ee=(Z=G.parameters)==null?void 0:Z.docs)==null?void 0:ee.description}}};var ne,se,ae,te,re;T.parameters={...T.parameters,docs:{...(ne=T.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  render: () => <div>
      <h3 className="u-mb-4">Custom Gap (24px)</h3>
      <p className="u-mb-4">The gap between items can be customized.</p>

      <MasonryGrid xs={1} sm={2} md={3} lg={4} gap={24}>
        {Array.from({
        length: 6
      }).map((_, index) => <MasonryGridItem key={index}>
            <CardWithImage index={index + 10} title={\`Card with Gap \${index + 1}\`} />
          </MasonryGridItem>)}
      </MasonryGrid>
    </div>
}`,...(ae=(se=T.parameters)==null?void 0:se.docs)==null?void 0:ae.source},description:{story:"Masonry grid with custom gap",...(re=(te=T.parameters)==null?void 0:te.docs)==null?void 0:re.description}}};var ie,oe,de,le,me;_.parameters={..._.parameters,docs:{...(ie=_.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  render: () => {
    // This component demonstrates how the masonry grid handles dynamically loaded content
    const DynamicLoadingExample = () => {
      const [items, setItems] = useState<number[]>([]);
      const [loading, setLoading] = useState(true);
      useEffect(() => {
        // Simulate loading items in batches
        const loadItems = () => {
          setLoading(true);

          // Initial set of items
          setTimeout(() => {
            setItems([0, 1, 2, 3, 4, 5]);
            setLoading(false);
          }, 1000);

          // Add more items after a delay
          setTimeout(() => {
            setItems(prev => [...prev, 6, 7, 8, 9, 10, 11]);
          }, 3000);
        };
        loadItems();
      }, []);
      return <div>
          <h3 className="u-mb-4">Dynamic Loading</h3>
          <p className="u-mb-4">The masonry grid recalculates positions as new items are added.</p>

          {loading && <div className="u-p-4 u-mb-4 u-bg-light u-border u-rounded u-text-center">
              <div className="u-spinner u-spinner-primary u-mb-3"></div>
              <p className="u-m-0">Loading initial items...</p>
            </div>}

          <MasonryGrid xs={1} sm={2} md={3} lg={4}>
            {items.map(index => <MasonryGridItem key={index}>
                <CardWithImage index={index + 20} useElevation={true} title={\`Dynamic Card \${index + 1}\`} />
              </MasonryGridItem>)}
          </MasonryGrid>
        </div>;
    };
    return <DynamicLoadingExample />;
  }
}`,...(de=(oe=_.parameters)==null?void 0:oe.docs)==null?void 0:de.source},description:{story:"Masonry grid with dynamic loading",...(me=(le=_.parameters)==null?void 0:le.docs)==null?void 0:me.description}}};var ce,ue,he,pe,ye;E.parameters={...E.parameters,docs:{...(ce=E.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  render: () => <div>
      <h3 className="u-mb-4">Custom Column Configuration</h3>
      <p className="u-mb-4">Different column counts can be specified for each breakpoint.</p>

      <MasonryGrid xs={1} sm={2} md={2} lg={3} xl={4} xxl={5}>
        {Array.from({
        length: 10
      }).map((_, index) => <MasonryGridItem key={index}>
            <CardWithImage index={index + 30} title={\`Column Config \${index + 1}\`} text={index % 2 === 0 ? undefined : 'This card demonstrates the custom column configuration across different breakpoints.'} />
          </MasonryGridItem>)}
      </MasonryGrid>
    </div>
}`,...(he=(ue=E.parameters)==null?void 0:ue.docs)==null?void 0:he.source},description:{story:"Masonry grid with custom column configuration",...(ye=(pe=E.parameters)==null?void 0:pe.docs)==null?void 0:ye.description}}};var ge,fe,xe,be,ve;L.parameters={...L.parameters,docs:{...(ge=L.parameters)==null?void 0:ge.docs,source:{originalSource:`{
  render: () => <div>
      <h3 className="u-mb-4">Elevation Cards in Masonry Layout</h3>
      <p className="u-mb-4">
        The masonry grid works well with elevation card components that have hover effects.
      </p>

      <MasonryGrid xs={1} sm={2} md={3} lg={4}>
        {Array.from({
        length: 8
      }).map((_, index) => <MasonryGridItem key={index}>
            <CardWithImage index={index + 40} useElevation={true} title={\`Elevation Card \${index + 1}\`} text={index % 2 === 0 ? 'Hover over this card to see the elevation effect.' : 'This card demonstrates the elevation effect when hovered. The masonry layout handles different content heights automatically.'} />
          </MasonryGridItem>)}
      </MasonryGrid>
    </div>
}`,...(xe=(fe=L.parameters)==null?void 0:fe.docs)==null?void 0:xe.source},description:{story:"Masonry grid with elevation card content",...(ve=(be=L.parameters)==null?void 0:be.docs)==null?void 0:ve.description}}};var Ne,je,Ce,Me,we;A.parameters={...A.parameters,docs:{...(Ne=A.parameters)==null?void 0:Ne.docs,source:{originalSource:`{
  render: () => <div>
      <h3 className="u-mb-4">No Animation</h3>
      <p className="u-mb-4">The animation can be disabled for immediate positioning.</p>

      <MasonryGrid xs={1} sm={2} md={3} lg={4} animate={false}>
        {Array.from({
        length: 6
      }).map((_, index) => <MasonryGridItem key={index}>
            <CardWithImage index={index + 50} title={\`No Animation \${index + 1}\`} />
          </MasonryGridItem>)}
      </MasonryGrid>
    </div>
}`,...(Ce=(je=A.parameters)==null?void 0:je.docs)==null?void 0:Ce.source},description:{story:"Masonry grid with animation disabled",...(we=(Me=A.parameters)==null?void 0:Me.docs)==null?void 0:we.description}}};var Ie,Ge,Te,_e,Ee;S.parameters={...S.parameters,docs:{...(Ie=S.parameters)==null?void 0:Ie.docs,source:{originalSource:`{
  render: () => {
    const [loadedCount, setLoadedCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [layoutComplete, setLayoutComplete] = useState(false);
    return <div>
        <h3 className="u-mb-4">Progressive Image Loading</h3>
        <p className="u-mb-4">
          The grid shows items immediately and updates positions as each image loads.
        </p>

        <div className="u-bg-light u-p-3 u-rounded u-mb-4">
          <h4 className="u-mb-2">Loading Progress</h4>
          {totalCount > 0 && <div className="u-mb-2">
              <div className="u-d-flex u-justify-content-between u-mb-1">
                <span>
                  Loading images: {loadedCount} of {totalCount}
                </span>
                <span>{Math.round(loadedCount / totalCount * 100)}%</span>
              </div>
              <div className="u-progress u-mb-2" style={{
            height: '8px'
          }}>
                <div className="u-progress-bar u-bg-primary" style={{
              width: \`\${loadedCount / totalCount * 100}%\`
            }}></div>
              </div>
              {layoutComplete && <div className="u-text-success">
                  <span>✓ All images loaded and layout complete!</span>
                </div>}
            </div>}
        </div>

        <MasonryGrid xs={1} sm={2} md={3} lg={4} gap={16} imagesLoaded={true} onLayoutComplete={() => setLayoutComplete(true)} onImageLoad={(loaded, total) => {
        setLoadedCount(loaded);
        setTotalCount(total);
      }}>
          {Array.from({
          length: 8
        }).map((_, index) => <MasonryGridItem key={index}>
              <CardWithImage index={index + 70} title={\`Progressive Loading \${index + 1}\`} text="This card's image loads independently and updates the layout as it loads."
          // Use different sized images to demonstrate the progressive loading
          height={200 + index % 3 * 100} width={400 + index % 2 * 100} />
            </MasonryGridItem>)}
        </MasonryGrid>
      </div>;
  }
}`,...(Te=(Ge=S.parameters)==null?void 0:Ge.docs)==null?void 0:Te.source},description:{story:"Masonry grid with progressive image loading",...(Ee=(_e=S.parameters)==null?void 0:_e.docs)==null?void 0:Ee.description}}};var Le,Ae,Se,ke,$e;k.parameters={...k.parameters,docs:{...(Le=k.parameters)==null?void 0:Le.docs,source:{originalSource:`{
  render: () => <div>
      <h3 className="u-mb-4">Mixed Content Types</h3>
      <p className="u-mb-4">
        The masonry grid can handle various content types with different heights.
      </p>

      <MasonryGrid xs={1} sm={2} md={3} lg={4}>
        <MasonryGridItem>
          <Card title="Text Only Card" text="This card contains only text content with no image." className="u-h-100" actions={<button className="u-btn u-btn-primary u-btn-sm u-mt-3">Action</button>} />
        </MasonryGridItem>

        <MasonryGridItem>
          <CardWithImage index={60} useElevation={true} />
        </MasonryGridItem>

        <MasonryGridItem>
          <div className="u-p-4 u-border u-rounded u-bg-light u-h-100">
            <h4 className="u-mb-3">Custom Content</h4>
            <p>This is a custom content block using utility classes.</p>
            <div className="u-d-flex u-justify-content-between u-mt-3">
              <span className="u-badge u-badge-primary">New</span>
              <span className="u-badge u-badge-secondary">Featured</span>
            </div>
          </div>
        </MasonryGridItem>

        <MasonryGridItem>
          <CardWithImage index={61} />
        </MasonryGridItem>

        <MasonryGridItem>
          <div className="u-p-0 u-border u-rounded u-overflow-hidden u-shadow-sm">
            <img src="https://picsum.photos/id/15/600/400" alt="Nature" className="u-w-100" />
          </div>
        </MasonryGridItem>

        <MasonryGridItem>
          <Card title="Card with Icon" text="This card includes an icon and uses utility classes for styling." className="u-h-100" icon={<span className="u-icon u-icon-lg u-text-primary">★</span>} />
        </MasonryGridItem>
      </MasonryGrid>
    </div>
}`,...(Se=(Ae=k.parameters)==null?void 0:Ae.docs)==null?void 0:Se.source},description:{story:"Masonry grid with mixed content",...($e=(ke=k.parameters)==null?void 0:ke.docs)==null?void 0:$e.description}}};const Ye=["BasicMasonryGrid","CustomGap","DynamicLoading","CustomColumns","WithElevationCards","NoAnimation","ProgressiveImageLoading","MixedContent"];export{G as BasicMasonryGrid,E as CustomColumns,T as CustomGap,_ as DynamicLoading,k as MixedContent,A as NoAnimation,S as ProgressiveImageLoading,L as WithElevationCards,Ye as __namedExportsOrder,Xe as default};
