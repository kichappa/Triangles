import React from "react";
import reactCSS from "reactcss";
import { useRef } from "react";
import { SketchPicker } from "react-color";
import { FaTint } from "react-icons/fa";

const Point = ({ points, onChangeColor, index, onPickerButton }) => {
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
                width: points[index].tags?.showRadius
                    ? 2 * points[index].radius + 50 + "px"
                    : "0px",
                height: points[index].tags?.showRadius
                    ? 2 * points[index].radius + 50 + "px"
                    : "0px",
                transition: points[index].tags?.resizing
                    ? "all 0s cubic-bezier(0.39, 0.58, 0.57, 1)"
                    : "all 0.3s cubic-bezier(0.39, 0.58, 0.57, 1)",
            },
            pickerButton: {
                width: points[index].tags?.clicked ? 30 + "px" : "0px",
                height: points[index].tags?.clicked ? 30 + "px" : "0px",
                fontSize: 30 / 2.5 + "pt",
                transform: points[index].tags?.clicked
                    ? points[index].tags?.showRadius
                        ? `translate(-50%, calc(-150% - ${
                              points[index].radius + 25
                          }px))`
                        : `translate(-50%, -200%)`
                    : "translate(-50%, -50%)",
                transition: points[index].tags?.resizing
                    ? "all 0s cubic-bezier(0.39, 0.58, 0.57, 1)"
                    : "all 0.3s cubic-bezier(0.39, 0.58, 0.57, 1)",
                color: colour,
            },
            pickerBar: {
                position: "fixed",
                transform: `translate(calc(-50% + 18px), calc(2px+${
                    points[index].radius + 25
                }))`,
            },
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
                        className="dragColor"
                        style={styles.pickerButton}
                        onClick={(e) => onPickerButton(index)}
                    >
                        <FaTint />
                    </div>
                    <div
                        // ref={points[index].pointRef}
                        style={styles.radius}
                        className="dragIWeight"
                        id={points[index].id}
                    />
                    <div
                        ref={points[index].pointRef}
                        style={styles.point_unclicked}
                        className={
                            "dragItem" +
                            (points[index].tags &&
                            (points[index].tags.active ||
                                points[index].tags.clicked)
                                ? " active"
                                : "")
                        }
                        id={points[index].id}
                    />
                </div>
            </div>
            {/* Color picker */}
            {points[index].tags && points[index].tags.showPicker && (
                <SketchPicker
                    style={styles.pickerBar}
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
