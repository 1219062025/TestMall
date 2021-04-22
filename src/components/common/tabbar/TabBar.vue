<template>
  <div class="wrap">
    <slot></slot>
  </div>
</template>


<script>
export default {
  name: "TabBar",
};
</script>

<style scoped>
.wrap {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  background: linear-gradient(to top, #fff, #ece5e5);
}
</style>