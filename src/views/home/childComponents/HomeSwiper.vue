<template>
  <div>
    <swiper>
      <swiper-item
        v-for="(item, index) in banner"
        :key="index"
      ><a :href="item.link">
          <img
            :src="item.image"
            @load="imgLoad"
          >
        </a></swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "HomeSwiper",
  data() {
    return {
      isLoad: false,
    };
  },
  props: {
    banner: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    imgLoad() {
      if (!this.isLoad) {
        this.$emit("swiperLoad");
        this.isLoad = true;
      }
    },
  },
  components: {
    Swiper,
    SwiperItem,
  },
};
</script>

<style scoped>
</style>