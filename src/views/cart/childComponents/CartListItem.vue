<template>
  <div id="cart-list-item">
    <div
      class="current"
      :class="{active: isActive}"
      @click="cutActive"
    ></div>
    <img :src="goods.image">
    <div class="goods-info">
      <p class="title">{{goods.title}}</p>
      <p class="desc">{{goods.desc}}</p>
      <div clas="">
        <span class="price">￥{{price}}</span>
        <span class="count">×{{goods.count}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartListItem",
  data() {
    return {
      isActive: false,
      price: 0,
    };
  },
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    cutActive() {
      this.isActive = !this.isActive;
    },
  },
  created() {
    this.price = (this.goods.price * this.goods.count).toFixed(2);
  },
  mounted() {
    // console.log(this.goods);
  },
};
</script>

<style scoped>
#cart-list-item {
  display: flex;
  width: 100%;
  height: 150px;
  padding: 5px;
  border-bottom: 1px solid #c7c7c7;
  align-items: center;
}
#cart-list-item img {
  margin: 0 5px;
  width: 90px;
  border-radius: 10px;
}
#cart-list-item > * {
  float: left;
}
.current {
  width: 20px;
  height: 20px;
  border: 1px solid #000;
  border-radius: 50%;
}
.goods-info {
  display: flex;
  width: calc(100% - 120px);
  height: calc(100% - 10px);
  padding: 0 10px;
  overflow: hidden;
  flex-direction: column;
}
.goods-info > * {
  flex: 1;
}
.goods-info > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title,
.desc {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.title {
  font-size: 20px;
  font-weight: bold;
}
.desc {
  font-size: 14px;
}
.price {
  font-size: 20px;
  color: #ff5500;
}
.active {
  background: var(--color-high-text);
}
</style>