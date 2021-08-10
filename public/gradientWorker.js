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

const rgbToHue=rgb=>{
    // Using the method provided at https://en.wikipedia.org/wiki/HSL_and_HSV#Hue_and_chroma
    var M, m, C, hue
    M=Math.max(...rgb)
    m=Math.min(...rgb)
    C = M-m
    if(C===0) hue=null
    else if (M===rgb[0]) hue=((rgb[1]-rgb[2])/C % 6)
    else if (M===rgb[1]) hue=((rgb[2]-rgb[3])/C +2)
    else if (M===rgb[2]) hue=((rgb[0]-rgb[1])/C +4)
    hue *= 60
    if(hue>360) console.log(hue)
    return hue
}

const hsvToRgb=(hsv)=>{
    // console.log("converting", hsv)
    // Using the alternative method provided at https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_RGB_alternative
    const f=(n)=>{
        let k = (n + hsv[0]/60) % 6
        let output = hsv[2] - hsv[2]*hsv[1]*Math.max(0, Math.min(k, 4-k, 1))
        return output
    }
    let rgb = [f(5)*255, f(3)*255, f(1)*255]
    // console.log("rgb is",rgb)
    // if(rgb[0]===0){
    //     console.log(rgb)
    // }
    return rgb
}

const getColor=(position, points)=>{
    // let dist = distances(position, points)
    let invSum = 0
    let hsv = [0,0,0], rgb = [0,0,0] //, 255]
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
        
        colour = points[i].colour
        hsv[1] += 1/d*colour.hsv.s
        hsv[2] += 1/d*colour.hsv.v 
        // colour = points[i].colour
        rgb[0] += 1/d*colour.rgb.r
        rgb[1] += 1/d*colour.rgb.g
        rgb[2] += 1/d*colour.rgb.b    
        // t1=Date.now()-t0
        // if(t1) console.log("hsv elapsed=", t1)
        // console.log("hsv is ", hsv)
    }
    // t1=Date.now()-t0
    // if(t1) console.log("hsv elapsed=", t1)   
    // console.log("hsv is ", hsv)
    rgb[0] /= invSum
    rgb[1] /= invSum
    rgb[2] /= invSum

    hsv[0]  = rgbToHue(rgb)
    hsv[1] /= invSum
    hsv[2] /= invSum
    // console.log(hsv, rgb)
    return {pixel:hsvToRgb(hsv), hsv: hsv, rgb: rgb}
    // return hsv
}

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
  
    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.
  
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

onmessage = (e)=>{
    let imageData = e.data.imageData, points = e.data.points, canvas = e.data.canvas
    if(points){
        var t0 = Date.now()
        for (var i = 0; i < imageData.data.length; i += 4) {
                var x = Math.floor(i/4) % canvas.width
                var y = Math.floor(Math.floor(i/4)/canvas.width)
                let pixel = getColor({x:x,y:y}, points)
                if(x===10 && y===10) {
                    console.log("at ["+[x,y]+"]",pixel)
                    // console.log(pixel)
                }
                imageData.data[i] = pixel.pixel[0]
                imageData.data[i+1] = pixel.pixel[1]
                imageData.data[i+2] = pixel.pixel[2]
                imageData.data[i+3] = 255
            }
        var t1=Date.now()-t0
        console.log("computation time "+t1+"ms")
        postMessage({imageData})
    }
}
