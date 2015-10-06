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

  const timestamp$ = loop$.map(() => performance.now());

  const stateForLoop$ = loop$.flatMap(() =>
    Rx.Observable.combineLatest(
      interval$,
      timestamp$,
    )
  );

  return {
    interval$,
    intervalForLoop$,
    stateForLoop$,
  };

};

export default function models (actions) {

  const timerModel$ = timerModel(actions);

  return Cycle.Rx.Observable.combineLatest(
    actions.changeBPM$.startWith(144),
    timerModel$.stateForLoop$,
    (bpm, cyro) => {
      return {
        bpm,
        cyro,
      };
    }
  );
}
