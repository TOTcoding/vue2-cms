<template>
  <div class="menu">
    <div class="content">
      <div class="content-header">
        <h3>角色列表</h3>
        <el-button type="primary">新建角色</el-button>
      </div>
      <Hy-Table :listData="menuList" :propList="propList" :paginationConfig="paginationConfig" :showDiaLog="showDiaLog">
        <template #handler>
          <el-button icon="el-icon-edit" size="mini" type="text">编辑</el-button>
          <el-button icon="el-icon-delete" size="mini" type="text">删除</el-button>
        </template>
      </Hy-Table>
    </div>
  </div>
</template>
<script>
import HyTable from "@/base-ui/table/table.js";
import store from "@/store/index.js";

export default {
  mounted() {
    this.getPageData();
  },
  data() {
    return {
      showDiaLog: false,
      propList: [
        { prop: "name", label: "菜单名称", minWidth: "150" },
        { prop: "type", label: "级别", minWidth: "80" },
        { prop: "url", label: "菜单url", minWidth: "120" },
        { prop: "icon", label: "菜单icon", minWidth: "120" },
        { prop: "sort", label: "排序", minWidth: "80" },
        { prop: "permission", label: "权限", minWidth: "150" },
        {
          prop: "createAt",
          label: "创建时间",
          minWidth: "220",
          slotName: "create",
        },
        {
          prop: "updateAt",
          label: "更新时间",
          minWidth: "220",
          slotName: "update",
        },
        { label: "操作", minWidth: "120", slotname: "handler" },
      ],
      //:paginationConfig，
      paginationConfig: {
        currentpage: 1,
        pagesizes: [5, 10, 15, 20],
        pagesize: 5,
      },
      //:showSelectColumn，是否展示多选，默认为false
      showSelectColumn: false,
      //:showIndexColumn，是否展示序号，默认为false
      showIndexColumn: false,
      //还需传:listData（网络请求拿到的数据）
      //还需穿:listCount (页面请求拿到的数据总数)
    };
  },
  computed: {
    menuList() {
      return store.state.moduleSystem.menuList;
    },
  },
  methods: {
    //网络请求
    getPageData(queryInfo = {}) {
      this.$store.dispatch("moduleSystem/getPageMenuAction", {
        pageUrl: "/menu/list",
        queryInfo: {
          //根据当前页码和页面展示数目决定偏移量
          offset:
            (this.paginationConfig.currentpage - 1) *
            this.paginationConfig.pagesize,
          size: this.paginationConfig.pagesize,
          ...queryInfo,
        },
      });
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
