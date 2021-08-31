(this["webpackJsonpreact-js"]=this["webpackJsonpreact-js"]||[]).push([[0],{203:function(t,n,e){"use strict";e.r(n);var i=e(0),r=e.n(i),o=e(76),a=e.n(o),c=(e(88),e(89),e(90),e(91),e(49)),s=e.n(c),u=e(83),d=e(77),l=e(5),v=e(6),g=e(1),h=e.n(g),f=e(82),b=e(13),p=e(3),m=function(t){var n,e,r,o,a,c,s,u,d,l,v,g=t.points,m=t.onChangeColor,x=t.index,j=t.onPickerButton;v=g[x].colour.hex?g[x].colour.hex:g[x].colour;var O=h()({default:{container:{left:g[x].currentXY.x,top:g[x].currentXY.y},pointContainer:{display:"flex",justifyContent:"center",alignItems:"center",height:"36px",width:"36px",flexWrap:"nowrap"},point_unclicked:{backgroundColor:(null===(n=g[x].tags)||void 0===n?void 0:n.showRadius)?v:"#FFFFFF00"},point_clicked:{backgroundColor:v},radius:{width:(null===(e=g[x].tags)||void 0===e?void 0:e.showRadius)?2*g[x].radius+50+"px":"0px",height:(null===(r=g[x].tags)||void 0===r?void 0:r.showRadius)?2*g[x].radius+50+"px":"0px",transition:(null===(o=g[x].tags)||void 0===o?void 0:o.resizing)?"all 0s cubic-bezier(0.52, -1.01, ".concat(.48,", ").concat(2.01,") 0s"):"all 0.3s cubic-bezier(0.52, -1.01, ".concat(.48,", ").concat(2.01,") 0s")},pickerButton:{width:(null===(a=g[x].tags)||void 0===a?void 0:a.clicked)?"30px":"0px",height:(null===(c=g[x].tags)||void 0===c?void 0:c.clicked)?"30px":"0px",fontSize:(null===(s=g[x].tags)||void 0===s?void 0:s.clicked)?"12pt":"0pt",transform:(null===(u=g[x].tags)||void 0===u?void 0:u.clicked)?(null===(d=g[x].tags)||void 0===d?void 0:d.showRadius)?"translate(-50%, calc(-40px - ".concat(g[x].radius+25,"px))"):"translate(-50%, -60px)":"translate(-50%, -50%)",transition:(null===(l=g[x].tags)||void 0===l?void 0:l.resizing)?"all 0s cubic-bezier(0.52, -1.01, ".concat(.48,", ").concat(2.01,") 0s, color 0s"):"all 0.3s cubic-bezier(0.52, -1.01, ".concat(.48,", ").concat(2.01,") 0s, color 0s"),color:v},pickerBar:{position:"fixed",transform:"translate(calc(-50% + 18px), calc(2px+".concat(g[x].radius+25,"))")}}});return g[x].pointRef=Object(i.useRef)(),g[x].containerRef=Object(i.useRef)(),Object(p.jsxs)("div",{className:"dragIContainer",style:O.container,ref:g[x].containerRef,children:[Object(p.jsx)("div",{style:O.pointContainer,children:Object(p.jsxs)("div",{children:[Object(p.jsx)("div",{className:"dragColor",style:O.pickerButton,onClick:function(t){return j(x)},children:Object(p.jsx)(b.d,{})}),Object(p.jsx)("div",{style:O.radius,className:"dragIWeight",id:g[x].id}),Object(p.jsx)("div",{ref:g[x].pointRef,style:O.point_unclicked,className:"dragItem"+(g[x].tags&&(g[x].tags.active||g[x].tags.clicked)?" active":""),tabIndex:1,id:g[x].id})]})}),g[x].tags&&g[x].tags.showPicker&&Object(p.jsx)(f.a,{style:O.pickerBar,color:v,onChange:function(t){return m(x,t,!1)},onChangeComplete:function(t){return m(x,t,!0)},disableAlpha:!0,presetColors:[]})]})};m.defaultProps={className:"dragItem"};var x=m,j=function(t){var n=t.points,e=t.onChangeColor,r=t.onRender,o=t.onPickerButton;Object(i.useEffect)((function(){r()}));var a=[];for(var c in n)a.push(Object(p.jsx)(x,{points:n,index:c,onChangeColor:e,onPickerButton:o}));return a},O=e(202);function y(t){console&&(console.error?console.error(t):console.log&&console.log(t))}var w=/ERROR:\s*\d+:(\d+)/gi;function R(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",e=Object(l.a)(n.matchAll(w)),i=new Map(e.map((function(t,i){var r=parseInt(t[1]),o=e[i+1],a=o?o.index:n.length;return[r-1,n.substring(t.index,a)]})));return t.split("\n").map((function(t,n){var e=i.get(n);return"".concat(n+1,": ").concat(t).concat(e?"\n\n^^^ ".concat(e):"")})).join("\n")}function k(t,n,e,i){var r=i||y,o=t.createShader(e);if(t.shaderSource(o,n),t.compileShader(o),!t.getShaderParameter(o,t.COMPILE_STATUS)){var a=t.getShaderInfoLog(o);return r("Error compiling shader: ".concat(a,"\n").concat(R(n,a))),t.deleteShader(o),null}return o}function S(t,n,e,i,r){var o=r||y,a=t.createProgram();if(n.forEach((function(n){t.attachShader(a,n)})),e&&e.forEach((function(n,e){t.bindAttribLocation(a,i?i[e]:e,n)})),t.linkProgram(a),!t.getProgramParameter(a,t.LINK_STATUS)){var c=t.getProgramInfoLog(a);return o("Error in program linking: ".concat(c,"\n").concat(n.map((function(n){var e=R(t.getShaderSource(n)),i=t.getShaderParameter(n,t.SHADER_TYPE);return"".concat(O.glEnumToString(t,i),":\n").concat(e)})).join("\n"))),t.deleteProgram(a),null}return a}var C=["VERTEX_SHADER","FRAGMENT_SHADER"];var M=function(t,n,e,i,r){for(var o=[],a=0;a<n.length;++a)o.push(k(t,n[a],t[C[a]],r));return S(t,o,e,i,r)},z=function(t,n){if(t&&t.length>0){var e=n.getContext("webgl2");n.width=1*n.offsetWidth,n.height=1*n.offsetHeight;var i=M(e,["#version 300 es\n    in vec2 a_position;\n\n    uniform vec2 u_resolution;\n\n    out vec2 v_position;\n\n    void main(){\n        gl_Position = vec4(a_position/u_resolution * 2.0 - 1.0, 0, 1);\n        v_position = vec2(a_position.x, u_resolution.y-a_position.y);\n    }\n    ",(b=t.length,"#version 300 es\n    precision highp float;\n\n    in vec2 v_position;\n\n    uniform vec2 u_resolution;\n    uniform ivec2 pointsXY[".concat(b,"];\n    uniform float pointsRadius[").concat(b,"];\n    uniform vec3 pointsRGB[").concat(b,"];\n    uniform vec3 pointsHSV[").concat(b,"];\n\n    out vec4 outColor;\n\n    vec2 minMax(vec3 rgb){\n        vec2 mM = vec2(rgb[0], rgb[0]);\n        for(int i=1;i<3;i++){\n            if (rgb[i] < mM[0])\n                mM[0] = rgb[i];\n            if (rgb[i] > mM[1])\n                mM[1] = rgb[i];\n        }\n        return mM;\n    }\n\n    vec3 rgbToHsv(vec3 rgb){\n        float hue=0.0, C, V, Sv;\n        vec2 mM = minMax(rgb);\n        C = mM[1] - mM[0];\n        if(C==0.0){\n        }else if(mM[1]==rgb[0]){\n            hue = mod((rgb[1] - rgb[2]) / C, 6.0);\n        }else if(mM[1]==rgb[1]){\n            hue =     (rgb[2] - rgb[0]) / C + 2.0;\n        }else if(mM[1]==rgb[2]){\n            hue =     (rgb[0] - rgb[1]) / C + 4.0;\n        }\n        hue = mod((mod(hue * 60.0, 360.0) + 360.0), 360.0);\n\n        \n        V = mM[1];\n        if(V==0.0) Sv = 0.0;\n        else Sv = C/(V);\n\n        return vec3(hue, Sv, V);\n    }\n\n    float f(int n, vec3 hsv){\n        float k;\n        k = mod((float(n) + hsv[0] / 60.0), 6.0);\n        float fOut=hsv[2] - hsv[2] * hsv[1] * max(0.0, min(min(k, 4.0 - k), 1.0));\n        return fOut;\n    }\n\n    vec3 hsvToRgb(vec3 hsv){\n        vec3 rgb = vec3(f(5,hsv), f(3,hsv), f(1,hsv));\n        return rgb;\n    }\n\n    float dist(ivec2 pos, ivec2 point){\n        return pow(pow(float(pos.x-point.x), 2.0)+pow(float(pos.y-point.y), 2.0), 0.5);\n    }\n\n    void main(){\n        // ivec2 position = ivec2((v_position + 1.0) / 2.0 * u_resolution);\n        ivec2 position = ivec2(v_position);\n        float invSum = 0.0;\n        vec3 hsv = vec3(0,0,0), rgb = vec3(0,0,0);\n        int pointCentre = -1;\n        for(int i=0;i<").concat(b,";i++){\n            float d = dist(pointsXY[i], position);\n            if(abs(d)>0.0000001){\n                float invD = pow((1.0+pointsRadius[i]/10.0)/d, 3.0);\n                hsv += invD * pointsHSV[i];\n                rgb += invD * pointsRGB[i];\n                invSum += invD;\n            }else{\n                pointCentre=i;\n            }\n        }\n        if(pointCentre == -1){\n            hsv = hsv/invSum;\n            rgb = rgb/invSum;\n            // outColor = vec4(rgb, 1);\n            vec3 rgbInHsv = rgbToHsv(rgb);\n            // outColor = vec4(rgb, 1);\n            hsv[0] = rgbInHsv[0];\n            // hsv[1] = (1.25*rgbInHsv[1]+0.75*hsv[1])/2.0;\n            // hsv[1] = (2.0*rgbInHsv[1]+0.0*hsv[1])/2.0;\n            hsv[1] = rgbInHsv[1];\n            hsv[2] = (1.75*rgbInHsv[2]+0.25*hsv[2])/2.0;\n            // hsv[2]=0.5;\n            outColor = vec4(hsvToRgb(hsv),1);\n            // outColor = vec4(rgb,1);\n            // outColor = vec4(hsv,1);\n            // outColor = vec4(hsv[0]/360.0, hsv[1], hsv[2], 1);\n            // outColor = vec4(rgbInHsv[0]/360.0, rgbInHsv[1], rgbInHsv[2], 1);\n        }else{\n            hsv = pointsHSV[pointCentre];\n            rgb = pointsRGB[pointCentre];\n            outColor = vec4(rgb, 1);\n        }\n    }\n\n    "))]),r={position:e.getAttribLocation(i,"a_position"),resolution:e.getUniformLocation(i,"u_resolution"),pointsRadius:e.getUniformLocation(i,"pointsRadius"),pointsXY:e.getUniformLocation(i,"pointsXY"),pointsRGB:e.getUniformLocation(i,"pointsRGB"),pointsHSV:e.getUniformLocation(i,"pointsHSV")},o=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,o);var a=[0,n.height,n.width,0,n.width,n.height,0,0,n.width,0,0,n.height];e.bufferData(e.ARRAY_BUFFER,new Float32Array(a),e.STATIC_DRAW);var c=e.createVertexArray();e.bindVertexArray(c),e.enableVertexAttribArray(r.position);var s=e.FLOAT,u=0;e.vertexAttribPointer(r.position,2,s,!1,0,u),function(t,n){n=n||1;var e=t.clientWidth*n|0,i=t.clientHeight*n|0;(t.width!==e||t.height!==i)&&(t.width=e,t.height=i)}(e.canvas),e.viewport(0,0,e.canvas.width,e.canvas.height),e.useProgram(i);var d=t.map((function(t){return t.radius})),l=t.map((function(t){return[t.x,t.y]})),v=t.map((function(t){var n=t.colour;return[n.rgb.r/255,n.rgb.g/255,n.rgb.b/255]})),g=t.map((function(t){var n=t.colour;return[n.hsv.h/360,n.hsv.s,n.hsv.v]}));e.uniform1fv(r.pointsRadius,d.flat()),e.uniform2iv(r.pointsXY,l.flat()),e.uniform3fv(r.pointsRGB,v.flat()),e.uniform3fv(r.pointsHSV,g.flat()),e.uniform2f(r.resolution,n.width,n.height);var h=e.TRIANGLES;u=0;var f=a.length/2;e.drawArrays(h,u,f)}var b},P=new window.Worker("./gradientWorker.js"),I=function(t){var n=t.id,e=t.canvasPoints,r=Object(i.useState)(e),o=Object(v.a)(r,2),a=o[0],c=o[1],s=Object(i.useState)(Object(i.useRef)(null)),u=Object(v.a)(s,1)[0],d=function t(n){u.current.getContext("2d").putImageData(n,0,0),window.requestAnimationFrame((function(){return t(n)}))},l=function(){if(u.current.getContext("webgl2"))window.requestAnimationFrame((function(){return z(a,u.current)}));else{console.log("WebGL2 not available, using CPU.");var t=u.current.getContext("2d").createImageData(u.current.width,u.current.height),n=t.data.length;P.terminate(),(P=new window.Worker("./gradientWorker.js")).postMessage({imageData:t,points:a,canvas:{width:u.current.width,height:u.current.height}}),P.onerror=function(t){console.log("error",t)},P.onmessage=function(t){n===t.data.imageData.data.length&&window.requestAnimationFrame((function(){return d(t.data.imageData)}))}}};return Object(i.useEffect)((function(){c(e),l()})),Object(i.useEffect)((function(){u.current.getContext("webgl2")||alert("WebGL not available in this browser/platform. Renders may be slower.")}),[]),Object(p.jsx)("canvas",{id:n,ref:u})};var N=function(){var t=Object(i.useState)(!1),n=Object(v.a)(t,2),e=n[0],r=n[1],o=Object(i.useState)(!1),a=Object(v.a)(o,2),c=a[0],g=a[1],h=Object(i.useState)({down:!1,stateSaved:!1,clicked:{status:!1,index:void 0,obj:void 0},showRadius:!1,active:!1,resizing:{mode:!1,start:!1},target:{obj:void 0,index:void 0,initialPosition:{x:0,y:0},initialRadius:void 0},pos:{start:{x:0,y:0},middle:{x:0,y:0},end:{x:0,y:0},getXY:function(t){return"start"===t?[this.start.x,this.start.y]:"middle"===t?[this.middle.x,this.middle.y]:"end"===t?[this.end.x,this.end.y]:void 0}}}),f=Object(v.a)(h,2),m=f[0],x=f[1],O=Object(i.useState)([]),w=Object(v.a)(O,2),R=w[0],k=w[1],S=Object(i.useState)([]),C=Object(v.a)(S,2),M=C[0],z=C[1],P=Object(i.useState)([]),N=Object(v.a)(P,2),A=N[0],B=N[1],_=Object(i.useState)(!1),E=Object(v.a)(_,2),H=E[0],Y=E[1],L=function(t){var n,e,i,r,o,a,c=[t.r,t.g,t.b];0===(i=(n=Math.max.apply(Math,c))-(e=Math.min.apply(Math,c)))?r=0:n===c[0]?r=(c[1]-c[2])/i%6:n===c[1]?r=(c[2]-c[0])/i+2:n===c[2]&&(r=(c[0]-c[1])/i+4);var s={h:r=((r*=60)%360+360)%360,s:0===(o=n/255)?0:i/(255*o),v:o,a:1},u={h:r,s:1===(a=(n+e)/510)||0===a?0:i/(255*(1-Math.abs(2*a-1))),l:a,a:1};t.a=1;var d="#";for(var l in c){var v=Math.floor(c[l]).toString(16);d+="0".repeat(2-v.length)+v}return{rgb:t,hsv:s,hsl:u,hex:d}},X=L({r:255*Math.random(),g:255*Math.random(),b:255*Math.random()}),F=Object(i.useState)([{pointRef:null,containerRef:null,radius:0,colour:X,showPicker:!1,currentXY:{x:50,y:50},size:void 0,containerSize:void 0}]),T=Object(v.a)(F,2),D=T[0],W=T[1],V=function(t){var n=[[0,0,0],[0,0,0]];return n[0]=[t.hsv.h,t.hsv.s,t.hsv.v],n[1]=[t.rgb.r,t.rgb.g,t.rgb.b],n},U=function(t){var n=new Array(D.length);for(var e in D)if(D[e].size){var i=et(e);n[e]={x:i.x,y:i.y,colour:D[e].colour,colourArr:V(D[e].colour),radius:D[e].radius}}if(!t)return n;K(n)},G=Object(i.useState)(!1),J=Object(v.a)(G,2),q=J[0],K=J[1],Q=function(t){var n,e,i;m.down=!0,m.pos.start=$(t),m.target.obj=(n=document).elementFromPoint.apply(n,Object(l.a)(m.pos.getXY("start")));var r=Z(m.target.obj);r&&(m.target.index=r),m.target.obj.classList.contains("dragItem")||tt(!1,0,"0.3s"),m.target.obj.classList.contains("dragItem")&&(!m.clicked.status||m.clicked.status&&m.clicked.index!==m.target.index||!m.showRadius)?r&&(m.target.init={x:D[m.target.index].currentXY.x-m.pos.start.x,y:D[m.target.index].currentXY.y-m.pos.start.y},m.active=!0,D[m.target.index].tags={active:!0},D[m.target.index].containerRef.current.style.zIndex=2):m.clicked.status&&m.clicked.index===m.target.index&&(null===(e=D[m.clicked.index])||void 0===e||null===(i=e.tags)||void 0===i?void 0:i.showRadius)&&(m.resizing.mode=!0,m.showRadius=!0,m.target.initialRadius=D[m.clicked.index].radius),W(Object(l.a)(D)),g(!0),x(m)},Z=function(t){for(var n in D)if(D[n].pointRef.current===t)return n},$=function(t){return"touch"===t.type.substr(0,5)?{x:t.touches[0].clientX,y:t.touches[0].clientY}:{x:t.clientX,y:t.clientY}};function tt(t,n,e){return nt.apply(this,arguments)}function nt(){return(nt=Object(d.a)(s.a.mark((function t(n,e,i){return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n||void 0!==e||(e=700),void 0===i&&(i=n?"0.15s":"1s"),setTimeout((function(){var t=document.getElementsByClassName("hideButton");for(var e in t)t[e].classList&&(n?(t[e].classList.add("hidden"),t[e].style.transition="all 0.5s cubic-bezier(0.39, 0.58, 0.57, 1), opacity ".concat(i," ease-in-out")):(t[e].classList.remove("hidden"),t[e].style.transition="all 0.5s cubic-bezier(0.39, 0.58, 0.57, 1), opacity ".concat(i," ease-in-out")))}),e);case 3:case"end":return t.stop()}}),t)})))).apply(this,arguments)}var et=function(t){return{x:D[t].currentXY.x+D[t].containerSize[0]/2,y:D[t].currentXY.y+D[t].containerSize[1]/2}},it=function(t){var n=[[-(D[t].containerSize[0]-D[t].size[0])/2,-(D[t].containerSize[1]-D[t].size[1])/2],[0,0]];return n[1]=[n[0][0]+D[t].containerRef.current.parentNode.clientWidth-D[t].size[0],n[0][1]+D[t].containerRef.current.parentNode.clientHeight-D[t].size[1]],n},rt=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:void 0;for(var n in!t&&(m.clicked.status=!1),D)t!==n&&(D[n].tags&&delete D[n].tags,D[n].containerRef.current.style.zIndex=1);W(D)},ot=function(t,n){return Math.sqrt(Math.pow(t.x-n.x,2)+Math.pow(t.y-n.y,2))},at=function(t,n){return ot(n,t)<=5},ct=function(t){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(n){var e=ut(t);k(e)}else if(st(t,R)){z([].concat(Object(l.a)(M),[R])),B([]);var i=ut(t);k(i)}},st=function(t,n){JSON.stringify(dt(t)),JSON.stringify(dt(n));return JSON.stringify(dt(t))!=JSON.stringify(dt(n))},ut=function(t){return JSON.parse(JSON.stringify(dt(t)))},dt=function(t){var n=[];for(var e in t){var i=Object(u.a)({},t[e]);try{i.pointRef=void 0,i.containerRef=void 0,delete i.tags}catch(y){console.error("Error in removing DOM elements.",y)}n.push(i)}return n},lt=function(t){"undo"===t&&M.length?(B([].concat(Object(l.a)(A),[R])),W(M[M.length-1]),z(M.slice(0,M.length-1)),Y(!0),r(!0),g(!0)):"redo"===t&&A.length&&(z([].concat(Object(l.a)(M),[R])),W(A[A.length-1]),B(A.slice(0,A.length-1)),Y(!0),r(!0),g(!0)),m.down=!1};return Object(i.useEffect)((function(){if(c)try{U(!0),g(!1)}catch(t){console.error("Error is rendering page.",t)}e&&(ct(D,H),H&&Y(!1),r(!1))}),[c]),Object(i.useEffect)((function(){U(!0),g(!1),ct(D,!0),r(!1),tt(!1,500)}),[]),Object(p.jsx)("div",{className:"App",onPointerDown:function(t){return Q(t)},onPointerMove:function(t){return function(t){if(m.pos.middle=$(t),m.active&&!at(m.pos.start,m.pos.middle)){rt();var n=m.target.index;if(n){t.preventDefault(),tt(!0,0);try{D[n].containerRef.current.style.zIndex=2}catch(o){}var e={x:0,y:0};e.x=m.pos.middle.x+m.target.init.x,e.y=m.pos.middle.y+m.target.init.y;var i=it(n);D[n].currentXY.x=Math.max(Math.min(e.x,i[1][0]),i[0][0]),D[n].currentXY.y=Math.max(Math.min(e.y,i[1][1]),i[0][1])}}else if(m.resizing.mode){if(m.clicked.index){var r=ot(et(m.clicked.index),{x:m.pos.middle.x-20,y:m.pos.middle.y-20});m.resizing.start?D[m.clicked.index].radius=Math.max(Math.abs(r)-25,0):r-25>=m.target.initialRadius&&(D[m.clicked.index].tags?D[m.clicked.index].tags.resizing=!0:D[m.clicked.index].tags={resizing:!0},m.resizing.start=!0)}}else m.down&&Q(t);W(Object(l.a)(D)),m.down&&g(!0),x(m)}(t)},onPointerUp:function(t){return function(t){"touch"===t.type.substr(0,5)?m.pos.end={x:t.touches[0].clientX,y:t.touches[0].clientY}:m.pos.end={x:t.clientX,y:t.clientY};var n=m.target.index;if(n){var e=document.elementFromPoint(t.clientX,t.clientY);if(at(m.pos.start,m.pos.end)&&(e.classList.contains("dragItem")||e.classList.contains("dragIWeight"))){try{D[n].containerRef.current.style.zIndex=D[n].clicked?1:2}catch(i){}if(!m.clicked.status||m.clicked.target&&m.clicked.target!==e){m.clicked.status=!0,m.clicked.target=e,m.clicked.index=Z(e),rt(m.clicked.index),m.showRadius=!0;try{D[m.clicked.index].tags={clicked:!0,showRadius:!0}}catch(o){}}else m.clicked.target&&m.clicked.target===e&&(m.clicked.status=!1,rt(),m.clicked.target=void 0,m.clicked.index=void 0)}else if(m.resizing.start)delete D[n].tags.resizing;else if(m.active){tt(!1),rt(),m.active=!1;try{D[n].containerRef.current.style.zIndex=1}catch(a){}}m.down=!1,m.active=!1,m.resizing.mode=!1,m.resizing.start=!1,W(Object(l.a)(D)),x(m)}else m.down=!1,W(Object(l.a)(D));r(!0),g(!0)}(t)},children:Object(p.jsxs)("div",{id:"outerContainer",children:[Object(p.jsx)("div",{id:"dragPalette",children:Object(p.jsx)(I,{id:"gradientPalette",canvasPoints:q})}),Object(p.jsx)(j,{points:D,onRender:function(){var t=!1;for(var n in D)D[n].size||(t=!0,D[n].size=[D[n].pointRef.current.offsetWidth,D[n].pointRef.current.offsetHeight],D[n].containerSize=[D[n].pointRef.current.parentNode.parentNode.offsetWidth,D[n].pointRef.current.parentNode.parentNode.offsetHeight]);t&&W(D)},onChangeColor:function(t,n){var e=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=Object(l.a)(D);i[t].colour=n,W(Object(l.a)(i)),g(!0),e&&r(!0)},onPickerButton:function(t){D[t].tags?D[t].tags.showPicker?(delete D[t].tags.showPicker,D[t].tags.showRadius=!0,m.showRadius=!0):(D[t].tags.showPicker=!0,delete D[t].tags.showRadius,m.showRadius=!1):D[t].tags={showPicker:!0},W(Object(l.a)(D))}}),Object(p.jsxs)("div",{id:"point-manager",children:[Object(p.jsx)("button",{className:"button plus hideButton hidden",onClick:function(){var t,n={x:50,y:50};if(D.length>0){var e=[[0,0],[0,0]];e[1]=[e[0][0]+D[0].containerRef.current.parentNode.clientWidth-D[0].size[0],e[0][1]+D[0].containerRef.current.parentNode.clientHeight-D[0].size[1]],n={x:Math.floor(Math.random()*e[1][0]+e[0][0]),y:Math.floor(Math.random()*e[1][1]+e[0][1])}}t={r:255*Math.random(),g:255*Math.random(),b:255*Math.random()};var i={ref:null,containerRef:null,radius:0,colour:t=L(t),showPicker:!1,pointerOffset:{x:0,y:0},currentXY:n,size:void 0,containerSize:void 0};W([].concat(Object(l.a)(D),[i])),r(!0),g(!0)},children:Object(p.jsx)(b.b,{})}),Object(p.jsx)("button",{className:"button minus hideButton hidden",onClick:function(){return function(t){-1===t&&(t=D.length-1),console.log("Removing point with key "+t);var n=D;n.splice(t,1),W(Object(l.a)(n)),r(!0),g(!0),console.log("New points are ",D)}(-1)},children:Object(p.jsx)(b.a,{})})]}),Object(p.jsx)("div",{id:"undo",className:"undo-redo undoButton",children:Object(p.jsx)("button",{className:"button hideButton hidden",onClick:function(){lt("undo")},children:Object(p.jsx)(b.e,{className:"undoButton"})})}),Object(p.jsx)("div",{id:"redo",className:"undo-redo",children:Object(p.jsx)("button",{className:"button hideButton hidden",onClick:function(){lt("redo")},children:Object(p.jsx)(b.c,{})})})]})})},A=function(t){t&&t instanceof Function&&e.e(3).then(e.bind(null,205)).then((function(n){var e=n.getCLS,i=n.getFID,r=n.getFCP,o=n.getLCP,a=n.getTTFB;e(t),i(t),r(t),o(t),a(t)}))};a.a.render(Object(p.jsx)(r.a.StrictMode,{children:Object(p.jsx)(N,{})}),document.getElementById("root")),A()},88:function(t,n,e){},89:function(t,n,e){},90:function(t,n,e){},91:function(t,n,e){}},[[203,1,2]]]);
//# sourceMappingURL=main.2c97d6db.chunk.js.map