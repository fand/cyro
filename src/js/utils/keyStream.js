import { Rx } from '@cycle/core';
import { EventEmitter } from 'events';

const KEYMAP = {
  8   : 'BackSpace',
  9   : 'Tab',
  13  : 'Return',
  16  : 'Shift',
  27  : 'Esc',
  32  : 'Space',
  33  : 'PageUp',
  34  : 'PageDown',
  35  : 'End',
  36  : 'Home',
  37  : 'Left',
  38  : 'Up',
  39  : 'Right',
  40  : 'Down',
  45  : 'Insert',
  46  : 'Delete',
  48  : '0',
  49  : '1',
  50  : '2',
  51  : '3',
  52  : '4',
  53  : '5',
  54  : '6',
  55  : '7',
  56  : '8',
  57  : '9',
  65  : 'A',
  66  : 'B',
  67  : 'C',
  68  : 'D',
  69  : 'E',
  70  : 'F',
  71  : 'G',
  72  : 'H',
  73  : 'I',
  74  : 'J',
  75  : 'K',
  76  : 'L',
  77  : 'M',
  78  : 'N',
  79  : 'O',
  80  : 'P',
  81  : 'Q',
  82  : 'R',
  83  : 'S',
  84  : 'T',
  85  : 'U',
  86  : 'V',
  87  : 'W',
  88  : 'X',
  89  : 'Y',
  90  : 'Z',
  112 : 'F1',
  113 : 'F2',
  114 : 'F3',
  115 : 'F4',
  116 : 'F5',
  117 : 'F6',
  118 : 'F7',
  119 : 'F8',
  120 : 'F9',
  121 : 'F10',
  122 : 'F11',
  123 : 'F12',
  188 : ',',
  190 : '.',
  191 : '/',
};

const emitter = new EventEmitter();

window.addEventListener('keydown', (e) => {
  emitter.emit('keydown', KEYMAP[e.keyCode]);
});

window.addEventListener('keyup', (e) => {
  emitter.emit('keyup', KEYMAP[e.keyCode]);
});

const keydown$ = Rx.Observable.fromEvent(emitter, 'keydown');
const keyup$   = Rx.Observable.fromEvent(emitter, 'keyup');

export default {
  keydown$,
  keyup$,
};
