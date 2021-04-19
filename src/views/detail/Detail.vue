<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <scroll
      class="detail-scroll"
      ref="dscroll"
    >
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
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
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
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
      // 轮播图
      this.topImages = data.itemInfo.topImages;
    });
  },
  updated() {
    setTimeout(() => {
      this.$refs.dscroll.refresh();
    }, 400);
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