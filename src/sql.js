// http://stackoverflow.com/a/5133807
function twoDigits(d) {
  if (d >= 0 && d < 10) return `0${d.toString()}`;
  if (d > -10 && d < 0) return `-0${(-1 * d).toString()}`;
  return d.toString();
}

export function formatTimestamp(date) {
  return `(TIMESTAMP '${date.getUTCFullYear()}-${twoDigits(
    1 + date.getUTCMonth()
  )}-${twoDigits(date.getUTCDate())} ${twoDigits(
    date.getUTCHours()
  )}:${twoDigits(date.getUTCMinutes())}:${twoDigits(
    date.getUTCSeconds()
  )} UTC' AT TIME ZONE SESSIONTIMEZONE)`;
}
