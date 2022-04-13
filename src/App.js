import React, { useState, useEffect } from 'react';
import Points from './components/Points';
import Canvas from './components/Canvas';
import { FaPlus, FaMinus, FaUndoAlt, FaRedoAlt } from 'react-icons/fa';
import { atomWithHash } from 'jotai/utils';

function App() {
    /**
     * @type {boolean} Potential change in the system is stored here.
     * Any function that changes the system changes this, and useEffect looks for this flagged to push to undo. */
    const [potChange, setPotChange] = useState(false);
    const [renderPage, setRenderPage] = useState(false);
    const [url, setUrl] = useState(window.location.origin);
    /** @type {object} Stores various mouse states */
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
            getXY: function (from) {
                if (from === 'start') return [this.start.x, this.start.y];
                else if (from === 'middle')
                    return [this.middle.x, this.middle.y];
                else if (from === 'end') return [this.end.x, this.end.y];
            },
        },
    });
    const [view, setView] = useState([]);
    const [undo, setUndo] = useState([]);
    const [redo, setRedo] = useState([]);
    const [undoRedo, setUndoRedo] = useState(false);
    /**
     * Function to convert colour object in RGB to HSL, HSV and Hex reperesentations.
     *
     * @param {object} rgb
     * @return {{rgb:object, hsv:object, hsl:object, hex:object}} Various colour representations.
     */
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
        let hex = '#';
        for (let i in rgbArr) {
            let colorcode = Math.floor(rgbArr[i]).toString(16);
            hex += '0'.repeat(2 - colorcode.length) + colorcode;
        }
        return { rgb: rgb, hsv: hsv, hsl: hsl, hex: hex };
    };
    /** @type {object} RGB colour object, the default colour at initialization */
    var defaultColour = rgbToHslHsvHex({
        r: Math.random() * 255,
        g: Math.random() * 255,
        b: Math.random() * 255,
    });
    var paramsHash = new URLSearchParams(window.location.search);
    var params = {};
    for (var pair of paramsHash.entries()) {
        params[pair[0]] = JSON.parse(Buffer.from(pair[1], 'base64').toString());
    }
    var initDragIs;
    if ('points' in params) {
        initDragIs = params['points'];
    } else {
        initDragIs = [
            {
                /** @type {React.MutableRefObject} The reference to the `dragItem` DOM item. */
                pointRef: null,
                /** @type {React.MutableRefObject} The reference to the `dragIContainer` DOM item. */
                containerRef: null,
                /** @type {number} The radius of the colour point. */
                radius: 0,
                /** @type {{rgb:object, hsv:object, hsl:object, hex:string}} Various colour representations of the point. */
                colour: defaultColour,
                /** @type {boolean} tells React to show/hide the colour picker. */
                showPicker: false,
                /** @type {{x:number, y:number}} controls the location of the `dragIContainer`, relative to the `outerContainer`. */
                currentXY: { x: 50, y: 50 },
                /** @type {Array} The CSS size of `dragItem`. */
                size: undefined,
                /** @type {Array} The CSS size of `div` inside `dragIContainer`. */
                containerSize: undefined,
            },
        ];
    }
    const [dragIs, setDragIs] = useState(initDragIs);
    /**
     * Function to convert multi-representation colour object to 2x3 array of RGB and HSV representations.
     *
     * @param {{rgb:object, hsv:object, [hsl:object, hex:object]}} obj
     * @return {[Array, Array]} [[h, s, v], [r, g, b]].
     */
    const hsvRgbObjToArr = (obj) => {
        var arr = [
            [0, 0, 0],
            [0, 0, 0],
        ];
        arr[0] = [obj.hsv.h, obj.hsv.s, obj.hsv.v];
        arr[1] = [obj.rgb.r, obj.rgb.g, obj.rgb.b];
        return arr;
    };
    /**
     * Function to convert `DragIs[]` array to `canvasPoints[]` state that the renderer expects.
     *
     * @param {boolean} set Set the canvasPoints state or not?
     * @return {{x, y, colour:object colourArr:Array, radius: number}[]} canvasPoints if not `set`.
     */
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
    /**
     * Function to add a new DragItem with random colour and position. The function sets the `dragIs[]` state and flags `potChange` at exit.
     */
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
        setRenderPage(true);
    };
    /**
     * Function to remove the DragItem of specified index. The function sets the `dragIs[]` state and flags `potChange` at exit.
     *
     * @param {number} index the index of the DragItem to be removed.
     */
    const removeDragItem = (index) => {
        if (index === -1) {
            index = dragIs.length - 1;
        }
        console.log('Removing point with key ' + index);
        let newDragIs = dragIs;
        newDragIs.splice(index, 1);
        setDragIs([...newDragIs]);
        setPotChange(true);
        setRenderPage(true);
        console.log('New points are ', dragIs);
    };
    /**
     * Pointer down event handler that enables modification of DragItems.
     *
     * @param {MouseEvent} e The mouse event variable.
     */
    const dragStart = (e) => {
        mouse.down = true; // pointer is down
        mouse.pos.start = getPointerLocation(e); // getting pointer location

        // acquire pointer target
        mouse.target.obj = document.elementFromPoint(
            ...mouse.pos.getXY('start')
        );
        // index of the target in the dragIs[] array
        var index = getIndex(mouse.target.obj);
        if (index) mouse.target.index = index;

        // Unhide hideButtons that were hidden previously
        if (!mouse.target.obj.classList.contains('dragItem')) {
            hideButton(false, 0, '0.3s');
        }

        // moving a point or making it clicked (highlighted)...
        if (
            // if pointerdown on the a dragItem and...
            mouse.target.obj.classList.contains('dragItem') &&
            (!mouse.clicked.status || // if none is clicked, ...
            (mouse.clicked.status && // or clicked item is not pointerdown item...
                mouse.clicked.index !== mouse.target.index) || // or radius is not being modified (or shown).
                !mouse.showRadius)
        ) {
            if (index) {
                // this if is just to catch the error "dragIs[index] is undefined" that appears for some fucking reason.
                // save the initial location of the target before it is moved.
                mouse.target.init = {
                    x:
                        dragIs[mouse.target.index].currentXY.x -
                        mouse.pos.start.x,
                    y:
                        dragIs[mouse.target.index].currentXY.y -
                        mouse.pos.start.y,
                };
                mouse.active = true; // set mouse.active to indicate some point is starting to be moved (technically moved is set in drag where the mouse movement is checked to be isClick() or not).
                // set mouse to be active and bring it to top in CSS.
                dragIs[mouse.target.index].tags = { active: true };
                dragIs[
                    mouse.target.index
                ].containerRef.current.style.zIndex = 2;
            }
        }
        // start resizing the clicked (highlighted) point
        else if (
            mouse.clicked.status && // some item is clicked...
            mouse.clicked.index === mouse.target.index && // and clicked item is pointerdown item...
            dragIs[mouse.clicked.index]?.tags?.showRadius // and clicked item is in showRadius mode, not colour picker mode.
        ) {
            mouse.resizing.mode = true; // enable resizing mode, but not start it yet.
            mouse.showRadius = true; // show it's radius
            mouse.target.initialRadius = dragIs[mouse.clicked.index].radius; // set initial radius of the object
        }
        setDragIs([...dragIs]);
        setRenderPage(true);
        setMouse(mouse);
    };
    const drag = (e) => {
        mouse.pos.middle = getPointerLocation(e);
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
        if (mouse.down) {
            // console.log("mouse is down");
            setRenderPage(true);
        }
        setMouse(mouse);
    };
    const dragEnd = (e) => {
        // e.preventDefault();
        if (e.type.substr(0, 5) === 'touch') {
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
                (target.classList.contains('dragItem') ||
                    target.classList.contains('dragIWeight'))
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
                    try {
                        dragIs[mouse.clicked.index].tags = {
                            clicked: true,
                            showRadius: true,
                        };
                    } catch {}
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
        setRenderPage(true);
    };
    const getIndex = (obj) => {
        for (let i in dragIs) {
            if (dragIs[i].pointRef.current === obj) {
                return i;
            }
        }
        return undefined;
    };
    const getPointerLocation = (e) => {
        let position = { x: undefined, y: undefined };
        if (e.type.substr(0, 5) === 'touch') {
            position = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY,
            };
        } else {
            position = { x: e.clientX, y: e.clientY };
        }
        return position;
    };
    async function hideButton(state, timeout, animTime) {
        if (!state && timeout === undefined) timeout = 700;
        if (animTime === undefined) {
            if (state) animTime = '0.15s';
            else animTime = '1s';
        }
        setTimeout(() => {
            let undoButton = document.getElementsByClassName('hideButton');
            for (let k in undoButton) {
                if (undoButton[k].classList)
                    if (state) {
                        undoButton[k].classList.add('hidden');
                        undoButton[
                            k
                        ].style.transition = `all 0.5s cubic-bezier(0.39, 0.58, 0.57, 1), opacity ${animTime} ease-in-out`;
                    } else {
                        undoButton[k].classList.remove('hidden');
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
    const pushNewURL = (state = dragIs) => {
        var url_query =
            window.location.origin +
            '/?points=' +
            Buffer.from(JSON.stringify(removeDOMItems(state))).toString(
                'base64'
            );
        if (url !== url_query) console.log(url_query);
        window.history.pushState(null, null, url_query);
        setUrl(url_query);
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
        setRenderPage(true);
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
            pushNewURL(state);
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
                console.error('Error in removing DOM elements.', error);
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
        if (action === 'undo' && undo.length) {
            setRedo([...redo, view]);
            setDragIs(undo[undo.length - 1]);
            setUndo(undo.slice(0, undo.length - 1));
            setUndoRedo(true);
            setPotChange(true);
            setRenderPage(true);
        } else if (action === 'redo' && redo.length) {
            setUndo([...undo, view]);
            setDragIs(redo[redo.length - 1]);
            setRedo(redo.slice(0, redo.length - 1));
            setUndoRedo(true);
            setPotChange(true);
            setRenderPage(true);
        }
        mouse.down = false;
        pushNewURL();
    };
    useEffect(() => {
        if (renderPage) {
            try {
                getCanvasPoints(true);
                setRenderPage(false);
            } catch (err) {
                console.error('Error in rendering page.', err);
            }
        }
        if (potChange) {
            pushToView(dragIs, undoRedo);
            if (undoRedo) setUndoRedo(false);
            setPotChange(false);
        }
    }, [renderPage]);
    useEffect(() => {
        getCanvasPoints(true);
        setRenderPage(false);
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
                        id={'gradientPalette'}
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
                        onClick={() => removeDragItem(-1)}
                    >
                        <FaMinus />
                    </button>
                </div>
                <div id="undo" className="undo-redo undoButton">
                    <button
                        className="button hideButton hidden"
                        onClick={() => {
                            undoRedoClicked('undo');
                        }}
                    >
                        <FaUndoAlt className="undoButton" />
                    </button>
                </div>
                <div id="redo" className="undo-redo">
                    <button
                        className="button hideButton hidden"
                        onClick={() => {
                            undoRedoClicked('redo');
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
