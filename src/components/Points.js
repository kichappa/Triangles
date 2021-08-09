import React from 'react'
import Point from "./Point"

const Points = ({points, onChangeColor}) => {
    console.log("Points are ", points)
    const changeColor = (index, color)=>{
        console.log("Changing color of point "+index+" to ",color)
    }

    var Points = []
    for(let i in points){
        Points.push(<Point 
                        point={points[i]} 
                        onChangeColor={(color)=>changeColor(i, color)}
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
