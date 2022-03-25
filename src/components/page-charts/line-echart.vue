<template>
  <div class="line-echart">
    <Hy-Echarts :options="options"></Hy-Echarts>
  </div>
</template>

<script>
import HyEcharts from "@/base-ui/echarts/echarts.js";

export default {
  name: "line-echart",

  data() {
    return {};
  },
  props: {
    labels: {
      type: Array,
      default: () => [],
    },
    values: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    options() {
      return {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {},
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: this.labels,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "分类销量统计",
            type: "line",
            stack: "总量",
            areaStyle: {},
            emphasis: {
              focus: "series",
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
