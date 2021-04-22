<template>
  <div id="home">
    <nav-bar centerColor="#fff">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      ref="tabcontrol1"
      :titles="['流行','新品','精选']"
      :goods="goods"
      @tabClick="changeType"
      v-show="istabShow"
      class="tab-fixed tab"
    ></tab-control>
    <scroll
      class="scroll"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="upLoad"
    >
      <home-swiper
        :banner="banner"
        @swiperLoad="swiperLoad"
      ></home-swiper>
      <recommend-view :recommend="recommend"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        ref="tabcontrol2"
        :titles="titles"
        :goods="goods"
        @tabClick="changeType"
        class="tab"
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
// 导入组件及方法
// 绝对公共组件：在其他项目里也能用
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
// 相对公共组件：只针对当前项目的不同模块使用
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goodsList/GoodsList";
// 专属子组件：只针对某个组件使用
import HomeSwiper from "views/home/childComponents/HomeSwiper";
import RecommendView from "views/home/childComponents/RecommendView";
import FeatureView from "views/home/childComponents/FeatureView";

// 封装后的网络请求方法
import { getHomeMultidata, getHomeGoods } from "network/home";
// 防抖函数的封装
import { debounce } from "common/utils";

// 混入
import { backTopMixin } from "common/mixin";

export default {
  name: "Home",
  // 混入返回顶部按钮
  mixins: [backTopMixin],
  data() {
    return {
      titles: ["流行", "新品", "精选"],
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
      // 处于BScroll中TabControl组件距离顶部距离
      taboffsetTop: 0,
      // 是否显示被隐藏的用来实现吸顶效果的TabControl组件
      istabShow: false,
      savaY: 0,
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
  },

  methods: {
    /* 方法 */
    // 改变当前选中的产品类别
    changeType(index) {
      this.$refs.tabcontrol1.isActive = index;
      this.$refs.tabcontrol2.isActive = index;
      this.currentType = ["pop", "new", "sell"][index];
    },

    // 滚动到一定距离之后进行一些判断
    contentScroll(position) {
      // 滚动一定距离后显示返回顶部按钮
      this.isShowBackTop = position.y <= -1000;
      // 滚动一定距离后处于BScroll外的TabControl组件吸顶
      this.istabShow = position.y <= -this.taboffsetTop;
    },
    // 上拉加载更多商品信息
    upLoad() {
      this.getHomeGoods(this.currentType);
    },
    // 轮播图图片加载完后执行操作
    swiperLoad() {
      // 等到轮播图的中的图片加载完后，计算当前TabControl距离顶部的距离
      this.taboffsetTop =
        this.$refs.tabcontrol2.$el.offsetTop -
        this.$refs.tabcontrol2.$el.offsetHeight;
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
        // 注意this.$refs.scroll对应的是Scroll.vue组件对象，this.$refs.scroll.scroll对应的才是BSscroll对象
        // 我们在Scroll.vue组件对象上封装了finishPullUp方法，下面代码代表调用了BSscroll对象的finishPullUp方法
        this.$refs.scroll && this.$refs.scroll.finishPullUp();
      });
    },
  },
  computed: {
    // 传入GoodList组件，告诉当前应该展示哪个商品类别
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
  mounted() {
    // 对于更新BScroll计算高度的操作进行防抖封装
    const refresh = debounce(this.$refs.scroll.refresh);
    // 在组件挂载完成之后就开始通过事件总线开始监听图片的加载，并在每个图片加载完后更新一次BSscroll计算的高度
    this.$bus.$on("imgLoad", () => {
      refresh();
    });
  },
  destroyed() {
    // 在组件被销毁之后要及时地删除事件，不然下次组件被创建，就同时存在两个相同事件，会报错
    this.$bus.$off("imgLoad");
  },
  activated() {
    // 切换回到Home页面时滚动到离开前保存好的位置
    this.$refs.scroll.scrollTo(0, this.savaY, 0);
    // 保守起见，刷新一次BScroll
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // 切换离开Home页面时保存当前BScroll滚动的y轴位置
    this.savaY = this.$refs.scroll.getScrollY();
  },
};
</script>

<style scoped>
#home {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.scroll {
  height: calc(100% - 98px);
}

.tab-fixed {
  position: absolute;
  left: 0;
  right: 0;
  z-index: 99;
}
.tab {
  padding: 10px 0 15px 0;
}
</style>