/** @jsx hJSX */

const W = 1000;
const H = 1000;

const canvas = document.createElement('canvas');
canvas.setAttribute('width',  W);
canvas.setAttribute('height', H);
canvas.setAttribute('class', 'Cyro');
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

const state = {
  offsets : [0, 16, 32, 48],
  startTime : performance.now(),
  interval  : 1000,
};

const draw = (timestamp) => {
  const t = (timestamp - state.startTime) / state.interval;
  const x = t * W;

  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#000000';

  for (let i = 0; i < state.offsets.length; i++) {
    const offset = -state.offsets[i] / 64 * W;
    ctx.fillRect(x + offset, 0, 10, 100);
    ctx.fillRect(x + offset + W - 10, 0, 10, 100);
  }

  requestAnimationFrame(draw);
};

requestAnimationFrame(draw);

export default function cyro ([interval, startTime]) {
  state.interval  = interval;
  state.startTime = startTime;
}
