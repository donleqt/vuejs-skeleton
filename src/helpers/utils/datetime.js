/* eslint-disable */

export function formatDate(date, format) {
  date = new Date(date);
  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    getPaddedComp = (comp) => {
      return ((parseInt(comp) < 10) ? (`0${  comp}`) : comp);
    },
    formattedDate = format,
    o = {
      'y+': date.getFullYear(), // year
      'M+': months[date.getMonth()], // month
      'm+': getPaddedComp(date.getMonth() + 1), // month
      'd+': getPaddedComp(date.getDate()), // day
      'h+': getPaddedComp((date.getHours() > 12) ? date.getHours() % 12 : date.getHours()), // hour
      'H+': getPaddedComp(date.getHours()), // hour
      'i+': getPaddedComp(date.getMinutes()), // minute
      's+': getPaddedComp(date.getSeconds()), // second
      'S+': getPaddedComp(date.getMilliseconds()), // millisecond,
      'b+': (date.getHours() >= 12) ? 'PM' : 'AM',
    };

  for (const k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      formattedDate = formattedDate.replace(RegExp.$1, o[k]);
    }
  }
  return formattedDate;
}

export function stringToDate(date, format, delimiter = '.') {
  const formatLowerCase = format.toLowerCase();
  const formatItems = formatLowerCase.split(delimiter);
  const dateItems = date.split(delimiter);
  const monthIndex = formatItems.indexOf('mm');
  const dayIndex = formatItems.indexOf('dd');
  const yearIndex = formatItems.indexOf('yyyy');
  let month = parseInt(dateItems[monthIndex]);
  month -= 1;
  return new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
}

export function addDays(date, nDays) {
  return date.setTime(date.getTime() + (24*nDays*60*60*1000)); 
}

export function addHours(date, nHours) {
  return date.setTime(date.getTime() + (nHours*60*60*1000)); 
}
