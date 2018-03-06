import WxRequest from '../assets/plugins/wx-request/lib/index'

class HttpService extends WxRequest {
	constructor(options) {
		super(options)
		this.$$prefix = ''
		this.$$path = {
            index           : '/index',
			banner          : '/banner', 
			brands    	    : '/brands', 
            ranking         : '/ranking', 
			cars            : '/cars',
            addcart         : '/addcart', 
			users           : '/users', 
            seecar          : '/seecar',
            earn            : '/earn',
            store           : '/store',
            ordercar        : '/ordercar',
        }
        this.interceptors.use({
            request(request) {
            	request.header = request.header || {}
            	request.header['content-type'] = 'application/json'
                if (request.url.indexOf('/sp_api') !== -1 && wx.getStorageSync('token')) {
                    request.header.Authorization = 'Bearer ' + wx.getStorageSync('token')
                }
                wx.showLoading({
                    title: '加载中', 
                })
                return request
            },
            requestError(requestError) {
            	wx.hideLoading()
                return Promise.reject(requestError)
            },
            response(response) {
            	console.log(response)
            	wx.hideLoading()
            	// if(response.statusCode === 401) {
             //        wx.removeStorageSync('token')
             //        wx.redirectTo({
             //            url: '/pages/login/index'
             //        })
             //    }
                return response
            },
            responseError(responseError) {
            	wx.hideLoading()
                return Promise.reject(responseError)
            },
        })
	}
		
	getBanners(params) {
		return this.getRequest(this.$$path.banner, {
			data: params,
		})
	}

    postcheckAuth(params) {
        return this.postRequest(`${this.$$path.index}/check_auth`, {
            data: params,
        })
    }

    getBannersIndex() {
        return this.getRequest(`${this.$$path.index}/banner`)
    }

    getcarListIndex() {
        return this.getRequest(`${this.$$path.index}/car_list`)
    }

	getCars(params) {
		return this.getRequest(this.$$path.cars, {
			data: params,
		})
	}

	getUsers() {
		return this.getRequest(this.$$path.users)
	}
    
    getDetailStore() {
        return this.getRequest(`${this.$$path.store}/detail`)
    }

    getDetailSeecar() {
        return this.getRequest(`${this.$$path.seecar}/detail`)
    }

    getVerificationDetailSeecar() {
        return this.getRequest(`${this.$$path.seecar}/verification_detail`)
    }
    
    getVerificationReturnSeecar() {
        return this.getRequest(`${this.$$path.seecar}/verification_return`)
    }
    
    getDetailOrdercar() {
        return this.getRequest(`${this.$$path.ordercar}/detail`)
    }

    getOwnDetailOrdercar() {
        return this.getRequest(`${this.$$path.ordercar}/own_detail`)
    }

    getReturnSuccessOrdercar() {
        return this.getRequest(`${this.$$path.ordercar}/return_success`)
    }

    postVerificationSeecar(params) {
        return this.postRequest(`${this.$$path.seecar}/verification`, {
            data: params,
        })
    }

    postRefundApplyOrdercar(params) {
        return this.postRequest(`${this.$$path.ordercar}/refund_apply`, {
            data: params,
        })
    }

    postPaymentOrdercar(params) {
        return this.postRequest(`${this.$$path.ordercar}/payment`, {
            data: params,
        })
    }

    getRanking(params) {
        return this.postRequest(this.$$path.ranking, {
            data: params,
        })
    }

    addCart(params) {
        return this.postRequest(this.$$path.addcart, {
            data: params,
        })
    } 

}

export default HttpService