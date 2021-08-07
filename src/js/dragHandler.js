
export default function dragHandle(){
    class dragItems {
        constructor() {
            this.items = [];
        }
        newItem(object) {
            let dI = new dragItem(object);
            this.items.push(dI);
        }
        newItems(dragables){
            for (let i in dragables) {
                if (dragables[i].className === "dragItem") {
                    dragIs.newItem(dragables[i]);
                }
            }
        }
        dragStart(index, e) {
            console.log("dragStart " + index);
            this.items[index].dragStart(e);
        }
        dragEnd(index, e) {
            if (index === -1) {
                for (let i in this.items) {
                    this.items[i].dragEnd(e);
                }
            } else{
                this.items[index].dragEnd(e);
                console.log("dragEnd " + index);
            }
            console.log("dragEnd");
        }
        drag(index, e) {
            if (index === -1) {
                for (let i in this.items) {
                    this.items[i].drag(e);
                }
            } else {
                console.log("drag " + index);
                this.items[index].drag(e);
            }
        }
        remove(index, e) {
            if (index === -1) {
                for (let i in this.items) {
                    this.items[0].object.parentNode.removeChild(this.items[0].object);
                    this.items.shift();
                }
            } else {
                console.log("remove " + index);
                this.items[index].object.parentNode.removeChild(this.items[index].object);
                dragIs.items.splice(index, 1);
                dragIs.refresh();
            }
        }
        deleteAll(){
            for (let i in this.items){
                this.items.shift();
            }
        }
        refresh(){
            // console.log("Before refresh", this.items)
            for (let i in this.items){
                this.items[i].refreshObject();
            }
            // console.log("After refreshObject", this.items)
            for (let i in this.items){
                this.items[i].object.id = "point_"+i;
                this.items[i].refresID();
            }
            // console.log("After refresh", this.items)
        }
        length(){
            return this.items.length;
        }
        isAnyAcive(){
            let active = false;
            for (let i in this.items){
                active = active || this.items[i].isActive(); 
            }
            return active;
        }
    }
    class dragItem {
        // While not being dragged, [pointerOffset, currentXY, offset] stores the same value, the X and Y coordinate from the original position (0,0), (used in transform: translate3D(X, Y, 0))
        // While being dragged, 
        //      pointerOffset[X, Y] stores the pointerOffset X and Y offset of the pointer to the anchor of dragItem
        //      currentXY[X, Y] stores the total X and Y offsets from the pointerOffset position (0,0).
        // After a drag event, all [pointerOffset, currentXY, offset] stores the same value, the X and Y coordinate from the original position (0,0); again. 
        constructor(object) {
            this.object = object;
            this.id = object.id;
            this.active = false;
            this.color = "#000000";
            this.pointerOffset = [0, 0];
            // this.currentXY = [0, 0];
            this.move([50,50]);
            // this.move([0,0]);
            this.currentXY = [this.object.getBoundingClientRect().left, this.object.getBoundingClientRect().top];
            // let boundXY = [[this.object.parentNode.getBoundingClientRect().left, this.object.parentNode.getBoundingClientRect().top],[0,0]];
            // boundXY[1] = [boundXY[0][0] + this.object.parentNode.clientWidth, boundXY[0][1] + this.object.parentNode.clientHeight];
            // console.log("bound", boundXY);
            // console.log("tiTu constructor ", this.object.getBoundingClientRect().left, this.object.getBoundingClientRect().top);
            // console.log("tiTu constructor div size ["+ this.object.parentNode.clientWidth+", "+ this.object.parentNode.clientWidth+"]")
            // console.log("tiTu constructor div location ["+ this.object.parentNode.getBoundingClientRect().left+", "+ this.object.parentNode.getBoundingClientRect().top+"]")
            this.size = [this.object.offsetWidth, this.object.offsetHeight]
            // console.log("tiTu constructor dot size ["+ this.object.offsetWidth+", "+ this.object.offsetHeight +"]")
        }
        dragStart(e) {
            if (e.type.substr(0,5) === "touch") {
                this.pointerOffset[0] = e.touches[0].clientX - this.currentXY[0];
                this.pointerOffset[1] = e.touches[0].clientY - this.currentXY[1];
            } else {
                this.pointerOffset[0] = e.clientX - this.currentXY[0];
                this.pointerOffset[1] = e.clientY - this.currentXY[1];
            }
            // console.log("tiTu dragStart ", this.object.getBoundingClientRect().left, this.object.getBoundingClientRect().top);
            // console.log("dragStart initX, initY = [" + String([this.pointerOffset[0], this.pointerOffset[1]]) + "]");
            this.active = true;
            this.object.classList.add("active")
        }
        dragEnd(e) {
            this.pointerOffset[0] = this.currentXY[0];
            this.pointerOffset[1] = this.currentXY[1];
            // console.log("dragEnd initX, initY = [" + String([this.pointerOffset[0], this.pointerOffset[1]]) + "]");
            // console.log("tiTu dragEnd ", this.object.getBoundingClientRect().left, this.object.getBoundingClientRect().top);
            // console.log("dragEnd [" + String([this.currentXY[0], this.currentXY[1]]) + "]");
            this.object.classList.remove("active")
            this.active = false;
        }
        drag(e) {
            // console.log("Trying to drag")
            if (this.active) {
                // console.log("Focussing", this.object);
                // this.object.focus();
                // console.log("Pushing    ")
                e.preventDefault();

                if (e.type.substr(0,5) === "touch") {
                    this.currentXY[0] = e.touches[0].clientX - this.pointerOffset[0];
                    this.currentXY[1] = e.touches[0].clientY - this.pointerOffset[1];
                } else {
                    this.currentXY[0] = e.clientX - this.pointerOffset[0];
                    this.currentXY[1] = e.clientY - this.pointerOffset[1];
                }
                let boundXY = [[this.object.parentNode.getBoundingClientRect().left, this.object.parentNode.getBoundingClientRect().top],[0,0]];
                boundXY[1] = [boundXY[0][0]+this.object.parentNode.clientWidth-this.size[0], boundXY[0][1]+this.object.parentNode.clientHeight-this.size[1]];
                // console.log(boundXY);
                this.currentXY[0] = Math.max(Math.min(this.currentXY[0], boundXY[1][0]), boundXY[0][0]);
                this.currentXY[1] = Math.max(Math.min(this.currentXY[1], boundXY[1][1]), boundXY[0][1]);

                // setTranslate(this.currentXY[0], this.currentXY[1], this.object);
                this.move(this.currentXY);
            }
        }
        refresID(){
            this.id = this.object.id;
        }
        refreshObject(){
            this.object = document.getElementById(this.id);
        }
        move(position){
            // let rect = this.object.getBoundingClientRect;
            // this.left = position[0];
            // this.top = position[1];
            // console.log("tiTu move "+position);
            this.object.style.left = position[0]+'px';
            this.object.style.top = position[1]+'px';
        }
        isActive(){
            return this.active;
        }
        // remove(e) {
        //     // this.object.style.visibility = "hidden";
        //     // this.object.parentNode.style.display = "block";
        //     // var contextMenuObj = document.getElementById("ctxMenu");
        //     // console.log(contextMenuObj);
        //     // contextMenuObj.close();
        //     // this.object.parentNode.removeChild(this.object);
        //     // dragIs.items.splice(index, 1);
        // }
    }
    var dragIs = new dragItems();
    var dragables = document.querySelectorAll("#dragPalette > .dragItem");
    console.log(dragables);
    dragIs.newItems(dragables);
    console.log(dragIs.items)
    var mousedown = false;
    // var dragPalette = document.querySelector("#outerContainer");
    var body = document.getElementsByTagName("body")[0];

    handleEvents();

    function handleEvents(){
        body.addEventListener("touchstart", dragStart, false);
        body.addEventListener("touchend", dragEnd, false);
        body.addEventListener("touchmove", drag, false);

        body.addEventListener("mousedown", dragStart, false);
        body.addEventListener("mouseup", dragEnd, false);
        body.addEventListener("mousemove", drag, false);
    }
    document.oncontextmenu = function (e) {
        // console.log("Context menu on ", e.target);
        // if (e.target === document.getElementById("dragPalette")) {
        //     console.log("Hi tandu");
        //     for (let i in dragables) {
        //         try {
        //             dragables[i].style.visibility = "visible";
        //             }
        //         catch (exception_var) {}
        //     }
        // }
        return false;
    }
    document.querySelectorAll(".button.plus")[0].onclick = function () {
        console.log("Plus clicked by tC")

        document.getElementById("dragPalette").innerHTML += "<div class=\"dragItem\" id=\"point_"+dragIs.length()+"\">\n</div>";

        dragables = document.querySelectorAll("#dragPalette > .dragItem");
        dragIs.newItem(dragables[dragables.length - 1]);

        dragIs.refresh();
    }
    document.querySelectorAll(".button.minus")[0].onclick = function () {
        console.log("Minus clicked by tT")
        
        dragables = document.querySelectorAll("#dragPalette > .dragItem");
        if(dragIs.items.length){
            dragIs.remove([dragIs.items.length - 1]); dragIs.refresh();
        }else{
            console.log("tT yit yees empty")
        }
    }
    function dragStart(e) {
        mousedown = true;
        // var myLocation = e.originalEvent.changedTouches[0];
        // var realTarget = document.elementFromPoint(myLocation.clientX, myLocation.clientY);
        // console.log("A mousedown is "+mousedown+" and target is", realTarget);
        // console.log("event fello ["+ [e.touches[0].clientX, e.touches[0].clientY]+"]")
        // console.log("target fello ", document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY))
        // console.log(e.type.substr(0,5))
        if (e.button === 2) {
            // console.log("dragStarting A")
            console.log("Right click on ", e.target);
            for (let i in dragIs.items) {
                // console.log(i, dragIs.items[i].object)
                if (e.target === dragIs.items[i].object) {
                    dragIs.remove(i, e);
                }
            }
        } else {
            // console.log("dragStarting B")
            // console.log("dragStart on ", e.target);
            for (let i in dragIs.items) {
                // console.log(i, dragIs.items[i].object)
                var target;
                if (e.type.substr(0,5) === "touch"){
                    target = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY)
                }else{
                    target = e.target
                }
                if (target === dragIs.items[i].object) {
                    // console.log("Yes, "+i, dragIs.items[i].object)
                    dragIs.dragStart(i, e);
                }
            }
        }    
        // console.log(dragIs.items)
    }
    function dragEnd(e) {
        mousedown = false;
        // console.log("B mousedown is "+mousedown);
        // console.log(dragIs.items)
        // for (let i in dragIs.items) {
        //     if (e.target === dragIs.items[i].object) {
        //         dragIs.dragEnd(i, e);
        //     }
        // }
        dragIs.dragEnd(-1, e);
    }
    function drag(e) {
        if (dragIs.isAnyAcive()){
            // console.log("tiTu")
            dragIs.drag(-1, e);
        }else if(mousedown){
            dragStart(e);
        }
    }
    function setTranslate(xPos, yPos, el) {
        el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
    }
}

// colorjoe.rgb('picker', '#113c38', [
//     'currentColor',
//     ['fields', {space: 'RGB', limit: 255, fix: 0}],
//     ['fields', {space: 'HSL', limit: 100}],
//     'hex'
// ]);