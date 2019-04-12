import request from '@/utils/request'

export function jiexiapi_add(formdata) {
  return request({
    url: 'api/jiexiapi_add',
    method: 'post',
    data: {
      formdata
    }
  })
}

export function getList() {
  // const token = getToken()
  return request({
    url: 'api/jiexiapi_query',
    method: 'get'
  })
}

export function jiexiapi_delete(website) {
  return request({
    url: 'api/jiexiapi_delete?website='+website,
    method: 'delete'
  })
}

export function updateMovie(formdata) {
  return request({
    url: 'api/newmsg/update',
    method: 'post',
    data: {
      formdata
    }
  })
}
