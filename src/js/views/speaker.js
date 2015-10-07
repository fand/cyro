import Sample from '../entities/Sample';

const kick = new Sample('./wav/kick.wav');

const state = {
  offsets   : [],
  startTime : performance.now(),
  interval  : 1000,
  played    : [],
};

const play = (timestamp) => {
  const t = timestamp - state.startTime;

  for (let i = 0; i < state.offsets.length; i++) {
    if (state.played[i]) { continue; }
    const offset = state.offsets[i] / 64 * state.interval;
    const diff = t - offset;

    if (0 < diff && diff < 100) {
      kick.play(diff / 1000);
      state.played[i] = true;
    }
  }

  requestAnimationFrame(play);

};
requestAnimationFrame(play);

export default function speaker ({ interval, startTime, notes }) {
  state.interval  = interval;
  state.startTime = startTime;
  state.offsets   = notes;
  state.played    = notes.map(() => false);
}
