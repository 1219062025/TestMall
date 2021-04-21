import BackTop from "components/content/backtop/BackTop";

export const backTopMixin = {
  data() {
    return {
      // 返回顶部按钮是否显示
      isShowBackTop: false,
    }
  },
  components: {
    BackTop
  },
  methods: {
    // 返回顶部
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
  }
}