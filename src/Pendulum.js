import React, { useEffect, useRef } from 'react';
import { Engine, Render, Runner, Events, Bodies, Composite, Constraint } from 'matter-js';
import PIDController from './PID.js';

function Pendulum({ kP, kI, kD, target }) {
  const canvasRef = useRef();
  const engineRef = useRef();
  const renderRef = useRef();
  const runnerRef = useRef();
  const pendulumRef = useRef();
  const pidRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;

    const innerWidth = canvas.offsetWidth;
    const innerHeight = canvas.offsetHeight;

    const engine = Engine.create({ gravity: { x: 0, y: 0 } });
    const render = Render.create({
      element: canvas,
      engine: engine,
      options: {
        width: innerWidth,
        height: innerHeight,
        wireframes: false,
      }
    });
    const runner = Runner.create();

    const length = 200;
    const width = 25;

    const pendulum = Bodies.rectangle(innerWidth / 2, innerHeight / 2, width, length, {
      friction: 0,
      frictionAir: 0.02,
      mass: 0,
      chamfer: 5,
      render: {
        strokeStyle: '#fffb',
        fillStyle: 'transparent',
        lineWidth: 2
      }
    });

    const pendulumConstraint = Constraint.create({
      pointA: { x: innerWidth / 2, y: innerHeight / 2 - length / 2 },
      bodyB: pendulum,
      pointB: { x: 0, y: -length / 2 },
      length: 0,
      stiffness: 1,
      render: { strokeStyle: '#778' }
    });

    Composite.add(engine.world, [pendulum, pendulumConstraint]);

    Render.run(render);
    Runner.run(runner, engine);

    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: innerWidth, y: innerHeight }
    });

    engineRef.current = engine;
    renderRef.current = render;
    runnerRef.current = runner;
    pendulumRef.current = pendulum;
  }, []);

  useEffect(() => {
    if (engineRef.current && pendulumRef.current) {
      const engine = engineRef.current;
      const pendulum = pendulumRef.current;

      pidRef.current = new PIDController(kP, kI, kD, pendulum.angle, target);
      const pid = pidRef.current;

      Events.on(engine, 'afterUpdate', () => pendulum.torque = bound(pid.step(pendulum.angle, 1)));
    }
  }, [kP, kI, kD, target]);

  function bound(value, lower = null, upper = null) {
    if (lower !== null && value < lower) {
      return lower;
    } else if (upper !== null && value > upper) {
      return upper;
    }
    return value;
  }

  return <div ref={canvasRef} style={{ width: '100%', height: '100%' }}></div>;
}

export default Pendulum;
