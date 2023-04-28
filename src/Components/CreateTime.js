export const CreateTime = (seconds) => {
  const time = new Date(seconds * 1000).toISOString().slice(11, 19);
  if (time.match(/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)) {
    return time;
  }
};
