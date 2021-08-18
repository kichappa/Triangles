import React, { useState, useRef, useEffect } from "react";
import renderGradient from "../js/gradientRenderer";

var worker = new window.Worker("./gradientWorker.js");

const Canvas = ({ id, canvasPoints }) => {
    const [points, setPoints] = useState(canvasPoints);
    const [canvas] = useState(useRef(null));
    const draw = (imageData) => {
        var ctx = canvas.current.getContext("2d");
        ctx.putImageData(imageData, 0, 0);
        window.requestAnimationFrame(() => draw(imageData));
    };
    const shootPixel = () => {
        // canvas.current.width = canvas.current.offsetWidth;
        // canvas.current.height = canvas.current.offsetHeight;
        if (!canvas.current.getContext("webgl2")) {
            var ctx = canvas.current.getContext("2d");
            const imageData = ctx.createImageData(
                canvas.current.width,
                canvas.current.height
            );
            var imDataLength = imageData.data.length;
            // Calling worker
            worker.terminate();
            worker = new window.Worker("./gradientWorker.js");
            worker.postMessage({
                imageData: imageData,
                points: points,
                canvas: {
                    width: canvas.current.width,
                    height: canvas.current.height,
                },
            });
            worker.onerror = (err) => {
                console.log("error", err);
            };
            worker.onmessage = (e) => {
                if (imDataLength === e.data.imageData.data.length) {
                    // var t0 = Date.now();
                    window.requestAnimationFrame(() => draw(e.data.imageData));
                    // var t1 = Date.now() - t0;
                    // console.log("drawing time " + t1 + "ms");
                }
            };
        } else {
            // var t0 = Date.now();
            window.requestAnimationFrame(() =>
                renderGradient(points, canvas.current)
            );
            // var t1 = Date.now() - t0;
            // console.log("GPU drawing time " + t1 + "ms");
        }
    };
    useEffect(() => {
        setPoints(canvasPoints);
        shootPixel();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    });
    useEffect(() => {
        if (!canvas.current.getContext("webgl2")) {
            alert(
                "WebGL not available in this browser/platform. Renders may be slower."
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <canvas id={id} ref={canvas} />;
};

export default Canvas;
