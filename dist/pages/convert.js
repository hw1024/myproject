'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Convert = function (_wepy$page) {
  _inherits(Convert, _wepy$page);

  function Convert() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Convert);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Convert.__proto__ || Object.getPrototypeOf(Convert)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '色值转换'
    }, _this.data = {
      rgbVal: '',
      hexVal: ''
    }, _this.methods = {
      hexFormSubmit: function hexFormSubmit(e) {
        var hexVal = e.detail.value.hex || '#000000';
        var hexToRgb = function hexToRgb(hex) {
          return 'rgb(' + hex.slice(1).match(/.{2}/g).map(function (x) {
            return parseInt(x, 16);
          }).join() + ')';
        };
        this.rgbVal = hexToRgb(hexVal);
      },
      hexFormReset: function hexFormReset() {
        this.rgbVal = '';
      },
      rgbFormSubmit: function rgbFormSubmit(e) {
        var _ref2 = [Number(e.detail.value.rgbR), Number(e.detail.value.rgbG), Number(e.detail.value.rgbB)],
            rgbRVal = _ref2[0],
            rgbGVal = _ref2[1],
            rgbBVal = _ref2[2];

        var rgbToHex = function rgbToHex(r, g, b) {
          return '#' + ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');
        };
        this.hexVal = rgbToHex(rgbRVal, rgbGVal, rgbBVal);
      },
      rgbFormReset: function rgbFormReset() {
        this.hexVal = '';
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Convert;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Convert , 'pages/convert'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnZlcnQuanMiXSwibmFtZXMiOlsiQ29udmVydCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwicmdiVmFsIiwiaGV4VmFsIiwibWV0aG9kcyIsImhleEZvcm1TdWJtaXQiLCJlIiwiZGV0YWlsIiwidmFsdWUiLCJoZXgiLCJoZXhUb1JnYiIsInNsaWNlIiwibWF0Y2giLCJtYXAiLCJwYXJzZUludCIsIngiLCJqb2luIiwiaGV4Rm9ybVJlc2V0IiwicmdiRm9ybVN1Ym1pdCIsIk51bWJlciIsInJnYlIiLCJyZ2JHIiwicmdiQiIsInJnYlJWYWwiLCJyZ2JHVmFsIiwicmdiQlZhbCIsInJnYlRvSGV4IiwiciIsImciLCJiIiwidG9TdHJpbmciLCJwYWRTdGFydCIsInJnYkZvcm1SZXNldCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBRXFCQSxPOzs7Ozs7Ozs7Ozs7Ozt3TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUlUQyxJLEdBQU87QUFDTEMsY0FBUSxFQURIO0FBRUxDLGNBQVE7QUFGSCxLLFFBS1BDLE8sR0FBVTtBQUNSQyxtQkFEUSx5QkFDTUMsQ0FETixFQUNTO0FBQ2YsWUFBTUgsU0FBU0csRUFBRUMsTUFBRixDQUFTQyxLQUFULENBQWVDLEdBQWYsSUFBc0IsU0FBckM7QUFDQSxZQUFNQyxXQUFXLFNBQVhBLFFBQVc7QUFBQSwwQkFBY0QsSUFBSUUsS0FBSixDQUFVLENBQVYsRUFBYUMsS0FBYixDQUFtQixPQUFuQixFQUE0QkMsR0FBNUIsQ0FBZ0M7QUFBQSxtQkFBS0MsU0FBU0MsQ0FBVCxFQUFZLEVBQVosQ0FBTDtBQUFBLFdBQWhDLEVBQXNEQyxJQUF0RCxFQUFkO0FBQUEsU0FBakI7QUFDQSxhQUFLZCxNQUFMLEdBQWNRLFNBQVNQLE1BQVQsQ0FBZDtBQUNELE9BTE87QUFNUmMsa0JBTlEsMEJBTU87QUFDYixhQUFLZixNQUFMLEdBQWMsRUFBZDtBQUNELE9BUk87QUFTUmdCLG1CQVRRLHlCQVNNWixDQVROLEVBU1M7QUFBQSxvQkFDcUIsQ0FBQ2EsT0FBT2IsRUFBRUMsTUFBRixDQUFTQyxLQUFULENBQWVZLElBQXRCLENBQUQsRUFBOEJELE9BQU9iLEVBQUVDLE1BQUYsQ0FBU0MsS0FBVCxDQUFlYSxJQUF0QixDQUE5QixFQUEyREYsT0FBT2IsRUFBRUMsTUFBRixDQUFTQyxLQUFULENBQWVjLElBQXRCLENBQTNELENBRHJCO0FBQUEsWUFDUkMsT0FEUTtBQUFBLFlBQ0NDLE9BREQ7QUFBQSxZQUNVQyxPQURWOztBQUVmLFlBQU1DLFdBQVcsU0FBWEEsUUFBVyxDQUFDQyxDQUFELEVBQUlDLENBQUosRUFBT0MsQ0FBUDtBQUFBLHVCQUFpQixDQUFDLENBQUNGLEtBQUssRUFBTixLQUFhQyxLQUFLLENBQWxCLElBQXVCQyxDQUF4QixFQUEyQkMsUUFBM0IsQ0FBb0MsRUFBcEMsRUFBd0NDLFFBQXhDLENBQWlELENBQWpELEVBQW9ELEdBQXBELENBQWpCO0FBQUEsU0FBakI7QUFDQSxhQUFLNUIsTUFBTCxHQUFjdUIsU0FBU0gsT0FBVCxFQUFrQkMsT0FBbEIsRUFBMkJDLE9BQTNCLENBQWQ7QUFDRCxPQWJPO0FBY1JPLGtCQWRRLDBCQWNPO0FBQ2IsYUFBSzdCLE1BQUwsR0FBYyxFQUFkO0FBQ0Q7QUFoQk8sSzs7OztFQVZ5QixlQUFLOEIsSTs7a0JBQXJCbkMsTyIsImZpbGUiOiJjb252ZXJ0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udmVydCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfoibLlgLzovazmjaInXHJcbiAgICB9XHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgcmdiVmFsOiAnJyxcclxuICAgICAgaGV4VmFsOiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgIGhleEZvcm1TdWJtaXQoZSkge1xyXG4gICAgICAgIGNvbnN0IGhleFZhbCA9IGUuZGV0YWlsLnZhbHVlLmhleCB8fCAnIzAwMDAwMCdcclxuICAgICAgICBjb25zdCBoZXhUb1JnYiA9IGhleCA9PiBgcmdiKCR7aGV4LnNsaWNlKDEpLm1hdGNoKC8uezJ9L2cpLm1hcCh4ID0+IHBhcnNlSW50KHgsIDE2KSkuam9pbigpfSlgXHJcbiAgICAgICAgdGhpcy5yZ2JWYWwgPSBoZXhUb1JnYihoZXhWYWwpXHJcbiAgICAgIH0sXHJcbiAgICAgIGhleEZvcm1SZXNldCgpIHtcclxuICAgICAgICB0aGlzLnJnYlZhbCA9ICcnXHJcbiAgICAgIH0sXHJcbiAgICAgIHJnYkZvcm1TdWJtaXQoZSkge1xyXG4gICAgICAgIGNvbnN0IFtyZ2JSVmFsLCByZ2JHVmFsLCByZ2JCVmFsXSA9IFtOdW1iZXIoZS5kZXRhaWwudmFsdWUucmdiUiksIE51bWJlcihlLmRldGFpbC52YWx1ZS5yZ2JHKSwgTnVtYmVyKGUuZGV0YWlsLnZhbHVlLnJnYkIpXVxyXG4gICAgICAgIGNvbnN0IHJnYlRvSGV4ID0gKHIsIGcsIGIpID0+IGAjJHsoKHIgPDwgMTYpICsgKGcgPDwgOCkgKyBiKS50b1N0cmluZygxNikucGFkU3RhcnQoNiwgJzAnKX1gXHJcbiAgICAgICAgdGhpcy5oZXhWYWwgPSByZ2JUb0hleChyZ2JSVmFsLCByZ2JHVmFsLCByZ2JCVmFsKVxyXG4gICAgICB9LFxyXG4gICAgICByZ2JGb3JtUmVzZXQoKSB7XHJcbiAgICAgICAgdGhpcy5oZXhWYWwgPSAnJ1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=