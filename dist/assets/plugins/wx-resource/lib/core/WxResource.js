'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _InterceptorManager = require('./InterceptorManager.js');

var _InterceptorManager2 = _interopRequireDefault(_InterceptorManager);

var _RouteManager = require('./RouteManager.js');

var _RouteManager2 = _interopRequireDefault(_RouteManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Promise 封装 wx.request 请求方法
 * 
 * @param {String} url 设置一个含有参数的 URL 模板
 * @param {Object} paramDefaults 设置 URL 参数的默认值
 * @param {Object} actions 设置资源方法
 * @param {Object} options 设置默认参数
 * 
 */
var WxResource = function () {
    function WxResource() {
        var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var paramDefaults = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var actions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

        _classCallCheck(this, WxResource);

        Object.assign(this, {
            url: url,
            paramDefaults: paramDefaults,
            actions: actions,
            options: options
        });
        this.__init();
    }

    /**
     * 初始化
     */


    _createClass(WxResource, [{
        key: '__init',
        value: function __init() {
            this.__initInterceptor();
            this.__initDefaults();
            this.__initMethods();
        }

        /**
         * 初始化默认拦截器
         */

    }, {
        key: '__initInterceptor',
        value: function __initInterceptor() {
            this.interceptors = new _InterceptorManager2.default();
            this.interceptors.use({
                request: function request(_request) {
                    _request.requestTimestamp = new Date().getTime();
                    return _request;
                },
                requestError: function requestError(_requestError) {
                    return Promise.reject(_requestError);
                },
                response: function response(_response) {
                    _response.responseTimestamp = new Date().getTime();
                    return _response;
                },
                responseError: function responseError(_responseError) {
                    return Promise.reject(_responseError);
                }
            });
        }

        /**
         * 初始化默认参数
         */

    }, {
        key: '__initDefaults',
        value: function __initDefaults() {
            this.defaults = {
                // URL 是否以‘/‘结尾
                stripTrailingSlashes: true,

                // 方法名后缀字符串
                suffix: 'Async',

                // 默认方法
                actions: {
                    'get': { method: 'GET' },
                    'save': { method: 'POST' },
                    'update': { method: 'PUT' },
                    'query': { method: 'GET' },
                    'remove': { method: 'DELETE' },
                    'delete': { method: 'DELETE' }
                }
            };
        }

        /**
         * __initRoute         
         */

    }, {
        key: '__initRoute',
        value: function __initRoute(template, defaults) {
            return new _RouteManager2.default(template, Object.assign({}, this.defaults, defaults));
        }

        /**
         * 遍历对象构造方法，方法名以小写字母+后缀名
         */

    }, {
        key: '__initMethods',
        value: function __initMethods() {
            var _this = this;

            var route = this.__initRoute(this.url, this.options);
            var actions = Object.assign({}, this.defaults.actions, this.actions);

            var _loop = function _loop(name) {
                _this[name + route.defaults.suffix] = function () {
                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                        args[_key] = arguments[_key];
                    }

                    var httpConfig = _this.__setHttpConfig.apply(_this, [route, actions[name]].concat(args));
                    return _this.__defaultRequest(httpConfig);
                };
            };

            for (var name in actions) {
                _loop(name);
            }
        }

        /**
         * 设置 httpConfig
         * 
         * @param {object} route 路由对象
         * @param {string} action 请求方法
         * @param {arrary} args 参数数组 [params, data]
         */

    }, {
        key: '__setHttpConfig',
        value: function __setHttpConfig(route, action) {
            var _this2 = this;

            var MEMBER_NAME_REGEX = /^(\.[a-zA-Z_$@][0-9a-zA-Z_$@]*)+$/;

            // 判断是否为有效的路径
            var isValidDottedPath = function isValidDottedPath(path) {
                return path != null && path !== '' && path !== 'hasOwnProperty' && MEMBER_NAME_REGEX.test('.' + path);
            };

            // 查找路径
            var lookupDottedPath = function lookupDottedPath(obj, path) {
                if (!isValidDottedPath(path)) {
                    throw 'badmember, Dotted member path ' + path + ' is invalid.';
                }
                var keys = path.split('.');
                for (var i = 0, ii = keys.length; i < ii && typeof obj !== 'undefined'; i++) {
                    var key = keys[i];
                    obj = obj !== null ? obj[key] : undefined;
                }
                return obj;
            };

            // 提取参数
            var extractParams = function extractParams(data, actionParams) {
                var ids = {};
                actionParams = Object.assign({}, _this2.paramDefaults, actionParams);
                for (var key in actionParams) {
                    var value = actionParams[key];
                    if (typeof value === 'function') {
                        value = value(data);
                    }
                    ids[key] = value && value.charAt && value.charAt(0) === '@' ? lookupDottedPath(data, value.substr(1)) : value;
                }
                return ids;
            };

            var params = {},
                data = {},
                httpConfig = {},
                hasBody = /^(POST|PUT|PATCH)$/i.test(action.method);

            // 判断参数个数
            switch (arguments.length <= 2 ? 0 : arguments.length - 2) {
                case 2:
                    params = arguments.length <= 2 ? undefined : arguments[2];
                    data = arguments.length <= 3 ? undefined : arguments[3];
                    break;
                case 1:
                    if (hasBody) data = arguments.length <= 2 ? undefined : arguments[2];else params = arguments.length <= 2 ? undefined : arguments[2];
                    break;
                case 0:
                    break;
                default:
                    throw 'Expected up to 2 arguments [params, data], got ' + (arguments.length <= 2 ? 0 : arguments.length - 2) + ' arguments';
            }

            // 设置 httpConfig
            for (var key in action) {
                switch (key) {
                    case 'params':
                    case 'isArray':
                    case 'interceptor':
                    case 'cancellable':
                        break;
                    default:
                        httpConfig[key] = action[key];
                        break;
                }
            }

            // 判断是否为 (POST|PUT|PATCH) 请求，设置请求 data
            if (hasBody) {
                httpConfig.data = data;
            }

            // 解析 URL
            route.setUrlParams(httpConfig, Object.assign({}, extractParams(data, action.params || {}), params), action.url);

            return httpConfig;
        }

        /**
         * 以 wx.request 作为底层方法
         * @param {Object} httpConfig 请求参数配置
         */

    }, {
        key: '__defaultRequest',
        value: function __defaultRequest(httpConfig) {
            // 注入拦截器
            var chainInterceptors = function chainInterceptors(promise, interceptors) {
                for (var i = 0, ii = interceptors.length; i < ii;) {
                    var thenFn = interceptors[i++];
                    var rejectFn = interceptors[i++];
                    promise = promise.then(thenFn, rejectFn);
                }
                return promise;
            };

            var requestInterceptors = [];
            var responseInterceptors = [];
            var promise = Promise.resolve(httpConfig);

            // 缓存拦截器
            this.interceptors.forEach(function (n) {
                if (n.request || n.requestError) {
                    requestInterceptors.push(n.request, n.requestError);
                }
                if (n.response || n.responseError) {
                    responseInterceptors.unshift(n.response, n.responseError);
                }
            });

            // 注入请求拦截器
            promise = chainInterceptors(promise, requestInterceptors);

            // 发起HTTPS请求
            promise = promise.then(this.__http);

            // 注入响应拦截器
            promise = chainInterceptors(promise, responseInterceptors);

            // 接口调用成功，res = {data: '开发者服务器返回的内容'}
            promise = promise.then(function (res) {
                return res;
            }, function (err) {
                return err;
            });

            return promise;
        }

        /**
         * __http - wx.request
         */

    }, {
        key: '__http',
        value: function __http(obj) {
            return new Promise(function (resolve, reject) {
                obj.success = function (res) {
                    return resolve(res);
                };
                obj.fail = function (res) {
                    return reject(res);
                };
                wx.request(obj);
            });
        }
    }]);

    return WxResource;
}();

exports.default = WxResource;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIld4UmVzb3VyY2UuanMiXSwibmFtZXMiOlsiV3hSZXNvdXJjZSIsInVybCIsInBhcmFtRGVmYXVsdHMiLCJhY3Rpb25zIiwib3B0aW9ucyIsIk9iamVjdCIsImFzc2lnbiIsIl9faW5pdCIsIl9faW5pdEludGVyY2VwdG9yIiwiX19pbml0RGVmYXVsdHMiLCJfX2luaXRNZXRob2RzIiwiaW50ZXJjZXB0b3JzIiwidXNlIiwicmVxdWVzdCIsInJlcXVlc3RUaW1lc3RhbXAiLCJEYXRlIiwiZ2V0VGltZSIsInJlcXVlc3RFcnJvciIsIlByb21pc2UiLCJyZWplY3QiLCJyZXNwb25zZSIsInJlc3BvbnNlVGltZXN0YW1wIiwicmVzcG9uc2VFcnJvciIsImRlZmF1bHRzIiwic3RyaXBUcmFpbGluZ1NsYXNoZXMiLCJzdWZmaXgiLCJtZXRob2QiLCJ0ZW1wbGF0ZSIsInJvdXRlIiwiX19pbml0Um91dGUiLCJuYW1lIiwiYXJncyIsImh0dHBDb25maWciLCJfX3NldEh0dHBDb25maWciLCJfX2RlZmF1bHRSZXF1ZXN0IiwiYWN0aW9uIiwiTUVNQkVSX05BTUVfUkVHRVgiLCJpc1ZhbGlkRG90dGVkUGF0aCIsInBhdGgiLCJ0ZXN0IiwibG9va3VwRG90dGVkUGF0aCIsIm9iaiIsImtleXMiLCJzcGxpdCIsImkiLCJpaSIsImxlbmd0aCIsImtleSIsInVuZGVmaW5lZCIsImV4dHJhY3RQYXJhbXMiLCJkYXRhIiwiYWN0aW9uUGFyYW1zIiwiaWRzIiwidmFsdWUiLCJjaGFyQXQiLCJzdWJzdHIiLCJwYXJhbXMiLCJoYXNCb2R5Iiwic2V0VXJsUGFyYW1zIiwiY2hhaW5JbnRlcmNlcHRvcnMiLCJwcm9taXNlIiwidGhlbkZuIiwicmVqZWN0Rm4iLCJ0aGVuIiwicmVxdWVzdEludGVyY2VwdG9ycyIsInJlc3BvbnNlSW50ZXJjZXB0b3JzIiwicmVzb2x2ZSIsImZvckVhY2giLCJuIiwicHVzaCIsInVuc2hpZnQiLCJfX2h0dHAiLCJyZXMiLCJlcnIiLCJzdWNjZXNzIiwi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QUEyQkksbUJBQTNCLENBQVY7O0FBRUE7QUFDQUosc0JBQVVBLFFBQVFHLElBQVIsQ0FBYSxLQUFLUSxNQUFsQixDQUFWOztBQUVBO0FBQ0FYLHNCQUFVRCxrQkFBa0JDLE9BQWxCLEVBQTJCSyxvQkFBM0IsQ0FBVjs7QUFFQTtBQUNBTCxzQkFBVUEsUUFBUUcsSUFBUixDQUFhO0FBQUEsdUJBQU9TLEdBQVA7QUFBQSxhQUFiLEVBQXlCO0FBQUEsdUJBQU9DLEdBQVA7QUFBQSxhQUF6QixDQUFWOztBQUVBLG1CQUFPYixPQUFQO0FBQ0g7O0FBRUQ7Ozs7OzsrQkFHT25CLEcsRUFBSztBQUNSLG1CQUFPLElBQUl2QixPQUFKLENBQVksVUFBQ2dELE9BQUQsRUFBVS9DLE1BQVYsRUFBcUI7QUFDcENzQixvQkFBSWlDLE9BQUosR0FBYyxVQUFDRixHQUFEO0FBQUEsMkJBQVNOLFFBQVFNLEdBQVIsQ0FBVDtBQUFBLGlCQUFkO0FBQ0EvQixvQkFBSWtDLElBQUosR0FBVyxVQUFDSCxHQUFEO0FBQUEsMkJBQVNyRCxPQUFPcUQsR0FBUCxDQUFUO0FBQUEsaUJBQVg7QUFDQUksbUJBQUcvRCxPQUFILENBQVc0QixHQUFYO0FBQ0gsYUFKTSxDQUFQO0FBS0g7Ozs7OztrQkFHVXpDLFUiLCJmaWxlIjoiV3hSZXNvdXJjZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJbnRlcmNlcHRvck1hbmFnZXIgZnJvbSAnLi9JbnRlcmNlcHRvck1hbmFnZXInXHJcbmltcG9ydCBSb3V0ZU1hbmFnZXIgZnJvbSAnLi9Sb3V0ZU1hbmFnZXInXHJcblxyXG4vKipcclxuICogUHJvbWlzZSDlsIHoo4Ugd3gucmVxdWVzdCDor7fmsYLmlrnms5VcclxuICogXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmwg6K6+572u5LiA5Liq5ZCr5pyJ5Y+C5pWw55qEIFVSTCDmqKHmnb9cclxuICogQHBhcmFtIHtPYmplY3R9IHBhcmFtRGVmYXVsdHMg6K6+572uIFVSTCDlj4LmlbDnmoTpu5jorqTlgLxcclxuICogQHBhcmFtIHtPYmplY3R9IGFjdGlvbnMg6K6+572u6LWE5rqQ5pa55rOVXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIOiuvue9rum7mOiupOWPguaVsFxyXG4gKiBcclxuICovXHJcbmNsYXNzIFd4UmVzb3VyY2Uge1xyXG4gICAgY29uc3RydWN0b3IodXJsID0gJycsIHBhcmFtRGVmYXVsdHMgPSB7fSwgYWN0aW9ucyA9IHt9LCBvcHRpb25zID0ge30pIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIHtcclxuICAgICAgICAgICAgdXJsLFxyXG4gICAgICAgICAgICBwYXJhbURlZmF1bHRzLFxyXG4gICAgICAgICAgICBhY3Rpb25zLFxyXG4gICAgICAgICAgICBvcHRpb25zLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5fX2luaXQoKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyWXHJcbiAgICAgKi9cclxuICAgIF9faW5pdCgpIHtcclxuICAgICAgICB0aGlzLl9faW5pdEludGVyY2VwdG9yKClcclxuICAgICAgICB0aGlzLl9faW5pdERlZmF1bHRzKClcclxuICAgICAgICB0aGlzLl9faW5pdE1ldGhvZHMoKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyW6buY6K6k5oum5oiq5ZmoXHJcbiAgICAgKi9cclxuICAgIF9faW5pdEludGVyY2VwdG9yKCkge1xyXG4gICAgICAgIHRoaXMuaW50ZXJjZXB0b3JzID0gbmV3IEludGVyY2VwdG9yTWFuYWdlclxyXG4gICAgICAgIHRoaXMuaW50ZXJjZXB0b3JzLnVzZSh7XHJcbiAgICAgICAgICAgIHJlcXVlc3QocmVxdWVzdCkge1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5yZXF1ZXN0VGltZXN0YW1wID0gbmV3IERhdGUoKS5nZXRUaW1lKClcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXF1ZXN0XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJlcXVlc3RFcnJvcihyZXF1ZXN0RXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZXF1ZXN0RXJyb3IpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJlc3BvbnNlKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICByZXNwb25zZS5yZXNwb25zZVRpbWVzdGFtcCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2VcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcmVzcG9uc2VFcnJvcihyZXNwb25zZUVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVzcG9uc2VFcnJvcilcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyW6buY6K6k5Y+C5pWwXHJcbiAgICAgKi9cclxuICAgIF9faW5pdERlZmF1bHRzKCkge1xyXG4gICAgICAgIHRoaXMuZGVmYXVsdHMgPSB7XHJcbiAgICAgICAgICAgIC8vIFVSTCDmmK/lkKbku6XigJgv4oCY57uT5bC+XHJcbiAgICAgICAgICAgIHN0cmlwVHJhaWxpbmdTbGFzaGVzOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgLy8g5pa55rOV5ZCN5ZCO57yA5a2X56ym5LiyXHJcbiAgICAgICAgICAgIHN1ZmZpeDogJ0FzeW5jJyxcclxuXHJcbiAgICAgICAgICAgIC8vIOm7mOiupOaWueazlVxyXG4gICAgICAgICAgICBhY3Rpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAnZ2V0JzogeyBtZXRob2Q6ICdHRVQnIH0sXHJcbiAgICAgICAgICAgICAgICAnc2F2ZSc6IHsgbWV0aG9kOiAnUE9TVCcgfSxcclxuICAgICAgICAgICAgICAgICd1cGRhdGUnOiB7IG1ldGhvZDogJ1BVVCcgfSxcclxuICAgICAgICAgICAgICAgICdxdWVyeSc6IHsgbWV0aG9kOiAnR0VUJyB9LFxyXG4gICAgICAgICAgICAgICAgJ3JlbW92ZSc6IHsgbWV0aG9kOiAnREVMRVRFJyB9LFxyXG4gICAgICAgICAgICAgICAgJ2RlbGV0ZSc6IHsgbWV0aG9kOiAnREVMRVRFJyB9LFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogX19pbml0Um91dGUgICAgICAgICBcclxuICAgICAqL1xyXG4gICAgX19pbml0Um91dGUodGVtcGxhdGUsIGRlZmF1bHRzKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSb3V0ZU1hbmFnZXIodGVtcGxhdGUsIE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZGVmYXVsdHMsIGRlZmF1bHRzKSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmBjeWOhuWvueixoeaehOmAoOaWueazle+8jOaWueazleWQjeS7peWwj+WGmeWtl+avjSvlkI7nvIDlkI1cclxuICAgICAqL1xyXG4gICAgX19pbml0TWV0aG9kcygpIHtcclxuICAgICAgICBjb25zdCByb3V0ZSA9IHRoaXMuX19pbml0Um91dGUodGhpcy51cmwsIHRoaXMub3B0aW9ucylcclxuICAgICAgICBjb25zdCBhY3Rpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5kZWZhdWx0cy5hY3Rpb25zLCB0aGlzLmFjdGlvbnMpXHJcblxyXG4gICAgICAgIGZvciAobGV0IG5hbWUgaW4gYWN0aW9ucykge1xyXG4gICAgICAgICAgICB0aGlzW25hbWUgKyByb3V0ZS5kZWZhdWx0cy5zdWZmaXhdID0gKC4uLmFyZ3MpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGh0dHBDb25maWcgPSB0aGlzLl9fc2V0SHR0cENvbmZpZyhyb3V0ZSwgYWN0aW9uc1tuYW1lXSwgLi4uYXJncylcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9fZGVmYXVsdFJlcXVlc3QoaHR0cENvbmZpZylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9riBodHRwQ29uZmlnXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSByb3V0ZSDot6/nlLHlr7nosaFcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBhY3Rpb24g6K+35rGC5pa55rOVXHJcbiAgICAgKiBAcGFyYW0ge2FycmFyeX0gYXJncyDlj4LmlbDmlbDnu4QgW3BhcmFtcywgZGF0YV1cclxuICAgICAqL1xyXG4gICAgX19zZXRIdHRwQ29uZmlnKHJvdXRlLCBhY3Rpb24sIC4uLmFyZ3MpIHtcclxuICAgICAgICBjb25zdCBNRU1CRVJfTkFNRV9SRUdFWCA9IC9eKFxcLlthLXpBLVpfJEBdWzAtOWEtekEtWl8kQF0qKSskL1xyXG5cclxuICAgICAgICAvLyDliKTmlq3mmK/lkKbkuLrmnInmlYjnmoTot6/lvoRcclxuICAgICAgICBjb25zdCBpc1ZhbGlkRG90dGVkUGF0aCA9IChwYXRoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiAocGF0aCAhPSBudWxsICYmIHBhdGggIT09ICcnICYmIHBhdGggIT09ICdoYXNPd25Qcm9wZXJ0eScgJiYgTUVNQkVSX05BTUVfUkVHRVgudGVzdCgnLicgKyBwYXRoKSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIOafpeaJvui3r+W+hFxyXG4gICAgICAgIGNvbnN0IGxvb2t1cERvdHRlZFBhdGggPSAob2JqLCBwYXRoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghaXNWYWxpZERvdHRlZFBhdGgocGF0aCkpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IGBiYWRtZW1iZXIsIERvdHRlZCBtZW1iZXIgcGF0aCAke3BhdGh9IGlzIGludmFsaWQuYFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBrZXlzID0gcGF0aC5zcGxpdCgnLicpXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBpaSA9IGtleXMubGVuZ3RoOyBpIDwgaWkgJiYgdHlwZW9mIG9iaiAhPT0gJ3VuZGVmaW5lZCc7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGtleSA9IGtleXNbaV1cclxuICAgICAgICAgICAgICAgIG9iaiA9IChvYmogIT09IG51bGwpID8gb2JqW2tleV0gOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gb2JqXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDmj5Dlj5blj4LmlbBcclxuICAgICAgICBjb25zdCBleHRyYWN0UGFyYW1zID0gKGRhdGEsIGFjdGlvblBhcmFtcykgPT4ge1xyXG4gICAgICAgICAgICBsZXQgaWRzID0ge31cclxuICAgICAgICAgICAgYWN0aW9uUGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5wYXJhbURlZmF1bHRzLCBhY3Rpb25QYXJhbXMpXHJcbiAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiBhY3Rpb25QYXJhbXMpIHtcclxuICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IGFjdGlvblBhcmFtc1trZXldXHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZShkYXRhKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWRzW2tleV0gPSB2YWx1ZSAmJiB2YWx1ZS5jaGFyQXQgJiYgdmFsdWUuY2hhckF0KDApID09PSAnQCcgPyBsb29rdXBEb3R0ZWRQYXRoKGRhdGEsIHZhbHVlLnN1YnN0cigxKSkgOiB2YWx1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBpZHNcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwYXJhbXMgPSB7fSxcclxuICAgICAgICAgICAgZGF0YSA9IHt9LFxyXG4gICAgICAgICAgICBodHRwQ29uZmlnID0ge30sXHJcbiAgICAgICAgICAgIGhhc0JvZHkgPSAvXihQT1NUfFBVVHxQQVRDSCkkL2kudGVzdChhY3Rpb24ubWV0aG9kKVxyXG5cclxuICAgICAgICAvLyDliKTmlq3lj4LmlbDkuKrmlbBcclxuICAgICAgICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIHBhcmFtcyA9IGFyZ3NbMF1cclxuICAgICAgICAgICAgICAgIGRhdGEgPSBhcmdzWzFdXHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICBpZiAoaGFzQm9keSkgZGF0YSA9IGFyZ3NbMF1cclxuICAgICAgICAgICAgICAgIGVsc2UgcGFyYW1zID0gYXJnc1swXVxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHRocm93IGBFeHBlY3RlZCB1cCB0byAyIGFyZ3VtZW50cyBbcGFyYW1zLCBkYXRhXSwgZ290ICR7YXJncy5sZW5ndGh9IGFyZ3VtZW50c2BcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIOiuvue9riBodHRwQ29uZmlnXHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIGFjdGlvbikge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGtleSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAncGFyYW1zJzpcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2lzQXJyYXknOlxyXG4gICAgICAgICAgICAgICAgY2FzZSAnaW50ZXJjZXB0b3InOlxyXG4gICAgICAgICAgICAgICAgY2FzZSAnY2FuY2VsbGFibGUnOlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGh0dHBDb25maWdba2V5XSA9IGFjdGlvbltrZXldXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g5Yik5pat5piv5ZCm5Li6IChQT1NUfFBVVHxQQVRDSCkg6K+35rGC77yM6K6+572u6K+35rGCIGRhdGFcclxuICAgICAgICBpZiAoaGFzQm9keSkge1xyXG4gICAgICAgICAgICBodHRwQ29uZmlnLmRhdGEgPSBkYXRhXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDop6PmnpAgVVJMXHJcbiAgICAgICAgcm91dGUuc2V0VXJsUGFyYW1zKGh0dHBDb25maWcsIE9iamVjdC5hc3NpZ24oe30sIGV4dHJhY3RQYXJhbXMoZGF0YSwgYWN0aW9uLnBhcmFtcyB8fCB7fSksIHBhcmFtcyksIGFjdGlvbi51cmwpXHJcblxyXG4gICAgICAgIHJldHVybiBodHRwQ29uZmlnXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDku6Ugd3gucmVxdWVzdCDkvZzkuLrlupXlsYLmlrnms5VcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBodHRwQ29uZmlnIOivt+axguWPguaVsOmFjee9rlxyXG4gICAgICovXHJcbiAgICBfX2RlZmF1bHRSZXF1ZXN0KGh0dHBDb25maWcpIHtcclxuICAgICAgICAvLyDms6jlhaXmi6bmiKrlmahcclxuICAgICAgICBjb25zdCBjaGFpbkludGVyY2VwdG9ycyA9IChwcm9taXNlLCBpbnRlcmNlcHRvcnMpID0+IHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGlpID0gaW50ZXJjZXB0b3JzLmxlbmd0aDsgaSA8IGlpOykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRoZW5GbiA9IGludGVyY2VwdG9yc1tpKytdXHJcbiAgICAgICAgICAgICAgICBsZXQgcmVqZWN0Rm4gPSBpbnRlcmNlcHRvcnNbaSsrXVxyXG4gICAgICAgICAgICAgICAgcHJvbWlzZSA9IHByb21pc2UudGhlbih0aGVuRm4sIHJlamVjdEZuKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcmVxdWVzdEludGVyY2VwdG9ycyA9IFtdXHJcbiAgICAgICAgbGV0IHJlc3BvbnNlSW50ZXJjZXB0b3JzID0gW11cclxuICAgICAgICBsZXQgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShodHRwQ29uZmlnKVxyXG5cclxuICAgICAgICAvLyDnvJPlrZjmi6bmiKrlmahcclxuICAgICAgICB0aGlzLmludGVyY2VwdG9ycy5mb3JFYWNoKG4gPT4ge1xyXG4gICAgICAgICAgICBpZiAobi5yZXF1ZXN0IHx8IG4ucmVxdWVzdEVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0SW50ZXJjZXB0b3JzLnB1c2gobi5yZXF1ZXN0LCBuLnJlcXVlc3RFcnJvcilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobi5yZXNwb25zZSB8fCBuLnJlc3BvbnNlRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlSW50ZXJjZXB0b3JzLnVuc2hpZnQobi5yZXNwb25zZSwgbi5yZXNwb25zZUVycm9yKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy8g5rOo5YWl6K+35rGC5oum5oiq5ZmoXHJcbiAgICAgICAgcHJvbWlzZSA9IGNoYWluSW50ZXJjZXB0b3JzKHByb21pc2UsIHJlcXVlc3RJbnRlcmNlcHRvcnMpXHJcblxyXG4gICAgICAgIC8vIOWPkei1t0hUVFBT6K+35rGCXHJcbiAgICAgICAgcHJvbWlzZSA9IHByb21pc2UudGhlbih0aGlzLl9faHR0cClcclxuXHJcbiAgICAgICAgLy8g5rOo5YWl5ZON5bqU5oum5oiq5ZmoXHJcbiAgICAgICAgcHJvbWlzZSA9IGNoYWluSW50ZXJjZXB0b3JzKHByb21pc2UsIHJlc3BvbnNlSW50ZXJjZXB0b3JzKVxyXG5cclxuICAgICAgICAvLyDmjqXlj6PosIPnlKjmiJDlip/vvIxyZXMgPSB7ZGF0YTogJ+W8gOWPkeiAheacjeWKoeWZqOi/lOWbnueahOWGheWuuSd9XHJcbiAgICAgICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihyZXMgPT4gcmVzLCBlcnIgPT4gZXJyKVxyXG5cclxuICAgICAgICByZXR1cm4gcHJvbWlzZVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogX19odHRwIC0gd3gucmVxdWVzdFxyXG4gICAgICovXHJcbiAgICBfX2h0dHAob2JqKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgb2JqLnN1Y2Nlc3MgPSAocmVzKSA9PiByZXNvbHZlKHJlcylcclxuICAgICAgICAgICAgb2JqLmZhaWwgPSAocmVzKSA9PiByZWplY3QocmVzKVxyXG4gICAgICAgICAgICB3eC5yZXF1ZXN0KG9iailcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBXeFJlc291cmNlIl19