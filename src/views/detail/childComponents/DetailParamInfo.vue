<template>
  <div id="detail-param-info">
    <div
      class="tables"
      v-for="(table, index) in rule"
      :key="index"
    >
      <table class="rule">
        <tbody>
          <tr
            v-for="(ruleInfo, indey) in table"
            :key="indey"
          >
            <td
              class="rule-value"
              v-for="(item, indez) in ruleInfo"
              :class="{key: indez === 0}"
              :key="indez"
            >{{item}}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <table class="info">
      <tbody>
        <tr
          v-for="(info, index) in info"
          :key="index"
        >
          <td class="key">{{info.key}}</td>
          <td class="value">{{info.value}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "DetailParamInfo",
  data() {
    return {
      info: {},
      rule: {},
    };
  },
  props: {
    itemParams: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  watch: {
    itemParams() {
      this.rule = this.itemParams.rule.tables;
      this.info = this.itemParams.info.set;
    },
  },
};
</script>

<style scoped>
#detail-param-info {
  margin: 0 10px;
}
.rule,
.info {
  width: 100%;
  padding: 15px 0 0 20px;
  border-spacing: 0 15px;
  border-bottom: 3px solid #c7c7c7;
  font-size: 14px;
}
.rule td,
.info td {
  padding-bottom: 10px;
  border-bottom: 1px solid #dddddd;
}
.rule tr:last-child td,
.info tr:last-child td {
  border-bottom: none;
}
.info .value {
  padding-left: 20px;
  color: var(--color-high-text);
}
.rule-value {
  text-align: center;
}
.key {
  text-align: left;
  white-space: nowrap;
}
</style>