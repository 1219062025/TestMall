<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    {{iid}}
  </div>
</template>

<script>
// 专属子组件：只针对某个组件使用
import DetailNavBar from "views/detail/childComponents/DetailNavBar";

// 网络请求方法
import { getDetailGoods } from "network/detail";
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
    };
  },
  components: {
    DetailNavBar,
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.iid = to.params.iid;
      getDetailGoods(vm.iid).then((res) => {
        console.log(res);
      });
    });
  },
};
</script>

<style scoped>
.icommon {
  font-family: "icomoon";
}
</style>