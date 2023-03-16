export const getQueryString = (key: string) => {
  return new URLSearchParams(window.location.search).get(key);
};
