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
  notes     : {},
  startTime : performance.now(),
  interval  : 1000,
  loops     : 1,
};

const draw = (timestamp) => {
  const t = (timestamp - state.startTime) / state.interval;
  const x = t * W;

  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#000000';

  const nu = [0, 3, 5, -2, 7, 11, 8];
  Object.keys(state.notes).forEach((key, j) => {
    const n = nu[j];
    for (let i = 0; i < state.notes[key].length; i++) {
      const offset = -state.notes[key][i] / 64 * W;
      ctx.fillRect(x + offset + n, j * 200, 20, 200);
      ctx.fillRect(x + offset + n + W * state.loops - 10, j * 200, 20, 200);
    }
  });

  requestAnimationFrame(draw);
};

requestAnimationFrame(draw);

const cyro = ({ interval, startTime, notes, loops }) => {
  state.interval  = interval;
  state.startTime = startTime;
  state.notes     = notes;
  state.loops     = loops;
};

export default cyro;
