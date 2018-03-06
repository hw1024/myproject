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

var Game = function (_wepy$page) {
  _inherits(Game, _wepy$page);

  function Game() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Game);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Game.__proto__ || Object.getPrototypeOf(Game)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
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

  return Game;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Game , 'pages/game/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkdhbWUiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsImlzRXJyb3JNc2ciLCJwb3BFcnJvck1zZyIsImFycmF5IiwiaXRlbXMiLCJuYW1lIiwidmFsdWUiLCJjaGVja2VkIiwiaW5kZXgiLCJhbW91bnQiLCJhbm51YWxSYXRlIiwiZGVhZExpbmUiLCJ0eXBlIiwibWV0aG9kcyIsIm1hbmFnZUZvcm1TdWJtaXQiLCJlIiwiZGV0YWlsIiwidW5kZWZpbmVkIiwiJGFwcGx5IiwiJHJvb3QiLCIkbmF2aWdhdGUiLCJ1cmwiLCJyYWRpb0NoYW5nZSIsImJpbmRQaWNrZXJDaGFuZ2UiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsSTs7Ozs7Ozs7Ozs7Ozs7a0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFJVEMsSSxHQUFPO0FBQ0xDLGtCQUFZLEtBRFA7QUFFTEMsbUJBQWEsRUFGUjtBQUdMQyxhQUFPLENBQUMsTUFBRCxFQUFTLE1BQVQsRUFBaUIsV0FBakIsRUFBOEIsTUFBOUIsQ0FIRjtBQUlMQyxhQUFPLENBQ0wsRUFBQ0MsTUFBTSxLQUFQLEVBQWNDLE9BQU8sR0FBckIsRUFESyxFQUVMLEVBQUNELE1BQU0sT0FBUCxFQUFnQkMsT0FBTyxHQUF2QixFQUE0QkMsU0FBUyxNQUFyQyxFQUZLLENBSkY7QUFRTEMsYUFBTyxHQVJGO0FBU0xDLGNBQVEsRUFUSDtBQVVMQyxrQkFBWSxFQVZQO0FBV0xDLGdCQUFVLEVBWEw7QUFZTEMsWUFBTTtBQVpELEssUUFlUEMsTyxHQUFVO0FBQ1JDLHdCQUFrQiwwQkFBU0MsQ0FBVCxFQUFZO0FBQUEsb0JBQ3dCLENBQUNBLEVBQUVDLE1BQUYsQ0FBU1YsS0FBVCxDQUFlTSxJQUFoQixFQUFzQkcsRUFBRUMsTUFBRixDQUFTVixLQUFULENBQWVFLEtBQXJDLEVBQTRDTyxFQUFFQyxNQUFGLENBQVNWLEtBQVQsQ0FBZUcsTUFBM0QsRUFBbUVNLEVBQUVDLE1BQUYsQ0FBU1YsS0FBVCxDQUFlSSxVQUFsRixFQUE4RkssRUFBRUMsTUFBRixDQUFTVixLQUFULENBQWVLLFFBQTdHLENBRHhCO0FBQUEsWUFDckJDLElBRHFCO0FBQUEsWUFDZkosS0FEZTtBQUFBLFlBQ1JDLE1BRFE7QUFBQSxZQUNBQyxVQURBO0FBQUEsWUFDWUMsUUFEWjs7QUFFNUIsWUFBSUYsV0FBVyxFQUFYLElBQWlCQSxXQUFXUSxTQUFoQyxFQUEyQztBQUN6QyxlQUFLZixXQUFMLEdBQW1CLFVBQW5CO0FBQ0EsZUFBS0QsVUFBTCxHQUFrQixJQUFsQjtBQUNBLGVBQUtpQixNQUFMO0FBQ0EsaUJBQU8sS0FBUDtBQUNEO0FBQ0QsWUFBSVIsZUFBZSxFQUFmLElBQXFCQSxlQUFlTyxTQUF4QyxFQUFtRDtBQUNqRCxlQUFLZixXQUFMLEdBQW1CLFVBQW5CO0FBQ0EsZUFBS0QsVUFBTCxHQUFrQixJQUFsQjtBQUNBLGVBQUtpQixNQUFMO0FBQ0EsaUJBQU8sS0FBUDtBQUNEO0FBQ0QsWUFBSVAsYUFBYSxFQUFiLElBQW1CQSxhQUFhTSxTQUFwQyxFQUErQztBQUM3QyxlQUFLZixXQUFMLEdBQW1CLFVBQW5CO0FBQ0EsZUFBS0QsVUFBTCxHQUFrQixJQUFsQjtBQUNBLGVBQUtpQixNQUFMO0FBQ0EsaUJBQU8sS0FBUDtBQUNEO0FBQ0QsYUFBS0MsS0FBTCxDQUFXQyxTQUFYLENBQXFCLEVBQUNDLHNCQUFvQlQsSUFBcEIsZUFBa0NKLEtBQWxDLGdCQUFrREMsTUFBbEQsb0JBQXVFQyxVQUF2RSxrQkFBOEZDLFFBQS9GLEVBQXJCO0FBQ0QsT0F0Qk87QUF1QlJXLGlCQXZCUSx1QkF1QklQLENBdkJKLEVBdUJPO0FBQ2IsWUFBSUEsRUFBRUMsTUFBRixDQUFTVixLQUFULEtBQW1CLEtBQXZCLEVBQThCO0FBQzVCLGVBQUtILEtBQUwsR0FBYSxDQUFDLFdBQUQsQ0FBYjtBQUNBLGVBQUtLLEtBQUwsR0FBYSxHQUFiO0FBQ0QsU0FIRCxNQUdPO0FBQ0wsZUFBS0wsS0FBTCxHQUFhLENBQUMsTUFBRCxFQUFTLE1BQVQsRUFBaUIsV0FBakIsRUFBOEIsTUFBOUIsQ0FBYjtBQUNBLGVBQUtLLEtBQUwsR0FBYSxHQUFiO0FBQ0Q7QUFDRCxhQUFLVSxNQUFMO0FBQ0QsT0FoQ087QUFpQ1JLLHNCQWpDUSw0QkFpQ1NSLENBakNULEVBaUNZO0FBQ2xCLGFBQUtQLEtBQUwsR0FBYU8sRUFBRUMsTUFBRixDQUFTVixLQUF0QjtBQUNBLGFBQUtZLE1BQUw7QUFDRDtBQXBDTyxLOzs7O0VBcEJzQixlQUFLTSxJOztrQkFBbEIzQixJIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZSBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmlLbnm4rorqHnrpflmagnXHJcbiAgICB9XHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgaXNFcnJvck1zZzogZmFsc2UsXHJcbiAgICAgIHBvcEVycm9yTXNnOiAnJyxcclxuICAgICAgYXJyYXk6IFsn5YWI5oGv5ZCO5pysJywgJ+etiemineacrOaBrycsICfliLDmnJ/kuIDmrKHmgKfov5jmnKzku5jmga8nLCAn562J6aKd5pys6YeRJ10sXHJcbiAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAge25hbWU6ICdkYXknLCB2YWx1ZTogJ+WkqSd9LFxyXG4gICAgICAgIHtuYW1lOiAnbW91dGgnLCB2YWx1ZTogJ+aciCcsIGNoZWNrZWQ6ICd0cnVlJ31cclxuICAgICAgXSxcclxuICAgICAgaW5kZXg6ICcwJyxcclxuICAgICAgYW1vdW50OiAnJyxcclxuICAgICAgYW5udWFsUmF0ZTogJycsXHJcbiAgICAgIGRlYWRMaW5lOiAnJyxcclxuICAgICAgdHlwZTogJ21vdXRoJ1xyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgIG1hbmFnZUZvcm1TdWJtaXQ6IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBjb25zdCBbdHlwZSwgaW5kZXgsIGFtb3VudCwgYW5udWFsUmF0ZSwgZGVhZExpbmVdID0gW2UuZGV0YWlsLnZhbHVlLnR5cGUsIGUuZGV0YWlsLnZhbHVlLmluZGV4LCBlLmRldGFpbC52YWx1ZS5hbW91bnQsIGUuZGV0YWlsLnZhbHVlLmFubnVhbFJhdGUsIGUuZGV0YWlsLnZhbHVlLmRlYWRMaW5lXVxyXG4gICAgICAgIGlmIChhbW91bnQgPT09ICcnIHx8IGFtb3VudCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICB0aGlzLnBvcEVycm9yTXNnID0gJ+aKlei1hOmHkemineS4jeiDveS4uuepuidcclxuICAgICAgICAgIHRoaXMuaXNFcnJvck1zZyA9IHRydWVcclxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYW5udWFsUmF0ZSA9PT0gJycgfHwgYW5udWFsUmF0ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICB0aGlzLnBvcEVycm9yTXNnID0gJ+W5tOWMluWIqeeOh+S4jeiDveS4uuepuidcclxuICAgICAgICAgIHRoaXMuaXNFcnJvck1zZyA9IHRydWVcclxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGVhZExpbmUgPT09ICcnIHx8IGRlYWRMaW5lID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIHRoaXMucG9wRXJyb3JNc2cgPSAn6aG555uu5pyf6ZmQ5LiN6IO95Li656m6J1xyXG4gICAgICAgICAgdGhpcy5pc0Vycm9yTXNnID0gdHJ1ZVxyXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuJHJvb3QuJG5hdmlnYXRlKHt1cmw6IGBkZXRhaWw/dHlwZT0ke3R5cGV9JmluZGV4PSR7aW5kZXh9JmFtb3VudD0ke2Ftb3VudH0mYW5udWFsUmF0ZT0ke2FubnVhbFJhdGV9JmRlYWRMaW5lPSR7ZGVhZExpbmV9YH0pXHJcbiAgICAgIH0sXHJcbiAgICAgIHJhZGlvQ2hhbmdlKGUpIHtcclxuICAgICAgICBpZiAoZS5kZXRhaWwudmFsdWUgPT09ICdkYXknKSB7XHJcbiAgICAgICAgICB0aGlzLmFycmF5ID0gWyfliLDmnJ/kuIDmrKHmgKfov5jmnKzku5jmga8nXVxyXG4gICAgICAgICAgdGhpcy5pbmRleCA9ICcwJ1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmFycmF5ID0gWyflhYjmga/lkI7mnKwnLCAn562J6aKd5pys5oGvJywgJ+WIsOacn+S4gOasoeaAp+i/mOacrOS7mOaBrycsICfnrYnpop3mnKzph5EnXVxyXG4gICAgICAgICAgdGhpcy5pbmRleCA9ICcwJ1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgIH0sXHJcbiAgICAgIGJpbmRQaWNrZXJDaGFuZ2UoZSkge1xyXG4gICAgICAgIHRoaXMuaW5kZXggPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiJdfQ==