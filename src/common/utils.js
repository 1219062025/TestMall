export function debounce(func, delay = 200) {
  let timer;
  return function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func(...arguments);
    }, delay);
  };
}