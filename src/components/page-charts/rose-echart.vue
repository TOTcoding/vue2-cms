<template>
  <div class="rose-echart">
    <Hy-Echarts :options="options"></Hy-Echarts>
  </div>
</template>

<script>
import HyEcharts from "@/base-ui/echarts/echarts.js";

export default {
  name: "rose-echart",

  data() {
    return {};
  },
  props: {
    roseData: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    options() {
      return {
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: [10, 160],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 8,
            },
            data: this.roseData,
            label: {
              show: false,
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
