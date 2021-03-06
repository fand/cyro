/** @jsx hJSX */

import { hJSX } from '@cycle/dom';
import config   from './config';
import speaker  from './speaker';
import cyro     from './cyro';

export default function views (state$) {
  state$.subscribe(s => console.log('>state', s));
  return state$.map((state) =>
    <div>
      {cyro(state.cyro)}
      {speaker(state.cyro)}
      {config(state.config)}
    </div>
  );
}
