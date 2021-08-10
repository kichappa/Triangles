import React, { useState, useRef, useEffect } from 'react'


var worker = new window.Worker("./gradientWorker.js");;

const Canvas = ({id, canvasPoints}) => {
    // console.log("titu",canvasPoints)
    const [points, setPoints]=useState(canvasPoints)
    const [canvas, setCanvas]=useState(useRef(null))

    const draw=(imageData)=>{
            var ctx = canvas.current.getContext('2d')
            // console.log("imageData is", imageData)
            // console.log("imageData is", typeof(imageData))
            ctx.putImageData(imageData, 0, 0);
        window.requestAnimationFrame(()=>draw(imageData))
    }
    const shootPixel=()=>{
        var ctx = canvas.current.getContext('2d')
        canvas.current.width = canvas.current.offsetWidth
        canvas.current.height = canvas.current.offsetHeight
        // console.log("context", ctx)
        const imageData = ctx.createImageData(canvas.current.width, canvas.current.height)
        var imDataLength = imageData.data.length
        // console.log("canvasPoints are", points)
        // console.log(canvas.current.offsetWidth, canvas.current.offsetHeight)
        // console.log(canvas.current.width, canvas.current.height)
        // getColor({x:100,y:100}, points)
        // console.log(imageData.data.length)
        // console.log("hi")
        
        // worker = new window.Worker("./gradientWorker.js");
        worker.terminate()
        worker = new window.Worker("./gradientWorker.js");
        // const worker = new window.Worker("./gradientWorker.js");
        worker.postMessage({
            imageData: imageData, 
            points: points, 
            canvas: {
                width: canvas.current.width, 
                height:canvas.current.height}
        })
        // console.log("hello")
        worker.onerror = (err) => {
            console.log("error", err)
        };
        worker.onmessage=(e)=>{
            // console.log("new imageData recieved")
            // console.log("a", e)
            // console.log("b", e.data)
            if (imDataLength === e.data.imageData.data.length){
                // ctx.putImageData(e.data.imageData, 0, 0);
                console.log("blah", e.data.imageData)
                draw(e.data.imageData)
            }
        }
        // if(points){
        //     // let rgb = hsvToRgb(getColor({x:100,y:100}, points))
        //     // console.log("hello", points, points.length)
        //     // console.log("color is",rgb)
        //     // console.log("Start array computation now")
        //     // var t1, t0
        //     // t0 = Date.now()
        //     // var hsv = new Array(4*canvas.current.width, canvas.current.height)
        //     let count=0, a=0
        //     // for(let y=0;y<canvas.current.width;y++){
        //     //     for(let x=0;x<canvas.current.width;x++){
        //         for (var i = 0; i < imageData.data.length; i += 4) {
        //             // let x, y
        //             var x = Math.floor(i/4) % canvas.current.width
        //             var y = Math.floor(Math.floor(i/4)/canvas.current.width)
        //             let pixel = getColor({x:x,y:y})
        //             // console.log(pixel)
        //             imageData.data[i] = pixel[0]
        //             imageData.data[i+1] = pixel[1]
        //             imageData.data[i+2] = pixel[2]
        //             imageData.data[i+3] = 255
        //             // count++
        //         }
        //     // }
        //     // console.log(count)
        //     // console.log(imageData.data)
        //     // t1=Date.now()-t0
        //     // console.log("HSV over")
        //     // console.log("milliseconds elapsed=", t1)
            
        //     // for (var i = 0; i < imageData.data.length; i += 4) {
        //     // // for (var i = 0; i < canvas.current.width*4; i += 4) {
        //     //     // let x, y
        //     //     var x = Math.floor(i/4) % canvas.current.width
        //     //     var y = Math.floor(Math.floor(i/4)/canvas.current.width)
        //     //     // let rgb = hsvToRgb(getColor({x:x,y:y}, points))
        //     //     imageData.data[i + 0] = rgb[0];  // R value
        //     //     imageData.data[i + 1] = rgb[1];    // G value
        //     //     imageData.data[i + 2] = rgb[2];  // B value
        //     //     // imageData.data[i + 2] = rgb[2]*x/canvas.current.width;  // B value
        //     //     imageData.data[i + 3] = 255;
        //     //     // imageData.data[i + 3] = 255*y/canvas.current.height;  // A value
        //     //     // imageData.data[i + 3] = 255*x/canvas.current.width;  // A value
        //     // }
        //     // const data = imageData.data 
        //     // data = hsv

        //     ctx.putImageData(imageData, 0, 0);
        // }
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
