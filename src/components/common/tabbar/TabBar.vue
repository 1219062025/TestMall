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
  position: sticky;
  bottom: 0;
  width: 100%;
  display: flex;
}
</style>