import React, { useState } from 'react';
import './App.css';
import Pendulum from './Pendulum.js'
import { Slider } from '@mui/material';

function App() {
  // https://codepen.io/rafaelcastrocouto/pen/NWajBgM
  // https://blog.stackademic.com/matter-js-with-react-and-learn-to-use-useref-effectively-8f57365b926e
  const [inputValue, setInputValue] = useState(0);
  const [target, setTarget] = useState(0);

  return (
    <div style={{ width: 1000, height: 1000 }}>
      <input
        type="number"
        value={inputValue}
        min={0}
        max={10}
        onChange={(e) => setInputValue(e.target.valueAsNumber)}
      />
      <button onClick={() => {setTarget(inputValue)}} >reset</button>

      <Slider
        value={target}
        min={0}
        max={2 * Math.PI}
        step={Math.PI / 8}
        valueLabelDisplay="auto"
        onChange={(e, value) => setTarget(value as number)}
      />
      
      <Pendulum kP={10} kI={0} kD={200} target={target} />
    </div>
  );
}

export default App;