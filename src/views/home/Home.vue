<template>
  <div id="home">
    <nav-bar centerColor="#fff">
      <div slot="center">购物街</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { getHomeMultidata } from "network/home.js";
export default {
  name: "Home",
  components: {
    NavBar,
  },
  created() {
    getHomeMultidata();
  },
};
</script>

<style scoped>
</style>