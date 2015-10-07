/** @jsx hJSX */

const ctx = new AudioContext();

import { EventEmitter } from 'events';
class Sample extends EventEmitter {

  constructor (url) {
    super();

    this.on('sampleLoadSucceeded', (buffer) => {
      this.buffer = buffer;
    });

    this.loadSample(url);
  }

  play (time = 0) {
    if (this.node) { this.node.stop(0); }
    this.node = ctx.createBufferSource();
    this.node.buffer = this.buffer;
    this.node.connect(ctx.destination);
    this.node.start(time);
  }

  loadSample (url) {
    this.basename = url.split('/').pop();

    var req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.responseType = 'arraybuffer';

    req.onload = () => {
      if (!req.response) {
        this.emit('sampleLoadFailed', new Error('no response'));
      }
      ctx.decodeAudioData(req.response, (buffer) => {
        this.emit('sampleLoadSucceeded', buffer);
      }, (err) => {
        this.emit('sampleLoadFailed', err);
      });
    };

    req.send();
  }

}

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
