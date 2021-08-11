(this["webpackJsonpreact-js"]=this["webpackJsonpreact-js"]||[]).push([[0],{197:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),a=n(74),i=n.n(a),c=(n(84),n(85),n(86),n(87),n(8)),s=n(12),u=n(1),f=n.n(u),l=n(79),d=n(3),h=function(e){var t,n=e.points,o=e.onChangeColor,a=e.index;t=n[a].colour.hex?n[a].colour.hex:n[a].colour;var i=f()({default:{container:{left:n[a].currentXY.x,top:n[a].currentXY.y},pointContainer:{display:"flex",justifyContent:"center",alignItems:"center",height:"36px",width:"36px",flexWrap:"nowrap"},point:{backgroundColor:t},picker:{}}});return n[a].pointRef=Object(r.useRef)(),n[a].containerRef=Object(r.useRef)(),Object(d.jsxs)("div",{className:"dragIContainer",style:i.container,ref:n[a].containerRef,children:[Object(d.jsx)("div",{style:i.pointContainer,children:Object(d.jsx)("div",{ref:n[a].pointRef,style:i.point,className:"dragItem",id:n[a].id})}),n[a].showPicker&&Object(d.jsx)(l.a,{style:{position:"fixed"},color:t,onChange:function(e){return o(a,e)},disableAlpha:!0,presetColors:[]})]})};h.defaultProps={className:"dragItem"};var v=h,x=function(e){var t=e.points,n=e.onChangeColor,o=e.onRender;Object(r.useEffect)((function(){o()}));var a=[];for(var i in t)a.push(Object(d.jsx)(v,{points:t,index:i,onChangeColor:n}));return a},p=new window.Worker("./gradientWorker.js"),g=function(e){var t=e.id,n=e.canvasPoints,o=Object(r.useState)(n),a=Object(s.a)(o,2),i=a[0],c=a[1],u=Object(r.useState)(Object(r.useRef)(null)),f=Object(s.a)(u,2),l=f[0],h=(f[1],function e(t){l.current.getContext("2d").putImageData(t,0,0),window.requestAnimationFrame((function(){return e(t)}))}),v=function(){var e=l.current.getContext("2d");l.current.width=l.current.offsetWidth,l.current.height=l.current.offsetHeight;var t=e.createImageData(l.current.width,l.current.height),n=t.data.length;p.terminate(),(p=new window.Worker("./gradientWorker.js")).postMessage({imageData:t,points:i,canvas:{width:l.current.width,height:l.current.height}}),p.onerror=function(e){console.log("error",e)},p.onmessage=function(e){if(n===e.data.imageData.data.length){var t=Date.now();h(e.data.imageData);var r=Date.now()-t;console.log("drawing time "+r+"ms")}}};return Object(r.useEffect)((function(){c(n),v()})),Object(d.jsx)("canvas",{id:t,ref:l})};var j=function(){var e=Object(r.useState)([{mouseDown:!1,start:{x:0,y:0},end:{x:0,y:0}}]),t=Object(s.a)(e,2),n=t[0],o=t[1],a=function(e){var t,n,r,o,a,i,c=[e.r,e.g,e.b];t=Math.max.apply(Math,c),n=Math.min.apply(Math,c),0===(r=t-n)?o=0:t===c[0]?o=(c[1]-c[2])/r%6:t===c[1]?o=(c[2]-c[0])/r+2:t===c[2]&&(o=(c[0]-c[1])/r+4);var s={h:o=((o*=60)%360+360)%360,s:0===(a=t/255)?0:r/(255*a),v:a,a:1},u={h:o,s:1===(i=(t+n)/510)||0===i?0:r/(255*(1-Math.abs(2*i-1))),l:i,a:1};e.a=1;var f="#";for(var l in c){var d=Math.floor(c[l]).toString(16);f+="0".repeat(2-d.length)+d}return{rgb:e,hsv:s,hsl:u,hex:f}},i=a({r:255*Math.random(),g:255*Math.random(),b:255*Math.random()}),u=Object(r.useState)([{pointRef:null,containerRef:null,active:!1,colour:i,showPicker:!1,pointerOffset:{x:0,y:0},currentXY:{x:50,y:50},size:!1}]),f=Object(s.a)(u,2),l=f[0],h=f[1],v=Object(r.useState)(!1),p=Object(s.a)(v,2),j=p[0],m=p[1],b=function(e){n.mouseDown=!0,o(n);var t=document.elementFromPoint(e.clientX,e.clientY);if(t.classList.contains("dragItem")){var r;for(var a in l)l[a].pointRef.current===t&&(r=a);console.log("dragStart "+r,l[r]);var i={x:0,y:0};i="touch"===e.type.substr(0,5)?{x:e.touches[0].clientX,y:e.touches[0].clientY}:{x:e.clientX,y:e.clientY},n.start=i,n.end=i,o(n),l[r].pointerOffset.x=i.x-l[r].currentXY.x,l[r].pointerOffset.y=i.y-l[r].currentXY.y,l[r].active=!0,l[r].pointRef.current.classList.add("active"),l[r].containerRef.current.style.zIndex=1,h(Object(c.a)(l))}},y=function(e){for(var t in l)l[t].showPicker=!1,l[t].pointRef.current.classList.remove("active"),l[t].containerRef.current.style.zIndex=1;l[e].pointRef.current.classList.add("active"),l[e].pointRef.current.parentNode.style.zIndex=2,h(l)},O=function(){var e=!1;for(var t in l)e=e||l[t].active;return e},w=function(e,t){e.showPicker=t},M=function(e,t){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))<=5};return Object(r.useEffect)((function(){!function(e){var t=new Array(l.length);for(var n in l)l[n].size&&(t[n]={x:l[n].currentXY.x+l[n].size[0]/2,y:l[n].currentXY.y+l[n].size[1]/2,colour:l[n].colour});e&&m(t)}(!0)}),[l]),Object(d.jsx)("div",{className:"App",onPointerDown:function(e){return b(e)},onPointerMove:function(e){return function(e){if(O()){var t;for(var r in l)l[r].active&&(t=r);e.preventDefault();var a={x:0,y:0};a="touch"===e.type.substr(0,5)?{x:e.touches[0].clientX,y:e.touches[0].clientY}:{x:e.clientX,y:e.clientY},n.end=a;var i=document.elementFromPoint(a.x,a.y);if(console.log("drag target is",i),o(n),!M(n.start,n.end)){w(l[t],!1),y(t);var s={x:0,y:0};s.x=a.x-l[t].pointerOffset.x,s.y=a.y-l[t].pointerOffset.y;var u=[[0,0],[0,0]];u[1]=[u[0][0]+l[t].containerRef.current.parentNode.clientWidth-l[t].size[0],u[0][1]+l[t].containerRef.current.parentNode.clientHeight-l[t].size[1]],console.log("x, y = ",[Math.max(Math.min(s.x,u[1][0]),u[0][0]),Math.max(Math.min(s.y,u[1][1]),u[0][1])]),l[t].currentXY.x=Math.max(Math.min(s.x,u[1][0]),u[0][0]),l[t].currentXY.y=Math.max(Math.min(s.y,u[1][1]),u[0][1]),h(Object(c.a)(l))}}else n.mouseDown&&b(e)}(e)},onPointerUp:function(e){return function(e){var t;for(var r in n.mouseDown=!1,o(n),l)l[r].active&&(t=r);t&&(l[t].pointerOffset.x=l[t].currentXY.x,l[t].pointerOffset.y=l[t].currentXY.y,l[t].active=!1,M(n.start,n.end)&&!l[t].showPicker?(y(t),l[t].pointRef.current.classList.add("active"),l[t].containerRef.current.style.zIndex=2,w(l[t],!0)):(l[t].pointRef.current.classList.remove("active"),w(l[t],!1),l[t].containerRef.current.style.zIndex=1),console.log("dragEnd "+t,l[t]),h(Object(c.a)(l)))}()},children:Object(d.jsxs)("div",{id:"outerContainer",children:[Object(d.jsx)("div",{id:"dragPalette",children:Object(d.jsx)(g,{id:"gradientPalette",canvasPoints:j})}),Object(d.jsx)(x,{points:l,onRender:function(){var e=!1;for(var t in l)l[t].size||(e=!0,l[t].size=[l[t].pointRef.current.offsetWidth,l[t].pointRef.current.offsetHeight]);e&&h(l)},onChangeColor:function(e,t){var n=Object(c.a)(l);n[e].colour=t,h(Object(c.a)(n))}}),Object(d.jsxs)("div",{id:"point-manager",children:[Object(d.jsx)("button",{className:"button plus",onClick:function(){var e,t={x:50,y:50};if(l.length>0){var n=[[0,0],[0,0]];n[1]=[n[0][0]+l[0].containerRef.current.parentNode.clientWidth-l[0].size[0],n[0][1]+l[0].containerRef.current.parentNode.clientHeight-l[0].size[1]],t={x:Math.floor(Math.random()*n[1][0]+n[0][0]),y:Math.floor(Math.random()*n[1][1]+n[0][1])}}e={r:255*Math.random(),g:255*Math.random(),b:255*Math.random()};var r={ref:null,containerRef:null,active:!1,colour:e=a(e),showPicker:!1,pointerOffset:{x:0,y:0},currentXY:t,size:!1};h([].concat(Object(c.a)(l),[r]))}}),Object(d.jsx)("button",{className:"button minus",onClick:function(){return function(e){var t=e.index;-1===t&&(t=l.length-1),console.log("Removing point with key "+t);var n=l;n.splice(t,1),h(Object(c.a)(n)),console.log("New points are ",l)}({index:-1})}})]})]})})},m=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,199)).then((function(t){var n=t.getCLS,r=t.getFID,o=t.getFCP,a=t.getLCP,i=t.getTTFB;n(e),r(e),o(e),a(e),i(e)}))};i.a.render(Object(d.jsx)(o.a.StrictMode,{children:Object(d.jsx)(j,{})}),document.getElementById("root")),m()},84:function(e,t,n){},85:function(e,t,n){},86:function(e,t,n){},87:function(e,t,n){}},[[197,1,2]]]);
//# sourceMappingURL=main.c08be3d3.chunk.js.map