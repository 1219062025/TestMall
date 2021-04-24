<template>
  <div id="detail">
    <detail-nav-bar
      @scrollTab="scrollTab"
      ref="navBar"
    ></detail-nav-bar>
    <scroll
      :probeType="3"
      @scroll="scroll"
      class="detail-scroll"
      ref="scroll"
    >
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detail-info="detailInfo"
        @imgLoad="imgLoad"
      ></detail-goods-info>
      <detail-param-info
        :item-params="itemParams"
        ref="paramInfo"
      ></detail-param-info>
    </scroll>
    <back-top
      @click.native="backTop"
      v-show="isShowBackTop"
    ></back-top>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
  </div>
</template>

<script>
// 绝对公共组件
import Scroll from "components/common/scroll/Scroll";
// 专属子组件：只针对某个组件使用
import DetailNavBar from "views/detail/childComponents/DetailNavBar";
import DetailSwiper from "views/detail/childComponents/DetailSwiper";
import DetailBaseInfo from "views/detail/childComponents/DetailBaseInfo";
import DetailShopInfo from "views/detail/childComponents/DetailShopInfo";
import DetailGoodsInfo from "views/detail/childComponents/DetailGoodsInfo";
import DetailParamInfo from "views/detail/childComponents/DetailParamInfo";
import DetailBottomBar from "views/detail/childComponents/DetailBottomBar";

// 方法函数
import { debounce } from "common/utils";

// 网络请求获取数据方法
import { getDetail, Goods, Shop } from "network/detail";

// 混入
import { backTopMixin } from "common/mixin";

export default {
  name: "Detail",
  // 混入返回顶部按钮
  mixins: [backTopMixin],
  data() {
    return {
      // 商品唯一标识
      iid: null,
      // 轮播图图片
      topImages: [],
      // 商品基本信息：价格、描述、打折等
      goods: {},
      // 店铺信息
      shop: {},
      // 商品展示效果信息：穿着效果的图片等
      detailInfo: {},
      // 商品参数信息：尺码、颜色等
      itemParams: {},
      // 封装后的刷新BScroll函数
      refresh() {},
      // 存储组件DetailParamInfo的根元素
      paramInfo: {},
      // 获取y轴函数
      getThemeY() {},
      // 存储各个组件的y轴值
      themeY: [0],
      // tab栏被选中的选项的序号
      currentIndex: 0,
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailBottomBar,
  },
  methods: {
    // 详情图片加载完，刷新BScorll
    imgLoad() {
      // 对频繁的图片加载事件进行防抖
      this.refresh();
      this.getThemeY();
    },
    // 点击选项卡滚动到对应组件
    scrollTab(index) {
      this.$refs.scroll.scrollTo(0, -this.themeY[index], 500);
    },
    // 滚动
    scroll(position) {
      this.isShowBackTop = position.y <= -1000;
      for (let i = 0; i < this.themeY.length - 1; i++) {
        if (
          this.currentIndex !== i &&
          -position.y >= this.themeY[i] &&
          -position.y < this.themeY[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.navBar.isActive = this.currentIndex;
          // 滚动一定距离后显示返回顶部按钮
        }
      }
    },
    // 添加到购物车
    addToCart() {
      // 将商品信息放入一个对象product中，该对象当作负载上的一个属性被提交
      // 为了避免用户在商品信息还没加载出来就就点加入购物车导致购物车里面的商品信息为空白的情况
      // 进行异步添加，点击超过500Ms商品信息还没加载好的提示网络问题
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.newPrice;
      product.iid = this.iid;
      this.$store
        .dispatch({
          type: "clickCart",
          product,
        })
        .then((value) => {
          this.$toast.show(value, 2000);
        })
        .catch((reason) => {
          this.$toast.show(reason, 2000);
        });
    },
  },
  created() {
    this.iid = this.$route.params.iid;
    getDetail(this.iid).then((res) => {
      console.log(res);
      const data = res.data.result;
      // 商品基本信息的整合，在detail.js创建一个商品信息类Goods，并将传入的数据分流整合
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 卖家信息
      this.shop = new Shop(data.shopInfo);
      // 商品展示效果信息
      this.detailInfo = data.detailInfo;
      // 商品参数信息
      this.itemParams = data.itemParams;
      // 轮播图图片
      this.topImages = data.itemInfo.topImages;
    });
  },
  mounted() {
    /* 
    这里将组件的根元素先缓存下来，
    原因很简单，因为如果用户一进到详情页就很快的退回主页时，
    由于防抖封装后的函数getThemeY需要在一定时间后获取this.$refs.paramInfo.$el进行计算，
    可很快的就退回主页代表this.$refs.paramInfo.$el已经被销毁了，那么getThemeY函数获取不到就报错 
    */
    this.paramInfo = this.$refs.paramInfo.$el;
    // 使用debounce对函数进行防抖封装
    this.refresh = debounce(this.$refs.scroll.refresh);
    this.getThemeY = debounce(() => {
      this.themeY[1] = this.paramInfo.offsetTop;
      this.themeY[this.themeY.length] = Number.MAX_VALUE;
    });
  },
  updated() {
    // 对频繁的数据更新事件进行防抖
    this.refresh();
  },
};
</script>

<style scoped>
.icommon {
  font-family: "icomoon";
}
#detail {
  position: relative;
  height: 100vh;
}
.detail-scroll {
  position: relative;
  z-index: 99;
  background: #fff;
  height: calc(100% - 98px);
  overflow: hidden;
}
.icommon {
  position: absolute;
  z-index: 99;
}
</style>