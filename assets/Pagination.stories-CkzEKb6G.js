import{j as R}from"./jsx-runtime-BjG_zV1W.js";import{r as q}from"./index-BVDOR7y2.js";import{P as _}from"./Pagination-kuaiAkCB.js";import"./components-BrxBU25R.js";import"./Icon-k4CeN--q.js";import"./SpeakerX.es-Cg-mjUf1.js";const U={title:"Components/Pagination",component:_,argTypes:{currentPage:{control:"number",description:"Current active page"},totalPages:{control:"number",description:"Total number of pages"},siblingCount:{control:"number",description:"Number of page links to show before and after current page"},showFirstLastButtons:{control:"boolean",description:"Whether to show first/last page buttons"},showPrevNextButtons:{control:"boolean",description:"Whether to show previous/next page buttons"},size:{control:"select",options:["sm","md","lg"],description:"Size variant for pagination"},ariaLabel:{control:"text",description:"Accessible label for the navigation element"},className:{control:"text",description:"Custom class for the pagination container"}},parameters:{docs:{description:{component:"A Pagination component for navigating through pages of content with enhanced accessibility, configurable sizes, and icons for navigation buttons."}}}},e=c=>{const[k,A]=q.useState(c.currentPage),M=u=>{var P;A(u),(P=c.onPageChange)==null||P.call(c,u)};return R.jsx(_,{...c,currentPage:k,onPageChange:M})},a=e.bind({});a.args={currentPage:1,totalPages:10,siblingCount:1,showFirstLastButtons:!0,showPrevNextButtons:!0,size:"md",ariaLabel:"Pagination"};a.parameters={docs:{description:{story:"Default pagination with first/last and previous/next navigation buttons using icons."}}};const n=e.bind({});n.args={currentPage:25,totalPages:50,siblingCount:2,size:"md"};n.parameters={docs:{description:{story:"Pagination with many pages, showing the ellipsis (dots) for page ranges."}}};const r=e.bind({});r.args={currentPage:4,totalPages:10,siblingCount:1,size:"sm"};r.parameters={docs:{description:{story:"Small-sized pagination component with smaller icons and buttons."}}};const t=e.bind({});t.args={currentPage:4,totalPages:10,siblingCount:1,size:"lg"};t.parameters={docs:{description:{story:"Large-sized pagination component with larger icons and buttons."}}};const s=e.bind({});s.args={currentPage:2,totalPages:3,siblingCount:1};s.parameters={docs:{description:{story:"Pagination with only a few pages, showing all page numbers without ellipsis."}}};const o=e.bind({});o.args={currentPage:5,totalPages:15,showFirstLastButtons:!1,showPrevNextButtons:!0};o.parameters={docs:{description:{story:"Pagination with only previous/next navigation buttons (no skip to first/last)."}}};const g=e.bind({});g.args={currentPage:5,totalPages:15,showFirstLastButtons:!1,showPrevNextButtons:!1};g.parameters={docs:{description:{story:"Pagination with only page numbers, no navigation buttons."}}};const i=e.bind({});i.args={currentPage:5,totalPages:15,className:"custom-pagination-class",showFirstLastButtons:!1};i.parameters={docs:{description:{story:"Pagination with custom CSS class for additional styling."}}};var p,l,m;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`args => {
  const [currentPage, setCurrentPage] = useState(args.currentPage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    args.onPageChange?.(page);
  };
  return <Pagination {...args} currentPage={currentPage} onPageChange={handlePageChange} />;
}`,...(m=(l=a.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};var d,h,C;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`args => {
  const [currentPage, setCurrentPage] = useState(args.currentPage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    args.onPageChange?.(page);
  };
  return <Pagination {...args} currentPage={currentPage} onPageChange={handlePageChange} />;
}`,...(C=(h=n.parameters)==null?void 0:h.docs)==null?void 0:C.source}}};var b,S,f;r.parameters={...r.parameters,docs:{...(b=r.parameters)==null?void 0:b.docs,source:{originalSource:`args => {
  const [currentPage, setCurrentPage] = useState(args.currentPage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    args.onPageChange?.(page);
  };
  return <Pagination {...args} currentPage={currentPage} onPageChange={handlePageChange} />;
}`,...(f=(S=r.parameters)==null?void 0:S.docs)==null?void 0:f.source}}};var w,y,v;t.parameters={...t.parameters,docs:{...(w=t.parameters)==null?void 0:w.docs,source:{originalSource:`args => {
  const [currentPage, setCurrentPage] = useState(args.currentPage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    args.onPageChange?.(page);
  };
  return <Pagination {...args} currentPage={currentPage} onPageChange={handlePageChange} />;
}`,...(v=(y=t.parameters)==null?void 0:y.docs)==null?void 0:v.source}}};var x,z,L;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`args => {
  const [currentPage, setCurrentPage] = useState(args.currentPage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    args.onPageChange?.(page);
  };
  return <Pagination {...args} currentPage={currentPage} onPageChange={handlePageChange} />;
}`,...(L=(z=s.parameters)==null?void 0:z.docs)==null?void 0:L.source}}};var B,N,F;o.parameters={...o.parameters,docs:{...(B=o.parameters)==null?void 0:B.docs,source:{originalSource:`args => {
  const [currentPage, setCurrentPage] = useState(args.currentPage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    args.onPageChange?.(page);
  };
  return <Pagination {...args} currentPage={currentPage} onPageChange={handlePageChange} />;
}`,...(F=(N=o.parameters)==null?void 0:N.docs)==null?void 0:F.source}}};var W,j,D;g.parameters={...g.parameters,docs:{...(W=g.parameters)==null?void 0:W.docs,source:{originalSource:`args => {
  const [currentPage, setCurrentPage] = useState(args.currentPage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    args.onPageChange?.(page);
  };
  return <Pagination {...args} currentPage={currentPage} onPageChange={handlePageChange} />;
}`,...(D=(j=g.parameters)==null?void 0:j.docs)==null?void 0:D.source}}};var E,O,T;i.parameters={...i.parameters,docs:{...(E=i.parameters)==null?void 0:E.docs,source:{originalSource:`args => {
  const [currentPage, setCurrentPage] = useState(args.currentPage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    args.onPageChange?.(page);
  };
  return <Pagination {...args} currentPage={currentPage} onPageChange={handlePageChange} />;
}`,...(T=(O=i.parameters)==null?void 0:O.docs)==null?void 0:T.source}}};const V=["Default","WithMorePages","SmallSize","LargeSize","FewPages","NoFirstLastButtons","OnlyPageNumbers","CustomStyling"];export{i as CustomStyling,a as Default,s as FewPages,t as LargeSize,o as NoFirstLastButtons,g as OnlyPageNumbers,r as SmallSize,n as WithMorePages,V as __namedExportsOrder,U as default};
