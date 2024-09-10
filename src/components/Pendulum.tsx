import './Pendulum.css';

import React, { useEffect, useRef } from 'react';
import { Engine, Render, Runner, Events, Body, Bodies, Composite, Constraint, Sleeping } from 'matter-js';
import PIDController from '../controller/PID.ts';
import { bound } from './utils.ts';

interface PendulumProps {
    kP: number;
    kI: number;
    kD: number;
    target: number;
    frictionAir: number;
    mass: number;
    gravity: number;
    
    paused: boolean;
    reset: boolean;
    setReset: Function;
    
    setPosition: Function;
    setPower: Function;
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

    props.setReset(false);

    return () => {
      Engine.clear(engine);
      Render.stop(render);
      Runner.stop(runner);
      render.canvas?.remove();
      // render.canvas = null;
      // render.context = null;
      render.textures = {};
    };
  }, [props.reset, props.setReset]);

  useEffect(() => {
    const engine = engineRef.current;
    const pendulum = pendulumRef.current;

    if (engine && pendulum) {
        if (props.paused) {
            engine!.gravity = {scale: 0, x: 0, y: 1};
            Sleeping.set(pendulum, true);
        } else {
            engine!.gravity = {scale: props.gravity / 1000, x: 0, y: 1};
            Sleeping.set(pendulum, false);

            pidRef.current = new PIDController(props.kP, props.kI, props.kD, pendulum.angle, props.target);

            function applyTorque(pid) {
                pendulum.torque = bound(pid.step(pendulum.angle, 1), -5, 5);

                props.setPosition((data) => [...data, pendulum.angle]);
                props.setPower((data) => [...data, pendulum.torque]);
            }

            Events.on(engine, 'afterUpdate', () => applyTorque(pidRef.current));
        }
    }

    return () => {
      //Events.off(engine, '', () => {});
      Events.off(engine);
    }
  }, [props.kP, props.kI, props.kD, props.target, props.paused, props.setPosition, props.setPower]);

  useEffect(() => {
    const engine = engineRef.current;
    const pendulum = pendulumRef.current;

    if (engine && pendulum) {
      pendulum.frictionAir = props.frictionAir;
      Body.setMass(pendulum, props.mass);
      if (!props.paused) engine.gravity = {scale: props.gravity / 1000, x: 0, y: 1};
    }

    return () => {};
  }, [props.frictionAir, props.mass, props.gravity]);

  return <div ref={canvasRef} className="canvas"></div>;
}
