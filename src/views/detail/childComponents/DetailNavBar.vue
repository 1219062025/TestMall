<template>
  <div class="detail-nav">
    <div
      class="icommon"
      @click="back"
    >
      
    </div>

    <div class="tab-nav">
      <div
        class="tab-nav-item"
        v-for="(item, index) in titles"
        :key=index
      >
        <span
          @click="tabClick(index)"
          :class="{active: isActive===index}"
        >{{item}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailNavBar",
  data() {
    return {
      isActive: 0,
      titles: ["商品", "参数", "评论", "推荐"],
    };
  },
  methods: {
    // 返回前一页
    back() {
      this.$router.go(-1);
    },
    // 点击导航栏选项卡改变对应选项样式
    tabClick(index) {
      this.isActive = index;
      this.$emit("scrollTab", index);
    },
  },
};
</script>

<style scoped>
.detail-nav {
  position: relative;
  z-index: 99;
  display: flex;
  width: 100%;
  text-align: center;
  line-height: 49px;
}
.icommon {
  width: 60px;
  font-family: "icomoon";
}
.tab-nav {
  display: flex;
  flex: 1;
  margin-right: 60px;
  background: #fff;
  text-align: center;
  font-size: 15px;
}
.tab-nav-item {
  flex: 1;
}
.tab-nav-item span {
  padding: 5px;
}
.active {
  color: var(--color-high-text);
  border-bottom: 3px solid var(--color-tint);
}
</style>