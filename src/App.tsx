/*
* Aggregates our components together for the simulator
*/

import './App.css';
import React, { useState } from 'react';
import Pendulum from './components/pendulum/Pendulum.tsx'
import Graph from './components/graphs/Graph.tsx'
import InputSlider from './components/inputs/InputSlider.tsx'
import Tutorial from './components/modals/Tutorial.tsx'
import { IconButton, Button } from '@mui/material'
import { PlayCircle, PauseCircle } from '@mui/icons-material'

export default function App() {
  const [currentConstants, setCurrentConstants] = useState(
    {
      target: 0,
      kP: 10,
      kI: 0,
      kD: 200,
      frictionAir: 0,
      mass: 1,
      gravity: 0,
    }
  );

  const [inputFields, setInputFields] = useState(
    {
      target: 0,
      kP: 10,
      kI: 0,
      kD: 200,
      frictionAir: 0,
      mass: 1,
      gravity: 0,
    }
  )

  const [positionData, setPositionData] = useState([]);
  const [powerData, setPowerData] = useState([]);
  
  const [playState, setPlayState] = useState(false);
  const [resetState, setResetState] = useState(true);

  const handleResetClick = () => {
    setInputFields(
      {
        target: 0,
        kP: 10,
        kI: 0,
        kD: 200,
        frictionAir: 0,
        mass: 1,
        gravity: 0,
      }
    );

    setCurrentConstants(
      {
        ...inputFields,
      }
    );

    setPositionData([]);
    setPowerData([]);

    setPlayState(false);
    setResetState(true);
  }

  const handleUpdatePrefs = () => {
    setCurrentConstants(
      {
        ...inputFields,
      }
    )
  }

  const handleTogglePlay = () => {
    setPlayState(!playState);
  }

  const handleUpdateInput = (e) => {
    setInputFields(
      {
        ...inputFields,
        [e.target.name]: e.target.value, 
      }
    );
    console.log(e.target.name);
  }

  // const handleUpdateMetrics = (...datapoint) => {
  //   setMetrics(
  //     {
  //       position: (data) => [...data, datapoint[0]],
  //       power: (data) => [...data, datapoint[1]],
  //     }
  //   )
  //   console.log("Power: " + JSON.stringify(metrics.power));
  //   console.log("Position: " + JSON.stringify(metrics.position));
  // }

  // TODO: split this into subcomponents
  return (
    <div className="main-container">
      <div className="tutorial-container">
        <Tutorial/>
      </div>

      <div className="pendulum-container">
        <Pendulum 
          {...currentConstants}
          paused={!playState} 
          reset={resetState}
          setReset={setResetState}
          setPosition={setPositionData}
          setPower={setPowerData}
        />
      </div>

      <div className="slider-container">
        <InputSlider 
          name="target"
          label="Target Angle (in Radians)"
          value={inputFields.target}
          max={2 * Math.PI}
          step={Math.PI / 8}
          handleChange={handleUpdateInput}
        />
        <InputSlider 
          name="kP"
          label="kP: Proportion Constant"
          value={inputFields.kP}
          max={20}
          handleChange={handleUpdateInput}
        />
        <InputSlider 
          name="kI"
          label="kI: Integral Constant"
          value={inputFields.kI}
          max={100}
          step={10}
          handleChange={handleUpdateInput}
        />
        <InputSlider 
          name="kD"
          label="kD: Derivative Constant"
          value={inputFields.kD}
          max={1000}
          step={25}
          handleChange={handleUpdateInput}
        />
        <InputSlider 
          name="frictionAir"
          label="Air Resistance"
          value={inputFields.frictionAir}
          max={1}
          step={0.1}
          handleChange={handleUpdateInput}
        />
        <InputSlider 
          name="mass"
          label="Mass of Pendulum"
          value={inputFields.mass}
          min={1}
          max={5}
          step={0.1}
          handleChange={handleUpdateInput}
        />
        <InputSlider 
          name="gravity"
          label="Gravity"
          value={inputFields.gravity}
          max={10}
          step={0.1}
          handleChange={handleUpdateInput}
        />

        <div className="buttons-container">
          <Button onClick={handleResetClick}>Reset</Button>
          <Button onClick={handleUpdatePrefs} disabled={playState}>Load</Button>
          <IconButton onClick={handleTogglePlay}>
            {playState && <PauseCircle />}
            {!playState && <PlayCircle />}
          </IconButton>
        </div>
      </div>

      <div className="graphs-container">
        <Graph 
          label="Angular Position (in Radians)"
          data={positionData}
          backgroundColor="rgb(255, 99, 132)"
          borderColor="rgb(255, 99, 132)"
        />
        <Graph 
          label="Power Output"
          data={powerData}
          backgroundColor="rgb(99, 141, 255)"
          borderColor="rgb(99, 141, 255)"
        />
      </div>
    </div>
  );
}