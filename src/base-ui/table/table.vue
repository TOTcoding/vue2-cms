<template>
  <div class="hy-table">
    <el-table :data="listData" border style="100%" row-key="id">
      <el-table-column v-if="showSelectColumn" type="selection" width="80" align="center"></el-table-column>
      <el-table-column v-if="showIndexColumn" type="index" label="序号" width="80" align="center"></el-table-column>
      <el-table-column v-for="propItem in propList" :key="propItem.prop" v-bind="propItem" align="center" show-overflow-tooltip>
        <template #default="scope">
          <slot :name="propItem.slotname" :row="scope.row">
            {{scope.row[propItem.prop]}}
          </slot>
        </template>
      </el-table-column>
    </el-table>
    <div class="footer">
      <slot name="footer">
        <el-pagination
          v-if="showDiaLog"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="paginationConfig.currentPage"
          :page-sizes="paginationConfig.pagesizes"
          :page-size="paginationConfig.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount">
        </el-pagination> 
      </slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "hy-table",
  data() {
    return {
      
    };
  },
  mounted() {

  },
  props: {
    listData: {
      type: Array,
      default: () => {},
    },
    listCount: {
      type: Number,
      default: () => 100
    },
    propList: {
      type: Array,
      default: () => {},
    },
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    showDiaLog: {
      type: Boolean,
      default: true
    },
    paginationConfig: {
      type: Object,
      default() {
        return {
          currentpage: 1,
          pagesizes: [10, 20, 30, 40],
          pagesize: 10,
          total: 100
        }
      }
    }
  },
  methods: {
    tableClick(event) {
      console.log(event);
    },
    handleCurrentChange(currentPage) {
      this.paginationConfig.currentpage = currentPage;
    },
    handleSizeChange(size) {
      this.paginationConfig.pagesize = size;
    }
  },
};
</script>
<style scoped>
.footer {
  margin-top: 20px;
}
</style>
