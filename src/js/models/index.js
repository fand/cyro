import Cycle from '@cycle/core';
import { EventEmitter } from 'events';

const bpmToInterval = bpm => 60000 / bpm;

const timerModel = (actions) => {

  const changeInterval$ = actions.changeBPM$.map(bpmToInterval);

  let currentInterval;
  const eventEmitter = new EventEmitter();
  const ticker = () => {
    eventEmitter.emit('tick');
    setTimeout(ticker, currentInterval);
  };

  changeInterval$.subscribe((interval) => {
    currentInterval = interval;
  });
  ticker();

  const tick$ = Cycle.Rx.Observable.fromEvent(eventEmitter, 'tick');

  return {
    changeInterval$,
    tick$,
  };

};

export default function models (actions) {

  const timerState$ = timerModel(actions);
  timerState$.tick$.subscribe(tick => console.log('tick', tick));

  return Cycle.Rx.Observable.combineLatest(
    actions.changeBPM$.startWith(144),
    (bpm) => {
      return {
        bpm,
      };
    }
  );
}
