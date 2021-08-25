import React from "react";
import Point from "./Point";
import { useEffect } from "react";

const Points = ({ points, onChangeColor, onRender, onPickerButton }) => {
    useEffect(() => {
        onRender();
    });
    var Points = [];
    for (let i in points) {
        Points.push(
            <Point
                points={points}
                index={i}
                onChangeColor={onChangeColor}
                onPickerButton={onPickerButton}
            />
        );
    }
    return Points;
};

export default Points;
