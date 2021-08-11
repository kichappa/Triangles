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
    var colour
    if(points[index].colour.hex){
        colour = points[index].colour.hex
        // console.log("hi "+index, points[index].colour.hex)
    }else{
        colour = points[index].colour
        // console.log("hello "+index, points[index].colour)
    }
    const styles = reactCSS({
        'default':{
            container: {
                left: points[index].currentXY.x,
                top: points[index].currentXY.y,
                // display: 'fixed'
                
            },
            pointContainer: {
                // position: 'absolute',
                display: 'flex',
                justifyContent: 'center',
	            alignItems: 'center',
                height: '36px',
                width: '36px',
                flexWrap: 'nowrap'
            },
            point: {
                // backgroundColor: color.color,
                backgroundColor: colour,
            },
            picker:{
                // position: 'fixed'
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
    points[index].pointRef = useRef()
    points[index].containerRef = useRef()
    
    return (
        <div className="dragIContainer" style={styles.container} ref={points[index].containerRef} >
            <div style={styles.pointContainer}>
                <div 
                    ref={points[index].pointRef} 
                    style={styles.point} 
                    className="dragItem" 
                    id={points[index].id}
                    // onClick={onClick(points[index])}
                />
            </div>
            {points[index].showPicker && 
            <SketchPicker
                style={{
                    position: 'fixed'
                }}
                // color={color.color}
                color={colour}
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
