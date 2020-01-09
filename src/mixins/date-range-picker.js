/* eslint-disable */
import { logInfo } from '@/utils'

export default {
  data() {
    return {
      // 日期范围
      rangeDate: [],
      // 开始日期
      startDate: '',
      // 结束日期
      endDate: '',
      // 时间选择
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 6);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 29);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 89);
            picker.$emit('pick', [start, end]);
          }
        }]
      }
    }
  },
  methods: {
    // 获取日期选项值，返回2个选项值组合
    dateChange(vals){
      logInfo(vals);
      if(vals){
        this.startDate = vals[0];
        this.endDate = vals[1];
      }
      else{
        this.startDate = '';
        this.endDate = '';
      }
    }
  }
}
