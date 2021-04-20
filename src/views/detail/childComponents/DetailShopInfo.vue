<template>
  <div
    v-if="shop && Object.keys(shop).length !== 0"
    class="shop"
  >
    <div class="logo-name">
      <img
        :src="shop.logo"
        class="logo"
      >
      <span class="name">{{shop.name}}</span>
    </div>

    <div class="sell-score">
      <span class="shop-sell">
        <span>
          <p>{{cSells}}</p>
          <p>总销量</p>
        </span>
        <span>
          <p>{{shop.cGoods}}</p>
          <p>全部宝贝</p>
        </span>
      </span>
      <span class="center-wire"></span>
      <span class="shop-score">
        <div
          v-for="(item, index) in shop.score"
          :key="index"
        >
          <span>{{item.name}}</span>
          <span :style="scoreStyle(index)">{{item.score}}</span>
          <span :style="sortStyle(index)">{{item.isBetter ? "高" : "低"}}</span>
        </div>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    scoreStyle(index) {
      return this.shop.score[index].isBetter
        ? { color: "#e85642" }
        : { color: "green" };
    },
    sortStyle(index) {
      return this.shop.score[index].isBetter
        ? { color: "#fff", background: "#e85642" }
        : { color: "#fff", background: "green" };
    },
  },
  computed: {
    cSells() {
      return this.shop.cSells >= 10000
        ? this.shop.cSells.toExponential(2).slice(0, 3) + "万"
        : this.shop.cSells;
    },
  },
};
</script>

<style scoped>
.shop {
  position: relative;
  padding: 15px 10px 0 10px;
}
.logo-name {
  display: flex;
  align-items: center;
}
.logo {
  width: 50px;
  border-radius: 50%;
  margin-right: 10px;
}
.sell-score {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
}
.shop-sell {
  display: flex;
  text-align: center;
}
.shop-sell > span {
  padding: 0 10px;
}
.shop-sell p:first-child {
  padding-bottom: 6px;
  font-size: 18px;
  font-weight: bold;
}
.shop-score {
  display: flex;
  flex-direction: column;
}
.shop-score div {
  padding: 4px 0;
  display: flex;
  justify-content: space-between;
}
.shop-score div > span {
  margin: 0 10px;
}
.sort {
  color: #fff;
  background: green;
}
.center-wire {
  display: inline-block;
  height: 50px;
  border: 1px solid #c7c7c7;
}
</style>