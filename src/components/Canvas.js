import React, { useState, useRef, useEffect } from 'react'

const Canvas = ({id, canvasPoints}) => {
    // console.log("titu",canvasPoints)
    const [points, setPoints]=useState(canvasPoints)
    const [canvas, setCanvas]=useState(useRef(null))

    const distances=(position, points)=>{
        let dist = new Array(points.length)
        for (let i in points){
            dist[i] =  distance(position, points)
        }
        return dist
    }

    const distance = (position, point)=>{
        return Math.sqrt(Math.pow(point.x-position.x,2) + Math.pow(point.y-position.y,2))
    }

    const hsvToRgb=(hsv)=>{
        // console.log("converting", hsv)
        // Using the alternative method provided at https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_RGB_alternative
        const f=(n)=>{
            let k = (n + hsv.h/60) % 6
            let output = hsv.v - hsv.v*hsv.s*Math.max(0, Math.min(k, 4-k, 1))
            return output
        }
        let rgb = [f(5)*255, f(3)*255, f(1)*255]
        // console.log("rgb is",rgb)
        return rgb
    }

    const getColor=(position, points)=>{
        let dist = distances(position, points)
        let invSum = 0
        let hsv = {
            h:0, s:0, v:0
        }
        for(let i in points){
            // console.log("distance from point "+i+" is"+distance(position, points[i]))
            let d = distance(position, points[i])
            invSum += 1/d
            // console.log("d", d)
            // console.log("invSum", invSum)
            hsv.h += 1/d*points[i].colour.h
            hsv.s += 1/d*points[i].colour.s
            hsv.v += 1/d*points[i].colour.v
            // console.log("hsv is ", hsv)
        }        
        // console.log("hsv is ", hsv)
        hsv.h /= invSum
        hsv.s /= invSum
        hsv.v /= invSum
        return hsv
    }

    const shootPixel=()=>{
        var ctx = canvas.current.getContext('2d')
        canvas.current.width = canvas.current.offsetWidth
        canvas.current.height = canvas.current.offsetHeight
        // console.log("context", ctx)
        var imageData = ctx.createImageData(canvas.current.width, canvas.current.height)
        // console.log("canvasPoints are", points)
        console.log(canvas.current.offsetWidth, canvas.current.offsetHeight)
        console.log(canvas.current.width, canvas.current.height)
        // getColor({x:100,y:100}, points)
        if(points){
            // let rgb = hsvToRgb(getColor({x:100,y:100}, points))
            // console.log("hello", points, points.length)
            // console.log("color is",rgb)
            for (var i = 0; i < imageData.data.length; i += 4) {
            // for (var i = 0; i < canvas.current.width*4; i += 4) {
                // let x, y
                var x = Math.floor(i/4) % canvas.current.width
                var y = Math.floor(Math.floor(i/4)/canvas.current.width)
                let rgb = hsvToRgb(getColor({x:x,y:y}, points))
                imageData.data[i + 0] = rgb[0];  // R value
                imageData.data[i + 1] = rgb[1];    // G value
                imageData.data[i + 2] = rgb[2];  // B value
                // imageData.data[i + 2] = rgb[2]*x/canvas.current.width;  // B value
                imageData.data[i + 3] = 255;
                // imageData.data[i + 3] = 255*y/canvas.current.height;  // A value
                // imageData.data[i + 3] = 255*x/canvas.current.width;  // A value
            }
            ctx.putImageData(imageData, 0, 0);
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
