import React, { useState, useRef, useEffect } from 'react'


var worker = new window.Worker("./gradientWorker.js");;

const Canvas = ({id, canvasPoints}) => {
    const [points, setPoints]=useState(canvasPoints)
    const [canvas, setCanvas]=useState(useRef(null))
    const draw=(imageData)=>{
            var ctx = canvas.current.getContext('2d')
            ctx.putImageData(imageData, 0, 0);
        window.requestAnimationFrame(()=>draw(imageData))
    }
    const shootPixel=()=>{
        var ctx = canvas.current.getContext('2d')
        canvas.current.width = canvas.current.offsetWidth
        canvas.current.height = canvas.current.offsetHeight
        const imageData = ctx.createImageData(canvas.current.width, canvas.current.height)
        var imDataLength = imageData.data.length
        // Calling worker
        worker.terminate()
        worker = new window.Worker("./gradientWorker.js");
        worker.postMessage({
            imageData: imageData, 
            points: points, 
            canvas: {
                width: canvas.current.width, 
                height:canvas.current.height}
        })
        worker.onerror = (err) => {
            console.log("error", err)
        };
        worker.onmessage=(e)=>{
            if (imDataLength === e.data.imageData.data.length){
                var t0 = Date.now()
                draw(e.data.imageData)
                var t1=Date.now()-t0
                console.log("drawing time "+t1+"ms")  
            }
        }
    }

    useEffect(() => {
        setPoints(canvasPoints)
        shootPixel()
    },)

    return (   
        <canvas id={id} ref={canvas}/>
    )
}

export default Canvas
