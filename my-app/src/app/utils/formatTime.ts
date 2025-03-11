const formatTime = (timeInSeconds: number) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds - minutes * 60;

  const minuteStr = minutes < 10 ? `0${minutes}` : minutes;

  return `${minuteStr}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

export default formatTime;
