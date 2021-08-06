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
        this.items[index].dragEnd(e);
        console.log("dragEnd " + index);
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
}

class dragItem {
    constructor(object) {
        this.object = object;
        this.id = object.id;
        this.active = false;
        this.currentX = 0;
        this.currentY = 0;
        this.initialX = 0;
        this.initialY = 0;
        this.xOffset = 0;
        this.yOffset = 0;
    }

    dragStart(e) {
        if (e.type === "touchstart") {
            this.initialX = e.touches[0].clientX - this.xOffset;
            this.initialY = e.touches[0].clientY - this.yOffset;
        } else {
            this.initialX = e.clientX - this.xOffset;
            this.initialY = e.clientY - this.yOffset;
        }
        // console.log("dragStart initX, initY = [" + String([this.initialX, this.initialY]) + "]");
        this.active = true;
        this.object.classList.add("active")
    }

    dragEnd(e) {
        this.initialX = this.currentX;
        this.initialY = this.currentY;
        // console.log("dragEnd initX, initY = [" + String([this.initialX, this.initialY]) + "]");
        console.log("dragEnd [" + String([this.currentX, this.currentY]) + "]");
        this.object.classList.remove("active")
        this.active = false;
    }

    drag(e) {
        // console.log("Trying to drag")
        if (this.active) {
            // console.log("Focussing", this.object);
            // this.object.focus();
            console.log("Pushing    ")
            e.preventDefault();

            if (e.type === "touchmove") {
                this.currentX = e.touches[0].clientX - this.initialX;
                this.currentY = e.touches[0].clientY - this.initialY;
            } else {
                this.currentX = e.clientX - this.initialX;
                this.currentY = e.clientY - this.initialY;
            }

            this.xOffset = this.currentX;
            this.yOffset = this.currentY;

            setTranslate(this.currentX, this.currentY, this.object);
        }
    }

    refresID(){
        this.id = this.object.id;
    }

    refreshObject(){
        this.object = document.getElementById(this.id);
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

var dragPalette = document.querySelector("#dragPalette");

var clickedEl = null;

dragPalette.addEventListener("touchstart", dragStart, false);
dragPalette.addEventListener("touchend", dragEnd, false);
dragPalette.addEventListener("touchmove", drag, false);

dragPalette.addEventListener("mousedown", dragStart, false);
dragPalette.addEventListener("mouseup", dragEnd, false);
dragPalette.addEventListener("mousemove", drag, false);

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
    if (e.button == 2) {
        console.log("Right click on ", e.target);
        for (let i in dragIs.items) {
            // console.log(i, dragIs.items[i].object)
            if (e.target === dragIs.items[i].object) {
                dragIs.remove(i, e);
            }
        }
    } else {
        // console.log("dragStart on ", e.target);
        for (let i in dragIs.items) {
            // console.log(i, dragIs.items[i].object)
            if (e.target === dragIs.items[i].object) {
                // console.log("Yes, "+i, dragIs.items[i].object)
                dragIs.dragStart(i, e);
            }
        }
    }    
    // console.log(dragIs.items)
}

function dragEnd(e) {
    console.log(dragIs.items)
    for (let i in dragIs.items) {
        if (e.target === dragIs.items[i].object) {
            dragIs.dragEnd(i, e);
        }
    }
}

function drag(e) {
    dragIs.drag(-1, e);
}

function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}

colorjoe.rgb('picker', '#113c38', [
    'currentColor',
    ['fields', {space: 'RGB', limit: 255, fix: 0}],
    ['fields', {space: 'HSL', limit: 100}],
    'hex'
]);