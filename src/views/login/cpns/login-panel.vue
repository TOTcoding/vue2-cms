<template>
  <div class="login-panel">
    <h1>后台管理系统</h1>
    <el-tabs type="border-card" class="el-tabs" :stretch="true" v-model="currentTab">
      <el-tab-pane class="el-tab-pane" name="account">
        <span slot="label" class="label"><i class="el-icon-user-solid"></i> 账号登录</span>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane class="el-tab-pane" name="phone">
        <span slot="label" class="label"><i class="el-icon-mobile-phone"></i> 手机登录</span>
        <login-phone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>
    <el-button class="login-btn" type="primary" @click="handleLogin">立即登录</el-button>
  </div>
</template>

<script>
import LoginAccount from "@/views/login/cpns/login-account";
import LoginPhone from "@/views/login/cpns/login-phone";

export default {
  name: "login-panel",

  data() {
    return {
      currentTab: 'account'
    };
  },
  methods: {
    handleLogin() {
      if(this.currentTab == "account") {
        this.$refs.accountRef.loginAccount()
      }
      else if (this.currentTab == "phone") {
        this.$refs.phoneRef.loginAccount()
      }
    }
  },
  components: {
    LoginAccount,
    LoginPhone
  },
};
</script>
<style scoped>
.login-panel {
  height: 300px;
  width: 320px;
  text-align: center;
}
h1 {
  text-align: center;
  margin-bottom: 15px;
}
.login-btn {
  width: 100%;
  margin-top: 10px;
}
</style>
