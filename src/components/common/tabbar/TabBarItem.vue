<template>
  <span
    class="item-wrap"
    @click="to()"
  >
    <div :style="active">
      <slot name="icon"></slot>
    </div>
    <div :style="active">
      <slot name="text"></slot>
    </div>
  </span>
</template>

<script>
export default {
  name: "TabBarItem",
  data() {
    return {};
  },
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "red",
    },
  },
  methods: {
    to() {
      this.$route.path !== this.path && this.$router.replace(this.path);
    },
  },
  computed: {
    active() {
      return this.$route.path.indexOf(this.path) === 0
        ? { color: this.activeColor }
        : {};
    },
  },
};
</script>

<style scoped>
.item-wrap {
  height: 49px;
  flex: 1;
  text-align: center;
}
.active {
  color: red;
}
</style>