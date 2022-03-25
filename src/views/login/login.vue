<template>
  <div class="login">
    <login-panel />
  </div>
</template>

<script>
import LoginPanel from "@/views/login/cpns/login-panel";

export default {
  name: "login",
  data() {
    return {};
  },
  components: {
      LoginPanel
  },
};
</script>
<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
