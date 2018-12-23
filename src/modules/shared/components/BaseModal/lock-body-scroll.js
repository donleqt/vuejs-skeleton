const lockBodyScroll = {
  shouldLock() {
    // return navigator && /iPad|iPhone|iPod/.test(navigator.userAgent);
    return true;
  },
  lock() {
    if (lockBodyScroll.shouldLock()) {
      const offset = window.scrollY;
      document.body.style.top = `${offset * -1}px`;
      document.body.classList.add('body-locked');
    }
  },
  unlock() {
    if (lockBodyScroll.shouldLock()) {
      const offset = parseInt(document.body.style.top, 10);
      document.body.classList.remove('body-locked');
      document.body.style.top = 0;
      window.scrollTo(0, offset * -1);
    }
  },
};

export default lockBodyScroll;
