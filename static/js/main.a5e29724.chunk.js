(this["webpackJsonpreact-js"]=this["webpackJsonpreact-js"]||[]).push([[0],{197:function(e,t,n){"use strict";n.r(t);var r=n(0),c=n.n(r),o=n(74),a=n.n(o),i=(n(84),n(85),n(86),n(87),n(8)),s=n(12),u=n(1),f=n.n(u),l=n(79),d=n(4),h=function(e){e.className;var t=e.points,n=e.onChangeColor,c=e.index,o=f()({default:{container:{position:"absolute",left:t[c].currentXY.x,top:t[c].currentXY.y},point:{backgroundColor:t[c].colour.hex},picker:{position:"fixed"}}});Object(r.useEffect)((function(){}));return t[c].ref=Object(r.useRef)(null),Object(d.jsxs)("div",{style:o.container,children:[Object(d.jsx)("div",{ref:t[c].ref,style:o.point,className:"dragItem",id:t[c].id}),t[c].showPicker&&Object(d.jsx)(l.a,{style:{position:"fixed"},color:t[c].colour.hex,onChange:function(e){return n(c,e)},disableAlpha:!0,presetColors:[]})]})};h.defaultProps={className:"dragItem"};var v=h,x=function(e){var t=e.points,n=e.onChangeColor,c=e.onRender;Object(r.useEffect)((function(){c()}));var o=[];for(var a in t)o.push(Object(d.jsx)(v,{points:t,index:a,onChangeColor:n}));return o},p=function(e){var t=e.id,n=e.canvasPoints,c=Object(r.useState)(n),o=Object(s.a)(c,2),a=o[0],i=o[1],u=Object(r.useState)(Object(r.useRef)(null)),f=Object(s.a)(u,2),l=f[0],h=(f[1],function(e,t){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))}),v=function(e){var t=0,n=[0,0,0],r=a[0].colour;for(var c in a){var o=h(e,a[c]);t+=1/o,r=a[c].colour,n[0]+=1/o*r.r,n[1]+=1/o*r.g,n[2]+=1/o*r.b}return n[0]/=t,n[1]/=t,n[2]/=t,n};return Object(r.useEffect)((function(){i(n),function(){var e=l.current.getContext("2d");l.current.width=l.current.offsetWidth,l.current.height=l.current.offsetHeight;var t=e.createImageData(l.current.width,l.current.height);if(console.log(t.data.length),a){for(var n=0;n<t.data.length;n+=4){var r=Math.floor(n/4)%l.current.width,c=Math.floor(Math.floor(n/4)/l.current.width),o=v({x:r,y:c});t.data[n]=o[0],t.data[n+1]=o[1],t.data[n+2]=o[2],t.data[n+3]=255}console.log(0),e.putImageData(t,0,0)}}()})),Object(d.jsx)("canvas",{id:t,ref:l})};var j=function(){var e=Object(r.useState)([{mouseDown:!1,start:{x:0,y:0},end:{x:0,y:0}}]),t=Object(s.a)(e,2),n=t[0],c=t[1],o={hsl:{h:53.835616438356155,s:.8795180722891567,l:.6745098039215687,a:1},hex:"#f5e663",rgb:{r:245,g:230,b:99,a:1},hsv:{h:53.835616438356155,s:.5959183673469387,v:.9607843137254902,a:1},oldHue:53.33333333333332,source:"hex"},a=Object(r.useState)([{ref:null,active:!1,colour:o,showPicker:!1,pointerOffset:{x:0,y:0},currentXY:{x:50,y:50},size:!1}]),u=Object(s.a)(a,2),f=u[0],l=u[1],h=Object(r.useState)(!1),v=Object(s.a)(h,2),j=v[0],b=v[1],y=function(e){n.mouseDown=!0,c(n);var t=document.elementFromPoint(e.clientX,e.clientY);if(t.classList.contains("dragItem")){var r;for(var o in f)f[o].ref.current===t&&(r=o);console.log("dragStart "+r,f[r]);var a={x:0,y:0};a="touch"===e.type.substr(0,5)?{x:e.touches[0].clientX,y:e.touches[0].clientY}:{x:e.clientX,y:e.clientY},n.start=a,n.end=a,c(n),f[r].pointerOffset.x=a.x-f[r].currentXY.x,f[r].pointerOffset.y=a.y-f[r].currentXY.y,f[r].active=!0,f[r].ref.current.classList.add("active"),f[r].ref.current.parentNode.style.zIndex=1,l(Object(i.a)(f))}},O=function(e){for(var t in f)f[t].showPicker=!1,f[t].ref.current.classList.remove("active"),f[t].ref.current.parentNode.style.zIndex=1;f[e].ref.current.classList.add("active"),f[e].ref.current.parentNode.style.zIndex=2,l(f)},g=function(){var e=!1;for(var t in f)e=e||f[t].active;return e},m=function(e,t){e.showPicker=t},w=function(e,t){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))<=5};return Object(r.useEffect)((function(){!function(e){var t=new Array(f.length);for(var n in f)f[n].size&&(t[n]={x:f[n].currentXY.x+f[n].size[0]/2,y:f[n].currentXY.y+f[n].size[1]/2,colour:f[n].colour.rgb});e&&b(t)}(!0)}),[f]),Object(d.jsx)("div",{className:"App",onPointerDown:function(e){return y(e)},onPointerMove:function(e){return function(e){if(g()){var t;for(var r in f)f[r].active&&(t=r);e.preventDefault();var o={x:0,y:0};if(o="touch"===e.type.substr(0,5)?{x:e.touches[0].clientX,y:e.touches[0].clientY}:{x:e.clientX,y:e.clientY},n.end=o,c(n),!w(n.start,n.end)){m(f[t],!1),O(t),f[t].currentXY.x=o.x-f[t].pointerOffset.x,f[t].currentXY.y=o.y-f[t].pointerOffset.y;var a=[[0,0],[0,0]];a[1]=[a[0][0]+f[t].ref.current.parentNode.parentNode.clientWidth-f[t].size[0],a[0][1]+f[t].ref.current.parentNode.parentNode.clientHeight-f[t].size[1]],f[t].currentXY.x=Math.max(Math.min(f[t].currentXY.x,a[1][0]),a[0][0]),f[t].currentXY.y=Math.max(Math.min(f[t].currentXY.y,a[1][1]),a[0][1]),f[t].ref.current.parentNode.style.left=f[t].currentXY.x,f[t].ref.current.parentNode.style.top=f[t].currentXY.y,l(Object(i.a)(f))}}else n.mouseDown&&y(e)}(e)},onPointerUp:function(e){return function(e){var t;for(var r in n.mouseDown=!1,c(n),f)f[r].active&&(t=r);t&&(f[t].pointerOffset.x=f[t].currentXY.x,f[t].pointerOffset.y=f[t].currentXY.y,f[t].ref.current.classList.remove("active"),f[t].active=!1,w(n.start,n.end)&&!f[t].showPicker?(O(t),f[t].ref.current.classList.add("active"),f[t].ref.current.parentNode.style.zIndex=2,m(f[t],!0)):(m(f[t],!1),f[t].ref.current.parentNode.style.zIndex=1),console.log("dragEnd "+t,f[t]),l(Object(i.a)(f)))}()},children:Object(d.jsxs)("div",{id:"outerContainer",children:[Object(d.jsxs)("div",{id:"dragPalette",children:[Object(d.jsx)(p,{id:"gradientPalette",canvasPoints:j}),Object(d.jsx)(x,{points:f,onRender:function(){var e=!1;for(var t in f)f[t].size||(e=!0,f[t].size=[f[t].ref.current.offsetWidth,f[t].ref.current.offsetHeight]);e&&l(f)},onChangeColor:function(e,t){var n=Object(i.a)(f);n[e].colour=t,l(Object(i.a)(n))}})]}),Object(d.jsxs)("div",{id:"point-manager",children:[Object(d.jsx)("button",{className:"button plus",onClick:function(){var e={ref:null,active:!1,colour:o,showPicker:!1,pointerOffset:{x:0,y:0},currentXY:{x:50,y:50},size:!1};l([].concat(Object(i.a)(f),[e]))}}),Object(d.jsx)("button",{className:"button minus",onClick:function(){return function(e){var t=e.index;-1===t&&(t=f.length-1),console.log("Removing point with key "+t);var n=f;n.splice(t,1),l(Object(i.a)(n)),console.log("New points are ",f)}({index:-1})}})]})]})})},b=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,199)).then((function(t){var n=t.getCLS,r=t.getFID,c=t.getFCP,o=t.getLCP,a=t.getTTFB;n(e),r(e),c(e),o(e),a(e)}))};a.a.render(Object(d.jsx)(c.a.StrictMode,{children:Object(d.jsx)(j,{})}),document.getElementById("root")),b()},84:function(e,t,n){},85:function(e,t,n){},86:function(e,t,n){},87:function(e,t,n){}},[[197,1,2]]]);
//# sourceMappingURL=main.a5e29724.chunk.js.map