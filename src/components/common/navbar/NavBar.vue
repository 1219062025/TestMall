<template>
  <div
    class="nav-bar"
    :style="`background: ${backColor};`"
  >
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div
      class="center"
      :style="`color: ${centerColor}`"
    >
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    backColor: {
      type: String,
      default: "#ff8e97",
    },
    centerColor: {
      type: String,
      default: "#000",
    },
  },
};
</script>

<style scoped>
.nav-bar {
  position: sticky;
  top: 0;
  z-index: 99;
  display: flex;
  width: 100%;
  text-align: center;
  line-height: 49px;
}
.nav-bar .center {
  flex: 1;
}
.left,
.right {
  width: 60px;
}
</style>