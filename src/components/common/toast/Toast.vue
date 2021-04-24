<template>
  <div
    id="toast"
    v-show="isShow"
  >
    {{message}}
  </div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      message: "请传入消息",
      isShow: false,
      timer: 0,
    };
  },
  methods: {
    show(message, delay = 1000) {
      this.message = message;
      this.isShow = true;
      setTimeout(() => {
        this.isShow = false;
        this.message = "";
      }, delay);
    },
  },
};
</script>

<style scoped>
#toast {
  position: fixed;
  z-index: 999;
  top: 50%;
  left: 50%;
  padding: 8px 15px;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  text-align: center;
  color: #fff;
  font-size: 20px;
  background: rgba(0, 0, 0, 0.6);
}
</style>