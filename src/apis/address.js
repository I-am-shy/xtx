// 地址的添加，删除，修改，查询

import request from '@/utils/http'

//参数说明
/**
 * @id :地址的id
 * @data :json 地址的各项信息，属性如下
  {
    receiver-string： 收货人-姓名
    contact-string： 收货人-联系方式
    provinceCode-string： 收货人-省份编码
    cityCode-string： 收货人-城市编码
    countyCode-string： 收货人-地区编码
    address-string： 收货人-详细地址
    postalCode-string： 收货人-邮政编码
    addressTags-string： 收货人-地址标签，如果有多个, 以英文逗号分割
    isDefault-integer： 收货地址是否默认，0是, 1不是
    fullLocation-string： 收货人-完整地址
  }
  @return {*}
 */




// 查询
export const getAddressList = ()=>{
  return request({
    url: 'member/address',
    method: 'get'
  })
}
// 添加
export const addAdress = (data)=>{
  return request({
    url: 'member/address',
    method: 'post',
    data
  })
}
// 修改
export const editAddress = (id,data)=>{
  return request({
    url: `member/address/${id}`,
    method: 'put',
    data
  })
}
// 删除
export const deleteAddress = (id)=>{
  return request({
    url: `member/address/${id}`,
    method: 'delete'
  })
}
