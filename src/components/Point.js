import React from 'react'
import reactCSS from 'reactcss'
import {useRef, useEffect} from 'react'

const Point = ({className, point}) => {
    const styles = reactCSS({
        'default':{
            container: {
                position: 'absolute',
                left: point.currentXY[0],
                top: point.currentXY[1],
              },
            point: {
                backgroundColor: point.colour,
            }
        },
    })
    useEffect(()=>{
        point.size = [point.ref.current.offsetWidth,point.ref.current.offsetHeight]
        point.ref.current.parentNode.style.left = point.currentXY[0]
        point.ref.current.parentNode.style.top= point.currentXY[1]
        console.log(point.ref.current.parentNode.style.left, point.ref.current.parentNode.style.top)
    })
    point.ref = useRef(null)
    return (
        <div style={styles.container}>
            <div ref={point.ref} style={styles.point} className="dragItem" id={point.id}/>
        </div>
    )
}

Point.defaultProps = {
    className: "dragItem",
}

export default Point
