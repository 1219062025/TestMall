<template>
  <div
    v-if="goods && Object.keys(goods).length !== 0"
    class="base-info"
  >
    <p class="title">{{goods.title}}</p>
    <div>
      <span class="new-price">{{goods.newPrice}}</span>
      <span class="old-price">{{goods.oldPrice}}</span>
      <span
        class="discount"
        :style="ownDiscount"
      >{{goods.discount}}</span>
    </div>
    <div class="columns">
      <span
        v-for="(item, index) in goods.columns"
        :key="index"
      >{{item}}</span>
    </div>
    <div class="services">
      <span
        v-for="(item, index) in goods.services"
        :key="index"
      ><img
          :src="item.icon"
          v-if="item.icon"
        >{{item.name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    // 如果商品信息没有打折描述，就不要描述的内边距了，不然会有一个单色的形状
    ownDiscount() {
      return this.goods.discount === "" ? { padding: 0 } : {};
    },
  },
};
</script>

<style scoped>
.base-info {
  padding: 10px 10px 0;
  border-bottom: 5px solid #f1f1f1;
}
.title {
  margin-bottom: 10px;
  font-size: 20px;
}
.new-price {
  margin-right: 5px;
  font-size: 22px;
  color: var(--color-high-text);
}
.old-price {
  margin-right: 5px;
  font-size: 14px;
  color: #7a7a7a;
  text-decoration: line-through;
}
.discount {
  padding: 0 5px;
  border-radius: 10px;
  background: var(--color-high-text);
  font-size: 14px;
  color: #fff;
}
.columns {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #c7c7c7;
  padding: 15px 0 5px 0;
  border-bottom: 1px solid #ebe9e9;
}
.services {
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  text-align: center;
}
.services img {
  width: 14px;
}
</style>