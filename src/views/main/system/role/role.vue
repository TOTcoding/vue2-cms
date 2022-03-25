<template>
  <div class="role">
    <div class="search">
      <Hy-Form :formItems="formItems" :formdata="formdata">
        <template #header>
          <h3 class="title">高级检索</h3>
        </template>
        <template #footer>
          <div class="handle-btns">
            <el-button icon="el-icon-refresh" @click="handleResetClick">重置</el-button>
            <el-button icon="el-icon-search" type="primary" @click="handleSearchClick">搜索</el-button> 
          </div>
        </template>
      </Hy-Form>
    </div>
    <div class="content">
      <div class="content-header">
        <h3>用户列表</h3>
        <el-button type="primary">新建用户</el-button>
      </div>
    <Hy-Table :listData="roleList" :listCount="roleCount" :propList="propList" :showIndexColumn="true" :showSelectColumn="true"
              :paginationConfig="paginationConfig">
      <template #createAt="scope">
        {{scope.row.createAt | formatUtc }}
      </template>
      <template #updateAt="scope">
        {{scope.row.updateAt | formatUtc }}
      </template>
      <template #handler>
          <el-button icon="el-icon-edit" size="mini" type="text">编辑</el-button>
          <el-button icon="el-icon-delete" size="mini" type="text">删除</el-button>
      </template>
    </Hy-Table>
    </div>
  </div>
</template>

<script>
import HyForm from '@/base-ui/form/form.js'
import HyTable from "@/base-ui/table/table.js";
import store from "@/store/index.js";
import { formatUtcString } from '@/utils/dayFormet.js' 

export default {
  name: "role",
  mounted() {
    this.getPageData();
  },
  data() {
    return {
      formItems: [
        {
          field: "name",
          label: "角色名称",
          plcaeholder: "请输入角色名称",
          type: "input",
        },
        {
          field: "intro",
          label: "权限介绍",
          plcaeholder: "请输入权限介绍",
          type: "input",
        },
        {
          field: "createAt",
          label: "创建的时间",
          plcaeholder: "请选择创建的时间范围",
          type: "datepicker",
          otherOptions: {
            type: 'daterrange'
          }
        },
      ],
      formdata: {
        name: "",
        intro: "",
        createAt: "",
      },
      propList: [
        { prop: "name", label: "角色名", minWidth: "100" },
        {
          prop: "intro",
          label: "权限介绍",
          minWidth: "100",
        },
        {
          prop: "createAt",
          label: "创建时间",
          minWidth: "250",
          slotname: "createAt",
        },
        {
          prop: "updateAt",
          label: "更新时间",
          minWidth: "250",
          slotname: "updateAt",
        },
        { label: "操作", minWidth: "120", slotname: "handler" },
      ],
      paginationConfig: {
        currentpage: 1,
        pagesizes: [5, 10, 15, 20],
        pagesize: 5
      }
    };
  },
  methods: {
    //网络请求
    getPageData(queryInfo={}) {
      this.$store.dispatch("moduleSystem/roleGetPageListAction", {
      pageUrl: "/role/list",
        queryInfo: {
          //根据当前页码和页面展示数目决定偏移量
          offset: (this.paginationConfig.currentpage-1) * this.paginationConfig.pagesize,
          size: this.paginationConfig.pagesize,
          ...queryInfo
        },
    });
    },
    //事件监听
    handleResetClick() {
      for(let item in this.formdata) {
        this.formdata[item] = ""
      }
    },
    handleSearchClick() {
      this.getPageData(this.formdata)
    }
  },
  computed: {
    roleList() {
      return store.state.moduleSystem.roleList;
    },
    roleCount() {
      return store.state.moduleSystem.roleCount;
    }
  },
  watch: {
    pageConfig: {
      handler() {
        this.getPageData(this.formdata)
      },
      deep: true
    }
  },
  filters: {
    formatUtc(value) {
      return formatUtcString(value)
    }
  },
  components: {
    HyTable,
    HyForm
  },
};
</script>
<style scoped>
.title {
  text-align: center;
  color: red;
}
.handle-btns {
  text-align: right;
  padding: 0 50px 20px;
}
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
