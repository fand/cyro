import Cycle, {Rx} from '@cycle/core';
import { EventEmitter } from 'events';


const bpmToInterval = bpm => (60000 / bpm) * 4;

const timerModel = (actions) => {

  const interval$ = actions.changeBPM$.map(bpmToInterval);

  const tick$ = (() => {
    let currentInterval;
    const eventEmitter = new EventEmitter();
    const ticker = () => {
      eventEmitter.emit('tick');
      setTimeout(ticker, currentInterval);
    };

    interval$.subscribe((interval) => {
      currentInterval = interval;
    });
    ticker();

    return Rx.Observable.fromEvent(eventEmitter, 'tick').startWith(1);
  })();

  const tickAndInterval$ = Rx.Observable.combineLatest(tick$, interval$);

  // tick毎に4つ打ちを生成
  const beat$ = tickAndInterval$.flatMap(([tick, interval]) =>
    Rx.Observable.interval(interval / 4).take(4)
  );

  return {
    interval$,
    tick$,
    beat$,
  };

};

export default function models (actions) {

  const timerModel$ = timerModel(actions);
  timerModel$.beat$.subscribe(() => console.log('yoD', Date.now()));

  return Cycle.Rx.Observable.combineLatest(
    actions.changeBPM$.startWith(144),
    (bpm) => {
      return {
        bpm,
      };
    }
  );
}
