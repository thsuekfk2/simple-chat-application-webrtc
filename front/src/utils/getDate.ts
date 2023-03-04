export const getNowTime = () => {
  const now = new Date();
  const formattedTime = now.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  return { formattedTime };
};
