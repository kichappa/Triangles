import React from 'react'
import Point from "./Point"

const Points = ({points}) => {
    console.log("Points are ", points)
    return (
        <>
            {points.map((point)=>{
                return(
                    <>
                        <Point point={point}/>
                    </>
                )
            })}
        </>
    )
}

export default Points
