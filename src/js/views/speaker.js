import Sample from '../entities/Sample';

// Load sounds.
const keys = `
  Q W E R T Y U I O P
  A S D F G H J K L
  Z X C V B N M
`.split(/\s+/);
const sounds = {};
keys.forEach((key) => {
  sounds[key] = new Sample(`./wav/${key}.wav`);
});

const state = {
  notes     : {},
  startTime : performance.now(),
  interval  : 1000,
  played    : {},
};

const play = (timestamp) => {
  const t = timestamp - state.startTime;

  Object.keys(state.notes).forEach((key, j) => {
    const sample = sounds[key];
    if (!sample) { return; }

    for (let i = 0; i < state.notes[key].length; i++) {

      if (state.played[key][i]) { continue; }
      const offset = state.notes[key][i] / 64 * state.interval;
      const diff   = t - offset;

      if (0 < diff && diff < 100) {
        sample.play(diff / 1000);
        state.played[key][i] = true;
      }

    }
  });

  requestAnimationFrame(play);

};
requestAnimationFrame(play);

export default function speaker ({ interval, startTime, notes }) {
  state.interval  = interval;
  state.startTime = startTime;
  state.notes     = notes;

  state.played = {};
  Object.keys(notes).forEach((k) => {
    state.played[k] = [];
  });
}
