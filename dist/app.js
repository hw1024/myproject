'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _WxValidate = require('./assets/plugins/wx-validate/WxValidate.js');

var _WxValidate2 = _interopRequireDefault(_WxValidate);

var _WxService = require('./assets/plugins/wx-service/WxService.js');

var _WxService2 = _interopRequireDefault(_WxService);

var _HttpService = require('./helpers/HttpService.js');

var _HttpService2 = _interopRequireDefault(_HttpService);

var _HttpResource = require('./helpers/HttpResource.js');

var _HttpResource2 = _interopRequireDefault(_HttpResource);

var _config = require('./etc/config.js');

var _config2 = _interopRequireDefault(_config);

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./npm/wepy-async-function/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _default = function (_wepy$app) {
  _inherits(_default, _wepy$app);

  function _default() {
    _classCallCheck(this, _default);

    var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this));

    _this.config = {
      pages: ['pages/index', 'pages/convert', 'pages/manage/index', 'pages/manage/detail', 'pages/game/index'],
      window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#00BFFF',
        navigationBarTitleText: 'WeChat',
        navigationBarTextStyle: 'white'
      }
    };
    _this.globalData = {
      userInfo: null
    };
    _this.HttpService = new _HttpService2.default({
      baseURL: _config2.default.basePath
    });
    _this.WxService = new _WxService2.default();

    _this.WxValidate = function (rules, messages) {
      return new _WxValidate2.default(rules, messages);
    };

    _this.HttpResource = function (url, paramDefaults, actions, options) {
      return new _HttpResource2.default(url, paramDefaults, actions, options).init();
    };

    _this.use('requestfix');
    return _this;
  }

  _createClass(_default, [{
    key: 'onLaunch',
    value: function onLaunch() {
      this.testAsync();
      this.getUserInfo();
    }
  }, {
    key: 'sleep',
    value: function sleep(s) {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve('promise resolved');
        }, s * 1000);
      });
    }
  }, {
    key: 'testAsync',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.sleep(22);

              case 2:
                data = _context.sent;

                console.log(data);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function testAsync() {
        return _ref.apply(this, arguments);
      }

      return testAsync;
    }()
  }, {
    key: 'getUserInfo',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(cb) {
        var that;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                that = this;

                if (!that.globalData.userInfo) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt('return', that.globalData.userInfo);

              case 3:
                _wepy2.default.login({
                  success: function success(res) {
                    console.log(res);
                    _wepy2.default.getUserInfo({
                      success: function success(res) {
                        that.globalData.userInfo = res.userInfo;
                        cb && cb(res.userInfo);
                      }
                    });
                  }
                });

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getUserInfo(_x) {
        return _ref2.apply(this, arguments);
      }

      return getUserInfo;
    }()
  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {"noPromiseAPI":["createSelectorQuery"]}));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJIdHRwU2VydmljZSIsImJhc2VVUkwiLCJiYXNlUGF0aCIsIld4U2VydmljZSIsIld4VmFsaWRhdGUiLCJydWxlcyIsIm1lc3NhZ2VzIiwiSHR0cFJlc291cmNlIiwidXJsIiwicGFyYW1EZWZhdWx0cyIsImFjdGlvbnMiLCJvcHRpb25zIiwiaW5pdCIsInVzZSIsInRlc3RBc3luYyIsImdldFVzZXJJbmZvIiwicyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwic2V0VGltZW91dCIsInNsZWVwIiwiZGF0YSIsImNvbnNvbGUiLCJsb2ciLCJjYiIsInRoYXQiLCJsb2dpbiIsInN1Y2Nlc3MiLCJyZXMiLCJhcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUFtQkUsc0JBQWU7QUFBQTs7QUFBQTs7QUFBQSxVQWhCZkEsTUFnQmUsR0FoQk47QUFDUEMsYUFBTyxDQUNMLGFBREssRUFFTCxlQUZLLEVBR0wsb0JBSEssRUFJTCxxQkFKSyxFQUtMLGtCQUxLLENBREE7QUFRUEMsY0FBUTtBQUNOQyw2QkFBcUIsT0FEZjtBQUVOQyxzQ0FBOEIsU0FGeEI7QUFHTkMsZ0NBQXdCLFFBSGxCO0FBSU5DLGdDQUF3QjtBQUpsQjtBQVJELEtBZ0JNO0FBQUEsVUF5Q2ZDLFVBekNlLEdBeUNGO0FBQ1hDLGdCQUFVO0FBREMsS0F6Q0U7QUFBQSxVQTRDZkMsV0E1Q2UsR0E0Q0QsMEJBQWdCO0FBQzVCQyxlQUFTLGlCQUFTQztBQURVLEtBQWhCLENBNUNDO0FBQUEsVUErQ2ZDLFNBL0NlLEdBK0NILHlCQS9DRzs7QUFBQSxVQWlEZkMsVUFqRGUsR0FpREYsVUFBQ0MsS0FBRCxFQUFRQyxRQUFSO0FBQUEsYUFBcUIseUJBQWVELEtBQWYsRUFBc0JDLFFBQXRCLENBQXJCO0FBQUEsS0FqREU7O0FBQUEsVUFrRGZDLFlBbERlLEdBa0RBLFVBQUNDLEdBQUQsRUFBTUMsYUFBTixFQUFxQkMsT0FBckIsRUFBOEJDLE9BQTlCO0FBQUEsYUFBMEMsMkJBQWlCSCxHQUFqQixFQUFzQkMsYUFBdEIsRUFBcUNDLE9BQXJDLEVBQThDQyxPQUE5QyxFQUF1REMsSUFBdkQsRUFBMUM7QUFBQSxLQWxEQTs7QUFFYixVQUFLQyxHQUFMLENBQVMsWUFBVDtBQUZhO0FBR2Q7Ozs7K0JBRVU7QUFDVCxXQUFLQyxTQUFMO0FBQ0EsV0FBS0MsV0FBTDtBQUNEOzs7MEJBRU1DLEMsRUFBRztBQUNSLGFBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0Q0MsbUJBQVcsWUFBTTtBQUNmRixrQkFBUSxrQkFBUjtBQUNELFNBRkQsRUFFR0YsSUFBSSxJQUZQO0FBR0QsT0FKTSxDQUFQO0FBS0Q7Ozs7Ozs7Ozs7O3VCQUdvQixLQUFLSyxLQUFMLENBQVcsRUFBWCxDOzs7QUFBYkMsb0I7O0FBQ05DLHdCQUFRQyxHQUFSLENBQVlGLElBQVo7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NEZBR2dCRyxFOzs7Ozs7QUFDVkMsb0IsR0FBTyxJOztxQkFDVEEsS0FBSzVCLFVBQUwsQ0FBZ0JDLFE7Ozs7O2tEQUNYMkIsS0FBSzVCLFVBQUwsQ0FBZ0JDLFE7OztBQUV6QiwrQkFBSzRCLEtBQUwsQ0FBVztBQUNUQyx5QkFEUyxtQkFDQUMsR0FEQSxFQUNLO0FBQ1pOLDRCQUFRQyxHQUFSLENBQVlLLEdBQVo7QUFDQSxtQ0FBS2QsV0FBTCxDQUFpQjtBQUNmYSw2QkFEZSxtQkFDTkMsR0FETSxFQUNEO0FBQ1pILDZCQUFLNUIsVUFBTCxDQUFnQkMsUUFBaEIsR0FBMkI4QixJQUFJOUIsUUFBL0I7QUFDQTBCLDhCQUFNQSxHQUFHSSxJQUFJOUIsUUFBUCxDQUFOO0FBQ0Q7QUFKYyxxQkFBakI7QUFNRDtBQVRRLGlCQUFYOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBN0N5QixlQUFLK0IsRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IFd4VmFsaWRhdGUgZnJvbSAnLi9hc3NldHMvcGx1Z2lucy93eC12YWxpZGF0ZS9XeFZhbGlkYXRlJ1xyXG5pbXBvcnQgV3hTZXJ2aWNlIGZyb20gJy4vYXNzZXRzL3BsdWdpbnMvd3gtc2VydmljZS9XeFNlcnZpY2UnXHJcbmltcG9ydCBIdHRwU2VydmljZSBmcm9tICcuL2hlbHBlcnMvSHR0cFNlcnZpY2UnXHJcbmltcG9ydCBIdHRwUmVzb3VyY2UgZnJvbSAnLi9oZWxwZXJzL0h0dHBSZXNvdXJjZSdcclxuaW1wb3J0IF9fY29uZmlnIGZyb20gJy4vZXRjL2NvbmZpZydcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgcGFnZXM6IFtcclxuICAgICAgJ3BhZ2VzL2luZGV4JyxcclxuICAgICAgJ3BhZ2VzL2NvbnZlcnQnLFxyXG4gICAgICAncGFnZXMvbWFuYWdlL2luZGV4JyxcclxuICAgICAgJ3BhZ2VzL21hbmFnZS9kZXRhaWwnLFxyXG4gICAgICAncGFnZXMvZ2FtZS9pbmRleCdcclxuICAgIF0sXHJcbiAgICB3aW5kb3c6IHtcclxuICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2xpZ2h0JyxcclxuICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyMwMEJGRkYnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAnV2VDaGF0JyxcclxuICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ3doaXRlJ1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IgKCkge1xyXG4gICAgc3VwZXIoKVxyXG4gICAgdGhpcy51c2UoJ3JlcXVlc3RmaXgnKVxyXG4gIH1cclxuXHJcbiAgb25MYXVuY2goKSB7XHJcbiAgICB0aGlzLnRlc3RBc3luYygpXHJcbiAgICB0aGlzLmdldFVzZXJJbmZvKClcclxuICB9XHJcblxyXG4gIHNsZWVwIChzKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICByZXNvbHZlKCdwcm9taXNlIHJlc29sdmVkJylcclxuICAgICAgfSwgcyAqIDEwMDApXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgdGVzdEFzeW5jICgpIHtcclxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLnNsZWVwKDIyKVxyXG4gICAgY29uc29sZS5sb2coZGF0YSlcclxuICB9XHJcblxyXG4gIGFzeW5jIGdldFVzZXJJbmZvKGNiKSB7XHJcbiAgICBjb25zdCB0aGF0ID0gdGhpc1xyXG4gICAgaWYgKHRoYXQuZ2xvYmFsRGF0YS51c2VySW5mbykge1xyXG4gICAgICByZXR1cm4gdGhhdC5nbG9iYWxEYXRhLnVzZXJJbmZvXHJcbiAgICB9XHJcbiAgICB3ZXB5LmxvZ2luKHtcclxuICAgICAgc3VjY2VzcyAocmVzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgIHdlcHkuZ2V0VXNlckluZm8oe1xyXG4gICAgICAgICAgc3VjY2VzcyAocmVzKSB7XHJcbiAgICAgICAgICAgIHRoYXQuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHJlcy51c2VySW5mb1xyXG4gICAgICAgICAgICBjYiAmJiBjYihyZXMudXNlckluZm8pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIGdsb2JhbERhdGEgPSB7XHJcbiAgICB1c2VySW5mbzogbnVsbFxyXG4gIH1cclxuICBIdHRwU2VydmljZSA9IG5ldyBIdHRwU2VydmljZSh7XHJcbiAgICBiYXNlVVJMOiBfX2NvbmZpZy5iYXNlUGF0aFxyXG4gIH0pXHJcbiAgV3hTZXJ2aWNlID0gbmV3IFd4U2VydmljZSgpXHJcbiAgX19jb25maWdcclxuICBXeFZhbGlkYXRlID0gKHJ1bGVzLCBtZXNzYWdlcykgPT4gbmV3IFd4VmFsaWRhdGUocnVsZXMsIG1lc3NhZ2VzKVxyXG4gIEh0dHBSZXNvdXJjZSA9ICh1cmwsIHBhcmFtRGVmYXVsdHMsIGFjdGlvbnMsIG9wdGlvbnMpID0+IG5ldyBIdHRwUmVzb3VyY2UodXJsLCBwYXJhbURlZmF1bHRzLCBhY3Rpb25zLCBvcHRpb25zKS5pbml0KClcclxufVxyXG4iXX0=