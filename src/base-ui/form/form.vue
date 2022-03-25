<template>
  <div class="hy-form">
    <slot name="header"></slot>
    <el-form label-width="100px">
      <el-row>
        <el-col v-for="item in formItems" :key="item.label" v-bind="collLayout">
          <el-form-item v-if="!item.isHidden" style="width: 80%" :label="item.label" class="form-item">
            <template v-if="item.type == 'input' || item.type == 'password'">
              <el-input :placeholder="item.plcaeholder" :type="item.type" :show-password="item.password" v-model="formdata[`${item.field}`]" />
            </template>
            <template v-if="item.type == 'select'">
              <el-select style="width: 100%" :placeholder="item.placeholder" v-model="formdata[`${item.field}`]">
                <el-option v-for="options in item.option" :key="options.value" :value="options.value">
                  {{ options.label }}
                </el-option>
              </el-select>
            </template>
            <template v-else-if="item.type == 'datepicker'" >
              <el-date-picker style="width: 100%" type="datetimerange"
                start-placeholder="开始时间" end-placeholder="结束时间" 
                v-bind="item.otherOptions" v-model="formdata[`${item.field}`]">
              </el-date-picker>
            </template>
          </el-form-item> 
        </el-col>
      </el-row>
    </el-form>
    <slot name="footer"></slot>
  </div>
</template>
<script>
export default {
  name: "hy-form",

  data() {
    return {};
  },
  props: {
    formItems: {
      type: Array,
      default: () => {},
    },
    formdata: {
      type: Object,
      default: () => {}
    },
    collLayout: {
      type: Object,
      default: () => ({
        xl: 8,
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  },
};
</script>
<style scoped>
.hy-form {
  padding-top: 20px;
}
.form-item {
  padding: 10px 20px;
}
</style>
