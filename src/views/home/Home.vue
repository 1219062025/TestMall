<template>
  <div id="home">
    <nav-bar centerColor="#fff">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banner="banner"></home-swiper>
    <recommend-view></recommend-view>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "views/home/childComponents/HomeSwiper";
import RecommendView from "views/home/childComponents/RecommendView";
import { getHomeMultidata } from "network/home.js";

export default {
  name: "Home",
  data() {
    return {
      banner: [],
      dKeyword: [],
      keywords: [],
      recommend: [],
    };
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
  },
  methods: {},
  created() {
    getHomeMultidata().then((res) => {
      this.banner = res.data.data.banner.list;
      this.dKeyword = res.data.data.dKeyword.list;
      this.keywords = res.data.data.keywords.list;
      this.recommend = res.data.data.recommend.list;
    });
  },
};
</script>

<style scoped>
</style>