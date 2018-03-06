'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Manage = function (_wepy$page) {
  _inherits(Manage, _wepy$page);

  function Manage() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Manage);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Manage.__proto__ || Object.getPrototypeOf(Manage)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '收益计算器'
    }, _this.data = {
      isErrorMsg: false,
      popErrorMsg: '',
      array: ['先息后本', '等额本息', '到期一次性还本付息', '等额本金'],
      items: [{ name: 'day', value: '天' }, { name: 'mouth', value: '月', checked: 'true' }],
      index: '0',
      amount: '',
      annualRate: '',
      deadLine: '',
      type: 'mouth'
    }, _this.methods = {
      manageFormSubmit: function manageFormSubmit(e) {
        var _ref2 = [e.detail.value.type, e.detail.value.index, e.detail.value.amount, e.detail.value.annualRate, e.detail.value.deadLine],
            type = _ref2[0],
            index = _ref2[1],
            amount = _ref2[2],
            annualRate = _ref2[3],
            deadLine = _ref2[4];

        if (amount === '' || amount === undefined) {
          this.popErrorMsg = '投资金额不能为空';
          this.isErrorMsg = true;
          this.$apply();
          return false;
        }
        if (annualRate === '' || annualRate === undefined) {
          this.popErrorMsg = '年化利率不能为空';
          this.isErrorMsg = true;
          this.$apply();
          return false;
        }
        if (deadLine === '' || deadLine === undefined) {
          this.popErrorMsg = '项目期限不能为空';
          this.isErrorMsg = true;
          this.$apply();
          return false;
        }
        this.$root.$navigate({ url: 'detail?type=' + type + '&index=' + index + '&amount=' + amount + '&annualRate=' + annualRate + '&deadLine=' + deadLine });
      },
      radioChange: function radioChange(e) {
        if (e.detail.value === 'day') {
          this.array = ['到期一次性还本付息'];
          this.index = '0';
        } else {
          this.array = ['先息后本', '等额本息', '到期一次性还本付息', '等额本金'];
          this.index = '0';
        }
        this.$apply();
      },
      bindPickerChange: function bindPickerChange(e) {
        this.index = e.detail.value;
        this.$apply();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Manage;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Manage , 'pages/manage/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIk1hbmFnZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwiaXNFcnJvck1zZyIsInBvcEVycm9yTXNnIiwiYXJyYXkiLCJpdGVtcyIsIm5hbWUiLCJ2YWx1ZSIsImNoZWNrZWQiLCJpbmRleCIsImFtb3VudCIsImFubnVhbFJhdGUiLCJkZWFkTGluZSIsInR5cGUiLCJtZXRob2RzIiwibWFuYWdlRm9ybVN1Ym1pdCIsImUiLCJkZXRhaWwiLCJ1bmRlZmluZWQiLCIkYXBwbHkiLCIkcm9vdCIsIiRuYXZpZ2F0ZSIsInVybCIsInJhZGlvQ2hhbmdlIiwiYmluZFBpY2tlckNoYW5nZSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBRXFCQSxNOzs7Ozs7Ozs7Ozs7OztzTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUlUQyxJLEdBQU87QUFDTEMsa0JBQVksS0FEUDtBQUVMQyxtQkFBYSxFQUZSO0FBR0xDLGFBQU8sQ0FBQyxNQUFELEVBQVMsTUFBVCxFQUFpQixXQUFqQixFQUE4QixNQUE5QixDQUhGO0FBSUxDLGFBQU8sQ0FDTCxFQUFDQyxNQUFNLEtBQVAsRUFBY0MsT0FBTyxHQUFyQixFQURLLEVBRUwsRUFBQ0QsTUFBTSxPQUFQLEVBQWdCQyxPQUFPLEdBQXZCLEVBQTRCQyxTQUFTLE1BQXJDLEVBRkssQ0FKRjtBQVFMQyxhQUFPLEdBUkY7QUFTTEMsY0FBUSxFQVRIO0FBVUxDLGtCQUFZLEVBVlA7QUFXTEMsZ0JBQVUsRUFYTDtBQVlMQyxZQUFNO0FBWkQsSyxRQWVQQyxPLEdBQVU7QUFDUkMsd0JBQWtCLDBCQUFTQyxDQUFULEVBQVk7QUFBQSxvQkFDd0IsQ0FBQ0EsRUFBRUMsTUFBRixDQUFTVixLQUFULENBQWVNLElBQWhCLEVBQXNCRyxFQUFFQyxNQUFGLENBQVNWLEtBQVQsQ0FBZUUsS0FBckMsRUFBNENPLEVBQUVDLE1BQUYsQ0FBU1YsS0FBVCxDQUFlRyxNQUEzRCxFQUFtRU0sRUFBRUMsTUFBRixDQUFTVixLQUFULENBQWVJLFVBQWxGLEVBQThGSyxFQUFFQyxNQUFGLENBQVNWLEtBQVQsQ0FBZUssUUFBN0csQ0FEeEI7QUFBQSxZQUNyQkMsSUFEcUI7QUFBQSxZQUNmSixLQURlO0FBQUEsWUFDUkMsTUFEUTtBQUFBLFlBQ0FDLFVBREE7QUFBQSxZQUNZQyxRQURaOztBQUU1QixZQUFJRixXQUFXLEVBQVgsSUFBaUJBLFdBQVdRLFNBQWhDLEVBQTJDO0FBQ3pDLGVBQUtmLFdBQUwsR0FBbUIsVUFBbkI7QUFDQSxlQUFLRCxVQUFMLEdBQWtCLElBQWxCO0FBQ0EsZUFBS2lCLE1BQUw7QUFDQSxpQkFBTyxLQUFQO0FBQ0Q7QUFDRCxZQUFJUixlQUFlLEVBQWYsSUFBcUJBLGVBQWVPLFNBQXhDLEVBQW1EO0FBQ2pELGVBQUtmLFdBQUwsR0FBbUIsVUFBbkI7QUFDQSxlQUFLRCxVQUFMLEdBQWtCLElBQWxCO0FBQ0EsZUFBS2lCLE1BQUw7QUFDQSxpQkFBTyxLQUFQO0FBQ0Q7QUFDRCxZQUFJUCxhQUFhLEVBQWIsSUFBbUJBLGFBQWFNLFNBQXBDLEVBQStDO0FBQzdDLGVBQUtmLFdBQUwsR0FBbUIsVUFBbkI7QUFDQSxlQUFLRCxVQUFMLEdBQWtCLElBQWxCO0FBQ0EsZUFBS2lCLE1BQUw7QUFDQSxpQkFBTyxLQUFQO0FBQ0Q7QUFDRCxhQUFLQyxLQUFMLENBQVdDLFNBQVgsQ0FBcUIsRUFBQ0Msc0JBQW9CVCxJQUFwQixlQUFrQ0osS0FBbEMsZ0JBQWtEQyxNQUFsRCxvQkFBdUVDLFVBQXZFLGtCQUE4RkMsUUFBL0YsRUFBckI7QUFDRCxPQXRCTztBQXVCUlcsaUJBdkJRLHVCQXVCSVAsQ0F2QkosRUF1Qk87QUFDYixZQUFJQSxFQUFFQyxNQUFGLENBQVNWLEtBQVQsS0FBbUIsS0FBdkIsRUFBOEI7QUFDNUIsZUFBS0gsS0FBTCxHQUFhLENBQUMsV0FBRCxDQUFiO0FBQ0EsZUFBS0ssS0FBTCxHQUFhLEdBQWI7QUFDRCxTQUhELE1BR087QUFDTCxlQUFLTCxLQUFMLEdBQWEsQ0FBQyxNQUFELEVBQVMsTUFBVCxFQUFpQixXQUFqQixFQUE4QixNQUE5QixDQUFiO0FBQ0EsZUFBS0ssS0FBTCxHQUFhLEdBQWI7QUFDRDtBQUNELGFBQUtVLE1BQUw7QUFDRCxPQWhDTztBQWlDUkssc0JBakNRLDRCQWlDU1IsQ0FqQ1QsRUFpQ1k7QUFDbEIsYUFBS1AsS0FBTCxHQUFhTyxFQUFFQyxNQUFGLENBQVNWLEtBQXRCO0FBQ0EsYUFBS1ksTUFBTDtBQUNEO0FBcENPLEs7Ozs7RUFwQndCLGVBQUtNLEk7O2tCQUFwQjNCLE0iLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5cclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBNYW5hZ2UgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5pS255uK6K6h566X5ZmoJ1xyXG4gICAgfVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgIGlzRXJyb3JNc2c6IGZhbHNlLFxyXG4gICAgICBwb3BFcnJvck1zZzogJycsXHJcbiAgICAgIGFycmF5OiBbJ+WFiOaBr+WQjuacrCcsICfnrYnpop3mnKzmga8nLCAn5Yiw5pyf5LiA5qyh5oCn6L+Y5pys5LuY5oGvJywgJ+etiemineacrOmHkSddLFxyXG4gICAgICBpdGVtczogW1xyXG4gICAgICAgIHtuYW1lOiAnZGF5JywgdmFsdWU6ICflpKknfSxcclxuICAgICAgICB7bmFtZTogJ21vdXRoJywgdmFsdWU6ICfmnIgnLCBjaGVja2VkOiAndHJ1ZSd9XHJcbiAgICAgIF0sXHJcbiAgICAgIGluZGV4OiAnMCcsXHJcbiAgICAgIGFtb3VudDogJycsXHJcbiAgICAgIGFubnVhbFJhdGU6ICcnLFxyXG4gICAgICBkZWFkTGluZTogJycsXHJcbiAgICAgIHR5cGU6ICdtb3V0aCdcclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICBtYW5hZ2VGb3JtU3VibWl0OiBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgY29uc3QgW3R5cGUsIGluZGV4LCBhbW91bnQsIGFubnVhbFJhdGUsIGRlYWRMaW5lXSA9IFtlLmRldGFpbC52YWx1ZS50eXBlLCBlLmRldGFpbC52YWx1ZS5pbmRleCwgZS5kZXRhaWwudmFsdWUuYW1vdW50LCBlLmRldGFpbC52YWx1ZS5hbm51YWxSYXRlLCBlLmRldGFpbC52YWx1ZS5kZWFkTGluZV1cclxuICAgICAgICBpZiAoYW1vdW50ID09PSAnJyB8fCBhbW91bnQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgdGhpcy5wb3BFcnJvck1zZyA9ICfmipXotYTph5Hpop3kuI3og73kuLrnqbonXHJcbiAgICAgICAgICB0aGlzLmlzRXJyb3JNc2cgPSB0cnVlXHJcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGFubnVhbFJhdGUgPT09ICcnIHx8IGFubnVhbFJhdGUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgdGhpcy5wb3BFcnJvck1zZyA9ICflubTljJbliKnnjofkuI3og73kuLrnqbonXHJcbiAgICAgICAgICB0aGlzLmlzRXJyb3JNc2cgPSB0cnVlXHJcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGRlYWRMaW5lID09PSAnJyB8fCBkZWFkTGluZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICB0aGlzLnBvcEVycm9yTXNnID0gJ+mhueebruacn+mZkOS4jeiDveS4uuepuidcclxuICAgICAgICAgIHRoaXMuaXNFcnJvck1zZyA9IHRydWVcclxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLiRyb290LiRuYXZpZ2F0ZSh7dXJsOiBgZGV0YWlsP3R5cGU9JHt0eXBlfSZpbmRleD0ke2luZGV4fSZhbW91bnQ9JHthbW91bnR9JmFubnVhbFJhdGU9JHthbm51YWxSYXRlfSZkZWFkTGluZT0ke2RlYWRMaW5lfWB9KVxyXG4gICAgICB9LFxyXG4gICAgICByYWRpb0NoYW5nZShlKSB7XHJcbiAgICAgICAgaWYgKGUuZGV0YWlsLnZhbHVlID09PSAnZGF5Jykge1xyXG4gICAgICAgICAgdGhpcy5hcnJheSA9IFsn5Yiw5pyf5LiA5qyh5oCn6L+Y5pys5LuY5oGvJ11cclxuICAgICAgICAgIHRoaXMuaW5kZXggPSAnMCdcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5hcnJheSA9IFsn5YWI5oGv5ZCO5pysJywgJ+etiemineacrOaBrycsICfliLDmnJ/kuIDmrKHmgKfov5jmnKzku5jmga8nLCAn562J6aKd5pys6YeRJ11cclxuICAgICAgICAgIHRoaXMuaW5kZXggPSAnMCdcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICB9LFxyXG4gICAgICBiaW5kUGlja2VyQ2hhbmdlKGUpIHtcclxuICAgICAgICB0aGlzLmluZGV4ID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4iXX0=