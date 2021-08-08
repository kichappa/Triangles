import {useState, useRef, useEffect} from "react"
import Points from "./components/Points"

function App() {
    var mouseDown = false;
    const [dragIs, setDragIs] = useState([
        {   // While not being dragged, [pointerOffset, currentXY, offset] stores the same value, the X and Y coordinate from the original position (0,0), (used in transform: translate3D(X, Y, 0))
            // While being dragged, 
            //      pointerOffset[X, Y] stores the pointerOffset X and Y offset of the pointer to the anchor of dragItem
            //      currentXY[X, Y] stores the total X and Y offsets from the pointerOffset position (0,0).
            // After a drag event, all [pointerOffset, currentXY, offset] stores the same value, the X and Y coordinate from the original position (0,0); again. 
            ref: null,
            active: false,
            colour: "#f5e663",
            pointerOffset: [0,0],
            currentXY: [50, 50],
            size: [0,0]
        }
    ])
    const AddDragItem = ()=>{
        const newDragItem={
            ref: null,
            active: false,
            colour: "#f5e663",
            pointerOffset: [0,0],
            currentXY: [50, 50],
            size: [0,0]
        }
        setDragIs([...dragIs, newDragItem])
    }
    const removeDragItem = ({index})=>{
        if (index === -1){
            index = dragIs.length-1
        }
        console.log("Removing point with key "+index)
        let newDragIs = dragIs
        newDragIs.splice(index, 1)
        setDragIs([...newDragIs])
        console.log("New points are ", dragIs)
    }
    const dragStart = (e)=>{
        // mouseDown is to capture off location drags that go over inactive point
        mouseDown = true;
        // capturing target since touch and mouse output different e.target
        var target
        if (e.type.substr(0,5) === "touch"){
                target = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY)
        }else{
                target = e.target
        }
        if(target.className === "dragItem"){
            // console.log("Target is",target)
            var index, dragItem
            for(let i in dragIs){
                if(dragIs[i].ref.current === target){
                    console.log("now "+ i+1)
                    index = i
                    dragItem = dragIs[i]
                }
            }
            // console.log(dragItem)     
            console.log("dragStart "+index, dragItem)
            // setting pointerOffset values at the start of a drag 
            if (e.type.substr(0,5) === "touch") {
                dragItem.pointerOffset[0] = e.touches[0].clientX - dragItem.currentXY[0]
                dragItem.pointerOffset[1] = e.touches[0].clientY - dragItem.currentXY[1]
            } else {
                dragItem.pointerOffset[0] = e.clientX - dragItem.currentXY[0]
                dragItem.pointerOffset[1] = e.clientY - dragItem.currentXY[1]
            }
            // console.log("dragStart ", dragItem.object.getBoundingClientRect().left, dragItem.object.getBoundingClientRect().top)
            // console.log("dragStart initX, initY = [" + [dragItem.pointerOffset[0], dragItem.pointerOffset[1]] + "]")
            dragItem.active = true
            dragItem.ref.current.classList.add("active")
            dragItem.ref.current.parentNode.style.zIndex = 1
            // console.log("Now dragItem is", dragItem)
            dragIs[index] = dragItem
            setDragIs(dragIs)
        }
    }
    const drag = (e)=>{
        if(isAnyAcive()){
            var dragItem
            for(let i in dragIs){
                dragItem = dragIs[i]
                if(dragItem.active){
                    console.log("Pushing...")
                    e.preventDefault();

                    // Calculating current XY 
                    if (e.type.substr(0,5) === "touch") {
                        dragItem.currentXY[0] = e.touches[0].clientX - dragItem.pointerOffset[0]
                        dragItem.currentXY[1] = e.touches[0].clientY - dragItem.pointerOffset[1]
                    } else {
                        dragItem.currentXY[0] = e.clientX - dragItem.pointerOffset[0]
                        dragItem.currentXY[1] = e.clientY - dragItem.pointerOffset[1]
                    }
                    let boundXY = [[dragItem.ref.current.parentNode.parentNode.getBoundingClientRect().left, 
                                    dragItem.ref.current.parentNode.parentNode.getBoundingClientRect().top
                                    ],
                                    [0,0]]
                    boundXY[1] = [boundXY[0][0]+dragItem.ref.current.parentNode.parentNode.clientWidth-dragItem.size[0], 
                                    boundXY[0][1]+dragItem.ref.current.parentNode.parentNode.clientHeight-dragItem.size[1]]
                    // console.log("boundXY is", boundXY);
                    dragItem.currentXY[0] = Math.max(Math.min(dragItem.currentXY[0], boundXY[1][0]), boundXY[0][0])
                    dragItem.currentXY[1] = Math.max(Math.min(dragItem.currentXY[1], boundXY[1][1]), boundXY[0][1])
                    dragItem.ref.current.parentNode.style.left = dragItem.currentXY[0]
                    dragItem.ref.current.parentNode.style.top = dragItem.currentXY[1]
                    // console.log("dragItem is", dragItem)
                    
                    dragIs[i] = dragItem
                    setDragIs(dragIs)
                }
            }

        }else if(mouseDown){
            dragStart(e)
        }
    }
    const dragEnd = (e)=>{
        mouseDown=false
        var dragItem
        for(let i in dragIs){
            dragItem = dragIs[i]
            if(dragItem.active){
                dragItem.pointerOffset[0] = dragItem.currentXY[0];
                dragItem.pointerOffset[1] = dragItem.currentXY[1];
                dragItem.ref.current.classList.remove("active")
                dragItem.active = false;
                dragItem.ref.current.parentNode.style.zIndex = 0;
                
                dragIs[i] = dragItem
                console.log("dragEnd "+i, dragItem)
                setDragIs(dragIs)
            }
        }
    }
    const isAnyAcive=()=>{
        let active = false;
        for (let i in dragIs){
            active = active || dragIs[i].active; 
        }
        return active;
    }
    return (
        <div className="App" 
            onTouchStart={(e)=>dragStart(e)} 
            onMouseDown={(e)=>dragStart(e)}
            onTouchMove={(e)=>drag(e)} 
            onMouseMove={(e)=>drag(e)}
            onTouchEnd={(e)=>dragEnd(e)} 
            onMouseUp={(e)=>dragEnd(e)}
        >
            <div id="outerContainer">
                <div id="dragPalette">
                    <Points points={dragIs}/>
                </div>
                <div id="point-manager">
                        <button className="button plus" onClick={AddDragItem}></button>
                        <button className="button minus" onClick={()=> removeDragItem({index: -1})}></button>
                </div>
                </div>
        </div>
    );
}

export default App;
