import Sample from '../entities/Sample';

const kick = new Sample('./wav/kick.wav');

const keys = ['Z', 'X', 'C', 'V', 'B', 'N'];
const sounds = {};
keys.forEach((key) => {
  sounds[key] = new Sample(`./wav/${key}.wav`);
});

const state = {
  snares    : {},
  startTime : performance.now(),
  interval  : 1000,
  played    : {},
};

const play = (timestamp) => {
  const t = timestamp - state.startTime;

  Object.keys(state.snares).forEach((key, j) => {
    const sample = sounds[key];

    for (let i = 0; i < state.snares[key].length; i++) {

      if (state.played[key][i]) { continue; }
      const offset = state.snares[key][i] / 64 * state.interval;
      const diff = t - offset;

      if (0 < diff && diff < 100) {
        sample.play(diff / 1000);
        state.played[key][i] = true;
      }

    }
  });

  requestAnimationFrame(play);

};
requestAnimationFrame(play);

export default function speaker ({ interval, startTime, snares }) {
  state.interval  = interval;
  state.startTime = startTime;
  state.snares    = snares;

  state.played = {};
  Object.keys(snares).forEach((k) => {
    state.played[k] = [];
  });
}
