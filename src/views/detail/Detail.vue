<template>
  <div id="detail">
    <detail-nav-bar @scrollTab="scrollTab"></detail-nav-bar>
    <scroll
      :probeType="3"
      @scroll="scroll"
      class="detail-scroll"
      ref="dscroll"
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
// 方法函数
import { debounce } from "common/utils";

// 网络请求获取数据方法
import { getDetail, Goods, Shop } from "network/detail";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      // 轮播图数组
      topImages: [],
      // 商品信息对象
      goods: {},
      shop: {},
      detailInfo: {},
      itemParams: {},
      refresh() {},
      getThemeY() {},
      themeY: [0],
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
  },
  methods: {
    // 详情图片加载完，刷新BScorll
    imgLoad() {
      // 对频繁的图片加载事件进行防抖
      this.refresh();
      this.getThemeY();
    },
    scrollTab(index) {
      this.$refs.dscroll.scrollTo(0, -this.themeY[index], 500);
    },
    scroll(position) {
      for (let i = 0; i < this.themeY.length; i++) {
        if (Math.ceil(position.y) < -this.themeY[i]) {
          // this.$bus.$emit("tabChange", i);
        }
      }
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
      // 详情也信息
      this.detailInfo = data.detailInfo;
      // 商品参数信息
      this.itemParams = data.itemParams;
      // 轮播图
      this.topImages = data.itemInfo.topImages;
    });
  },
  mounted() {
    // 使用debounce对函数进行防抖封装
    this.refresh = debounce(this.$refs.dscroll.refresh);
    this.getThemeY = debounce(() => {
      this.themeY[1] = this.$refs.paramInfo.$el.offsetTop;
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
  height: calc(100% - 49px);
  overflow: hidden;
}
</style>