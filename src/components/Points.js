import React from 'react'
import Point from "./Point"
import { useEffect } from 'react'

const Points = ({points, onChangeColor, onRender}) => {
    // console.log("Points are ", points)
    // const changeColor = (index, color)=>{
    //     console.log("Changing color of point "+index+" to ",color)
    // }

    useEffect(() => {
        onRender()
    })

    var Points = []
    for(let i in points){
        Points.push(<Point 
                        points={points}
                        index={i} 
                        onChangeColor={onChangeColor}
                        // onClick={onClick}
                    />
                    )
    }
    return Points
    // return (
    //     <>
    //         {points.map((point)=>{
    //             return(
    //                 <>
    //                     <Point 
    //                         point={point} 
    //                         onChangeColor={ChangeColor()}
    //                         // onClick={onClick}
    //                     />
    //                 </>
    //             )
    //         })}
    //     </>
    // )
}

export default Points
