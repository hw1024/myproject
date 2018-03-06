"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 注册拦截器
 */
var InterceptorManager = function () {
    function InterceptorManager() {
        _classCallCheck(this, InterceptorManager);

        this.__init();
    }

    _createClass(InterceptorManager, [{
        key: "__init",
        value: function __init() {
            this.handlers = [];
        }

        /**
         * 添加一个拦截器
         */

    }, {
        key: "use",
        value: function use(obj) {
            this.handlers.push({
                request: obj.request,
                requestError: obj.requestError,
                response: obj.response,
                responseError: obj.responseError
            });
            return this.handlers.length - 1;
        }

        /**
         * 移除一个拦截器
         */

    }, {
        key: "eject",
        value: function eject(id) {
            if (this.handlers[id]) {
                this.handlers[id] = null;
            }
        }

        /**
         * 遍历所有已注册的拦截器
         */

    }, {
        key: "forEach",
        value: function forEach(fn) {
            this.handlers.forEach(function (h) {
                if (h !== null) {
                    fn(h);
                }
            });
        }
    }]);

    return InterceptorManager;
}();

exports.default = InterceptorManager;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkludGVyY2VwdG9yTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJJbnRlcmNlcHRvck1hbmFnZXIiLCJfX2luaXQiLCJoYW5kbGVycyIsIm9iaiIsInB1c2giLCJyZXF1ZXN0IiwicmVxdWVzdEVycm9yIiwicmVzcG9uc2UiLCJyZXNwb25zZUVycm9yIiwibGVuZ3RoIiwiaWQiLCJmbiIsImZvckVhY2giLCJoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7OztJQUdNQSxrQjtBQUNGLGtDQUFjO0FBQUE7O0FBQ1YsYUFBS0MsTUFBTDtBQUNIOzs7O2lDQUVRO0FBQ0wsaUJBQUtDLFFBQUwsR0FBZ0IsRUFBaEI7QUFDSDs7QUFFRDs7Ozs7OzRCQUdJQyxHLEVBQUs7QUFDTCxpQkFBS0QsUUFBTCxDQUFjRSxJQUFkLENBQW1CO0FBQ2ZDLHlCQUFTRixJQUFJRSxPQURFO0FBRWZDLDhCQUFjSCxJQUFJRyxZQUZIO0FBR2ZDLDBCQUFVSixJQUFJSSxRQUhDO0FBSWZDLCtCQUFlTCxJQUFJSztBQUpKLGFBQW5CO0FBTUEsbUJBQU8sS0FBS04sUUFBTCxDQUFjTyxNQUFkLEdBQXVCLENBQTlCO0FBQ0g7O0FBRUQ7Ozs7Ozs4QkFHTUMsRSxFQUFJO0FBQ04sZ0JBQUksS0FBS1IsUUFBTCxDQUFjUSxFQUFkLENBQUosRUFBdUI7QUFDbkIscUJBQUtSLFFBQUwsQ0FBY1EsRUFBZCxJQUFvQixJQUFwQjtBQUNIO0FBQ0o7O0FBRUQ7Ozs7OztnQ0FHUUMsRSxFQUFJO0FBQ1IsaUJBQUtULFFBQUwsQ0FBY1UsT0FBZCxDQUFzQixhQUFLO0FBQ3ZCLG9CQUFJQyxNQUFNLElBQVYsRUFBZ0I7QUFDWkYsdUJBQUdFLENBQUg7QUFDSDtBQUNKLGFBSkQ7QUFLSDs7Ozs7O2tCQUdVYixrQiIsImZpbGUiOiJJbnRlcmNlcHRvck1hbmFnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICog5rOo5YaM5oum5oiq5ZmoXHJcbiAqL1xyXG5jbGFzcyBJbnRlcmNlcHRvck1hbmFnZXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5fX2luaXQoKVxyXG4gICAgfVxyXG5cclxuICAgIF9faW5pdCgpIHtcclxuICAgICAgICB0aGlzLmhhbmRsZXJzID0gW11cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa3u+WKoOS4gOS4quaLpuaIquWZqFxyXG4gICAgICovXHJcbiAgICB1c2Uob2JqKSB7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVycy5wdXNoKHtcclxuICAgICAgICAgICAgcmVxdWVzdDogb2JqLnJlcXVlc3QsXHJcbiAgICAgICAgICAgIHJlcXVlc3RFcnJvcjogb2JqLnJlcXVlc3RFcnJvcixcclxuICAgICAgICAgICAgcmVzcG9uc2U6IG9iai5yZXNwb25zZSxcclxuICAgICAgICAgICAgcmVzcG9uc2VFcnJvcjogb2JqLnJlc3BvbnNlRXJyb3IsXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVycy5sZW5ndGggLSAxXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnp7vpmaTkuIDkuKrmi6bmiKrlmahcclxuICAgICAqL1xyXG4gICAgZWplY3QoaWQpIHtcclxuICAgICAgICBpZiAodGhpcy5oYW5kbGVyc1tpZF0pIHtcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVyc1tpZF0gPSBudWxsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YGN5Y6G5omA5pyJ5bey5rOo5YaM55qE5oum5oiq5ZmoXHJcbiAgICAgKi9cclxuICAgIGZvckVhY2goZm4pIHtcclxuICAgICAgICB0aGlzLmhhbmRsZXJzLmZvckVhY2goaCA9PiB7XHJcbiAgICAgICAgICAgIGlmIChoICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBmbihoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSW50ZXJjZXB0b3JNYW5hZ2VyIl19