<template>
  <div class="map-echart">
    <Hy-Echarts :options="options"></Hy-Echarts>
  </div>
</template>

<script>
import HyEcharts from "@/base-ui/echarts/echarts.js";
import { convertData } from '../page-charts/utils/convert-data'

export default {
  name: "map-echart",

  data() {
    return {};
  },
  props: {
    mapData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    options() {
      return {
        backgroundColor: "#fff",
        title: {
          text: "全国销量统计",
          left: "center",
          textStyle: {
            color: "#fff",
          },
        },
        tooltip: {
          trigger: "item",
          formatter: function (params) {
            return params.name + " : " + params.value[2];
          },
        },
        visualMap: {
          min: 0,
          max: 60000,
          left: 20,
          bottom: 20,
          calculable: true,
          text: ["高", "低"],
          inRange: {
            color: [
              "rgb(70, 240, 252)",
              "rgb(250, 220, 46)",
              "rgb(245, 38, 186)",
            ],
          },
          textStyle: {
            color: "#fff",
          },
        },
        geo: {
          map: "china",
          roam: "scale",
          emphasis: {
            areaColor: "#f4cccc",
            borderColor: "rgb(9, 54, 95)",
            itemStyle: {
              areaColor: "#f4cccc",
            },
          },
        },
        series: [
          {
            name: "销量",
            type: "scatter",
            coordinateSystem: "geo",
            data: convertData(this.mapData),
            symbolSize: 12,
            emphasis: {
              itemStyle: {
                borderColor: "#fff",
                borderWidth: 1,
              },
            },
          },
          {
            type: "map",
            map: "china",
            geoIndex: 0,
            aspectScale: 0.75,
            tooltip: {
              show: false,
            },
          },
        ],
      };
    },
  },
  components: {
    HyEcharts
  },
};
</script>
<style scoped>
</style>
