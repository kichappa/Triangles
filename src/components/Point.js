import React from 'react'
import reactCSS from 'reactcss'
import {useRef, useEffect, useState} from 'react'
import { SketchPicker } from 'react-color';

const Point = ({className, points, onChangeColor, index}) => {
    // console.log(points, points[index])    
    // const [color, setColor] =  useState({
    //     color: points[index].colour.hex, 
    //     fullColor: points[index].colour
    // })
    // console.log(color[0])
    const styles = reactCSS({
        'default':{
            container: {
                position: 'absolute',
                left: points[index].currentXY.x,
                top: points[index].currentXY.y,
            },
            point: {
                // backgroundColor: color.color,
                backgroundColor: points[index].colour.hex,
            },
            picker:{
                position: 'fixed'
            }
        },
    })
    // points[index].size = [points[index].ref.current.offsetWidth,points[index].ref.current.offsetHeight]
    useEffect(()=>{
        // setColor(points[index].color)
        // points[index].ref.current.parentNode.style.left = points[index].currentXY.x
        // points[index].ref.current.parentNode.style.top= points[index].currentXY.y
        // console.log(points[index].ref.current.parentNode.style.left, points[index].ref.current.parentNode.style.top)
    })
    const changeColor=(color)=>{
        // console.log("tT changing color to", color, color.hex)
        // onChangeColor(color)
        // points[index].colour = color
        // onChangeColor(index, color)
        // setColor({color: color.hex, fullColor: color})
        // onChangeColor(index, color)
    }
    points[index].ref = useRef(null)
    
    return (
        <div style={styles.container}>
            <div 
                ref={points[index].ref} 
                style={styles.point} 
                className="dragItem" 
                id={points[index].id}
                // onClick={onClick(points[index])}
            />
            {points[index].showPicker && 
            <SketchPicker
                style={{
                    position: 'fixed'
                }}
                // color={color.color}
                color={points[index].colour.hex}
                // onChange={changeColor}
                onChange={(color)=>onChangeColor(index, color)}
                disableAlpha={true}
                presetColors={[]}
            />}
        </div>
    )
}

Point.defaultProps = {
    className: "dragItem",
}

export default Point
