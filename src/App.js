import { useState } from 'react';
import './App.css';
import Pendulum from './Pendulum.js'

function App() {
  // https://codepen.io/rafaelcastrocouto/pen/NWajBgM
  // https://blog.stackademic.com/matter-js-with-react-and-learn-to-use-useref-effectively-8f57365b926e
  const [inputValue, setInputValue] = useState(0);
  const [target, setTarget] = useState(0);

  return (
    <div style={{ width: 1000, height: 1000 }}>
      <input
        type="number"
        defaultValue={0}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={() => {if (inputValue !== "") setTarget(inputValue)}} >reset</button>
      <Pendulum kP={0.7} kI={0} kD={2} target={target} />
    </div>
  );
}

export default App;