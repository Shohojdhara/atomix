import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{r as M}from"./index-BVDOR7y2.js";import{S as Je,a as Qe,b as Oe}from"./SideMenuList-DK1L7cHY.js";import{x as le}from"./components-BrxBU25R.js";import{C as oe,a as me,b as Ce,L as Se,B as ze,P as De,D as Fe,R as He,G as Ee,A as et}from"./RealTimeChart-C7aBaeDH.js";import{C as Me,G as tt,a as _e}from"./Container-DykHf4Sw.js";import{C as ce}from"./Card-Bp6dcI4n.js";import{I as fe}from"./Icon-k4CeN--q.js";import{B as xe}from"./Badge-Dm5vey4G.js";import{B as at}from"./Button-_O9VEUtI.js";import"./SpeakerX.es-Cg-mjUf1.js";const Xe=M.memo(M.forwardRef(({datasets:l=[],config:V={},advancedOptions:i={chartType:"line",realTime:!1,updateInterval:1e3,advancedTooltips:!0,enableSelection:!1,maxSelections:5,showTrendLines:!1,showMovingAverages:!1,movingAveragePeriod:7,enableExport:!1,exportFormats:["png","svg"],showDataTable:!1,enableAnnotations:!1,annotations:[]},onDataPointClick:X,...O},te)=>{const[C,J]=M.useState(new Set),[N,U]=M.useState(l),[z,W]=M.useState(null);M.useEffect(()=>{if(!i.realTime)return;const S=setInterval(()=>{U(L=>L.map(T=>({...T,data:T.data.map(A=>({...A,value:A.value+(Math.random()-.5)*10}))})))},i.updateInterval);return()=>clearInterval(S)},[i.realTime,i.updateInterval]);const w=M.useCallback((S,L)=>{const T=[];for(let A=L-1;A<S.length;A++){const y=S.slice(A-L+1,A+1).reduce((s,m)=>s+m.value,0)/L,t=S[A];t&&T.push({label:t.label,value:y,color:"rgba(255, 255, 255, 0.5)"})}return T},[]),v=M.useCallback((S,L)=>{if(!i.enableSelection)return;const T=`${S}-${L}`,A=new Set(C);if(A.has(T))A.delete(T);else{if(A.size>=(i.maxSelections||5)){const d=A.values().next().value;d&&A.delete(d)}A.add(T)}J(A)},[C,i.enableSelection,i.maxSelections]),H=M.useCallback(S=>{if(!i.enableExport)return;const L=document.querySelector(".c-chart__canvas svg");if(L)switch(S){case"png":const T=new XMLSerializer().serializeToString(L),A=document.createElement("canvas"),d=A.getContext("2d"),y=new Image;y.onload=()=>{A.width=y.width,A.height=y.height,d==null||d.drawImage(y,0,0);const F=document.createElement("a");F.download="chart.png",F.href=A.toDataURL(),F.click()},y.src="data:image/svg+xml;base64,"+btoa(T);break;case"svg":const t=new Blob([L.outerHTML],{type:"image/svg+xml"}),s=URL.createObjectURL(t),m=document.createElement("a");m.href=s,m.download="chart.svg",m.click();break;case"csv":const b=l.map(F=>F.data.map(Y=>`${Y.label},${Y.value}`).join(`
`)).join(`
`),n=new Blob([b],{type:"text/csv"}),u=URL.createObjectURL(n),R=document.createElement("a");R.href=u,R.download="chart-data.csv",R.click();break}},[l,i.enableExport]),_=M.useMemo(()=>{var R,F,Y,B,f;if(!N.length)return null;const S=800,L=400,T={top:20,right:30,bottom:40,left:50},A=S-T.left-T.right,d=L-T.top-T.bottom,y=N.flatMap($=>$.data.map(o=>o.value)),t=((R=V.yAxis)==null?void 0:R.min)??Math.min(0,...y),s=((F=V.yAxis)==null?void 0:F.max)??Math.max(...y),m=$=>{var g;const o=N[0];return(g=o==null?void 0:o.data)!=null&&g.length?T.left+$/(o.data.length-1)*A:T.left},b=$=>T.top+d-($-t)/(s-t)*d,n=N.map(($,o)=>{const g=$.color||`var(--atomix-color-${o+1})`,x=[];if(i.chartType==="line"||i.chartType==="area"){const h=$.data.map((r,a)=>({x:m(a),y:b(r.value)})).map((r,a)=>a===0?`M ${r.x},${r.y}`:`L ${r.x},${r.y}`).join(" ");i.chartType==="area"&&x.push(e.jsx("path",{d:`${h} L ${m($.data.length-1)},${b(t)} L ${m(0)},${b(t)} Z`,fill:g,opacity:.2},`area-${o}`)),x.push(e.jsx("path",{d:h,stroke:g,fill:"none",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"},`line-${o}`))}if($.data.forEach((E,h)=>{const r=m(h),a=b(E.value),p=`${o}-${h}`,k=C.has(p),G=(z==null?void 0:z.datasetIndex)===o&&(z==null?void 0:z.pointIndex)===h;x.push(e.jsx("circle",{cx:r,cy:a,r:k?6:G?5:4,fill:k?"var(--atomix-primary-500)":g,stroke:"#ffffff",strokeWidth:k?3:2,className:le.DATA_POINT_CLASS,onClick:()=>{v(o,h),X==null||X(E,o,h)},onMouseEnter:()=>W({datasetIndex:o,pointIndex:h,x:r,y:a,value:E.value,label:E.label}),onMouseLeave:()=>W(null),style:{cursor:"pointer",transition:"r 0.2s ease-in-out, fill 0.2s ease-in-out"}},`point-${o}-${h}`))}),i.showMovingAverages){const r=w($.data,i.movingAveragePeriod||7).map((a,p)=>({x:m(p+(i.movingAveragePeriod||7)-1),y:b(a.value)})).map((a,p)=>p===0?`M ${a.x},${a.y}`:`L ${a.x},${a.y}`).join(" ");x.push(e.jsx("path",{d:r,stroke:g,fill:"none",strokeWidth:1,strokeDasharray:"5,5",opacity:.7},`moving-avg-${o}`))}return x}),u=((Y=i.annotations)==null?void 0:Y.map(($,o)=>e.jsxs("g",{children:[e.jsx("circle",{cx:m($.x),cy:b($.y),r:4,fill:$.color||"#ef4444",stroke:"#ffffff",strokeWidth:2}),e.jsx("text",{x:m($.x)+10,y:b($.y)-10,fill:"#111827",fontSize:"12",fontWeight:"bold",children:$.label})]},`annotation-${o}`)))||[];return e.jsxs("svg",{width:"100%",height:"100%",viewBox:`0 0 ${S} ${L}`,preserveAspectRatio:"xMidYMid meet",children:[e.jsx("g",{className:le.GRID_CLASS,children:Array.from({length:5}).map(($,o)=>{const g=t+(s-t)*o/4;return e.jsx("line",{x1:T.left,y1:b(g),x2:S-T.right,y2:b(g),stroke:"#e5e7eb",strokeWidth:1,strokeDasharray:"4,4",opacity:.3},`grid-${o}`)})}),n.flat(),u,e.jsx("g",{className:`${le.AXIS_CLASS} ${le.AXIS_CLASS}--x`,children:(f=(B=N[0])==null?void 0:B.data)==null?void 0:f.map(($,o)=>e.jsx("text",{x:m(o),y:L-10,textAnchor:"middle",fontSize:"12",fill:"#374151",children:$.label},`x-label-${o}`))}),e.jsx("g",{className:`${le.AXIS_CLASS} ${le.AXIS_CLASS}--y`,children:Array.from({length:5}).map(($,o)=>{const g=t+(s-t)*o/4;return e.jsx("text",{x:T.left-10,y:b(g),textAnchor:"end",dominantBaseline:"middle",fontSize:"12",fill:"#374151",children:g.toFixed(g%1===0?0:1)},`y-label-${o}`)})})]})},[N,V,i,C,z,w,v,X]),D=M.useMemo(()=>{var S;return!i.advancedTooltips||!z?null:e.jsxs("div",{className:"advanced-tooltip",style:{position:"absolute",left:z.x+10,top:z.y-10,background:"var(--atomix-surface)",border:"1px solid #e5e7eb",borderRadius:"var(--radius-md)",padding:"0.5rem",fontSize:"var(--font-size-sm)",boxShadow:"var(--shadow-lg)",zIndex:1e3,pointerEvents:"none"},children:[e.jsx("div",{style:{fontWeight:"bold",marginBottom:"var(--space-1)"},children:z.label}),e.jsxs("div",{children:["Value: ",z.value]}),e.jsxs("div",{children:["Dataset: ",(S=N[z.datasetIndex])==null?void 0:S.label]})]})},[z,i.advancedTooltips,N]),j=M.useMemo(()=>{var S;return i.enableExport?e.jsx("div",{className:"chart-export-controls",style:{marginTop:"var(--space-3)"},children:e.jsx("div",{style:{display:"flex",gap:"0.5rem"},children:(S=i.exportFormats)==null?void 0:S.map(L=>e.jsxs("button",{onClick:()=>H(L),style:{padding:"var(--space-1) 0.5rem",background:"var(--atomix-surface)",border:"1px solid #e5e7eb",borderRadius:"var(--radius-sm)",fontSize:"var(--font-size-sm)",cursor:"pointer"},children:["Export ",L.toUpperCase()]},L))})}):null},[i.enableExport,i.exportFormats,H]),c=M.useMemo(()=>{var S,L;return!i.showDataTable||!N.length?null:e.jsx("div",{className:"chart-data-table",style:{marginTop:"var(--space-3)"},children:e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse"},children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{style:{padding:"0.5rem",textAlign:"left",borderBottom:"1px solid #e5e7eb"},children:"Label"}),N.map((T,A)=>e.jsx("th",{style:{padding:"0.5rem",textAlign:"left",borderBottom:"1px solid #e5e7eb"},children:T.label},A))]})}),e.jsx("tbody",{children:(L=(S=N[0])==null?void 0:S.data)==null?void 0:L.map((T,A)=>{var d,y,t;return e.jsxs("tr",{children:[e.jsx("td",{style:{padding:"0.5rem",borderBottom:"1px solid #e5e7eb"},children:(t=(y=(d=N[0])==null?void 0:d.data)==null?void 0:y[A])==null?void 0:t.label}),N.map((s,m)=>{var b;return e.jsx("td",{style:{padding:"0.5rem",borderBottom:"1px solid #e5e7eb"},children:(b=s.data[A])==null?void 0:b.value.toFixed(2)},m)})]},A)})})]})})},[i.showDataTable,N]);return e.jsxs(oe,{ref:te,type:"advanced",datasets:N,config:V,...O,children:[_,D,j,c]})}));Xe.displayName="AdvancedChart";const we=M.memo(M.forwardRef(({datasets:l=[],config:V={},chartType:i="line",particleEffects:X,...O},te)=>{const C=M.useRef(null),J=M.useRef(0),N=M.useRef(0),U=M.useRef([]),z=M.useCallback(W=>{var A,d;const w=C.current;if(!w)return;const v=w.getContext("2d");if(!v)return;const{width:H,height:_}=w,D=N.current*.02,j=v.createLinearGradient(0,0,0,_);j.addColorStop(0,"#0a0a0a"),j.addColorStop(.5,"#1a1a2e"),j.addColorStop(1,"#16213e"),v.fillStyle=j,v.fillRect(0,0,H,_);const c=((A=l[0])==null?void 0:A.data)||[],S=Math.max(...c.map(y=>y.value)),L=Math.min(...c.map(y=>y.value)),T=S-L||1;if(U.current.length<((X==null?void 0:X.count)||800))for(let y=0;y<3;y++){const t=Math.floor(Math.random()*c.length),s=c[t];if(s){const m=(s.value-L)/T,b=t/(c.length-1)*H,n=_-m*_*.6-_*.2;U.current.push({x:b+(Math.random()-.5)*50,y:n+(Math.random()-.5)*30,vx:(Math.random()-.5)*((X==null?void 0:X.speed)||2),vy:-Math.random()*2-.5,life:1,size:((X==null?void 0:X.size)||2)*(.5+m*.5),color:((d=X==null?void 0:X.colors)==null?void 0:d[t%(X.colors.length||1)])||"#22c55e",dataIndex:t})}}U.current=U.current.filter(y=>{var b;if(y.x+=y.vx,y.y+=y.vy,y.life-=.008,y.vy+=.015,y.life<=0||y.y>_+50)return!1;const t=y.dataIndex!==void 0&&c[y.dataIndex]?(((b=c[y.dataIndex])==null?void 0:b.value)||0)/S:.5,s=Math.sin(y.x*.01+D)*20*t+Math.sin(y.x*.008+D*1.2)*15,m=y.y+s;return v.save(),v.globalAlpha=y.life*.8,v.beginPath(),v.arc(y.x,m,y.size,0,Math.PI*2),v.fillStyle=y.color,v.fill(),v.shadowBlur=8,v.shadowColor=y.color,v.fill(),v.restore(),!0}),c.length>1&&((X==null?void 0:X.colors)||["#22c55e"]).forEach((t,s)=>{v.strokeStyle=t,v.lineWidth=2,v.globalAlpha=.6,v.beginPath(),c.forEach((m,b)=>{const n=b/(c.length-1)*H,u=(m.value-L)/T,F=_-u*_*.6-_*.2+Math.sin(n*.008+D+s)*30;b===0?v.moveTo(n,F):v.lineTo(n,F)}),v.stroke()}),v.strokeStyle="rgba(34, 197, 94, 0.1)",v.lineWidth=1,v.globalAlpha=.2;for(let y=0;y<H;y+=60)v.beginPath(),v.moveTo(y,0),v.lineTo(y,_),v.stroke();N.current+=1,J.current=requestAnimationFrame(z)},[X,l]);return M.useEffect(()=>{const W=C.current;if(!W)return;const w=()=>{W.width=W.offsetWidth,W.height=W.offsetHeight};return w(),window.addEventListener("resize",w),z(0),()=>{window.removeEventListener("resize",w),J.current&&cancelAnimationFrame(J.current)}},[z]),e.jsx(oe,{ref:te,type:i,datasets:l,config:V,...O,children:e.jsx("canvas",{ref:C,style:{width:"100%",height:"100%",borderRadius:"8px"}})})}));we.displayName="AnimatedChart";const Ye=M.memo(M.forwardRef(({bubbleData:l=[],config:V={},bubbleOptions:i={},onDataPointClick:X,...O},te)=>{var T,A,d,y,t,s;const{minBubbleSize:C=5,maxBubbleSize:J=50,bubbleOpacity:N=.7,showLabels:U=!0,labelPosition:z="center",enableAnimations:W=!0,animationDuration:w=1e3,showSizeLegend:v=!0,sizeLegendTitle:H="Size",colorScheme:_=["var(--atomix-primary)","var(--atomix-secondary)","var(--atomix-success)","var(--atomix-warning)","var(--atomix-error)","var(--atomix-info)"],sizeBasedColoring:D=!1}=i,[j,c]=M.useState(null),S=M.useCallback(({scales:m,colors:b,handlers:n})=>{if(!l.length)return null;const u=l.map(P=>P.x),R=l.map(P=>P.y),F=l.map(P=>P.size),Y=Math.min(...u),B=Math.max(...u),f=Math.min(...R),$=Math.max(...R),o=Math.min(...F),g=Math.max(...F),x=60,E=m.width-x*2,h=m.height-x*2,r=P=>x+(P-Y)/(B-Y)*E,a=P=>x+h-(P-f)/($-f)*h,p=P=>C+(P-o)/(g-o)*(J-C),k=l.map((P,q)=>{const Q=r(P.x),ee=a(P.y),ae=p(P.size);let se=P.color;if(!se)if(D){const re=Math.floor((P.size-o)/(g-o)*(_.length-1));se=_[re]}else se=_[q%_.length];const ie=[];if(ie.push(e.jsx("circle",{cx:Q,cy:ee,r:ae,fill:se,className:`c-chart__bubble ${W?"c-chart__bubble--animated":""}`,style:{opacity:N},onClick:()=>{var re;return(re=n.onDataPointClick)==null?void 0:re.call(n,P,0,q)},onMouseEnter:re=>{var pe;const ne=(pe=re.currentTarget.ownerSVGElement)==null?void 0:pe.getBoundingClientRect(),he=ne?ne.left+Q:re.clientX,ue=ne?ne.top+ee:re.clientY;c({index:q,clientX:he,clientY:ue})},onMouseLeave:()=>c(null)},`bubble-${q}`)),U){let re=Q,ne=ee,he="middle",ue="middle";switch(z){case"top":ne=ee-ae-5,ue="auto";break;case"bottom":ne=ee+ae+15,ue="hanging";break;case"left":re=Q-ae-5,he="end";break;case"right":re=Q+ae+5,he="start";break}ie.push(e.jsx("text",{x:re,y:ne,textAnchor:he,dominantBaseline:ue,className:`c-chart__bubble-label ${z==="center"?"c-chart__bubble-label--center":""}`,children:P.label},`label-${q}`))}return e.jsx("g",{children:ie},`bubble-group-${q}`)}),G=[];G.push(e.jsx("line",{x1:x,y1:m.height-x,x2:m.width-x,y2:m.height-x,className:"c-chart__axis-line c-chart__axis-line--x"},"x-axis")),G.push(e.jsx("line",{x1:x,y1:x,x2:x,y2:m.height-x,className:"c-chart__axis-line c-chart__axis-line--y"},"y-axis"));const I=5;for(let P=0;P<=I;P++){const q=Y+P/I*(B-Y),Q=r(q);G.push(e.jsxs("g",{children:[e.jsx("line",{x1:Q,y1:m.height-x,x2:Q,y2:m.height-x+5,className:"c-chart__tick-line"}),e.jsx("text",{x:Q,y:m.height-x+20,textAnchor:"middle",className:"c-chart__tick-label",children:q.toFixed(1)})]},`x-tick-${P}`))}const Z=5;for(let P=0;P<=Z;P++){const q=f+P/Z*($-f),Q=a(q);G.push(e.jsxs("g",{children:[e.jsx("line",{x1:x-5,y1:Q,x2:x,y2:Q,className:"c-chart__tick-line"}),e.jsx("text",{x:x-10,y:Q,textAnchor:"end",dominantBaseline:"middle",className:"c-chart__tick-label",children:q.toFixed(1)})]},`y-tick-${P}`))}const K=[];if(v){const P=m.width-120,q=30;K.push(e.jsxs("g",{children:[e.jsx("text",{x:P,y:q,fontSize:"12",fontWeight:"bold",fill:"var(--atomix-gray-8)",children:H}),[o,(o+g)/2,g].map((Q,ee)=>{const ae=p(Q),se=q+20+ee*30;return e.jsxs("g",{children:[e.jsx("circle",{cx:P+15,cy:se,r:ae/2,fill:"var(--atomix-gray-5)",opacity:"0.7"}),e.jsx("text",{x:P+35,y:se,dominantBaseline:"middle",fontSize:"10",fill:"var(--atomix-gray-6)",children:Q.toFixed(0)})]},`legend-${ee}`)})]},"size-legend"))}return e.jsxs("g",{children:[G,k,K]})},[l,C,J,N,U,z,W,w,v,H,_,D]),L=[{label:"Bubble Data",data:l.map(m=>({label:m.label,value:m.size,x:m.x,y:m.y}))}];return e.jsxs(oe,{ref:te,type:"bubble",datasets:L,config:V,...O,children:[e.jsx(me,{datasets:L,config:V,onDataPointClick:X,renderContent:S}),j&&l[j.index]&&e.jsx(Ce,{dataPoint:{label:((T=l[j.index])==null?void 0:T.label)||"",value:((A=l[j.index])==null?void 0:A.size)||0,metadata:{x:(d=l[j.index])==null?void 0:d.x,y:(y=l[j.index])==null?void 0:y.y,...(t=l[j.index])==null?void 0:t.metadata}},datasetLabel:"Bubble Data",datasetColor:(s=l[j.index])==null?void 0:s.color,position:{x:j.clientX,y:j.clientY},visible:!0})]})}));Ye.displayName="BubbleChart";const Ge=M.memo(M.forwardRef(({candlestickData:l=[],config:V={},candlestickOptions:i={bullishColor:"#4DFF9F",bearishColor:"#FF6B6B",candleWidth:.8,showVolume:!1,volumeHeightRatio:.3,showMovingAverages:!1,movingAveragePeriods:[20,50],movingAverageColors:["#FFD93D","#6BCF7F"],showTrendLines:!1,enableCrosshair:!0,showOHLCTooltip:!0,dateFormat:"short",pricePrecision:2,enableZoomPan:!1},onDataPointClick:X,...O},te)=>{const[C,J]=M.useState(null),[N,U]=M.useState(null),[z,W]=M.useState({scale:1,translateX:0,translateY:0}),w=M.useCallback((D,j)=>{const c=[];for(let S=0;S<D.length;S++)if(S<j-1)c.push(NaN);else{const L=D.slice(S-j+1,S+1).reduce((T,A)=>T+A.close,0);c.push(L/j)}return c},[]),v=M.useCallback(D=>{const j=typeof D=="string"?new Date(D):D;switch(i.dateFormat){case"short":return j.toLocaleDateString("en-US",{month:"short",day:"numeric"});case"medium":return j.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"2-digit"});case"long":return j.toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"});case"numeric":return j.toLocaleDateString("en-US");default:return j.toLocaleDateString("en-US",{month:"short",day:"numeric"})}},[i.dateFormat]),H=M.useMemo(()=>{var g,x,E,h;if(!l.length)return null;const D=800,j=i.showVolume?500:400,c={top:40,right:70,bottom:60,left:70},S=i.showVolume?j*(1-i.volumeHeightRatio):j-c.top-c.bottom,L=i.showVolume?j*i.volumeHeightRatio:0,T=D-c.left-c.right,A=l.flatMap(r=>[r.open,r.high,r.low,r.close]),d=((g=V.yAxis)==null?void 0:g.min)??Math.min(...A),y=((x=V.yAxis)==null?void 0:x.max)??Math.max(...A),t=y!==d?y-d:1,s=l.filter(r=>r.volume),m=i.showVolume&&s.length>0?Math.max(...s.map(r=>r.volume)):0,b=m>0?m:1,n=r=>{const a=l.length>1?l.length-1:1;return(c.left+r/a*T)*z.scale+z.translateX},u=r=>(c.top+S-(r-d)/t*S)*z.scale+z.translateY,R=r=>S+c.top+10+(b-r)/b*(L-20),F=Math.max(l.length,1),B=T/F*(i.candleWidth||.8),f=[];i.showVolume&&s.length>0&&(l.forEach((r,a)=>{if(!r.volume)return;const p=n(a),G=r.close>=r.open?i.bullishColor:i.bearishColor,I=isNaN(p)?0:p,Z=isNaN(B/4)?0:B/4,K=R(r.volume),P=S+c.top+10+L-20-K;f.push(e.jsx("rect",{x:I-Z,y:isNaN(K)?0:K,width:isNaN(B/2)?0:B/2,height:isNaN(P)?0:P,fill:G,opacity:.3},`volume-${a}`))}),f.push(e.jsx("line",{x1:c.left,y1:S+c.top+5,x2:D-c.right,y2:S+c.top+5,stroke:"#e5e7eb",strokeWidth:1},"volume-separator"))),l.forEach((r,a)=>{const p=n(a),k=u(r.open),G=u(r.high),I=u(r.low),Z=u(r.close),K=r.close>=r.open,P=K?i.bullishColor:i.bearishColor,q=Math.min(k,Z),Q=Math.abs(Z-k),ee=(C==null?void 0:C.index)===a,ae=isNaN(p)?0:p,se=isNaN(B/2)?0:B/2,ie=isNaN(q)?0:q,re=isNaN(Q)||Q===0?1:Math.abs(Q);f.push(e.jsxs("g",{children:[e.jsx("line",{x1:isNaN(ae)?0:ae,y1:isNaN(G)?0:G,x2:isNaN(ae)?0:ae,y2:isNaN(I)?0:I,stroke:P,className:`c-chart__wick ${ee?"c-chart__wick--hovered":""}`}),e.jsx("rect",{x:ae-se,y:ie,width:isNaN(B)?0:B,height:re,fill:P,stroke:P,className:`c-chart__candlestick ${K?"c-chart__candlestick--bullish":"c-chart__candlestick--bearish"}`,onMouseEnter:ne=>{var $e;const he=($e=ne.currentTarget.ownerSVGElement)==null?void 0:$e.getBoundingClientRect(),ue=he?he.left+ae:ne.clientX,pe=he?he.top+ie:ne.clientY;J({index:a,x:ue,y:pe,data:r})},onMouseLeave:()=>J(null),onClick:()=>X==null?void 0:X(r,0,a)}),ee&&e.jsx("rect",{x:ae-se-2,y:ie-2,width:isNaN(B+4)?0:B+4,height:isNaN(re+4)?5:Math.max(re+4,5),fill:"none",stroke:P,className:"c-chart__candlestick-highlight"})]},`candle-${a}`))}),i.showMovingAverages&&i.movingAveragePeriods&&i.movingAveragePeriods.forEach((r,a)=>{var I;const p=w(l,r),k=((I=i.movingAverageColors)==null?void 0:I[a])||"#FFD93D",G=p.map((Z,K)=>{if(isNaN(Z))return"";const P=n(K),q=u(Z);if(K===0)return`M ${isNaN(P)?0:P},${isNaN(q)?0:q}`;const Q=p[K-1];return Q!==void 0&&isNaN(Q)?`M ${isNaN(P)?0:P},${isNaN(q)?0:q}`:`L ${isNaN(P)?0:P},${isNaN(q)?0:q}`}).join(" ");f.push(e.jsx("path",{d:G,stroke:k,fill:"none",className:"c-chart__moving-average"},`ma-${r}`))}),N&&i.enableCrosshair&&f.push(e.jsxs("g",{className:"c-chart__crosshair",children:[e.jsx("line",{x1:isNaN(N.x)?0:N.x,y1:c.top,x2:isNaN(N.x)?0:N.x,y2:S+c.top,className:"c-chart__crosshair-line c-chart__crosshair-line--vertical"}),e.jsx("line",{x1:c.left,y1:isNaN(N.y)?0:N.y,x2:D-c.right,y2:isNaN(N.y)?0:N.y,className:"c-chart__crosshair-line c-chart__crosshair-line--horizontal"})]},"crosshair"));const $=e.jsxs("g",{className:le.GRID_CLASS,children:[((E=V.yAxis)==null?void 0:E.showGrid)&&Array.from({length:6}).map((r,a)=>{const p=d+t*a/5,k=u(p);return e.jsx("line",{x1:c.left,y1:isNaN(k)?0:k,x2:D-c.right,y2:isNaN(k)?0:k,stroke:"#e5e7eb",strokeWidth:1,strokeDasharray:"2,2",opacity:.2},`price-grid-${a}`)}),((h=V.xAxis)==null?void 0:h.showGrid)&&l.map((r,a)=>{if(a%Math.ceil(l.length/10)!==0)return null;const p=n(a);return e.jsx("line",{x1:isNaN(p)?0:p,y1:c.top,x2:isNaN(p)?0:p,y2:S+c.top,stroke:"#e5e7eb",strokeWidth:1,strokeDasharray:"2,2",opacity:.2},`time-grid-${a}`)})]}),o=e.jsxs(e.Fragment,{children:[e.jsxs("g",{className:`${le.AXIS_CLASS} ${le.AXIS_CLASS}--y`,children:[e.jsx("line",{x1:c.left,y1:c.top,x2:c.left,y2:S+c.top,stroke:"#e5e7eb",strokeWidth:1}),Array.from({length:6}).map((r,a)=>{const p=d+t*a/5,k=u(p);return e.jsxs("g",{children:[e.jsx("line",{x1:c.left-5,y1:isNaN(k)?0:k,x2:c.left,y2:isNaN(k)?0:k,stroke:"#e5e7eb",strokeWidth:1}),e.jsxs("text",{x:c.left-10,y:isNaN(k)?0:k,textAnchor:"end",dominantBaseline:"middle",fontSize:"12",fill:"#374151",children:["$",p.toFixed(i.pricePrecision)]})]},`price-axis-${a}`)})]}),e.jsxs("g",{className:`${le.AXIS_CLASS} ${le.AXIS_CLASS}--x`,children:[e.jsx("line",{x1:c.left,y1:S+c.top,x2:D-c.right,y2:S+c.top,stroke:"#e5e7eb",strokeWidth:1}),l.map((r,a)=>{if(a%Math.ceil(l.length/8)!==0)return null;const p=n(a);return e.jsxs("g",{children:[e.jsx("line",{x1:isNaN(p)?0:p,y1:S+c.top,x2:isNaN(p)?0:p,y2:S+c.top+5,stroke:"#e5e7eb",strokeWidth:1}),e.jsx("text",{x:isNaN(p)?0:p,y:S+c.top+20,textAnchor:"middle",fontSize:"12",fill:"#374151",children:v(r.date)})]},`time-axis-${a}`)})]}),i.showVolume&&s.length>0&&e.jsxs("g",{className:`${le.AXIS_CLASS} ${le.AXIS_CLASS}--volume`,children:[e.jsx("line",{x1:D-c.right,y1:S+c.top+10,x2:D-c.right,y2:j-c.bottom,stroke:"#e5e7eb",strokeWidth:1}),Array.from({length:3}).map((r,a)=>{const p=b*(a+1)/3,k=R(p);return e.jsxs("g",{children:[e.jsx("line",{x1:D-c.right,y1:isNaN(k)?0:k,x2:D-c.right+5,y2:isNaN(k)?0:k,stroke:"#e5e7eb",strokeWidth:1}),e.jsx("text",{x:D-c.right+10,y:isNaN(k)?0:k,textAnchor:"start",dominantBaseline:"middle",fontSize:"10",fill:"#374151",children:p>1e6?`${(p/1e6).toFixed(1)}M`:p>1e3?`${(p/1e3).toFixed(0)}K`:`${Math.round(p)}`})]},`volume-axis-${a}`)})]})]});return e.jsxs("svg",{width:"100%",height:"100%",viewBox:`0 0 ${D} ${j}`,preserveAspectRatio:"xMidYMid meet",onMouseMove:r=>{if(!i.enableCrosshair)return;const a=r.currentTarget.getBoundingClientRect(),p=r.clientX-a.left,k=r.clientY-a.top;U({x:p,y:k})},onMouseLeave:()=>U(null),style:{cursor:"crosshair"},children:[$,o,f]})},[l,V,i,C,N,z,w,v,X]),_=M.useCallback(D=>{if(!C)return null;const{data:j}=C,c=j.close>=j.open,S=j.close-j.open,L=S/j.open*100;return e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:"bold",marginBottom:"0.5rem"},children:v(j.date)}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.25rem",fontSize:"0.75rem"},children:[e.jsxs("div",{children:["Open: ",e.jsxs("strong",{children:["$",j.open.toFixed(i.pricePrecision)]})]}),e.jsxs("div",{children:["High: ",e.jsxs("strong",{children:["$",j.high.toFixed(i.pricePrecision)]})]}),e.jsxs("div",{children:["Low: ",e.jsxs("strong",{children:["$",j.low.toFixed(i.pricePrecision)]})]}),e.jsxs("div",{children:["Close: ",e.jsxs("strong",{children:["$",j.close.toFixed(i.pricePrecision)]})]})]}),e.jsxs("div",{style:{marginTop:"0.5rem",paddingTop:"0.5rem",borderTop:"1px solid var(--atomix-gray-3)",color:c?i.bullishColor:i.bearishColor,fontWeight:"bold"},children:[c?"+":"",S.toFixed(i.pricePrecision)," (",L.toFixed(2),"%)"]}),j.volume&&e.jsxs("div",{style:{marginTop:"0.25rem",fontSize:"0.75rem"},children:["Volume: ",j.volume.toLocaleString()]})]})},[i,C,v]);return e.jsxs(oe,{ref:te,type:"candlestick",datasets:[],config:V,...O,children:[H,i.showOHLCTooltip&&C&&e.jsx(Ce,{dataPoint:{label:v(C.data.date),value:C.data.close,metadata:{open:C.data.open,high:C.data.high,low:C.data.low,close:C.data.close,volume:C.data.volume}},datasetLabel:"OHLC",position:{x:C.x,y:C.y},visible:!0,customRenderer:_}),i.showMovingAverages&&i.movingAveragePeriods&&e.jsx("div",{className:le.LEGEND_CLASS,style:{display:"flex",gap:"0.75rem",marginTop:"0.5rem",fontSize:"0.875rem"},children:i.movingAveragePeriods.map((D,j)=>{var c;return e.jsxs("div",{style:{display:"flex",alignItems:"center"},children:[e.jsx("div",{className:le.LEGEND_COLOR_CLASS,style:{width:"12px",height:"2px",backgroundColor:((c=i.movingAverageColors)==null?void 0:c[j])||"#FFD93D",marginRight:"0.25rem"}}),e.jsxs("span",{className:le.LEGEND_LABEL_CLASS,children:["MA",D]})]},D)})})]})}));Ge.displayName="CandlestickChart";const Ie=M.memo(M.forwardRef(({funnelData:l=[],config:V={},funnelOptions:i={},onDataPointClick:X,...O},te)=>{const{direction:C="vertical",showLabels:J=!0,showValues:N=!0,showPercentages:U=!1,labelPosition:z="outside",neckWidth:W=.3,neckHeight:w=.2,segmentGap:v=2,colorScheme:H=["var(--atomix-primary)","var(--atomix-secondary)","var(--atomix-success)","var(--atomix-warning)","var(--atomix-error)","var(--atomix-info)"],useGradient:_=!0,animate:D=!0,animationDuration:j=1e3,animationDelay:c=200,valueFormatter:S=s=>s.toLocaleString(),showConversionRates:L=!0,conversionRatePosition:T="between",proportional:A=!0,minSegmentRatio:d=.1}=i,y=M.useCallback(({scales:s,colors:m,handlers:b})=>{if(!l.length)return null;const n=60,u=s.width-n*2,R=s.height-n*2,F=Math.max(...l.map(f=>f.value)),Y=l.map((f,$)=>{const o=f.value/F*100,g=$>0&&l[$-1]?f.value/l[$-1].value*100:100;return{...f,percentage:o,conversionRate:g,index:$}}),B=[];if(C==="vertical"){const f=(R-(l.length-1)*v)/l.length;Y.forEach(($,o)=>{const g=n+o*(f+v);let x;if(A){const a=Math.max($.percentage/100,d);x=u*a}else{const a=Math.max(1-o/(l.length-1)*(1-W),d);x=u*a}const E=n+(u-x)/2;let h=$.color||H[o%H.length];if(_){const a=`funnel-gradient-${o}`;B.push(e.jsx("defs",{children:e.jsxs("linearGradient",{id:a,x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[e.jsx("stop",{offset:"0%",stopColor:h,stopOpacity:"0.8"}),e.jsx("stop",{offset:"100%",stopColor:h,stopOpacity:"1"})]})},`gradient-def-${o}`)),h=`url(#${a})`}let r;if(o===l.length-1)r=`M ${E} ${g} L ${E+x} ${g} L ${E+x} ${g+f} L ${E} ${g+f} Z`;else{const a=Y[o+1];let p;if(A&&a){const G=Math.max(a.percentage/100,d);p=u*G}else{const G=Math.max(1-(o+1)/(l.length-1)*(1-W),d);p=u*G}const k=n+(u-p)/2;r=`M ${E} ${g} L ${E+x} ${g} L ${k+p} ${g+f} L ${k} ${g+f} Z`}if(B.push(e.jsx("path",{d:r,fill:h,className:`c-chart__funnel-segment ${D?"c-chart__funnel-segment--animated":""}`,style:{animationDelay:D?`${o*c}ms`:"0ms"},onClick:()=>{var a;return(a=b.onDataPointClick)==null?void 0:a.call(b,$,0,o)}},`segment-${o}`)),J||N||U){const a=n+u/2,p=g+f/2;let k=a,G=a;z==="outside"&&(k=n+u+10,G=n+u+10);let I=[];if(J&&I.push(e.jsx("text",{x:k,y:p-5,textAnchor:z==="outside"?"start":"middle",dominantBaseline:"middle",className:`c-chart__funnel-label ${z==="inside"?"c-chart__funnel-label--inside":"c-chart__funnel-label--outside"}`,children:$.label},`label-${o}`)),N||U){let Z="";N&&U?Z=`${S($.value)} (${$.percentage.toFixed(1)}%)`:N?Z=S($.value):Z=`${$.percentage.toFixed(1)}%`,I.push(e.jsx("text",{x:G,y:p+(J?10:0),textAnchor:z==="outside"?"start":"middle",dominantBaseline:"middle",className:`c-chart__funnel-value ${z==="inside"?"c-chart__funnel-value--inside":"c-chart__funnel-value--outside"}`,children:Z},`value-${o}`))}B.push(...I)}if(L&&o>0){const a=T==="between"?g-v/2:g+f/2;B.push(e.jsxs("text",{x:n+u/2,y:a,textAnchor:"middle",dominantBaseline:"middle",className:"c-chart__funnel-conversion",children:[$.conversionRate.toFixed(1),"%"]},`conversion-${o}`))}})}else(u-(l.length-1)*v)/l.length,Y.forEach((f,$)=>{Math.max(A?f.percentage/100:1-$/(l.length-1)*(1-w),d)});return e.jsx("g",{children:B})},[l,C,J,N,U,z,W,w,v,H,_,D,j,c,S,L,T,A,d]),t=[{label:"Funnel Data",data:l.map(s=>({label:s.label,value:s.value}))}];return e.jsx(oe,{ref:te,type:"funnel",datasets:t,config:V,...O,children:e.jsx(me,{datasets:t,config:V,onDataPointClick:X,renderContent:y})})}));Ie.displayName="FunnelChart";const je=M.memo(M.forwardRef(({data:l=[],colorScale:V={scheme:"github",steps:5},cellConfig:i={width:12,height:12,borderRadius:2,spacing:2,showBorders:!1},showValues:X=!1,valueFormatter:O=w=>w.toFixed(0),showColorLegend:te=!0,tooltipConfig:C={enabled:!0},variant:J="grid",animationConfig:N={enabled:!0,duration:800,delay:50,easing:"ease-out"},config:U={},...z},W)=>{const[w,v]=M.useState(null),[H,_]=M.useState({x:0,y:0}),D=M.useMemo(()=>{if(console.log("HeatmapChart data:",l),!l.length)return console.log("No data provided to HeatmapChart"),{matrix:[],xLabels:[],yLabels:[],minValue:0,maxValue:1};const n=[...new Set(l.map(f=>f.x))].sort(),u=[...new Set(l.map(f=>f.y))].sort(),R=l.map(f=>f.value),F=V.min??Math.min(...R),Y=V.max??Math.max(...R),B=u.map(()=>new Array(n.length).fill(null));return l.forEach(f=>{const $=n.indexOf(f.x),o=u.indexOf(f.y);$>=0&&o>=0&&B[o]&&(B[o][$]=f)}),{matrix:B,xLabels:n,yLabels:u,minValue:F,maxValue:Y}},[l,V.min,V.max]),j={viridis:["#440154","#482777","#3f4a8a","#31678e","#26838f","#1f9d8a","#6cce5a","#b6de2b","#fee825"],plasma:["#0d0887","#5302a3","#8b0aa5","#b83289","#db5c68","#f48849","#febd2a","#f0f921"],inferno:["#000004","#1b0c41","#4a0c6b","#781c6d","#a52c60","#cf4446","#ed6925","#fb9b06","#fcffa4"],magma:["#000004","#1c1044","#4f127b","#812581","#b5367a","#e55964","#fb8761","#fec287","#fcfdbf"],blues:["#f7fbff","#deebf7","#c6dbef","#9ecae1","#6baed6","#4292c6","#2171b5","#08519c","#08306b"],reds:["#fff5f0","#fee0d2","#fcbba1","#fc9272","#fb6a4a","#ef3b2c","#cb181d","#a50f15","#67000d"],greens:["#f7fcf5","#e5f5e0","#c7e9c0","#a1d99b","#74c476","#41ab5d","#238b45","#006d2c","#00441b"],github:["#ebedf0","#9be9a8","#40c463","#30a14e","#216e39"],custom:V.colors||["#ffffff","#000000"]},c=M.useCallback(n=>{const{minValue:u,maxValue:R}=D,F=R-u;if(F===0)return j[V.scheme][0];const Y=(n-u)/F,B=j[V.scheme],f=V.steps||B.length,$=Math.min(Math.floor(Y*f),f-1),o=Math.floor($/f*(B.length-1));return B[o]},[D,V.scheme,V.steps,j]),S=M.useCallback((n,u)=>{v(n),u&&n&&(u.currentTarget.getBoundingClientRect(),_({x:u.clientX,y:u.clientY}))},[]),L=M.useCallback(({scales:n})=>{const{matrix:u,xLabels:R,yLabels:F}=D;if(console.log("Rendering heatmap with matrix:",u,"xLabels:",R,"yLabels:",F),!u.length)return console.log("Matrix is empty, not rendering"),null;const Y=i.width||40,B=i.height||40,f=i.spacing||2,$=i.borderRadius||4,o=R.length*(Y+f)-f;F.length*(B+f)-f;const g=100,x=50;return e.jsxs("g",{children:[e.jsx("defs",{children:te&&e.jsx("linearGradient",{id:"heatmap-legend-gradient",x1:"0%",y1:"100%",x2:"0%",y2:"0%",children:j[V.scheme].map((E,h)=>e.jsx("stop",{offset:`${h/(j[V.scheme].length-1)*100}%`,stopColor:E},h))})}),R.map((E,h)=>(J==="calendar"?h%4===0:h%Math.max(1,Math.floor(R.length/12))===0)?e.jsx("text",{x:g+h*(Y+f)+Y/2,y:x-8,textAnchor:"middle",className:"c-chart__heatmap-axis-label",fontSize:"11",fill:"var(--atomix-gray-7)",children:String(E)},`x-label-${h}`):null),F.map((E,h)=>e.jsx("text",{x:g-8,y:x+h*(B+f)+B/2,textAnchor:"end",dominantBaseline:"middle",className:"c-chart__heatmap-axis-label",fontSize:"11",fill:"var(--atomix-gray-7)",children:String(E)},`y-label-${h}`)),u.map((E,h)=>E.map((r,a)=>{const p=g+a*(Y+f),k=x+h*(B+f),G=N.enabled?(h*R.length+a)*(N.delay||50):0;if(!r)return e.jsx("rect",{x:p,y:k,width:Y,height:B,rx:$,fill:"var(--atomix-gray-2)",stroke:i.showBorders?"var(--atomix-gray-3)":"none",strokeWidth:i.showBorders?.5:0,className:"c-chart__heatmap-cell c-chart__heatmap-cell--empty",style:{animation:N.enabled?`chart-fade-in ${N.duration}ms ${N.easing} ${G}ms both`:"none"}},`empty-${h}-${a}`);const I=c(r.value),Z=w===r;return e.jsxs("g",{children:[e.jsx("rect",{x:p,y:k,width:Y,height:B,fill:I,rx:$,stroke:i.showBorders?"var(--atomix-gray-3)":"none",strokeWidth:i.showBorders?.5:0,className:`c-chart__heatmap-cell ${Z?"c-chart__heatmap-cell--hovered":""}`,onMouseEnter:K=>S(r,K),onMouseLeave:()=>S(null),style:{cursor:"pointer",transition:"all 0.2s ease",animation:N.enabled?`chart-scale-in ${N.duration}ms ${N.easing} ${G}ms both`:"none",transform:Z?"scale(1.1)":"scale(1)",filter:Z?"drop-shadow(0 2px 4px rgba(0,0,0,0.2))":"none"}}),X&&r.value>0&&e.jsx("text",{x:p+Y/2,y:k+B/2,textAnchor:"middle",dominantBaseline:"middle",fontSize:"9",fontWeight:"500",fill:r.value>(D.minValue+D.maxValue)/2?"white":"var(--atomix-gray-8)",className:"c-chart__heatmap-value",style:{pointerEvents:"none"},children:O(r.value)})]},`cell-${h}-${a}`)})),te&&e.jsxs("g",{transform:`translate(${g+o+40}, ${x})`,children:[e.jsx("text",{x:"0",y:"-15",fontSize:"12",fontWeight:"600",fill:"var(--atomix-gray-8)",children:"Activity"}),e.jsxs("g",{transform:"translate(0, 10)",children:[e.jsx("text",{x:"-5",y:"15",fontSize:"10",fill:"var(--atomix-gray-6)",textAnchor:"end",children:"Less"}),j[V.scheme].map((E,h)=>e.jsx("rect",{x:h*14,y:0,width:12,height:12,fill:E,rx:2,stroke:"var(--atomix-gray-3)",strokeWidth:.5},h)),e.jsx("text",{x:j[V.scheme].length*14+5,y:"15",fontSize:"10",fill:"var(--atomix-gray-6)",children:"More"})]})]})]})},[D,i,X,O,te,c,w,S,V.scheme,j]),{matrix:T,xLabels:A,yLabels:d}=D,y=i.width||12,t=i.height||12,s=i.spacing||2,m=Math.max(600,A.length*(y+s)+200),b=Math.max(400,d.length*(t+s)+150);return e.jsxs(oe,{ref:W,type:"heatmap",datasets:[],config:U,className:`c-chart--heatmap c-chart--${J}`,...z,children:[e.jsx("svg",{width:m,height:b,viewBox:`0 0 ${m} ${b}`,className:"c-chart__svg",style:{width:"100%",height:"100%"},children:L({scales:{width:m,height:b}})}),C.enabled&&w&&e.jsx("div",{className:"c-chart__tooltip",style:{position:"fixed",left:H.x+10,top:H.y-10},children:C.formatter?C.formatter(w):`${w.label||`${w.x}, ${w.y}`}: ${w.value}`})]})}));je.displayName="HeatmapChart";try{je.displayName="HeatmapChart",je.__docgenInfo={description:"Generate sample heatmap data for testing",displayName:"HeatmapChart",props:{weeks:{defaultValue:{value:"52"},description:"",name:"weeks",required:!1,type:{name:"number"}},daysPerWeek:{defaultValue:{value:"7"},description:"",name:"daysPerWeek",required:!1,type:{name:"number"}},maxValue:{defaultValue:{value:"10"},description:"",name:"maxValue",required:!1,type:{name:"number"}}}}}catch{}const Ne=M.memo(M.forwardRef(({datasets:l=[],yAxes:V=[],xAxis:i,config:X={},syncZoom:O=!0,showCrosshair:te=!0,...C},J)=>{const N=M.useMemo(()=>{const z={},j=V.filter(n=>n.position==="left"),c=V.filter(n=>n.position==="right"),S=j.length*60,L=c.length*60,T=S,A=800-L,d=40,y=340,t=A-T,s=y-d;V.forEach((n,u)=>{const R=l.filter(g=>g.yAxisId===n.id);if(R.length===0)return;const F=R.flatMap(g=>{var x;return((x=g.data)==null?void 0:x.map(E=>E.value).filter(E=>typeof E=="number"))||[]}),Y=n.min??Math.min(0,...F),B=n.max??Math.max(...F,1),f=B-Y,$=g=>f===0?d+s/2:d+s-(g-Y)/f*s;let o;if(n.position==="left")o=j.findIndex(x=>x.id===n.id)*60+30;else{const g=c.findIndex(x=>x.id===n.id);o=A+g*60+30}z[n.id]={yScale:$,minValue:Y,maxValue:B,valueRange:f,axisX:o,tickCount:n.tickCount||5,format:n.format||(g=>g.toFixed(1))}});const m=Math.max(...l.map(n=>{var u;return((u=n.data)==null?void 0:u.length)||0})),b=(n,u)=>{const R=u||m;return R<=1?T+t/2:T+n/(R-1)*t};return z.x={xScale:b,plotAreaLeft:T,plotAreaRight:A,plotAreaTop:d,plotAreaBottom:y,plotAreaWidth:t,plotAreaHeight:s,maxDataLength:m},z},[l,V,i]),U=M.useCallback(({scales:z,colors:W,datasets:w,handlers:v})=>{var T,A;if(!w.length||!N.x)return null;const{xScale:H,plotAreaLeft:_,plotAreaRight:D,plotAreaTop:j,plotAreaBottom:c,plotAreaWidth:S,plotAreaHeight:L}=N.x;return e.jsxs("g",{children:[e.jsx("rect",{x:_,y:j,width:S,height:L,className:"c-chart__plot-area"}),V.map((d,y)=>{const t=N[d.id];if(!t)return null;const s=Array.from({length:t.tickCount},(m,b)=>{const n=t.minValue+(t.maxValue-t.minValue)*(b/(t.tickCount-1));return{value:n,y:t.yScale(n),label:t.format(n)}});return e.jsxs("g",{children:[d.showGrid&&s.map((m,b)=>e.jsx("line",{x1:_,y1:m.y,x2:D,y2:m.y,className:"c-chart__grid"},`grid-${b}`)),e.jsx("line",{x1:t.axisX,y1:j,x2:t.axisX,y2:c,stroke:d.color||"var(--atomix-secondary-text)",className:"c-chart__axis-line"}),s.map((m,b)=>e.jsxs("g",{children:[e.jsx("line",{x1:t.axisX-5,y1:m.y,x2:t.axisX+5,y2:m.y,stroke:d.color||"var(--atomix-gray-6)",strokeWidth:"1"}),e.jsx("text",{x:d.position==="left"?t.axisX-10:t.axisX+10,y:m.y,textAnchor:d.position==="left"?"end":"start",dominantBaseline:"middle",className:"c-chart__tick-label",children:m.label})]},`tick-${b}`)),d.label&&e.jsx("text",{x:t.axisX,y:d.position==="left"?20:c+40,textAnchor:"middle",fontSize:"14",fontWeight:"bold",fill:d.color||"var(--atomix-gray-8)",transform:d.position==="left"?`rotate(-90, ${t.axisX}, 20)`:"",children:d.label})]},`y-axis-${d.id}`)}),e.jsxs("g",{children:[e.jsx("line",{x1:_,y1:c,x2:D,y2:c,stroke:"var(--atomix-gray-6)",strokeWidth:"2"}),(A=(T=w[0])==null?void 0:T.data)==null?void 0:A.map((d,y)=>{var s,m;const t=H(y,((m=(s=w[0])==null?void 0:s.data)==null?void 0:m.length)||0);return e.jsxs("g",{children:[e.jsx("line",{x1:t,y1:c,x2:t,y2:c+5,stroke:"var(--atomix-gray-6)",strokeWidth:"1"}),e.jsx("text",{x:t,y:c+20,textAnchor:"middle",fontSize:"12",fill:"var(--atomix-gray-7)",children:d.label})]},`x-tick-${y}`)})]}),w.map((d,y)=>{var b,n,u,R,F,Y,B;const t=N[d.yAxisId||((b=V[0])==null?void 0:b.id)||""];if(!t)return null;const s=d.color||W[y],m=d.type||"line";if(m==="line"||m==="area"){const f=((n=d.data)==null?void 0:n.map((o,g)=>{var x;return{x:H(g,(x=d.data)==null?void 0:x.length),y:t.yScale(o.value)}}))||[],$=f.length>1?`M ${f.map(o=>`${o.x},${o.y}`).join(" L ")}`:"";return e.jsxs("g",{children:[m==="area"&&e.jsx("path",{d:`${$} L ${((u=f[f.length-1])==null?void 0:u.x)||0},${c} L ${((R=f[0])==null?void 0:R.x)||0},${c} Z`,fill:s,opacity:"0.3"}),e.jsx("path",{d:$,stroke:s,fill:"none",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}),(F=d.data)==null?void 0:F.map((o,g)=>{var h;const x=H(g,(h=d.data)==null?void 0:h.length),E=t.yScale(o.value);return e.jsx("circle",{cx:x,cy:E,r:"4",fill:s,className:"c-chart__data-point",onClick:()=>{var r;return(r=v.onDataPointClick)==null?void 0:r.call(v,o,y,g)}},`point-${g}`)})]},`dataset-${y}`)}if(m==="bar"){const f=S/(((Y=d.data)==null?void 0:Y.length)||1)*.6;return e.jsx("g",{children:(B=d.data)==null?void 0:B.map(($,o)=>{var h;const g=H(o,((h=d.data)==null?void 0:h.length)||0),x=t.yScale($.value),E=c-x;return e.jsx("rect",{x:g-f/2,y:x,width:f,height:E,fill:s,rx:"4",onClick:()=>{var r;return(r=v.onDataPointClick)==null?void 0:r.call(v,$,y,o)},style:{cursor:"pointer"}},`bar-${o}`)})},`bars-${y}`)}return null}),e.jsx("g",{transform:`translate(${_}, ${c+50})`,children:w.map((d,y)=>{const t=d.color||W[y],s=y*120;return e.jsxs("g",{transform:`translate(${s}, 0)`,children:[e.jsx("rect",{x:"0",y:"0",width:"12",height:"12",fill:t,rx:"2"}),e.jsxs("text",{x:"18",y:"9",fontSize:"12",fill:"var(--atomix-gray-8)",children:[d.label," (",d.yAxisId,")"]})]},`legend-${y}`)})})]})},[N,V]);return e.jsx(oe,{ref:J,type:"line",datasets:l,config:X,title:"Multi-Axis Chart",showToolbar:!0,...C,children:e.jsx(me,{datasets:l,config:X,width:800,height:500,renderContent:U,interactive:!0,enableAccessibility:!0})})}));Ne.displayName="MultiAxisChart";const Ue=M.memo(M.forwardRef(({datasets:l=[],config:V={},radarOptions:i={},onDataPointClick:X,...O},te)=>{var A,d,y,t;const{gridLevels:C=5,showGrid:J=!0,showAxisLabels:N=!0,fillArea:U=!0,fillOpacity:z=.3,showDataPoints:W=!0,pointRadius:w=4,lineWidth:v=2,smooth:H=!1,scaleType:_="linear",scaleMin:D=0,scaleMax:j}=i,[c,S]=M.useState(null),L=M.useCallback(({scales:s,colors:m,datasets:b,handlers:n})=>{if(!b.length)return null;const u=s.width/2,R=s.height/2,F=Math.min(u,R)*.8,B=b[0].data||[],f=2*Math.PI/B.length,$=j||Math.max(...b.flatMap(r=>{var a;return((a=r.data)==null?void 0:a.map(p=>p.value))||[]})),o=D,g=$-o,x=[];if(J){for(let r=1;r<=C;r++){const a=F*r/C,k=`M ${B.map((G,I)=>{const Z=I*f-Math.PI/2;return{x:u+Math.cos(Z)*a,y:R+Math.sin(Z)*a}}).map(G=>`${G.x},${G.y}`).join(" L ")} Z`;x.push(e.jsx("path",{d:k,fill:"none",className:"c-chart__radar-grid"},`grid-${r}`))}B.forEach((r,a)=>{const p=a*f-Math.PI/2,k=u+Math.cos(p)*F,G=R+Math.sin(p)*F;x.push(e.jsx("line",{x1:u,y1:R,x2:k,y2:G,className:"c-chart__radar-axis"},`axis-${a}`))})}const E=[];N&&B.forEach((r,a)=>{const p=a*f-Math.PI/2,k=F+20,G=u+Math.cos(p)*k,I=R+Math.sin(p)*k;E.push(e.jsx("text",{x:G,y:I,textAnchor:"middle",dominantBaseline:"middle",className:"c-chart__radar-label",children:r.label},`label-${a}`))});const h=b.map((r,a)=>{var Z;const p=r.color||m[a],k=((Z=r.data)==null?void 0:Z.map((K,P)=>{const q=P*f-Math.PI/2,Q=(K.value-o)/g,ee=F*Q;return{x:u+Math.cos(q)*ee,y:R+Math.sin(q)*ee,originalPoint:K,angle:q,radius:ee}}))||[],G=H?T(k):`M ${k.map(K=>`${K.x},${K.y}`).join(" L ")} Z`,I=[];return U&&I.push(e.jsx("path",{d:G,fill:p,className:"c-chart__radar-fill",style:{opacity:z}},`fill-${a}`)),I.push(e.jsx("path",{d:G,fill:"none",stroke:p,className:"c-chart__radar-line",style:{strokeWidth:v}},`line-${a}`)),W&&k.forEach((K,P)=>{I.push(e.jsx("circle",{cx:K.x,cy:K.y,r:w,fill:p,className:"c-chart__radar-point",onClick:()=>{var q;return(q=n.onDataPointClick)==null?void 0:q.call(n,K.originalPoint,a,P)},onMouseEnter:q=>{var se;const Q=(se=q.currentTarget.ownerSVGElement)==null?void 0:se.getBoundingClientRect(),ee=Q?Q.left+K.x:q.clientX,ae=Q?Q.top+K.y:q.clientY;S({datasetIndex:a,pointIndex:P,clientX:ee,clientY:ae})},onMouseLeave:()=>S(null)},`point-${a}-${P}`))}),e.jsx("g",{children:I},`dataset-${a}`)});return e.jsxs("g",{children:[x,h,E]})},[C,J,N,U,z,W,w,v,H,D,j]),T=M.useCallback(s=>{if(s.length<3)return`M ${s.map(b=>`${b.x},${b.y}`).join(" L ")} Z`;let m=`M ${s[0].x},${s[0].y}`;for(let b=0;b<s.length;b++){const n=s[b],u=s[(b+1)%s.length],R=s[b===0?s.length-1:b-1],F=n.x+(u.x-R.x)*.1,Y=n.y+(u.y-R.y)*.1,B=u.x-(s[(b+2)%s.length].x-n.x)*.1,f=u.y-(s[(b+2)%s.length].y-n.y)*.1;m+=` C ${F},${Y} ${B},${f} ${u.x},${u.y}`}return m+" Z"},[]);return e.jsxs(oe,{ref:te,type:"radar",datasets:l,config:V,...O,children:[e.jsx(me,{datasets:l,config:V,onDataPointClick:X,renderContent:L}),c&&e.jsx(Ce,{dataPoint:(d=(A=l[c.datasetIndex])==null?void 0:A.data)==null?void 0:d[c.pointIndex],datasetLabel:(y=l[c.datasetIndex])==null?void 0:y.label,datasetColor:(t=l[c.datasetIndex])==null?void 0:t.color,position:{x:c.clientX,y:c.clientY},visible:!0})]})}));Ue.displayName="RadarChart";const Ze=M.memo(M.forwardRef(({datasets:l=[],config:V={},scatterOptions:i={pointRadius:4,showLabels:!1,enableHoverEffects:!0},onDataPointClick:X,...O},te)=>{var N,U,z,W;const[C,J]=M.useState(null);return e.jsxs(oe,{ref:te,type:"scatter",datasets:l,config:V,...O,children:[e.jsx(me,{datasets:l,config:V,interactive:i.enableHoverEffects,renderContent:({scales:w,colors:v,datasets:H})=>{if(!H.length)return null;const _=[];return H.forEach((D,j)=>{var S;const c=D.color||v[j%v.length];(S=D.data)==null||S.forEach((L,T)=>{var y;const A=L.x!==void 0?w.padding.left+L.x/100*w.innerWidth:w.xScale(T,(y=D.data)==null?void 0:y.length),d=L.y!==void 0?w.padding.top+w.innerHeight-L.y/100*w.innerHeight:w.yScale(L.value);_.push(e.jsxs("g",{children:[e.jsx("circle",{cx:A,cy:d,r:L.size||i.pointRadius||4,fill:L.color||c,className:"c-chart__scatter-point",onClick:()=>X==null?void 0:X(L,j,T),onMouseEnter:t=>{var s;if(i.enableHoverEffects){t.currentTarget.setAttribute("r",String((L.size||i.pointRadius||4)*1.5));const m=(s=t.currentTarget.ownerSVGElement)==null?void 0:s.getBoundingClientRect(),b=m?m.left+A:t.clientX,n=m?m.top+d:t.clientY;J({datasetIndex:j,pointIndex:T,clientX:b,clientY:n})}},onMouseLeave:t=>{t.currentTarget.setAttribute("r",String(L.size||i.pointRadius||4)),J(null)}}),i.showLabels&&e.jsx("text",{x:A,y:d-(i.pointRadius||4)-5,textAnchor:"middle",className:"c-chart__scatter-label",children:L.label})]},`point-${j}-${T}`))})}),e.jsx(e.Fragment,{children:_})}}),C&&((U=(N=l[C.datasetIndex])==null?void 0:N.data)==null?void 0:U[C.pointIndex])&&e.jsx(Ce,{dataPoint:l[C.datasetIndex].data[C.pointIndex],datasetLabel:(z=l[C.datasetIndex])==null?void 0:z.label,datasetColor:(W=l[C.datasetIndex])==null?void 0:W.color,position:{x:C.clientX,y:C.clientY},visible:!0})]})}));Ze.displayName="ScatterChart";const qe=M.memo(M.forwardRef(({data:l=[],algorithm:V="squarified",colorConfig:i={scheme:"category"},showLabels:X=!0,showValues:O=!1,labelConfig:te={minSize:1e3,fontSize:12,color:"white"},borderConfig:C={width:1,color:"white",radius:2},animationConfig:J={enabled:!0,duration:750,easing:"ease-out"},onNodeClick:N,onNodeHover:U,config:z={},...W},w)=>{const[v,H]=M.useState(null),[_,D]=M.useState(null),[j,c]=M.useState({x:0,y:0}),S=M.useMemo(()=>{if(console.log("TreemapChart data:",l),!l.length)return console.log("No data provided to TreemapChart"),null;const t=new Map;l.forEach(n=>t.set(n.id,n));const s=[],m=new Set,b=n=>{if(m.has(n.id))return n;m.add(n.id);const u=l.filter(R=>R.parent===n.id);return u.length>0&&(n.children=u.map(R=>b(R)),n.value=n.children.reduce((R,F)=>R+F.value,0)),n};return l.forEach(n=>{(!n.parent||!t.has(n.parent))&&s.push(b(n))}),s.length===1?s[0]:{id:"root",label:"Root",value:s.reduce((n,u)=>n+u.value,0),children:s}},[l]),L=M.useCallback((t,s,m)=>{if(t.color)return t.color;const{scheme:b,palette:n,valueRange:u}=i,F=n||["#3b82f6","#ef4444","#10b981","#f59e0b","#8b5cf6","#06b6d4","#84cc16","#f97316","#ec4899","#6366f1"];switch(b){case"category":return F[m%F.length];case"depth":const Y=["#1e40af","#3b82f6","#60a5fa","#93c5fd","#dbeafe"];return Y[Math.min(s,Y.length-1)];case"value":if(u&&S){const B=Math.max(...l.map(o=>o.value)),f=Math.min(...l.map(o=>o.value)),$=(t.value-f)/(B-f);return`hsl(${220+$*100}, 70%, ${30+$*40}%)`}return F[0];default:return F[m%F.length]}},[i,l,S]);M.useCallback((t,s,m,b,n)=>{if(t.length===0)return;const u=t.reduce((x,E)=>x+E.value,0);if(t.length===1){const x=t[0];x&&(x.x=s,x.y=m,x.width=b,x.height=n);return}const R=[...t].sort((x,E)=>E.value-x.value),F=x=>Math.max(x.width/x.height,x.height/x.width);let Y=[],B=[...R],f=s,$=m,o=b,g=n;for(;B.length>0;){const x=B.shift();if(!x)break;Y.push(x);const E=Y.reduce((k,G)=>k+G.value,0),h=E/u;let r,a;o>=g?(r=o*h,a=g):(r=o,a=g*h);let p=!1;if(B.length>0){const k=B[0];if(!k)break;const G=[...Y,k],I=G.reduce((ee,ae)=>ee+ae.value,0),Z=I/u;let K,P;o>=g?(K=o*Z,P=g):(K=o,P=g*Z);const q=Math.max(...Y.filter(ee=>ee).map(ee=>{const ae=ee.value/E,se=o>=g?r:r*ae,ie=o>=g?a*ae:a;return F({width:se,height:ie})}));p=Math.max(...G.filter(ee=>ee).map(ee=>{const ae=ee.value/I,se=o>=g?K:K*ae,ie=o>=g?P*ae:P;return F({width:se,height:ie})}))<=q}if(!p){let k=f,G=$;Y.forEach(I=>{const Z=I.value/E;o>=g?(I.x=k,I.y=G,I.width=r,I.height=g*Z,G+=I.height):(I.x=k,I.y=G,I.width=o*Z,I.height=a,k+=I.width)}),o>=g?(f+=r,o-=r):($+=a,g-=a),Y=[]}}},[]);const T=M.useMemo(()=>{if(!l.length)return[];const t=l.filter(u=>!u.children||u.children.length===0);t.reduce((u,R)=>u+R.value,0);let s=0,m=0;const b=800/Math.ceil(Math.sqrt(t.length)),n=600/Math.ceil(Math.sqrt(t.length));return t.map((u,R)=>{const F={id:u.id,label:u.label,value:u.value,color:L(u,0,R)||"transparent",x:s,y:m,width:b,height:n,depth:0,children:[],originalData:u};return s+=b,s>=800&&(s=0,m+=n),F})},[l,L]),A=M.useCallback(t=>{D(t),N==null||N(t)},[N]),d=M.useCallback((t,s)=>{H(t),U==null||U(t),s&&t&&(s.currentTarget.getBoundingClientRect(),c({x:s.clientX,y:s.clientY}))},[U]),y=M.useCallback(()=>T.length?e.jsx("g",{children:T.map(t=>{const s=v===t,m=_===t,b=t.width*t.height,n=X&&b>=(te.minSize||1e3);return e.jsxs("g",{children:[e.jsx("rect",{x:t.x,y:t.y,width:t.width,height:t.height,fill:t.color,rx:C.radius||2,className:`c-chart__treemap-node ${s?"c-chart__treemap-node--hovered":""} ${m?"c-chart__treemap-node--selected":""} ${J.enabled?"c-chart__treemap-node--animated":""}`,onMouseEnter:u=>d(t,u),onMouseLeave:()=>d(null),onClick:()=>A(t)}),n&&e.jsxs("g",{children:[e.jsx("text",{x:t.x+t.width/2,y:t.y+t.height/2-(O?8:0),textAnchor:"middle",dominantBaseline:"middle",className:"c-chart__treemap-label",children:t.label}),O&&e.jsx("text",{x:t.x+t.width/2,y:t.y+t.height/2+12,textAnchor:"middle",dominantBaseline:"middle",className:"c-chart__treemap-value",children:t.value.toLocaleString()})]})]},t.id)})}):null,[T,v,_,X,O,te,C,J,d,A]);return e.jsxs(oe,{ref:w,type:"treemap",datasets:[],config:z,...W,children:[e.jsx("svg",{width:800,height:600,viewBox:"0 0 800 600",style:{width:"100%",height:"100%"},children:y()}),v&&e.jsxs("div",{className:"c-chart__tooltip",style:{position:"fixed",left:j.x+10,top:j.y-10,transform:"translateY(-100%)",background:"var(--atomix-gray-9)",color:"white",padding:"8px 12px",borderRadius:"6px",fontSize:"12px",boxShadow:"0 4px 12px rgba(0, 0, 0, 0.2)",zIndex:1e3,pointerEvents:"none"},children:[e.jsx("div",{children:e.jsx("strong",{children:v==null?void 0:v.label})}),e.jsxs("div",{children:["Value: ",v==null?void 0:v.value.toLocaleString()]})]})]})}));qe.displayName="TreemapChart";const Ke=M.memo(M.forwardRef(({waterfallData:l=[],config:V={},waterfallOptions:i={},onDataPointClick:X,...O},te)=>{const{showConnectors:C=!0,connectorColor:J="#f9fafb",connectorStyle:N="dashed",showValues:U=!0,valuePosition:z="top",colors:W={positive:"var(--atomix-success)",negative:"var(--atomix-error)",total:"var(--atomix-primary)",subtotal:"var(--atomix-secondary)"},barWidth:w=.6,showCumulativeLine:v=!1,cumulativeLineColor:H="#3b82f6",animate:_=!0,animationDuration:D=1e3,animationDelay:j=100,valueFormatter:c=d=>d.toLocaleString(),showBaseline:S=!0,baselineColor:L="#f3f4f6"}=i,T=M.useCallback(({scales:d,colors:y,handlers:t})=>{if(!l.length)return null;const s=60,m=d.width-s*2,b=d.height-s*2;let n=0;const u=l.map((h,r)=>{const a=h.type==="total"||h.type==="subtotal"?0:n;let p;return h.type==="total"||h.type==="subtotal"?(p=h.value,n=h.value):(p=n+h.value,n=p),{...h,startValue:a,endValue:p,cumulativeValue:n,index:r}}),R=u.flatMap(h=>[h.startValue,h.endValue]),F=Math.min(0,...R),B=Math.max(...R)-F,f=m/l.length*w,$=m/l.length,o=h=>s+h*$+$/2,g=h=>s+b-(h-F)/B*b,x=[];if(S){const h=g(0);x.push(e.jsx("line",{x1:s,y1:h,x2:d.width-s,y2:h,stroke:L,strokeWidth:"2",opacity:"0.7"},"baseline"))}if(u.forEach((h,r)=>{const a=o(r),p=Math.min(g(h.startValue),g(h.endValue)),k=Math.max(g(h.startValue),g(h.endValue)),G=k-p;let I=h.color;if(I||(h.type==="total"?I=W.total:h.type==="subtotal"?I=W.subtotal:h.value>=0?I=W.positive:I=W.negative),x.push(e.jsx("rect",{x:a-f/2,y:p,width:f,height:Math.max(G,2),fill:I,rx:"4",className:`c-chart__waterfall-bar ${_?"c-chart__waterfall-bar--animated":""}`,style:{animationDelay:_?`${r*j}ms`:"0ms"},onClick:()=>{var Z;return(Z=t.onDataPointClick)==null?void 0:Z.call(t,h,0,r)}},`bar-${r}`)),U){let Z=p,K=h.value;z==="center"?Z=p+G/2:z==="bottom"?Z=k+15:Z=p-5,(h.type==="total"||h.type==="subtotal")&&(K=h.endValue),x.push(e.jsx("text",{x:a,y:Z,textAnchor:"middle",dominantBaseline:z==="center"?"middle":"auto",className:`c-chart__waterfall-value ${z==="center"?"c-chart__waterfall-value--center":"c-chart__waterfall-value--outside"}`,children:c(K)},`value-${r}`))}if(C&&r<u.length-1){const Z=u[r+1];if(Z){const K=g(h.endValue),P=g(Z.startValue),q=o(r+1);if(Math.abs(h.endValue-Z.startValue)>.01){const Q=N==="dashed"?"5,5":N==="dotted"?"2,2":"none";x.push(e.jsx("line",{x1:a+f/2,y1:K,x2:q-f/2,y2:P,stroke:J,strokeDasharray:Q,className:"c-chart__waterfall-connector"},`connector-${r}`))}}}}),v){const h=u.map((a,p)=>({x:o(p),y:g(a.cumulativeValue)})),r=`M ${h.map(a=>`${a.x},${a.y}`).join(" L ")}`;x.push(e.jsx("path",{d:r,fill:"none",stroke:H,className:"c-chart__waterfall-cumulative-line"},"cumulative-line")),h.forEach((a,p)=>{x.push(e.jsx("circle",{cx:a.x,cy:a.y,r:"4",fill:H,className:"c-chart__waterfall-cumulative-point"},`line-point-${p}`))})}x.push(e.jsx("line",{x1:s,y1:d.height-s,x2:d.width-s,y2:d.height-s,stroke:"var(--atomix-gray-4)",strokeWidth:"2"},"x-axis")),x.push(e.jsx("line",{x1:s,y1:s,x2:s,y2:d.height-s,stroke:"var(--atomix-gray-4)",strokeWidth:"2"},"y-axis")),l.forEach((h,r)=>{const a=o(r);x.push(e.jsx("text",{x:a,y:d.height-s+20,textAnchor:"middle",fontSize:"11",fill:"var(--atomix-gray-6)",transform:`rotate(-45, ${a}, ${d.height-s+20})`,children:h.label},`x-label-${r}`))});const E=5;for(let h=0;h<=E;h++){const r=F+h/E*B,a=g(r);x.push(e.jsxs("g",{children:[e.jsx("line",{x1:s-5,y1:a,x2:s,y2:a,stroke:"var(--atomix-gray-4)",strokeWidth:"1"}),e.jsx("text",{x:s-10,y:a,textAnchor:"end",dominantBaseline:"middle",fontSize:"11",fill:"var(--atomix-gray-6)",children:c(r)})]},`y-tick-${h}`))}return e.jsx("g",{children:x})},[l,C,J,N,U,z,w,v,H,_,D,j,c,S,L]),A=[{label:"Waterfall Data",data:l.map(d=>({label:d.label,value:d.value}))}];return e.jsx(oe,{ref:te,type:"waterfall",datasets:A,config:V,...O,children:e.jsx(me,{datasets:A,config:V,onDataPointClick:X,renderContent:T})})}));Ke.displayName="WaterfallChart";const xt={title:"Components/Chart",component:oe,parameters:{layout:"fullscreen",docs:{description:{component:"Modern chart library with 20+ chart types, real-time updates, animations, and advanced interactions."},source:{code:'<Icon name="Rocket" /> Modern chart library with 20+ chart types, real-time updates, animations, and advanced interactions.'}}},tags:["autodocs"]},de=(l=20)=>Array.from({length:l},(V,i)=>({label:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i]||`Point ${i+1}`,value:Math.floor(Math.random()*100)+20})),ge=[{label:"Sales",data:de(),color:"#3b82f6"},{label:"Revenue",data:de(),color:"#10b981"},{label:"Profit",data:de(),color:"#f59e0b"}],ye={render:()=>{const[l,V]=M.useState("line"),[i,X]=M.useState(!0),[O,te]=M.useState(!0),[C,J]=M.useState(12),N=[{key:"line",icon:"TrendUp",label:"Line",desc:"Trends over time"},{key:"area",icon:"ChartBar",label:"Area",desc:"Filled line charts"},{key:"bar",icon:"ChartBar",label:"Bar",desc:"Compare categories"},{key:"pie",icon:"ChartPie",label:"Pie",desc:"Part-to-whole"},{key:"donut",icon:"ChartDonut",label:"Donut",desc:"Pie with center"},{key:"scatter",icon:"ChartScatter",label:"Scatter",desc:"Data correlation"},{key:"radar",icon:"Target",label:"Radar",desc:"Multi-dimensional"},{key:"bubble",icon:"Sphere",label:"Bubble",desc:"3D data points"},{key:"gauge",icon:"Gauge",label:"Gauge",desc:"Single metrics"},{key:"heatmap",icon:"Fire",label:"Heatmap",desc:"Data density"},{key:"candlestick",icon:"ChartLine",label:"Candlestick",desc:"Financial data"},{key:"waterfall",icon:"Drop",label:"Waterfall",desc:"Cumulative flow"},{key:"funnel",icon:"Funnel",label:"Funnel",desc:"Process stages"},{key:"treemap",icon:"Tree",label:"Treemap",desc:"Hierarchical data"},{key:"animated",icon:"Sparkle",label:"Animated",desc:"Motion graphics"},{key:"realtime",icon:"WifiHigh",label:"Real-time",desc:"Live streaming"},{key:"multiaxis",icon:"ChartLineUp",label:"Multi-axis",desc:"Multiple scales"},{key:"advanced",icon:"Rocket",label:"Advanced",desc:"Complex features"}],U=[{label:"Sales",data:de(C),color:"#3b82f6"},{label:"Revenue",data:de(C),color:"#10b981"},{label:"Profit",data:de(C),color:"#f59e0b"}],z=()=>{var v;const W={title:`${(v=N.find(H=>H.key===l))==null?void 0:v.label} Chart`,config:{showLegend:O,animate:i},showToolbar:!0,enableFullscreen:!0,enableExport:!0,enableRefresh:!0,onRefresh:()=>console.log("Story: Refresh clicked"),onExport:H=>console.log("Story: Export clicked",H),onFullscreen:H=>console.log("Story: Fullscreen toggled",H)},w=e.jsx("div",{className:"u-d-flex u-gap-2 u-align-items-center u-flex-wrap u-mb-5",children:e.jsxs("div",{className:"u-border-start u-ps-2 u-d-flex u-gap-2 u-align-items-center",children:[e.jsxs("div",{className:"u-d-flex u-align-items-center u-gap-1",children:[e.jsx(fe,{name:"Database",size:"sm"}),e.jsx("input",{type:"range",min:"4",max:"20",value:C,onChange:H=>J(Number(H.target.value)),className:"u-w-16",title:"Adjust data points"}),e.jsx(xe,{label:C.toString(),variant:"info",size:"sm"})]}),e.jsx(at,{size:"sm",variant:O?"info":"secondary",onClick:()=>te(!O),icon:e.jsx(fe,{name:"List"}),label:`${O?"Hide":"Show"} legend`})]})});switch(l){case"line":return e.jsxs("div",{children:[w,e.jsx(Se,{datasets:U,...W})]});case"area":return e.jsxs("div",{children:[w,e.jsx(et,{datasets:U,...W})]});case"bar":return e.jsxs("div",{children:[w,e.jsx(ze,{datasets:U,...W})]});case"pie":return e.jsxs("div",{children:[w,e.jsx(De,{datasets:[{label:"Data",data:de(C)}],...W})]});case"donut":return e.jsxs("div",{children:[w,e.jsx(Fe,{datasets:[{label:"Data",data:de(C)}],...W})]});case"scatter":return e.jsxs("div",{children:[w,e.jsx(Ze,{datasets:U,...W})]});case"radar":return e.jsxs("div",{children:[w,e.jsx(Ue,{datasets:[U[0]],...W})]});case"bubble":return e.jsxs("div",{children:[w,e.jsx(Ye,{bubbleData:Array.from({length:C},(H,_)=>({label:`Point ${_+1}`,x:Math.random()*100,y:Math.random()*100,size:Math.random()*50+20,color:["#3b82f6","#10b981","#f59e0b","#ef4444"][_%4]})),...W})]});case"gauge":return e.jsxs("div",{children:[w,e.jsx(Ee,{value:Math.min(C*5,100),...W})]});case"heatmap":return e.jsxs("div",{children:[w,e.jsx(je,{data:Array.from({length:C*4},(H,_)=>({x:_%Math.ceil(Math.sqrt(C*4)),y:Math.floor(_/Math.ceil(Math.sqrt(C*4))),value:Math.random()*100,label:`${_}`})),...W})]});case"candlestick":return e.jsxs("div",{children:[w,e.jsx(Ge,{candlestickData:Array.from({length:C},(H,_)=>({date:new Date(2024,0,_+1).toISOString(),open:100+Math.random()*20,high:120+Math.random()*20,low:80+Math.random()*20,close:110+Math.random()*20})),...W})]});case"waterfall":return e.jsxs("div",{children:[w,e.jsx(Ke,{waterfallData:Array.from({length:Math.min(C,8)},(H,_)=>_===0?{label:"Start",value:100,type:"total"}:_===Math.min(C,8)-1?{label:"End",value:100+(_-1)*5,type:"total"}:{label:`Step ${_}`,value:Math.random()>.5?Math.random()*30:-Math.random()*20,type:Math.random()>.5?"positive":"negative"}),...W})]});case"funnel":return e.jsxs("div",{children:[w,e.jsx(Ie,{funnelData:Array.from({length:Math.min(C,8)},(H,_)=>({label:`Stage ${_+1}`,value:1e3-_*100-Math.random()*50})),...W})]});case"treemap":return e.jsxs("div",{children:[w,e.jsx(qe,{data:Array.from({length:C},(H,_)=>({id:`item-${_}`,label:`Category ${String.fromCharCode(65+_)}`,value:Math.random()*100+20})),...W})]});case"animated":return e.jsxs("div",{children:[w,e.jsx(we,{datasets:U,...W})]});case"realtime":return e.jsxs("div",{children:[w,e.jsx(He,{datasets:[],dataSource:async()=>[{label:new Date().toLocaleTimeString(),value:Math.random()*100}],...W})]});case"multiaxis":return e.jsxs("div",{children:[w,e.jsx(Ne,{datasets:U.map((H,_)=>({...H,yAxisId:`axis${_}`})),yAxes:U.map((H,_)=>({id:`axis${_}`,position:_%2?"right":"left",label:H.label})),...W})]});case"advanced":return e.jsxs("div",{children:[w,e.jsx(Xe,{datasets:U,...W})]});default:return e.jsxs("div",{children:[w,e.jsx(Se,{datasets:U,...W})]})}};return e.jsxs(Me,{className:"u-py-6",children:[e.jsxs(ce,{className:"u-mb-6 u-p-6 u-text-center",children:[e.jsxs("h1",{className:"u-mb-3 u-d-flex u-align-items-center u-justify-content-center u-gap-2",children:[e.jsx(fe,{name:"ChartBar",size:"lg"}),"Atomix Chart Gallery"]}),e.jsx("p",{className:"u-mb-4 u-text-muted",children:"Explore 20+ modern chart types with integrated toolbar controls"}),e.jsxs("div",{className:"u-d-flex u-gap-2 u-justify-content-center u-flex-wrap",children:[e.jsx(xe,{label:"20+ Types",variant:"primary"}),e.jsx(xe,{label:"Real-time",variant:"success"}),e.jsx(xe,{label:"Interactive",variant:"info"}),e.jsx(xe,{label:"Animated",variant:"warning"})]})]}),e.jsxs(tt,{children:[e.jsx(_e,{xs:3,children:e.jsxs(ce,{className:"u-p-4 u-h-100",children:[e.jsx("h3",{className:"u-mb-4",children:"Chart Types"}),e.jsx(Je,{title:"Chart Types",children:e.jsx(Qe,{children:N.map(({key:W,icon:w,label:v,desc:H})=>e.jsx(Oe,{onClick:()=>V(W),active:l===W,children:e.jsxs("div",{className:"u-d-flex u-align-items-center u-gap-2",children:[e.jsx(fe,{name:w,size:"sm"}),e.jsx("div",{children:e.jsx("div",{children:v})})]})},W))})})]})}),e.jsx(_e,{xs:9,children:e.jsx(ce,{className:"u-p-4 u-min-h-600",children:z()})})]})]})}},be={render:()=>e.jsx(Me,{className:"u-py-4",children:e.jsxs("div",{className:"u-d-grid u-gap-4",style:{gridTemplateColumns:"repeat(auto-fit, minmax(400px, 1fr))"},children:[e.jsx(ce,{className:"u-p-4",children:e.jsx(Se,{title:"Line Chart",datasets:[ge[0]],config:{showLegend:!1},className:"u-h-100"})}),e.jsx(ce,{className:"u-p-4",children:e.jsx(ze,{title:"Bar Chart",datasets:[ge[1]],config:{showLegend:!1},className:"u-h-100"})}),e.jsx(ce,{className:"u-p-4",children:e.jsx(De,{title:"Pie Chart",datasets:[{label:"Data",data:de(4)}],config:{showLegend:!0},className:"u-h-100"})}),e.jsx(ce,{className:"u-p-4",children:e.jsx(Fe,{title:"Donut Chart",datasets:[{label:"Data",data:de(4)}],config:{showLegend:!0},className:"u-h-100"})})]})})},ve={render:()=>e.jsx(Me,{className:"u-py-4",children:e.jsxs("div",{className:"u-d-grid u-gap-4",style:{gridTemplateColumns:"repeat(auto-fit, minmax(500px, 1fr))"},children:[e.jsx(ce,{className:"u-p-4",children:e.jsx(Ne,{title:"Multi-Axis Chart",datasets:ge,yAxes:ge.map((l,V)=>({id:`axis${V}`,position:V%2?"right":"left",label:l.label})),className:"u-h-100"})}),e.jsx(ce,{className:"u-p-4",children:e.jsx(we,{title:"Animated Chart",datasets:ge,animationConfig:{duration:2e3,easing:"bounce"},className:"u-h-100"})}),e.jsx(ce,{className:"u-p-4",children:e.jsx(He,{title:"Real-time Chart",datasets:[],dataSource:async()=>[{label:new Date().toLocaleTimeString(),value:Math.sin(Date.now()*.001)*20+50}],streamConfig:{interval:1e3,maxDataPoints:20,autoScroll:!0},className:"u-h-100"})}),e.jsx(ce,{className:"u-p-4",children:e.jsx(Ee,{title:"Gauge Chart",value:78,gaugeOptions:{colorZones:[{from:0,to:50,color:"#ef4444"},{from:50,to:80,color:"#f59e0b"},{from:80,to:100,color:"#10b981"}]},className:"u-h-100"})})]})})};var Ae,Le,ke;ye.parameters={...ye.parameters,docs:{...(Ae=ye.parameters)==null?void 0:Ae.docs,source:{originalSource:`{
  render: () => {
    const [selectedType, setSelectedType] = useState('line');
    const [animated, setAnimated] = useState(true);
    const [showLegend, setShowLegend] = useState(true);
    const [dataPoints, setDataPoints] = useState(12);
    const chartTypes = [{
      key: 'line',
      icon: 'TrendUp',
      label: 'Line',
      desc: 'Trends over time'
    }, {
      key: 'area',
      icon: 'ChartBar',
      label: 'Area',
      desc: 'Filled line charts'
    }, {
      key: 'bar',
      icon: 'ChartBar',
      label: 'Bar',
      desc: 'Compare categories'
    }, {
      key: 'pie',
      icon: 'ChartPie',
      label: 'Pie',
      desc: 'Part-to-whole'
    }, {
      key: 'donut',
      icon: 'ChartDonut',
      label: 'Donut',
      desc: 'Pie with center'
    }, {
      key: 'scatter',
      icon: 'ChartScatter',
      label: 'Scatter',
      desc: 'Data correlation'
    }, {
      key: 'radar',
      icon: 'Target',
      label: 'Radar',
      desc: 'Multi-dimensional'
    }, {
      key: 'bubble',
      icon: 'Sphere',
      label: 'Bubble',
      desc: '3D data points'
    }, {
      key: 'gauge',
      icon: 'Gauge',
      label: 'Gauge',
      desc: 'Single metrics'
    }, {
      key: 'heatmap',
      icon: 'Fire',
      label: 'Heatmap',
      desc: 'Data density'
    }, {
      key: 'candlestick',
      icon: 'ChartLine',
      label: 'Candlestick',
      desc: 'Financial data'
    }, {
      key: 'waterfall',
      icon: 'Drop',
      label: 'Waterfall',
      desc: 'Cumulative flow'
    }, {
      key: 'funnel',
      icon: 'Funnel',
      label: 'Funnel',
      desc: 'Process stages'
    }, {
      key: 'treemap',
      icon: 'Tree',
      label: 'Treemap',
      desc: 'Hierarchical data'
    }, {
      key: 'animated',
      icon: 'Sparkle',
      label: 'Animated',
      desc: 'Motion graphics'
    }, {
      key: 'realtime',
      icon: 'WifiHigh',
      label: 'Real-time',
      desc: 'Live streaming'
    }, {
      key: 'multiaxis',
      icon: 'ChartLineUp',
      label: 'Multi-axis',
      desc: 'Multiple scales'
    }, {
      key: 'advanced',
      icon: 'Rocket',
      label: 'Advanced',
      desc: 'Complex features'
    }];

    // Generate dynamic data based on dataPoints
    const dynamicDatasets = [{
      label: 'Sales',
      data: generateData(dataPoints),
      color: '#3b82f6'
    }, {
      label: 'Revenue',
      data: generateData(dataPoints),
      color: '#10b981'
    }, {
      label: 'Profit',
      data: generateData(dataPoints),
      color: '#f59e0b'
    }];
    const renderChart = () => {
      const commonProps = {
        title: \`\${chartTypes.find(t => t.key === selectedType)?.label} Chart\`,
        config: {
          showLegend,
          animate: animated
        },
        showToolbar: true,
        enableFullscreen: true,
        enableExport: true,
        enableRefresh: true,
        onRefresh: () => console.log('Story: Refresh clicked'),
        onExport: (format: string) => console.log('Story: Export clicked', format),
        onFullscreen: (isFullscreen: boolean) => console.log('Story: Fullscreen toggled', isFullscreen)
      };

      // Custom toolbar with chart controls
      const customToolbar = <div className="u-d-flex u-gap-2 u-align-items-center u-flex-wrap u-mb-5">
          <div className="u-border-start u-ps-2 u-d-flex u-gap-2 u-align-items-center">
            {/* Data Points Control */}
            <div className="u-d-flex u-align-items-center u-gap-1">
              <Icon name="Database" size="sm" />
              <input type="range" min="4" max="20" value={dataPoints} onChange={e => setDataPoints(Number(e.target.value))} className="u-w-16" title="Adjust data points" />
              <Badge label={dataPoints.toString()} variant="info" size="sm" />
            </div>

            {/* Legend Toggle */}
            <Button size="sm" variant={showLegend ? 'info' : 'secondary'} onClick={() => setShowLegend(!showLegend)} icon={<Icon name="List" />} label={\`\${showLegend ? 'Hide' : 'Show'} legend\`} />
          </div>
        </div>;
      switch (selectedType) {
        case 'line':
          return <div>
              {customToolbar}
              <LineChart datasets={dynamicDatasets} {...commonProps} />
            </div>;
        case 'area':
          return <div>
              {customToolbar}
              <AreaChart datasets={dynamicDatasets} {...commonProps} />
            </div>;
        case 'bar':
          return <div>
              {customToolbar}
              <BarChart datasets={dynamicDatasets} {...commonProps} />
            </div>;
        case 'pie':
          return <div>
              {customToolbar}
              <PieChart datasets={[{
              label: 'Data',
              data: generateData(dataPoints)
            }]} {...commonProps} />
            </div>;
        case 'donut':
          return <div>
              {customToolbar}
              <DonutChart datasets={[{
              label: 'Data',
              data: generateData(dataPoints)
            }]} {...commonProps} />
            </div>;
        case 'scatter':
          return <div>
              {customToolbar}
              <ScatterChart datasets={dynamicDatasets} {...commonProps} />
            </div>;
        case 'radar':
          return <div>
              {customToolbar}
              <RadarChart datasets={[dynamicDatasets[0]]} {...commonProps} />
            </div>;
        case 'bubble':
          return <div>
              {customToolbar}
              <BubbleChart bubbleData={Array.from({
              length: dataPoints
            }, (_, i) => ({
              label: \`Point \${i + 1}\`,
              x: Math.random() * 100,
              y: Math.random() * 100,
              size: Math.random() * 50 + 20,
              color: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'][i % 4]
            }))} {...commonProps} />
            </div>;
        case 'gauge':
          return <div>
              {customToolbar}
              <GaugeChart value={Math.min(dataPoints * 5, 100)} {...commonProps} />
            </div>;
        case 'heatmap':
          return <div>
              {customToolbar}
              <HeatmapChart data={Array.from({
              length: dataPoints * 4
            }, (_, i) => ({
              x: i % Math.ceil(Math.sqrt(dataPoints * 4)),
              y: Math.floor(i / Math.ceil(Math.sqrt(dataPoints * 4))),
              value: Math.random() * 100,
              label: \`\${i}\`
            }))} {...commonProps} />
            </div>;
        case 'candlestick':
          return <div>
              {customToolbar}
              <CandlestickChart candlestickData={Array.from({
              length: dataPoints
            }, (_, i) => ({
              date: new Date(2024, 0, i + 1).toISOString(),
              open: 100 + Math.random() * 20,
              high: 120 + Math.random() * 20,
              low: 80 + Math.random() * 20,
              close: 110 + Math.random() * 20
            }))} {...commonProps} />
            </div>;
        case 'waterfall':
          return <div>
              {customToolbar}
              <WaterfallChart waterfallData={Array.from({
              length: Math.min(dataPoints, 8)
            }, (_, i) => {
              if (i === 0) return {
                label: 'Start',
                value: 100,
                type: 'total'
              };
              if (i === Math.min(dataPoints, 8) - 1) return {
                label: 'End',
                value: 100 + (i - 1) * 5,
                type: 'total'
              };
              return {
                label: \`Step \${i}\`,
                value: Math.random() > 0.5 ? Math.random() * 30 : -Math.random() * 20,
                type: Math.random() > 0.5 ? 'positive' : 'negative'
              };
            })} {...commonProps} />
            </div>;
        case 'funnel':
          return <div>
              {customToolbar}
              <FunnelChart funnelData={Array.from({
              length: Math.min(dataPoints, 8)
            }, (_, i) => ({
              label: \`Stage \${i + 1}\`,
              value: 1000 - i * 100 - Math.random() * 50
            }))} {...commonProps} />
            </div>;
        case 'treemap':
          return <div>
              {customToolbar}
              <TreemapChart data={Array.from({
              length: dataPoints
            }, (_, i) => ({
              id: \`item-\${i}\`,
              label: \`Category \${String.fromCharCode(65 + i)}\`,
              value: Math.random() * 100 + 20
            }))} {...commonProps} />
            </div>;
        case 'animated':
          return <div>
              {customToolbar}
              <AnimatedChart datasets={dynamicDatasets} {...commonProps} />
            </div>;
        case 'realtime':
          return <div>
              {customToolbar}
              <RealTimeChart datasets={[]} dataSource={async () => [{
              label: new Date().toLocaleTimeString(),
              value: Math.random() * 100
            }]} {...commonProps} />
            </div>;
        case 'multiaxis':
          return <div>
              {customToolbar}
              <MultiAxisChart datasets={dynamicDatasets.map((d, i) => ({
              ...d,
              yAxisId: \`axis\${i}\`
            }))} yAxes={dynamicDatasets.map((d, i) => ({
              id: \`axis\${i}\`,
              position: i % 2 ? 'right' : 'left',
              label: d.label
            }))} {...commonProps} />
            </div>;
        case 'advanced':
          return <div>
              {customToolbar}
              <AdvancedChart datasets={dynamicDatasets} {...commonProps} />
            </div>;
        default:
          return <div>
              {customToolbar}
              <LineChart datasets={dynamicDatasets} {...commonProps} />
            </div>;
      }
    };
    return <Container className="u-py-6">
        <Card className="u-mb-6 u-p-6 u-text-center">
          <h1 className="u-mb-3 u-d-flex u-align-items-center u-justify-content-center u-gap-2">
            <Icon name="ChartBar" size="lg" />
            Atomix Chart Gallery
          </h1>
          <p className="u-mb-4 u-text-muted">
            Explore 20+ modern chart types with integrated toolbar controls
          </p>
          <div className="u-d-flex u-gap-2 u-justify-content-center u-flex-wrap">
            <Badge label="20+ Types" variant="primary" />
            <Badge label="Real-time" variant="success" />
            <Badge label="Interactive" variant="info" />
            <Badge label="Animated" variant="warning" />
          </div>
        </Card>

        <Grid>
          <GridCol xs={3}>
            <Card className="u-p-4 u-h-100">
              <h3 className="u-mb-4">Chart Types</h3>
              <SideMenu title="Chart Types">
                <SideMenuList>
                  {chartTypes.map(({
                  key,
                  icon,
                  label,
                  desc
                }) => <SideMenuItem key={key} onClick={() => setSelectedType(key)} active={selectedType === key}>
                      <div className="u-d-flex u-align-items-center u-gap-2">
                        <Icon name={icon as any} size="sm" />
                        <div>
                          <div>{label}</div>
                          {/* <small className="u-text-muted">{desc}</small> */}
                        </div>
                      </div>
                    </SideMenuItem>)}
                </SideMenuList>
              </SideMenu>
            </Card>
          </GridCol>

          <GridCol xs={9}>
            <Card className="u-p-4 u-min-h-600">{renderChart()}</Card>
          </GridCol>
        </Grid>
      </Container>;
  }
}`,...(ke=(Le=ye.parameters)==null?void 0:Le.docs)==null?void 0:ke.source}}};var Pe,Te,Re;be.parameters={...be.parameters,docs:{...(Pe=be.parameters)==null?void 0:Pe.docs,source:{originalSource:`{
  render: () => <Container className="u-py-4">
      <div className="u-d-grid u-gap-4" style={{
      gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))'
    }}>
        <Card className="u-p-4">
          <LineChart title="Line Chart" datasets={[datasets[0]]} config={{
          showLegend: false
        }} className="u-h-100" />
        </Card>

        <Card className="u-p-4">
          <BarChart title="Bar Chart" datasets={[datasets[1]]} config={{
          showLegend: false
        }} className="u-h-100" />
        </Card>

        <Card className="u-p-4">
          <PieChart title="Pie Chart" datasets={[{
          label: 'Data',
          data: generateData(4)
        }]} config={{
          showLegend: true
        }} className="u-h-100" />
        </Card>

        <Card className="u-p-4">
          <DonutChart title="Donut Chart" datasets={[{
          label: 'Data',
          data: generateData(4)
        }]} config={{
          showLegend: true
        }} className="u-h-100" />
        </Card>
      </div>
    </Container>
}`,...(Re=(Te=be.parameters)==null?void 0:Te.docs)==null?void 0:Re.source}}};var Be,We,Ve;ve.parameters={...ve.parameters,docs:{...(Be=ve.parameters)==null?void 0:Be.docs,source:{originalSource:`{
  render: () => <Container className="u-py-4">
      <div className="u-d-grid u-gap-4" style={{
      gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))'
    }}>
        <Card className="u-p-4">
          <MultiAxisChart title="Multi-Axis Chart" datasets={datasets} yAxes={datasets.map((d, i) => ({
          id: \`axis\${i}\`,
          position: i % 2 ? 'right' : 'left',
          label: d.label
        }))} className="u-h-100" />
        </Card>

        <Card className="u-p-4">
          <AnimatedChart title="Animated Chart" datasets={datasets} animationConfig={{
          duration: 2000,
          easing: 'bounce'
        }} className="u-h-100" />
        </Card>

        <Card className="u-p-4">
          <RealTimeChart title="Real-time Chart" datasets={[]} dataSource={async () => [{
          label: new Date().toLocaleTimeString(),
          value: Math.sin(Date.now() * 0.001) * 20 + 50
        }]} streamConfig={{
          interval: 1000,
          maxDataPoints: 20,
          autoScroll: true
        }} className="u-h-100" />
        </Card>

        <Card className="u-p-4">
          <GaugeChart title="Gauge Chart" value={78} gaugeOptions={{
          colorZones: [{
            from: 0,
            to: 50,
            color: '#ef4444'
          }, {
            from: 50,
            to: 80,
            color: '#f59e0b'
          }, {
            from: 80,
            to: 100,
            color: '#10b981'
          }]
        }} className="u-h-100" />
        </Card>
      </div>
    </Container>
}`,...(Ve=(We=ve.parameters)==null?void 0:We.docs)==null?void 0:Ve.source}}};const gt=["ChartGallery","BasicCharts","AdvancedFeatures"];export{ve as AdvancedFeatures,be as BasicCharts,ye as ChartGallery,gt as __namedExportsOrder,xt as default};
