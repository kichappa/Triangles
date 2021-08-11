import React from 'react'
import Point from "./Point"
import { useEffect } from 'react'

const Points = ({points, onChangeColor, onRender}) => {
    useEffect(() => {
        onRender()
    })
    var Points = []
    for(let i in points){
        Points.push(
            <Point 
                points={points}
                index={i} 
                onChangeColor={onChangeColor}
            />
        )
    }    
    return Points
}

export default Points
