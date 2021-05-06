import axios from 'axios'

export function request (config, success, failure) {
  // return new Promise((reslove, reject) => {
  //   // 创建axios实例
  //   const instance = axios.create({
  //     // 实例自定义默认设置
  //     baseURL: 'http://152.136.185.210:7878/api/m5/',
  //     timeout: 5000
  //   })
  //   // 发送网络请求
  //   instance(config).then(res => {
  //     reslove(res)
  //   }).catch(err => {
  //     reject(err)
  //   })
  // })
  // 创建axios实例
  const instance = axios.create({
    // 实例自定义默认设置
    baseURL: 'http://152.136.185.210:7878/api/m5/',
    timeout: 5000
  })
  // 拦截器
  instance.interceptors.request.use(config => {
    console.log(config)
    return config
  }, err => {
    console.log(err)
    return err
  })

  instance.interceptors.response.use(res => {
    return res
  }, err => {
    return err
  })

  return instance(config)
}