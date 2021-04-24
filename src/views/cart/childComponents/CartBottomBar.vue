<template>
  <div id="cart-bottom-bar">
    <div>
      <cart-check
        :goods-check="isAllChecked"
        @click.native="cutAllCheck"
      ></cart-check>
      <span class="allChecked">全选</span>
      <span class="sum">合计:￥{{sumMoney.toFixed(2)}}</span>
    </div>
    <span
      class="payment"
      @click="toCompute"
    >去计算({{cartLength}})</span>
  </div>
</template>

<script>
import CartCheck from "./CartCheck";
import { mapGetters } from "vuex";
export default {
  name: "CartBottomBar",
  data() {
    return {
      isAllCheck: true,
    };
  },
  components: {
    CartCheck,
  },

  methods: {
    cutAllCheck() {
      this.isAllCheck = !this.isAllCheck;
      for (const item of this.cartList) {
        item.checked = this.isAllCheck;
      }
    },
    toCompute() {
      this.cartList.some((item) => item.checked === true)
        ? ""
        : this.$toast.show("请选择商品", 2000);
    },
  },
  computed: {
    ...mapGetters(["cartList", "cartLength"]),
    sumMoney() {
      let sum = 0;
      for (const item of this.cartList) {
        item.checked ? (sum += item.price * item.count) : "";
      }
      return sum;
    },
    isAllChecked() {
      for (const item of this.cartList) {
        if (!item.checked) return (this.isAllCheck = item.checked);
      }
    },
  },
};
</script>

<style scoped>
#cart-bottom-bar {
  display: flex;
  position: fixed;
  width: 100%;
  bottom: 49px;
  padding: 5px;
  justify-content: space-between;
  align-items: center;
}
#cart-bottom-bar > div {
  display: flex;
  align-items: center;
}
.payment {
  width: 120px;
  background: #ff5200;
  color: #fff;
  line-height: 39px;
  text-align: center;
}
.sum {
  margin-left: 15px;
}
.allChecked {
  margin-left: 5px;
}
</style>