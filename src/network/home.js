// 管理从后台获取home组件需要的数据
import { request } from './request'

export function getHomeData () {
  return  request({
    url: '/home/multidata'
  })
}

export function getHomeGoods (type, page) {
  return request({
    url: '/home/data',
    params: {
      type: type,
      page: page
    }
  })
}