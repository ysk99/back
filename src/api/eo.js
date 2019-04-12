import request from '@/utils/request'
// import { getToken } from '@/utils/auth'

export function getEo() {
  // const token = getToken()
  return request({
    url: 'api/eo',
    method: 'get'
  })
}
