import React, { useState } from 'react';
import './App.css';
import Pendulum from './components/Pendulum.tsx'
import InputSlider from './components/InputSlider.tsx'

export default function App() {
  // https://codepen.io/rafaelcastrocouto/pen/NWajBgM
  // https://blog.stackademic.com/matter-js-with-react-and-learn-to-use-useref-effectively-8f57365b926e

  const [target, setTarget] = useState(0);
  const [kP, setKP] = useState(10);
  const [kI, setKI] = useState(0);
  const [kD, setKD] = useState(200);
  const [frictionAir, setFrictionAir] = useState(0);
  const [mass, setMass] = useState(0);
  const [gravity, setGravity] = useState(1);

  const handleResetClick = () => {
    setTarget(0);
    setKP(10);
    setKI(0);
    setKD(200);
    setFrictionAir(0);
    setMass(0);
  }

  return (
    <div style={{ width: 1000, height: 1000 }}>
      <InputSlider 
        label="target"
        value={target}
        max={2 * Math.PI}
        step={Math.PI / 8}
        handleChange={setTarget}
      />
      <InputSlider 
        label="kP"
        value={kP}
        max={20}
        handleChange={setKP}
      />
      <InputSlider 
        label="kI"
        value={kI}
        max={100}
        step={10}
        handleChange={setKI}
      />
      <InputSlider 
        label="kD"
        value={kD}
        max={1000}
        step={25}
        handleChange={setKD}
      />
      <InputSlider 
        label="frictionAir"
        value={frictionAir}
        max={5}
        step={0.1}
        handleChange={setFrictionAir}
      />
      <InputSlider 
        label="mass"
        value={mass}
        max={5}
        step={0.1}
        handleChange={setMass}
      />
      <InputSlider 
        label="gravity"
        value={gravity}
        max={5}
        step={0.1}
        handleChange={setGravity}
      />

      <button onClick={handleResetClick}>Reset</button>

      <Pendulum kP={kP} kI={kI} kD={kD} target={target} frictionAir={frictionAir} mass={mass} gravity={gravity} />
    </div>
  );
}