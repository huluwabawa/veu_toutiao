import requset from '@/utils/request'

export const getUserInfoAPI = function () {
  return requset.get('/user')
}
