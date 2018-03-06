'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Promise 封装 wx 原生方法
 */
var WxService = function () {
    function WxService() {
        _classCallCheck(this, WxService);

        this.__init();
    }

    /**
     * __init
     */


    _createClass(WxService, [{
        key: '__init',
        value: function __init() {
            this.__initTools();
            this.__initDefaults();
            this.__initMethods();
        }

        /**
         * 初始化工具方法
         */

    }, {
        key: '__initTools',
        value: function __initTools() {
            this.tools = {
                isArray: function isArray(value) {
                    return Array.isArray(value);
                },
                isObject: function isObject(value) {
                    return value !== null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object';
                },
                isNumber: function isNumber(value) {
                    return typeof value === 'number';
                },
                isDate: function isDate(value) {
                    return Object.prototype.toString.call(value) === '[object Date]';
                },
                isUndefined: function isUndefined(value) {
                    return typeof value === 'undefined';
                },
                toJson: function toJson(obj, pretty) {
                    if (this.isUndefined(obj)) return undefined;
                    if (!this.isNumber(pretty)) {
                        pretty = pretty ? 2 : null;
                    }
                    return JSON.stringify(obj, null, pretty);
                },
                serializeValue: function serializeValue(value) {
                    if (this.isObject(value)) return this.isDate(value) ? value.toISOString() : this.toJson(value);
                    return value;
                },
                encodeUriQuery: function encodeUriQuery(value, pctEncodeSpaces) {
                    return encodeURIComponent(value).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%3B/gi, ';').replace(/%20/g, pctEncodeSpaces ? '%20' : '+');
                },
                paramSerializer: function paramSerializer(obj) {
                    var _this = this;

                    if (!obj) return '';
                    var parts = [];

                    var _loop = function _loop(key) {
                        var value = obj[key];
                        if (value === null || _this.isUndefined(value)) return {
                                v: void 0
                            };
                        if (_this.isArray(value)) {
                            value.forEach(function (v) {
                                parts.push(_this.encodeUriQuery(key) + '=' + _this.encodeUriQuery(_this.serializeValue(v)));
                            });
                        } else {
                            parts.push(_this.encodeUriQuery(key) + '=' + _this.encodeUriQuery(_this.serializeValue(value)));
                        }
                    };

                    for (var key in obj) {
                        var _ret = _loop(key);

                        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
                    }
                    return parts.join('&');
                },
                buildUrl: function buildUrl(url, obj) {
                    var serializedParams = this.paramSerializer(obj);
                    if (serializedParams.length > 0) {
                        url += (url.indexOf('?') == -1 ? '?' : '&') + serializedParams;
                    }
                    return url;
                }
            };
        }

        /**
         * __initDefaults
         */

    }, {
        key: '__initDefaults',
        value: function __initDefaults() {
            // 缓存非异步方法
            this.noPromiseMethods = ['stopRecord', 'pauseVoice', 'stopVoice', 'pauseBackgroundAudio', 'stopBackgroundAudio', 'showNavigationBarLoading', 'hideNavigationBarLoading', 'createAnimation', 'createContext', 'hideKeyboard', 'stopPullDownRefresh'];

            // 缓存 wx 接口方法名
            this.instanceSource = {
                method: Object.keys(wx)
            };
        }

        /**
         * 遍历 wx 方法对象，判断是否为异步方法，是则构造 Promise
         */

    }, {
        key: '__initMethods',
        value: function __initMethods() {
            var _this2 = this;

            for (var key in this.instanceSource) {
                this.instanceSource[key].forEach(function (method, index) {
                    _this2[method] = function () {
                        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                            args[_key] = arguments[_key];
                        }

                        // 判断是否为非异步方法或以 wx.on 开头，或以 Sync 结尾的方法
                        if (_this2.noPromiseMethods.indexOf(method) !== -1 || method.substr(0, 2) === 'on' || /\w+Sync$/.test(method)) {
                            var _wx;

                            return (_wx = wx)[method].apply(_wx, args);
                        }
                        return _this2.__defaultRequest.apply(_this2, [method].concat(args));
                    };
                });
            }

            var navigate = ['navigateTo', 'redirectTo', 'switchTab', 'navigateBack', 'reLaunch'];

            /**
             * 重写导航 API
             * @param {String} url  路径
             * @param {Object} params 参数
             */
            navigate.forEach(function (method, index) {
                _this2[method] = function (url, params) {
                    var obj = {
                        url: url
                    };
                    if (method !== 'switchTab') {
                        obj.url = _this2.tools.buildUrl(url, params);
                    }
                    return _this2.__defaultRequest(method, obj);
                };
            });

            /**
             * 关闭当前页面，返回上一页面或多级页面
             * @param {Number} delta  返回的页面数，如果 delta 大于现有页面数，则返回到首页
             */
            this.navigateBack = function () {
                var delta = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

                return wx.navigateBack({
                    delta: delta
                });
            };
        }

        /**
         * 以 wx 下 API 作为底层方法
         * @param {String} method 方法名
         * @param {Object} obj    接收参数
         */

    }, {
        key: '__defaultRequest',
        value: function __defaultRequest() {
            var method = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
            var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            return new Promise(function (resolve, reject) {
                obj.success = function (res) {
                    return resolve(res);
                };
                obj.fail = function (res) {
                    return reject(res);
                };
                wx[method](obj);
            });
        }
    }]);

    return WxService;
}();

exports.default = WxService;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIld4U2VydmljZS5qcyJdLCJuYW1lcyI6WyJXeFNlcnZpY2UiLCJfX2luaXQiLCJfX2luaXRUb29scyIsIl9faW5pdERlZmF1bHRzIiwiX19pbml0TWV0aG9kcyIsInRvb2xzIiwiaXNBcnJheSIsInZhbHVlIiwiQXJyYXkiLCJpc09iamVjdCIsImlzTnVtYmVyIiwiaXNEYXRlIiwiT2JqZWN0IiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJjYWxsIiwiaXNVbmRlZmluZWQiLCJ0b0pzb24iLCJvYmoiLCJwcmV0dHkiLCJ1bmRlZmluZWQiLCJKU09OIiwic3RyaW5naWZ5Iiwic2VyaWFsaXplVmFsdWUiLCJ0b0lTT1N0cmluZyIsImVuY29kZVVyaVF1ZXJ5IiwicGN0RW5jb2RlU3BhY2VzIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwicmVwbGFjZSIsInBhcmFtU2VyaWFsaXplciIsInBhcnRzIiwia2V5IiwiZm9yRWFjaCIsInYiLCJwdXNoIiwiam9pbiIsImJ1aWxkVXJsIiwidXJsIiwic2VyaWFsaXplZFBhcmFtcyIsImxlbmd0aCIsImluZGV4T2YiLCJub1Byb21pc2VNZXRob2RzIiwiaW5zdGFuY2VTb3VyY2UiLCJtZXRob2QiLCJrZXlzIiwid3giLCJpbmRleCIsImFyZ3MiLCJzdWJzdHIiLCJ0ZXN0IiwiX19kZWZhdWx0UmVxdWVzdCIsIm5hdmlnYXRlIiwicGFyYW1zIiwibmF2aWdhdGVCYWNrIiwiZGVsdGEiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInN1Y2Nlc3MiLCJyZXMiLCJmYWlsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7O0lBR01BLFM7QUFDRix5QkFBYztBQUFBOztBQUNWLGFBQUtDLE1BQUw7QUFDSDs7QUFFRDs7Ozs7OztpQ0FHUztBQUNMLGlCQUFLQyxXQUFMO0FBQ0EsaUJBQUtDLGNBQUw7QUFDQSxpQkFBS0MsYUFBTDtBQUNIOztBQUVEOzs7Ozs7c0NBR2M7QUFDVixpQkFBS0MsS0FBTCxHQUFhO0FBQ1RD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ekIsR0FBVSx1RUFBSixFQUFJOztBQUNwQyxtQkFBTyxJQUFJcUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUNwQ3ZDLG9CQUFJd0MsT0FBSixHQUFjLFVBQUNDLEdBQUQ7QUFBQSwyQkFBU0gsUUFBUUcsR0FBUixDQUFUO0FBQUEsaUJBQWQ7QUFDQXpDLG9CQUFJMEMsSUFBSixHQUFXLFVBQUNELEdBQUQ7QUFBQSwyQkFBU0YsT0FBT0UsR0FBUCxDQUFUO0FBQUEsaUJBQVg7QUFDQWQsbUJBQUdGLE1BQUgsRUFBV3pCLEdBQVg7QUFDSCxhQUpNLENBQVA7QUFLSDs7Ozs7O2tCQUdVbEIsUyIsImZpbGUiOiJXeFNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogUHJvbWlzZSDlsIHoo4Ugd3gg5Y6f55Sf5pa55rOVXHJcbiAqL1xyXG5jbGFzcyBXeFNlcnZpY2Uge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5fX2luaXQoKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogX19pbml0XHJcbiAgICAgKi9cclxuICAgIF9faW5pdCgpIHtcclxuICAgICAgICB0aGlzLl9faW5pdFRvb2xzKClcclxuICAgICAgICB0aGlzLl9faW5pdERlZmF1bHRzKClcclxuICAgICAgICB0aGlzLl9faW5pdE1ldGhvZHMoKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyW5bel5YW35pa55rOVXHJcbiAgICAgKi9cclxuICAgIF9faW5pdFRvb2xzKCkge1xyXG4gICAgICAgIHRoaXMudG9vbHMgPSB7XHJcbiAgICAgICAgICAgIGlzQXJyYXkodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHZhbHVlKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBpc09iamVjdCh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaXNOdW1iZXIodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGlzRGF0ZSh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IERhdGVdJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBpc1VuZGVmaW5lZCh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdG9Kc29uKG9iaiwgcHJldHR5KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1VuZGVmaW5lZChvYmopKSByZXR1cm4gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNOdW1iZXIocHJldHR5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHByZXR0eSA9IHByZXR0eSA/IDIgOiBudWxsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqLCBudWxsLCBwcmV0dHkpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNlcmlhbGl6ZVZhbHVlKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc09iamVjdCh2YWx1ZSkpIHJldHVybiB0aGlzLmlzRGF0ZSh2YWx1ZSkgPyB2YWx1ZS50b0lTT1N0cmluZygpIDogdGhpcy50b0pzb24odmFsdWUpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZW5jb2RlVXJpUXVlcnkodmFsdWUsIHBjdEVuY29kZVNwYWNlcykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSlcclxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvJTQwL2dpLCAnQCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLyUzQS9naSwgJzonKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8lMjQvZywgJyQnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8lMkMvZ2ksICcsJylcclxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvJTNCL2dpLCAnOycpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLyUyMC9nLCAocGN0RW5jb2RlU3BhY2VzID8gJyUyMCcgOiAnKycpKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBwYXJhbVNlcmlhbGl6ZXIob2JqKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIW9iaikgcmV0dXJuICcnXHJcbiAgICAgICAgICAgICAgICBsZXQgcGFydHMgPSBbXVxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gb2JqW2tleV1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdGhpcy5pc1VuZGVmaW5lZCh2YWx1ZSkpIHJldHVyblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzQXJyYXkodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLmZvckVhY2goKHYpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRzLnB1c2godGhpcy5lbmNvZGVVcmlRdWVyeShrZXkpICsgJz0nICsgdGhpcy5lbmNvZGVVcmlRdWVyeSh0aGlzLnNlcmlhbGl6ZVZhbHVlKHYpKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0cy5wdXNoKHRoaXMuZW5jb2RlVXJpUXVlcnkoa2V5KSArICc9JyArIHRoaXMuZW5jb2RlVXJpUXVlcnkodGhpcy5zZXJpYWxpemVWYWx1ZSh2YWx1ZSkpKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBwYXJ0cy5qb2luKCcmJylcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYnVpbGRVcmwodXJsLCBvYmopIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNlcmlhbGl6ZWRQYXJhbXMgPSB0aGlzLnBhcmFtU2VyaWFsaXplcihvYmopXHJcbiAgICAgICAgICAgICAgICBpZiAoc2VyaWFsaXplZFBhcmFtcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsICs9ICgodXJsLmluZGV4T2YoJz8nKSA9PSAtMSkgPyAnPycgOiAnJicpICsgc2VyaWFsaXplZFBhcmFtc1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVybFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIF9faW5pdERlZmF1bHRzXHJcbiAgICAgKi9cclxuICAgIF9faW5pdERlZmF1bHRzKCkge1xyXG4gICAgICAgIC8vIOe8k+WtmOmdnuW8guatpeaWueazlVxyXG4gICAgICAgIHRoaXMubm9Qcm9taXNlTWV0aG9kcyA9IFtcclxuICAgICAgICAgICAgJ3N0b3BSZWNvcmQnLFxyXG4gICAgICAgICAgICAncGF1c2VWb2ljZScsXHJcbiAgICAgICAgICAgICdzdG9wVm9pY2UnLFxyXG4gICAgICAgICAgICAncGF1c2VCYWNrZ3JvdW5kQXVkaW8nLFxyXG4gICAgICAgICAgICAnc3RvcEJhY2tncm91bmRBdWRpbycsXHJcbiAgICAgICAgICAgICdzaG93TmF2aWdhdGlvbkJhckxvYWRpbmcnLFxyXG4gICAgICAgICAgICAnaGlkZU5hdmlnYXRpb25CYXJMb2FkaW5nJyxcclxuICAgICAgICAgICAgJ2NyZWF0ZUFuaW1hdGlvbicsXHJcbiAgICAgICAgICAgICdjcmVhdGVDb250ZXh0JyxcclxuICAgICAgICAgICAgJ2hpZGVLZXlib2FyZCcsXHJcbiAgICAgICAgICAgICdzdG9wUHVsbERvd25SZWZyZXNoJyxcclxuICAgICAgICBdXHJcblxyXG4gICAgICAgIC8vIOe8k+WtmCB3eCDmjqXlj6Pmlrnms5XlkI1cclxuICAgICAgICB0aGlzLmluc3RhbmNlU291cmNlID0ge1xyXG4gICAgICAgICAgICBtZXRob2Q6IE9iamVjdC5rZXlzKHd4KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmBjeWOhiB3eCDmlrnms5Xlr7nosaHvvIzliKTmlq3mmK/lkKbkuLrlvILmraXmlrnms5XvvIzmmK/liJnmnoTpgKAgUHJvbWlzZVxyXG4gICAgICovXHJcbiAgICBfX2luaXRNZXRob2RzKCkge1xyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLmluc3RhbmNlU291cmNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VTb3VyY2Vba2V5XS5mb3JFYWNoKChtZXRob2QsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzW21ldGhvZF0gPSAoLi4uYXJncykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOWIpOaWreaYr+WQpuS4uumdnuW8guatpeaWueazleaIluS7pSB3eC5vbiDlvIDlpLTvvIzmiJbku6UgU3luYyDnu5PlsL7nmoTmlrnms5VcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5ub1Byb21pc2VNZXRob2RzLmluZGV4T2YobWV0aG9kKSAhPT0gLTEgfHwgbWV0aG9kLnN1YnN0cigwLCAyKSA9PT0gJ29uJyB8fCAvXFx3K1N5bmMkLy50ZXN0KG1ldGhvZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHd4W21ldGhvZF0oLi4uYXJncylcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19kZWZhdWx0UmVxdWVzdChtZXRob2QsIC4uLmFyZ3MpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBuYXZpZ2F0ZSA9IFtcclxuICAgICAgICAgICAgJ25hdmlnYXRlVG8nLFxyXG4gICAgICAgICAgICAncmVkaXJlY3RUbycsXHJcbiAgICAgICAgICAgICdzd2l0Y2hUYWInLFxyXG4gICAgICAgICAgICAnbmF2aWdhdGVCYWNrJywgXHJcbiAgICAgICAgICAgICdyZUxhdW5jaCcsXHJcbiAgICAgICAgXVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDph43lhpnlr7zoiKogQVBJXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IHVybCAg6Lev5b6EXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyDlj4LmlbBcclxuICAgICAgICAgKi9cclxuICAgICAgICBuYXZpZ2F0ZS5mb3JFYWNoKChtZXRob2QsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXNbbWV0aG9kXSA9ICh1cmwsIHBhcmFtcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgb2JqID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHVybCxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChtZXRob2QgIT09ICdzd2l0Y2hUYWInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLnVybCA9IHRoaXMudG9vbHMuYnVpbGRVcmwodXJsLCBwYXJhbXMpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fX2RlZmF1bHRSZXF1ZXN0KG1ldGhvZCwgb2JqKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5YWz6Zet5b2T5YmN6aG16Z2i77yM6L+U5Zue5LiK5LiA6aG16Z2i5oiW5aSa57qn6aG16Z2iXHJcbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IGRlbHRhICDov5Tlm57nmoTpobXpnaLmlbDvvIzlpoLmnpwgZGVsdGEg5aSn5LqO546w5pyJ6aG16Z2i5pWw77yM5YiZ6L+U5Zue5Yiw6aaW6aG1XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5uYXZpZ2F0ZUJhY2sgPSAoZGVsdGEgPSAxKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB3eC5uYXZpZ2F0ZUJhY2soe1xyXG4gICAgICAgICAgICAgICAgZGVsdGEsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LulIHd4IOS4iyBBUEkg5L2c5Li65bqV5bGC5pa55rOVXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbWV0aG9kIOaWueazleWQjVxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9iaiAgICDmjqXmlLblj4LmlbBcclxuICAgICAqL1xyXG4gICAgX19kZWZhdWx0UmVxdWVzdChtZXRob2QgPSAnJywgb2JqID0ge30pIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBvYmouc3VjY2VzcyA9IChyZXMpID0+IHJlc29sdmUocmVzKVxyXG4gICAgICAgICAgICBvYmouZmFpbCA9IChyZXMpID0+IHJlamVjdChyZXMpXHJcbiAgICAgICAgICAgIHd4W21ldGhvZF0ob2JqKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFd4U2VydmljZSJdfQ==