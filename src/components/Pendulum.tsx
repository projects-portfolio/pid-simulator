import React, { useEffect, useRef } from 'react';
import { Engine, Render, Runner, Events, Body, Bodies, Composite, Constraint } from 'matter-js';
import PIDController from '../controller/PID.ts';

interface PendulumProps {
    kP: number;
    kI: number;
    kD: number;
    target: number;
    frictionAir: number;
    mass: number;
    gravity: number;

    setData: Function;
    paused: boolean;
}

export default function Pendulum(props: PendulumProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Engine>();
  const renderRef = useRef<Render>();
  const runnerRef = useRef<Runner>();
  const pendulumRef = useRef<any>();
  const pidRef = useRef<PIDController>();

  useEffect(() => {
    const canvas = canvasRef.current!;

    const innerWidth = canvas.offsetWidth;
    const innerHeight = canvas.offsetHeight;

    const engine = Engine.create({ gravity: { scale: 0, x: 0, y: 1 } });
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
      frictionAir: 0,
      mass: 1,
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

    return () => {
      Engine.clear(engine);
      Render.stop(render);
      Runner.stop(runner);
      render.canvas?.remove();
      // render.canvas = null;
      // render.context = null;
      render.textures = {};
    };
  }, []);

  useEffect(() => {
    if (props.paused) {
        return;
    }

    const engine = engineRef.current;
    const pendulum = pendulumRef.current;

    if (engine && pendulum) {
      pidRef.current = new PIDController(props.kP, props.kI, props.kD, pendulum.angle, props.target);

      function applyTorque(pid) {
        pendulum.torque = bound(pid.step(pendulum.angle, 1), -5, 5);

        // directly calling setData yields a warning
        const update = props.setData;
        update((data) => [...data, pendulum.angle]);
      }

      Events.on(engine, 'afterUpdate', () => applyTorque(pidRef.current));
    }

    return () => {
      Events.off(engine, '', () => {});
    }
  }, [props.kP, props.kI, props.kD, props.target, props.setData]);

  useEffect(() => {
    const engine = engineRef.current;
    const pendulum = pendulumRef.current;

    if (engine && pendulum) {
      pendulum.frictionAir = props.frictionAir;
      Body.setMass(pendulum, props.mass);
      engine.gravity = {scale: props.gravity / 1000, x: 0, y: 1};
    }

    return () => {};
  }, [props.frictionAir, props.mass, props.gravity]);

  function bound(value: any, lower: number, upper: number) {
    if (lower !== null && value < lower) {
      return lower;
    } else if (upper !== null && value > upper) {
      return upper;
    }
    return value;
  }

  return <div ref={canvasRef} style={{ width: '100%', height: '100%' }}></div>;
}
