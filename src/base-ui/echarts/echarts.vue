<template>
  <div class="base-echarts">
    <div
      class="echarts"
      ref="echartDivRef"
      :style="{ width: width, height: height }"
    ></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { MapChart } from "echarts/charts";
import chinaJson from "../echarts/data/china.json";

echarts.use([MapChart]);
// 注册中国地图
echarts.registerMap("china", chinaJson);

export default {
  name: "hy-echarts",
  mounted() {
    const echartDivRef = this.$refs.echartDivRef;
    //初始化echart实例
    const echartInstance = echarts.init(echartDivRef);
    //设置option
    echartInstance.setOption(this.options);
    //监听window尺寸的变化
    window.addEventListener("resize", () => {
      //改变图表尺寸，容器大小变化时需要手动调用
      echartInstance.resize();
    });
  },
  data() {
    return {};
  },
  props: {
    options: {
      type: Object,
      default: () => {},
    },
    width: {
      type: String,
      default: () => "100%",
    },
    height: {
      type: String,
      default: () => "350px",
    },
  },
  watch: {
    //options数据异步请求，监听数据更新，根据新数据渲染视图
    options() {
      const echartDivRef = this.$refs.echartDivRef;
      const echartInstance = echarts.init(echartDivRef);
      echartInstance.setOption(this.options);
    },
  },
};
</script>
<style scoped></style>
