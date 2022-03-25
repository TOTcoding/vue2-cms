<template>
  <div class="nav-menu">
    <div class="menu-title">
      <img class="img" src="@/assets/logo.png" alt="" />
      <span v-if="!isCollapse" class="title">后台管理系统</span>
    </div>
    <el-menu
      class="el-menu el-menu-vertical-demo"
      background-color="#0a2132"
      text-color="white"
      :collapse="isCollapse"
      :default-active="this.$store.state.pathId"
    >
      <!-- 遍历一级菜单 -->
      <el-submenu
        v-for="subitem in userMenus"
        :key="subitem.sort"
        :index="subitem.id + ''"
      >
        <template slot="title">
          <i :class="subitem.icon"></i>
          <span slot="title">{{ subitem.name }}</span>
        </template>
        <!-- 遍历二级菜单 -->
        <el-menu-item
          class="el-menu-item"
          v-for="(item, index) in subitem.children"
          :key="index"
          @click="handleMenuItemClick(item)"
          :index="item.id + ''"
        >
          {{ item.name }}
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
import { pathMapToMenu } from "@/utils/map-menus.js";

export default {
  name: "nav-menu",

  data() {
    return {
      userMenus: this.$store.state.userMenus ?? "",
    };
  },
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
  computed: {

  },
  methods: {
    //二级导航按钮
    handleMenuItemClick(item) {
      this.$router.push({
        path: item.url,
      });
      const menu = pathMapToMenu(this.userMenus, this.$store.state.toPath);
      this.id = menu.id + '';
      // console.log(menu.id);
    },
  },
};
</script>
<style scoped>
.nav-menu {
  width: 100%;
  height: 100%;
  background-color: #0a2132;
}
.menu-title {
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: white;
  transform: 0.5s;
}
.img {
  width: 30px;
  height: 30px;
  margin-top: 10px;
}
.title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.el-menu {
  border-right: none;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 210px;
  min-height: 400px;
}
.el-menu-item.is-active {
  background-color: #409eff !important;
  color: white !important;
}
</style>
