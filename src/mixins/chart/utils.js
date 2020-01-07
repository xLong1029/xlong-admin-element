/* eslint-disable */
import { deepClone } from "@/utils";

export default {
  methods: {
    sortData(){
      // 解决因为排序改变图表数据，切换图表时导致死循环的问题
      let data = deepClone(this.chartData);
      // 处理属性值
      let propertys = [];
      this.series.forEach(e => propertys.push(e.property));

      // 图表数据排序
      data.sort(this.compare(propertys));
      return data;
    },
    compare(propertys) {
      return function(a, b) {
        let value1 = 0;
        let value2 = 0;
        propertys.forEach(e => {
          value1 += a[e];
          value2 += b[e];
        });
        return propertys.length > 1 ? value2 - value1 : value1 - value2;
      };
    }
  }
}
