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
        let k = (n + hsv[0]/60) % 6
        let output = hsv[2] - hsv[2]*hsv[1]*Math.max(0, Math.min(k, 4-k, 1))
        return output
    }
    let rgb = [f(5)*255, f(3)*255, f(1)*255, 255]
    // console.log("rgb is",rgb)
    return rgb
}

const getColor=(position, points)=>{
    // let dist = distances(position, points)
    let invSum = 0
    let hsv = [0,0,0]//, 255]
    // var t1, t0
    // t0 = Date.now()
    let colour = points[0].colour
    for(let i in points){
        // console.log("distance from point "+i+" is"+distance(position, points[i]))
        // t0 = Date.now()
        let d = distance(position, points[i])
        // t1=Date.now()-t0
        // if(t1) console.log("distance elapsed=", t1)
        invSum += 1/d
        // console.log("d", d)
        // console.log("invSum", invSum)
        // t0 = Date.now()
        // hsv.h += 1/d*points[i].colour.h
        // hsv.s += 1/d*points[i].colour.s
        // hsv.v += 1/d*points[i].colour.v      
        
        // colour = points[i].colour
        // hsv[0] += 1/d*colour.h
        // hsv[1] += 1/d*colour.s
        // hsv[2] += 1/d*colour.v 
        colour = points[i].colour
        hsv[0] += 1/d*colour.r
        hsv[1] += 1/d*colour.g
        hsv[2] += 1/d*colour.b    
        // t1=Date.now()-t0
        // if(t1) console.log("hsv elapsed=", t1)
        // console.log("hsv is ", hsv)
    }
    // t1=Date.now()-t0
    // if(t1) console.log("hsv elapsed=", t1)   
    // console.log("hsv is ", hsv)
    hsv[0] /= invSum
    hsv[1] /= invSum
    hsv[2] /= invSum
    // return hsvToRgb(hsv)
    return hsv
}

onmessage = (e)=>{
    let imageData = e.data.imageData, points = e.data.points, canvas = e.data.canvas
    if(points){
        var t0 = Date.now()
        for (var i = 0; i < imageData.data.length; i += 4) {
                var x = Math.floor(i/4) % canvas.width
                var y = Math.floor(Math.floor(i/4)/canvas.width)
                let pixel = getColor({x:x,y:y}, points)
                imageData.data[i] = pixel[0]
                imageData.data[i+1] = pixel[1]
                imageData.data[i+2] = pixel[2]
                imageData.data[i+3] = 255
            }
        var t1=Date.now()-t0
        console.log("computation time "+t1+"ms")
        postMessage({imageData})
    }
}
