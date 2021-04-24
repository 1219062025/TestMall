import Toast from "./Toast.vue"

const obj = {}
obj.install = function (Vue) {
  // 使用Vue.extends创建Toast组件的构造器
  const toastContrustor = Vue.extend(Toast)
  // 使用组件构造器创建出一个Toast组件实例
  const toast = new toastContrustor()
  // 将toast组件实例挂载到一个新创建的div元素上
  toast.$mount(document.createElement('div'))
  // 再将toast组件实例挂载的元素(此时可以用$el来表示)添加到DOM文档树中
  document.body.appendChild(toast.$el)
  // 在Vue原型上定义一个全局可以访问到的属性，该属性指向Toast组件对象
  Vue.prototype.$toast = toast
}

export default obj