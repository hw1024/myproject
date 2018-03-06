'use strict';

function formatTime(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();

  return [year, month, day].map(formatNumber).join('-');
}

function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
}

function strToJson(str) {
  var json = new Function("return " + str)();
  return json;
}

function formatRand(n) {
  var num = Math.floor(Math.random() * n);
  return num;
}

module.exports = {
  formatTime: formatTime,
  formatRand: formatRand,
  strToJson: strToJson
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwuanMiXSwibmFtZXMiOlsiZm9ybWF0VGltZSIsImRhdGUiLCJ5ZWFyIiwiZ2V0RnVsbFllYXIiLCJtb250aCIsImdldE1vbnRoIiwiZGF5IiwiZ2V0RGF0ZSIsImhvdXIiLCJnZXRIb3VycyIsIm1pbnV0ZSIsImdldE1pbnV0ZXMiLCJzZWNvbmQiLCJnZXRTZWNvbmRzIiwibWFwIiwiZm9ybWF0TnVtYmVyIiwiam9pbiIsIm4iLCJ0b1N0cmluZyIsInN0clRvSnNvbiIsInN0ciIsImpzb24iLCJGdW5jdGlvbiIsImZvcm1hdFJhbmQiLCJudW0iLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLFNBQVNBLFVBQVQsQ0FBb0JDLElBQXBCLEVBQTBCO0FBQ3hCLE1BQUlDLE9BQU9ELEtBQUtFLFdBQUwsRUFBWDtBQUNBLE1BQUlDLFFBQVFILEtBQUtJLFFBQUwsS0FBa0IsQ0FBOUI7QUFDQSxNQUFJQyxNQUFNTCxLQUFLTSxPQUFMLEVBQVY7O0FBRUEsTUFBSUMsT0FBT1AsS0FBS1EsUUFBTCxFQUFYO0FBQ0EsTUFBSUMsU0FBU1QsS0FBS1UsVUFBTCxFQUFiO0FBQ0EsTUFBSUMsU0FBU1gsS0FBS1ksVUFBTCxFQUFiOztBQUdBLFNBQU8sQ0FBQ1gsSUFBRCxFQUFPRSxLQUFQLEVBQWNFLEdBQWQsRUFBbUJRLEdBQW5CLENBQXVCQyxZQUF2QixFQUFxQ0MsSUFBckMsQ0FBMEMsR0FBMUMsQ0FBUDtBQUNEOztBQUVELFNBQVNELFlBQVQsQ0FBc0JFLENBQXRCLEVBQXlCO0FBQ3ZCQSxNQUFJQSxFQUFFQyxRQUFGLEVBQUo7QUFDQSxTQUFPRCxFQUFFLENBQUYsSUFBT0EsQ0FBUCxHQUFXLE1BQU1BLENBQXhCO0FBQ0Q7O0FBRUQsU0FBU0UsU0FBVCxDQUFtQkMsR0FBbkIsRUFBdUI7QUFDdEIsTUFBSUMsT0FBUSxJQUFJQyxRQUFKLENBQWEsWUFBWUYsR0FBekIsQ0FBRCxFQUFYO0FBQ0EsU0FBT0MsSUFBUDtBQUNBOztBQUVELFNBQVNFLFVBQVQsQ0FBb0JOLENBQXBCLEVBQXNCO0FBQ3BCLE1BQUlPLE1BQU1DLEtBQUtDLEtBQUwsQ0FBV0QsS0FBS0UsTUFBTCxLQUFnQlYsQ0FBM0IsQ0FBVjtBQUNELFNBQU9PLEdBQVA7QUFDQTs7QUFFREksT0FBT0MsT0FBUCxHQUFpQjtBQUNmN0IsY0FBWUEsVUFERztBQUVmdUIsY0FBWUEsVUFGRztBQUdmSixhQUFXQTtBQUhJLENBQWpCIiwiZmlsZSI6InV0aWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBmb3JtYXRUaW1lKGRhdGUpIHtcclxuICB2YXIgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKVxyXG4gIHZhciBtb250aCA9IGRhdGUuZ2V0TW9udGgoKSArIDFcclxuICB2YXIgZGF5ID0gZGF0ZS5nZXREYXRlKClcclxuXHJcbiAgdmFyIGhvdXIgPSBkYXRlLmdldEhvdXJzKClcclxuICB2YXIgbWludXRlID0gZGF0ZS5nZXRNaW51dGVzKClcclxuICB2YXIgc2Vjb25kID0gZGF0ZS5nZXRTZWNvbmRzKClcclxuXHJcblxyXG4gIHJldHVybiBbeWVhciwgbW9udGgsIGRheV0ubWFwKGZvcm1hdE51bWJlcikuam9pbignLScpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZvcm1hdE51bWJlcihuKSB7XHJcbiAgbiA9IG4udG9TdHJpbmcoKVxyXG4gIHJldHVybiBuWzFdID8gbiA6ICcwJyArIG5cclxufVxyXG5cclxuZnVuY3Rpb24gc3RyVG9Kc29uKHN0cil7IFxyXG4gdmFyIGpzb24gPSAobmV3IEZ1bmN0aW9uKFwicmV0dXJuIFwiICsgc3RyKSkoKTsgXHJcbiByZXR1cm4ganNvbjsgXHJcbn0gXHJcblxyXG5mdW5jdGlvbiBmb3JtYXRSYW5kKG4pe1xyXG4gIHZhciBudW0gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBuKVxyXG4gcmV0dXJuIG51bTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgZm9ybWF0VGltZTogZm9ybWF0VGltZSxcclxuICBmb3JtYXRSYW5kOiBmb3JtYXRSYW5kLFxyXG4gIHN0clRvSnNvbjogc3RyVG9Kc29uXHJcbn1cclxuIl19