<template>
  <div class="nav-header">
    <i class="fold-menu" :class="isFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'" @click="handleFoldClick"></i>
      <div class="content">
      <div>面包屑</div>
      <user-info></user-info>
    </div>
  </div>
</template>
<script>

import UserInfo from './user-info.vue';

export default {
  name: "nav-header",

  data() {
    return {
      isFold: false,
    };
  },
  methods: {
    handleFoldClick() {
      this.isFold = !this.isFold;
      this.$emit("FoldChange", this.isFold);
    },
  },
  components: {
    UserInfo
  }
};
</script>
<style scoped>
.nav-header {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
.fold-menu {
  font-size: 30px;
  cursor: pointer;
}
.content {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}
</style>
