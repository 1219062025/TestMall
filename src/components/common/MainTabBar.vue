<template>
  <tab-bar>
    <tab-bar-item path="/home">
      <p
        slot="icon"
        class="icommon"
      ></p>
      <template #text>首页</template>
    </tab-bar-item>

    <tab-bar-item path="/cart">
      <p
        slot="icon"
        class="icommon"
      ></p>
      <template #text>分类</template>
    </tab-bar-item>

    <tab-bar-item path="/category">
      <p
        slot="icon"
        class="icommon"
      ></p>
      <template #text>购物车</template>
    </tab-bar-item>

    <tab-bar-item path="/profile">
      <p
        slot="icon"
        class="icommon"
      ></p>
      <template #text>我的</template>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from "./tabbar/TabBar";
import TabBarItem from "./tabbar/TabBarItem";
export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem,
  },
};
</script>

<style scoped>
@font-face {
  font-family: "icomoon";
  src: url("~assets/fonts/icomoon.eot?rz0d0j");
  src: url("~assets/fonts/icomoon.eot?rz0d0j#iefix") format("embedded-opentype"),
    url("~assets/fonts/icomoon.ttf?rz0d0j") format("truetype"),
    url("~assets/fonts/icomoon.woff?rz0d0j") format("woff"),
    url("~assets/fonts/icomoon.svg?rz0d0j#icomoon") format("svg");
  font-weight: normal;
  font-style: normal;
  font-display: block;
}

.icommon {
  font-family: "icomoon";
  margin: 6px 0;
}
</style>