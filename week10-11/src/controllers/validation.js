const timeStringToSeconds = (timeString) => {
  const t = timeString.split(':'); // split it at the colons
  const seconds = (+t[0]) * 60 + (+t[1]);
  return seconds;
}

const secondsToTimeString = (time) => {
  let minutes = Math.floor(time / 60);
  const seconds = time - (minutes * 60);

  minutes = minutes.toString();
  let secs = seconds.toString();

  if (minutes.length < 2) {
    minutes = `0${minutes}`;
  }

  if (secs.length < 2) {
    secs = `0${secs}`;
  }

  return `${minutes}:${secs}`
}

const validateName = (clipName) => {
  if (clipName.length === 0 || clipName.length > 11) {
    return false
  }
  return true

}

const validateTimes = (endTime, startTime) => {
  const start = timeStringToSeconds(startTime);
  const end = timeStringToSeconds(endTime);
  const duration = 52;
  if (isNaN(start) || isNaN(end)) {
    return false;
  }

  if (end > duration || start > duration) {
    return false;
  }

  if (end < start) {
    return false;
  }

  return true;
};

const zeroFill = (activeClip) => {

  const clip = activeClip;

  if (clip.startTime.length < 2) {
    clip.startTime = `0${clip.startTime}`;
  }

  if (clip.endTime.length < 2) {
    clip.endTime = `0${clip.endTime}`;
  }

  return clip;

}

export {
  validateTimes,
  zeroFill,
  timeStringToSeconds,
  secondsToTimeString,
  validateName,
}