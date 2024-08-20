import { useState } from 'react';
import './App.css';
import Pendulum from './Pendulum.js'

function App() {
  const [target, setTarget] =  useState(0);

  // https://codepen.io/rafaelcastrocouto/pen/NWajBgM
  // https://blog.stackademic.com/matter-js-with-react-and-learn-to-use-useref-effectively-8f57365b926e

  return (
    <div style={{ width: 1000, height: 1000 }}>
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