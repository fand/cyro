/** @jsx hJSX */

import { hJSX } from '@cycle/dom';

const W = 1000;
const H = 1000;

const canvas = document.createElement('canvas');
canvas.setAttribute('width',  W);
canvas.setAttribute('height', H);
canvas.setAttribute('class', 'Cyro');
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

const state = {
  dx : 0,
  positions : [0],
};

const draw = () => {
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#000000';
  for (let i = 0; i < state.positions.length; i++) {
    const x = state.positions[i];
    ctx.fillRect(x, i * 100, state.dx, 100);
    state.positions[i] = (state.positions[i] + state.dx) % W;
  }
  requestAnimationFrame(draw);
};
draw();

export default function cyro (dx) {
  console.log(dx);
  state.dx = dx;
}
