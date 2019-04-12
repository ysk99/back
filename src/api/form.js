import request from '@/utils/request'

export function formstore(formdata) {
  return request({
    url: 'api/newmsg/store',
    method: 'post',
    data: {
      formdata
    }
  })
}

export function getlinklist() {
  return request({
    url: 'api/movie/index',
    method: 'get'
  })
}

export function deleteMovie(id) {
  return request({
    url: 'api/newmsg/delete/'+id,
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
