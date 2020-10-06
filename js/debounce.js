(function () {
  const DEBOUNCE_INTERVAL = 500;

  window.debounce = function (fun) {
    let lastTimeout = null;

    return function () {
      const args = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(() => {
        fun.apply(null, args);
      }, DEBOUNCE_INTERVAL);
    };
  };
}());


