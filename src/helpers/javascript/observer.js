import { removeFromArray } from '../utils';

function createObserver() {
  const listeners = [];
  const subscribe = (eventName, handler) => {
    listeners.push({
      eventName,
      handler,
    });

    // remove
    return () => {
      removeFromArray(listeners, e => e.handler === handler);
    };
  };
  const trigger = (name, params) => {
    listeners.forEach((e) => {
      if (e.eventName === name || e.eventName === '*') {
        e.handler.apply(null, [params]);
      }
    });
  };
  return {
    emit: trigger,
    on: subscribe,
  };
}

export default createObserver;
