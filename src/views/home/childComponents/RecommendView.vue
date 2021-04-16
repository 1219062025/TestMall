<template>
  <div id="recommends">
    <div
      v-for="item in recommend"
      :key=item.link
    >
      <a :href="item.link"><img :src="item.image"></a>
      <div>{{item.title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommend: {
      type: Array,
      default: [],
    },
  },
};
</script>

<style scoped>
#recommends {
  display: flex;
  text-align: center;
  font-size: 12px;
  padding: 10px 0 15px 0;
  border-bottom: 8px solid #eee;
}
#recommends {
  flex: 1;
}
#recommends img {
  width: 80%;
}
</style>