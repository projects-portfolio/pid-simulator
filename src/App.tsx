import React, { useState } from 'react';
import './App.css';
import Pendulum from './components/Pendulum.tsx'
import Graph from './components/Graph.tsx'
import InputSlider from './components/InputSlider.tsx'

export default function App() {
  // https://codepen.io/rafaelcastrocouto/pen/NWajBgM
  // https://blog.stackademic.com/matter-js-with-react-and-learn-to-use-useref-effectively-8f57365b926e

  const [target, setTarget] = useState(0);
  const [kP, setKP] = useState(10);
  const [kI, setKI] = useState(0);
  const [kD, setKD] = useState(200);
  const [frictionAir, setFrictionAir] = useState(0);
  const [mass, setMass] = useState(1);
  const [gravity, setGravity] = useState(0);

  const [inputTarget, setInputTarget] = useState(0);
  const [inputKP, setInputKP] = useState(10);
  const [inputKI, setInputKI] = useState(0);
  const [inputKD, setInputKD] = useState(200);
  const [inputFrictionAir, setInputFrictionAir] = useState(0);
  const [inputMass, setInputMass] = useState(1);
  const [inputGravity, setInputGravity] = useState(1);

  const [data, setData] = useState([]);

  const handleResetClick = () => {
    setInputTarget(0);
    setInputKP(10);
    setInputKI(0);
    setInputKD(200);
    setInputFrictionAir(0);
    setInputMass(0);
    setInputGravity(1);
    setTarget(0);
    setKP(10);
    setKI(0);
    setKD(200);
    setFrictionAir(0);
    setMass(1);
    setGravity(0);
  }

  const handleUpdatePrefs = () => {
    setTarget(inputTarget);
    setKP(inputKP);
    setKI(inputKI);
    setKD(inputKD);
    setFrictionAir(inputFrictionAir);
    setMass(inputMass);
    setGravity(inputGravity);
  }

  return (
    <div style={{ width: 1000, height: 1000 }}>
      <InputSlider 
        label="target"
        value={inputTarget}
        max={2 * Math.PI}
        step={Math.PI / 8}
        handleChange={setInputTarget}
      />
      <InputSlider 
        label="kP"
        value={inputKP}
        max={20}
        handleChange={setInputKP}
      />
      <InputSlider 
        label="kI"
        value={inputKI}
        max={100}
        step={10}
        handleChange={setInputKI}
      />
      <InputSlider 
        label="kD"
        value={inputKD}
        max={1000}
        step={25}
        handleChange={setInputKD}
      />
      <InputSlider 
        label="frictionAir"
        value={inputFrictionAir}
        max={5}
        step={0.1}
        handleChange={setInputFrictionAir}
      />
      <InputSlider 
        label="mass"
        value={inputMass}
        min={1}
        max={5}
        step={0.1}
        handleChange={setInputMass}
      />
      <InputSlider 
        label="gravity"
        value={inputGravity}
        max={10}
        step={0.1}
        handleChange={setInputGravity}
      />

      <button onClick={handleResetClick}>Reset</button>
      <button onClick={handleUpdatePrefs}>Load</button>

      <Pendulum kP={kP} kI={kI} kD={kD} target={target} frictionAir={frictionAir} mass={mass} gravity={gravity} setData={setData}/>
      <Graph data={data} />
    </div>
  );
}