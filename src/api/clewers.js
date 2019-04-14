import request from '@/utils/request'

export function clewers_add(formdata) {
  return request({
    url: 'api/clewers_add',
    method: 'post',
    data: {
      formdata
    }
  })
}

export function getList() {
  // const token = getToken()
  return request({
    url: 'api/clewers_query',
    method: 'get'
  })
}

export function clewers_delete(website) {
  return request({
    url: 'api/clewers_delete?website='+website,
    method: 'delete'
  })
}

export function updatesome(url) {
  return request({
    url: 'api/'+url,
    method: 'get'
  })
}
