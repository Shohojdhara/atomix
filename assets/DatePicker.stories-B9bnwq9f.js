import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{r as s,e as ht}from"./index-BVDOR7y2.js";import{I as S}from"./Icon-k4CeN--q.js";import"./SpeakerX.es-Cg-mjUf1.js";function yt(a){const t=new Date;return t.setMonth(a),t.toLocaleString("default",{month:"long"})}function Ve(a,t){return new Date(a,t+1,0).getDate()}function Dt(a,t){return new Date(a,t,1).getDay()}function D(a,t){if(!a)return"";const r=a.getDate(),n=a.getMonth()+1,o=a.getFullYear();return t.replace("yyyy",o.toString()).replace("MM",n.toString().padStart(2,"0")).replace("M",n.toString()).replace("dd",r.toString().padStart(2,"0")).replace("d",r.toString())}function me(a,t,r){return a?t?`${D(a,r)} - ${D(t,r)}`:`${D(a,r)} - Select end date`:""}function ft(a,t,r){return!(!a||t&&a<t||r&&a>r)}function xt({value:a,onChange:t,selectionMode:r="single",startDate:n,endDate:o,onRangeChange:h,format:g="MM/dd/yyyy",minDate:f,maxDate:N,inline:v=!1}={}){const[T,M]=s.useState(v),[ge,Y]=s.useState(a?D(a,g):""),[H,x]=s.useState(n&&o?`${D(n,g)} - ${D(o,g)}`:n?`${D(n,g)} - Select end date`:""),[z,k]=s.useState(a||n||new Date),[pe,$]=s.useState("days"),[F,P]=s.useState(!n||n&&o?"start":"end"),q=s.useRef(null),W=s.useRef(null),R=new Date,u=z.getMonth(),m=z.getFullYear(),_=Ve(m,u),X=Dt(m,u);s.useEffect(()=>{r==="single"?Y(a?D(a,g):""):(x(n&&o?`${D(n,g)} - ${D(o,g)}`:n?`${D(n,g)} - Select end date`:""),P(!n||n&&o?"start":"end"))},[a,n,o,g,r]);const w=s.useCallback(d=>{const l=new Date(m,u,d);if(!(f&&l<f)&&!(N&&l>N))if(r==="single")t&&t(l),Y(D(l,g)),v||M(!1);else if(F==="start")h&&h({startDate:l,endDate:null}),x(`${D(l,g)} - Select end date`),P("end");else{if(!n)return;l<n?(h&&h({startDate:l,endDate:n}),x(`${D(l,g)} - ${D(n,g)}`)):(h&&h({startDate:n,endDate:l}),x(`${D(n,g)} - ${D(l,g)}`)),v||M(!1),P("start")}},[m,u,f,N,t,h,g,v,r,F,n]),J=s.useCallback(()=>{k(new Date(m,u-1,1))},[m,u]),he=s.useCallback(()=>{k(new Date(m,u+1,1))},[m,u]),K=s.useCallback(()=>{k(new Date(m-1,u,1))},[m,u]),Q=s.useCallback(()=>{k(new Date(m+1,u,1))},[m,u]),L=s.useCallback(()=>{$("months")},[]),U=s.useCallback(()=>{$("years")},[]),ye=s.useCallback(d=>{k(new Date(m,d,1)),$("days")},[m]),De=s.useCallback(d=>{k(new Date(d,u,1)),$("months")},[u]),E=s.useCallback(()=>{const d=new Date;k(d),r==="single"?w(d.getDate()):k(new Date)},[w,r]),B=s.useCallback(()=>{r==="single"?(Y(""),t&&t(null)):(x(""),P("start"),h&&h({startDate:null,endDate:null}))},[t,h,r]),fe=s.useCallback(d=>{var l,p;if(r==="single"){Y(d.target.value);const i=new Date(d.target.value);isNaN(i.getTime())||(t&&t(i),k(i))}else{x(d.target.value);const i=d.target.value.split("-");if(i.length===2){const C=(l=i[0])==null?void 0:l.trim(),A=(p=i[1])==null?void 0:p.trim();if(!C||!A)return;const O=new Date(C);if(isNaN(O.getTime())||k(O),C&&A){const I=new Date(C),G=new Date(A);!isNaN(I.getTime())&&!isNaN(G.getTime())&&h&&h({startDate:I,endDate:G})}}}},[t,h,r]),Z=s.useCallback(()=>{v||M(!0)},[v]),V=s.useCallback(d=>{q.current&&!q.current.contains(d.target)&&W.current&&!W.current.contains(d.target)&&M(!1)},[]);s.useEffect(()=>(T&&!v?document.addEventListener("mousedown",V):document.removeEventListener("mousedown",V),()=>{document.removeEventListener("mousedown",V)}),[T,V,v]);const xe=s.useCallback(()=>{const d=[],l=Ve(u===0?m-1:m,u===0?11:u-1);for(let i=X-1;i>=0;i--)d.push({day:l-i,month:u===0?11:u-1,year:u===0?m-1:m,isCurrentMonth:!1});for(let i=1;i<=_;i++)d.push({day:i,month:u,year:m,isCurrentMonth:!0});const p=42-d.length;for(let i=1;i<=p;i++)d.push({day:i,month:u===11?0:u+1,year:u===11?m+1:m,isCurrentMonth:!1});return d},[_,X,u,m]),ke=s.useCallback(()=>{const d=[];for(let l=0;l<12;l++)d.push({month:l,name:yt(l)});return d},[]),be=s.useCallback(()=>{const d=[],l=m-6;for(let p=0;p<12;p++)d.push(l+p);return d},[m]),ve=s.useCallback((d,l,p)=>{const i=new Date(d,l,p);return ft(i,f,N)},[f,N]),_e=s.useCallback((d,l,p)=>{if(r==="single")return a?a.getFullYear()===d&&a.getMonth()===l&&a.getDate()===p:!1;if(!n&&!o)return!1;if(n&&!o)return n.getFullYear()===d&&n.getMonth()===l&&n.getDate()===p;if(n&&o){const i=n.getFullYear()===d&&n.getMonth()===l&&n.getDate()===p,C=o.getFullYear()===d&&o.getMonth()===l&&o.getDate()===p;return i||C}return!1},[a,r,n,o]),Se=s.useCallback((d,l,p)=>{if(r!=="range"||!n||!o)return!1;const i=new Date(d,l,p);return i>n&&i<o},[r,n,o]),we=s.useCallback((d,l,p)=>R.getFullYear()===d&&R.getMonth()===l&&R.getDate()===p,[R]),Ce=s.useCallback(d=>{const l=new Date(d.valueOf()),p=(d.getDay()+6)%7;l.setDate(l.getDate()-p+3);const i=l.valueOf();return l.setMonth(0,1),l.getDay()!==4&&l.setMonth(0,1+(4-l.getDay()+7)%7),1+Math.ceil((i-l.valueOf())/6048e5)},[]);return{isOpen:T,inputValue:ge,rangeInputValue:H,viewDate:z,viewMode:pe,currentMonth:u,currentYear:m,selectionMode:r,rangeSelectionState:F,datePickerRef:q,inputRef:W,startDate:n,endDate:o,setIsOpen:M,handleDateSelect:w,handlePrevMonth:J,handleNextMonth:he,handlePrevYear:K,handleNextYear:Q,handleTodayClick:E,handleClear:B,handleInputChange:fe,handleInputFocus:Z,switchToMonthView:L,switchToYearView:U,selectMonth:ye,selectYear:De,generateDays:xe,generateMonths:ke,generateYears:be,isDateSelectable:ve,isDateSelected:_e,isDateInSelectedRange:Se,isToday:we,getWeekNumber:Ce}}const y=s.forwardRef(({value:a,onChange:t,selectionMode:r="single",startDate:n,endDate:o,onRangeChange:h,format:g="MM/dd/yyyy",minDate:f,maxDate:N,placeholder:v="Select date...",disabled:T=!1,readOnly:M=!1,clearable:ge=!0,showTodayButton:Y=!0,showWeekNumbers:H=!1,inline:x=!1,id:z,name:k,className:pe="",placement:$="bottom-start",inputClassName:F="",size:P="md",...q},W)=>{const{isOpen:R,inputValue:u,rangeInputValue:m,viewMode:_,currentMonth:X,currentYear:w,rangeSelectionState:J,datePickerRef:he,inputRef:K,startDate:Q,setIsOpen:L,handleDateSelect:U,handlePrevMonth:ye,handleNextMonth:De,handlePrevYear:E,handleNextYear:B,handleTodayClick:fe,handleClear:Z,handleInputChange:V,handleInputFocus:xe,switchToMonthView:ke,switchToYearView:be,selectMonth:ve,selectYear:_e,generateDays:Se,generateMonths:we,generateYears:Ce,isDateSelectable:d,isDateSelected:l,isDateInSelectedRange:p,isToday:i,getWeekNumber:C}=xt({value:a,onChange:t,selectionMode:r,startDate:n,endDate:o,onRangeChange:h,format:g,minDate:f,maxDate:N,inline:x});s.useImperativeHandle(W,()=>({open:()=>L(!0),close:()=>L(!1),clear:Z,focus:()=>{var c;return(c=K.current)==null?void 0:c.focus()}}));const A=`c-datepicker ${pe} ${x?"c-datepicker--inline":""}`.trim(),O=`c-datepicker__input c-input c-input--${P} ${F}`.trim(),I=z||`datepicker-${Math.random().toString(36).substring(2,9)}`,G=`${I}-calendar`,Me=r==="single"?u:m,pt=()=>r==="single"?v:J==="start"?"Select start date...":Q?`${D(Q,g)} - Select end date...`:"Select date range...";return e.jsxs("div",{className:A,ref:he,...q,children:[!x&&e.jsxs("div",{className:"c-datepicker__input-wrapper",children:[e.jsx("input",{id:I,name:k,ref:K,type:"text",className:O,placeholder:pt(),value:Me,onChange:V,onFocus:xe,disabled:T,readOnly:M,"aria-haspopup":"dialog","aria-expanded":R,"aria-controls":G}),ge&&Me&&e.jsx("button",{type:"button",className:"c-datepicker__clear-button",onClick:Z,"aria-label":"Clear date",children:e.jsx(S,{name:"X",size:"sm"})}),e.jsx("span",{className:"c-datepicker__calendar-icon","aria-hidden":"true",children:e.jsx(S,{name:"Calendar",size:"sm",color:"var(--atomix-secondary-text-emphasis)"})})]}),(R||x)&&e.jsxs("div",{id:G,className:`c-datepicker__calendar c-datepicker__calendar--${$}`,role:"dialog","aria-modal":x?void 0:"true","aria-label":"Date picker",children:[e.jsxs("div",{className:"c-datepicker__header",children:[_==="days"&&e.jsxs(e.Fragment,{children:[e.jsx("button",{type:"button",className:"c-datepicker__nav-button c-datepicker__nav-button--prev-year",onClick:E,"aria-label":"Previous year",children:e.jsx(S,{name:"CaretDoubleLeft",size:"sm"})}),e.jsx("button",{type:"button",className:"c-datepicker__nav-button c-datepicker__nav-button--prev-month",onClick:ye,"aria-label":"Previous month",children:e.jsx(S,{name:"CaretLeft",size:"sm"})}),e.jsx("button",{type:"button",className:"c-datepicker__view-switch",onClick:ke,"aria-label":"Switch to month view",children:`${X+1}/${w}`}),e.jsx("button",{type:"button",className:"c-datepicker__nav-button c-datepicker__nav-button--next-month",onClick:De,"aria-label":"Next month",children:e.jsx(S,{name:"CaretRight",size:"sm"})}),e.jsx("button",{type:"button",className:"c-datepicker__nav-button c-datepicker__nav-button--next-year",onClick:B,"aria-label":"Next year",children:e.jsx(S,{name:"CaretDoubleRight",size:"sm"})})]}),_==="months"&&e.jsxs(e.Fragment,{children:[e.jsx("button",{type:"button",className:"c-datepicker__nav-button c-datepicker__nav-button--prev-year",onClick:E,"aria-label":"Previous year",children:e.jsx(S,{name:"CaretLeft",size:"sm"})}),e.jsx("button",{type:"button",className:"c-datepicker__view-switch",onClick:be,"aria-label":"Switch to year view",children:w}),e.jsx("button",{type:"button",className:"c-datepicker__nav-button c-datepicker__nav-button--next-year",onClick:B,"aria-label":"Next year",children:e.jsx(S,{name:"CaretRight",size:"sm"})})]}),_==="years"&&e.jsxs(e.Fragment,{children:[e.jsx("button",{type:"button",className:"c-datepicker__nav-button c-datepicker__nav-button--prev-year",onClick:()=>E(),"aria-label":"Previous year range",children:e.jsx(S,{name:"CaretLeft",size:"sm"})}),e.jsxs("button",{type:"button",className:"c-datepicker__view-switch","aria-label":"Current year range",children:[w-6," - ",w+5]}),e.jsx("button",{type:"button",className:"c-datepicker__nav-button c-datepicker__nav-button--next-year",onClick:()=>B(),"aria-label":"Next year range",children:e.jsx(S,{name:"CaretRight",size:"sm"})})]})]}),e.jsxs("div",{className:"c-datepicker__body",children:[_==="days"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"c-datepicker__weekdays",role:"row",children:[H&&e.jsx("div",{className:"c-datepicker__weekday c-datepicker__weeknumber",role:"columnheader",children:"#"}),e.jsx("div",{className:"c-datepicker__weekday",role:"columnheader",children:"Su"}),e.jsx("div",{className:"c-datepicker__weekday",role:"columnheader",children:"Mo"}),e.jsx("div",{className:"c-datepicker__weekday",role:"columnheader",children:"Tu"}),e.jsx("div",{className:"c-datepicker__weekday",role:"columnheader",children:"We"}),e.jsx("div",{className:"c-datepicker__weekday",role:"columnheader",children:"Th"}),e.jsx("div",{className:"c-datepicker__weekday",role:"columnheader",children:"Fr"}),e.jsx("div",{className:"c-datepicker__weekday",role:"columnheader",children:"Sa"})]}),e.jsx("div",{className:"c-datepicker__days",role:"grid","aria-labelledby":`${I}-month-year`,children:Se().map((c,j)=>{const b=d(c.year,c.month,c.day),ee=l(c.year,c.month,c.day),Re=i(c.year,c.month,c.day),Ne=new Date(c.year,c.month,c.day),je=p(c.year,c.month,c.day),Ye=r==="range"&&n&&c.day===n.getDate()&&c.month===n.getMonth()&&c.year===n.getFullYear(),$e=r==="range"&&o&&c.day===o.getDate()&&c.month===o.getMonth()&&c.year===o.getFullYear();if(H&&j%7===0){const Pe=C(Ne);return e.jsxs(ht.Fragment,{children:[e.jsx("div",{className:"c-datepicker__weeknumber","aria-label":`Week ${Pe}`,children:Pe}),e.jsx("button",{type:"button",className:`c-datepicker__day 
                              ${c.isCurrentMonth?"":"c-datepicker__day--outside"} 
                              ${ee?"c-datepicker__day--selected":""} 
                              ${Ye?"c-datepicker__day--start-range":""}
                              ${$e?"c-datepicker__day--end-range":""}
                              ${je?"c-datepicker__day--in-range":""}
                              ${Re?"c-datepicker__day--today":""} 
                              ${b?"":"c-datepicker__day--disabled"}`,onClick:()=>b&&U(c.day),disabled:!b,tabIndex:c.isCurrentMonth?0:-1,"aria-label":Ne.toLocaleDateString(),"aria-selected":ee?"true":"false",role:"gridcell",children:c.day})]},`week-${j}`)}return e.jsx("button",{type:"button",className:`c-datepicker__day 
                          ${c.isCurrentMonth?"":"c-datepicker__day--outside"} 
                          ${ee?"c-datepicker__day--selected":""} 
                          ${Ye?"c-datepicker__day--start-range":""}
                          ${$e?"c-datepicker__day--end-range":""}
                          ${je?"c-datepicker__day--in-range":""}
                          ${Re?"c-datepicker__day--today":""} 
                          ${b?"":"c-datepicker__day--disabled"}`,onClick:()=>b&&U(c.day),disabled:!b,tabIndex:c.isCurrentMonth?0:-1,"aria-label":Ne.toLocaleDateString(),"aria-selected":ee?"true":"false",role:"gridcell",children:c.day},`day-${j}`)})})]}),_==="months"&&e.jsx("div",{className:"c-datepicker__months",role:"grid",children:we().map((c,j)=>{const b=a&&a.getMonth()===c.month&&a.getFullYear()===w;return e.jsx("button",{type:"button",className:`c-datepicker__month ${b?"c-datepicker__month--selected":""}`,onClick:()=>ve(c.month),"aria-selected":b?"true":"false",role:"gridcell",children:c.name.substring(0,3)},`month-${j}`)})}),_==="years"&&e.jsx("div",{className:"c-datepicker__years",role:"grid",children:Ce().map((c,j)=>{const b=a&&a.getFullYear()===c;return e.jsx("button",{type:"button",className:`c-datepicker__year ${b?"c-datepicker__year--selected":""}`,onClick:()=>_e(c),"aria-selected":b?"true":"false",role:"gridcell",children:c},`year-${j}`)})})]}),_==="days"&&e.jsxs("div",{className:"c-datepicker__footer",children:[r==="range"&&e.jsxs("div",{className:"c-datepicker__range-status c-badge c-badge--sm c-badge--info u-w-100",children:["Selecting ",J==="start"?"start":"end"," date"]}),Y&&e.jsx("button",{type:"button",className:"c-datepicker__today-button c-btn c-btn--sm c-btn--outline-primary",onClick:fe,"aria-label":"Go to today",children:"Today"}),!x&&e.jsx("button",{type:"button",className:"c-datepicker__close-button c-btn c-btn--sm c-btn--outline-error",onClick:()=>L(!1),"aria-label":"Close calendar",children:"Close"})]})]})]})});y.displayName="DatePicker";try{y.displayName="DatePicker",y.__docgenInfo={description:`DatePicker component for selecting dates from a calendar interface.
Supports various display modes, date ranges, and customization options.`,displayName:"DatePicker",props:{value:{defaultValue:null,description:"The currently selected date value",name:"value",required:!1,type:{name:"Date | null"}},onChange:{defaultValue:null,description:"Callback function when date is changed",name:"onChange",required:!1,type:{name:"((date: Date | null) => void)"}},selectionMode:{defaultValue:{value:"single"},description:"Selection mode - single date or date range",name:"selectionMode",required:!1,type:{name:"enum",value:[{value:'"single"'},{value:'"range"'}]}},startDate:{defaultValue:null,description:'The start date of the range (only used when selectionMode is "range")',name:"startDate",required:!1,type:{name:"Date | null"}},endDate:{defaultValue:null,description:'The end date of the range (only used when selectionMode is "range")',name:"endDate",required:!1,type:{name:"Date | null"}},onRangeChange:{defaultValue:null,description:"Callback function when date range is changed",name:"onRangeChange",required:!1,type:{name:"((range: DateRange) => void)"}},format:{defaultValue:{value:"MM/dd/yyyy"},description:"Format for the date display (follows Intl.DateTimeFormat patterns)",name:"format",required:!1,type:{name:"string"}},minDate:{defaultValue:null,description:"Minimum selectable date",name:"minDate",required:!1,type:{name:"Date"}},maxDate:{defaultValue:null,description:"Maximum selectable date",name:"maxDate",required:!1,type:{name:"Date"}},placeholder:{defaultValue:{value:"Select date..."},description:"Placeholder text for the input",name:"placeholder",required:!1,type:{name:"string"}},disabled:{defaultValue:{value:"false"},description:"Whether the datepicker is disabled",name:"disabled",required:!1,type:{name:"boolean"}},readOnly:{defaultValue:{value:"false"},description:"Whether the datepicker is read-only",name:"readOnly",required:!1,type:{name:"boolean"}},clearable:{defaultValue:{value:"true"},description:"Whether to show a clear button",name:"clearable",required:!1,type:{name:"boolean"}},showTodayButton:{defaultValue:{value:"true"},description:'Whether to show the "Today" button',name:"showTodayButton",required:!1,type:{name:"boolean"}},showWeekNumbers:{defaultValue:{value:"false"},description:"Whether to show week numbers",name:"showWeekNumbers",required:!1,type:{name:"boolean"}},inline:{defaultValue:{value:"false"},description:"Whether to display the datepicker inline (always visible)",name:"inline",required:!1,type:{name:"boolean"}},id:{defaultValue:null,description:"ID for the input element",name:"id",required:!1,type:{name:"string"}},name:{defaultValue:null,description:"Name for the input element",name:"name",required:!1,type:{name:"string"}},className:{defaultValue:{value:""},description:"Additional class name for the datepicker component",name:"className",required:!1,type:{name:"string"}},placement:{defaultValue:{value:"bottom-start"},description:"Placement of the dropdown calendar",name:"placement",required:!1,type:{name:"enum",value:[{value:'"top-start"'},{value:'"top-end"'},{value:'"bottom-start"'},{value:'"bottom-end"'},{value:'"left-start"'},{value:'"left-end"'},{value:'"right-start"'},{value:'"right-end"'}]}},inputClassName:{defaultValue:{value:""},description:"Additional class name for the input element",name:"inputClassName",required:!1,type:{name:"string"}},size:{defaultValue:{value:"md"},description:"Size of the input field",name:"size",required:!1,type:{name:"enum",value:[{value:'"md"'},{value:'"sm"'},{value:'"lg"'}]}}}}}catch{}const St={title:"Components/DatePicker",component:y,parameters:{layout:"padded"},tags:["autodocs"],argTypes:{value:{control:"date"},startDate:{control:"date"},endDate:{control:"date"},selectionMode:{control:{type:"radio"},options:["single","range"],description:"Selection mode - single date or date range"},minDate:{control:"date"},maxDate:{control:"date"},format:{control:"text"},placeholder:{control:"text"},disabled:{control:"boolean"},readOnly:{control:"boolean"},clearable:{control:"boolean"},showTodayButton:{control:"boolean"},showWeekNumbers:{control:"boolean"},inline:{control:"boolean"},size:{control:{type:"select"},options:["sm","md","lg"]},placement:{control:{type:"select"},options:["top-start","top-end","bottom-start","bottom-end","left-start","left-end","right-start","right-end"]}}},te={args:{placeholder:"Select date...",format:"MM/dd/yyyy",clearable:!0,showTodayButton:!0,showWeekNumbers:!1,size:"md",placement:"bottom-start",selectionMode:"single"},render:a=>{const[t,r]=s.useState(null);return e.jsx("div",{style:{width:"300px"},className:"u-mt-20 u-mx-auto u-items-center",children:e.jsx(y,{...a,value:t,onChange:r})})}},ae={args:{selectionMode:"single"},render:a=>{const t=new Date,[r,n]=s.useState(t);return e.jsx("div",{style:{width:"300px"},className:"u-mt-20 u-mx-auto u-items-center",children:e.jsx(y,{...a,value:r,onChange:n})})}},ne={args:{inline:!0,showWeekNumbers:!0,selectionMode:"single"},render:a=>{const[t,r]=s.useState(new Date);return e.jsx("div",{style:{width:"300px"},className:"u-mt-20 u-mx-auto u-items-center",children:e.jsx(y,{...a,value:t,onChange:r})})}},re={args:{selectionMode:"range",placeholder:"Select date range..."},render:a=>{const[t,r]=s.useState({startDate:null,endDate:null}),n=o=>{r(o)};return e.jsxs("div",{style:{width:"300px"},className:"u-d-flex u-flex-column u-gap-4 u-mt-20 u-mx-auto u-items-center",children:[e.jsx(y,{...a,startDate:t.startDate,endDate:t.endDate,onRangeChange:n}),e.jsx("div",{style:{marginTop:"1rem",padding:"0.75rem",backgroundColor:"#f5f5f5",borderRadius:"0.25rem"},children:e.jsxs("p",{children:["Selected range:"," ",t.startDate&&t.endDate?me(t.startDate,t.endDate,"MM/dd/yyyy"):t.startDate?me(t.startDate,null,"MM/dd/yyyy"):"No range selected"]})})]})}},se={args:{selectionMode:"range",placeholder:"Select date range..."},render:a=>{const t=new Date;t.setDate(t.getDate()-7);const r=new Date;r.setDate(r.getDate()+14);const[n,o]=s.useState({startDate:null,endDate:null}),h=g=>{o(g)};return e.jsxs("div",{style:{width:"400px"},className:"u-d-flex u-flex-column u-gap-4 u-mt-20 u-mx-auto u-items-center",children:[e.jsxs("p",{className:"u-text-info u-px-2 u-py-4 u-bg-info-subtle u-fs-xs u-text-center",children:["Select a date range between ",t.toLocaleDateString()," and"," ",r.toLocaleDateString()]}),e.jsx(y,{...a,startDate:n.startDate,endDate:n.endDate,onRangeChange:h,minDate:t,maxDate:r})]})}},le={args:{selectionMode:"range",inline:!0,showWeekNumbers:!0},render:a=>{const[t,r]=s.useState({startDate:null,endDate:null}),n=o=>{r(o)};return e.jsxs("div",{style:{width:"300px"},className:"u-d-flex u-flex-column u-gap-4 u-mt-20 u-mx-auto u-items-center",children:[e.jsx(y,{...a,startDate:t.startDate,endDate:t.endDate,onRangeChange:n}),e.jsx("div",{style:{marginTop:"1rem",padding:"0.75rem",backgroundColor:"#f5f5f5",borderRadius:"0.25rem"},children:e.jsxs("p",{children:["Selected range:"," ",t.startDate&&t.endDate?me(t.startDate,t.endDate,"MM/dd/yyyy"):t.startDate?me(t.startDate,null,"MM/dd/yyyy"):"No range selected"]})})]})}},de={render:a=>{const[t,r]=s.useState(null);return e.jsxs("div",{style:{width:"300px"},className:"u-d-flex u-flex-column u-gap-4 u-mt-20 u-mx-auto u-items-center",children:[e.jsx(y,{...a,size:"sm",placeholder:"Small (sm)",value:t,onChange:r}),e.jsx(y,{...a,size:"md",placeholder:"Medium (md)",value:t,onChange:r}),e.jsx(y,{...a,size:"lg",placeholder:"Large (lg)",value:t,onChange:r})]})}},ce={args:{disabled:!0,placeholder:"Disabled DatePicker"},render:a=>{const[t,r]=s.useState(null);return e.jsx("div",{style:{width:"300px"},className:"u-mt-20 u-mx-auto",children:e.jsx(y,{...a,value:t,onChange:r})})}},oe={args:{readOnly:!0,placeholder:"Read-only DatePicker"},render:a=>{const t=new Date,[r,n]=s.useState(t);return e.jsx("div",{className:"u-mt-20 u-mx-auto",style:{width:"300px"},"data-testid":"read-only-datepicker",children:e.jsx(y,{...a,value:r,onChange:n})})}},ie={render:a=>{const t=new Date,[r,n]=s.useState(t),[o,h]=s.useState(t),[g,f]=s.useState(t);return e.jsxs("div",{className:"u-w-75 u-mx-auto u-mt-20 u-d-flex u-gap-3",children:[e.jsx(y,{...a,format:"MM/dd/yyyy",placeholder:"MM/DD/YYYY",value:r,onChange:n}),e.jsx(y,{...a,format:"dd/MM/yyyy",placeholder:"DD/MM/YYYY",value:o,onChange:h}),e.jsx(y,{...a,format:"yyyy-MM-dd",placeholder:"YYYY-MM-DD",value:g,onChange:f})]})}},ue={render:a=>{const[t,r]=s.useState(null),[n,o]=s.useState({startDate:null,endDate:null}),h=f=>{r(f)},g=f=>{o(f)};return a.selectionMode==="single"?e.jsx(y,{...a,value:t,onChange:h}):e.jsx(y,{...a,startDate:n.startDate,endDate:n.endDate,onRangeChange:g})}};var Ie,Te,ze;te.parameters={...te.parameters,docs:{...(Ie=te.parameters)==null?void 0:Ie.docs,source:{originalSource:`{
  args: {
    placeholder: 'Select date...',
    format: 'MM/dd/yyyy',
    clearable: true,
    showTodayButton: true,
    showWeekNumbers: false,
    size: 'md',
    placement: 'bottom-start',
    selectionMode: 'single'
  },
  render: args => {
    const [date, setDate] = useState<Date | null>(null);
    return <div style={{
      width: '300px'
    }} className="u-mt-20 u-mx-auto u-items-center">
        <DatePicker {...args} value={date} onChange={setDate} />
      </div>;
  }
}`,...(ze=(Te=te.parameters)==null?void 0:Te.docs)==null?void 0:ze.source}}};var Fe,qe,We;ae.parameters={...ae.parameters,docs:{...(Fe=ae.parameters)==null?void 0:Fe.docs,source:{originalSource:`{
  args: {
    selectionMode: 'single'
  },
  render: args => {
    const initialDate = new Date();
    const [date, setDate] = useState<Date | null>(initialDate);
    return <div style={{
      width: '300px'
    }} className="u-mt-20 u-mx-auto u-items-center">
        <DatePicker {...args} value={date} onChange={setDate} />
      </div>;
  }
}`,...(We=(qe=ae.parameters)==null?void 0:qe.docs)==null?void 0:We.source}}};var Le,Ee,Be;ne.parameters={...ne.parameters,docs:{...(Le=ne.parameters)==null?void 0:Le.docs,source:{originalSource:`{
  args: {
    inline: true,
    showWeekNumbers: true,
    selectionMode: 'single'
  },
  render: args => {
    const [date, setDate] = useState<Date | null>(new Date());
    return <div style={{
      width: '300px'
    }} className="u-mt-20 u-mx-auto u-items-center">
        <DatePicker {...args} value={date} onChange={setDate} />
      </div>;
  }
}`,...(Be=(Ee=ne.parameters)==null?void 0:Ee.docs)==null?void 0:Be.source}}};var Ae,Ge,He;re.parameters={...re.parameters,docs:{...(Ae=re.parameters)==null?void 0:Ae.docs,source:{originalSource:`{
  args: {
    selectionMode: 'range',
    placeholder: 'Select date range...'
  },
  render: args => {
    const [dateRange, setDateRange] = useState<DateRange>({
      startDate: null,
      endDate: null
    });
    const handleRangeChange = (range: DateRange) => {
      setDateRange(range);
    };
    return <div style={{
      width: '300px'
    }} className="u-d-flex u-flex-column u-gap-4 u-mt-20 u-mx-auto u-items-center">
        <DatePicker {...args} startDate={dateRange.startDate} endDate={dateRange.endDate} onRangeChange={handleRangeChange} />
        <div style={{
        marginTop: '1rem',
        padding: '0.75rem',
        backgroundColor: '#f5f5f5',
        borderRadius: '0.25rem'
      }}>
          <p>
            Selected range:{' '}
            {dateRange.startDate && dateRange.endDate ? formatDateRange(dateRange.startDate, dateRange.endDate, 'MM/dd/yyyy') : dateRange.startDate ? formatDateRange(dateRange.startDate, null, 'MM/dd/yyyy') : 'No range selected'}
          </p>
        </div>
      </div>;
  }
}`,...(He=(Ge=re.parameters)==null?void 0:Ge.docs)==null?void 0:He.source}}};var Xe,Je,Ke;se.parameters={...se.parameters,docs:{...(Xe=se.parameters)==null?void 0:Xe.docs,source:{originalSource:`{
  args: {
    selectionMode: 'range',
    placeholder: 'Select date range...'
  },
  render: args => {
    // Set min date to 7 days ago
    const minDate = new Date();
    minDate.setDate(minDate.getDate() - 7);

    // Set max date to 14 days from now
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 14);
    const [dateRange, setDateRange] = useState<DateRange>({
      startDate: null,
      endDate: null
    });
    const handleRangeChange = (range: DateRange) => {
      setDateRange(range);
    };
    return <div style={{
      width: '400px'
    }} className="u-d-flex u-flex-column u-gap-4 u-mt-20 u-mx-auto u-items-center">
        <p className="u-text-info u-px-2 u-py-4 u-bg-info-subtle u-fs-xs u-text-center">
          Select a date range between {minDate.toLocaleDateString()} and{' '}
          {maxDate.toLocaleDateString()}
        </p>
        <DatePicker {...args} startDate={dateRange.startDate} endDate={dateRange.endDate} onRangeChange={handleRangeChange} minDate={minDate} maxDate={maxDate} />
      </div>;
  }
}`,...(Ke=(Je=se.parameters)==null?void 0:Je.docs)==null?void 0:Ke.source}}};var Qe,Ue,Ze;le.parameters={...le.parameters,docs:{...(Qe=le.parameters)==null?void 0:Qe.docs,source:{originalSource:`{
  args: {
    selectionMode: 'range',
    inline: true,
    showWeekNumbers: true
  },
  render: args => {
    const [dateRange, setDateRange] = useState<DateRange>({
      startDate: null,
      endDate: null
    });
    const handleRangeChange = (range: DateRange) => {
      setDateRange(range);
    };
    return <div style={{
      width: '300px'
    }} className="u-d-flex u-flex-column u-gap-4 u-mt-20 u-mx-auto u-items-center">
        <DatePicker {...args} startDate={dateRange.startDate} endDate={dateRange.endDate} onRangeChange={handleRangeChange} />
        <div style={{
        marginTop: '1rem',
        padding: '0.75rem',
        backgroundColor: '#f5f5f5',
        borderRadius: '0.25rem'
      }}>
          <p>
            Selected range:{' '}
            {dateRange.startDate && dateRange.endDate ? formatDateRange(dateRange.startDate, dateRange.endDate, 'MM/dd/yyyy') : dateRange.startDate ? formatDateRange(dateRange.startDate, null, 'MM/dd/yyyy') : 'No range selected'}
          </p>
        </div>
      </div>;
  }
}`,...(Ze=(Ue=le.parameters)==null?void 0:Ue.docs)==null?void 0:Ze.source}}};var Oe,et,tt;de.parameters={...de.parameters,docs:{...(Oe=de.parameters)==null?void 0:Oe.docs,source:{originalSource:`{
  render: args => {
    const [date, setDate] = useState<Date | null>(null);
    return <div style={{
      width: '300px'
    }} className={'u-d-flex u-flex-column u-gap-4 u-mt-20 u-mx-auto u-items-center'}>
        <DatePicker {...args} size="sm" placeholder="Small (sm)" value={date} onChange={setDate} />
        <DatePicker {...args} size="md" placeholder="Medium (md)" value={date} onChange={setDate} />
        <DatePicker {...args} size="lg" placeholder="Large (lg)" value={date} onChange={setDate} />
      </div>;
  }
}`,...(tt=(et=de.parameters)==null?void 0:et.docs)==null?void 0:tt.source}}};var at,nt,rt;ce.parameters={...ce.parameters,docs:{...(at=ce.parameters)==null?void 0:at.docs,source:{originalSource:`{
  args: {
    disabled: true,
    placeholder: 'Disabled DatePicker'
  },
  render: args => {
    const [date, setDate] = useState<Date | null>(null);
    return <div style={{
      width: '300px'
    }} className="u-mt-20 u-mx-auto">
        <DatePicker {...args} value={date} onChange={setDate} />
      </div>;
  }
}`,...(rt=(nt=ce.parameters)==null?void 0:nt.docs)==null?void 0:rt.source}}};var st,lt,dt;oe.parameters={...oe.parameters,docs:{...(st=oe.parameters)==null?void 0:st.docs,source:{originalSource:`{
  args: {
    readOnly: true,
    placeholder: 'Read-only DatePicker'
  },
  render: args => {
    const initialDate = new Date();
    const [date, setDate] = useState<Date | null>(initialDate);
    return <div className="u-mt-20 u-mx-auto" style={{
      width: '300px'
    }} data-testid="read-only-datepicker">
        <DatePicker {...args} value={date} onChange={setDate} />
      </div>;
  }
}`,...(dt=(lt=oe.parameters)==null?void 0:lt.docs)==null?void 0:dt.source}}};var ct,ot,it;ie.parameters={...ie.parameters,docs:{...(ct=ie.parameters)==null?void 0:ct.docs,source:{originalSource:`{
  render: args => {
    const initialDate = new Date();
    const [date1, setDate1] = useState<Date | null>(initialDate);
    const [date2, setDate2] = useState<Date | null>(initialDate);
    const [date3, setDate3] = useState<Date | null>(initialDate);
    return <div className="u-w-75 u-mx-auto u-mt-20 u-d-flex u-gap-3">
        <DatePicker {...args} format="MM/dd/yyyy" placeholder="MM/DD/YYYY" value={date1} onChange={setDate1} />
        <DatePicker {...args} format="dd/MM/yyyy" placeholder="DD/MM/YYYY" value={date2} onChange={setDate2} />
        <DatePicker {...args} format="yyyy-MM-dd" placeholder="YYYY-MM-DD" value={date3} onChange={setDate3} />
      </div>;
  }
}`,...(it=(ot=ie.parameters)==null?void 0:ot.docs)==null?void 0:it.source}}};var ut,mt,gt;ue.parameters={...ue.parameters,docs:{...(ut=ue.parameters)==null?void 0:ut.docs,source:{originalSource:`{
  render: args => {
    const [date, setDate] = useState<Date | null>(null);
    const [dateRange, setDateRange] = useState<DateRange>({
      startDate: null,
      endDate: null
    });
    const handleSingleDateChange = (date: Date | null) => {
      setDate(date);
    };
    const handleRangeChange = (range: DateRange) => {
      setDateRange(range);
    };
    return args.selectionMode === 'single' ? <DatePicker {...args} value={date} onChange={handleSingleDateChange} /> : <DatePicker {...args} startDate={dateRange.startDate} endDate={dateRange.endDate} onRangeChange={handleRangeChange} />;
  }
}`,...(gt=(mt=ue.parameters)==null?void 0:mt.docs)==null?void 0:gt.source}}};const wt=["Default","WithInitialDate","Inline","DateRangeSelection","DateRangeWithLimits","InlineRangeSelection","Sizes","Disabled","ReadOnly","DifferentFormats","Playground"];export{re as DateRangeSelection,se as DateRangeWithLimits,te as Default,ie as DifferentFormats,ce as Disabled,ne as Inline,le as InlineRangeSelection,ue as Playground,oe as ReadOnly,de as Sizes,ae as WithInitialDate,wt as __namedExportsOrder,St as default};
