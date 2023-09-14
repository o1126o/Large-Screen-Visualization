import type { ParkResponseType } from '@/types/park'
import { ref } from 'vue'
// 引入echarts
import * as echarts from 'echarts'

export const useInitPieChart = () => {
  // 保存饼图的dom节点
  const pieChart = ref(null)
  const initPieChart = (parkInfo: ParkResponseType) => {
    const { parkIndustry } = parkInfo
    console.log(parkIndustry)
    // 初始化echarts并指定渲染的容器
    const myPieChart = echarts.init(pieChart.value)
    // 设置配置项
    const PieOption = {
      color: ['#00B2FF', '#2CF2FF', '#892CFF', '#FF624D', '#FFCF54', '#86ECA2'],
      tooltip: {
        trigger: 'item'
      },
      legend: {
        itemGap: 10,
        bottom: '0',
        left: 'center',
        icon: 'rect',
        itemWidth: 10,
        itemHeight: 10,
        textStyle: {
          color: '#c6d1db'
        }
      },
      series: [
        {
          tooltip: {
            trigger: 'item',
            formatter: (params: any) => {
              console.log('params', params)
              return `${params.seriesName}<br/>${params.marker}${params.name}${params.percent}%`
            }
          },
          name: '园区产业分析',
          type: 'pie',
          radius: ['55%', '60%'],
          center: ['50%', '38%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          labelLine: {
            show: false
          },
          data: parkIndustry
        }
      ]
    }

    //  渲染配置项
    myPieChart && myPieChart.setOption(PieOption)
  }
  return { pieChart, initPieChart }
}
