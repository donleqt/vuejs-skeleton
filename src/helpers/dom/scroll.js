import { safeRequestAnimationFrame } from './request-animation-frame';

const optimizedScroll = (function () {
  const callbacks = [];

  let running = false;

  // run the actual callbacks
  function runCallbacks() {
    callbacks.forEach((callback) => {
      callback();
    });

    running = false;
  }

  // adds callback to loop
  function addCallback(callback) {
    if (callback) {
      callbacks.push(callback);
    }
    return {
      remove: () => {
        const id = callbacks.findIndex(c => c === callback);
        if (id !== -1) {
          callbacks.splice(id, 1);
        }
      },
    };
  }
  // fired on resize event
  function scroll() {
    if (!running) {
      running = true;

      if (safeRequestAnimationFrame) {
        safeRequestAnimationFrame(runCallbacks);
      } else {
        setTimeout(runCallbacks, 66);
      }
    }
  }

  return {
    // public method to add additional callback
    add(callback) {
      if (!callbacks.length) {
        window.addEventListener('scroll', scroll);
      }
      return addCallback(callback);
    },
  };
}());

export function onScroll(callback) {
  return optimizedScroll.add(callback);
}
