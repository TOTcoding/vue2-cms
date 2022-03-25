<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          class="el-avatar"
          src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
        ></el-avatar>
        <span>{{ name }}</span>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="handleExitClick">退出登录</el-dropdown-item>
        <el-dropdown-item divided>用户信息</el-dropdown-item>
        <el-dropdown-item>系统管理</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import localCache from '@/utils/cache.js'

export default {
  name: "user-info",

  data() {
    return {}
  },
  methods: {
    handleExitClick() {
      localCache.deleteCache('token');
      this.$router.push('/login');
    }
  },
  computed: {
    name() {
      return this.$store.state.userInfo.name;
    },
  },
};
</script>
<style scoped>
.user-info {
  display: flex;
  align-items: center;
}
.el-dropdown-link {
  display: flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
  color: black;
  width: 120px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
