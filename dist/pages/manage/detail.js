'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
      summoney: '',
      resultTitle: '',
      resultNum: '',
      resultDepict: '',
      results: [],
      capitalTotal: '',
      interestTotal: '',
      repaymentTotal: ''
    }, _this.methods = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Manage, [{
    key: 'onLoad',
    value: function onLoad(options) {
      var repayArray = [];
      var _ref2 = [options.index, options.amount, options.annualRate, options.deadLine, options.type],
          indexVal = _ref2[0],
          amountVal = _ref2[1],
          annualRateVal = _ref2[2],
          deadLineVal = _ref2[3],
          typeVal = _ref2[4];

      if (typeVal === 'mouth' && indexVal === '0') {
        var interest = (amountVal * annualRateVal / 1200).toFixed(2);
        var capital = 0;
        var interestTotal = (amountVal * annualRateVal * deadLineVal / 1200).toFixed(2);
        for (var i = 1; i <= deadLineVal; i++) {
          if (i === deadLineVal) {
            capital = parseFloat(amountVal).toFixed(2);
            interest = (interestTotal - interest * (i - 1)).toFixed(2);
          }
          var repayment = Math.round((parseFloat(capital) + parseFloat(interest)).toFixed(2) * 100) / 100.0;
          repayArray.push({ id: i, capital: capital, interest: interest, repayment: repayment });
        }
        this.summoney = (amountVal * annualRateVal * deadLineVal / 1200).toFixed(2);
        this.results = repayArray;
        this.resultTitle = '每月应收';
        this.resultNum = interest;
        this.resultDepict = '每个月收到的利息，最后一个月收回本金';
        this.capitalTotal = parseFloat(amountVal).toFixed(2);
        this.interestTotal = interestTotal;
        this.repaymentTotal = (parseFloat(amountVal) + parseFloat(interestTotal)).toFixed(2);
      } else if (typeVal === 'mouth' && indexVal === '1') {
        var _repayment = (amountVal * (annualRateVal / 12 / 100) * Math.pow(1 + annualRateVal / 12 / 100, deadLineVal) / (Math.pow(1 + annualRateVal / 12 / 100, deadLineVal) - 1)).toFixed(2);
        var _interestTotal = (deadLineVal * amountVal * (annualRateVal / 12 / 100) * Math.pow(1 + annualRateVal / 12 / 100, deadLineVal) / (Math.pow(1 + annualRateVal / 12 / 100, deadLineVal) - 1) - amountVal).toFixed(2);
        var capitalReady = 0;
        var _interest = void 0;
        for (var _i = 1; _i <= deadLineVal; _i++) {
          if (_i === 1) {
            _interest = Math.round(amountVal * (annualRateVal / 12 / 100) * 100) / 100.0;
          } else {
            _interest = Math.round(((amountVal * (annualRateVal / 12 / 100) - parseFloat(_repayment)) * Math.pow(1 + annualRateVal / 12 / 100, _i - 1) + parseFloat(_repayment)) * 100) / 100.0;
          }

          var _capital = (parseFloat(_repayment) - parseFloat(_interest)).toFixed(2);
          if (_i === deadLineVal) {
            _capital = (amountVal - capitalReady).toFixed(2);
            _repayment = Math.round((parseFloat(_capital) + parseFloat(_interest)).toFixed(2) * 100) / 100.0;
            repayArray.push({ id: _i, capital: _capital, interest: _interest, repayment: _repayment });
          } else {
            repayArray.push({ id: _i, capital: _capital, interest: _interest, repayment: _repayment });
          }
          capitalReady += Math.round((_repayment - _interest) * 100) / 100.0;
        }
        this.summoney = (deadLineVal * amountVal * (annualRateVal / 12 / 100) * Math.pow(1 + annualRateVal / 12 / 100, deadLineVal) / (Math.pow(1 + annualRateVal / 12 / 100, deadLineVal) - 1) - amountVal).toFixed(2);
        this.results = repayArray;
        this.resultTitle = '每月应收';
        this.resultNum = _repayment;
        this.resultDepict = '每个月收到的本金与利息和相同';
        this.capitalTotal = parseFloat(amountVal).toFixed(2);
        this.interestTotal = _interestTotal;
        this.repaymentTotal = (parseFloat(amountVal) + parseFloat(_interestTotal)).toFixed(2);
      } else if (typeVal === 'mouth' && indexVal === '2') {
        var _capital2 = parseFloat(amountVal).toFixed(2);
        var _interest2 = (amountVal * annualRateVal * deadLineVal / 1200).toFixed(2);
        var _repayment2 = (parseFloat(_capital2) + parseFloat(_interest2)).toFixed(2);
        this.summoney = (amountVal * annualRateVal * deadLineVal / 1200).toFixed(2);
        this.results = [{ id: 1, capital: _capital2, interest: _interest2, repayment: _repayment2 }];
        this.resultTitle = '最后应收';
        this.resultNum = _repayment2;
        this.resultDepict = '最后一次性收回本息';
        this.capitalTotal = parseFloat(amountVal).toFixed(2);
        this.interestTotal = _interest2;
        this.repaymentTotal = (parseFloat(amountVal) + parseFloat(_interest2)).toFixed(2);
      } else if (typeVal === 'mouth' && indexVal === '3') {
        var _capital3 = (amountVal / deadLineVal).toFixed(2);
        var _interestTotal2 = 0;
        var repaymentedAccount = 0;
        var _interest3 = void 0;
        var _repayment3 = void 0;
        for (var _i2 = 1; _i2 <= deadLineVal; _i2++) {
          _interest3 = ((amountVal - repaymentedAccount) * annualRateVal / 1200).toFixed(2);
          if (_i2 === deadLineVal) {
            _capital3 = parseFloat(amountVal - repaymentedAccount).toFixed(2);
            _repayment3 = (parseFloat(_capital3) + parseFloat(_interest3)).toFixed(2);
            repayArray.push({ id: _i2, capital: _capital3, interest: _interest3, repayment: _repayment3 });
          } else {
            _repayment3 = (parseFloat(_capital3) + parseFloat(_interest3)).toFixed(2);
            repayArray.push({ id: _i2, capital: _capital3, interest: _interest3, repayment: _repayment3 });
          }
          repaymentedAccount += parseFloat(_capital3);
          _interestTotal2 += parseFloat(_interest3);
        }
        this.summoney = _interestTotal2.toFixed(2);
        this.results = repayArray;
        this.resultTitle = '最后应收';
        this.resultNum = (parseFloat(amountVal) + parseFloat(_interestTotal2)).toFixed(2);
        this.resultDepict = '每个月收到的本金相同,利息越来越少';
        this.capitalTotal = parseFloat(amountVal).toFixed(2);
        this.interestTotal = _interestTotal2.toFixed(2);
        this.repaymentTotal = (parseFloat(amountVal) + parseFloat(_interestTotal2)).toFixed(2);
      } else {
        var _capital4 = parseFloat(amountVal).toFixed(2);
        var _interest4 = (amountVal * annualRateVal * deadLineVal / 36500).toFixed(2);
        var _repayment4 = (parseFloat(_capital4) + parseFloat(_interest4)).toFixed(2);
        this.summoney = (amountVal * annualRateVal * deadLineVal / 36500).toFixed(2);
        this.results = [{ id: 1, capital: _capital4, interest: _interest4, repayment: _repayment4 }];
        this.resultTitle = '最后应收';
        this.resultNum = _repayment4;
        this.resultDepict = '最后一次性收回本息';
        this.capitalTotal = parseFloat(amountVal).toFixed(2);
        this.interestTotal = _interest4;
        this.repaymentTotal = (parseFloat(amountVal) + parseFloat(_interest4)).toFixed(2);
      }
    }
  }]);

  return Manage;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Manage , 'pages/manage/detail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldGFpbC5qcyJdLCJuYW1lcyI6WyJNYW5hZ2UiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsInN1bW1vbmV5IiwicmVzdWx0VGl0bGUiLCJyZXN1bHROdW0iLCJyZXN1bHREZXBpY3QiLCJyZXN1bHRzIiwiY2FwaXRhbFRvdGFsIiwiaW50ZXJlc3RUb3RhbCIsInJlcGF5bWVudFRvdGFsIiwibWV0aG9kcyIsIm9wdGlvbnMiLCJyZXBheUFycmF5IiwiaW5kZXgiLCJhbW91bnQiLCJhbm51YWxSYXRlIiwiZGVhZExpbmUiLCJ0eXBlIiwiaW5kZXhWYWwiLCJhbW91bnRWYWwiLCJhbm51YWxSYXRlVmFsIiwiZGVhZExpbmVWYWwiLCJ0eXBlVmFsIiwiaW50ZXJlc3QiLCJ0b0ZpeGVkIiwiY2FwaXRhbCIsImkiLCJwYXJzZUZsb2F0IiwicmVwYXltZW50IiwiTWF0aCIsInJvdW5kIiwicHVzaCIsImlkIiwicG93IiwiY2FwaXRhbFJlYWR5IiwicmVwYXltZW50ZWRBY2NvdW50IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsTTs7Ozs7Ozs7Ozs7Ozs7c0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFJVEMsSSxHQUFPO0FBQ0xDLGdCQUFVLEVBREw7QUFFTEMsbUJBQWEsRUFGUjtBQUdMQyxpQkFBVyxFQUhOO0FBSUxDLG9CQUFjLEVBSlQ7QUFLTEMsZUFBUyxFQUxKO0FBTUxDLG9CQUFjLEVBTlQ7QUFPTEMscUJBQWUsRUFQVjtBQVFMQyxzQkFBZ0I7QUFSWCxLLFFBV1BDLE8sR0FBVSxFOzs7OzsyQkFHRkMsTyxFQUFTO0FBQ2YsVUFBSUMsYUFBYSxFQUFqQjtBQURlLGtCQUVrRCxDQUFDRCxRQUFRRSxLQUFULEVBQWdCRixRQUFRRyxNQUF4QixFQUFnQ0gsUUFBUUksVUFBeEMsRUFBb0RKLFFBQVFLLFFBQTVELEVBQXNFTCxRQUFRTSxJQUE5RSxDQUZsRDtB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LCJmaWxlIjoiZGV0YWlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFuYWdlIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aUtuebiuiuoeeul+WZqCdcclxuICAgIH1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICBzdW1tb25leTogJycsXHJcbiAgICAgIHJlc3VsdFRpdGxlOiAnJyxcclxuICAgICAgcmVzdWx0TnVtOiAnJyxcclxuICAgICAgcmVzdWx0RGVwaWN0OiAnJyxcclxuICAgICAgcmVzdWx0czogW10sXHJcbiAgICAgIGNhcGl0YWxUb3RhbDogJycsXHJcbiAgICAgIGludGVyZXN0VG90YWw6ICcnLFxyXG4gICAgICByZXBheW1lbnRUb3RhbDogJydcclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG5cclxuICAgIH1cclxuICAgIG9uTG9hZCAob3B0aW9ucykge1xyXG4gICAgICBsZXQgcmVwYXlBcnJheSA9IFtdXHJcbiAgICAgIGxldCBbaW5kZXhWYWwsIGFtb3VudFZhbCwgYW5udWFsUmF0ZVZhbCwgZGVhZExpbmVWYWwsIHR5cGVWYWxdID0gW29wdGlvbnMuaW5kZXgsIG9wdGlvbnMuYW1vdW50LCBvcHRpb25zLmFubnVhbFJhdGUsIG9wdGlvbnMuZGVhZExpbmUsIG9wdGlvbnMudHlwZV1cclxuICAgICAgaWYgKHR5cGVWYWwgPT09ICdtb3V0aCcgJiYgaW5kZXhWYWwgPT09ICcwJykge1xyXG4gICAgICAgIGxldCBpbnRlcmVzdCA9IChhbW91bnRWYWwgKiBhbm51YWxSYXRlVmFsIC8gMTIwMCkudG9GaXhlZCgyKVxyXG4gICAgICAgIGxldCBjYXBpdGFsID0gMFxyXG4gICAgICAgIGxldCBpbnRlcmVzdFRvdGFsID0gKGFtb3VudFZhbCAqIGFubnVhbFJhdGVWYWwgKiBkZWFkTGluZVZhbCAvIDEyMDApLnRvRml4ZWQoMilcclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBkZWFkTGluZVZhbDsgaSsrKSB7XHJcbiAgICAgICAgICBpZiAoaSA9PT0gZGVhZExpbmVWYWwpIHtcclxuICAgICAgICAgICAgY2FwaXRhbCA9IHBhcnNlRmxvYXQoYW1vdW50VmFsKS50b0ZpeGVkKDIpXHJcbiAgICAgICAgICAgIGludGVyZXN0ID0gKGludGVyZXN0VG90YWwgLSBpbnRlcmVzdCAqIChpIC0gMSkpLnRvRml4ZWQoMilcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGxldCByZXBheW1lbnQgPSBNYXRoLnJvdW5kKChwYXJzZUZsb2F0KGNhcGl0YWwpICsgcGFyc2VGbG9hdChpbnRlcmVzdCkpLnRvRml4ZWQoMikgKiAxMDApIC8gMTAwLjBcclxuICAgICAgICAgIHJlcGF5QXJyYXkucHVzaChcclxuICAgICAgICAgICAge2lkOiBpLCBjYXBpdGFsOiBjYXBpdGFsLCBpbnRlcmVzdDogaW50ZXJlc3QsIHJlcGF5bWVudDogcmVwYXltZW50fVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN1bW1vbmV5ID0gKGFtb3VudFZhbCAqIGFubnVhbFJhdGVWYWwgKiBkZWFkTGluZVZhbCAvIDEyMDApLnRvRml4ZWQoMilcclxuICAgICAgICB0aGlzLnJlc3VsdHMgPSByZXBheUFycmF5XHJcbiAgICAgICAgdGhpcy5yZXN1bHRUaXRsZSA9ICfmr4/mnIjlupTmlLYnXHJcbiAgICAgICAgdGhpcy5yZXN1bHROdW0gPSBpbnRlcmVzdFxyXG4gICAgICAgIHRoaXMucmVzdWx0RGVwaWN0ID0gJ+avj+S4quaciOaUtuWIsOeahOWIqeaBr++8jOacgOWQjuS4gOS4quaciOaUtuWbnuacrOmHkSdcclxuICAgICAgICB0aGlzLmNhcGl0YWxUb3RhbCA9IHBhcnNlRmxvYXQoYW1vdW50VmFsKS50b0ZpeGVkKDIpXHJcbiAgICAgICAgdGhpcy5pbnRlcmVzdFRvdGFsID0gaW50ZXJlc3RUb3RhbFxyXG4gICAgICAgIHRoaXMucmVwYXltZW50VG90YWwgPSAocGFyc2VGbG9hdChhbW91bnRWYWwpICsgcGFyc2VGbG9hdChpbnRlcmVzdFRvdGFsKSkudG9GaXhlZCgyKVxyXG4gICAgICB9IGVsc2UgaWYgKHR5cGVWYWwgPT09ICdtb3V0aCcgJiYgaW5kZXhWYWwgPT09ICcxJykge1xyXG4gICAgICAgIGxldCByZXBheW1lbnQgPSAoYW1vdW50VmFsICogKGFubnVhbFJhdGVWYWwgLyAxMiAvIDEwMCkgKiBNYXRoLnBvdygoMSArIChhbm51YWxSYXRlVmFsIC8gMTIgLyAxMDApKSwgZGVhZExpbmVWYWwpIC8gKE1hdGgucG93KCgxICsgKGFubnVhbFJhdGVWYWwgLyAxMiAvIDEwMCkpLCBkZWFkTGluZVZhbCkgLSAxKSkudG9GaXhlZCgyKVxyXG4gICAgICAgIGxldCBpbnRlcmVzdFRvdGFsID0gKGRlYWRMaW5lVmFsICogYW1vdW50VmFsICogKGFubnVhbFJhdGVWYWwgLyAxMiAvIDEwMCkgKiBNYXRoLnBvdygoMSArIChhbm51YWxSYXRlVmFsIC8gMTIgLyAxMDApKSwgZGVhZExpbmVWYWwpIC8gKE1hdGgucG93KCgxICsgKGFubnVhbFJhdGVWYWwgLyAxMiAvIDEwMCkpLCBkZWFkTGluZVZhbCkgLSAxKSAtIGFtb3VudFZhbCkudG9GaXhlZCgyKVxyXG4gICAgICAgIGxldCBjYXBpdGFsUmVhZHkgPSAwXHJcbiAgICAgICAgbGV0IGludGVyZXN0XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gZGVhZExpbmVWYWw7IGkrKykge1xyXG4gICAgICAgICAgaWYgKGkgPT09IDEpIHtcclxuICAgICAgICAgICAgaW50ZXJlc3QgPSBNYXRoLnJvdW5kKGFtb3VudFZhbCAqIChhbm51YWxSYXRlVmFsIC8gMTIgLyAxMDApICogMTAwKSAvIDEwMC4wXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpbnRlcmVzdCA9IE1hdGgucm91bmQoKChhbW91bnRWYWwgKiAoYW5udWFsUmF0ZVZhbCAvIDEyIC8gMTAwKSAtIHBhcnNlRmxvYXQocmVwYXltZW50KSkgKiBNYXRoLnBvdygoMSArIChhbm51YWxSYXRlVmFsIC8gMTIgLyAxMDApKSwgKGkgLSAxKSkgKyBwYXJzZUZsb2F0KHJlcGF5bWVudCkpICogMTAwKSAvIDEwMC4wXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgbGV0IGNhcGl0YWwgPSAocGFyc2VGbG9hdChyZXBheW1lbnQpIC0gcGFyc2VGbG9hdChpbnRlcmVzdCkpLnRvRml4ZWQoMilcclxuICAgICAgICAgIGlmIChpID09PSBkZWFkTGluZVZhbCkge1xyXG4gICAgICAgICAgICBjYXBpdGFsID0gKGFtb3VudFZhbCAtIGNhcGl0YWxSZWFkeSkudG9GaXhlZCgyKVxyXG4gICAgICAgICAgICByZXBheW1lbnQgPSBNYXRoLnJvdW5kKChwYXJzZUZsb2F0KGNhcGl0YWwpICsgcGFyc2VGbG9hdChpbnRlcmVzdCkpLnRvRml4ZWQoMikgKiAxMDApIC8gMTAwLjBcclxuICAgICAgICAgICAgcmVwYXlBcnJheS5wdXNoKFxyXG4gICAgICAgICAgICAgIHtpZDogaSwgY2FwaXRhbDogY2FwaXRhbCwgaW50ZXJlc3Q6IGludGVyZXN0LCByZXBheW1lbnQ6IHJlcGF5bWVudH1cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVwYXlBcnJheS5wdXNoKFxyXG4gICAgICAgICAgICAgIHtpZDogaSwgY2FwaXRhbDogY2FwaXRhbCwgaW50ZXJlc3Q6IGludGVyZXN0LCByZXBheW1lbnQ6IHJlcGF5bWVudH1cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY2FwaXRhbFJlYWR5ICs9IE1hdGgucm91bmQoKHJlcGF5bWVudCAtIGludGVyZXN0KSAqIDEwMCkgLyAxMDAuMFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN1bW1vbmV5ID0gKGRlYWRMaW5lVmFsICogYW1vdW50VmFsICogKGFubnVhbFJhdGVWYWwgLyAxMiAvIDEwMCkgKiBNYXRoLnBvdygoMSArIChhbm51YWxSYXRlVmFsIC8gMTIgLyAxMDApKSwgZGVhZExpbmVWYWwpIC8gKE1hdGgucG93KCgxICsgKGFubnVhbFJhdGVWYWwgLyAxMiAvIDEwMCkpLCBkZWFkTGluZVZhbCkgLSAxKSAtIGFtb3VudFZhbCkudG9GaXhlZCgyKVxyXG4gICAgICAgIHRoaXMucmVzdWx0cyA9IHJlcGF5QXJyYXlcclxuICAgICAgICB0aGlzLnJlc3VsdFRpdGxlID0gJ+avj+aciOW6lOaUtidcclxuICAgICAgICB0aGlzLnJlc3VsdE51bSA9IHJlcGF5bWVudFxyXG4gICAgICAgIHRoaXMucmVzdWx0RGVwaWN0ID0gJ+avj+S4quaciOaUtuWIsOeahOacrOmHkeS4juWIqeaBr+WSjOebuOWQjCdcclxuICAgICAgICB0aGlzLmNhcGl0YWxUb3RhbCA9IHBhcnNlRmxvYXQoYW1vdW50VmFsKS50b0ZpeGVkKDIpXHJcbiAgICAgICAgdGhpcy5pbnRlcmVzdFRvdGFsID0gaW50ZXJlc3RUb3RhbFxyXG4gICAgICAgIHRoaXMucmVwYXltZW50VG90YWwgPSAocGFyc2VGbG9hdChhbW91bnRWYWwpICsgcGFyc2VGbG9hdChpbnRlcmVzdFRvdGFsKSkudG9GaXhlZCgyKVxyXG4gICAgICB9IGVsc2UgaWYgKHR5cGVWYWwgPT09ICdtb3V0aCcgJiYgaW5kZXhWYWwgPT09ICcyJykge1xyXG4gICAgICAgIGxldCBjYXBpdGFsID0gcGFyc2VGbG9hdChhbW91bnRWYWwpLnRvRml4ZWQoMilcclxuICAgICAgICBsZXQgaW50ZXJlc3QgPSAoYW1vdW50VmFsICogYW5udWFsUmF0ZVZhbCAqIGRlYWRMaW5lVmFsIC8gMTIwMCkudG9GaXhlZCgyKVxyXG4gICAgICAgIGxldCByZXBheW1lbnQgPSAocGFyc2VGbG9hdChjYXBpdGFsKSArIHBhcnNlRmxvYXQoaW50ZXJlc3QpKS50b0ZpeGVkKDIpXHJcbiAgICAgICAgdGhpcy5zdW1tb25leSA9IChhbW91bnRWYWwgKiBhbm51YWxSYXRlVmFsICogZGVhZExpbmVWYWwgLyAxMjAwKS50b0ZpeGVkKDIpXHJcbiAgICAgICAgdGhpcy5yZXN1bHRzID0gW3tpZDogMSwgY2FwaXRhbDogY2FwaXRhbCwgaW50ZXJlc3Q6IGludGVyZXN0LCByZXBheW1lbnQ6IHJlcGF5bWVudH1dXHJcbiAgICAgICAgdGhpcy5yZXN1bHRUaXRsZSA9ICfmnIDlkI7lupTmlLYnXHJcbiAgICAgICAgdGhpcy5yZXN1bHROdW0gPSByZXBheW1lbnRcclxuICAgICAgICB0aGlzLnJlc3VsdERlcGljdCA9ICfmnIDlkI7kuIDmrKHmgKfmlLblm57mnKzmga8nXHJcbiAgICAgICAgdGhpcy5jYXBpdGFsVG90YWwgPSBwYXJzZUZsb2F0KGFtb3VudFZhbCkudG9GaXhlZCgyKVxyXG4gICAgICAgIHRoaXMuaW50ZXJlc3RUb3RhbCA9IGludGVyZXN0XHJcbiAgICAgICAgdGhpcy5yZXBheW1lbnRUb3RhbCA9IChwYXJzZUZsb2F0KGFtb3VudFZhbCkgKyBwYXJzZUZsb2F0KGludGVyZXN0KSkudG9GaXhlZCgyKVxyXG4gICAgICB9IGVsc2UgaWYgKHR5cGVWYWwgPT09ICdtb3V0aCcgJiYgaW5kZXhWYWwgPT09ICczJykge1xyXG4gICAgICAgIGxldCBjYXBpdGFsID0gKGFtb3VudFZhbCAvIGRlYWRMaW5lVmFsKS50b0ZpeGVkKDIpXHJcbiAgICAgICAgbGV0IGludGVyZXN0VG90YWwgPSAwXHJcbiAgICAgICAgbGV0IHJlcGF5bWVudGVkQWNjb3VudCA9IDBcclxuICAgICAgICBsZXQgaW50ZXJlc3RcclxuICAgICAgICBsZXQgcmVwYXltZW50XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gZGVhZExpbmVWYWw7IGkrKykge1xyXG4gICAgICAgICAgaW50ZXJlc3QgPSAoKGFtb3VudFZhbCAtIHJlcGF5bWVudGVkQWNjb3VudCkgKiBhbm51YWxSYXRlVmFsIC8gMTIwMCkudG9GaXhlZCgyKVxyXG4gICAgICAgICAgaWYgKGkgPT09IGRlYWRMaW5lVmFsKSB7XHJcbiAgICAgICAgICAgIGNhcGl0YWwgPSBwYXJzZUZsb2F0KGFtb3VudFZhbCAtIHJlcGF5bWVudGVkQWNjb3VudCkudG9GaXhlZCgyKVxyXG4gICAgICAgICAgICByZXBheW1lbnQgPSAocGFyc2VGbG9hdChjYXBpdGFsKSArIHBhcnNlRmxvYXQoaW50ZXJlc3QpKS50b0ZpeGVkKDIpXHJcbiAgICAgICAgICAgIHJlcGF5QXJyYXkucHVzaChcclxuICAgICAgICAgICAgICB7aWQ6IGksIGNhcGl0YWw6IGNhcGl0YWwsIGludGVyZXN0OiBpbnRlcmVzdCwgcmVwYXltZW50OiByZXBheW1lbnR9XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlcGF5bWVudCA9IChwYXJzZUZsb2F0KGNhcGl0YWwpICsgcGFyc2VGbG9hdChpbnRlcmVzdCkpLnRvRml4ZWQoMilcclxuICAgICAgICAgICAgcmVwYXlBcnJheS5wdXNoKFxyXG4gICAgICAgICAgICAgIHtpZDogaSwgY2FwaXRhbDogY2FwaXRhbCwgaW50ZXJlc3Q6IGludGVyZXN0LCByZXBheW1lbnQ6IHJlcGF5bWVudH1cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmVwYXltZW50ZWRBY2NvdW50ICs9IHBhcnNlRmxvYXQoY2FwaXRhbClcclxuICAgICAgICAgIGludGVyZXN0VG90YWwgKz0gcGFyc2VGbG9hdChpbnRlcmVzdClcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zdW1tb25leSA9IGludGVyZXN0VG90YWwudG9GaXhlZCgyKVxyXG4gICAgICAgIHRoaXMucmVzdWx0cyA9IHJlcGF5QXJyYXlcclxuICAgICAgICB0aGlzLnJlc3VsdFRpdGxlID0gJ+acgOWQjuW6lOaUtidcclxuICAgICAgICB0aGlzLnJlc3VsdE51bSA9IChwYXJzZUZsb2F0KGFtb3VudFZhbCkgKyBwYXJzZUZsb2F0KGludGVyZXN0VG90YWwpKS50b0ZpeGVkKDIpXHJcbiAgICAgICAgdGhpcy5yZXN1bHREZXBpY3QgPSAn5q+P5Liq5pyI5pS25Yiw55qE5pys6YeR55u45ZCMLOWIqeaBr+i2iuadpei2iuWwkSdcclxuICAgICAgICB0aGlzLmNhcGl0YWxUb3RhbCA9IHBhcnNlRmxvYXQoYW1vdW50VmFsKS50b0ZpeGVkKDIpXHJcbiAgICAgICAgdGhpcy5pbnRlcmVzdFRvdGFsID0gaW50ZXJlc3RUb3RhbC50b0ZpeGVkKDIpXHJcbiAgICAgICAgdGhpcy5yZXBheW1lbnRUb3RhbCA9IChwYXJzZUZsb2F0KGFtb3VudFZhbCkgKyBwYXJzZUZsb2F0KGludGVyZXN0VG90YWwpKS50b0ZpeGVkKDIpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IGNhcGl0YWwgPSBwYXJzZUZsb2F0KGFtb3VudFZhbCkudG9GaXhlZCgyKVxyXG4gICAgICAgIGxldCBpbnRlcmVzdCA9IChhbW91bnRWYWwgKiBhbm51YWxSYXRlVmFsICogZGVhZExpbmVWYWwgLyAzNjUwMCkudG9GaXhlZCgyKVxyXG4gICAgICAgIGxldCByZXBheW1lbnQgPSAocGFyc2VGbG9hdChjYXBpdGFsKSArIHBhcnNlRmxvYXQoaW50ZXJlc3QpKS50b0ZpeGVkKDIpXHJcbiAgICAgICAgdGhpcy5zdW1tb25leSA9IChhbW91bnRWYWwgKiBhbm51YWxSYXRlVmFsICogZGVhZExpbmVWYWwgLyAzNjUwMCkudG9GaXhlZCgyKVxyXG4gICAgICAgIHRoaXMucmVzdWx0cyA9IFt7aWQ6IDEsIGNhcGl0YWw6IGNhcGl0YWwsIGludGVyZXN0OiBpbnRlcmVzdCwgcmVwYXltZW50OiByZXBheW1lbnR9XVxyXG4gICAgICAgIHRoaXMucmVzdWx0VGl0bGUgPSAn5pyA5ZCO5bqU5pS2J1xyXG4gICAgICAgIHRoaXMucmVzdWx0TnVtID0gcmVwYXltZW50XHJcbiAgICAgICAgdGhpcy5yZXN1bHREZXBpY3QgPSAn5pyA5ZCO5LiA5qyh5oCn5pS25Zue5pys5oGvJ1xyXG4gICAgICAgIHRoaXMuY2FwaXRhbFRvdGFsID0gcGFyc2VGbG9hdChhbW91bnRWYWwpLnRvRml4ZWQoMilcclxuICAgICAgICB0aGlzLmludGVyZXN0VG90YWwgPSBpbnRlcmVzdFxyXG4gICAgICAgIHRoaXMucmVwYXltZW50VG90YWwgPSAocGFyc2VGbG9hdChhbW91bnRWYWwpICsgcGFyc2VGbG9hdChpbnRlcmVzdCkpLnRvRml4ZWQoMilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuIl19