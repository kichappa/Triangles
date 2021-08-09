import React from 'react'
import reactCSS from 'reactcss'
import {useRef, useEffect, useState} from 'react'
import { SketchPicker } from 'react-color';

const Point = ({className, point, onChangeColor}) => {
    const [color, setColor] =  useState(
        point.colour
    )
    console.log(color[0])
    const styles = reactCSS({
        'default':{
            container: {
                position: 'absolute',
                left: point.currentXY.x,
                top: point.currentXY.y,
              },
            point: {
                backgroundColor: color,
            }
        },
    })
    useEffect(()=>{
        point.size = [point.ref.current.offsetWidth,point.ref.current.offsetHeight]
        // setColor(point.color)
        // point.ref.current.parentNode.style.left = point.currentXY.x
        // point.ref.current.parentNode.style.top= point.currentXY.y
        // console.log(point.ref.current.parentNode.style.left, point.ref.current.parentNode.style.top)
    })
    const ChangeColor=(color)=>{
        // console.log("tT changing color to", color, color.hex)
        onChangeColor(color)
        point.colour = color.hex
        setColor(color.hex)
    }
    point.ref = useRef(null)
    
    return (
        <div style={styles.container}>
            <div 
                ref={point.ref} 
                style={styles.point} 
                className="dragItem" 
                id={point.id}
                // onClick={onClick(point)}
            />
            {point.showPicker && 
            <SketchPicker
                color={color}
                onChange={ChangeColor}
            />}
        </div>
    )
}

Point.defaultProps = {
    className: "dragItem",
}

export default Point
