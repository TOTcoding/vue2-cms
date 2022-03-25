<template>
  <div class="pie-echart">
    <Hy-Echarts :options="options"></Hy-Echarts>
  </div>
</template>

<script>
import HyEcharts from "@/base-ui/echarts/echarts.js";
export default {
  name: "pie-echart",

  data() {
    return {}
  },
  props: {
    pieData: {
      type: Array,
      default() {
        return []
      }
    },
  },
  computed: {
    options() {
      return {
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "horizontal",
          left: "left",
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "50%",
            bottom: "-10%",
            data: this.pieData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
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
