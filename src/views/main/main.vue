<template>
  <div class="main">
    <el-container class="main-content">
      <!-- 根据isCollapse判断是否展开，并添加相应样式使整个侧栏el-aside收缩 -->
      <el-aside width="210px" :class="isCollapse?'collapse':'nocollapse'">
        <!-- 把isCollapse传递给子组件nav-menu,为el-manu添加:collapse属性（elemntui提供的收缩属性）使el-menu能够收缩 -->
        <nav-menu :isCollapse="isCollapse" />
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <nav-header @FoldChange="handleFoldChange" />
        </el-header>
        <el-main class="page-content">
          <div class="page-info">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapState } from 'vuex'

import NavMenu from "@/components/nav-menu/nav-menu";
import NavHeader from "@/components/nav-header/nav-header";
import {routes} from '@/router/index'


export default {
  name: "home",

  data() {
    return {
      isCollapse: false
    }
  },
  computed: {
    ...mapState(['hasRoutes'])
  },
  methods: {
    handleFoldChange(Fold) {
      this.isCollapse = Fold
    }
  },
  components: {
    NavMenu,
    NavHeader,
  },
};
</script>
<style scoped>
.main {
  width: 100%;
  height: 100%;
}
.main-content {
  width: 100%;
  height: 100%;
}
.page-header {
  display: flex;
  background-color: white;
  color: #333;
  align-items: center;
}
.page-content {
  text-align: center;
  background-color: #f5f5f5;
}
.page-info {
  background-color: white;
}
.collapse {
  width: 60px !important;
  transition: width 0.5s;
}
.nocollapse {
  width: 210px !important;
  transition: width 0.5s;
}
</style>
