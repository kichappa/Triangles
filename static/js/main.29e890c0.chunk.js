(this["webpackJsonpreact-js"]=this["webpackJsonpreact-js"]||[]).push([[0],[,,,,,,,,,,function(t,e,i){},function(t,e,i){},function(t,e,i){},function(t,e,i){},,function(t,e,i){"use strict";i.r(e);var n=i(1),s=i.n(n),o=i(5),r=i.n(o),c=(i(10),i(11),i(12),i(13),i(0));var u=function(){return Object(c.jsx)("div",{className:"App",children:Object(c.jsxs)("div",{id:"outerContainer",children:[Object(c.jsx)("div",{id:"dragPalette",children:Object(c.jsx)("div",{className:"dragItem",id:"point_0"})}),Object(c.jsxs)("div",{id:"point-manager",children:[Object(c.jsx)("button",{className:"button plus"}),Object(c.jsx)("button",{className:"button minus"})]})]})})},a=i(3),h=i(4);var l=function(t){t&&t instanceof Function&&i.e(3).then(i.bind(null,16)).then((function(e){var i=e.getCLS,n=e.getFID,s=e.getFCP,o=e.getLCP,r=e.getTTFB;i(t),n(t),s(t),o(t),r(t)}))};r.a.render(Object(c.jsx)(s.a.StrictMode,{children:Object(c.jsx)(u,{})}),document.getElementById("root")),l(),function(){var t=function(){function t(){Object(a.a)(this,t),this.items=[]}return Object(h.a)(t,[{key:"newItem",value:function(t){var i=new e(t);this.items.push(i)}},{key:"newItems",value:function(t){for(var e in t)"dragItem"===t[e].className&&i.newItem(t[e])}},{key:"dragStart",value:function(t,e){console.log("dragStart "+t),this.items[t].dragStart(e)}},{key:"dragEnd",value:function(t,e){if(-1===t)for(var i in this.items)this.items[i].dragEnd(e);else this.items[t].dragEnd(e),console.log("dragEnd "+t);console.log("dragEnd")}},{key:"drag",value:function(t,e){if(-1===t)for(var i in this.items)this.items[i].drag(e);else console.log("drag "+t),this.items[t].drag(e)}},{key:"remove",value:function(t,e){if(-1===t)for(var n in this.items)this.items[0].object.parentNode.removeChild(this.items[0].object),this.items.shift();else console.log("remove "+t),this.items[t].object.parentNode.removeChild(this.items[t].object),i.items.splice(t,1),i.refresh()}},{key:"deleteAll",value:function(){for(var t in this.items)this.items.shift()}},{key:"refresh",value:function(){for(var t in this.items)this.items[t].refreshObject();for(var e in this.items)this.items[e].object.id="point_"+e,this.items[e].refresID()}},{key:"length",value:function(){return this.items.length}},{key:"isAnyAcive",value:function(){var t=!1;for(var e in this.items)t=t||this.items[e].isActive();return t}}]),t}(),e=function(){function t(e){Object(a.a)(this,t),this.object=e,this.id=e.id,this.active=!1,this.color="#000000",this.pointerOffset=[0,0],this.move([50,50]),this.currentXY=[this.object.getBoundingClientRect().left,this.object.getBoundingClientRect().top],this.size=[this.object.offsetWidth,this.object.offsetHeight]}return Object(h.a)(t,[{key:"dragStart",value:function(t){"touch"===t.type.substr(0,5)?(this.pointerOffset[0]=t.touches[0].clientX-this.currentXY[0],this.pointerOffset[1]=t.touches[0].clientY-this.currentXY[1]):(this.pointerOffset[0]=t.clientX-this.currentXY[0],this.pointerOffset[1]=t.clientY-this.currentXY[1]),this.active=!0,this.object.classList.add("active")}},{key:"dragEnd",value:function(t){this.pointerOffset[0]=this.currentXY[0],this.pointerOffset[1]=this.currentXY[1],this.object.classList.remove("active"),this.active=!1}},{key:"drag",value:function(t){if(this.active){t.preventDefault(),"touch"===t.type.substr(0,5)?(this.currentXY[0]=t.touches[0].clientX-this.pointerOffset[0],this.currentXY[1]=t.touches[0].clientY-this.pointerOffset[1]):(this.currentXY[0]=t.clientX-this.pointerOffset[0],this.currentXY[1]=t.clientY-this.pointerOffset[1]);var e=[[this.object.parentNode.getBoundingClientRect().left,this.object.parentNode.getBoundingClientRect().top],[0,0]];e[1]=[e[0][0]+this.object.parentNode.clientWidth-this.size[0],e[0][1]+this.object.parentNode.clientHeight-this.size[1]],this.currentXY[0]=Math.max(Math.min(this.currentXY[0],e[1][0]),e[0][0]),this.currentXY[1]=Math.max(Math.min(this.currentXY[1],e[1][1]),e[0][1]),this.move(this.currentXY)}}},{key:"refresID",value:function(){this.id=this.object.id}},{key:"refreshObject",value:function(){this.object=document.getElementById(this.id)}},{key:"move",value:function(t){this.object.style.left=t[0]+"px",this.object.style.top=t[1]+"px"}},{key:"isActive",value:function(){return this.active}}]),t}(),i=new t,n=document.querySelectorAll("#dragPalette > .dragItem");console.log(n),i.newItems(n),console.log(i.items);var s=!1,o=document.getElementsByTagName("body")[0];function r(t){if(s=!0,2===t.button)for(var e in console.log("Right click on ",t.target),i.items)t.target===i.items[e].object&&i.remove(e,t);else for(var n in i.items){("touch"===t.type.substr(0,5)?document.elementFromPoint(t.touches[0].clientX,t.touches[0].clientY):t.target)===i.items[n].object&&i.dragStart(n,t)}}function c(t){s=!1,i.dragEnd(-1,t)}function u(t){i.isAnyAcive()?i.drag(-1,t):s&&r(t)}o.addEventListener("touchstart",r,!1),o.addEventListener("touchend",c,!1),o.addEventListener("touchmove",u,!1),o.addEventListener("mousedown",r,!1),o.addEventListener("mouseup",c,!1),o.addEventListener("mousemove",u,!1),document.oncontextmenu=function(t){return!1},document.querySelectorAll(".button.plus")[0].onclick=function(){console.log("Plus clicked by tC"),document.getElementById("dragPalette").innerHTML+='<div class="dragItem" id="point_'+i.length()+'">\n</div>',n=document.querySelectorAll("#dragPalette > .dragItem"),i.newItem(n[n.length-1]),i.refresh()},document.querySelectorAll(".button.minus")[0].onclick=function(){console.log("Minus clicked by tT"),n=document.querySelectorAll("#dragPalette > .dragItem"),i.items.length?(i.remove([i.items.length-1]),i.refresh()):console.log("tT yit yees empty")}}()}],[[15,1,2]]]);
//# sourceMappingURL=main.29e890c0.chunk.js.map