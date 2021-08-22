import { useState, useEffect } from "react";
import Points from "./components/Points";
import Canvas from "./components/Canvas";

function App() {
    const [mouseBound, setMouseBound] = useState([
        {
            mouseDown: false,
            start: {
                x: 0,
                y: 0,
            },
            middle: {
                x: 0,
                y: 0,
            },
            end: {
                x: 0,
                y: 0,
            },
        },
    ]);
    const rgbToHslHsvHex = (rgb) => {
        var rgbArr = [rgb.r, rgb.g, rgb.b];
        var M, m, C, hue, V, L, Sv, Sl;
        M = Math.max(...rgbArr);
        m = Math.min(...rgbArr);
        C = M - m;
        // I = (rgbArr[0] + rgbArr[1] + rgbArr[2]) / 3;
        // Hue
        if (C === 0) hue = 0;
        else if (M === rgbArr[0]) hue = ((rgbArr[1] - rgbArr[2]) / C) % 6;
        else if (M === rgbArr[1]) hue = (rgbArr[2] - rgbArr[0]) / C + 2;
        else if (M === rgbArr[2]) hue = (rgbArr[0] - rgbArr[1]) / C + 4;
        hue *= 60;
        // Lightness and Value
        V = M / 255;
        L = (M + m) / (2 * 255);
        // Saturation
        if (V === 0) Sv = 0;
        else Sv = C / (V * 255);
        if (L === 1 || L === 0) Sl = 0;
        else Sl = C / (255 * (1 - Math.abs(2 * L - 1)));

        hue = ((hue % 360) + 360) % 360;
        // L = (L % 1 + 1)%1
        // V = (V % 1 + 1)%1
        // Sv = (Sv % 1 + 1)%1
        // Sl = (Sl % 1 + 1)%1
        let hsv = { h: hue, s: Sv, v: V, a: 1 };
        let hsl = { h: hue, s: Sl, l: L, a: 1 };
        rgb.a = 1;
        let hex = "#";
        for (let i in rgbArr) {
            let colorcode = Math.floor(rgbArr[i]).toString(16);
            hex += "0".repeat(2 - colorcode.length) + colorcode;
        }
        return { rgb: rgb, hsv: hsv, hsl: hsl, hex: hex };
    };
    var defaultColour = rgbToHslHsvHex({
        r: Math.random() * 255,
        g: Math.random() * 255,
        b: Math.random() * 255,
    });
    const [dragIs, setDragIs] = useState([
        {
            // While not being dragged, [pointerOffset, currentXY, offset] stores the same value, the X and Y coordinate from the original position (0,0), (used in transform: translate3D(X, Y, 0))
            // While being dragged,
            //      pointerOffset[X, Y] stores the pointerOffset X and Y offset of the pointer to the anchor of dragItem
            //      currentXY[X, Y] stores the total X and Y offsets from the pointerOffset position (0,0).
            // After a drag event, all [pointerOffset, currentXY, offset] stores the same value, the X and Y coordinate from the original position (0,0); again.
            pointRef: null,
            containerRef: null,
            active: false,
            showActive: false,
            radius: 1.0,
            oldRadius: undefined,
            resizing: false,
            clicked: false,
            colour: defaultColour,
            showPicker: false,
            pointerOffset: { x: 0, y: 0 },
            currentXY: { x: 50, y: 50 },
            size: false,
        },
    ]);
    const hsvRgbObjToArr = (obj) => {
        var arr = [
            [0, 0, 0],
            [0, 0, 0],
        ];
        arr[0] = [obj.hsv.h, obj.hsv.s, obj.hsv.v];
        arr[1] = [obj.rgb.r, obj.rgb.g, obj.rgb.b];
        return arr;
    };
    const getCanvasPoints = (set) => {
        let points = new Array(dragIs.length);
        for (let i in dragIs) {
            if (dragIs[i].size) {
                points[i] = {
                    x: dragIs[i].currentXY.x + dragIs[i].size[0] / 2,
                    y: dragIs[i].currentXY.y + dragIs[i].size[1] / 2,
                    colour: dragIs[i].colour,
                    colourArr: hsvRgbObjToArr(dragIs[i].colour),
                };
            }
        }
        if (set) setCanvasPoints(points);
        else return points;
    };
    const [canvasPoints, setCanvasPoints] = useState(false);
    const addDragItem = () => {
        var currentXY = { x: 50, y: 50 },
            colour;
        if (dragIs.length > 0) {
            var boundXY = [
                [0, 0],
                [0, 0],
            ];
            boundXY[1] = [
                boundXY[0][0] +
                    dragIs[0].containerRef.current.parentNode.clientWidth -
                    dragIs[0].size[0],
                boundXY[0][1] +
                    dragIs[0].containerRef.current.parentNode.clientHeight -
                    dragIs[0].size[1],
            ];
            let x, y;
            x = Math.floor(Math.random() * boundXY[1][0] + boundXY[0][0]);
            y = Math.floor(Math.random() * boundXY[1][1] + boundXY[0][1]);
            currentXY = { x: x, y: y };
        }
        colour = {
            r: Math.random() * 255,
            g: Math.random() * 255,
            b: Math.random() * 255,
        };
        colour = rgbToHslHsvHex(colour);
        const newDragItem = {
            ref: null,
            containerRef: null,
            active: false,
            showActive: false,
            clicked: false,
            radius: 1 + Math.random * 2,
            oldRadius: undefined,
            resizing: false,
            colour: colour,
            showPicker: false,
            pointerOffset: { x: 0, y: 0 },
            currentXY: currentXY,
            size: false,
        };
        setDragIs([...dragIs, newDragItem]);
    };
    const removeDragItem = ({ index }) => {
        if (index === -1) {
            index = dragIs.length - 1;
        }
        console.log("Removing point with key " + index);
        let newDragIs = dragIs;
        newDragIs.splice(index, 1);
        setDragIs([...newDragIs]);
        console.log("New points are ", dragIs);
    };
    const dragStart = (e) => {
        // mouseDown is to capture off location drags that go over inactive point
        mouseBound.mouseDown = true;

        let clientXY = { x: 0, y: 0 };
        if (e.type.substr(0, 5) === "touch") {
            clientXY = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        } else {
            clientXY = { x: e.clientX, y: e.clientY };
        }
        mouseBound.start = clientXY;
        mouseBound.end = clientXY;
        // capturing target since touch and mouse output different e.target
        var target = document.elementFromPoint(e.clientX, e.clientY);
        // console.log("target is", target);
        // console.log("whosClicked", whosClicked());
        if (
            target.classList.contains("dragItem") &&
            (!isAnyClicked() || (isAnyClicked() && whosClicked() !== target))
        ) {
            // if (target.classList.contains("dragItem")) {
            closeAllClicked();
            var index;
            for (let i in dragIs) {
                if (dragIs[i].pointRef.current === target) {
                    index = i;
                }
            }
            dragIs[index].pointerOffset.x =
                mouseBound.start.x - dragIs[index].currentXY.x;
            dragIs[index].pointerOffset.y =
                mouseBound.start.y - dragIs[index].currentXY.y;
            dragIs[index].active = true;
            dragIs[index].containerRef.current.style.zIndex = 2;
            setDragIs([...dragIs]);
            // console.log("1Show active", dragIs[index].showPicker);
        } else if (
            isAnyClicked() &&
            (whosClicked("full")[0] === target ||
                whosClicked("full")[1] === target)
        ) {
            let index = whosClicked("index");
            dragIs[index].resizing = true;
        }
        setMouseBound(mouseBound);
    };
    const drag = (e) => {
        var target = document.elementFromPoint(e.clientX, e.clientY);
        if (e.type.substr(0, 5) === "touch") {
            mouseBound.middle = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY,
            };
        } else {
            mouseBound.middle = { x: e.clientX, y: e.clientY };
        }
        if (isAnyActive()) {
            var index;
            for (let i in dragIs) {
                if (dragIs[i].active) {
                    index = i;
                }
            }
            // console.log("2Show active", dragIs[index].showPicker);
            e.preventDefault();
            // Calculating current XY

            mouseBound.end = mouseBound.middle;
            // console.log("3Show active", dragIs[index].showPicker);
            if (!isClick(mouseBound.start, mouseBound.end)) {
                // console.log("hello not a click");
                onPointClick(index, false);
                closePickers(index);
                dragIs[index].containerRef.current.style.zIndex = 2;
                var currentXY = { x: 0, y: 0 };
                currentXY.x =
                    mouseBound.middle.x - dragIs[index].pointerOffset.x;
                currentXY.y =
                    mouseBound.middle.y - dragIs[index].pointerOffset.y;
                let boundXY = [
                    [0, 0],
                    [0, 0],
                ];
                boundXY[1] = [
                    boundXY[0][0] +
                        dragIs[index].containerRef.current.parentNode
                            .clientWidth -
                        dragIs[index].size[0],
                    boundXY[0][1] +
                        dragIs[index].containerRef.current.parentNode
                            .clientHeight -
                        dragIs[index].size[1],
                ];
                dragIs[index].currentXY.x = Math.max(
                    Math.min(currentXY.x, boundXY[1][0]),
                    boundXY[0][0]
                );
                dragIs[index].currentXY.y = Math.max(
                    Math.min(currentXY.y, boundXY[1][1]),
                    boundXY[0][1]
                );
                dragIs[index].showActive = true;
                setDragIs([...dragIs]);
            }
        } else if (whosClicked() && dragIs[whosClicked("index")].resizing) {
            let radiusInc = dist(mouseBound.start, mouseBound.middle);
            console.log({ radiusInc });
            let index = whosClicked("index");
            dragIs[index].radius = dragIs[index].oldRadius + radiusInc;
            setDragIs([...dragIs]);
        } else if (
            mouseBound.mouseDown &&
            (!isAnyClicked() || (isAnyClicked() && whosClicked() !== target))
        ) {
            dragStart(e);
        } else {
            // var target = document.elementFromPoint(e.clientX, e.clientY);
            // // console.log(target)
            // try {
            //     if (target.tagName === "CANVAS")
            //         console.log(
            //             target
            //                 .getContext("2d")
            //                 .getImageData(e.clientX, e.clientY, 1, 1).data
            //         );
            // } catch {}
        }
        setMouseBound(mouseBound);
    };
    const dragEnd = (e) => {
        mouseBound.mouseDown = false;
        var index;
        for (let i in dragIs)
            if (dragIs[i].active || dragIs[i].clicked) index = i;
        if (index) {
            dragIs[index].pointerOffset.x = dragIs[index].currentXY.x;
            dragIs[index].pointerOffset.y = dragIs[index].currentXY.y;
            dragIs[index].active = false;
            var target = document.elementFromPoint(e.clientX, e.clientY);
            // console.log("target was ", target.classList);
            if (
                isClick(mouseBound.start, mouseBound.end) &&
                (target.classList.contains("dragItem") ||
                    target.classList.contains("dragIWeight"))
            ) {
                closePickers(index);
                dragIs[index].containerRef.current.style.zIndex = dragIs[index]
                    .clicked
                    ? 1
                    : 2;
                onPointClick(index, !dragIs[index].clicked);
                dragIs[index].active = false;
            } else if (dragIs[index].resizing) {
                dragIs[index].resizing = false;
                dragIs[index].oldRadius = dragIs[index].radius;
            } else {
                dragIs[index].showActive = false;
                dragIs[index].containerRef.current.style.zIndex = 1;
            }
            setDragIs([...dragIs]);
        }
        setMouseBound(mouseBound);
    };
    const closeAllClicked = (index) => {
        for (let i in dragIs) {
            dragIs[i].showPicker = false;
            dragIs[i].clicked = false;
            dragIs[i].containerRef.current.style.zIndex = 1;
        }
        setDragIs(dragIs);
    };
    const closePickers = (index) => {
        for (let i in dragIs) {
            if (i !== index) {
                dragIs[i].showPicker = false;
                dragIs[i].containerRef.current.style.zIndex = 1;
            }
        }
        setDragIs(dragIs);
    };
    const isAnyActive = () => {
        let active = false;
        for (let i in dragIs) {
            active = active || dragIs[i].active;
        }
        return active;
    };
    const isAnyClicked = () => {
        let clicked = false;
        for (let i in dragIs) {
            clicked = clicked || dragIs[i].clicked;
        }
        return clicked;
    };
    const whosClicked = (returnType = "DOM") => {
        let clicked = -1;
        for (let i in dragIs) {
            if (dragIs[i].clicked) clicked = i;
        }
        // console.log(clicked);
        if (clicked !== -1) {
            if (returnType === "DOM") return dragIs[clicked].pointRef.current;
            else if (returnType === "index") return clicked;
            else if (returnType === "full") {
                return dragIs[clicked].pointRef.current.parentNode.children;
            }
        } else return undefined;
    };
    const isPickerActive = () => {
        let showPicker = false;
        for (let i in dragIs) {
            showPicker = showPicker || dragIs[i].showPicker;
        }
        return showPicker;
    };
    const onPointClick = (index, state) => {
        dragIs[index].clicked = state;
        dragIs[index].oldRadius = dragIs[index].radius;
        // dragIs[index].showPicker = state;
        setDragIs(dragIs);
    };
    const dist = (p1, p2) => {
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    };
    const isClick = (startXY, endXY) => {
        let tol = 5;
        let value = dist(endXY, startXY);
        return value <= tol;
    };
    const initSizes = () => {
        let update = false;
        for (let i in dragIs) {
            if (!dragIs[i].size) {
                update = true;
                dragIs[i].size = [
                    dragIs[i].pointRef.current.offsetWidth,
                    dragIs[i].pointRef.current.offsetHeight,
                ];
            }
        }
        if (update) setDragIs(dragIs);
    };
    const onChangeColor = (index, color) => {
        let newDragIs = [...dragIs];
        newDragIs[index].colour = color;
        setDragIs([...newDragIs]);
    };
    useEffect(() => {
        getCanvasPoints(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dragIs]);

    return (
        <div
            className="App"
            onPointerDown={(e) => dragStart(e)}
            onPointerMove={(e) => drag(e)}
            onPointerUp={(e) => dragEnd(e)}
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
                    <button
                        className="button plus"
                        onClick={addDragItem}
                    ></button>
                    <button
                        className="button minus"
                        onClick={() => removeDragItem({ index: -1 })}
                    ></button>
                </div>
            </div>
        </div>
    );
}

export default App;
