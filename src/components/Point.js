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
            point_unclicked: {
                backgroundColor: colour,
                ":hover": {
                    width: "35px",
                    height: "35px",
                    cursor: "pointer",
                    borderWidth: "8px",
                },
            },
            point_clicked: { backgroundColor: colour },
            radius: {
                width: points[index].clicked
                    ? points[index].radius + 49 + "px"
                    : "0px",
                height: points[index].clicked
                    ? points[index].radius + 49 + "px"
                    : "0px",
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
                <div>
                    <div
                        ref={points[index].pointRef}
                        style={styles.radius}
                        className="dragIWeight"
                        id={points[index].id}
                    />
                    <div
                        ref={points[index].pointRef}
                        style={styles.point_unclicked}
                        className={
                            "dragItem" +
                            (points[index].showActive || points[index].clicked
                                ? " active"
                                : "")
                        }
                        id={points[index].id}
                    />
                </div>
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
