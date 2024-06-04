
import {addAdress} from '@/apis/address'

export const addUserAdd = ()=>{
  //上传信息
  const add = async (data)=>{
    const res = await addAdress(data);
    console.log(res);
  }
  return {add}
}
