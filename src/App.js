import { useState } from 'react';
import './App.css';
import Pendulum from './Pendulum.js'

function App() {
  const [target, setTarget] =  useState(0);

  // https://codepen.io/rafaelcastrocouto/pen/NWajBgM

  return (
    <div>
      <input
        type="number"
        value={target}
        onChange={(e) => setTarget(parseFloat(e.target.value))}
      />
      <button onClick={() => {
        
      }}>reset</button>
      <Pendulum target={target} />
    </div>
  );
}

export default App;