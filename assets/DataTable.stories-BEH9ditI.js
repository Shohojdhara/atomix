import{j as n}from"./jsx-runtime-BjG_zV1W.js";import{r as ee}from"./index-BVDOR7y2.js";import{D as Y}from"./DataTable-CBq1Xfpm.js";import"./components-BrxBU25R.js";import"./Spinner-puYPCf0E.js";import"./Icon-k4CeN--q.js";import"./SpeakerX.es-Cg-mjUf1.js";import"./Pagination-kuaiAkCB.js";const de={title:"Components/DataTable",component:Y,parameters:{layout:"padded"},argTypes:{data:{control:"object"},columns:{control:"object"},sortable:{control:"boolean"},filterable:{control:"boolean"},paginated:{control:"boolean"},pageSize:{control:"number"},striped:{control:"boolean"},bordered:{control:"boolean"},dense:{control:"boolean"},loading:{control:"boolean"},emptyMessage:{control:"text"}}},ae=t=>{const s=["Admin","User","Editor","Manager","Guest"],a=["Active","Inactive","Pending","Suspended"];return Array.from({length:t},(y,o)=>({id:o+1,name:`User ${o+1}`,email:`user${o+1}@example.com`,role:s[Math.floor(Math.random()*s.length)],status:a[Math.floor(Math.random()*a.length)]}))},r=[{id:1,name:"John Doe",email:"john@example.com",role:"Admin",status:"Active"},{id:2,name:"Jane Smith",email:"jane@example.com",role:"User",status:"Active"},{id:3,name:"Bob Johnson",email:"bob@example.com",role:"User",status:"Inactive"},{id:4,name:"Alice Brown",email:"alice@example.com",role:"Editor",status:"Active"},{id:5,name:"Charlie Davis",email:"charlie@example.com",role:"User",status:"Pending"},{id:6,name:"Eva Wilson",email:"eva@example.com",role:"Admin",status:"Active"},{id:7,name:"Frank Miller",email:"frank@example.com",role:"User",status:"Inactive"},{id:8,name:"Grace Lee",email:"grace@example.com",role:"Editor",status:"Active"},{id:9,name:"Henry Clark",email:"henry@example.com",role:"User",status:"Pending"},{id:10,name:"Ivy Martin",email:"ivy@example.com",role:"Admin",status:"Active"},{id:11,name:"Jack Wilson",email:"jack@example.com",role:"User",status:"Inactive"},{id:12,name:"Karen Brown",email:"karen@example.com",role:"Editor",status:"Active"}],Z=ae(100),e=[{key:"id",title:"ID",width:"80px"},{key:"name",title:"Name",sortable:!0},{key:"email",title:"Email",sortable:!0},{key:"role",title:"Role",sortable:!0},{key:"status",title:"Status",sortable:!0,render:(t,s)=>{let a="";switch(t){case"Active":a="green";break;case"Inactive":a="red";break;case"Pending":a="orange";break;case"Suspended":a="gray";break}return n.jsx("span",{style:{color:a},children:t})}}],i={args:{data:r,columns:e}},l={args:{data:r,columns:e,sortable:!0}},c={args:{data:r,columns:e,filterable:!0}},d={args:{data:r,columns:e,paginated:!0,pageSize:5},parameters:{docs:{description:{story:"A paginated table with standard pagination controls below the table."}}}},m={args:{data:Z,columns:e,paginated:!0,pageSize:10},parameters:{docs:{description:{story:"Pagination with a large dataset (100 items) demonstrating first/last buttons and ellipsis."}}}},p={args:{data:Z,columns:e,sortable:!0,filterable:!0,paginated:!0,pageSize:10,striped:!0,bordered:!0},parameters:{docs:{description:{story:"A complete data table with sorting, filtering, and pagination enabled."}}}},u={args:{data:r,columns:e,sortable:!0,striped:!0,bordered:!0}},g={args:{data:r,columns:e,sortable:!0,dense:!0}},b={args:{data:[],columns:e,emptyMessage:"No users found"}},S={args:{data:r,columns:e,loading:!0}},h={render:t=>{const[s,a]=ee.useState(null),y=o=>{a(o)};return n.jsxs("div",{children:[n.jsx(Y,{...t,onRowClick:y}),s&&n.jsxs("div",{style:{marginTop:"1rem",padding:"1rem",border:"1px solid #ccc",borderRadius:"4px"},children:[n.jsx("h3",{children:"Selected User:"}),n.jsx("pre",{children:JSON.stringify(s,null,2)})]})]})},args:{data:r,columns:e,sortable:!0}};var x,v,f;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    data: users,
    columns
  }
}`,...(f=(v=i.parameters)==null?void 0:v.docs)==null?void 0:f.source}}};var k,w,A;l.parameters={...l.parameters,docs:{...(k=l.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    data: users,
    columns,
    sortable: true
  }
}`,...(A=(w=l.parameters)==null?void 0:w.docs)==null?void 0:A.source}}};var U,D,j;c.parameters={...c.parameters,docs:{...(U=c.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    data: users,
    columns,
    filterable: true
  }
}`,...(j=(D=c.parameters)==null?void 0:D.docs)==null?void 0:j.source}}};var E,C,M;d.parameters={...d.parameters,docs:{...(E=d.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    data: users,
    columns,
    paginated: true,
    pageSize: 5
  },
  parameters: {
    docs: {
      description: {
        story: 'A paginated table with standard pagination controls below the table.'
      }
    }
  }
}`,...(M=(C=d.parameters)==null?void 0:C.docs)==null?void 0:M.source}}};var P,I,R;m.parameters={...m.parameters,docs:{...(P=m.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    data: largeDataSet,
    columns,
    paginated: true,
    pageSize: 10
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination with a large dataset (100 items) demonstrating first/last buttons and ellipsis.'
      }
    }
  }
}`,...(R=(I=m.parameters)==null?void 0:I.docs)==null?void 0:R.source}}};var z,J,T;p.parameters={...p.parameters,docs:{...(z=p.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    data: largeDataSet,
    columns,
    sortable: true,
    filterable: true,
    paginated: true,
    pageSize: 10,
    striped: true,
    bordered: true
  },
  parameters: {
    docs: {
      description: {
        story: 'A complete data table with sorting, filtering, and pagination enabled.'
      }
    }
  }
}`,...(T=(J=p.parameters)==null?void 0:J.docs)==null?void 0:T.source}}};var B,F,L;u.parameters={...u.parameters,docs:{...(B=u.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    data: users,
    columns,
    sortable: true,
    striped: true,
    bordered: true
  }
}`,...(L=(F=u.parameters)==null?void 0:F.docs)==null?void 0:L.source}}};var N,O,_;g.parameters={...g.parameters,docs:{...(N=g.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    data: users,
    columns,
    sortable: true,
    dense: true
  }
}`,...(_=(O=g.parameters)==null?void 0:O.docs)==null?void 0:_.source}}};var G,W,$;b.parameters={...b.parameters,docs:{...(G=b.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    data: [],
    columns,
    emptyMessage: 'No users found'
  }
}`,...($=(W=b.parameters)==null?void 0:W.docs)==null?void 0:$.source}}};var H,K,q;S.parameters={...S.parameters,docs:{...(H=S.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    data: users,
    columns,
    loading: true
  }
}`,...(q=(K=S.parameters)==null?void 0:K.docs)==null?void 0:q.source}}};var Q,V,X;h.parameters={...h.parameters,docs:{...(Q=h.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  render: args => {
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const handleRowClick = (row: any) => {
      setSelectedUser(row);
    };
    return <div>
        <DataTable {...args} onRowClick={handleRowClick} />
        {selectedUser && <div style={{
        marginTop: '1rem',
        padding: '1rem',
        border: '1px solid #ccc',
        borderRadius: '4px'
      }}>
            <h3>Selected User:</h3>
            <pre>{JSON.stringify(selectedUser, null, 2)}</pre>
          </div>}
      </div>;
  },
  args: {
    data: users,
    columns,
    sortable: true
  }
}`,...(X=(V=h.parameters)==null?void 0:V.docs)==null?void 0:X.source}}};const me=["Basic","Sortable","Filterable","Paginated","PaginatedLargeDataset","CompleteFeatures","Styled","Dense","Empty","Loading","Interactive"];export{i as Basic,p as CompleteFeatures,g as Dense,b as Empty,c as Filterable,h as Interactive,S as Loading,d as Paginated,m as PaginatedLargeDataset,l as Sortable,u as Styled,me as __namedExportsOrder,de as default};
