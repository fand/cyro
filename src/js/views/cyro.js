/** @jsx hJSX */

import { hJSX } from '@cycle/dom';

/**
 * @param {number} bpm
 */
export default function cyro (css) {
  return (
    <div className="Cyro">
      <div className="Cyro__Pad" style={css}/>
    </div>
  );
}
