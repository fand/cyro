import { Rx } from '@cycle/core';
import { EventEmitter } from 'events';

const bpmToInterval = bpm => (60000 / bpm) * 4;

/**
 * Manages timer and interval.
 * @param {Observable} actions.changeBPM$
 * @param {Observable} actions.setLoopCount$
 * @return {Object}
 */
const timerModel = (actions) => {

  const interval$ = actions.changeBPM$.map(bpmToInterval).startWith(bpmToInterval(144));

  const loop$ = (() => {
    let currentInterval;
    let loopIndex = 0;
    let loopCount = 1;

    const eventEmitter = new EventEmitter();
    const looper = () => {
      eventEmitter.emit('loop', loopIndex++ % loopCount);
      setTimeout(looper, currentInterval);
    };
    looper();

    interval$.subscribe((interval) => {
      currentInterval = interval;
    });
    actions.setLoopCount$.subscribe(l => {
      loopCount = l;
      loopIndex = 0;
    });

    return Rx.Observable.fromEvent(eventEmitter, 'loop').startWith(0);
  })();

  // Set timestamp only on loop start
  const timestamp$ = loop$.filter(x => x === 0).map(::performance.now);

  return {
    interval$,
    loop$,
    timestamp$,
  };
};

export default timerModel;
