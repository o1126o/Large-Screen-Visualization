import type { ParkResponseType } from '@/types/park'
import { ref } from 'vue'

// 引入echarts
import * as echarts from 'echarts'

export const useInitBarChart = () => {
  // 获取渲染的dom容器(获取dom节点)
  const barChart = ref(null)
  const initBarChart = (parkInfo: ParkResponseType) => {
    const { parkIncome } = parkInfo
    console.log(parkIncome)
    // 初始化echarts并指定渲染的容器
    const myBarChart = echarts.init(barChart.value)
    // 设置配置项
    const BarOption = {
      tooltip: {
        show: true,
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        top: '10px',
        left: '0px',
        right: '0px',
        bottom: '0px',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: parkIncome.xMonth,
        axisTick: {
          show: false,
          alignWithLabel: true
        }
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: false
        }
      },
      textStyle: {
        color: '#b4c0cc'
      },
      series: [
        {
          data: parkIncome.yIncome.map((item: any, index: number) => {
            const color =
              index % 2 === 0
                ? {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: '#74c0f8' // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: 'rgba(116,192,248,0)' // 100% 处的颜色
                      }
                    ],
                    global: false // 缺省为 false
                  }
                : {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: '#ff7152' // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: 'rgba(255,113,82,0)' // 100% 处的颜色
                      }
                    ],
                    global: false // 缺省为 false
                  }
            return { value: item, itemStyle: { color } }
          }),
          type: 'bar',
          barWidth: '10px',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }
      ]
    }
    // 渲染图表
    myBarChart && myBarChart.setOption(BarOption)
  }
  return { barChart, initBarChart }
}
