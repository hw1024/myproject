'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 表单验证
 * 
 * @param {Object} rules 验证字段的规则
 * @param {Object} messages 验证字段的提示信息
 * 
 */
var WxValidate = function () {
	function WxValidate() {
		var rules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		_classCallCheck(this, WxValidate);

		Object.assign(this, {
			rules: rules,
			messages: messages
		});
		this.__init();
	}

	/**
  * __init
  */


	_createClass(WxValidate, [{
		key: '__init',
		value: function __init() {
			this.__initMethods();
			this.__initDefaults();
			this.__initData();
		}

		/**
   * 初始化数据
   */

	}, {
		key: '__initData',
		value: function __initData() {
			this.form = {};
			this.errorList = [];
		}

		/**
   * 初始化默认提示信息
   */

	}, {
		key: '__initDefaults',
		value: function __initDefaults() {
			this.defaults = {
				messages: {
					required: '这是必填字段。',
					email: '请输入有效的电子邮件地址。',
					tel: '请输入11位的手机号码。',
					url: '请输入有效的网址。',
					date: '请输入有效的日期。',
					dateISO: '请输入有效的日期（ISO），例如：2009-06-23，1998/01/22。',
					number: '请输入有效的数字。',
					digits: '只能输入数字。',
					idcard: '请输入18位的有效身份证。',
					equalTo: this.formatTpl('输入值必须和 {0} 相同。'),
					contains: this.formatTpl('输入值必须包含 {0}。'),
					minlength: this.formatTpl('最少要输入 {0} 个字符。'),
					maxlength: this.formatTpl('最多可以输入 {0} 个字符。'),
					rangelength: this.formatTpl('请输入长度在 {0} 到 {1} 之间的字符。'),
					min: this.formatTpl('请输入不小于 {0} 的数值。'),
					max: this.formatTpl('请输入不大于 {0} 的数值。'),
					range: this.formatTpl('请输入范围在 {0} 到 {1} 之间的数值。')
				}
			};
		}

		/**
   * 初始化默认验证方法
   */

	}, {
		key: '__initMethods',
		value: function __initMethods() {
			var that = this;
			that.methods = {
				/**
     * 验证必填元素
     */
				required: function required(value, param) {
					if (!that.depend(param)) {
						return 'dependency-mismatch';
					} else if (typeof value === 'number') {
						value = value.toString();
					} else if (typeof value === 'boolean') {
						return !0;
					}

					return value.length > 0;
				},

				/**
     * 验证电子邮箱格式
     */
				email: function email(value) {
					return that.optional(value) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value);
				},

				/**
     * 验证手机格式
     */
				tel: function tel(value) {
					return that.optional(value) || /^1[34578]\d{9}$/.test(value);
				},

				/**
     * 验证URL格式
     */
				url: function url(value) {
					return that.optional(value) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
				},

				/**
     * 验证日期格式
     */
				date: function date(value) {
					return that.optional(value) || !/Invalid|NaN/.test(new Date(value).toString());
				},

				/**
     * 验证ISO类型的日期格式
     */
				dateISO: function dateISO(value) {
					return that.optional(value) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
				},

				/**
     * 验证十进制数字
     */
				number: function number(value) {
					return that.optional(value) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
				},

				/**
     * 验证整数
     */
				digits: function digits(value) {
					return that.optional(value) || /^\d+$/.test(value);
				},

				/**
     * 验证身份证号码
     */
				idcard: function idcard(value) {
					return that.optional(value) || /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value);
				},

				/**
     * 验证两个输入框的内容是否相同
     */
				equalTo: function equalTo(value, param) {
					return that.optional(value) || value === that.scope.detail.value[param];
				},

				/**
     * 验证是否包含某个值
     */
				contains: function contains(value, param) {
					return that.optional(value) || value.indexOf(param) >= 0;
				},

				/**
     * 验证最小长度
     */
				minlength: function minlength(value, param) {
					return that.optional(value) || value.length >= param;
				},

				/**
     * 验证最大长度
     */
				maxlength: function maxlength(value, param) {
					return that.optional(value) || value.length <= param;
				},

				/**
     * 验证一个长度范围[min, max]
     */
				rangelength: function rangelength(value, param) {
					return that.optional(value) || value.length >= param[0] && value.length <= param[1];
				},

				/**
     * 验证最小值
     */
				min: function min(value, param) {
					return that.optional(value) || value >= param;
				},

				/**
     * 验证最大值
     */
				max: function max(value, param) {
					return that.optional(value) || value <= param;
				},

				/**
     * 验证一个值范围[min, max]
     */
				range: function range(value, param) {
					return that.optional(value) || value >= param[0] && value <= param[1];
				}
			};
		}

		/**
   * 添加自定义验证方法
   * @param {String} name 方法名
   * @param {Function} method 函数体，接收两个参数(value, param)，value表示元素的值，param表示参数
   * @param {String} message 提示信息
   */

	}, {
		key: 'addMethod',
		value: function addMethod(name, method, message) {
			this.methods[name] = method;
			this.defaults.messages[name] = message !== undefined ? message : this.defaults.messages[name];
		}

		/**
   * 判断验证方法是否存在
   */

	}, {
		key: 'isValidMethod',
		value: function isValidMethod(value) {
			var methods = [];
			for (var method in this.methods) {
				if (method && typeof this.methods[method] === 'function') {
					methods.push(method);
				}
			}
			return methods.indexOf(value) !== -1;
		}

		/**
   * 格式化提示信息模板
   */

	}, {
		key: 'formatTpl',
		value: function formatTpl(source, params) {
			var that = this;
			if (arguments.length === 1) {
				return function () {
					var args = Array.from(arguments);
					args.unshift(source);
					return that.formatTpl.apply(this, args);
				};
			}
			if (params === undefined) {
				return source;
			}
			if (arguments.length > 2 && params.constructor !== Array) {
				params = Array.from(arguments).slice(1);
			}
			if (params.constructor !== Array) {
				params = [params];
			}
			params.forEach(function (n, i) {
				source = source.replace(new RegExp("\\{" + i + "\\}", "g"), function () {
					return n;
				});
			});
			return source;
		}

		/**
   * 判断规则依赖是否存在
   */

	}, {
		key: 'depend',
		value: function depend(param) {
			switch (typeof param === 'undefined' ? 'undefined' : _typeof(param)) {
				case 'boolean':
					param = param;
					break;
				case 'string':
					param = !!param.length;
					break;
				case 'function':
					param = param();
				default:
					param = !0;
			}
			return param;
		}

		/**
   * 判断输入值是否为空
   */

	}, {
		key: 'optional',
		value: function optional(value) {
			return !this.methods.required(value) && 'dependency-mismatch';
		}

		/**
   * 获取自定义字段的提示信息
   * @param {String} param 字段名
   * @param {Object} rule 规则
   */

	}, {
		key: 'customMessage',
		value: function customMessage(param, rule) {
			var params = this.messages[param];
			var isObject = (typeof params === 'undefined' ? 'undefined' : _typeof(params)) === 'object';
			if (params && isObject) return params[rule.method];
		}

		/**
   * 获取某个指定字段的提示信息
   * @param {String} param 字段名
   * @param {Object} rule 规则
   */

	}, {
		key: 'defaultMessage',
		value: function defaultMessage(param, rule) {
			var message = this.customMessage(param, rule) || this.defaults.messages[rule.method];
			var type = typeof message === 'undefined' ? 'undefined' : _typeof(message);

			if (type === 'undefined') {
				message = 'Warning: No message defined for ' + rule.method + '.';
			} else if (type === 'function') {
				message = message.call(this, rule.parameters);
			}

			return message;
		}

		/**
   * 缓存错误信息
   * @param {String} param 字段名
   * @param {Object} rule 规则
   * @param {String} value 元素的值
   */

	}, {
		key: 'formatTplAndAdd',
		value: function formatTplAndAdd(param, rule, value) {
			var msg = this.defaultMessage(param, rule);

			this.errorList.push({
				param: param,
				msg: msg,
				value: value
			});
		}

		/**
   * 验证某个指定字段的规则
   * @param {String} param 字段名
   * @param {Object} rules 规则
   * @param {Object} event 表单数据对象
   */

	}, {
		key: 'checkParam',
		value: function checkParam(param, rules, event) {

			// 缓存表单数据对象
			this.scope = event;

			// 缓存字段对应的值
			var data = event.detail.value;
			var value = data[param] || '';

			// 遍历某个指定字段的所有规则，依次验证规则，否则缓存错误信息
			for (var method in rules) {

				// 判断验证方法是否存在
				if (this.isValidMethod(method)) {

					// 缓存规则的属性及值
					var rule = {
						method: method,
						parameters: rules[method]

						// 调用验证方法
					};var result = this.methods[method](value, rule.parameters);

					// 若result返回值为dependency-mismatch，则说明该字段的值为空或非必填字段
					if (result === 'dependency-mismatch') {
						continue;
					}

					this.setValue(param, method, result, value);

					// 判断是否通过验证，否则缓存错误信息，跳出循环
					if (!result) {
						this.formatTplAndAdd(param, rule, value);
						break;
					}
				}
			}
		}

		/**
   * 设置字段的默认验证值
   * @param {String} param 字段名
   */

	}, {
		key: 'setView',
		value: function setView(param) {
			this.form[param] = {
				$name: param,
				$valid: true,
				$invalid: false,
				$error: {},
				$success: {},
				$viewValue: ''
			};
		}

		/**
   * 设置字段的验证值
   * @param {String} param 字段名
   * @param {String} method 字段的方法
   * @param {Boolean} result 是否通过验证
   * @param {String} value 字段的值
   */

	}, {
		key: 'setValue',
		value: function setValue(param, method, result, value) {
			var params = this.form[param];
			params.$valid = result;
			params.$invalid = !result;
			params.$error[method] = !result;
			params.$success[method] = result;
			params.$viewValue = value;
		}

		/**
   * 验证所有字段的规则，返回验证是否通过
   * @param {Object} event 表单数据对象
   */

	}, {
		key: 'checkForm',
		value: function checkForm(event) {
			this.__initData();

			for (var param in this.rules) {
				this.setView(param);
				this.checkParam(param, this.rules[param], event);
			}

			return this.valid();
		}

		/**
   * 返回验证是否通过
   */

	}, {
		key: 'valid',
		value: function valid() {
			return this.size() === 0;
		}

		/**
   * 返回错误信息的个数
   */

	}, {
		key: 'size',
		value: function size() {
			return this.errorList.length;
		}

		/**
   * 返回所有错误信息
   */

	}, {
		key: 'validationErrors',
		value: function validationErrors() {
			return this.errorList;
		}
	}]);

	return WxValidate;
}();

exports.default = WxValidate;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIld4VmFsaWRhdGUuanMiXSwibmFtZXMiOlsiV3hWYWxpZGF0ZSIsInJ1bGVzIiwibWVzc2FnZXMiLCJPYmplY3QiLCJhc3NpZ24iLCJfX2luaXQiLCJfX2luaXRNZXRob2RzIiwiX19pbml0RGVmYXVsdHMiLCJfX2luaXREYXRhIiwiZm9ybSIsImVycm9yTGlzdCIsImRlZmF1bHRzIiwicmVxdWlyZWQiLCJlbWFpbCIsInRlbCIsInVybCIsImRhdGUiLCJkYXRlSVNPIiwibnVtYmVyIiwiZGlnaXRzIiwiaWRjYXJkIiwiZXF1YWxUbyIsImZvcm1hdFRwbCIsImNvbnRhaW5zIiwibWlubGVuZ3RoIiwibWF4bGVuZ3RoIiwicmFuZ2VsZW5ndGgiLCJtaW4iLCJtYXgiLCJyYW5nZSIsInRoYXQiLCJtZXRob2RzIiwidmFsdWUiLCJwYXJhbSIsImRlcGVuZCIsInRvU3RyaW5nIiwibGVuZ3RoIiwib3B0aW9uYWwiLCJ0ZXN0IiwiRGF0ZSIsInNjb3BlIiwiZGV0YWlsIiwiaW5kZXhPZiIsIm5hbWUiLCJtZXRob2QiLCJtZXNzYWdlIiwidW5kZWZpbmVkIiwicHVzaCIsInNvdXJjZSIsInBhcmFtcyIsImFyZ3VtZW50cyIsImFyZ3MiLCJBcnJheSIsImZyb20iLCJ1bnNoaWZ0IiwiYXBwbHkiLCJjb25zdHJ1Y3RvciIsInNsaWNlIiwiZm9yRWFjaCIsIm4iLCJpIiwicmVwbGFjZSIsIlJlZ0V4cCIsInJ1bGUiLCJpc09iamVjdCIsImN1c3RvbU1lc3NhZ2UiLCJ0eXBlIiwiY2FsbCIsInBhcmFtZXRlcnMiLCJtc2ciLCJkZWZhdWx0TWVzc2FnZSIsImV2ZW50IiwiZGF0YSIsImlzVmFsaWRNZXRob2QiLCJyZXN1bHQiLCJzZXRWYWx1ZSIsImZvcm1hdFRwbEFuZEFkZCIsIiRuYW1lIiwiJHZhbGlkIiwiJGludmFsaWQiLCIkZXJyb3IiLCIkc3VjY2VzcyIsIiR2aWV3VmFsdWUiLCJzZXRWaWV3IiwiY2hlY2tQYXJhbSIsInZhbGlkIiwic2l6ZSJdLCJtYXBwaW5n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QUFDTixVQUFPLEtBQUs1RSxTQUFMLENBQWUwQixNQUF0QjtBQUNBOztBQUVEOzs7Ozs7cUNBR21CO0FBQ2xCLFVBQU8sS0FBSzFCLFNBQVo7QUFDQTs7Ozs7O2tCQUdhVixVIiwiZmlsZSI6Ild4VmFsaWRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICog6KGo5Y2V6aqM6K+BXHJcbiAqIFxyXG4gKiBAcGFyYW0ge09iamVjdH0gcnVsZXMg6aqM6K+B5a2X5q6155qE6KeE5YiZXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBtZXNzYWdlcyDpqozor4HlrZfmrrXnmoTmj5DnpLrkv6Hmga9cclxuICogXHJcbiAqL1xyXG5jbGFzcyBXeFZhbGlkYXRlIHtcclxuXHRjb25zdHJ1Y3RvcihydWxlcyA9IHt9LCBtZXNzYWdlcyA9IHt9KSB7XHJcblx0XHRPYmplY3QuYXNzaWduKHRoaXMsIHtcclxuXHRcdFx0cnVsZXMsIFxyXG5cdFx0XHRtZXNzYWdlcywgXHJcblx0XHR9KVxyXG5cdFx0dGhpcy5fX2luaXQoKVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogX19pbml0XHJcblx0ICovXHJcblx0X19pbml0KCkge1xyXG5cdFx0dGhpcy5fX2luaXRNZXRob2RzKClcclxuXHRcdHRoaXMuX19pbml0RGVmYXVsdHMoKVxyXG5cdFx0dGhpcy5fX2luaXREYXRhKClcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIOWIneWni+WMluaVsOaNrlxyXG5cdCAqL1xyXG5cdF9faW5pdERhdGEoKSB7XHJcblx0XHR0aGlzLmZvcm0gPSB7fVxyXG5cdFx0dGhpcy5lcnJvckxpc3QgPSBbXVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICog5Yid5aeL5YyW6buY6K6k5o+Q56S65L+h5oGvXHJcblx0ICovXHJcblx0X19pbml0RGVmYXVsdHMoKSB7XHJcblx0XHR0aGlzLmRlZmF1bHRzID0ge1xyXG5cdFx0XHRtZXNzYWdlczoge1xyXG5cdFx0XHRcdHJlcXVpcmVkOiAn6L+Z5piv5b+F5aGr5a2X5q6144CCJyxcclxuXHRcdFx0XHRlbWFpbDogJ+ivt+i+k+WFpeacieaViOeahOeUteWtkOmCruS7tuWcsOWdgOOAgicsXHJcblx0XHRcdFx0dGVsOiAn6K+36L6T5YWlMTHkvY3nmoTmiYvmnLrlj7fnoIHjgIInLFxyXG5cdFx0XHRcdHVybDogJ+ivt+i+k+WFpeacieaViOeahOe9keWdgOOAgicsXHJcblx0XHRcdFx0ZGF0ZTogJ+ivt+i+k+WFpeacieaViOeahOaXpeacn+OAgicsXHJcblx0XHRcdFx0ZGF0ZUlTTzogJ+ivt+i+k+WFpeacieaViOeahOaXpeacn++8iElTT++8ie+8jOS+i+Wmgu+8mjIwMDktMDYtMjPvvIwxOTk4LzAxLzIy44CCJyxcclxuXHRcdFx0XHRudW1iZXI6ICfor7fovpPlhaXmnInmlYjnmoTmlbDlrZfjgIInLFxyXG5cdFx0XHRcdGRpZ2l0czogJ+WPquiDvei+k+WFpeaVsOWtl+OAgicsXHJcblx0XHRcdFx0aWRjYXJkOiAn6K+36L6T5YWlMTjkvY3nmoTmnInmlYjouqvku73or4HjgIInLFxyXG5cdFx0XHRcdGVxdWFsVG86IHRoaXMuZm9ybWF0VHBsKCfovpPlhaXlgLzlv4XpobvlkowgezB9IOebuOWQjOOAgicpLFxyXG5cdFx0XHRcdGNvbnRhaW5zOiB0aGlzLmZvcm1hdFRwbCgn6L6T5YWl5YC85b+F6aG75YyF5ZCrIHswfeOAgicpLFxyXG5cdFx0XHRcdG1pbmxlbmd0aDogdGhpcy5mb3JtYXRUcGwoJ+acgOWwkeimgei+k+WFpSB7MH0g5Liq5a2X56ym44CCJyksXHJcblx0XHRcdFx0bWF4bGVuZ3RoOiB0aGlzLmZvcm1hdFRwbCgn5pyA5aSa5Y+v5Lul6L6T5YWlIHswfSDkuKrlrZfnrKbjgIInKSxcclxuXHRcdFx0XHRyYW5nZWxlbmd0aDogdGhpcy5mb3JtYXRUcGwoJ+ivt+i+k+WFpemVv+W6puWcqCB7MH0g5YiwIHsxfSDkuYvpl7TnmoTlrZfnrKbjgIInKSxcclxuXHRcdFx0XHRtaW46IHRoaXMuZm9ybWF0VHBsKCfor7fovpPlhaXkuI3lsI/kuo4gezB9IOeahOaVsOWAvOOAgicpLFxyXG5cdFx0XHRcdG1heDogdGhpcy5mb3JtYXRUcGwoJ+ivt+i+k+WFpeS4jeWkp+S6jiB7MH0g55qE5pWw5YC844CCJyksXHJcblx0XHRcdFx0cmFuZ2U6IHRoaXMuZm9ybWF0VHBsKCfor7fovpPlhaXojIPlm7TlnKggezB9IOWIsCB7MX0g5LmL6Ze055qE5pWw5YC844CCJyksXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIOWIneWni+WMlum7mOiupOmqjOivgeaWueazlVxyXG5cdCAqL1xyXG5cdF9faW5pdE1ldGhvZHMoKSB7XHJcblx0XHRjb25zdCB0aGF0ID0gdGhpc1xyXG5cdFx0dGhhdC5tZXRob2RzID0ge1xyXG5cdFx0XHQvKipcclxuXHRcdFx0ICog6aqM6K+B5b+F5aGr5YWD57SgXHJcblx0XHRcdCAqL1xyXG5cdFx0XHRyZXF1aXJlZCh2YWx1ZSwgcGFyYW0pIHtcclxuXHRcdFx0XHRpZiAoIXRoYXQuZGVwZW5kKHBhcmFtKSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuICdkZXBlbmRlbmN5LW1pc21hdGNoJ1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xyXG5cdFx0XHRcdFx0dmFsdWUgPSB2YWx1ZS50b1N0cmluZygpXHJcblx0XHRcdFx0fSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xyXG5cdFx0XHRcdFx0cmV0dXJuICEwXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyZXR1cm4gdmFsdWUubGVuZ3RoID4gMFxyXG5cdFx0XHR9LFxyXG5cdFx0XHQvKipcclxuXHRcdFx0ICog6aqM6K+B55S15a2Q6YKu566x5qC85byPXHJcblx0XHRcdCAqL1xyXG5cdFx0XHRlbWFpbCh2YWx1ZSkge1xyXG5cdFx0XHRcdHJldHVybiB0aGF0Lm9wdGlvbmFsKHZhbHVlKSB8fCAvXlthLXpBLVowLTkuISMkJSYnKitcXC89P15fYHt8fX4tXStAW2EtekEtWjAtOV0oPzpbYS16QS1aMC05LV17MCw2MX1bYS16QS1aMC05XSk/KD86XFwuW2EtekEtWjAtOV0oPzpbYS16QS1aMC05LV17MCw2MX1bYS16QS1aMC05XSk/KSokLy50ZXN0KHZhbHVlKVxyXG5cdFx0XHR9LFxyXG5cdFx0XHQvKipcclxuXHRcdFx0ICog6aqM6K+B5omL5py65qC85byPXHJcblx0XHRcdCAqL1xyXG5cdFx0XHR0ZWwodmFsdWUpIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhhdC5vcHRpb25hbCh2YWx1ZSkgfHwgL14xWzM0NTc4XVxcZHs5fSQvLnRlc3QodmFsdWUpXHJcblx0XHRcdH0sXHJcblx0XHRcdC8qKlxyXG5cdFx0XHQgKiDpqozor4FVUkzmoLzlvI9cclxuXHRcdFx0ICovXHJcblx0XHRcdHVybCh2YWx1ZSkge1xyXG5cdFx0XHRcdHJldHVybiB0aGF0Lm9wdGlvbmFsKHZhbHVlKSB8fCAvXig/Oig/Oig/Omh0dHBzP3xmdHApOik/XFwvXFwvKSg/OlxcUysoPzo6XFxTKik/QCk/KD86KD8hKD86MTB8MTI3KSg/OlxcLlxcZHsxLDN9KXszfSkoPyEoPzoxNjlcXC4yNTR8MTkyXFwuMTY4KSg/OlxcLlxcZHsxLDN9KXsyfSkoPyExNzJcXC4oPzoxWzYtOV18MlxcZHwzWzAtMV0pKD86XFwuXFxkezEsM30pezJ9KSg/OlsxLTldXFxkP3wxXFxkXFxkfDJbMDFdXFxkfDIyWzAtM10pKD86XFwuKD86MT9cXGR7MSwyfXwyWzAtNF1cXGR8MjVbMC01XSkpezJ9KD86XFwuKD86WzEtOV1cXGQ/fDFcXGRcXGR8MlswLTRdXFxkfDI1WzAtNF0pKXwoPzooPzpbYS16XFx1MDBhMS1cXHVmZmZmMC05XS0qKSpbYS16XFx1MDBhMS1cXHVmZmZmMC05XSspKD86XFwuKD86W2EtelxcdTAwYTEtXFx1ZmZmZjAtOV0tKikqW2EtelxcdTAwYTEtXFx1ZmZmZjAtOV0rKSooPzpcXC4oPzpbYS16XFx1MDBhMS1cXHVmZmZmXXsyLH0pKS4/KSg/OjpcXGR7Miw1fSk/KD86Wy8/I11cXFMqKT8kL2kudGVzdCh2YWx1ZSlcclxuXHRcdFx0fSxcclxuXHRcdFx0LyoqXHJcblx0XHRcdCAqIOmqjOivgeaXpeacn+agvOW8j1xyXG5cdFx0XHQgKi9cclxuXHRcdFx0ZGF0ZSh2YWx1ZSkge1xyXG5cdFx0XHRcdHJldHVybiB0aGF0Lm9wdGlvbmFsKHZhbHVlKSB8fCAhL0ludmFsaWR8TmFOLy50ZXN0KG5ldyBEYXRlKHZhbHVlKS50b1N0cmluZygpKVxyXG5cdFx0XHR9LFxyXG5cdFx0XHQvKipcclxuXHRcdFx0ICog6aqM6K+BSVNP57G75Z6L55qE5pel5pyf5qC85byPXHJcblx0XHRcdCAqL1xyXG5cdFx0XHRkYXRlSVNPKHZhbHVlKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRoYXQub3B0aW9uYWwodmFsdWUpIHx8IC9eXFxkezR9W1xcL1xcLV0oMD9bMS05XXwxWzAxMl0pW1xcL1xcLV0oMD9bMS05XXxbMTJdWzAtOV18M1swMV0pJC8udGVzdCh2YWx1ZSlcclxuXHRcdFx0fSxcclxuXHRcdFx0LyoqXHJcblx0XHRcdCAqIOmqjOivgeWNgei/m+WItuaVsOWtl1xyXG5cdFx0XHQgKi9cclxuXHRcdFx0bnVtYmVyKHZhbHVlKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRoYXQub3B0aW9uYWwodmFsdWUpIHx8IC9eKD86LT9cXGQrfC0/XFxkezEsM30oPzosXFxkezN9KSspPyg/OlxcLlxcZCspPyQvLnRlc3QodmFsdWUpXHJcblx0XHRcdH0sXHJcblx0XHRcdC8qKlxyXG5cdFx0XHQgKiDpqozor4HmlbTmlbBcclxuXHRcdFx0ICovXHJcblx0XHRcdGRpZ2l0cyh2YWx1ZSkge1xyXG5cdFx0XHRcdHJldHVybiB0aGF0Lm9wdGlvbmFsKHZhbHVlKSB8fCAvXlxcZCskLy50ZXN0KHZhbHVlKVxyXG5cdFx0XHR9LFxyXG5cdFx0XHQvKipcclxuXHRcdFx0ICog6aqM6K+B6Lqr5Lu96K+B5Y+356CBXHJcblx0XHRcdCAqL1xyXG5cdFx0XHRpZGNhcmQodmFsdWUpIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhhdC5vcHRpb25hbCh2YWx1ZSkgfHwgL15bMS05XVxcZHs1fVsxLTldXFxkezN9KCgwXFxkKXwoMVswLTJdKSkoKFswfDF8Ml1cXGQpfDNbMC0xXSlcXGR7M30oWzAtOV18WCkkLy50ZXN0KHZhbHVlKVxyXG5cdFx0XHR9LFxyXG5cdFx0XHQvKipcclxuXHRcdFx0ICog6aqM6K+B5Lik5Liq6L6T5YWl5qGG55qE5YaF5a655piv5ZCm55u45ZCMXHJcblx0XHRcdCAqL1xyXG5cdFx0XHRlcXVhbFRvKHZhbHVlLCBwYXJhbSkge1xyXG5cdFx0XHRcdHJldHVybiB0aGF0Lm9wdGlvbmFsKHZhbHVlKSB8fCB2YWx1ZSA9PT0gdGhhdC5zY29wZS5kZXRhaWwudmFsdWVbcGFyYW1dXHJcblx0XHRcdH0sXHJcblx0XHRcdC8qKlxyXG5cdFx0XHQgKiDpqozor4HmmK/lkKbljIXlkKvmn5DkuKrlgLxcclxuXHRcdFx0ICovXHJcblx0XHRcdGNvbnRhaW5zKHZhbHVlLCBwYXJhbSkge1xyXG5cdFx0XHRcdHJldHVybiB0aGF0Lm9wdGlvbmFsKHZhbHVlKSB8fCB2YWx1ZS5pbmRleE9mKHBhcmFtKSA+PSAwXHJcblx0XHRcdH0sXHJcblx0XHRcdC8qKlxyXG5cdFx0XHQgKiDpqozor4HmnIDlsI/plb/luqZcclxuXHRcdFx0ICovXHJcblx0XHRcdG1pbmxlbmd0aCh2YWx1ZSwgcGFyYW0pIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhhdC5vcHRpb25hbCh2YWx1ZSkgfHwgdmFsdWUubGVuZ3RoID49IHBhcmFtXHJcblx0XHRcdH0sXHJcblx0XHRcdC8qKlxyXG5cdFx0XHQgKiDpqozor4HmnIDlpKfplb/luqZcclxuXHRcdFx0ICovXHJcblx0XHRcdG1heGxlbmd0aCh2YWx1ZSwgcGFyYW0pIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhhdC5vcHRpb25hbCh2YWx1ZSkgfHwgdmFsdWUubGVuZ3RoIDw9IHBhcmFtXHJcblx0XHRcdH0sXHJcblx0XHRcdC8qKlxyXG5cdFx0XHQgKiDpqozor4HkuIDkuKrplb/luqbojIPlm7RbbWluLCBtYXhdXHJcblx0XHRcdCAqL1xyXG5cdFx0XHRyYW5nZWxlbmd0aCh2YWx1ZSwgcGFyYW0pIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhhdC5vcHRpb25hbCh2YWx1ZSkgfHwgKHZhbHVlLmxlbmd0aCA+PSBwYXJhbVswXSAmJiB2YWx1ZS5sZW5ndGggPD0gcGFyYW1bMV0pXHJcblx0XHRcdH0sXHJcblx0XHRcdC8qKlxyXG5cdFx0XHQgKiDpqozor4HmnIDlsI/lgLxcclxuXHRcdFx0ICovXHJcblx0XHRcdG1pbih2YWx1ZSwgcGFyYW0pIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhhdC5vcHRpb25hbCh2YWx1ZSkgfHwgdmFsdWUgPj0gcGFyYW1cclxuXHRcdFx0fSxcclxuXHRcdFx0LyoqXHJcblx0XHRcdCAqIOmqjOivgeacgOWkp+WAvFxyXG5cdFx0XHQgKi9cclxuXHRcdFx0bWF4KHZhbHVlLCBwYXJhbSkge1xyXG5cdFx0XHRcdHJldHVybiB0aGF0Lm9wdGlvbmFsKHZhbHVlKSB8fCB2YWx1ZSA8PSBwYXJhbVxyXG5cdFx0XHR9LFxyXG5cdFx0XHQvKipcclxuXHRcdFx0ICog6aqM6K+B5LiA5Liq5YC86IyD5Zu0W21pbiwgbWF4XVxyXG5cdFx0XHQgKi9cclxuXHRcdFx0cmFuZ2UodmFsdWUsIHBhcmFtKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRoYXQub3B0aW9uYWwodmFsdWUpIHx8ICh2YWx1ZSA+PSBwYXJhbVswXSAmJiB2YWx1ZSA8PSBwYXJhbVsxXSlcclxuXHRcdFx0fSxcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIOa3u+WKoOiHquWumuS5iemqjOivgeaWueazlVxyXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIOaWueazleWQjVxyXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IG1ldGhvZCDlh73mlbDkvZPvvIzmjqXmlLbkuKTkuKrlj4LmlbAodmFsdWUsIHBhcmFtKe+8jHZhbHVl6KGo56S65YWD57Sg55qE5YC877yMcGFyYW3ooajnpLrlj4LmlbBcclxuXHQgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSDmj5DnpLrkv6Hmga9cclxuXHQgKi9cclxuXHRhZGRNZXRob2QobmFtZSwgbWV0aG9kLCBtZXNzYWdlKSB7XHJcblx0XHR0aGlzLm1ldGhvZHNbbmFtZV0gPSBtZXRob2RcclxuXHRcdHRoaXMuZGVmYXVsdHMubWVzc2FnZXNbbmFtZV0gPSBtZXNzYWdlICE9PSB1bmRlZmluZWQgPyBtZXNzYWdlIDogdGhpcy5kZWZhdWx0cy5tZXNzYWdlc1tuYW1lXVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICog5Yik5pat6aqM6K+B5pa55rOV5piv5ZCm5a2Y5ZyoXHJcblx0ICovXHJcblx0aXNWYWxpZE1ldGhvZCh2YWx1ZSkge1xyXG5cdFx0bGV0IG1ldGhvZHMgPSBbXVxyXG5cdFx0Zm9yKGxldCBtZXRob2QgaW4gdGhpcy5tZXRob2RzKSB7XHJcblx0XHRcdGlmIChtZXRob2QgJiYgdHlwZW9mIHRoaXMubWV0aG9kc1ttZXRob2RdID09PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0bWV0aG9kcy5wdXNoKG1ldGhvZClcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIG1ldGhvZHMuaW5kZXhPZih2YWx1ZSkgIT09IC0xXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiDmoLzlvI/ljJbmj5DnpLrkv6Hmga/mqKHmnb9cclxuXHQgKi9cclxuXHRmb3JtYXRUcGwoc291cmNlLCBwYXJhbXMpIHtcclxuXHRcdGNvbnN0IHRoYXQgPSB0aGlzXHJcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xyXG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0bGV0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cylcclxuXHRcdFx0XHRhcmdzLnVuc2hpZnQoc291cmNlKVxyXG5cdFx0XHRcdHJldHVybiB0aGF0LmZvcm1hdFRwbC5hcHBseSh0aGlzLCBhcmdzKVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRpZiAocGFyYW1zID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0cmV0dXJuIHNvdXJjZVxyXG5cdFx0fVxyXG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIHBhcmFtcy5jb25zdHJ1Y3RvciAhPT0gQXJyYXkpIHtcclxuXHRcdFx0cGFyYW1zID0gQXJyYXkuZnJvbShhcmd1bWVudHMpLnNsaWNlKDEpXHJcblx0XHR9XHJcblx0XHRpZiAocGFyYW1zLmNvbnN0cnVjdG9yICE9PSBBcnJheSkge1xyXG5cdFx0XHRwYXJhbXMgPSBbIHBhcmFtcyBdXHJcblx0XHR9XHJcblx0XHRwYXJhbXMuZm9yRWFjaChmdW5jdGlvbihuLCBpKSB7XHJcblx0XHRcdHNvdXJjZSA9IHNvdXJjZS5yZXBsYWNlKG5ldyBSZWdFeHAoXCJcXFxce1wiICsgaSArIFwiXFxcXH1cIiwgXCJnXCIpLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRyZXR1cm4gblxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHRcdHJldHVybiBzb3VyY2VcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIOWIpOaWreinhOWImeS+nei1luaYr+WQpuWtmOWcqFxyXG5cdCAqL1xyXG5cdGRlcGVuZChwYXJhbSkge1xyXG5cdFx0c3dpdGNoKHR5cGVvZiBwYXJhbSkge1xyXG5cdFx0XHRjYXNlICdib29sZWFuJzpcclxuXHRcdFx0XHRwYXJhbSA9IHBhcmFtXHJcblx0XHRcdFx0YnJlYWtcclxuXHRcdFx0Y2FzZSAnc3RyaW5nJzpcclxuXHRcdFx0XHRwYXJhbSA9ICEhcGFyYW0ubGVuZ3RoXHJcblx0XHRcdFx0YnJlYWtcclxuXHRcdFx0Y2FzZSAnZnVuY3Rpb24nOlxyXG5cdFx0XHRcdHBhcmFtID0gcGFyYW0oKVxyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdHBhcmFtID0gITBcclxuXHRcdH1cclxuXHRcdHJldHVybiBwYXJhbVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICog5Yik5pat6L6T5YWl5YC85piv5ZCm5Li656m6XHJcblx0ICovXHJcblx0b3B0aW9uYWwodmFsdWUpIHtcclxuXHRcdHJldHVybiAhdGhpcy5tZXRob2RzLnJlcXVpcmVkKHZhbHVlKSAmJiAnZGVwZW5kZW5jeS1taXNtYXRjaCdcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIOiOt+WPluiHquWumuS5ieWtl+auteeahOaPkOekuuS/oeaBr1xyXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBwYXJhbSDlrZfmrrXlkI1cclxuXHQgKiBAcGFyYW0ge09iamVjdH0gcnVsZSDop4TliJlcclxuXHQgKi9cclxuXHRjdXN0b21NZXNzYWdlKHBhcmFtLCBydWxlKSB7XHJcblx0XHRjb25zdCBwYXJhbXMgPSB0aGlzLm1lc3NhZ2VzW3BhcmFtXVxyXG5cdFx0Y29uc3QgaXNPYmplY3QgPSB0eXBlb2YgcGFyYW1zID09PSAnb2JqZWN0J1xyXG5cdFx0aWYgKHBhcmFtcyAmJiBpc09iamVjdCkgcmV0dXJuIHBhcmFtc1tydWxlLm1ldGhvZF1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIOiOt+WPluafkOS4quaMh+WumuWtl+auteeahOaPkOekuuS/oeaBr1xyXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBwYXJhbSDlrZfmrrXlkI1cclxuXHQgKiBAcGFyYW0ge09iamVjdH0gcnVsZSDop4TliJlcclxuXHQgKi9cclxuXHRkZWZhdWx0TWVzc2FnZShwYXJhbSwgcnVsZSkge1xyXG5cdFx0bGV0IG1lc3NhZ2UgPSB0aGlzLmN1c3RvbU1lc3NhZ2UocGFyYW0sIHJ1bGUpIHx8IHRoaXMuZGVmYXVsdHMubWVzc2FnZXNbcnVsZS5tZXRob2RdXHJcblx0XHRsZXQgdHlwZSA9IHR5cGVvZiBtZXNzYWdlXHJcblx0XHRcclxuXHRcdGlmICh0eXBlID09PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRtZXNzYWdlID0gYFdhcm5pbmc6IE5vIG1lc3NhZ2UgZGVmaW5lZCBmb3IgJHtydWxlLm1ldGhvZH0uYFxyXG5cdFx0fSBlbHNlIGlmICh0eXBlID09PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdG1lc3NhZ2UgPSBtZXNzYWdlLmNhbGwodGhpcywgcnVsZS5wYXJhbWV0ZXJzKVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBtZXNzYWdlXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiDnvJPlrZjplJnor6/kv6Hmga9cclxuXHQgKiBAcGFyYW0ge1N0cmluZ30gcGFyYW0g5a2X5q615ZCNXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IHJ1bGUg6KeE5YiZXHJcblx0ICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlIOWFg+e0oOeahOWAvFxyXG5cdCAqL1xyXG5cdGZvcm1hdFRwbEFuZEFkZChwYXJhbSwgcnVsZSwgdmFsdWUpIHtcclxuXHRcdGxldCBtc2cgPSB0aGlzLmRlZmF1bHRNZXNzYWdlKHBhcmFtLCBydWxlKVxyXG5cclxuXHRcdHRoaXMuZXJyb3JMaXN0LnB1c2goe1xyXG5cdFx0XHRwYXJhbTogcGFyYW0sIFxyXG5cdFx0XHRtc2c6IG1zZywgXHJcblx0XHRcdHZhbHVlOiB2YWx1ZSwgXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICog6aqM6K+B5p+Q5Liq5oyH5a6a5a2X5q6155qE6KeE5YiZXHJcblx0ICogQHBhcmFtIHtTdHJpbmd9IHBhcmFtIOWtl+auteWQjVxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBydWxlcyDop4TliJlcclxuXHQgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQg6KGo5Y2V5pWw5o2u5a+56LGhXHJcblx0ICovXHJcblx0Y2hlY2tQYXJhbShwYXJhbSwgcnVsZXMsIGV2ZW50KSB7XHJcblxyXG5cdFx0Ly8g57yT5a2Y6KGo5Y2V5pWw5o2u5a+56LGhXHJcblx0XHR0aGlzLnNjb3BlID0gZXZlbnRcclxuXHJcblx0XHQvLyDnvJPlrZjlrZfmrrXlr7nlupTnmoTlgLxcclxuXHRcdGNvbnN0IGRhdGEgPSBldmVudC5kZXRhaWwudmFsdWVcclxuXHRcdGNvbnN0IHZhbHVlID0gZGF0YVtwYXJhbV0gfHwgJydcclxuXHJcblx0XHQvLyDpgY3ljobmn5DkuKrmjIflrprlrZfmrrXnmoTmiYDmnInop4TliJnvvIzkvp3mrKHpqozor4Hop4TliJnvvIzlkKbliJnnvJPlrZjplJnor6/kv6Hmga9cclxuXHRcdGZvcihsZXQgbWV0aG9kIGluIHJ1bGVzKSB7XHJcblxyXG5cdFx0XHQvLyDliKTmlq3pqozor4Hmlrnms5XmmK/lkKblrZjlnKhcclxuXHRcdFx0aWYgKHRoaXMuaXNWYWxpZE1ldGhvZChtZXRob2QpKSB7XHJcblxyXG5cdFx0XHRcdC8vIOe8k+WtmOinhOWImeeahOWxnuaAp+WPiuWAvFxyXG5cdFx0XHRcdGNvbnN0IHJ1bGUgPSB7IFxyXG5cdFx0XHRcdFx0bWV0aG9kOiBtZXRob2QsIFxyXG5cdFx0XHRcdFx0cGFyYW1ldGVyczogcnVsZXNbbWV0aG9kXSBcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIOiwg+eUqOmqjOivgeaWueazlVxyXG5cdFx0XHRcdGNvbnN0IHJlc3VsdCA9IHRoaXMubWV0aG9kc1ttZXRob2RdKHZhbHVlLCBydWxlLnBhcmFtZXRlcnMpXHJcblx0XHRcdFx0XHJcblx0XHRcdFx0Ly8g6IulcmVzdWx06L+U5Zue5YC85Li6ZGVwZW5kZW5jeS1taXNtYXRjaO+8jOWImeivtOaYjuivpeWtl+auteeahOWAvOS4uuepuuaIlumdnuW/heWhq+Wtl+autVxyXG5cdFx0XHRcdGlmIChyZXN1bHQgPT09ICdkZXBlbmRlbmN5LW1pc21hdGNoJykge1xyXG5cdFx0XHRcdFx0Y29udGludWVcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHRoaXMuc2V0VmFsdWUocGFyYW0sIG1ldGhvZCwgcmVzdWx0LCB2YWx1ZSlcclxuXHJcblx0XHRcdFx0Ly8g5Yik5pat5piv5ZCm6YCa6L+H6aqM6K+B77yM5ZCm5YiZ57yT5a2Y6ZSZ6K+v5L+h5oGv77yM6Lez5Ye65b6q546vXHJcblx0XHRcdFx0aWYgKCFyZXN1bHQpIHtcclxuXHRcdFx0XHRcdHRoaXMuZm9ybWF0VHBsQW5kQWRkKHBhcmFtLCBydWxlLCB2YWx1ZSlcclxuXHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiDorr7nva7lrZfmrrXnmoTpu5jorqTpqozor4HlgLxcclxuXHQgKiBAcGFyYW0ge1N0cmluZ30gcGFyYW0g5a2X5q615ZCNXHJcblx0ICovXHJcblx0c2V0VmlldyhwYXJhbSkge1xyXG5cdFx0dGhpcy5mb3JtW3BhcmFtXSA9IHtcclxuXHRcdFx0JG5hbWU6IHBhcmFtLCBcclxuXHRcdFx0JHZhbGlkOiB0cnVlLCBcclxuXHRcdFx0JGludmFsaWQ6IGZhbHNlLCBcclxuXHRcdFx0JGVycm9yOiB7fSwgXHJcblx0XHRcdCRzdWNjZXNzOiB7fSwgXHJcblx0XHRcdCR2aWV3VmFsdWU6IGBgLCBcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIOiuvue9ruWtl+auteeahOmqjOivgeWAvFxyXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBwYXJhbSDlrZfmrrXlkI1cclxuXHQgKiBAcGFyYW0ge1N0cmluZ30gbWV0aG9kIOWtl+auteeahOaWueazlVxyXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gcmVzdWx0IOaYr+WQpumAmui/h+mqjOivgVxyXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZSDlrZfmrrXnmoTlgLxcclxuXHQgKi9cclxuXHRzZXRWYWx1ZShwYXJhbSwgbWV0aG9kLCByZXN1bHQsIHZhbHVlKSB7XHJcblx0XHRjb25zdCBwYXJhbXMgPSB0aGlzLmZvcm1bcGFyYW1dXHJcblx0XHRwYXJhbXMuJHZhbGlkID0gcmVzdWx0XHJcblx0XHRwYXJhbXMuJGludmFsaWQgPSAhcmVzdWx0XHJcblx0XHRwYXJhbXMuJGVycm9yW21ldGhvZF0gPSAhcmVzdWx0XHJcblx0XHRwYXJhbXMuJHN1Y2Nlc3NbbWV0aG9kXSA9IHJlc3VsdFxyXG5cdFx0cGFyYW1zLiR2aWV3VmFsdWUgPSB2YWx1ZVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICog6aqM6K+B5omA5pyJ5a2X5q6155qE6KeE5YiZ77yM6L+U5Zue6aqM6K+B5piv5ZCm6YCa6L+HXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IOihqOWNleaVsOaNruWvueixoVxyXG5cdCAqL1xyXG5cdGNoZWNrRm9ybShldmVudCkge1xyXG5cdFx0dGhpcy5fX2luaXREYXRhKClcclxuXHJcblx0XHRmb3IgKGxldCBwYXJhbSBpbiB0aGlzLnJ1bGVzKSB7XHJcblx0XHRcdHRoaXMuc2V0VmlldyhwYXJhbSlcclxuXHRcdFx0dGhpcy5jaGVja1BhcmFtKHBhcmFtLCB0aGlzLnJ1bGVzW3BhcmFtXSwgZXZlbnQpXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMudmFsaWQoKVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICog6L+U5Zue6aqM6K+B5piv5ZCm6YCa6L+HXHJcblx0ICovXHJcblx0dmFsaWQoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5zaXplKCkgPT09IDBcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIOi/lOWbnumUmeivr+S/oeaBr+eahOS4quaVsFxyXG5cdCAqL1xyXG5cdHNpemUoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5lcnJvckxpc3QubGVuZ3RoXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiDov5Tlm57miYDmnInplJnor6/kv6Hmga9cclxuXHQgKi9cclxuXHR2YWxpZGF0aW9uRXJyb3JzKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuZXJyb3JMaXN0XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBXeFZhbGlkYXRlIl19