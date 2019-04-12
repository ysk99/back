import request from '@/utils/request'

export function storeapi(exceldata) {
  return request({
    url: 'api/articles/store',
    method: 'post',
    data: {
      exceldata
    }
  })
}
