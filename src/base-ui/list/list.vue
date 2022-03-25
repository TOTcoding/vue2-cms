<template>
  <div class="hy-list">
    <div class="item" v-for="item in textArr" :key="item.title">
      <span class="title">{{ item.title }} : </span>
      <el-link class="link-size" type="primary">{{ item.desp }}</el-link>
    </div>
  </div>
</template>

<script>

export default {
  name: "hy-list",

  data() {
    return {

    }
  },
  props: {
    textArr: Array,
    default: () => []
  }
}
</script>
<style scoped>
.hy-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 15px;
}
.item {
  display: flex;
  justify-content: center;
  margin-left: 10px;
  margin-bottom: 5px;
}
.title {
  position: relative;
  display: inline-block;
  margin-right: 20px;
  font-weight: 100;
}
.title::before {
  content: '';
  position: absolute;
  width: 8px;
  height: 8px;
  left: -15px;
  top: 7px;
  border-radius: 40%;
  background-color: black;
}
.link-size {
  font-size: 15px;
}
</style>