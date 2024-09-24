/*
* Defines InputSlider component used for user input gains and physical constants
* Combines Slider from Material UI and regular input field
*/

import React from 'react';
import './InputSlider.css';
import { Slider } from '@mui/material';

interface InputSliderProps {
    label?: string,
    name: string,
    value: number,
    min?: number;
    max: number;
    step?: number;
    handleChange: any; 
}

export default function InputSlider(props: InputSliderProps) {
    const handleInputChange = (e) => { 
        console.log(e.target.name);
        console.log(e.target.value);
        props.handleChange(e); 
    }

    return (
        <>
            {props.label !== null && <h3>{props.label}</h3>}

            <input
                name={props.name}
                type="number"
                value={props.value}
                min={props.min ?? 0}
                max={props.max}
                onChange={handleInputChange}
            />

            <Slider
                name={props.name}
                value={props.value}
                min={props.min ?? 0}
                max={props.max}
                step={props.step ?? 1}
                valueLabelDisplay="auto"
                onChange={handleInputChange}
            />
        </>
    );
}