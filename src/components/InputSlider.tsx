import React from 'react';
import './InputSlider.css';
import { Slider } from '@mui/material';

interface InputSliderProps {
    label?: string,
    value: number,
    min?: number;
    max: number;
    step?: number;
    handleChange: any; 
}

export default function InputSlider(props: InputSliderProps) {
    const handleInputChange = (event) => { props.handleChange(event.target.value); }
    const handleSliderChange = (e, value) => { props.handleChange(value as number); }

    return (
        <>
            {props.label !== null && <h3>{props.label}</h3>}

            <input
                type="number"
                value={props.value}
                min={props.min ?? 0}
                max={props.max}
                onChange={handleInputChange}
            />

            <Slider
                value={props.value}
                min={props.min ?? 0}
                max={props.max}
                step={props.step ?? 1}
                valueLabelDisplay="auto"
                onChange={handleSliderChange}
            />
        </>
    );
}