<template>
  <div
    id="cart-check"
    :class="{active: goodsCheck}"
  ></div>
</template>

<script>
export default {
  name: "CartCheck",
  props: {
    goodsCheck: {
      type: Boolean,
      default() {
        return true;
      },
    },
  },
};
</script>

<style scoped>
#cart-check {
  width: 20px;
  height: 20px;
  border: 1px solid #000;
  border-radius: 50%;
}
.active {
  background: var(--color-high-text);
}
</style>