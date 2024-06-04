import request from "@/utils/http.js"

export const getCheckInfo = () => {
  return request({
    url: "/member/order/pre",
    method: "get"
  })
}

export const putOrder = (data) => {
  return request({
    url: "/member/order",
    method: "post",
    data
  })
}