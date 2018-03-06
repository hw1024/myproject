import m_demo from '../mocks/demo'

import wepy from 'wepy';

export default {
    getRandomDemo (id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(m_demo)
            })
        })
    }
}
