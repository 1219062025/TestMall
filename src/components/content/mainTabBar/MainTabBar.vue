<template>
  <tab-bar>
    <tab-bar-item path="/home">
      <p
        slot="icon"
        class="icommon"
      ></p>
      <template #text>首页</template>
    </tab-bar-item>

    <tab-bar-item path="/category">
      <p
        slot="icon"
        class="icommon"
      ></p>
      <template #text>分类</template>
    </tab-bar-item>

    <tab-bar-item path="/cart">
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
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";
export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem,
  },
};
</script>

<style scoped>
.icommon {
  font-family: "icomoon";
  margin: 6px 0;
}
</style>