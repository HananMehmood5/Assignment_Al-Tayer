const debounce = (
  operation,
  delay,
) => {
  let timeoutId = null;

  return (...args) => {
    if (timeoutId != null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      operation(...args);
      timeoutId = null;
    }, delay);
  };
};

export default debounce;
