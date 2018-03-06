'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _InterceptorManager = require('./InterceptorManager.js');

var _InterceptorManager2 = _interopRequireDefault(_InterceptorManager);

var _Utils = require('./../helpers/Utils.js');

var _Utils2 = _interopRequireDefault(_Utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Promise 封装 wx.request 请求方法
 * 
 * @param {Object} defaults 配置项
 * @param {String} defaults.suffix 方法名后缀字符串，默认值 Request
 * @param {String} defaults.baseURL 基础请求路径
 * @param {Object} defaults.header 请求头
 * @param {Array} defaults.transformRequest 转换请求数据
 * @param {Array} defaults.transformResponse 转换响应数据
 * @param {Function} defaults.validateStatus 基于响应状态返回成功或失败
 * 
 */
var WxRequest = function () {
    function WxRequest(defaults) {
        _classCallCheck(this, WxRequest);

        Object.assign(this, {
            defaults: defaults
        });
        this.__init();
    }

    /**
     * 初始化
     */


    _createClass(WxRequest, [{
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
            var defaults = {
                // 方法名后缀字符串，默认值 Request
                suffix: 'Request',
                // 基础请求路径
                baseURL: '',
                // 请求头
                header: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                // 转换请求数据
                transformRequest: [function (data, header) {
                    return data;
                }],
                // 转换响应数据
                transformResponse: [function (data, header) {
                    if (typeof data === 'string') {
                        try {
                            data = JSON.parse(data);
                        } catch (e) {/* Ignore */}
                    }
                    return data;
                }],
                // 基于响应状态返回成功或失败
                validateStatus: function validateStatus(status) {
                    return status >= 200 && status < 300;
                }

                // 合并参数
            };this.defaults = Object.assign({}, defaults, this.defaults);
        }

        /**
         * 遍历对象构造方法，方法名以小写字母+后缀名
         */

    }, {
        key: '__initMethods',
        value: function __initMethods() {
            var _this = this;

            // 方法名后缀字符串
            var suffix = this.defaults.suffix;

            // 发起请求所支持的方法
            var instanceSource = {
                method: ['OPTIONS', 'GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'TRACE', 'CONNECT']

                // 遍历对象构造方法
            };for (var key in instanceSource) {
                instanceSource[key].forEach(function (method, index) {
                    _this[method.toLowerCase() + suffix] = function (url, config) {
                        return _this.__defaultRequest(Object.assign({}, config, {
                            method: method,
                            url: url
                        }));
                    };
                });
            }

            // request - 基础请求方法
            this.request = function () {
                return _this.__defaultRequest.apply(_this, arguments);
            };

            // Promise.all - 合并处理请求
            this.all = function (promises) {
                return Promise.all(promises);
            };
        }

        /**
         * 以 wx.request 作为底层方法
         * @param {Object|String} config 配置项|接口地址
         * @param {String} config.method 请求方法
         * @param {String} config.url    接口地址
         * @param {Object} config.data 请求参数
         * @param {Object} config.header 设置请求的 header
         * @param {String} config.dataType 请求的数据类型
         */

    }, {
        key: '__defaultRequest',
        value: function __defaultRequest(config) {
            var _this2 = this;

            // 判断参数类型，如果第一个参数为字符串则赋值于 url，第二个参数为 config 配置
            if (typeof config === 'string') {
                config = Object.assign({}, {
                    url: arguments[1]
                }, arguments[2]);
            }

            // 合并参数
            var defaults = Object.assign({
                method: 'GET',
                dataType: 'json'
            }, this.defaults, config);

            var baseURL = defaults.baseURL,
                header = defaults.header,
                validateStatus = defaults.validateStatus;

            // 配置请求参数

            var $$config = {
                url: defaults.url,
                data: defaults.data,
                header: defaults.header,
                method: defaults.method,
                dataType: defaults.dataType

                // 配置请求路径 prefix
            };if (this.$$prefix && !_Utils2.default.isAbsoluteURL($$config.url)) {
                $$config.url = _Utils2.default.combineURLs(this.$$prefix, $$config.url);
            }

            // 配置请求路径 baseURL
            if (baseURL && !_Utils2.default.isAbsoluteURL($$config.url)) {
                $$config.url = _Utils2.default.combineURLs(baseURL, $$config.url);
            }

            // 注入拦截器
            var chainInterceptors = function chainInterceptors(promise, interceptors) {
                for (var i = 0, ii = interceptors.length; i < ii;) {
                    var thenFn = interceptors[i++];
                    var rejectFn = interceptors[i++];
                    promise = promise.then(thenFn, rejectFn);
                }
                return promise;
            };

            // 转换数据
            var transformData = function transformData(data, header, status, fns) {
                fns.forEach(function (fn) {
                    data = fn(data, header, status);
                });
                return data;
            };

            // 转换响应数据
            var transformResponse = function transformResponse(res) {
                var __res = Object.assign({}, res, {
                    data: transformData(res.data, res.header, res.statusCode, defaults.transformResponse)
                });
                return validateStatus(res.statusCode) ? __res : Promise.reject(__res);
            };

            // 发起HTTPS请求
            var serverRequest = function serverRequest(config) {
                var __config = Object.assign({}, config, {
                    data: transformData($$config.data, $$config.header, undefined, defaults.transformRequest)
                });
                return _this2.__http(__config).then(transformResponse, transformResponse);
            };

            var requestInterceptors = [];
            var responseInterceptors = [];
            var promise = Promise.resolve($$config);

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
            promise = promise.then(serverRequest);

            // 注入响应拦截器
            promise = chainInterceptors(promise, responseInterceptors);

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

    return WxRequest;
}();

exports.default = WxRequest;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIld4UmVxdWVzdC5qcyJdLCJuYW1lcyI6WyJXeFJlcXVlc3QiLCJkZWZhdWx0cyIsIk9iamVjdCIsImFzc2lnbiIsIl9faW5pdCIsIl9faW5pdEludGVyY2VwdG9yIiwiX19pbml0RGVmYXVsdHMiLCJfX2luaXRNZXRob2RzIiwiaW50ZXJjZXB0b3JzIiwidXNlIiwicmVxdWVzdCIsInJlcXVlc3RUaW1lc3RhbXAiLCJEYXRlIiwiZ2V0VGltZSIsInJlcXVlc3RFcnJvciIsIlByb21pc2UiLCJyZWplY3QiLCJyZXNwb25zZSIsInJlc3BvbnNlVGltZXN0YW1wIiwicmVzcG9uc2VFcnJvciIsInN1ZmZpeCIsImJhc2VVUkwiLCJoZWFkZXIiLCJ0cmFuc2Zvcm1SZXF1ZXN0IiwiZGF0YSIsInRyYW5zZm9ybVJlc3BvbnNlIiwiSlNPTiIsInBhcnNlIiwiZSIsInZhbGlkYXRlU3RhdHVzIiwic3RhdHVzIiwiaW5zdGFuY2VTb3VyY2UiLCJtZXRob2QiLCJrZXkiLCJmb3JFYWNoIiwiaW5kZXgiLCJ0b0xvd2VyQ2FzZSIsInVybCIsImNvbmZpZyIsIl9fZGVmYXVsdFJlcXVlc3QiLCJhbGwiLCJwcm9taXNlcyIsImFyZ3VtZW50cyIsImRhdGFUeXBlIiwiJCRjb25maWciLCIkJHByZWZpeCIsImlzQWJzb2x1dGVVUkwiLCJjb21iaW5lVVJMcyIsImNoYWluSW50ZXJjZXB0b3JzIiwicHJvbWlzZSIsImkiLCJpaSIsImxlbmd0aCIsInRoZW5GbiIsInJlamVjdEZuIiwidGhlbiIsInRyYW5zZm9ybURhdGEiLCJmbnMiLCJmbiIsIl9fcmVzIiwicmVzIiwic3RhdHVzQ29kZSIsInNlcnZlclJlcXVlc3QiLCJfX2NvbmZpZyIsInVuZGVmaW5lZCIsIl9faHR0cCIsInJlcXVlc3RJbnRlcmNlcHRvcnMiLCJyZXNwb25zZUludGVyY2VwdG9ycyIsInJlc29sdmUiLCJuIiwicHVzaCIsInVuc2hpZnQiLCJvYmoiLCJzdWNjZXNzIiwiZmFpbCIsInd4Il0sIm1hcHBpbmdz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QUFDQThCLHNCQUFVRCxrQkFBa0JDLE9BQWxCLEVBQTJCaUIsbUJBQTNCLENBQVY7O0FBRUE7QUFDQWpCLHNCQUFVQSxRQUFRTSxJQUFSLENBQWFPLGFBQWIsQ0FBVjs7QUFFQTtBQUNBYixzQkFBVUQsa0JBQWtCQyxPQUFsQixFQUEyQmtCLG9CQUEzQixDQUFWOztBQUVBLG1CQUFPbEIsT0FBUDtBQUNIOztBQUVEOzs7Ozs7K0JBR091QixHLEVBQUs7QUFDUixtQkFBTyxJQUFJekQsT0FBSixDQUFZLFVBQUNxRCxPQUFELEVBQVVwRCxNQUFWLEVBQXFCO0FBQ3BDd0Qsb0JBQUlDLE9BQUosR0FBYyxVQUFDYixHQUFEO0FBQUEsMkJBQVNRLFFBQVFSLEdBQVIsQ0FBVDtBQUFBLGlCQUFkO0FBQ0FZLG9CQUFJRSxJQUFKLEdBQVcsVUFBQ2QsR0FBRDtBQUFBLDJCQUFTNUMsT0FBTzRDLEdBQVAsQ0FBVDtBQUFBLGlCQUFYO0FBQ0FlLG1CQUFHakUsT0FBSCxDQUFXOEQsR0FBWDtBQUNILGFBSk0sQ0FBUDtBQUtIOzs7Ozs7a0JBR1V4RSxTIiwiZmlsZSI6Ild4UmVxdWVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJbnRlcmNlcHRvck1hbmFnZXIgZnJvbSAnLi9JbnRlcmNlcHRvck1hbmFnZXInXHJcbmltcG9ydCBVdGlscyBmcm9tICcuLy4uL2hlbHBlcnMvVXRpbHMnXHJcblxyXG4vKipcclxuICogUHJvbWlzZSDlsIHoo4Ugd3gucmVxdWVzdCDor7fmsYLmlrnms5VcclxuICogXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZWZhdWx0cyDphY3nva7poblcclxuICogQHBhcmFtIHtTdHJpbmd9IGRlZmF1bHRzLnN1ZmZpeCDmlrnms5XlkI3lkI7nvIDlrZfnrKbkuLLvvIzpu5jorqTlgLwgUmVxdWVzdFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZGVmYXVsdHMuYmFzZVVSTCDln7rnoYDor7fmsYLot6/lvoRcclxuICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRzLmhlYWRlciDor7fmsYLlpLRcclxuICogQHBhcmFtIHtBcnJheX0gZGVmYXVsdHMudHJhbnNmb3JtUmVxdWVzdCDovazmjaLor7fmsYLmlbDmja5cclxuICogQHBhcmFtIHtBcnJheX0gZGVmYXVsdHMudHJhbnNmb3JtUmVzcG9uc2Ug6L2s5o2i5ZON5bqU5pWw5o2uXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGRlZmF1bHRzLnZhbGlkYXRlU3RhdHVzIOWfuuS6juWTjeW6lOeKtuaAgei/lOWbnuaIkOWKn+aIluWksei0pVxyXG4gKiBcclxuICovXHJcbmNsYXNzIFd4UmVxdWVzdCB7XHJcbiAgICBjb25zdHJ1Y3RvcihkZWZhdWx0cykge1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywge1xyXG4gICAgICAgICAgICBkZWZhdWx0cyxcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuX19pbml0KClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WMllxyXG4gICAgICovXHJcbiAgICBfX2luaXQoKSB7XHJcbiAgICAgICAgdGhpcy5fX2luaXRJbnRlcmNlcHRvcigpXHJcbiAgICAgICAgdGhpcy5fX2luaXREZWZhdWx0cygpXHJcbiAgICAgICAgdGhpcy5fX2luaXRNZXRob2RzKClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WMlum7mOiupOaLpuaIquWZqFxyXG4gICAgICovXHJcbiAgICBfX2luaXRJbnRlcmNlcHRvcigpIHtcclxuICAgICAgICB0aGlzLmludGVyY2VwdG9ycyA9IG5ldyBJbnRlcmNlcHRvck1hbmFnZXJcclxuICAgICAgICB0aGlzLmludGVyY2VwdG9ycy51c2Uoe1xyXG4gICAgICAgICAgICByZXF1ZXN0KHJlcXVlc3QpIHtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3QucmVxdWVzdFRpbWVzdGFtcCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVxdWVzdFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZXF1ZXN0RXJyb3IocmVxdWVzdEVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVxdWVzdEVycm9yKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZXNwb25zZShyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UucmVzcG9uc2VUaW1lc3RhbXAgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJlc3BvbnNlRXJyb3IocmVzcG9uc2VFcnJvcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlc3BvbnNlRXJyb3IpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WMlum7mOiupOWPguaVsFxyXG4gICAgICovXHJcbiAgICBfX2luaXREZWZhdWx0cygpIHtcclxuICAgICAgICBjb25zdCBkZWZhdWx0cyA9IHtcclxuICAgICAgICAgICAgLy8g5pa55rOV5ZCN5ZCO57yA5a2X56ym5Liy77yM6buY6K6k5YC8IFJlcXVlc3RcclxuICAgICAgICAgICAgc3VmZml4OiAnUmVxdWVzdCcsXHJcbiAgICAgICAgICAgIC8vIOWfuuehgOivt+axgui3r+W+hFxyXG4gICAgICAgICAgICBiYXNlVVJMOiAnJyxcclxuICAgICAgICAgICAgLy8g6K+35rGC5aS0XHJcbiAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonLFxyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyDovazmjaLor7fmsYLmlbDmja5cclxuICAgICAgICAgICAgdHJhbnNmb3JtUmVxdWVzdDogW1xyXG4gICAgICAgICAgICAgICAgKGRhdGEsIGhlYWRlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAvLyDovazmjaLlk43lupTmlbDmja5cclxuICAgICAgICAgICAgdHJhbnNmb3JtUmVzcG9uc2U6IFtcclxuICAgICAgICAgICAgICAgIChkYXRhLCBoZWFkZXIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7IC8qIElnbm9yZSAqLyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAvLyDln7rkuo7lk43lupTnirbmgIHov5Tlm57miJDlip/miJblpLHotKVcclxuICAgICAgICAgICAgdmFsaWRhdGVTdGF0dXM6IHN0YXR1cyA9PiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMCxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIOWQiOW5tuWPguaVsFxyXG4gICAgICAgIHRoaXMuZGVmYXVsdHMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgdGhpcy5kZWZhdWx0cylcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmBjeWOhuWvueixoeaehOmAoOaWueazle+8jOaWueazleWQjeS7peWwj+WGmeWtl+avjSvlkI7nvIDlkI1cclxuICAgICAqL1xyXG4gICAgX19pbml0TWV0aG9kcygpIHtcclxuICAgICAgICAvLyDmlrnms5XlkI3lkI7nvIDlrZfnrKbkuLJcclxuICAgICAgICBjb25zdCBzdWZmaXggPSB0aGlzLmRlZmF1bHRzLnN1ZmZpeFxyXG5cclxuICAgICAgICAvLyDlj5Hotbfor7fmsYLmiYDmlK/mjIHnmoTmlrnms5VcclxuICAgICAgICBjb25zdCBpbnN0YW5jZVNvdXJjZSA9IHtcclxuICAgICAgICAgICAgbWV0aG9kOiBbXHJcbiAgICAgICAgICAgICAgICAnT1BUSU9OUycsXHJcbiAgICAgICAgICAgICAgICAnR0VUJyxcclxuICAgICAgICAgICAgICAgICdIRUFEJyxcclxuICAgICAgICAgICAgICAgICdQT1NUJyxcclxuICAgICAgICAgICAgICAgICdQVVQnLFxyXG4gICAgICAgICAgICAgICAgJ0RFTEVURScsXHJcbiAgICAgICAgICAgICAgICAnVFJBQ0UnLFxyXG4gICAgICAgICAgICAgICAgJ0NPTk5FQ1QnLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g6YGN5Y6G5a+56LGh5p6E6YCg5pa55rOVXHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIGluc3RhbmNlU291cmNlKSB7XHJcbiAgICAgICAgICAgIGluc3RhbmNlU291cmNlW2tleV0uZm9yRWFjaCgobWV0aG9kLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpc1ttZXRob2QudG9Mb3dlckNhc2UoKSArIHN1ZmZpeF0gPSAodXJsLCBjb25maWcpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fX2RlZmF1bHRSZXF1ZXN0KE9iamVjdC5hc3NpZ24oe30sIGNvbmZpZywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRob2QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybCxcclxuICAgICAgICAgICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHJlcXVlc3QgLSDln7rnoYDor7fmsYLmlrnms5VcclxuICAgICAgICB0aGlzLnJlcXVlc3QgPSAoLi4uYXJncykgPT4gdGhpcy5fX2RlZmF1bHRSZXF1ZXN0KC4uLmFyZ3MpXHJcblxyXG4gICAgICAgIC8vIFByb21pc2UuYWxsIC0g5ZCI5bm25aSE55CG6K+35rGCXHJcbiAgICAgICAgdGhpcy5hbGwgPSBwcm9taXNlcyA9PiBQcm9taXNlLmFsbChwcm9taXNlcylcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS7pSB3eC5yZXF1ZXN0IOS9nOS4uuW6leWxguaWueazlVxyXG4gICAgICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBjb25maWcg6YWN572u6aG5fOaOpeWPo+WcsOWdgFxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGNvbmZpZy5tZXRob2Qg6K+35rGC5pa55rOVXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gY29uZmlnLnVybCAgICDmjqXlj6PlnLDlnYBcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcuZGF0YSDor7fmsYLlj4LmlbBcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcuaGVhZGVyIOiuvue9ruivt+axgueahCBoZWFkZXJcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBjb25maWcuZGF0YVR5cGUg6K+35rGC55qE5pWw5o2u57G75Z6LXHJcbiAgICAgKi9cclxuICAgIF9fZGVmYXVsdFJlcXVlc3QoY29uZmlnKSB7XHJcblxyXG4gICAgICAgIC8vIOWIpOaWreWPguaVsOexu+Wei++8jOWmguaenOesrOS4gOS4quWPguaVsOS4uuWtl+espuS4suWImei1i+WAvOS6jiB1cmzvvIznrKzkuozkuKrlj4LmlbDkuLogY29uZmlnIOmFjee9rlxyXG4gICAgICAgIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICBjb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCB7XHJcbiAgICAgICAgICAgICAgICB1cmw6IGFyZ3VtZW50c1sxXVxyXG4gICAgICAgICAgICB9LCBhcmd1bWVudHNbMl0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDlkIjlubblj4LmlbBcclxuICAgICAgICBjb25zdCBkZWZhdWx0cyA9IE9iamVjdC5hc3NpZ24oe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgIH0sIHRoaXMuZGVmYXVsdHMsIGNvbmZpZylcclxuXHJcbiAgICAgICAgY29uc3QgeyBiYXNlVVJMLCBoZWFkZXIsIHZhbGlkYXRlU3RhdHVzIH0gPSBkZWZhdWx0c1xyXG5cclxuICAgICAgICAvLyDphY3nva7or7fmsYLlj4LmlbBcclxuICAgICAgICBjb25zdCAkJGNvbmZpZyA9IHtcclxuICAgICAgICAgICAgdXJsOiBkZWZhdWx0cy51cmwsXHJcbiAgICAgICAgICAgIGRhdGE6IGRlZmF1bHRzLmRhdGEsXHJcbiAgICAgICAgICAgIGhlYWRlcjogZGVmYXVsdHMuaGVhZGVyLFxyXG4gICAgICAgICAgICBtZXRob2Q6IGRlZmF1bHRzLm1ldGhvZCxcclxuICAgICAgICAgICAgZGF0YVR5cGU6IGRlZmF1bHRzLmRhdGFUeXBlLFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g6YWN572u6K+35rGC6Lev5b6EIHByZWZpeFxyXG4gICAgICAgIGlmICh0aGlzLiQkcHJlZml4ICYmICFVdGlscy5pc0Fic29sdXRlVVJMKCQkY29uZmlnLnVybCkpIHtcclxuICAgICAgICAgICAgJCRjb25maWcudXJsID0gVXRpbHMuY29tYmluZVVSTHModGhpcy4kJHByZWZpeCwgJCRjb25maWcudXJsKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g6YWN572u6K+35rGC6Lev5b6EIGJhc2VVUkxcclxuICAgICAgICBpZiAoYmFzZVVSTCAmJiAhVXRpbHMuaXNBYnNvbHV0ZVVSTCgkJGNvbmZpZy51cmwpKSB7XHJcbiAgICAgICAgICAgICQkY29uZmlnLnVybCA9IFV0aWxzLmNvbWJpbmVVUkxzKGJhc2VVUkwsICQkY29uZmlnLnVybClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIOazqOWFpeaLpuaIquWZqFxyXG4gICAgICAgIGNvbnN0IGNoYWluSW50ZXJjZXB0b3JzID0gKHByb21pc2UsIGludGVyY2VwdG9ycykgPT4ge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgaWkgPSBpbnRlcmNlcHRvcnMubGVuZ3RoOyBpIDwgaWk7KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGhlbkZuID0gaW50ZXJjZXB0b3JzW2krK11cclxuICAgICAgICAgICAgICAgIGxldCByZWplY3RGbiA9IGludGVyY2VwdG9yc1tpKytdXHJcbiAgICAgICAgICAgICAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKHRoZW5GbiwgcmVqZWN0Rm4pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHByb21pc2VcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIOi9rOaNouaVsOaNrlxyXG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybURhdGEgPSAoZGF0YSwgaGVhZGVyLCBzdGF0dXMsIGZucykgPT4ge1xyXG4gICAgICAgICAgICBmbnMuZm9yRWFjaChmbiA9PiB7XHJcbiAgICAgICAgICAgICAgICBkYXRhID0gZm4oZGF0YSwgaGVhZGVyLCBzdGF0dXMpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDovazmjaLlk43lupTmlbDmja5cclxuICAgICAgICBjb25zdCB0cmFuc2Zvcm1SZXNwb25zZSA9IHJlcyA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IF9fcmVzID0gT2JqZWN0LmFzc2lnbih7fSwgcmVzLCB7XHJcbiAgICAgICAgICAgICAgICBkYXRhOiB0cmFuc2Zvcm1EYXRhKHJlcy5kYXRhLCByZXMuaGVhZGVyLCByZXMuc3RhdHVzQ29kZSwgZGVmYXVsdHMudHJhbnNmb3JtUmVzcG9uc2UpLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICByZXR1cm4gdmFsaWRhdGVTdGF0dXMocmVzLnN0YXR1c0NvZGUpID8gX19yZXMgOiBQcm9taXNlLnJlamVjdChfX3JlcylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIOWPkei1t0hUVFBT6K+35rGCXHJcbiAgICAgICAgY29uc3Qgc2VydmVyUmVxdWVzdCA9IGNvbmZpZyA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IF9fY29uZmlnID0gT2JqZWN0LmFzc2lnbih7fSwgY29uZmlnLCB7XHJcbiAgICAgICAgICAgICAgICBkYXRhOiB0cmFuc2Zvcm1EYXRhKCQkY29uZmlnLmRhdGEsICQkY29uZmlnLmhlYWRlciwgdW5kZWZpbmVkLCBkZWZhdWx0cy50cmFuc2Zvcm1SZXF1ZXN0KSxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19odHRwKF9fY29uZmlnKS50aGVuKHRyYW5zZm9ybVJlc3BvbnNlLCB0cmFuc2Zvcm1SZXNwb25zZSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCByZXF1ZXN0SW50ZXJjZXB0b3JzID0gW11cclxuICAgICAgICBsZXQgcmVzcG9uc2VJbnRlcmNlcHRvcnMgPSBbXVxyXG4gICAgICAgIGxldCBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKCQkY29uZmlnKVxyXG5cclxuICAgICAgICAvLyDnvJPlrZjmi6bmiKrlmahcclxuICAgICAgICB0aGlzLmludGVyY2VwdG9ycy5mb3JFYWNoKG4gPT4ge1xyXG4gICAgICAgICAgICBpZiAobi5yZXF1ZXN0IHx8IG4ucmVxdWVzdEVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0SW50ZXJjZXB0b3JzLnB1c2gobi5yZXF1ZXN0LCBuLnJlcXVlc3RFcnJvcilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobi5yZXNwb25zZSB8fCBuLnJlc3BvbnNlRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlSW50ZXJjZXB0b3JzLnVuc2hpZnQobi5yZXNwb25zZSwgbi5yZXNwb25zZUVycm9yKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy8g5rOo5YWl6K+35rGC5oum5oiq5ZmoXHJcbiAgICAgICAgcHJvbWlzZSA9IGNoYWluSW50ZXJjZXB0b3JzKHByb21pc2UsIHJlcXVlc3RJbnRlcmNlcHRvcnMpXHJcblxyXG4gICAgICAgIC8vIOWPkei1t0hUVFBT6K+35rGCXHJcbiAgICAgICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihzZXJ2ZXJSZXF1ZXN0KVxyXG5cclxuICAgICAgICAvLyDms6jlhaXlk43lupTmi6bmiKrlmahcclxuICAgICAgICBwcm9taXNlID0gY2hhaW5JbnRlcmNlcHRvcnMocHJvbWlzZSwgcmVzcG9uc2VJbnRlcmNlcHRvcnMpXHJcblxyXG4gICAgICAgIHJldHVybiBwcm9taXNlXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBfX2h0dHAgLSB3eC5yZXF1ZXN0XHJcbiAgICAgKi9cclxuICAgIF9faHR0cChvYmopIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBvYmouc3VjY2VzcyA9IChyZXMpID0+IHJlc29sdmUocmVzKVxyXG4gICAgICAgICAgICBvYmouZmFpbCA9IChyZXMpID0+IHJlamVjdChyZXMpXHJcbiAgICAgICAgICAgIHd4LnJlcXVlc3Qob2JqKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFd4UmVxdWVzdCJdfQ==