import request from '@/utils/request'

export function hotsearch_add(formdata) {
  return request({
    url: 'api/hotsearchs_add',
    method: 'post',
    data: {
      formdata
    }
  })
}

export function getList() {
  // const token = getToken()
  return request({
    url: 'api/hotsearchs_query',
    method: 'get'
  })
}

export function hotsearch_delete(id) {
  return request({
    url: 'api/hotsearchs_delete?uid='+id,
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
