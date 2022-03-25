<template>
  <div class="dashboard">
    <!-- <Hy-Card title="分类商品数量(饼图)">
      <Hy-Echarts :options="options"></Hy-Echarts>
    </Hy-Card> -->
    <el-row :gutter="15">
      <el-col :span="7">
        <Hy-Card title="分类商品数量(饼图)">
          <Pie-Echart :pieData="categoryGoodsCount"></Pie-Echart>
        </Hy-Card>
      </el-col>
      <el-col :span="10">
        <Hy-Card title="不同城市商品销量">
          <Map-Echart :mapData="addressGoodsSale"></Map-Echart>
        </Hy-Card>
      </el-col>
      <el-col :span="7">
        <Hy-Card title="分类商品数量(玫瑰图)">
          <Rose-Echart :roseData="categoryGoodsCount"></Rose-Echart>
        </Hy-Card>
      </el-col>
    </el-row>

    <!-- 底部 -->
    <el-row class="bottom-row" :gutter="7">
      <el-col :span="12">
        <Hy-Card title="分类商品的销量">
          <Line-Echart v-bind="categoryGoodsSale"></Line-Echart>
        </Hy-Card>
      </el-col>
      <el-col :span="12">
        <Hy-Card title="分类商品的收藏">
          <Bar-Echart v-bind="categoryGoodsSale"></Bar-Echart>
        </Hy-Card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import HyEcharts from "@/base-ui/echarts/echarts.js";
import HyCard from "@/base-ui/card/card";
import store from "@/store/index.js";
import PieEchart from "@/components/page-charts/pie-echart";
import MapEchart from "@/components/page-charts/map-echart";
import RoseEchart from "@/components/page-charts/rose-echart";
import LineEchart from '@/components/page-charts/line-echart';
import BarEchart from '@/components/page-charts/bar-echart'
export default {
  name: "dashboard",

  beforeCreate() {
    store.dispatch("moduleAnalysis/getAnalysisDataAction");
  },
  data() {
    return {};
  },
  computed: {
    topPanelData() {
      return store.state.moduleAnalysis.topPanelDatas;
    },
    categoryGoodsCount() {
      return store.state.moduleAnalysis.categoryGoodsCount.map((item) => {
        return { value: item.goodsCount, name: item.name };
      });
    },
    addressGoodsSale() {
      return store.state.moduleAnalysis.goodsAddressSale.map((item) => {
        return { name: item.address, value: item.count };
      });
    },
    categoryGoodsSale() {
      const goodsSale = store.state.moduleAnalysis.categoryGoodsSale;
      const labels= [];
      const values = [];
      for (const item of goodsSale) {
        labels.push(item.name);
        values.push(item.goodsCount);
      }
      return { labels, values };
    },
  },
  watch: {

  },
  components: {
    HyEcharts,
    HyCard,
    PieEchart,
    MapEchart,
    RoseEchart,
    LineEchart,
    BarEchart
  },
};
</script>
<style scoped>
.bottom-row {
  margin-top: 20px;
}
</style>
