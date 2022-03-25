<template>
  <div class="department">
    <div class="content">
      <div class="content-header">
        <h3>部门列表</h3>
        <el-button type="primary">新建数据</el-button>
      </div>
      <Hy-Table :listData="departmentList" :propList="propList"></Hy-Table>
    </div>
  </div>
</template>
<script>
import HyTable from "@/base-ui/table/table.js";
import store from "@/store/index.js";
export default {
  name: "department",
  created() {
    store.dispatch("moduleSystem/getPagedepartmentAction", {
      pageUrl: "/department/list",
    })
  },
  data() {
    return {
      propList: [
        { prop: "name", label: "部门名称", minWidth: "120" },
        { prop: "leader", label: "部门领导", minWidth: "120" },
        { prop: "parentId", label: "上级部门", minWidth: "120" },
        {
          prop: "createAt",
          label: "创建时间",
          minWidth: "250",
          slotname: "create",
        },
        {
          prop: "updateAt",
          label: "更新时间",
          minWidth: "250",
          slotname: "update",
        },
        { label: "操作", minWidth: "120", slotname: "handler" },
      ],
    };
  },
  computed: {
    departmentList() {
      return store.state.moduleSystem.departmentList
    },
  },
  components: {
    HyTable,
  },
};
</script>
<style scoped>
.content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
}
</style>
