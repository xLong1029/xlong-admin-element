/*
 * 功能 : 封装一些主要工具方法
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2022-05-09
 * 版本 : version 2.0
 */

const CryptoJS = require("crypto-js");

/**
 * 根据时间辍返回对应的时间 如 YYYY-MM-DD HH:mm:ss  YYYY-MM-DD
 * @param {Object} date 时间对象
 * @param {String} format 时间格式 默认返回年月日时分秒 按照的格式化是 YYYY-MM-DD HH:mm:ss
 * @param {String} dateWord 默认返回2018年01月15日 如填写 - 的。则返回 2018-01-15
 * @param {String} timeWord 默认返回16时26分30秒 如填写 : 的。则返回 16:26:30
 */
export function timeTrans(date, format = 'YYYY-MM-DD HH:mm:ss', dateWord = '', timeWord = '') {
  const YType = dateWord === '' ? '年' : dateWord
  const MType = dateWord === '' ? '月' : dateWord
  const DType = dateWord === '' ? '日' : ''

  const hType = timeWord === '' ? '时' : timeWord
  const mType = timeWord === '' ? '分' : timeWord
  const sType = timeWord === '' ? '秒' : ''

  let dataValue = ''
  const Y = date.getFullYear() + YType
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + MType
  const D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + DType
  const h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + hType
  const m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + mType
  const s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()) + sType
  switch (format) {
    case 'YYYY-MM-DD HH:mm:ss':
      dataValue = Y + M + D + ' ' + h + m + s
      break
    case 'YYYY':
      dataValue = date.getFullYear().toString()
      break
    case 'MM':
      dataValue = M.substring(0, M.length - 1)
      break
    case 'DD':
      dataValue = D.substring(0, D.length - 1)
      break
    case 'YYYY-MM':
      dataValue = Y + M.substring(0, M.length - 1)
      break
    case 'YYYY-MM-DD':
      dataValue = Y + M + D
      break
    case 'MM-DD':
      dataValue = M + D.substring(0, D.length - 1)
      break
    case 'HH':
      dataValue = h.substring(0, h.length - 1)
      break
    case 'mm':
      dataValue = m.substring(0, m.length - 1)
      break
    case 'ss':
      dataValue = s.toString()
      break
    case 'HH:mm':
      dataValue = h + m.substring(0, m.length - 1)
      break
    case 'HH:mm:ss':
      dataValue = h + m + s
      break
    case 'mm:ss':
      dataValue = m + s
      break
    default:
      throw new Error('没有找到对应的时间')
  }
  return dataValue
}

/**
 * 获取参数对象
 *
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * 清除数组
 *
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

/**
 * 参数转对象格式
 *
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
      .replace(/\+/g, ' ') +
    '"}'
  )
}

/**
 * html转Text格式
 *
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

/**
 * 合并两个对象，赋予最后一个优先级
 *
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }

  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

/**
 * 防抖动
 *
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * 深克隆
 *
 * @param {Array} source
 */
export function deepClone(source) {
  const copy = JSON.stringify(source)
  return JSON.parse(copy)
}

/**
 * 数组去重
 *
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

/**
 * 判断元素是否包含类名
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * 给元素添加类名
 *
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function aDDClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * 从元素上移除类名
 *
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

/**
 * 给元素切换类名
 *
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

/**
 * 数组转字符串
 *
 * @param {Array} arr 数组
 * @param {String} l 拼接符
 * @returns {String}
 */
export function arrToStr(arr, l) {
  return arr.join(l)
}

/**
 * 字符串转数组
 *
 * @param {String} string 字符串
 * @param {String} s 分隔符
 * @returns {Array}
 */
export function strToArr(string, s) {
  return string.split(s)
}

/**
 * 数组限制器
 *
 * @param {Array} list 数组列表
 * @param {String | Number} start 起始下标
 * @param {String | Number} limit 每页条数
 * @returns {Array}
 */
export function limitArr(list, start, limit) {
  return list.filter((item, index) => index < limit * start && index >= limit * (start - 1))
}

/**
 * 获取页面滚动高度
 *
 * @returns {Number}
 */
export function getScrollTop() {
  let scroll_top = 0
  if (document.documentElement && document.documentElement.scrollTop) {
    scroll_top = document.documentElement.scrollTop
  } else if (document.body) {
    scroll_top = document.body.scrollTop
  }
  return scroll_top
}

/**
 * 获取url传值参数
 *
 * @param {String} name 参数名
 * @param {String} thisUrl url地址，若不传则获取当前地址
 */
export function getUrlQuery(name, thisUrl) {
  const reg = new RegExp('(^|\\?|&)' + name + '=([^&]*)(\\s|&|$)', 'i')
  const url = thisUrl || location.href
  if (reg.test(url)) return decodeURI(RegExp.$2.replace(/\+/g, ' '))
  else return false
}

/**
 * 输出信息
 *
 * @returns {*} msg
 */
export function logInfo(msg) {
  const production = process.env.NODE_ENV === 'production'
  if (!production) {
    console.log(msg)
    return true
  }
  return false
}

/**
 * 获取文件流下载
 *
 * @param {Nmuber} data 数据
 * @param {String} name 名称
 */
export function getFileStream(data, name) {
  // 判断是否有msSaveOrOpenBlob，在客户端上以本地方式保存文件（任意大小），方法如同从 Internet 下载文件
  if (window.navigator.msSaveOrOpenBlob) {
    // msSaveBlob只能保存，不能在线打开
    navigator.msSaveBlob(data, name)
  } else {
    // 创建a标签
    const link = document.createElement('a')
    // 创建URL
    link.href = window.URL.createObjectURL(data)
    // 设置下载名称
    link.download = name
    // 触发标签点击事件
    link.click()
    // 释放URL
    window.URL.revokeObjectURL(link.href)
  }
}

/**
 * 删除对象指定属性
 *
 * @param {*} obj 对象
 * @param {*} uselessKeys 不需要的属性序列
 */
export function objOmit(obj, uselessKeys) {
  uselessKeys.forEach(key => delete obj[key])
  return obj
}

/**
 * AES加密
 *
 * @param {String} str 内容
 * @param {*} key 密钥
 * @param {*} iv
 */
 export const AESEncrypt = (str, key = "xLong", iv = "") => {
  return CryptoJS.AES.AESEncrypt(str, iv, CryptoJS.enc.Utf8.parse(key), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();
};

/**
 * AES解密
 *
 * @param {String} str 内容
 * @param {*} key 密钥
 * @param {*} iv
 */
export const AESDecrypt = (str, key = "xLong", iv = "") => {
  return CryptoJS.AES.decrypt(str, iv, CryptoJS.enc.Utf8.parse(key), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  }).toString(CryptoJS.enc.Utf8);
};

/**
 * localstorage写入本地缓存
 *
 * @param {*} key key名
 * @param {*} value 值
 */
export function setLocalS(key, value) {
  localStorage.setItem(key, value)
}

/**
 * localstorage获取本地缓存
 *
 * @param {*} key key名
 */
export function getLocalS(key) {
  const res = localStorage.getItem(key)
  if (res && res !== 'null') return res
  else return false
}

/**
 * localstorage删除本地储存
 *
 * @param {*} key key名
 */
export function delLocalS(key) {
  localStorage.removeItem(key)
}

/**
 * localstorage清空所有本地储存
 */
export function clearLocalS() {
  localStorage.clear()
}

/**
 * 比较日期大小
 *
 * @param {*} dateOne 第一个日期
 * @param {*} dateTwo 第二个日期
 */
 export function compareDate(dateOne, dateTwo) {
  // console.log(dateOne, typeof(dateOne), dateTwo, console.log(typeof(dateTwo)))
  const compareDateOne = typeof (dateOne) == 'string' ? new Date(dateOne.replace(/-/g, "\/")) : dateOne;
  const compareDateTwo = typeof (dateTwo) == 'string' ? new Date(dateTwo.replace(/-/g, "\/")) : dateTwo;

  return compareDateOne <= compareDateTwo;
}

/**
 * 数字转成汉字
 *
 * @param {string} url
 * @returns {Object}
 */
 export function convertToChinaNum(num) {
  var arr1 = new Array('零', '一', '二', '三', '四', '五', '六', '七', '八', '九');
  var arr2 = new Array('', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万', '十', '百', '千', '亿');

  if (!num || isNaN(num)) {
    return "零";
  }

  let english = num.toString().split("")
  let result = "";
  for (let i = 0; i < english.length; i++) {
    let des_i = english.length - 1 - i; // 倒序排列设值        
    result = arr2[i] + result;
    let arr1_index = english[des_i];
    result = arr1[arr1_index] + result;
  }

  // 将【零千、零百】换成【零】 【十零】换成【十】    
  result = result.replace(/零(千|百|十)/g, '零').replace(/十零/g, '十');
  // 合并中间多个零为一个零  
  result = result.replace(/零+/g, '零');
  // 将【零亿】换成【亿】【零万】换成【万】    
  result = result.replace(/零亿/g, '亿').replace(/零万/g, '万');
  //将【亿万】换成【亿】    
  result = result.replace(/亿万/g, '亿');
  //移除末尾的零
  result = result.replace(/零+$/, '');
  //将【一十】换成【十】
  result = result.replace(/^一十/g, '十');

  return result;
}