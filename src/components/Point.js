import React from "react";
import reactCSS from "reactcss";
import { useRef } from "react";
import { SketchPicker } from "react-color";

const Point = ({ points, onChangeColor, index }) => {
    var colour;
    if (points[index].colour.hex) {
        colour = points[index].colour.hex;
    } else {
        colour = points[index].colour;
    }
    const styles = reactCSS({
        default: {
            container: {
                left: points[index].currentXY.x,
                top: points[index].currentXY.y,
            },
            pointContainer: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "36px",
                width: "36px",
                flexWrap: "nowrap",
            },
            point: {
                backgroundColor: colour,
            },
            picker: {},
        },
    });
    points[index].pointRef = useRef();
    points[index].containerRef = useRef();
    return (
        <div
            className="dragIContainer"
            style={styles.container}
            ref={points[index].containerRef}
        >
            {/* point container */}
            <div style={styles.pointContainer}>
                <div
                    ref={points[index].pointRef}
                    style={styles.point}
                    className="dragItem"
                    id={points[index].id}
                />
            </div>
            {/* Color picker */}
            {points[index].showPicker && (
                <SketchPicker
                    style={{
                        position: "fixed",
                    }}
                    color={colour}
                    onChange={(color) => onChangeColor(index, color)}
                    disableAlpha={true}
                    presetColors={[]}
                />
            )}
        </div>
    );
};
Point.defaultProps = {
    className: "dragItem",
};

export default Point;
