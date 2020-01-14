/**
 * 判断值是否为空，若为空则返回'-'
 * @param value
 */
export function isNull(value) {
  return value && value !== null && value !== undefined && value !== '' ? value : '-'
}
/**
 * 判断值布尔属性，返回是或否
 * @param value
 */
export function formatBoolean(value) {
  return value ? '是' : '否'
}
