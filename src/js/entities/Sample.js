import { EventEmitter } from 'events';
import ctx from './Ctx';

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

export default Sample;
