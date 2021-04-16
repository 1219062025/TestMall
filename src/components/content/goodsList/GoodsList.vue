<template>
  <div id="goods-list">
    <goods-item
      v-for="item in list"
      :key="item.link"
      :goodsitem="item"
    ></goods-item>
  </div>
</template>

<script>
import GoodsItem from "components/content/goodsList/GoodsItem";

export default {
  name: "GoodsList",
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    GoodsItem,
  },
};
</script>

<style scoped>
#goods-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>