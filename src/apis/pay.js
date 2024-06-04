import request from '@/utils/http'

export const getOrder = (id)=>{
  return request({
    url:`/member/order/${id}`,
    method:'get'
  })
}