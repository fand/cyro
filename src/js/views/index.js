import bpmSlider from './bpmSlider';

export default function views (state$) {
  return state$.map(({ bpm }) =>
    bpmSlider(bpm)
  );
}
