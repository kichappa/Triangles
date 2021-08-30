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
        if (!canvas.current.getContext("webgl2")) {
            console.log("WebGL2 not available, using CPU.");
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
                    window.requestAnimationFrame(() => draw(e.data.imageData));
                }
            };
        } else {
            window.requestAnimationFrame(() =>
                renderGradient(points, canvas.current)
            );
        }
    };
    useEffect(() => {
        setPoints(canvasPoints);
        shootPixel();
    });
    useEffect(() => {
        if (!canvas.current.getContext("webgl2")) {
            alert(
                "WebGL not available in this browser/platform. Renders may be slower."
            );
        }
    }, []);
    return <canvas id={id} ref={canvas} />;
};

export default Canvas;
