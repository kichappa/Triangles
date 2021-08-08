import React from 'react'
import reactCSS from 'reactcss'

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
    return (
        <div style={styles.container}>
            <div style={styles.point} className="dragItem" id={point.id}/>
        </div>
    )
}

Point.defaultProps = {
    className: "dragItem",
}

export default Point
