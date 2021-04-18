<template>
  <div>
    <nav-bar :backColor="'#fff'">
      <template #left>
        <div
          class="icommon"
          @click="back"
        >
          
        </div>
      </template>

      <template #center>
        <div class="tabcontrol">
          <div
            class="tab-item"
            v-for="(item, index) in titles"
            :key=index
          >
            <span
              @click="change(index)"
              :class="{active: isActive===index}"
            >{{item}}</span>
          </div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  data() {
    return {
      isActive: 0,
      titles: ["商品", "参数", "评论", "推荐"],
    };
  },
  components: {
    NavBar,
  },
  methods: {
    // 返回前一页
    back() {
      this.$router.go(-1);
    },
    // 点击导航栏选项卡改变对应选项样式
    change(index) {
      this.isActive = index;
    },
  },
};
</script>

<style scoped>
.icommon {
  font-family: "icomoon";
}
.tabcontrol {
  display: flex;
  background: #fff;
  text-align: center;
  font-size: 15px;
}
.tab-item {
  flex: 1;
}
.tab-item span {
  padding: 5px;
}
.active {
  color: var(--color-high-text);
  border-bottom: 3px solid var(--color-tint);
}
</style>