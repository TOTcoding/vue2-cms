<template>
  <div class="overview">
    <Hy-Card title="关于">
      <div class="left-content">
        Vue2Admin 是基于 Vue2、Vuex、VueRouter、elementui、Echart5
        等后台系统解决方案。
      </div>
    </Hy-Card>
    <Hy-Card class="card" title="技术栈">
      <Hy-List :textArr="technical"></Hy-List>
      <cpntable title="生产环境依赖" :tableConfig="tableConfig"></cpntable>
    </Hy-Card>
  </div>
</template>
<script>
import HyCard from "@/base-ui/card/card";
import HyTable from "@/base-ui/table/table.js";
import HyList from "@/base-ui/list/list.js";
import cpntable from "./cpns/cpntable.vue"
import { technical } from "./config/technical.config";
export default {
  name: "overview",
  data() {
    return {
      technical: technical,
      tableConfig: [
        {leftname: 'vue', leftdesp: '^2.6.11', rightname: 'vue-router', rightdesp: '^3.2.0'},
        {leftname: 'vuex', leftdesp: '^3.4.0', rightname: 'axios', rightdesp: '^0.26.0'},
        {leftname: 'element-ui', leftdesp: '^2.15.6', rightname: 'Echart', rightdesp: '^5.3.1'},
        {leftname: 'dayjs', leftdesp: '^1.10.8', rightname: 'core-js', rightdesp: '^3.6.5'},
      ]
    };
  },
  components: {
    HyCard,
    HyTable,
    HyList,
    cpntable
  },
};
</script>
<style scoped>
.left-content {
  float: left;
  margin-bottom: 20px;
}
.card {
  margin: 20px;
}

</style>
