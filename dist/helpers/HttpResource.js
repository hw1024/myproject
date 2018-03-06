'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('./../etc/config.js');

var _config2 = _interopRequireDefault(_config);

var _index = require('./../assets/plugins/wx-resource/lib/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HttpResource = function () {
  function HttpResource(url, paramDefaults, actions, options) {
    _classCallCheck(this, HttpResource);

    Object.assign(this, {
      url: url,
      paramDefaults: paramDefaults,
      actions: actions,
      options: options
    });
  }

  /**
   * 返回实例对象
   */


  _createClass(HttpResource, [{
    key: 'init',
    value: function init() {
      var resource = new _index2.default(this.setUrl(this.url), this.paramDefaults, this.actions, this.options);
      resource.interceptors.use(this.setInterceptors());
      return resource;
    }

    /**
     * 设置请求路径
     */

  }, {
    key: 'setUrl',
    value: function setUrl(url) {
      return '' + _config2.default.basePath + url;
    }

    /**
     * 拦截器
     */

  }, {
    key: 'setInterceptors',
    value: function setInterceptors() {
      return {
        request: function request(_request) {
          _request.header = _request.header || {};
          _request.header['content-type'] = 'application/json';
          if (_request.url.indexOf('/sp_api') !== -1 && wx.getStorageSync('token')) {
            _request.header.Authorization = 'Bearer ' + wx.getStorageSync('token');
          }
          wx.showLoading({
            title: '加载中'
          });
          return _request;
        },
        requestError: function requestError(_requestError) {
          wx.hideLoading();
          return Promise.reject(_requestError);
        },
        response: function response(_response) {
          wx.hideLoading();
          // if(response.statusCode === 401) {
          //     wx.removeStorageSync('token')
          //     wx.redirectTo({
          //         url: '/pages/login/index'
          //     })
          // }
          return _response;
        },
        responseError: function responseError(_responseError) {
          wx.hideLoading();
          return Promise.reject(_responseError);
        }
      };
    }
  }]);

  return HttpResource;
}();

exports.default = HttpResource;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkh0dHBSZXNvdXJjZS5qcyJdLCJuYW1lcyI6WyJIdHRwUmVzb3VyY2UiLCJ1cmwiLCJwYXJhbURlZmF1bHRzIiwiYWN0aW9ucyIsIm9wdGlvbnMiLCJPYmplY3QiLCJhc3NpZ24iLCJyZXNvdXJjZSIsInNldFVybCIsImludGVyY2VwdG9ycyIsInVzZSIsInNldEludGVyY2VwdG9ycyIsImJhc2VQYXRoIiwicmVxdWVzdCIsImhlYWRlciIsImluZGV4T2YiLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwiQXV0aG9yaXphdGlvbiIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJyZXF1ZXN0RXJyb3IiLCJoaWRlTG9hZGluZyIsIlByb21pc2UiLCJyZWplY3QiLCJyZXNwb25zZSIsInJlc3BvbnNlRXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7SUFFTUEsWTtBQUNMLHdCQUFZQyxHQUFaLEVBQWlCQyxhQUFqQixFQUFnQ0MsT0FBaEMsRUFBeUNDLE9BQXpDLEVBQWtEO0FBQUE7O0FBQ2pEQyxXQUFPQyxNQUFQLENBQWMsSUFBZCxFQUFvQjtBQUNuQkwsY0FEbUI7QUFFbkJDLGtDQUZtQjtBQUduQkMsc0JBSG1CO0FBSW5CQztBQUptQixLQUFwQjtBQU1BOztBQUVEOzs7Ozs7OzJCQUdPO0FBQ04sVUFBTUcsV0FBVyxvQkFBZSxLQUFLQyxNQUFMLENBQVksS0FBS1AsR0FBakIsQ0FBZixFQUFzQyxLQUFLQyxhQUEzQyxFQUEwRCxLQUFLQyxPQUEvRCxFQUF3RSxLQUFLQyxPQUE3RSxDQUFqQjtBQUNBRyxlQUFTRSxZQUFULENBQXNCQyxHQUF0QixDQUEwQixLQUFLQyxlQUFMLEVBQTFCO0FBQ0EsYUFBT0osUUFBUDtBQUNBOztBQUVEOzs7Ozs7MkJBR09OLEcsRUFBSztBQUNYLGtCQUFVLGlCQUFTVyxRQUFuQixHQUE4QlgsR0FBOUI7QUFDQTs7QUFFRDs7Ozs7O3NDQUdrQjtBQUNqQixhQUFPO0FBQ0dZLGVBREgsbUJBQ1dBLFFBRFgsRUFDb0I7QUFDYkEsbUJBQVFDLE1BQVIsR0FBaUJELFNBQVFDLE1BQVIsSUFBa0IsRUFBbkM7QUFDQUQsbUJBQVFDLE1BQVIsQ0FBZSxjQUFmLElBQWlDLGtCQUFqQztBQUNBLGNBQUlELFNBQVFaLEdBQVIsQ0FBWWMsT0FBWixDQUFvQixTQUFwQixNQUFtQyxDQUFDLENBQXBDLElBQXlDQyxHQUFHQyxjQUFILENBQWtCLE9BQWxCLENBQTdDLEVBQXlFO0FBQ3JFSixxQkFBUUMsTUFBUixDQUFlSSxhQUFmLEdBQStCLFlBQVlGLEdBQUdDLGNBQUgsQ0FBa0IsT0FBbEIsQ0FBM0M7QUFDSDtBQUNERCxhQUFHRyxXQUFILENBQWU7QUFDWEMsbUJBQU87QUFESSxXQUFmO0FBR0EsaUJBQU9QLFFBQVA7QUFDSCxTQVhKO0FBWUdRLG9CQVpILHdCQVlnQkEsYUFaaEIsRUFZOEI7QUFDdkJMLGFBQUdNLFdBQUg7QUFDQSxpQkFBT0MsUUFBUUMsTUFBUixDQUFlSCxhQUFmLENBQVA7QUFDSCxTQWZKO0FBZ0JHSSxnQkFoQkgsb0JBZ0JZQSxTQWhCWixFQWdCc0I7QUFDZlQsYUFBR00sV0FBSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFPRyxTQUFQO0FBQ0gsU0F6Qko7QUEwQkdDLHFCQTFCSCx5QkEwQmlCQSxjQTFCakIsRUEwQmdDO0FBQ3pCVixhQUFHTSxXQUFIO0FBQ0EsaUJBQU9DLFFBQVFDLE1BQVIsQ0FBZUUsY0FBZixDQUFQO0FBQ0g7QUE3QkosT0FBUDtBQStCQTs7Ozs7O2tCQUdhMUIsWSIsImZpbGUiOiJIdHRwUmVzb3VyY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgX19jb25maWcgZnJvbSAnLi4vZXRjL2NvbmZpZydcclxuaW1wb3J0IFd4UmVzb3VyY2UgZnJvbSAnLi4vYXNzZXRzL3BsdWdpbnMvd3gtcmVzb3VyY2UvbGliL2luZGV4J1xyXG5cclxuY2xhc3MgSHR0cFJlc291cmNlIHtcclxuXHRjb25zdHJ1Y3Rvcih1cmwsIHBhcmFtRGVmYXVsdHMsIGFjdGlvbnMsIG9wdGlvbnMpIHtcclxuXHRcdE9iamVjdC5hc3NpZ24odGhpcywge1xyXG5cdFx0XHR1cmwsIFxyXG5cdFx0XHRwYXJhbURlZmF1bHRzLCBcclxuXHRcdFx0YWN0aW9ucywgXHJcblx0XHRcdG9wdGlvbnMsIFxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIOi/lOWbnuWunuS+i+WvueixoVxyXG5cdCAqL1xyXG5cdGluaXQoKSB7XHJcblx0XHRjb25zdCByZXNvdXJjZSA9IG5ldyBXeFJlc291cmNlKHRoaXMuc2V0VXJsKHRoaXMudXJsKSwgdGhpcy5wYXJhbURlZmF1bHRzLCB0aGlzLmFjdGlvbnMsIHRoaXMub3B0aW9ucylcclxuXHRcdHJlc291cmNlLmludGVyY2VwdG9ycy51c2UodGhpcy5zZXRJbnRlcmNlcHRvcnMoKSlcclxuXHRcdHJldHVybiByZXNvdXJjZVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICog6K6+572u6K+35rGC6Lev5b6EXHJcblx0ICovXHJcblx0c2V0VXJsKHVybCkge1xyXG5cdFx0cmV0dXJuIGAke19fY29uZmlnLmJhc2VQYXRofSR7dXJsfWBcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIOaLpuaIquWZqFxyXG5cdCAqL1xyXG5cdHNldEludGVyY2VwdG9ycygpIHtcclxuXHRcdHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlcXVlc3QocmVxdWVzdCkge1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5oZWFkZXIgPSByZXF1ZXN0LmhlYWRlciB8fCB7fVxyXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5oZWFkZXJbJ2NvbnRlbnQtdHlwZSddID0gJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgICAgICBpZiAocmVxdWVzdC51cmwuaW5kZXhPZignL3NwX2FwaScpICE9PSAtMSAmJiB3eC5nZXRTdG9yYWdlU3luYygndG9rZW4nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3QuaGVhZGVyLkF1dGhvcml6YXRpb24gPSAnQmVhcmVyICcgKyB3eC5nZXRTdG9yYWdlU3luYygndG9rZW4nKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5Yqg6L295LitJywgXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3RcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcmVxdWVzdEVycm9yKHJlcXVlc3RFcnJvcikge1xyXG4gICAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlcXVlc3RFcnJvcilcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcmVzcG9uc2UocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcclxuICAgICAgICAgICAgICAgIC8vIGlmKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT09IDQwMSkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHd4LnJlbW92ZVN0b3JhZ2VTeW5jKCd0b2tlbicpXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgd3gucmVkaXJlY3RUbyh7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHVybDogJy9wYWdlcy9sb2dpbi9pbmRleCdcclxuICAgICAgICAgICAgICAgIC8vICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJlc3BvbnNlRXJyb3IocmVzcG9uc2VFcnJvcikge1xyXG4gICAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlc3BvbnNlRXJyb3IpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSHR0cFJlc291cmNlIl19