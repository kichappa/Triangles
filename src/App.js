import {useState} from "react"
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
            var index
            for(let i in dragIs){
                if(dragIs[i].ref.current === target){
                    console.log("now "+ i)
                    index = i
                }
            }
            // console.log(dragIs[index])     
            console.log("dragStart "+index, dragIs[index])
            // setting pointerOffset values at the start of a drag 
            if (e.type.substr(0,5) === "touch") {
                dragIs[index].pointerOffset[0] = e.touches[0].clientX - dragIs[index].currentXY[0]
                dragIs[index].pointerOffset[1] = e.touches[0].clientY - dragIs[index].currentXY[1]
            } else {
                dragIs[index].pointerOffset[0] = e.clientX - dragIs[index].currentXY[0]
                dragIs[index].pointerOffset[1] = e.clientY - dragIs[index].currentXY[1]
            }
            // console.log("dragStart ", dragIs[index].object.getBoundingClientRect().left, dragIs[index].object.getBoundingClientRect().top)
            // console.log("dragStart initX, initY = [" + [dragIs[index].pointerOffset[0], dragIs[index].pointerOffset[1]] + "]")
            dragIs[index].active = true
            dragIs[index].ref.current.classList.add("active")
            dragIs[index].ref.current.parentNode.style.zIndex = 1
            // console.log("Now dragIs[index] is", dragIs[index])
            setDragIs([...dragIs])
        }
    }
    const drag = (e)=>{
        if(isAnyAcive()){
            var index
            for(let i in dragIs){
                if(dragIs[i].active){
                    index = i
                }
            }
            // console.log("Pushing...")
            e.preventDefault();

            // Calculating current XY 
            if (e.type.substr(0,5) === "touch") {
                dragIs[index].currentXY[0] = e.touches[0].clientX - dragIs[index].pointerOffset[0]
                dragIs[index].currentXY[1] = e.touches[0].clientY - dragIs[index].pointerOffset[1]
            } else {
                dragIs[index].currentXY[0] = e.clientX - dragIs[index].pointerOffset[0]
                dragIs[index].currentXY[1] = e.clientY - dragIs[index].pointerOffset[1]
            }
            let boundXY = [[dragIs[index].ref.current.parentNode.parentNode.getBoundingClientRect().left, 
                            dragIs[index].ref.current.parentNode.parentNode.getBoundingClientRect().top
                            ],
                            [0,0]]
            boundXY[1] = [boundXY[0][0]+dragIs[index].ref.current.parentNode.parentNode.clientWidth-dragIs[index].size[0], 
                            boundXY[0][1]+dragIs[index].ref.current.parentNode.parentNode.clientHeight-dragIs[index].size[1]]
            // console.log("boundXY is", boundXY);
            dragIs[index].currentXY[0] = Math.max(Math.min(dragIs[index].currentXY[0], boundXY[1][0]), boundXY[0][0])
            dragIs[index].currentXY[1] = Math.max(Math.min(dragIs[index].currentXY[1], boundXY[1][1]), boundXY[0][1])
            dragIs[index].ref.current.parentNode.style.left = dragIs[index].currentXY[0]
            dragIs[index].ref.current.parentNode.style.top = dragIs[index].currentXY[1]
            // console.log("dragIs[index] is", dragIs[index])
            
            setDragIs([...dragIs])

        }else if(mouseDown){
            dragStart(e)
        }
    }
    const dragEnd = (e)=>{
        mouseDown=false
        var index
        for(let i in dragIs) 
            if(dragIs[i].active)
                index = i
        if(index){
            dragIs[index].pointerOffset[0] = dragIs[index].currentXY[0];
            dragIs[index].pointerOffset[1] = dragIs[index].currentXY[1];
            dragIs[index].ref.current.classList.remove("active")
            dragIs[index].active = false;
            dragIs[index].ref.current.parentNode.style.zIndex = 0;
            
            console.log("dragEnd "+index, dragIs[index])
            setDragIs([...dragIs])
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
