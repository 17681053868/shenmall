import Toast from '@/components/common/toast/Toast'

const obj = {}
obj.install = function (Vue) {
  // 创建组件构造器
  const  toastConstruct = Vue.extend(Toast)
  // 通过new的方式，创建一个组件对象
  const toast = new toastConstruct()
  // 将组件对象手动挂载到标签上
  toast.$mount(document.createElement('div'))
  // toast.$el对应上面创建的div
  document.body.appendChild(toast.$el)
  Vue.prototype.$toast = toast
}
 
export default obj