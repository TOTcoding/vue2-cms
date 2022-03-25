<template>
  <div class="user">
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
        <el-button type="primary" @click="newBtnClick">新建用户</el-button>
      </div>
      <Hy-Table :listData="userList" :listCount="userCount"  :propList="propList" :showIndexColumn="true" :showSelectColumn="true"
                :paginationConfig="paginationConfig">
        <template #enable="scope">
          <el-button type="success" size="mini" plain>{{scope.row.enable ? '启用' : '禁用'}}</el-button>
        </template>
        <template #createAt="scope">
          {{ scope.row.createAt | formatUtc }}
        </template>
        <template #updateAt="scope">
          {{ scope.row.updateAt | formatUtc }}
        </template>
        <template #handler="scope">
          <el-button icon="el-icon-edit" size="mini" type="text" @click="editBtnClick(scope.row)">编辑</el-button>
          <el-button icon="el-icon-delete" size="mini" type="text" @click="deleteBtnClick(scope.row)">删除</el-button>
        </template>
      </Hy-Table>
      <Hy-Dialog :pageDialogConfig="dialogConfig" :defaultInfo="defaultInfo" @handleConfirmClick="handleConfirmClick" ref="userDialogRef"></Hy-Dialog>
    </div>
  </div>
</template>
<script>
import HyForm from "@/base-ui/form/form.js";
import HyTable from "@/base-ui/table/table.js";
import HyDialog from '@/base-ui/dialog/dialog.js'
import store from "@/store/index.js";
import localCache from '@/utils/cache.js';
import { formatUtcString } from '@/utils/dayFormet.js'
import { pageDialogConfig } from '@/router/pageconfig/user/page.dialog.config.js'


export default {
  name: "user",
  mounted() {
    this.getPageData();
    // this.changedialogOption();
  },
  data() {
    return {
      pageDialogConfig: pageDialogConfig,
      defaultInfo: '',
      formItems: [
        {
          field: "id",
          label: "id",
          plcaeholder: "请输入id",
          type: "input",
        },
        {
          field: "name",
          label: "用户名",
          plcaeholder: "请输入用户名",
          type: "input",
        },
        {
          field: "realname",
          label: "真实姓名",
          plcaeholder: "请输入真实姓名",
          type: "input",
        },
        {
          field: "phone",
          label: "电话号码",
          plcaeholder: "请输入电话号码",
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
        id: "",
        name: "",
        realname: "",
        cellphone: "",
        createAt: ""
      },
      propList: [
        { prop: "name", label: "用户名", minWidth: "100", slotname: "name" },
        { prop: "realname", label: "真实姓名", minWidth: "100", slotname: "realname" },
        { prop: "cellphone", label: "手机号码", minWidth: "100", slotname: "cellphone" },
        { prop: "enable", label: "状态", minWidth: "100", slotname: "enable" },
        { prop: "createAt", label: "创建时间", minWidth: "250", slotname: "createAt" },
        { prop: "updateAt", label: "更新时间", minWidth: "250", slotname: "updateAt" },
        { label: "操作", minWidth: "120", slotname: 'handler'}
      ],
      //分页配置
      paginationConfig: {
        currentpage: 1,
        pagesizes: [5, 10, 15, 20],
        pagesize: 5
      },
    };
  },
  computed: {
    userList() {
      return store.state.moduleSystem.userList;
    },
    userCount() {
      return store.state.moduleSystem.userCount;
    },
    dialogConfig() {
      const roleOption = pageDialogConfig.formItems.find(item => {
        return item.field == 'roleId'
      })
      roleOption.option = store.state.entireRole.map(item => {
        return { label: item.name, value: item.id }
      })
      const departmentIdOption = pageDialogConfig.formItems.find(item => {
        return item.field == 'departmentId'
      })
      departmentIdOption.option = store.state.entireDepartment.map(item => {
        return { label: item.name, value: item.id }
      })
      return pageDialogConfig
    }
  },
  methods: {
    //网络请求
    getPageData(queryInfo={}) {
      this.$store.dispatch("moduleSystem/getPageListAction", {
        pageUrl: "/users/list",
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
    //搜索按钮
    handleSearchClick() {
      this.getPageData(this.formdata);
    },
    //新建用户按钮
    newBtnClick() {
      //打开对话框
      this.$refs.userDialogRef.pageDialogConfig.centerDialogVisible = true
      //把表单内容置为空
      Object.keys(this.$refs.userDialogRef.pageDialogConfig.formdata).forEach(key => {
        this.$refs.userDialogRef.pageDialogConfig.formdata[key] = ''
      })
      //查找为密码的输入框，设置为显示
      const passwordItem = this.$refs.userDialogRef.pageDialogConfig.formItems.find(item => {
        return item.field === 'password'
      });
      passwordItem.isHidden = false;
      this.defaultInfo = '新建'
    },
    //编辑按钮
    editBtnClick(rowItem) {
      console.log(rowItem);
      this.$refs.userDialogRef.pageDialogConfig.centerDialogVisible = true,
      this.$refs.userDialogRef.pageDialogConfig.formdata = {...rowItem};
      //查找为密码的输入框，设置为隐藏
      const passwordItem = this.$refs.userDialogRef.pageDialogConfig.formItems.find(item => {
        return item.field == 'password'
      });
      passwordItem.isHidden = true;
      this.defaultInfo = '编辑'
      // console.log(event.target);
    },
    //删除按钮
    deleteBtnClick(rowItem) {
      store.dispatch('moduleSystem/deletePageDataAction', {
        pageUrl: `/users/${rowItem.id}`,
      })
      this.getPageData()
    },
    //确定按钮
    handleConfirmClick() {
      if(this.defaultInfo == '新建') {
        const rowData = this.$refs.userDialogRef.pageDialogConfig.formdata;
        this.$store.dispatch('moduleSystem/createPageDataAction', {
          pageUrl: '/users',
          newData: {...rowData}
        })
        console.log(rowData);
      } else if (this.defaultInfo == '编辑') {
        const rowData = this.$refs.userDialogRef.pageDialogConfig.formdata;
        this.$store.dispatch('moduleSystem/editPageDataAction', {
          pageUrl: '/users',
          editData: {...rowData},
          id: rowData.id
        })
        console.log(rowData);
      }
    },
  },
  watch: {
    //监听页码信息发生变化，变化则根据新的配置发出请求
    paginationConfig: {
      handler() {
        this.getPageData(this.formdata)
      },
      deep: true
    }
  },
  filters: {
    formatUtc(value) {
      return formatUtcString(value);
    }
  },
  components: {
    HyForm,
    HyTable,
    HyDialog
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
