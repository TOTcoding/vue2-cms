<template>
  <div class="loginphone">
    <el-form :model="phone" ref="phoneRef">
      <el-form-item
        label="手机号"
        prop="number"
        :rules="rules.number"
        label-width="80px"
      >
        <el-input
          type="text"
          v-model="phone.number"
          autocomplete="off"
          placeholder="请输入手机号:"
          maxlength="11"
        />
      </el-form-item>
      <el-form-item
        label="验证码"
        prop="code"
        :rules="rules.code"
        label-width="80px"
      >
        <div class="get-code">
          <el-input
            style="width:100px" 
            type="text"
            v-model="phone.code"
            autocomplete="off"
            maxlength="6"
          />
          <el-button type="primary" size="mini">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>

import { mapActions } from 'vuex'

export default {
  name: "login-phone",

  data() {
    return {
      phone: {
        number: "",
        code: "",
      },
      rules: {
        number: [
          {required: "true", message: "手机号不能为空", trigger: "change"},
          {pattern: /^1\d{10}$/, message: "手机号有误", trigger: "change"}
        ],
        code: [
          {required: "true", message: "验证码不能为空", trigger: "blur"}
        ]
      }
    }
  },
  methods: {
    ...mapActions(['phoneLogin']),

    loginAccount() {
      this.$refs.phoneRef.validate( vailed => {
        if(vailed) {
          console.log("符合规则");
          this.$store.dispatch('phoneLoginAction', {number: this.phone.number, code: this.phone.code})
        }
      })
    }
  }
};
</script>
<style scoped>
.get-code {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  
}
</style>
