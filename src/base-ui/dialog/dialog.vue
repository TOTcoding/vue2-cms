<template>
  <div class="hy-dialog">
    <el-dialog
      title="提示"
      :visible.sync="pageDialogConfig.centerDialogVisible"
      width="30%"
      center
    >
      <Hy-Form
        :formItems="pageDialogConfig.formItems"
        :formdata="pageDialogConfig.formdata"
        :collLayout="{ span: 24 }"
      ></Hy-Form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="pageDialogConfig.centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirmClick"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import HyForm from "@/base-ui/form/form.js";

export default {
  name: "hy-dialog",

  data() {
    return {
     }
  },
  methods: {
    handleConfirmClick() {
      this.$emit('handleConfirmClick');
      this.pageDialogConfig.centerDialogVisible = false
    }
  },
  props: {
    pageDialogConfig: {
      type: Object,
      default: () => {}
    },
    defaultInfo: {
      type: String,
      default: ''
    }
  },
  components: {
    HyForm,
  },
};
</script>
<style scoped></style>
