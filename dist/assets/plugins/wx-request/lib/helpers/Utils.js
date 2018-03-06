'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * 合并路径
 * @param {string} baseURL 基础路径
 * @param {string} relativeURL 相对路径
 * @returns {string} 合并后的路径
 */
var combineURLs = function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
};

/**
 * 判断是否绝对路径
 * @param {string} url 路径
 * @returns {boolean} 返回真值表示绝对路径，假值表示非绝对路径
 */
var isAbsoluteURL = function isAbsoluteURL(url) {
  return (/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
  );
};

exports.default = {
  combineURLs: combineURLs,
  isAbsoluteURL: isAbsoluteURL
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlV0aWxzLmpzIl0sIm5hbWVzIjpbImNvbWJpbmVVUkxzIiwiYmFzZVVSTCIsInJlbGF0aXZlVVJMIiwicmVwbGFjZSIsImlzQWJzb2x1dGVVUkwiLCJ0ZXN0IiwidXJsIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOzs7Ozs7QUFNQSxJQUFNQSxjQUFjLFNBQWRBLFdBQWMsQ0FBQ0MsT0FBRCxFQUFVQyxXQUFWLEVBQTBCO0FBQzdDLFNBQU9BLGNBQWNELFFBQVFFLE9BQVIsQ0FBZ0IsTUFBaEIsRUFBd0IsRUFBeEIsSUFBOEIsR0FBOUIsR0FBb0NELFlBQVlDLE9BQVosQ0FBb0IsTUFBcEIsRUFBNEIsRUFBNUIsQ0FBbEQsR0FBb0ZGLE9BQTNGO0FBQ0EsQ0FGRDs7QUFJQTs7Ozs7QUFLQSxJQUFNRyxnQkFBZ0IsU0FBaEJBLGFBQWdCLE1BQU87QUFDNUIsU0FBTyxpQ0FBZ0NDLElBQWhDLENBQXFDQyxHQUFyQztBQUFQO0FBQ0EsQ0FGRDs7a0JBSWU7QUFDZE4sMEJBRGM7QUFFZEk7QUFGYyxDIiwiZmlsZSI6IlV0aWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIOWQiOW5tui3r+W+hFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCDln7rnoYDot6/lvoRcclxuICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aXZlVVJMIOebuOWvuei3r+W+hFxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfSDlkIjlubblkI7nmoTot6/lvoRcclxuICovXHJcbmNvbnN0IGNvbWJpbmVVUkxzID0gKGJhc2VVUkwsIHJlbGF0aXZlVVJMKSA9PiB7XHJcblx0cmV0dXJuIHJlbGF0aXZlVVJMID8gYmFzZVVSTC5yZXBsYWNlKC9cXC8rJC8sICcnKSArICcvJyArIHJlbGF0aXZlVVJMLnJlcGxhY2UoL15cXC8rLywgJycpIDogYmFzZVVSTFxyXG59XHJcblxyXG4vKipcclxuICog5Yik5pat5piv5ZCm57ud5a+56Lev5b6EXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwg6Lev5b6EXHJcbiAqIEByZXR1cm5zIHtib29sZWFufSDov5Tlm57nnJ/lgLzooajnpLrnu53lr7not6/lvoTvvIzlgYflgLzooajnpLrpnZ7nu53lr7not6/lvoRcclxuICovXHJcbmNvbnN0IGlzQWJzb2x1dGVVUkwgPSB1cmwgPT4ge1xyXG5cdHJldHVybiAvXihbYS16XVthLXpcXGRcXCtcXC1cXC5dKjopP1xcL1xcLy9pLnRlc3QodXJsKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcblx0Y29tYmluZVVSTHMsXHJcblx0aXNBYnNvbHV0ZVVSTCxcclxufSJdfQ==