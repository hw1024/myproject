'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('./../assets/plugins/wx-request/lib/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HttpService = function (_WxRequest) {
    _inherits(HttpService, _WxRequest);

    function HttpService(options) {
        _classCallCheck(this, HttpService);

        var _this = _possibleConstructorReturn(this, (HttpService.__proto__ || Object.getPrototypeOf(HttpService)).call(this, options));

        _this.$$prefix = '';
        _this.$$path = {
            index: '/index',
            banner: '/banner',
            brands: '/brands',
            ranking: '/ranking',
            cars: '/cars',
            addcart: '/addcart',
            users: '/users',
            seecar: '/seecar',
            earn: '/earn',
            store: '/store',
            ordercar: '/ordercar'
        };
        _this.interceptors.use({
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
                console.log(_response);
                wx.hideLoading();
                // if(response.statusCode === 401) {
                //        wx.removeStorageSync('token')
                //        wx.redirectTo({
                //            url: '/pages/login/index'
                //        })
                //    }
                return _response;
            },
            responseError: function responseError(_responseError) {
                wx.hideLoading();
                return Promise.reject(_responseError);
            }
        });
        return _this;
    }

    _createClass(HttpService, [{
        key: 'getBanners',
        value: function getBanners(params) {
            return this.getRequest(this.$$path.banner, {
                data: params
            });
        }
    }, {
        key: 'postcheckAuth',
        value: function postcheckAuth(params) {
            return this.postRequest(this.$$path.index + '/check_auth', {
                data: params
            });
        }
    }, {
        key: 'getBannersIndex',
        value: function getBannersIndex() {
            return this.getRequest(this.$$path.index + '/banner');
        }
    }, {
        key: 'getcarListIndex',
        value: function getcarListIndex() {
            return this.getRequest(this.$$path.index + '/car_list');
        }
    }, {
        key: 'getCars',
        value: function getCars(params) {
            return this.getRequest(this.$$path.cars, {
                data: params
            });
        }
    }, {
        key: 'getUsers',
        value: function getUsers() {
            return this.getRequest(this.$$path.users);
        }
    }, {
        key: 'getDetailStore',
        value: function getDetailStore() {
            return this.getRequest(this.$$path.store + '/detail');
        }
    }, {
        key: 'getDetailSeecar',
        value: function getDetailSeecar() {
            return this.getRequest(this.$$path.seecar + '/detail');
        }
    }, {
        key: 'getVerificationDetailSeecar',
        value: function getVerificationDetailSeecar() {
            return this.getRequest(this.$$path.seecar + '/verification_detail');
        }
    }, {
        key: 'getVerificationReturnSeecar',
        value: function getVerificationReturnSeecar() {
            return this.getRequest(this.$$path.seecar + '/verification_return');
        }
    }, {
        key: 'getDetailOrdercar',
        value: function getDetailOrdercar() {
            return this.getRequest(this.$$path.ordercar + '/detail');
        }
    }, {
        key: 'getOwnDetailOrdercar',
        value: function getOwnDetailOrdercar() {
            return this.getRequest(this.$$path.ordercar + '/own_detail');
        }
    }, {
        key: 'getReturnSuccessOrdercar',
        value: function getReturnSuccessOrdercar() {
            return this.getRequest(this.$$path.ordercar + '/return_success');
        }
    }, {
        key: 'postVerificationSeecar',
        value: function postVerificationSeecar(params) {
            return this.postRequest(this.$$path.seecar + '/verification', {
                data: params
            });
        }
    }, {
        key: 'postRefundApplyOrdercar',
        value: function postRefundApplyOrdercar(params) {
            return this.postRequest(this.$$path.ordercar + '/refund_apply', {
                data: params
            });
        }
    }, {
        key: 'postPaymentOrdercar',
        value: function postPaymentOrdercar(params) {
            return this.postRequest(this.$$path.ordercar + '/payment', {
                data: params
            });
        }
    }, {
        key: 'getRanking',
        value: function getRanking(params) {
            return this.postRequest(this.$$path.ranking, {
                data: params
            });
        }
    }, {
        key: 'addCart',
        value: function addCart(params) {
            return this.postRequest(this.$$path.addcart, {
                data: params
            });
        }
    }]);

    return HttpService;
}(_index2.default);

exports.default = HttpService;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkh0dHBTZXJ2aWNlLmpzIl0sIm5hbWVzIjpbIkh0dHBTZXJ2aWNlIiwib3B0aW9ucyIsIiQkcHJlZml4IiwiJCRwYXRoIiwiaW5kZXgiLCJiYW5uZXIiLCJicmFuZHMiLCJyYW5raW5nIiwiY2FycyIsImFkZGNhcnQiLCJ1c2VycyIsInNlZWNhciIsImVhcm4iLCJzdG9yZSIsIm9yZGVyY2FyIiwiaW50ZXJjZXB0b3JzIiwidXNlIiwicmVxdWVzdCIsImhlYWRlciIsInVybCIsImluZGV4T2YiLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwiQXV0aG9yaXphdGlvbiIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJyZXF1ZXN0RXJyb3IiLCJoaWRlTG9hZGluZyIsIlByb21pc2UiLCJyZWplY3QiLCJyZXNwb25zZSIsImNvbnNvbGUiLCJsb2ciLCJyZXNwb25zZUVycm9yIiwicGFyYW1zIiwiZ2V0UmVxdWVzdCIsImRhdGEiLCJwb3N0UmVxdWVzdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0lBRU1BLFc7OztBQUNMLHlCQUFZQyxPQUFaLEVBQXFCO0FBQUE7O0FBQUEsOEhBQ2RBLE9BRGM7O0FBRXBCLGNBQUtDLFFBQUwsR0FBZ0IsRUFBaEI7QUFDQSxjQUFLQyxNQUFMLEdBQWM7QUFDSkMsbUJBQWtCLFFBRGQ7QUFFYkMsb0JBQWtCLFNBRkw7QUFHYkMsb0JBQWlCLFNBSEo7QUFJSkMscUJBQWtCLFVBSmQ7QUFLYkMsa0JBQWtCLE9BTEw7QUFNSkMscUJBQWtCLFVBTmQ7QUFPYkMsbUJBQWtCLFFBUEw7QUFRSkMsb0JBQWtCLFNBUmQ7QUFTSkMsa0JBQWtCLE9BVGQ7QUFVSkMsbUJBQWtCLFFBVmQ7QUFXSkMsc0JBQWtCO0FBWGQsU0FBZDtBQWFNLGNBQUtDLFlBQUwsQ0FBa0JDLEdBQWxCLENBQXNCO0FBQ2xCQyxtQkFEa0IsbUJBQ1ZBLFFBRFUsRUFDRDtBQUNoQkEseUJBQVFDLE1BQVIsR0FBaUJELFNBQVFDLE1BQVIsSUFBa0IsRUFB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aEMsb0JBQXVEO0FBQzFEeUIsc0JBQU1GO0FBRG9ELGFBQXZELENBQVA7QUFHSDs7O2dEQUV1QkEsTSxFQUFRO0FBQzVCLG1CQUFPLEtBQUtHLFdBQUwsQ0FBb0IsS0FBS2xDLE1BQUwsQ0FBWVcsUUFBaEMsb0JBQXlEO0FBQzVEc0Isc0JBQU1GO0FBRHNELGFBQXpELENBQVA7QUFHSDs7OzRDQUVtQkEsTSxFQUFRO0FBQ3hCLG1CQUFPLEtBQUtHLFdBQUwsQ0FBb0IsS0FBS2xDLE1BQUwsQ0FBWVcsUUFBaEMsZUFBb0Q7QUFDdkRzQixzQkFBTUY7QUFEaUQsYUFBcEQsQ0FBUDtBQUdIOzs7bUNBRVVBLE0sRUFBUTtBQUNmLG1CQUFPLEtBQUtHLFdBQUwsQ0FBaUIsS0FBS2xDLE1BQUwsQ0FBWUksT0FBN0IsRUFBc0M7QUFDekM2QixzQkFBTUY7QUFEbUMsYUFBdEMsQ0FBUDtBQUdIOzs7Z0NBRU9BLE0sRUFBUTtBQUNaLG1CQUFPLEtBQUtHLFdBQUwsQ0FBaUIsS0FBS2xDLE1BQUwsQ0FBWU0sT0FBN0IsRUFBc0M7QUFDekMyQixzQkFBTUY7QUFEbUMsYUFBdEMsQ0FBUDtBQUdIOzs7Ozs7a0JBSVVsQyxXIiwiZmlsZSI6Ikh0dHBTZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFd4UmVxdWVzdCBmcm9tICcuLi9hc3NldHMvcGx1Z2lucy93eC1yZXF1ZXN0L2xpYi9pbmRleCdcclxuXHJcbmNsYXNzIEh0dHBTZXJ2aWNlIGV4dGVuZHMgV3hSZXF1ZXN0IHtcclxuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcblx0XHRzdXBlcihvcHRpb25zKVxyXG5cdFx0dGhpcy4kJHByZWZpeCA9ICcnXHJcblx0XHR0aGlzLiQkcGF0aCA9IHtcclxuICAgICAgICAgICAgaW5kZXggICAgICAgICAgIDogJy9pbmRleCcsXHJcblx0XHRcdGJhbm5lciAgICAgICAgICA6ICcvYmFubmVyJywgXHJcblx0XHRcdGJyYW5kcyAgICBcdCAgICA6ICcvYnJhbmRzJywgXHJcbiAgICAgICAgICAgIHJhbmtpbmcgICAgICAgICA6ICcvcmFua2luZycsIFxyXG5cdFx0XHRjYXJzICAgICAgICAgICAgOiAnL2NhcnMnLFxyXG4gICAgICAgICAgICBhZGRjYXJ0ICAgICAgICAgOiAnL2FkZGNhcnQnLCBcclxuXHRcdFx0dXNlcnMgICAgICAgICAgIDogJy91c2VycycsIFxyXG4gICAgICAgICAgICBzZWVjYXIgICAgICAgICAgOiAnL3NlZWNhcicsXHJcbiAgICAgICAgICAgIGVhcm4gICAgICAgICAgICA6ICcvZWFybicsXHJcbiAgICAgICAgICAgIHN0b3JlICAgICAgICAgICA6ICcvc3RvcmUnLFxyXG4gICAgICAgICAgICBvcmRlcmNhciAgICAgICAgOiAnL29yZGVyY2FyJyxcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pbnRlcmNlcHRvcnMudXNlKHtcclxuICAgICAgICAgICAgcmVxdWVzdChyZXF1ZXN0KSB7XHJcbiAgICAgICAgICAgIFx0cmVxdWVzdC5oZWFkZXIgPSByZXF1ZXN0LmhlYWRlciB8fCB7fVxyXG4gICAgICAgICAgICBcdHJlcXVlc3QuaGVhZGVyWydjb250ZW50LXR5cGUnXSA9ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcXVlc3QudXJsLmluZGV4T2YoJy9zcF9hcGknKSAhPT0gLTEgJiYgd3guZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJykpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0LmhlYWRlci5BdXRob3JpemF0aW9uID0gJ0JlYXJlciAnICsgd3guZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+WKoOi9veS4rScsIFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXF1ZXN0XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJlcXVlc3RFcnJvcihyZXF1ZXN0RXJyb3IpIHtcclxuICAgICAgICAgICAgXHR3eC5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVxdWVzdEVycm9yKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZXNwb25zZShyZXNwb25zZSkge1xyXG4gICAgICAgICAgICBcdGNvbnNvbGUubG9nKHJlc3BvbnNlKVxyXG4gICAgICAgICAgICBcdHd4LmhpZGVMb2FkaW5nKClcclxuICAgICAgICAgICAgXHQvLyBpZihyZXNwb25zZS5zdGF0dXNDb2RlID09PSA0MDEpIHtcclxuICAgICAgICAgICAgIC8vICAgICAgICB3eC5yZW1vdmVTdG9yYWdlU3luYygndG9rZW4nKVxyXG4gICAgICAgICAgICAgLy8gICAgICAgIHd4LnJlZGlyZWN0VG8oe1xyXG4gICAgICAgICAgICAgLy8gICAgICAgICAgICB1cmw6ICcvcGFnZXMvbG9naW4vaW5kZXgnXHJcbiAgICAgICAgICAgICAvLyAgICAgICAgfSlcclxuICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZXNwb25zZUVycm9yKHJlc3BvbnNlRXJyb3IpIHtcclxuICAgICAgICAgICAgXHR3eC5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVzcG9uc2VFcnJvcilcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KVxyXG5cdH1cclxuXHRcdFxyXG5cdGdldEJhbm5lcnMocGFyYW1zKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5nZXRSZXF1ZXN0KHRoaXMuJCRwYXRoLmJhbm5lciwge1xyXG5cdFx0XHRkYXRhOiBwYXJhbXMsXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcbiAgICBwb3N0Y2hlY2tBdXRoKHBhcmFtcykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RSZXF1ZXN0KGAke3RoaXMuJCRwYXRoLmluZGV4fS9jaGVja19hdXRoYCwge1xyXG4gICAgICAgICAgICBkYXRhOiBwYXJhbXMsXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBnZXRCYW5uZXJzSW5kZXgoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UmVxdWVzdChgJHt0aGlzLiQkcGF0aC5pbmRleH0vYmFubmVyYClcclxuICAgIH1cclxuXHJcbiAgICBnZXRjYXJMaXN0SW5kZXgoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UmVxdWVzdChgJHt0aGlzLiQkcGF0aC5pbmRleH0vY2FyX2xpc3RgKVxyXG4gICAgfVxyXG5cclxuXHRnZXRDYXJzKHBhcmFtcykge1xyXG5cdFx0cmV0dXJuIHRoaXMuZ2V0UmVxdWVzdCh0aGlzLiQkcGF0aC5jYXJzLCB7XHJcblx0XHRcdGRhdGE6IHBhcmFtcyxcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRnZXRVc2VycygpIHtcclxuXHRcdHJldHVybiB0aGlzLmdldFJlcXVlc3QodGhpcy4kJHBhdGgudXNlcnMpXHJcblx0fVxyXG4gICAgXHJcbiAgICBnZXREZXRhaWxTdG9yZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRSZXF1ZXN0KGAke3RoaXMuJCRwYXRoLnN0b3JlfS9kZXRhaWxgKVxyXG4gICAgfVxyXG5cclxuICAgIGdldERldGFpbFNlZWNhcigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRSZXF1ZXN0KGAke3RoaXMuJCRwYXRoLnNlZWNhcn0vZGV0YWlsYClcclxuICAgIH1cclxuXHJcbiAgICBnZXRWZXJpZmljYXRpb25EZXRhaWxTZWVjYXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UmVxdWVzdChgJHt0aGlzLiQkcGF0aC5zZWVjYXJ9L3ZlcmlmaWNhdGlvbl9kZXRhaWxgKVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXRWZXJpZmljYXRpb25SZXR1cm5TZWVjYXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UmVxdWVzdChgJHt0aGlzLiQkcGF0aC5zZWVjYXJ9L3ZlcmlmaWNhdGlvbl9yZXR1cm5gKVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXREZXRhaWxPcmRlcmNhcigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRSZXF1ZXN0KGAke3RoaXMuJCRwYXRoLm9yZGVyY2FyfS9kZXRhaWxgKVxyXG4gICAgfVxyXG5cclxuICAgIGdldE93bkRldGFpbE9yZGVyY2FyKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFJlcXVlc3QoYCR7dGhpcy4kJHBhdGgub3JkZXJjYXJ9L293bl9kZXRhaWxgKVxyXG4gICAgfVxyXG5cclxuICAgIGdldFJldHVyblN1Y2Nlc3NPcmRlcmNhcigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRSZXF1ZXN0KGAke3RoaXMuJCRwYXRoLm9yZGVyY2FyfS9yZXR1cm5fc3VjY2Vzc2ApXHJcbiAgICB9XHJcblxyXG4gICAgcG9zdFZlcmlmaWNhdGlvblNlZWNhcihwYXJhbXMpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wb3N0UmVxdWVzdChgJHt0aGlzLiQkcGF0aC5zZWVjYXJ9L3ZlcmlmaWNhdGlvbmAsIHtcclxuICAgICAgICAgICAgZGF0YTogcGFyYW1zLFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcG9zdFJlZnVuZEFwcGx5T3JkZXJjYXIocGFyYW1zKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdFJlcXVlc3QoYCR7dGhpcy4kJHBhdGgub3JkZXJjYXJ9L3JlZnVuZF9hcHBseWAsIHtcclxuICAgICAgICAgICAgZGF0YTogcGFyYW1zLFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcG9zdFBheW1lbnRPcmRlcmNhcihwYXJhbXMpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wb3N0UmVxdWVzdChgJHt0aGlzLiQkcGF0aC5vcmRlcmNhcn0vcGF5bWVudGAsIHtcclxuICAgICAgICAgICAgZGF0YTogcGFyYW1zLFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UmFua2luZyhwYXJhbXMpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wb3N0UmVxdWVzdCh0aGlzLiQkcGF0aC5yYW5raW5nLCB7XHJcbiAgICAgICAgICAgIGRhdGE6IHBhcmFtcyxcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGFkZENhcnQocGFyYW1zKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdFJlcXVlc3QodGhpcy4kJHBhdGguYWRkY2FydCwge1xyXG4gICAgICAgICAgICBkYXRhOiBwYXJhbXMsXHJcbiAgICAgICAgfSlcclxuICAgIH0gXHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBIdHRwU2VydmljZSJdfQ==