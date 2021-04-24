<template>
  <div id="cart-list-item">
    <cart-check
      :goods-check="goods.checked"
      @click.native="isChecked"
    ></cart-check>
    <img :src="goods.image">
    <div class="goods-info">
      <p class="title">{{goods.title}}</p>
      <p class="desc">{{goods.desc}}</p>
      <div clas="">
        <span class="price">￥{{goods.price}}</span>
        <span>×{{goods.count}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import CartCheck from "./CartCheck";
export default {
  name: "CartListItem",
  components: {
    CartCheck,
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
    isChecked() {
      this.goods.checked = !this.goods.checked;
    },
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
</style>