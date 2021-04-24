<template>
  <div id="cate-gory">
    <nav-bar :centerColor="'#fff'">
      <template #center>
        <div>购物车({{cartLength}})</div>
      </template>
    </nav-bar>
    <cart-list :cart-list="cartList"></cart-list>
    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import CartList from "./childComponents/CartList";
import CartBottomBar from "./childComponents/CartBottomBar";

import { mapGetters } from "vuex";
export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar,
  },
  computed: {
    ...mapGetters(["cartLength", "cartList"]),
  },
};
</script>

<style scoped>
</style>