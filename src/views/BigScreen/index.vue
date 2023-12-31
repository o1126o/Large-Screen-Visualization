<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useInitParkInfo, useInitBarChart, useInitPieChart } from './composable'

// 大屏适配
import VScaleScreen from 'v-scale-screen'

// 导入loading组件
import LoadingComponent from '@/components/LoadingComponent.vue'
// 导入模型解析构造函数
import { Application } from '@splinetool/runtime'
// 初始化3d模型
const ref3d = ref()
const showLoading = ref(false)
const init3dModel = () => {
  // 开启loading
  showLoading.value = true
  // 实例化解析器实例
  let spline = new Application(ref3d.value)
  // 拉取模型
  spline.load('https://fe-hmzs.itheima.net/scene.splinecode').then(() => {
    showLoading.value = false
    console.log('3D模型加载并渲染完毕')
  })
}

// 获取园区数据
const { parkInfo, initParkInfo } = useInitParkInfo()
// 渲染年度收入分析2d图表
const { barChart, initBarChart } = useInitBarChart()
// 渲染园区产业分布2d图表
const { pieChart, initPieChart } = useInitPieChart()

onMounted(async () => {
  // 初始化调用获取园区数据方法
  await initParkInfo()
  initBarChart(parkInfo.value!)
  initPieChart(parkInfo.value!)
  init3dModel()
})
</script>

<template>
  <v-scale-screen width="1920" height="1080">
    <div class="all-charts">
      <!-- 园区概况 -->
      <div class="section-one">
        <img
          src="https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/smartPark/%E5%A4%A7%E5%B1%8F%E5%88%87%E5%9B%BE/%E5%9B%AD%E5%8C%BA%E6%A6%82%E5%86%B5%402x.png"
          alt="logo"
          class="img-header"
        />
        <div class="icons-container">
          <div class="item">
            <div class="icons-item building-icon">
              <span class="number">{{ parkInfo?.base.buildingTotal }}</span>
            </div>
            <span class="title">楼宇总数</span>
            <span class="unity">（栋）</span>
          </div>
          <div class="item">
            <div class="icons-item enterprise-icon">
              <span class="number">{{ parkInfo?.base.enterpriseTotal }}</span>
            </div>
            <span class="title">入住企业总数</span>
            <span class="unity">（家）</span>
          </div>
          <div class="item">
            <div class="icons-item rod-icon">
              <span class="number">{{ parkInfo?.base.parkingTotal }}</span>
            </div>
            <span class="title">车位总数</span>
            <span class="unity">（个）</span>
          </div>
          <div class="item">
            <div class="icons-item car-icon">
              <span class="number">{{ parkInfo?.base.chargePoleTotal }}</span>
            </div>
            <span class="title">一体杆总数</span>
            <span class="unity">（个）</span>
          </div>
        </div>
      </div>
      <!-- 园区年度收入分析 -->
      <div class="section-two">
        <img
          src="https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/smartPark/%E5%A4%A7%E5%B1%8F%E5%88%87%E5%9B%BE/%E5%9B%AD%E5%8C%BA%E5%B9%B4%E5%BA%A6%E6%94%B6%E5%85%A5%E5%88%86%E6%9E%90%402x.png"
          alt="logo"
          class="img-header"
        />
        <div class="bar-chart-title">
          <span>单位：元</span>
          <div>
            <span class="bar-icon blue-bar-icon"></span>
            <span class="bar-icon red-bar-icon"></span>
            收入情况
          </div>
        </div>
        <div class="bar-chart" ref="barChart">
          <div>
            <canvas />
          </div>
          <div></div>
        </div>
      </div>
      <!-- 园区产业分布 -->
      <div class="section-three">
        <img
          src="https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/smartPark/%E5%A4%A7%E5%B1%8F%E5%88%87%E5%9B%BE/%E5%9B%AD%E5%8C%BA%E4%BA%A7%E4%B8%9A%E5%88%86%E5%B8%83%402x.png"
          alt="logo"
          class="img-header"
        />
        <div class="pie-chart" ref="pieChart"></div>
      </div>
    </div>
    <!-- 大屏 -->
    <div class="model-container">
      <!-- 进度条 -->
      <LoadingComponent :loading="showLoading" />
      <canvas style="width: 100%; height: 100%" class="canvas-3d" ref="ref3d"></canvas>
    </div>
  </v-scale-screen>
</template>

<style lang="scss" scoped>
.all-charts {
  position: absolute;
  left: 0;
  top: 0;
  width: 480px;
  height: 100vh;
  min-height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  background: linear-gradient(
    to left,
    rgba(0, 6, 15, 0) 0%,
    rgba(0, 6, 15, 0) 20%,
    rgba(0, 0, 0, 0.4) 30%,
    rgba(0, 0, 0, 0.6) 40%,
    rgba(1, 4, 11, 1) 70%,
    #04070d 100%
  );

  .img-header {
    height: 30px;
  }

  .section-one {
    flex-basis: 25%;
    .icons-container {
      display: flex;
      justify-content: space-between;
      padding: 20px 0;

      .item {
        display: flex;
        flex: 1;
        flex-direction: column;
        text-align: center;

        .icons-item {
          height: 80px;
          position: relative;

          .number {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            font-size: 18px;
            color: #fff;
          }
        }

        .building-icon {
          background: url('@/assets/building-icon.png') no-repeat 50% 0 / contain;
        }
        .enterprise-icon {
          background: url('@/assets/enterprise-icon.png') no-repeat 50% 0 / contain;
        }
        .rod-icon {
          background: url('@/assets/rod-icon.png') no-repeat 50% 0 / contain;
        }
        .car-icon {
          background: url('@/assets/car-icon.png') no-repeat 50% 0 / contain;
        }

        .title {
          margin-top: 8px;
        }

        .title,
        .unity {
          font-size: 14px;
          color: #cdd7e1;
        }
      }
    }
  }

  .section-two {
    flex-basis: 35%;
    margin-top: 40px;

    .bar-chart-title {
      display: flex;
      color: #c6d1db;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      margin-top: 20px;
      // height: 40px;

      .bar-icon {
        display: inline-block;
        width: 12px;
        height: 4px;
      }

      .blue-bar-icon {
        background: linear-gradient(90deg, #74c0f8, rgba(116, 192, 248, 0));
      }
      .red-bar-icon {
        background: linear-gradient(90deg, #ff7152, rgba(255, 113, 82, 0));
      }
    }

    .bar-chart {
      width: 100%;
      height: calc(100% - 70px);
    }
  }

  .section-three {
    padding-top: 20px;
    flex-basis: 40%;
    // background-color: yellow;
    margin-top: 50px;

    .pie-chart {
      // position: relative;
      width: 80%;
      height: calc(100% - 40px);
      margin: 0 auto;
      padding-bottom: 20px;
    }
  }
}

.model-container {
  width: 100%;
  height: 100%;
  background-color: yellow;
  background: black;
}
</style>
