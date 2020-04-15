const Helper = {};

Helper.leadingZero = num => `0${num}`.slice(-2);

Helper.leadingDate = (date, time) => {
  const formatMonth = Helper.leadingZero(date.getMonth() + 1);
  const formatDate = Helper.leadingZero(date.getDate());
  const formatYear = date.getFullYear();
  const H = Helper.leadingZero(date.getHours());
  const M = Helper.leadingZero(date.getMinutes());
  const S = Helper.leadingZero(date.getSeconds());
  const t = time ? `${H}:${M}:${S}` : '';
  return `${formatMonth}/${formatDate}/${formatYear} ${t}`;
};

Helper.logDateFormat = (date, time) => Helper.leadingDate(date, time);

module.exports = Helper;
