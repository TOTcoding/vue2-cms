<template>
  <div class="login-account">
    <el-form :model="ruleForm" ref="formRef" :rules="rules">
      <el-form-item label="账号" prop="name" label-width="50px">
        <el-input
          type="text"
          v-model="ruleForm.name"
          autocomplete="off"
          placeholder="请输入账号:"
          maxlength="10"
          autofocus="autofocus"
        />
      </el-form-item>
      <el-form-item label="密码" prop="password" label-width="50px">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
          placeholder="请输入密码:"
          maxlength="11"
        />
      </el-form-item>
    </el-form>
      <div class="account-control">
        <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
        <el-link type="primary">忘记密码</el-link>
      </div>
  </div>
</template>
<script>

import localCache from '@/utils/cache.js'
import { mapActions } from 'vuex';

export default {
  name: "login-account",

  data() {
      return {
        ruleForm: {
          name: localCache.getCache('name') ?? '',
          password: localCache.getCache('password') ?? ''
        },
        rules: {
          name: [
            {required: true, message: "用户名不能为空", trigger: "change"},
            {pattern: /^[a-z0-9]{5,10}$/, message: "用户名必须是5-10个字母或数字", trigger: "change"}
          ],
          password: [
            {required: true, message: "密码不能为空", trigger: "change"},
            {pattern: /^[a-z0-9]{5,10}$/, message: "密码必须是5-10个字母或数字", trigger: "change"}
          ]
        },
        isKeepPassword: false
      }
  },
  methods: {
    ...mapActions(['accountLogin']),

    loginAccount() {
      console.log("验证");
      this.$refs.formRef.validate(vailed => {
        if(vailed) {
          if(this.isKeepPassword) {
            // localCache.setCache('username', this.ruleForm.username);
            // localCache.setCache('password', this.ruleForm.password);
          }
          this.$store.dispatch('accountLoginAction', {name:this.ruleForm.name, password: this.ruleForm.password, isKeepPassword: this.isKeepPassword})
        }

      })
    }
  }
};
</script>
<style scoped>
.account-control {
  display: flex;
  justify-content: space-between;
}
</style>
