import { Engine, Render, Runner, Events, Bodies, Composite, Constraint } from 'matter-js';
import PIDController from './PID.js'

const innerWidth = 1000
const innerHeight = 1000

const canvas = document.body;
const engine = Engine.create({gravity: {x: 0, y: 0}});
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
  pointA: { x: innerWidth / 2, y: innerHeight / 2 - length / 2 }, // Fixed point above the pendulum
  bodyB: pendulum,
  pointB: { x: 0, y: -length / 2 }, // Attach to the top of the pendulum
  length: 0,
  stiffness: 1,
  render: { strokeStyle: '#778' }
});

Composite.add(engine.world,[pendulum, pendulumConstraint]);

Render.run(render);
Runner.run(runner, engine);

Render.lookAt(render, {
  min: { x: 0, y: 0 },
  max: { x: innerWidth, y: innerHeight }
});

function bound(value, lower = null, upper = null) {
  if (lower && value < lower) {
    return lower;
  } else if (upper && value > upper) {
    return upper;
  }
  return value;
}

const pid = new PIDController(0.7, 0, 10, 0, Math.PI);

function Pendulum({ target }) {
  pid.reset(pendulum.angle, target);
  Events.on(engine, 'afterUpdate', () => {
    const input = bound(pid.step(pendulum.angle, 1));
    pendulum.torque = input;
  });
  
  return;
}

export default Pendulum;