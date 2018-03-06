'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Utils = require('./../helpers/Utils.js');

var _Utils2 = _interopRequireDefault(_Utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 注册路由
 * 
 * @param {String} template url 路径
 * @param {Object} defaults 参数对象
 * 
 */
var RouteManager = function () {
    function RouteManager() {
        var template = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var defaults = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, RouteManager);

        Object.assign(this, {
            template: template,
            defaults: defaults
        });
        this.__init();
    }

    _createClass(RouteManager, [{
        key: '__init',
        value: function __init() {
            this.urlParams = {};
        }
    }, {
        key: 'setUrlParams',
        value: function setUrlParams(config, params, actionUrl) {
            var _this = this;

            var PROTOCOL_AND_DOMAIN_REGEX = /^https?:\/\/[^\/]*/;
            var url = actionUrl || this.template,
                val = void 0,
                encodedVal = void 0,
                protocolAndDomain = '',
                urlParams = this.urlParams;

            _Utils2.default.each(url.split(/\W/), function (param, key) {
                if (param === 'hasOwnProperty') {
                    throw 'hasOwnProperty is not a valid parameter name.';
                }
                if (!new RegExp('^\\d+$').test(param) && param && new RegExp('(^|[^\\\\]):' + param + '(\\W|$)').test(url)) {
                    urlParams[param] = {
                        isQueryParamValue: new RegExp('\\?.*=:' + param + '(?:\\W|$)').test(url)
                    };
                }
            });

            url = url.replace(/\\:/g, ':');
            url = url.replace(PROTOCOL_AND_DOMAIN_REGEX, function (match) {
                protocolAndDomain = match;
                return '';
            });

            params = params || {};

            _Utils2.default.each(this.urlParams, function (paramInfo, urlParam) {
                val = params.hasOwnProperty(urlParam) ? params[urlParam] : _this.defaults[urlParam];
                if (_Utils2.default.isDefined(val) && val !== null) {
                    if (paramInfo.isQueryParamValue) {
                        encodedVal = _Utils2.default.encodeUriQuery(val, true);
                    } else {
                        encodedVal = _Utils2.default.encodeUriSegment(val);
                    }
                    url = url.replace(new RegExp(':' + urlParam + '(\\W|$)', 'g'), function (match, p1) {
                        return encodedVal + p1;
                    });
                } else {
                    url = url.replace(new RegExp('(/?):' + urlParam + '(\\W|$)', 'g'), function (match, leadingSlashes, tail) {
                        if (tail.charAt(0) === '/') {
                            return tail;
                        } else {
                            return leadingSlashes + tail;
                        }
                    });
                }
            });

            // strip trailing slashes and set the url (unless this behavior is specifically disabled)
            if (this.defaults.stripTrailingSlashes) {
                url = url.replace(/\/+$/, '') || '/';
            }

            // then replace collapse `/.` if found in the last URL path segment before the query
            // E.g. `http://url.com/id./format?q=x` becomes `http://url.com/id.format?q=x`
            url = url.replace(/\/\.(?=\w+($|\?))/, '.');

            // replace escaped `/\.` with `/.`
            config.url = protocolAndDomain + url.replace(/\/\\\./, '/.');

            // set params - delegate param encoding to $http
            _Utils2.default.each(params, function (value, key) {
                if (!_this.urlParams[key]) {
                    config.data = config.data || {};
                    config.data[key] = value;
                }
            });
        }
    }]);

    return RouteManager;
}();

exports.default = RouteManager;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJvdXRlTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJSb3V0ZU1hbmFnZXIiLCJ0ZW1wbGF0ZSIsImRlZmF1bHRzIiwiT2JqZWN0IiwiYXNzaWduIiwiX19pbml0IiwidXJsUGFyYW1zIiwiY29uZmlnIiwicGFyYW1zIiwiYWN0aW9uVXJsIiwiUFJPVE9DT0xfQU5EX0RPTUFJTl9SRUdFWCIsInVybCIsInZhbCIsImVuY29kZWRWYWwiLCJwcm90b2NvbEFuZERvbWFpbiIsImVhY2giLCJzcGxpdCIsInBhcmFtIiwia2V5IiwiUmVnRXhwIiwidGVzdCIsImlzUXVlcnlQYXJhbVZhbHVlIiwicmVwbGFjZSIsIm1hdGNoIiwicGFyYW1JbmZvIiwidXJsUGFyYW0iLCJoYXNPd25Qcm9wZXJ0eSIsImlzRGVmaW5lZCIsImVuY29kZVVyaVF1ZXJ5IiwiZW5jb2RlVXJpU2VnbWVudCIsInAxIiwibGVhZGluZ1NsYXNoZXMiLCJ0YWlsIiwiY2hhckF0Iiwic3RyaXBUcmFpbGluZ1NsYXNoZXMiLCJ2YWx1ZSIsImRhdGEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7O0FBRUE7Ozs7Ozs7SUFPTUEsWTtBQUNGLDRCQUEwQztBQUFBLFlBQTlCQyxRQUE4Qix1RUFBbkIsRUFBbUI7QUFBQSxZQUFmQyxRQUFlLHVFQUFKLEVBQUk7O0FBQUE7O0FBQ3RDQyxlQUFPQyxNQUFQLENBQWMsSUFBZCxFQUFvQjtBQUNoQkgsOEJBRGdCO0FBRWhCQztBQUZnQixTQUFwQjtBQUlBLGFBQUtHLE1BQUw7QUFDSDs7OztpQ0FFUTtBQUNMLGlCQUFLQyxTQUFMLEdBQWlCLEVBQWpCO0FBQ0g7OztxQ0FFWUMsTSxFQUFRQyxNLEVBQVFDLFMsRUFBVztBQUFBOztBQUNwQyxnQkFBTUMsNEJBQTRCLG9CQUFsQztBQUNBLGdCQUFJQyxNQUFNRixhQUFhLEtBQUtSLFFBQTVCO0FBQUEsZ0JBQ0lXLFlBREo7QUFBQSxnQkFDU0MsbUJBRFQ7QUFBQSxnQkFFSUMsb0JBQW9CLEVBRnhCO0FBQUEsZ0JBR0lSLFlBQVksS0FBS0EsU0FIckI7O0FBS0EsNEJBQU1TLElBQU4sQ0FBV0osSUFBSUssS0FBSixDQUFVLElBQVYsQ0FBWCxFQUE0QixVQUFDQyxLQUFELEVBQVFDLEdBQVIsRUFBZ0I7QUFDeEMsb0JBQUlELFVBQVUsZ0JBQWQsRUFBZ0M7QUFDNUI7QUFDSDtBQUNELG9CQUFJLENBQUUsSUFBSUUsTUFBSixDQUFXLFFBQVgsRUFBcUJDLElBQXJCLENBQTBCSCxLQUExQixDQUFGLElBQXVDQSxLQUF2QyxJQUFpRCxJQUFJRSxNQUFKLENBQVcsaUJBQWlCRixLQUFqQixHQUF5QixTQUFwQyxFQUErQ0csSUFBL0MsQ0FBb0RULEdBQXBELENBQXJELEVBQWdIO0FBQzVHTCw4QkFBVVcsS0FBVixJQUFtQjtBQUNmSSwyQ0FBb0IsSUFBSUYsTUFBSixDQUFXLFlBQVlGLEtBQVosR0FBb0IsV0FBL0IsQ0FBRCxDQUE4Q0csSUFBOUMsQ0FBbURULEdBQW5EO0FBREoscUJBQW5CO0FBR0g7QUFDSixhQVREOztBQVdBQSxrQkFBTUEsSUFBSVcsT0FBSixDQUFZLE1BQVosRUFBb0IsR0FBcEIsQ0FBTjtBQUNBWCxrQkFBTUEsSUFBSVcsT0FBSixDQUFZWix5QkFBWixFQUF1QyxVQUFTYSxLQUFULEVBQWdCO0FBQ3pEVCxvQ0FBb0JTLEtBQXBCO0FBQ0EsdUJBQU8sRUFBUDtBQUNILGFBSEssQ0FBTjs7QUFLQWYscUJBQVNBLFVBQVUsRUFBbkI7O0FBRUEsNEJBQU1PLElBQU4sQ0FBVyxLQUFLVCxTQUFoQixFQUEyQixVQUFDa0IsU0FBRCxFQUFZQyxRQUFaLEVBQXlCO0FBQ2hEYixzQkFBTUosT0FBT2tCLGNBQVAsQ0FBc0JELFFBQXRCLElBQWtDakIsT0FBT2lCLFFBQVAsQ0FBbEMsR0FBcUQsTUFBS3ZCLFFBQUwsQ0FBY3VCLFFBQWQsQ0FBM0Q7QUFDQSxvQkFBSSxnQkFBTUUsU0FBTixDQUFnQmYsR0FBaEIsS0FBd0JBLFFBQVEsSUFBcEMsRUFBMEM7QUFDdEMsd0JBQUlZLFVBQVVILGlCQUFkLEVBQWlDO0FBQzdCUixxQ0FBYSxnQkFBTWUsY0FBTixDQUFxQmhCLEdBQXJCLEVBQTBCLElBQTFCLENBQWI7QUFDSCxxQkFGRCxNQUVPO0FBQ0hDLHFDQUFhLGdCQUFNZ0IsZ0JBQU4sQ0FBdUJqQixHQUF2QixDQUFiO0FBQ0g7QUFDREQsMEJBQU1BLElBQUlXLE9BQUosQ0FBWSxJQUFJSCxNQUFKLENBQVcsTUFBTU0sUUFBTixHQUFpQixTQUE1QixFQUF1QyxHQUF2QyxDQUFaLEVBQXlELFVBQVNGLEtBQVQsRUFBZ0JPLEVBQWhCLEVBQW9CO0FBQy9FLCtCQUFPakIsYUFBYWlCLEVBQXBCO0FBQ0gscUJBRkssQ0FBTjtBQUdILGlCQVRELE1BU087QUFDSG5CLDBCQUFNQSxJQUFJVyxPQUFKLENBQVksSUFBSUgsTUFBSixDQUFXLFVBQVVNLFFBQVYsR0FBcUIsU0FBaEMsRUFBMkMsR0FBM0MsQ0FBWixFQUE2RCxVQUFTRixLQUFULEVBQWdCUSxjQUFoQixFQUFnQ0MsSUFBaEMsRUFBc0M7QUFDckcsNEJBQUlBLEtBQUtDLE1BQUwsQ0FBWSxDQUFaLE1BQW1CLEdBQXZCLEVBQTRCO0FBQ3hCLG1DQUFPRCxJQUFQO0FBQ0gseUJBRkQsTUFFTztBQUNILG1DQUFPRCxpQkFBaUJDLElBQXhCO0FBQ0g7QUFDSixxQkFOSyxDQUFOO0FBT0g7QUFDSixhQXBCRDs7QUFzQkE7QUFDQSxnQkFBSSxLQUFLOUIsUUFBTCxDQUFjZ0Msb0JBQWxCLEVBQXdDO0FBQ3BDdkIsc0JBQU1BLElBQUlXLE9BQUosQ0FBWSxNQUFaLEVBQW9CLEVBQXBCLEtBQTJCLEdBQWpDO0FBQ0g7O0FBRUQ7QUFDQTtBQUNBWCxrQkFBTUEsSUFBSVcsT0FBSixDQUFZLG1CQUFaLEVBQWlDLEdBQWpDLENBQU47O0FBRUE7QUFDQWYsbUJBQU9JLEdBQVAsR0FBYUcsb0JBQW9CSCxJQUFJVyxPQUFKLENBQVksUUFBWixFQUFzQixJQUF0QixDQUFqQzs7QUFFQTtBQUNBLDRCQUFNUCxJQUFOLENBQVdQLE1BQVgsRUFBbUIsVUFBQzJCLEtBQUQsRUFBUWpCLEdBQVIsRUFBZ0I7QUFDL0Isb0JBQUksQ0FBQyxNQUFLWixTQUFMLENBQWVZLEdBQWYsQ0FBTCxFQUEwQjtBQUN0QlgsMkJBQU82QixJQUFQLEdBQWM3QixPQUFPNkIsSUFBUCxJQUFlLEVBQTdCO0FBQ0E3QiwyQkFBTzZCLElBQVAsQ0FBWWxCLEdBQVosSUFBbUJpQixLQUFuQjtBQUNIO0FBQ0osYUFMRDtBQU1IOzs7Ozs7a0JBR1VuQyxZIiwiZmlsZSI6IlJvdXRlTWFuYWdlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBVdGlscyBmcm9tICcuLi9oZWxwZXJzL1V0aWxzJ1xyXG5cclxuLyoqXHJcbiAqIOazqOWGjOi3r+eUsVxyXG4gKiBcclxuICogQHBhcmFtIHtTdHJpbmd9IHRlbXBsYXRlIHVybCDot6/lvoRcclxuICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRzIOWPguaVsOWvueixoVxyXG4gKiBcclxuICovXHJcbmNsYXNzIFJvdXRlTWFuYWdlciB7XHJcbiAgICBjb25zdHJ1Y3Rvcih0ZW1wbGF0ZSA9ICcnLCBkZWZhdWx0cyA9IHt9KSB7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlLFxyXG4gICAgICAgICAgICBkZWZhdWx0cyxcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuX19pbml0KClcclxuICAgIH1cclxuXHJcbiAgICBfX2luaXQoKSB7XHJcbiAgICAgICAgdGhpcy51cmxQYXJhbXMgPSB7fVxyXG4gICAgfVxyXG5cclxuICAgIHNldFVybFBhcmFtcyhjb25maWcsIHBhcmFtcywgYWN0aW9uVXJsKSB7XHJcbiAgICAgICAgY29uc3QgUFJPVE9DT0xfQU5EX0RPTUFJTl9SRUdFWCA9IC9eaHR0cHM/OlxcL1xcL1teXFwvXSovXHJcbiAgICAgICAgbGV0IHVybCA9IGFjdGlvblVybCB8fCB0aGlzLnRlbXBsYXRlLFxyXG4gICAgICAgICAgICB2YWwsIGVuY29kZWRWYWwsXHJcbiAgICAgICAgICAgIHByb3RvY29sQW5kRG9tYWluID0gJycsXHJcbiAgICAgICAgICAgIHVybFBhcmFtcyA9IHRoaXMudXJsUGFyYW1zXHJcblxyXG4gICAgICAgIFV0aWxzLmVhY2godXJsLnNwbGl0KC9cXFcvKSwgKHBhcmFtLCBrZXkpID0+IHtcclxuICAgICAgICAgICAgaWYgKHBhcmFtID09PSAnaGFzT3duUHJvcGVydHknKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBgaGFzT3duUHJvcGVydHkgaXMgbm90IGEgdmFsaWQgcGFyYW1ldGVyIG5hbWUuYFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghKG5ldyBSZWdFeHAoJ15cXFxcZCskJykudGVzdChwYXJhbSkpICYmIHBhcmFtICYmIChuZXcgUmVnRXhwKCcoXnxbXlxcXFxcXFxcXSk6JyArIHBhcmFtICsgJyhcXFxcV3wkKScpLnRlc3QodXJsKSkpIHtcclxuICAgICAgICAgICAgICAgIHVybFBhcmFtc1twYXJhbV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNRdWVyeVBhcmFtVmFsdWU6IChuZXcgUmVnRXhwKCdcXFxcPy4qPTonICsgcGFyYW0gKyAnKD86XFxcXFd8JCknKSkudGVzdCh1cmwpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICB1cmwgPSB1cmwucmVwbGFjZSgvXFxcXDovZywgJzonKVxyXG4gICAgICAgIHVybCA9IHVybC5yZXBsYWNlKFBST1RPQ09MX0FORF9ET01BSU5fUkVHRVgsIGZ1bmN0aW9uKG1hdGNoKSB7XHJcbiAgICAgICAgICAgIHByb3RvY29sQW5kRG9tYWluID0gbWF0Y2hcclxuICAgICAgICAgICAgcmV0dXJuICcnXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgcGFyYW1zID0gcGFyYW1zIHx8IHt9XHJcblxyXG4gICAgICAgIFV0aWxzLmVhY2godGhpcy51cmxQYXJhbXMsIChwYXJhbUluZm8sIHVybFBhcmFtKSA9PiB7XHJcbiAgICAgICAgICAgIHZhbCA9IHBhcmFtcy5oYXNPd25Qcm9wZXJ0eSh1cmxQYXJhbSkgPyBwYXJhbXNbdXJsUGFyYW1dIDogdGhpcy5kZWZhdWx0c1t1cmxQYXJhbV1cclxuICAgICAgICAgICAgaWYgKFV0aWxzLmlzRGVmaW5lZCh2YWwpICYmIHZhbCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtSW5mby5pc1F1ZXJ5UGFyYW1WYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVuY29kZWRWYWwgPSBVdGlscy5lbmNvZGVVcmlRdWVyeSh2YWwsIHRydWUpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGVuY29kZWRWYWwgPSBVdGlscy5lbmNvZGVVcmlTZWdtZW50KHZhbClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHVybCA9IHVybC5yZXBsYWNlKG5ldyBSZWdFeHAoJzonICsgdXJsUGFyYW0gKyAnKFxcXFxXfCQpJywgJ2cnKSwgZnVuY3Rpb24obWF0Y2gsIHAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVuY29kZWRWYWwgKyBwMVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHVybCA9IHVybC5yZXBsYWNlKG5ldyBSZWdFeHAoJygvPyk6JyArIHVybFBhcmFtICsgJyhcXFxcV3wkKScsICdnJyksIGZ1bmN0aW9uKG1hdGNoLCBsZWFkaW5nU2xhc2hlcywgdGFpbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YWlsLmNoYXJBdCgwKSA9PT0gJy8nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0YWlsXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxlYWRpbmdTbGFzaGVzICsgdGFpbFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvLyBzdHJpcCB0cmFpbGluZyBzbGFzaGVzIGFuZCBzZXQgdGhlIHVybCAodW5sZXNzIHRoaXMgYmVoYXZpb3IgaXMgc3BlY2lmaWNhbGx5IGRpc2FibGVkKVxyXG4gICAgICAgIGlmICh0aGlzLmRlZmF1bHRzLnN0cmlwVHJhaWxpbmdTbGFzaGVzKSB7XHJcbiAgICAgICAgICAgIHVybCA9IHVybC5yZXBsYWNlKC9cXC8rJC8sICcnKSB8fCAnLydcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHRoZW4gcmVwbGFjZSBjb2xsYXBzZSBgLy5gIGlmIGZvdW5kIGluIHRoZSBsYXN0IFVSTCBwYXRoIHNlZ21lbnQgYmVmb3JlIHRoZSBxdWVyeVxyXG4gICAgICAgIC8vIEUuZy4gYGh0dHA6Ly91cmwuY29tL2lkLi9mb3JtYXQ/cT14YCBiZWNvbWVzIGBodHRwOi8vdXJsLmNvbS9pZC5mb3JtYXQ/cT14YFxyXG4gICAgICAgIHVybCA9IHVybC5yZXBsYWNlKC9cXC9cXC4oPz1cXHcrKCR8XFw/KSkvLCAnLicpXHJcblxyXG4gICAgICAgIC8vIHJlcGxhY2UgZXNjYXBlZCBgL1xcLmAgd2l0aCBgLy5gXHJcbiAgICAgICAgY29uZmlnLnVybCA9IHByb3RvY29sQW5kRG9tYWluICsgdXJsLnJlcGxhY2UoL1xcL1xcXFxcXC4vLCAnLy4nKVxyXG5cclxuICAgICAgICAvLyBzZXQgcGFyYW1zIC0gZGVsZWdhdGUgcGFyYW0gZW5jb2RpbmcgdG8gJGh0dHBcclxuICAgICAgICBVdGlscy5lYWNoKHBhcmFtcywgKHZhbHVlLCBrZXkpID0+IHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnVybFBhcmFtc1trZXldKSB7XHJcbiAgICAgICAgICAgICAgICBjb25maWcuZGF0YSA9IGNvbmZpZy5kYXRhIHx8IHt9XHJcbiAgICAgICAgICAgICAgICBjb25maWcuZGF0YVtrZXldID0gdmFsdWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJvdXRlTWFuYWdlciJdfQ==