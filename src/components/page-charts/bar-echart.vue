<template>
  <div class="bar-echart">
    <Hy-Echarts :options="options"></Hy-Echarts>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import HyEcharts from "@/base-ui/echarts/echarts.js";

export default {
  name: "bar-echart",

  data() {
    return {};
  },
  props: {
    labels: {
      type: Array,
      default: () => []
    },
    values: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    options() {
      return {
        title: {
          text: "支持鼠标滚动缩放",
        },
        grid: {
          bottom: "5%",
        },
        xAxis: {
          data: this.labels,
          axisLabel: {
            inside: true,
            color: "#fff",
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          z: 10,
        },
        yAxis: {
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: "#999",
          },
        },
        dataZoom: [
          {
            type: "inside",
          },
        ],
        series: [
          {
            type: "bar",
            showBackground: true,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#83bff6" },
                { offset: 0.5, color: "#188df0" },
                { offset: 1, color: "#188df0" },
              ]),
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#2378f7" },
                  { offset: 0.7, color: "#2378f7" },
                  { offset: 1, color: "#83bff6" },
                ]),
              },
            },
            data: this.values,
          },
        ],
      };
    },
  },
  components: {
    HyEcharts,
  },
};
</script>
<style scoped></style>
