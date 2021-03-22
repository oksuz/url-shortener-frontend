import config from '../config';

function isPathLike(val) {
  return `${val}`.indexOf('/') === 0;
}

export function getActualShortUrl(value) {
  if (isPathLike(value)) {
    return config.API_URL + value;
  }

  return value;
}
