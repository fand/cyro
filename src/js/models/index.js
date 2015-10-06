import Cycle, {Rx} from '@cycle/core';
import { EventEmitter } from 'events';


const bpmToInterval = bpm => (60000 / bpm) * 4;

const timerModel = (actions) => {

  const interval$ = actions.changeBPM$.map(bpmToInterval);

  const loop$ = (() => {
    let currentInterval;
    const eventEmitter = new EventEmitter();
    const looper = () => {
      eventEmitter.emit('loop', 1);
      setTimeout(looper, currentInterval);
    };

    interval$.subscribe((interval) => {
      currentInterval = interval;
    });
    looper();

    return Rx.Observable.fromEvent(eventEmitter, 'loop').startWith(1);
  })();

  // loopの頭にintervalを生成
  const intervalForLoop$ = loop$.withLatestFrom(
    interval$,
    (loop, interval) => (interval)
  );

  // loop毎に4つ打ちを生成
  const beat$ = intervalForLoop$.flatMap((interval) =>
    Rx.Observable.interval(interval / 4).take(4)
  );

  // 64分音符
  const tick$ = intervalForLoop$.flatMap((interval) =>
    Rx.Observable.interval(interval / 64).take(4)
  );

  const dx$ = intervalForLoop$.map(interval => {
    const frames = interval / 16;
    return 1000 / frames;
  });

  return {
    interval$,
    loop$,
    beat$,
    tick$,
    dx$,
  };

};

export default function models (actions) {

  const timerModel$ = timerModel(actions);
  // timerModel$.beat$.subscribe(() => console.log('>>>>, ', Date.now()));
  return Cycle.Rx.Observable.combineLatest(
    actions.changeBPM$.startWith(144),
    timerModel$.dx$.startWith(0),
    (bpm, dx) => {
      return {
        bpm,
        dx,
      };
    }
  );
}
