import { onResize } from '../helpers/dom/resize';

const { isClient, isServer } = global;

export const WIDTH_TABLET = 1199;
export const WIDTH_MOBILE = 767;

export function isTabletDown() {
  return isClient && window.innerWidth < WIDTH_TABLET;
}

export function isMobile() {
  return isClient && window.innerWidth < WIDTH_MOBILE;
}

export function isTablet() {
  return isClient && window.innerWidth <= WIDTH_TABLET && window.innerWidth > WIDTH_MOBILE;
}

export function isTabletUp() {
  return isClient && window.innerWidth > WIDTH_MOBILE;
}

export function isDesktop() {
  return isServer || (window.innerWidth > WIDTH_TABLET);
}

export function checkViewport() {
  const res = {};
  function check() {
    const functions = {
      isTabletDown,
      isMobile,
      isDesktop,
      isTablet,
      isTabletUp,
    };
    Object.entries(functions).map(([key, value]) => (res[key] = value()));
  }
  if (isClient) onResize(check);
  check();
  return res;
}
