/**
 * function: 60秒内（刚刚），60秒至60分钟（**分钟前），1小时至24小时（**小时前），1天至15天（**天前），其他为正常日期显示
 * @number   時間戳
 */
function formatMsgTime(number) {
  var dateTime = new Date(number); // 将传进来的字符串或者毫秒转为标准时间

  var Y = dateTime.getFullYear(); // 年

  var M = dateTime.getMonth() + 1; // 月

  var D = dateTime.getDate(); // 日

  var h = dateTime.getHours(); // 时

  var m = dateTime.getMinutes(); // 分

  var millisecond = dateTime.getTime(); // 将当前编辑的时间转换为毫秒

  var now = new Date(); // 获取本机当前的时间

  var nowNew = now.getTime(); // 将本机的时间转换为毫秒

  var milliseconds = 0;
  var numberStr;
  milliseconds = nowNew - millisecond;

  if (milliseconds <= 1000 * 60 * 1) {
    // 小于一分钟展示为刚刚
    numberStr = '刚刚';
  } else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
    // 大于一分钟小于一小时展示为分钟
    numberStr = Math.round(milliseconds / (1000 * 60)) + '分钟前';
  } else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
    // 大于一小时小于一天展示为小时
    numberStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
  } else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
    // 大于一天小于十五天展示位天
    numberStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
  } else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && Y === now.getFullYear()) {
    numberStr = M + '月' + D + '日' + ' ' + h + ':' + m;
  } else {
    numberStr = Y + '年' + M + '月' + D + '日' + ' ' + h + ':' + m;
  }

  return numberStr;
}
/**
 * function: 時間戳轉日期
 * @number   時間戳
 * @type     格式（1為年-月-日 時-分-秒，2為年-月-日）
 */


function toDate(number, type) {
  var date = new Date(number);
  var Y = date.getFullYear();
  var M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

  if (type == '1') {
    return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s;
  } else if (type == '2') {
    return Y + '-' + M + '-' + D;
  }
}

module.exports = {
  toDate: toDate,
  formatMsgTime: formatMsgTime
};