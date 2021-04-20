<template>
  <div
    v-if="detailInfo && Object.keys(detailInfo).length !== 0"
    id="detail-goods-info"
  >
    <div class="goods-info">
      <div class="start"></div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div
      class="info-list"
      v-for="(item, index) in detailInfo.detailImage[0].list"
      :key="index"
    >
      <img
        :src="item"
        @load="imgLoad"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  data() {
    return {};
  },
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    imgLoad() {
      // 每次图片加载完，发送一次事件到父组件中提醒该刷新BScroll了
      this.$emit("imgLoad");
    },
  },
};
</script>

<style scoped>
#detail-goods-info {
  width: 100%;
  margin-top: 20px;
  padding-bottom: 20px;
  padding: 0 10px;
  border-bottom: 5px solid #f2f5f8;
}
.goods-info {
  padding: 0 15px;
}

.goods-info .start,
.goods-info .end {
  position: relative;
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
}

.goods-info .start {
  float: left;
}

.goods-info .end {
  float: right;
}

.goods-info .start::before,
.goods-info .end::after {
  content: "";
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: #333;
  bottom: 0;
}

.goods-info .end::after {
  right: 0;
}
.goods-info .desc {
  padding: 15px 0;
  font-size: 14px;
}
.info-key {
  margin: 20px 10px;
  font-weight: bold;
}
.info-list img {
  width: 100%;
}
</style>