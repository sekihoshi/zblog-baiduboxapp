/*

本文件由天行数据在2021-09-05 14:54:05时自动生成，如无必要请忽修改
微信：txapibot
接口名称：备案信息查询
文档地址：https://www.tianapi.com/apiview/118

*/
var TXAPI_BASE_URL = 'https://api.tianapi.com'; //天行数据接口域名,官网www.tianapi.com

var TXAPI_KEY = 'e760f3d6f4fc7ec07d0ac0cc93808cbe'; //请填写你在控制台获得的apikey

function formatTime(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
}

function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
}

module.exports = {
  formatTime: formatTime,
  TXAPI_BASE_URL: TXAPI_BASE_URL,
  TXAPI_KEY: TXAPI_KEY
};