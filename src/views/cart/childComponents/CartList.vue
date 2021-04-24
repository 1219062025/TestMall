<template>
  <div id="cart-list">
    <scroll
      class="scroll"
      ref="scroll"
    >
      <cart-list-item
        v-for="(item, index) in cartList"
        :key="index"
        :goods="item"
      />
    </scroll>

  </div>
</template>

<script>
import CartListItem from "./CartListItem";
import Scroll from "components/common/scroll/Scroll";

export default {
  name: "CartList",
  props: {
    cartList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    CartListItem,
    Scroll,
  },
  activated() {
    this.$refs.scroll.refresh();
  },
};
</script>

<style scoped>
#cart-list {
  height: 100vh;
}
.scroll {
  height: calc(100% - 147px);
  overflow: hidden;
}
</style>