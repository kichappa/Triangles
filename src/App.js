import {useState} from "react"
import Points from "./components/Points"

function App() {
  const [dragIs, setDragIs] = useState([
    {
      key: 0,
      id: "point_0",
      colour: "#f5e663",
      pointerOffset: [0,0],
      currentXY: [50, 50],
      size: [0,0]
    }
  ])

  const addDragItem = ()=>{
    const newDragItem={
      key: dragIs.length,
      id:"point_"+dragIs.length,
      colour: "#f5e663",
      pointerOffset: [0,0],
      currentXY: [50, 50],
      size: [0,0]
    }
    setDragIs([...dragIs, newDragItem])
  }

  const removeDragItem = ({index})=>{
    if (index === -1){
      index = dragIs.length-1;
    }
    setDragIs([dragIs.filter((point) => point.id !== index)])
    // setDragIs([...dragIs, newDragItem])
  }

  return (
    <div className="App">
      <div id="outerContainer">
            <div id="dragPalette">
                {/* <div className="dragItem" id="point_0">
                </div> */}
                <Points points={dragIs}/>
            </div>
            <div id="point-manager">
                <button className="button plus" onClick={addDragItem}></button>
                <button className="button minus" onClick={()=> removeDragItem(-1)}></button>
            </div>
        </div>
    </div>
  );
}

export default App;
