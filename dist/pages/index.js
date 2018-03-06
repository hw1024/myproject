'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_wepy$page) {
  _inherits(Index, _wepy$page);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '工具大全'
    }, _this.data = {}, _this.methods = {
      navigateTo: function navigateTo(e) {
        var path = e.currentTarget.dataset.path;
        this.$root.$navigate({ url: path });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onShow',
    value: function onShow() {
      /* this.$parent.HttpService.getBannersIndex()
      .then(res => {
        console.log(res)
      }) */
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJtZXRob2RzIiwibmF2aWdhdGVUbyIsImUiLCJwYXRoIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCIkcm9vdCIsIiRuYXZpZ2F0ZSIsInVybCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBSVRDLEksR0FBTyxFLFFBSVBDLE8sR0FBVTtBQUNSQyxnQkFEUSxzQkFDSUMsQ0FESixFQUNPO0FBQ2IsWUFBTUMsT0FBT0QsRUFBRUUsYUFBRixDQUFnQkMsT0FBaEIsQ0FBd0JGLElBQXJDO0FBQ0EsYUFBS0csS0FBTCxDQUFXQyxTQUFYLENBQXFCLEVBQUNDLEtBQUtMLElBQU4sRUFBckI7QUFDRDtBQUpPLEs7Ozs7OzZCQU1EO0FBQ1A7Ozs7QUFJRDs7OztFQXBCZ0MsZUFBS00sSTs7a0JBQW5CYixLIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflt6XlhbflpKflhagnXG4gICAgfVxuXG4gICAgZGF0YSA9IHtcblxuICAgIH1cblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBuYXZpZ2F0ZVRvIChlKSB7XG4gICAgICAgIGNvbnN0IHBhdGggPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5wYXRoXG4gICAgICAgIHRoaXMuJHJvb3QuJG5hdmlnYXRlKHt1cmw6IHBhdGh9KVxuICAgICAgfVxuICAgIH1cbiAgICBvblNob3coKSB7XG4gICAgICAvKiB0aGlzLiRwYXJlbnQuSHR0cFNlcnZpY2UuZ2V0QmFubmVyc0luZGV4KClcbiAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgIH0pICovXG4gICAgfVxuICB9XG4iXX0=