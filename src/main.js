import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toast from 'components/common/toast'

Vue.config.productionTip = false

// 创建一个新的Vue实例，该实例用来当作事件总线，发射或监听事件，要谨慎使用，在页面被销毁的时候，调用$off('EventName')销毁事件
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.use(Toast)