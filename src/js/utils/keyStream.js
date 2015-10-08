import { Rx } from '@cycle/core';
import Mousetrap from 'mousetrap';

const createKeyStream = (pattern) => (
  Rx.Observable.fromCallback((callback) => Mousetrap.bind(pattern, callback))
);

export default createKeyStream;
