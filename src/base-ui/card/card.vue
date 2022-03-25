<template>
  <div class="hy-card">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>{{ title }}</span>
        </div>
      </template>
      <div class="item">
        <slot></slot>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "hy-card",

  data() {
    return {}
  },
  props: {
    title: {
      type: String,
      default: 'Title'
    }
  }
};
</script>
<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
}
.item {
  margin-bottom: 10px;
  text-align: center;
  /* border: 1px solid red; */
}
</style>
