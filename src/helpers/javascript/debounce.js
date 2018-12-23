/* eslint-disable prefer-rest-params */
/**
 * Debounce is a solution to prevent function was called and executes too many times in a frame.
 */
function debounce(func, wait, immediate) {
  let timeout;
  return function wrappedFunction() {
    const context = this;
    const args = arguments;

    function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

export default debounce;
