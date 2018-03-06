'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _demo = require('./../mocks/demo.js');

var _demo2 = _interopRequireDefault(_demo);

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    getRandomDemo: function getRandomDemo(id) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve(_demo2.default);
            });
        });
    }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwaS5qcyJdLCJuYW1lcyI6WyJnZXRSYW5kb21EZW1vIiwiaWQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInNldFRpbWVvdXQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBRUE7Ozs7OztrQkFFZTtBQUNYQSxpQkFEVyx5QkFDSUMsRUFESixFQUNRO0FBQ2YsZUFBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3BDQyx1QkFBVyxZQUFNO0FBQ2JGO0FBQ0gsYUFGRDtBQUdILFNBSk0sQ0FBUDtBQUtIO0FBUFUsQyIsImZpbGUiOiJhcGkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbV9kZW1vIGZyb20gJy4uL21vY2tzL2RlbW8nXHJcblxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGdldFJhbmRvbURlbW8gKGlkKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKG1fZGVtbylcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcbiJdfQ==