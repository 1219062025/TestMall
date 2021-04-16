<template>
  <div id="home">
    <nav-bar centerColor="#fff">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banner="banner"></home-swiper>
    <recommend-view :recommend="recommend"></recommend-view>
    <feature-view></feature-view>
    <tab-control
      :titles="['流行','新品','精选']"
      :goods="goods"
      @tabClick="changeType"
    ></tab-control>
    <goods-list :list="showGoods"></goods-list>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goodsList/GoodsList";

import HomeSwiper from "views/home/childComponents/HomeSwiper";
import RecommendView from "views/home/childComponents/RecommendView";
import FeatureView from "views/home/childComponents/FeatureView";

import { getHomeMultidata, getHomeGoods } from "network/home.js";

export default {
  name: "Home",
  data() {
    return {
      banner: [],
      recommend: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
    };
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
  },
  methods: {
    /* 方法 */
    //
    changeType(index) {
      this.currentType = ["pop", "new", "sell"][index];
    },

    /* 网络请求相关的 */
    // 封装轮播图数据请求
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banner = res.data.data.banner.list;
        this.recommend = res.data.data.recommend.list;
      });
    },
    // 封装商品信息数据请求
    getHomeGoods(type) {
      // 在请求的同时page加一代表翻了一页
      getHomeGoods(type, ++this.goods[type].page).then((res) => {
        // 将请求到的一页商品信息push进对应页面的数组中
        this.goods[type].list.push(...res.data.data.list);
      });
    },
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    // 在组件创建成功后
    // 请求轮播图数据
    this.getHomeMultidata();
    // 请求商品信息数据
    for (const type of ["pop", "new", "sell"]) {
      this.getHomeGoods(type);
    }
  },
};
</script>

<style scoped>
</style>