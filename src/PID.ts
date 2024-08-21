export default class PIDController {
  kP: number;
  kI: number;
  kD: number;
  target: number;
  prev: number;
  integral: number;

  constructor(kP, kI, kD, initial, target) {
    this.kP = kP;
    this.kI = kI;
    this.kD = kD;

    this.target = target;
    this.prev = target - initial;
    this.integral = 0;
  }

  step(state, timestep) {
    const error = this.target - state;
    const derivative = (error - this.prev) / timestep;

    this.prev = error;
    this.integral += error;

    const power = this.kP * error + this.kI * this.integral + this.kD * derivative;

    return power;
  }
}