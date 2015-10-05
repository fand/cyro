import Cycle from '@cycle/core';
import { EventEmitter } from 'events';

const bpmToInterval = bpm => (60000 / bpm) * 4;

const timerModel = (actions) => {

  const changeInterval$ = actions.changeBPM$.map(bpmToInterval);

  let currentInterval;
  let lastInterval = 0;
  const eventEmitter = new EventEmitter();
  const ticker = () => {
    eventEmitter.emit('tick');
    setTimeout(ticker, currentInterval);
  };

  // changeInterval$.subscribe((interval) => {
  // });
  ticker();

  const tick$ = Cycle.Rx.Observable.fromEvent(eventEmitter, 'tick').startWith(1);

  let tickTime = Date.now();
  tick$.subscribe(() => {
    tickTime = Date.now();
  });

  // Convert to CSS
  const css$ = changeInterval$.map((interval) => {
    lastInterval    = currentInterval;
    currentInterval = interval;

    const now      = Date.now();
    const past     = now - tickTime;
    const remain   = lastInterval - past;
    const nowRatio = past / lastInterval;

    return {
      left      : `${nowRatio * 100}%`,
      animation : `cyro ${interval / 1000}s linear -${remain / 1000}s infinite`,
    };
  });

  return {
    changeInterval$,
    tick$,
    css$,
  };

};

export default function models (actions) {

  const timerState$ = timerModel(actions);

  return Cycle.Rx.Observable.combineLatest(
    actions.changeBPM$.startWith(144),
    timerState$.css$,
    (bpm, css) => {
      return {
        bpm,
        css,
      };
    }
  );
}
