<template>
  <div id="home">
    <nav-bar centerColor="#fff">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll
      class="scroll"
      ref="scroll"
      :probeYype="3"
      :pullUpLoad="true"
      @scroll="contentScroll"
      @pullingUp="upLoad"
    >
      <home-swiper :banner="banner"></home-swiper>
      <recommend-view :recommend="recommend"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        :titles="['流行','新品','精选']"
        :goods="goods"
        @tabClick="changeType"
      ></tab-control>
      <goods-list :list="showGoods"></goods-list>
    </scroll>
    <back-top
      @click.native="backTop"
      v-show="isShowBackTop"
    ></back-top>
  </div>
</template>

<script>
// 绝对公共组件：在其他项目里也能用
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
// 相对公共组件：只针对当前项目的不同模块使用
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goodsList/GoodsList";
import BackTop from "components/content/backtop/BackTop";
// 专属视图组件：只针对某个模块使用
import HomeSwiper from "views/home/childComponents/HomeSwiper";
import RecommendView from "views/home/childComponents/RecommendView";
import FeatureView from "views/home/childComponents/FeatureView";

// 封装后的网络请求方法
import { getHomeMultidata, getHomeGoods } from "network/home.js";

export default {
  name: "Home",
  data() {
    return {
      banner: [],
      recommend: [],
      // 商品信息
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      // 当前选中的商品分类
      currentType: "pop",
      // 返回顶部按钮是否显示
      isShowBackTop: false,
    };
  },
  components: {
    // 顶部导航栏
    NavBar,
    // 轮播图
    HomeSwiper,
    // 推荐栏
    RecommendView,
    // 特色产品栏
    FeatureView,
    // 产品分类选项卡
    TabControl,
    // 商品列表
    GoodsList,
    // 封装的滚动库
    Scroll,
    // 返回顶部按钮
    BackTop,
  },

  methods: {
    /* 方法 */
    // 改变当前选中的产品类别
    changeType(index) {
      this.currentType = ["pop", "new", "sell"][index];
    },
    // 返回顶部
    backTop() {
      this.$refs.scroll.scrollTo();
    },
    // 是否显示返回顶部按钮
    contentScroll(position) {
      this.isShowBackTop = position.y <= -1000;
    },
    // 上拉加载更多商品信息
    upLoad() {
      this.getHomeGoods(this.currentType);
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
        // 这个判断针对的是页面刚创建好时，那时betterscroll对象还没有创建，所以是获取不到refresh方法的
        if (this.$refs.scroll.scroll) {
          // 注意this.$refs.scroll对应的是Scroll.vue组件对象，this.$refs.scroll.scroll对应的才是BSscroll对象
          // 我们在Scroll.vue组件对象上封装了refresh、finishPullUp方法，下面两行代码代表分别调用了BSscroll对象的refresh、finishPullUp方法
          this.$refs.scroll.refresh();
          this.$refs.scroll.finishPullUp();
        }
      });
    },
  },
  computed: {
    // 传入GoodList组件，告诉当前展示哪个商品类别
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
#home {
  /* position: relative; */
  height: 100vh;
  overflow: hidden;
}
.scroll {
  /* position: absolute;
  top: 49px;
  bottom: 49px;
  width: 100%; */
  height: calc(100% - 98px);
}
</style>