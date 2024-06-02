// 用户相关
import request from '@/utils/http'

export const login = ({ account, password }) => {
    return request({
        url: '/login',
        method: 'POST',
        data: {
            account,
            password
        }
    })
}