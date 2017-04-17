const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export function isDate(key) {
  return ~key.indexOf('created_at');
}

export function format(d, format) {
  const date = new Date(d);

  const DATES = {
    '%d': date.getDate(),
    '%m': date.getMonth() + 1,
    '%b': MONTHS[date.getMonth()].substr(0, 3),
    '%B': MONTHS[date.getMonth()],
    '%y': date.getFullYear().toString().slice(-2),
    '%Y': date.getFullYear()
  };

  return format.replace(/%(.)/g, (m) => DATES[m]);
}
