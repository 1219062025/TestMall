<template>
  <div id="tabcontrol">
    <div
      class="tab-item"
      v-for="(item, index) in titles"
      :key=index
    >
      <span
        @click="change(index)"
        :class="{active: isActive===index}"
      >{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  data() {
    return {
      isActive: 0,
    };
  },
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
    goods: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    change(index) {
      this.isActive = index;
      this.$emit("tabClick", index);
    },
  },
};
</script>

<style scoped>
#tabcontrol {
  display: flex;
  background: #fff;
  text-align: center;
  font-size: 15px;
}
.tab-item {
  flex: 1;
}
.tab-item span {
  padding: 5px;
}
.active {
  color: var(--color-high-text);
  border-bottom: 3px solid var(--color-tint);
}
</style>