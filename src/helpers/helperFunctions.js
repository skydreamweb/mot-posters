const getLSData = item => {
  return JSON.parse(localStorage.getItem(item))
    ? JSON.parse(localStorage.getItem(item))
    : [];
};
export { getLSData };