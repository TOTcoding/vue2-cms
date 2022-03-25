<template>
  <div class="cpn-table">
    <span class="title">{{title}}</span>
    <table class="table" border="1">
      <tr v-for="(item, index) in tableConfig" :key="index">
        <td class="left">{{ item.leftname }}</td>
        <td><el-tag>{{ item.leftdesp }}</el-tag></td>
        <td class="left">{{ item.rightname }}</td>
        <td><el-tag>{{ item.rightdesp }}</el-tag></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "cpn-table",

  data() {
    return {}
  },
  props: {
    tableConfig: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: () => ''
    }
  }
};
</script>
<style scoped>
.title {
  float: left;
  padding: 20px 0;
  font-weight: 700;
}
table {
  width: 100%;
  text-align: left;
  border-collapse: collapse;
}
table tr td {
  text-indent: 10px;
  border: 1px solid #ebeef5;
}
table /deep/ .el-tag {
  padding: 0 10px 0 0;
}
.left {
  background-color: #fafafa;
  color: #909399;
  font-weight: 700;
}
</style>
