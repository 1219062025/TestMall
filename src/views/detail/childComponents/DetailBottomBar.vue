<template>
  <div id="bottom-bar">
    <div class="tab">
      <span>
        <p></p>
        <p>客服</p>
      </span>
      <span>
        <p></p>
        <p>店铺</p>
      </span>
      <span>
        <p></p>
        <p>收藏</p>
      </span>
    </div>
    <div class="shopping">
      <span
        class="add-shop"
        @click="$emit('addToCart')"
      >加入购物车</span>
      <span class="buy">购买</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
};
</script>

<style scoped>
#bottom-bar {
  position: fixed;
  bottom: 0;
  background: #fff;
  z-index: 99;
  width: 100%;
  display: flex;
}
#bottom-bar div {
  flex: 1;
}
.tab span {
  font-family: "icomoon";
}
.tab,
.shopping {
  display: flex;
  text-align: center;
  font-size: 18px;
}
.tab > span,
.shopping > span {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  height: 49px;
}
.add-shop {
  background: #ffdd12;
}
.buy {
  background: var(--color-high-text);
  color: #fff;
}
</style>