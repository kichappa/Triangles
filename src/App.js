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
    const rgbToHslHsvHex=(rgb)=>{
        var rgbArr = [rgb.r, rgb.g, rgb.b]
        var M, m, C, hue, I, V, L, Sv, Sl
        M=Math.max(...rgbArr)
        m=Math.min(...rgbArr)
        C = M-m
        I = (rgbArr[0]+rgbArr[1]+rgbArr[2])/3
        // Hue
        if(C===0) hue=0
        else if (M===rgbArr[0]) hue=((rgbArr[1]-rgbArr[2])/C % 6)
        else if (M===rgbArr[1]) hue=((rgbArr[2]-rgbArr[0])/C +2)
        else if (M===rgbArr[2]) hue=((rgbArr[0]-rgbArr[1])/C +4)
        hue *= 60
        // Lightness and Value
        V = M/255
        L = (M+m)/(2*255)
        // Saturation
        if (V===0) Sv=0
        else Sv=C/(V*255)
        if (L===1 || L===0) Sl=0
        else Sl=C/(255*(1-Math.abs(2*L-1)))
        
        hue = (hue % 360 + 360)%360
        // L = (L % 1 + 1)%1
        // V = (V % 1 + 1)%1
        // Sv = (Sv % 1 + 1)%1
        // Sl = (Sl % 1 + 1)%1
        let hsv = {h: hue, s: Sv, v: V, a:1}
        let hsl = {h: hue, s: Sl, l: L, a:1}
        rgb.a = 1
        let hex="#"
        for(let i in rgbArr){
            let colorcode = Math.floor(rgbArr[i]).toString(16)
            hex+="0".repeat(2-colorcode.length)+colorcode
        }
        return {rgb: rgb, hsv:hsv, hsl:hsl, hex:hex}
    }
    var defaultColour = rgbToHslHsvHex({
        r: Math.random() * 255,
        g: Math.random() * 255,
        b: Math.random() * 255,
    })    
    const [dragIs, setDragIs] = useState([
        {   // While not being dragged, [pointerOffset, currentXY, offset] stores the same value, the X and Y coordinate from the original position (0,0), (used in transform: translate3D(X, Y, 0))
            // While being dragged, 
            //      pointerOffset[X, Y] stores the pointerOffset X and Y offset of the pointer to the anchor of dragItem
            //      currentXY[X, Y] stores the total X and Y offsets from the pointerOffset position (0,0).
            // After a drag event, all [pointerOffset, currentXY, offset] stores the same value, the X and Y coordinate from the original position (0,0); again. 
            pointRef: null,
            containerRef: null,
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
        for(let i in dragIs){
            if(dragIs[i].size){
                points[i] = {
                    x: dragIs[i].currentXY.x+dragIs[i].size[0]/2,
                    y: dragIs[i].currentXY.y+dragIs[i].size[1]/2,
                    colour: dragIs[i].colour
                }
            }
        }
        if (set) setCanvasPoints(points)
        return points
    }
    const [canvasPoints, setCanvasPoints] = useState(false)

    const addDragItem = ()=>{
        var currentXY={x:50, y:50}, colour
        if(dragIs.length>0){
            var boundXY = [[0,0],[0,0]]
            boundXY[1] = [
                boundXY[0][0]+dragIs[0].containerRef.current.parentNode.clientWidth-dragIs[0].size[0], 
                boundXY[0][1]+dragIs[0].containerRef.current.parentNode.clientHeight-dragIs[0].size[1]
            ]
            let x, y
            x=Math.floor((Math.random() * boundXY[1][0]) + boundXY[0][0])
            y=Math.floor((Math.random() * boundXY[1][1]) + boundXY[0][1])
            currentXY={x:x, y:y}
        }
        colour={
            r: Math.random() * 255,
            g: Math.random() * 255,
            b: Math.random() * 255,
        }
        colour = rgbToHslHsvHex(colour)
        const newDragItem={
            ref: null,
            containerRef: null,
            active: false,
            colour: colour,
            showPicker: false,
            pointerOffset: {x:0, y:0},
            currentXY: currentXY,
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
        if(target.classList.contains("dragItem")){
            var index
            for(let i in dragIs){
                if(dragIs[i].pointRef.current === target){
                    index = i
                }
            }
            console.log("dragStart "+index, dragIs[index])
            let clientXY = {x:0, y:0}
            if (e.type.substr(0,5) === "touch") {
                clientXY = {x: e.touches[0].clientX, y: e.touches[0].clientY}
            } else {
                clientXY = {x: e.clientX, y: e.clientY}
            }
            mouseBound.start = clientXY
            mouseBound.end = clientXY
            setMouseBound(mouseBound)
            dragIs[index].pointerOffset.x = clientXY.x - dragIs[index].currentXY.x
            dragIs[index].pointerOffset.y = clientXY.y - dragIs[index].currentXY.y
            dragIs[index].active = true
            dragIs[index].pointRef.current.classList.add("active")
            dragIs[index].containerRef.current.style.zIndex = 1
            setDragIs([...dragIs])
        }
    }
    const drag = (e)=>{
        if(isAnyActive()){
            var index
            for(let i in dragIs){
                if(dragIs[i].active){
                    index = i
                }
            }
            e.preventDefault();
            // Calculating current XY 
            let clientXY = {x:0, y:0}
            if (e.type.substr(0,5) === "touch") {
                clientXY = {x: e.touches[0].clientX, y: e.touches[0].clientY}
            } else {
                clientXY = {x: e.clientX, y: e.clientY}
            }
            mouseBound.end = clientXY
            var target = document.elementFromPoint(clientXY.x, clientXY.y)
            setMouseBound(mouseBound)
            if(!isClick(mouseBound.start, mouseBound.end)){
                onPicker(dragIs[index], false)
                closePickers(index)
                var currentXY={x:0, y:0}
                currentXY.x = clientXY.x - dragIs[index].pointerOffset.x
                currentXY.y = clientXY.y - dragIs[index].pointerOffset.y
                let boundXY = [[0,0],[0,0]]
                boundXY[1] = [boundXY[0][0]+dragIs[index].containerRef.current.parentNode.clientWidth-dragIs[index].size[0], 
                                boundXY[0][1]+dragIs[index].containerRef.current.parentNode.clientHeight-dragIs[index].size[1]]
                dragIs[index].currentXY.x = Math.max(Math.min(currentXY.x, boundXY[1][0]), boundXY[0][0])
                dragIs[index].currentXY.y = Math.max(Math.min(currentXY.y, boundXY[1][1]), boundXY[0][1])
                
                setDragIs([...dragIs])
            }

        }else if(mouseBound.mouseDown){
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
            dragIs[index].active = false;
            if(isClick(mouseBound.start, mouseBound.end) && !dragIs[index].showPicker){
                closePickers(index)
                dragIs[index].pointRef.current.classList.add("active")
                dragIs[index].containerRef.current.style.zIndex = 2;
                onPicker(dragIs[index], true)
            }
            else{
                dragIs[index].pointRef.current.classList.remove("active")
                onPicker(dragIs[index], false)
                dragIs[index].containerRef.current.style.zIndex = 1;
            }

            console.log("dragEnd "+index, dragIs[index])
            setDragIs([...dragIs])
        }
    }
    const closePickers=(index)=>{
        for(let i in dragIs){
            dragIs[i].showPicker=false
            dragIs[i].pointRef.current.classList.remove("active")
            dragIs[i].containerRef.current.style.zIndex = 1;
        }
        dragIs[index].pointRef.current.classList.add("active")
        dragIs[index].pointRef.current.parentNode.style.zIndex = 2;
        setDragIs(dragIs)
    }
    const isAnyActive=()=>{
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
            if(!dragIs[i].size){
                update = true
                dragIs[i].size = [dragIs[i].pointRef.current.offsetWidth, dragIs[i].pointRef.current.offsetHeight]
            }
        } 
        if(update) setDragIs(dragIs)
    } 
    const onChangeColor=(index, color)=>{
        let newDragIs = [...dragIs]
        newDragIs[index].colour = color
        setDragIs([...newDragIs])
    }
    useEffect(() => {
        getCanvasPoints(true)
    }, [dragIs])


    return (
        <div className="App" 
            onPointerDown={(e)=>dragStart(e)} 
            onPointerMove={(e)=>drag(e)} 
            onPointerUp={(e)=>dragEnd(e)} 
        >
            <div id="outerContainer">
                <div id="dragPalette">
                    <Canvas 
                        id={"gradientPalette"} 
                        canvasPoints={canvasPoints}
                    />
                </div>
                    <Points 
                        points={dragIs} 
                        onRender={initSizes} 
                        onChangeColor={onChangeColor}
                    />
                <div id="point-manager">
                        <button className="button plus" onClick={addDragItem}></button>
                        <button className="button minus" onClick={()=> removeDragItem({index: -1})}></button>
                </div>
                </div>
        </div>
    );
}

export default App;
