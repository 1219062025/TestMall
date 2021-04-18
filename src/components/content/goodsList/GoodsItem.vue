<template>
  <div
    id="goods-item"
    @click="toDetail"
  >
    <img
      :src="goodsitem.show.img"
      @load="$bus.$emit('imgLoad')"
    >
    <div class="goods-info">
      <p>{{goodsitem.title}}</p>
      <span class="price">￥{{goodsitem.price}}</span>
      <span class="cfav">☆{{goodsitem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsItem",
  props: {
    goodsitem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    toDetail() {
      this.$router.push(`/detail/${this.goodsitem.iid}`);
    },
  },
};
</script>

<style scoped>
#goods-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 48%;
  text-align: center;
}
#goods-item img {
  margin: 0 auto;
  width: 90%;
  border-radius: 10px;
}
#goods-item p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.goods-info {
  width: 80%;
  margin: 0 auto;
  text-align: center;
}
.goods-info .price {
  color: var(--color-high-text);
  margin-right: 10px;
}
</style>