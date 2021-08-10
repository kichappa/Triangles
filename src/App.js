import {useState, useEffect} from "react"
import Points from "./components/Points"
import Canvas from "./components/Canvas";
// import {render} from "./js/render"

function App() {
    const [mouseBound, setMouseBound]=useState([
        {   mouseDown: false,
            start:{
                x:0, 
                y:0
            },
            end:{
                x:0, 
                y:0
            }
        }
    ]);
    var defaultColour = {
        "hsl":{"h":53.835616438356155,"s":0.8795180722891567,"l":0.6745098039215687,"a":1},"hex":"#f5e663","rgb":{"r":245,"g":230,"b":99,"a":1},"hsv":{"h":53.835616438356155,"s":0.5959183673469387,"v":0.9607843137254902,"a":1},"oldHue":53.33333333333332,"source":"hex"
    }
    const [dragIs, setDragIs] = useState([
        {   // While not being dragged, [pointerOffset, currentXY, offset] stores the same value, the X and Y coordinate from the original position (0,0), (used in transform: translate3D(X, Y, 0))
            // While being dragged, 
            //      pointerOffset[X, Y] stores the pointerOffset X and Y offset of the pointer to the anchor of dragItem
            //      currentXY[X, Y] stores the total X and Y offsets from the pointerOffset position (0,0).
            // After a drag event, all [pointerOffset, currentXY, offset] stores the same value, the X and Y coordinate from the original position (0,0); again. 
            ref: null,
            active: false,
            colour: defaultColour,
            showPicker: false,
            pointerOffset: {x:0, y:0},
            currentXY: {x:50, y:50},
            size: false
        }
    ])  
    const getCanvasPoints=(set)=>{
        let points = new Array(dragIs.length)
        // console.log("setting Canvas points")
        for(let i in dragIs){
            if(dragIs[i].size){
                // console.log(dragIs[i].currentXY, dragIs[i].size)
                // console.log(dragIs[i].colour)
                points[i] = {
                    x: dragIs[i].currentXY.x+dragIs[i].size[0]/2,
                    y: dragIs[i].currentXY.y+dragIs[i].size[1]/2,
                    colour: dragIs[i].colour
                    // colour: dragIs[i].colour.hsv
                }
            }
        }
        // console.log("newCanvasPoints are ", points)
        if (set) setCanvasPoints(points)
        return points
    }
    const [canvasPoints, setCanvasPoints] = useState(false)

    const addDragItem = ()=>{
        const newDragItem={
            ref: null,
            active: false,
            colour: defaultColour,
            showPicker: false,
            pointerOffset: {x:0, y:0},
            currentXY: {x:50, y:50},
            size: false
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
        mouseBound.mouseDown = true;
        setMouseBound(mouseBound)
        // capturing target since touch and mouse output different e.target
        var target = document.elementFromPoint(e.clientX, e.clientY)
        // if (e.pointerType === "touch"){
        //         target = document.elementFromPoint(e.clientX, e.clientY)
        // }else{
        //         target = e.target
        // }
        // if(!target.id==="dragPalette"){
        //     console.log(target)
        // }
        if(target.classList.contains("dragItem")){
            // console.log("Target is",target)
            var index
            for(let i in dragIs){
                if(dragIs[i].ref.current === target){
                    // console.log("now "+ i)
                    index = i
                }
            }

            // console.log(dragIs[index])     
            console.log("dragStart "+index, dragIs[index])
            // setting pointerOffset values at the start of a drag 
            let clientXY = {x:0, y:0}
            if (e.type.substr(0,5) === "touch") {
                clientXY = {x: e.touches[0].clientX, y: e.touches[0].clientY}
            } else {
                clientXY = {x: e.clientX, y: e.clientY}
            }
            mouseBound.start = clientXY
            mouseBound.end = clientXY
            setMouseBound(mouseBound)
            // console.log("Setting mouseBound", mouseBound)
            dragIs[index].pointerOffset.x = clientXY.x - dragIs[index].currentXY.x
            dragIs[index].pointerOffset.y = clientXY.y - dragIs[index].currentXY.y
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
            let clientXY = {x:0, y:0}
            if (e.type.substr(0,5) === "touch") {
                clientXY = {x: e.touches[0].clientX, y: e.touches[0].clientY}
            } else {
                clientXY = {x: e.clientX, y: e.clientY}
            }
            mouseBound.end = clientXY
            setMouseBound(mouseBound)
            if(!isClick(mouseBound.start, mouseBound.end)){
                onPicker(dragIs[index], false)
                closePickers(index)
            
                dragIs[index].currentXY.x = clientXY.x - dragIs[index].pointerOffset.x
                dragIs[index].currentXY.y = clientXY.y - dragIs[index].pointerOffset.y
                
                // let boundXY = [[dragIs[index].ref.current.parentNode.parentNode.getBoundingClientRect().left, 
                //                 dragIs[index].ref.current.parentNode.parentNode.getBoundingClientRect().top
                //                 ],
                //                 [0,0]
                //             ]
                let boundXY = [[0,0],[0,0]]
                boundXY[1] = [boundXY[0][0]+dragIs[index].ref.current.parentNode.parentNode.clientWidth-dragIs[index].size[0], 
                                boundXY[0][1]+dragIs[index].ref.current.parentNode.parentNode.clientHeight-dragIs[index].size[1]]
                // console.log("boundXY is", boundXY);
                dragIs[index].currentXY.x = Math.max(Math.min(dragIs[index].currentXY.x, boundXY[1][0]), boundXY[0][0])
                dragIs[index].currentXY.y = Math.max(Math.min(dragIs[index].currentXY.y, boundXY[1][1]), boundXY[0][1])
                dragIs[index].ref.current.parentNode.style.left = dragIs[index].currentXY.x
                dragIs[index].ref.current.parentNode.style.top = dragIs[index].currentXY.y
                // console.log("dragIs[index] is", dragIs[index])
                
                setDragIs([...dragIs])
            }

        }else if(mouseBound.mouseDown){
            // console.log("None active")
            // console.log(e)
            dragStart(e)
        }else{
            // var target = document.elementFromPoint(e.clientX, e.clientY)
            // // console.log(target)
            // try{
            //     if(target.tagName==="CANVAS")
            //         console.log(target.getContext('2d').getImageData(e.clientX, e.clientY, 1, 1).data)
            // }
            // catch{}
        }
    }
    const dragEnd = (e)=>{
        mouseBound.mouseDown = false;
        setMouseBound(mouseBound)
        var index
        for(let i in dragIs) 
            if(dragIs[i].active)
                index = i
        if(index){
            dragIs[index].pointerOffset.x = dragIs[index].currentXY.x;
            dragIs[index].pointerOffset.y = dragIs[index].currentXY.y;
            dragIs[index].ref.current.classList.remove("active")
            dragIs[index].active = false;
            
            // console.log("mouseStart", mouseBound.start)
            // console.log("mouseEnd", mouseBound.end)
            // console.log(e, dragIs[index].showPicker)
            if(isClick(mouseBound.start, mouseBound.end) && !dragIs[index].showPicker){
                closePickers(index)
                dragIs[index].ref.current.classList.add("active")
                dragIs[index].ref.current.parentNode.style.zIndex = 2;
                onPicker(dragIs[index], true)
            }
            else{
                onPicker(dragIs[index], false)
                dragIs[index].ref.current.parentNode.style.zIndex = 1;
            }

            console.log("dragEnd "+index, dragIs[index])
            setDragIs([...dragIs])
        }
    }
    const closePickers=(index)=>{
        for(let i in dragIs){
            dragIs[i].showPicker=false
            dragIs[i].ref.current.classList.remove("active")
            dragIs[i].ref.current.parentNode.style.zIndex = 1;
        }
        dragIs[index].ref.current.classList.add("active")
        dragIs[index].ref.current.parentNode.style.zIndex = 2;
        setDragIs(dragIs)
    }
    const isAnyAcive=()=>{
        let active = false;
        for (let i in dragIs){
            active = active || dragIs[i].active; 
        }
        return active;
    }
    const isPickerActive=()=>{
        let showPicker = false;
        for (let i in dragIs){
            showPicker = showPicker || dragIs[i].showPicker; 
        }
        return showPicker;
    }
    const onPicker=(point, state)=>{
        // if(state)
        //     point.showPicker = !point.showPicker
        // else
            point.showPicker = state
    }
    const isClick=(startXY, endXY)=>{
        let tol=5
        let value = Math.sqrt(Math.pow(endXY.x-startXY.x,2) + Math.pow(endXY.y-startXY.y,2))
        return (value<=tol)
    }
    const initSizes=()=>{
        let update = false
        for (let i in dragIs){
            // console.log(!dragIs[i].size)
            if(!dragIs[i].size){
                // console.log("setting size for "+i )
                update = true
                dragIs[i].size = [dragIs[i].ref.current.offsetWidth, dragIs[i].ref.current.offsetHeight]
            }
        } 
        if(update) setDragIs(dragIs)
    } 
    const onChangeColor=(index, color)=>{
        // console.log("changing color of "+ index, color)
        let newDragIs = [...dragIs]
        newDragIs[index].colour = color
        setDragIs([...newDragIs])
    }
    useEffect(() => {
        // console.log("dragIs were updated, updating points")
        getCanvasPoints(true)
    }, [dragIs])


    return (
        <div className="App" 
            // onTouchStart={(e)=>dragStart(e)} 
            // onMouseDown={(e)=>dragStart(e)}
            // onTouchMove={(e)=>drag(e)} 
            // onMouseMove={(e)=>drag(e)}
            // onTouchEnd={(e)=>dragEnd(e)} 
            // onMouseUp={(e)=>dragEnd(e)}

            onPointerDown={(e)=>dragStart(e)} 
            onPointerMove={(e)=>drag(e)} 
            onPointerUp={(e)=>dragEnd(e)} 
        >
            <div id="outerContainer">
                <div id="dragPalette">
                    <Canvas id={"gradientPalette"} canvasPoints={canvasPoints}/>
                    <Points points={dragIs} onRender={initSizes} onChangeColor={onChangeColor}/>
                </div>
                <div id="point-manager">
                        <button className="button plus" onClick={addDragItem}></button>
                        <button className="button minus" onClick={()=> removeDragItem({index: -1})}></button>
                </div>
                </div>
        </div>
    );
}

export default App;
