import request from '@/utils/request'
// import { getToken } from '@/utils/auth'

export function getList() {
  // const token = getToken()
  return request({
    url: 'api/articles',
    method: 'get'
  })
}

export function getListPagination(page, limit) {
  // const token = getToken()
  return request({
    url: 'api/articles/getListPagination',
    method: 'post',
    data: {
      page,
      limit
    }
  })
}

export function updateArticles(newdata) {
  return request({
    url: 'api/articles/update',
    method: 'post',
    data: {
      newdata
    }
  })
}

export function createArticles(newdata) {
  return request({
    url: 'api/articles/create',
    method: 'post',
    data: {
      newdata
    }
  })
}
