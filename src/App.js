import { useState, useEffect } from "react";
import Points from "./components/Points";
import Canvas from "./components/Canvas";
import { FaPlus, FaMinus, FaUndoAlt, FaRedoAlt } from "react-icons/fa";

function App() {
    const [potChange, setPotChange] = useState(false);
    const [mouse, setMouse] = useState({
        down: false,
        stateSaved: false,
        clicked: {
            status: false,
            index: undefined,
            obj: undefined,
        },
        showRadius: false,
        active: false,
        resizing: {
            mode: false,
            start: false,
        },
        target: {
            obj: undefined,
            index: undefined,
            initialPosition: {
                x: 0,
                y: 0,
            },
            initialRadius: undefined,
        },
        pos: {
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
    });
    const [view, setView] = useState([]);
    const [undo, setUndo] = useState([]);
    const [redo, setRedo] = useState([]);
    const [undoRedo, setUndoRedo] = useState(false);
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
            radius: 0,
            colour: defaultColour,
            showPicker: false,
            currentXY: { x: 50, y: 50 },
            size: undefined,
            containerSize: undefined,
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
                let centre = pointCentre(i);
                points[i] = {
                    x: centre.x,
                    y: centre.y,
                    colour: dragIs[i].colour,
                    colourArr: hsvRgbObjToArr(dragIs[i].colour),
                    radius: dragIs[i].radius,
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
            radius: 0,
            colour: colour,
            showPicker: false,
            pointerOffset: { x: 0, y: 0 },
            currentXY: currentXY,
            size: undefined,
            containerSize: undefined,
        };
        setDragIs([...dragIs, newDragItem]);
        setPotChange(true);
    };
    const removeDragItem = ({ index }) => {
        if (index === -1) {
            index = dragIs.length - 1;
        }
        console.log("Removing point with key " + index);
        let newDragIs = dragIs;
        newDragIs.splice(index, 1);
        setDragIs([...newDragIs]);
        setPotChange(true);
        console.log("New points are ", dragIs);
    };
    const dragStart = (e) => {
        mouse.down = true;
        if (e.type.substr(0, 5) === "touch") {
            mouse.pos.start = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY,
            };
        } else {
            mouse.pos.start = { x: e.clientX, y: e.clientY };
        }
        mouse.pos.end = mouse.pos.start; // not sure if this is needed.

        mouse.target.obj = document.elementFromPoint(e.clientX, e.clientY);
        var index = getIndex(mouse.target.obj);
        mouse.target.index = index;
        if (!mouse.target.obj.classList.contains("dragItem")) {
            hideButton(false, 0, "0.3s");
        }
        if (
            // if pointerdown on the a dragItem
            mouse.target.obj.classList.contains("dragItem") &&
            (!mouse.clicked.status || // if none is clicked,
                (mouse.clicked.status &&
                    mouse.clicked.index !== mouse.target.index) ||
                !mouse.showRadius) // or clicked item is not pointerdown item
        ) {
            if (index) {
                mouse.target.index = index;
                mouse.target.init = {
                    x:
                        dragIs[mouse.target.index].currentXY.x -
                        mouse.pos.start.x,
                    y:
                        dragIs[mouse.target.index].currentXY.y -
                        mouse.pos.start.y,
                };
                mouse.active = true;
                dragIs[mouse.target.index].tags = { active: true };
                dragIs[
                    mouse.target.index
                ].containerRef.current.style.zIndex = 2;
            }
        }
        // resizing point
        else if (
            // clicked item is pointerdown item
            mouse.clicked.status &&
            mouse.clicked.index === mouse.target.index &&
            dragIs[mouse.clicked.index].tags?.showRadius
        ) {
            mouse.resizing.mode = true;
            mouse.showRadius = true;
            mouse.target.initialRadius = dragIs[mouse.clicked.index].radius;
        }
        setDragIs([...dragIs]);
        setMouse(mouse);
    };
    const drag = (e) => {
        if (e.type.substr(0, 5) === "touch") {
            mouse.pos.middle = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY,
            };
        } else {
            mouse.pos.middle = { x: e.clientX, y: e.clientY };
        }
        // if an item is active and the mouse movement is not a click, drag it
        if (mouse.active && !isClick(mouse.pos.start, mouse.pos.middle)) {
            closePoint();
            var index = mouse.target.index;
            if (index) {
                e.preventDefault();
                hideButton(true, 0);
                try {
                    dragIs[index].containerRef.current.style.zIndex = 2; // bringing item to top
                } catch {}
                var currentXY = { x: 0, y: 0 }; // saving the position to a variable (used to bound...)
                currentXY.x = mouse.pos.middle.x + mouse.target.init.x;
                currentXY.y = mouse.pos.middle.y + mouse.target.init.y;
                // finding the bounds of the dragPalette element
                // this is done so that the points stay inside
                // the palette even if cursor is outside
                let boundXY = getBounds(index);
                dragIs[index].currentXY.x = Math.max(
                    Math.min(currentXY.x, boundXY[1][0]),
                    boundXY[0][0]
                );
                dragIs[index].currentXY.y = Math.max(
                    Math.min(currentXY.y, boundXY[1][1]),
                    boundXY[0][1]
                );
            }
        }
        // resizing
        else if (mouse.resizing.mode) {
            if (mouse.clicked.index) {
                let r = dist(pointCentre(mouse.clicked.index), {
                    x: mouse.pos.middle.x - 20,
                    y: mouse.pos.middle.y - 20,
                });
                if (mouse.resizing.start) {
                    dragIs[mouse.clicked.index].radius = Math.max(
                        Math.abs(r) - 25,
                        0
                    );
                } else if (r - 25 >= mouse.target.initialRadius) {
                    dragIs[mouse.clicked.index].tags
                        ? (dragIs[mouse.clicked.index].tags.resizing = true)
                        : (dragIs[mouse.clicked.index].tags = {
                              resizing: true,
                          });
                    mouse.resizing.start = true;
                }
            }
        } else if (mouse.down) {
            dragStart(e);
        }
        setDragIs([...dragIs]);
        setMouse(mouse);
    };
    const dragEnd = (e) => {
        // e.preventDefault();
        if (e.type.substr(0, 5) === "touch") {
            mouse.pos.end = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY,
            };
        } else {
            mouse.pos.end = { x: e.clientX, y: e.clientY };
        }
        let index = mouse.target.index;
        if (index) {
            let target = document.elementFromPoint(e.clientX, e.clientY);
            // item is clicked, show radius
            if (
                isClick(mouse.pos.start, mouse.pos.end) &&
                (target.classList.contains("dragItem") ||
                    target.classList.contains("dragIWeight"))
            ) {
                try {
                    dragIs[index].containerRef.current.style.zIndex = dragIs[
                        index
                    ].clicked
                        ? 1
                        : 2;
                } catch {}
                if (
                    !mouse.clicked.status ||
                    (mouse.clicked.target && mouse.clicked.target !== target)
                ) {
                    mouse.clicked.status = true;
                    mouse.clicked.target = target;
                    mouse.clicked.index = getIndex(target);
                    closePoint(mouse.clicked.index);
                    mouse.showRadius = true;
                    dragIs[mouse.clicked.index].tags = {
                        clicked: true,
                        showRadius: true,
                    };
                } else if (
                    mouse.clicked.target &&
                    mouse.clicked.target === target
                ) {
                    mouse.clicked.status = false;
                    closePoint();
                    mouse.clicked.target = undefined;
                    mouse.clicked.index = undefined;
                }
            } else if (mouse.resizing.start) {
                delete dragIs[index].tags.resizing;
            } else if (mouse.active) {
                hideButton(false);
                closePoint();
                mouse.active = false;
                try {
                    dragIs[index].containerRef.current.style.zIndex = 1;
                } catch {}
            }
            mouse.down = false;
            mouse.active = false;
            mouse.resizing.mode = false;
            mouse.resizing.start = false;
            setDragIs([...dragIs]);
            setMouse(mouse);
        } else {
            mouse.down = false;
            setDragIs([...dragIs]);
        }
        setPotChange(true);
    };
    const getIndex = (obj) => {
        for (let i in dragIs) {
            if (dragIs[i].pointRef.current === obj) {
                return i;
            }
        }
        return undefined;
    };
    async function hideButton(state, timeout, animTime) {
        if (!state && timeout === undefined) timeout = 700;
        if (animTime === undefined) {
            if (state) animTime = "0.15s";
            else animTime = "1s";
        }
        setTimeout(() => {
            let undoButton = document.getElementsByClassName("hideButton");
            for (let k in undoButton) {
                if (undoButton[k].classList)
                    if (state) {
                        undoButton[k].classList.add("hidden");
                        undoButton[
                            k
                        ].style.transition = `all 0.5s cubic-bezier(0.39, 0.58, 0.57, 1), opacity ${animTime} ease-in-out`;
                    } else {
                        undoButton[k].classList.remove("hidden");
                        undoButton[
                            k
                        ].style.transition = `all 0.5s cubic-bezier(0.39, 0.58, 0.57, 1), opacity ${animTime} ease-in-out`;
                    }
            }
        }, timeout);
    }
    const pointCentre = (index) => {
        let centre = {
            x: dragIs[index].currentXY.x + dragIs[index].containerSize[0] / 2,
            y: dragIs[index].currentXY.y + dragIs[index].containerSize[1] / 2,
        };
        return centre;
    };
    const getBounds = (index) => {
        let boundXY = [
            [
                -(dragIs[index].containerSize[0] - dragIs[index].size[0]) / 2,
                -(dragIs[index].containerSize[1] - dragIs[index].size[1]) / 2,
            ], // min X, Y
            [0, 0], // max X, Y
        ];
        boundXY[1] = [
            boundXY[0][0] +
                dragIs[index].containerRef.current.parentNode.clientWidth -
                dragIs[index].size[0], // (- size) because anchor is at top left
            boundXY[0][1] +
                dragIs[index].containerRef.current.parentNode.clientHeight -
                dragIs[index].size[1],
        ];
        return boundXY;
    };
    const closePoint = (index = undefined) => {
        !index && (mouse.clicked.status = false);
        for (let i in dragIs) {
            if (index === i) {
                continue;
            }
            if (dragIs[i].tags) delete dragIs[i].tags;
            dragIs[i].containerRef.current.style.zIndex = 1;
        }
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
    const updateSizes = () => {
        let update = false;
        for (let i in dragIs) {
            if (!dragIs[i].size) {
                update = true;
                dragIs[i].size = [
                    dragIs[i].pointRef.current.offsetWidth,
                    dragIs[i].pointRef.current.offsetHeight,
                ];
                dragIs[i].containerSize = [
                    dragIs[i].pointRef.current.parentNode.parentNode
                        .offsetWidth,
                    dragIs[i].pointRef.current.parentNode.parentNode
                        .offsetHeight,
                ];
            }
        }
        if (update) setDragIs(dragIs);
    };
    const onChangeColor = (index, color, finish = false) => {
        let newDragIs = [...dragIs];
        newDragIs[index].colour = color;
        setDragIs([...newDragIs]);
        if (finish) setPotChange(true);
    };
    const pushToView = (state, dontCopyToRedo = false) => {
        if (dontCopyToRedo) {
            let newView = copyDragIs(state);
            setView(newView);
        } else if (differentState(state, view)) {
            setUndo([...undo, view]);
            setRedo([]);
            let newView = copyDragIs(state);
            setView(newView);
        }
    };
    const differentState = (newState, oldState) => {
        let diff =
            JSON.stringify(removeDOMItems(newState)) !=
            JSON.stringify(removeDOMItems(oldState));
        return (
            JSON.stringify(removeDOMItems(newState)) !=
            JSON.stringify(removeDOMItems(oldState))
        );
    };
    const copyDragIs = (state) => {
        let copyState = JSON.parse(JSON.stringify(removeDOMItems(state)));
        return copyState;
    };
    const removeDOMItems = (state) => {
        let minimalState = [];
        for (let i in state) {
            let item = { ...state[i] };
            try {
                item.pointRef = undefined;
                item.containerRef = undefined;
                delete item.tags;
            } catch (error) {
                console.error("Error in removing DOM elements.", error);
            }
            minimalState.push(item);
        }
        return minimalState;
    };
    const onPickerButton = (index) => {
        if (dragIs[index].tags) {
            if (dragIs[index].tags.showPicker) {
                delete dragIs[index].tags.showPicker;
                dragIs[index].tags.showRadius = true;
                mouse.showRadius = true;
            } else {
                dragIs[index].tags.showPicker = true;
                delete dragIs[index].tags.showRadius;
                mouse.showRadius = false;
            }
        } else dragIs[index].tags = { showPicker: true };
        setDragIs([...dragIs]);
    };
    const undoRedoClicked = (action) => {
        if (action === "undo" && undo.length) {
            setRedo([...redo, view]);
            setDragIs(undo[undo.length - 1]);
            console.log(undo.slice(0, undo.length - 1));
            setUndo(undo.slice(0, undo.length - 1));
            setUndoRedo(true);
            setPotChange(true);
        } else if (action === "redo" && redo.length) {
            setUndo([...undo, view]);
            setDragIs(redo[redo.length - 1]);
            setRedo(redo.slice(0, redo.length - 1));
            setUndoRedo(true);
            setPotChange(true);
        }
        mouse.down = false;
    };
    useEffect(() => {
        if (potChange) {
            pushToView(dragIs, undoRedo);
            if (undoRedo) setUndoRedo(false);
            setPotChange(false);
        }
    }, [potChange]);
    useEffect(() => {
        getCanvasPoints(true);
    }, [dragIs]);
    useEffect(() => {
        pushToView(dragIs, true);
        setPotChange(false);
        hideButton(false, 500);
    }, []);
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
                    onRender={updateSizes}
                    onChangeColor={onChangeColor}
                    onPickerButton={onPickerButton}
                />
                <div id="point-manager">
                    <button
                        className="button plus hideButton hidden"
                        onClick={addDragItem}
                    >
                        <FaPlus />
                    </button>
                    <button
                        className="button minus hideButton hidden"
                        onClick={() => removeDragItem({ index: -1 })}
                    >
                        <FaMinus />
                    </button>
                </div>
                <div id="undo" className="undo-redo undoButton">
                    <button
                        className="button hideButton hidden"
                        onClick={() => {
                            undoRedoClicked("undo");
                        }}
                    >
                        <FaUndoAlt className="undoButton" />
                    </button>
                </div>
                <div id="redo" className="undo-redo">
                    <button
                        className="button hideButton hidden"
                        onClick={() => {
                            undoRedoClicked("redo");
                        }}
                    >
                        <FaRedoAlt />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
