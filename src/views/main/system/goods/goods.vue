<template>
  <div class="goods">
    <div class="content">
      <Hy-Table :propList="propList" :listData="goodsList" :listCount="goodsCount" :paginationConfig="paginationConfig"
                :showSelectColumn="true" :showIndexColumn="true">
        <template #oldPrice="scope">
          {{ scope.row.oldPrice + '￥' }}
        </template>
        <template #newPrice="scope">
          {{ scope.row.newPrice + '￥' }}
        </template>
        <template #imgUrl="scope">
          <el-image 
            style="width: 60px; height: 60px"
            :src="scope.row.imgUrl" 
            :preview-src-list="[scope.row.imgUrl]">
          </el-image>
        </template>
        <template #status="scope">
          <el-button type="success" size="mini" plain>
            {{scope.row.status ==1 ? '启用' : '禁用'}}
          </el-button>
        </template>
        <template #createAt="scope">
          {{ scope.row.createAt | formatUtc }}
        </template>
        <template #updateAt="scope">
          {{ scope.row.updateAt | formatUtc }}
        </template>
        <template #handler>
          <el-button type="text" icon="el-icon-edit" size="mini">编辑</el-button>
          <el-button type="text" icon="el-icon-delete" size="mini">删除</el-button>
        </template>
      </Hy-Table>
    </div>
  </div>
</template>
<script>
import HyTable from "@/base-ui/table/table.js";
import store from '@/store/index.js'
import { formatUtcString } from '@/utils/dayFormet.js'

export default {
  name: "goods",
  mounted() {
    this.getPageData();
  },
  data() {
    return {
      propList: [
        { prop: "name", label: "商品名称", minWidth: "100" },
        {
          prop: "oldPrice",
          label: "原价格",
          minWidth: "100",
          slotname: "oldPrice",
        },
        {
          prop: "newPrice",
          label: "新价格",
          minWidth: "100",
          slotname: "oldPrice",
        },
        {
          prop: "imgUrl",
          label: "商品图片",
          minWidth: "100",
          slotname: "imgUrl",
        },
        {
          prop: "status",
          label: "状态",
          minWidth: "100",
          slotname: "status",
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
      //:paginationConfig，
      paginationConfig: {
        currentpage: 1,
        pagesizes: [5, 10, 15, 20],
        pagesize: 5,
      },
    };
  },
  methods: {
    //网络请求
    getPageData(queryInfo = {}) {
      this.$store.dispatch("moduleSystem/goodsGetPageListAction", {
        pageUrl: "/goods/list",
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
  computed: {
    goodsList() {
      return store.state.moduleSystem.goodsList;
    },
    goodsCount() {
      return store.state.moduleSystem.goodsCount;
    },
  },
  filters: {
    formatUtc(value) {
      return formatUtcString(value)
    }
  },
  watch: {
    paginationConfig: {
      handler() {
        this.getPageData()
      },
      deep: true
    }
  },
  components: {
    HyTable,
  },
};
</script>
<style scoped>
.content {
  padding: 20px;
}
</style>
