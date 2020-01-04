/**
 * 汉化VeeValidate原有的规则
 */
import VeeValidate from 'vee-validate'

const messages = {
  after: (field, [target]) => ` 必须在${target}之后`,
  alpha_dash: (field) => ` 能够包含字母数字字符，包括破折号、下划线`,
  alpha_num: (field) => `只能包含字母数字字符`,
  alpha_spaces: (field) => ` 只能包含字母字符，包括空格`,
  alpha: (field) => ` 只能包含字母字符`,
  before: (field, [target]) => ` 必须在${target} 之前`,
  between: (field, [min, max]) => ` 必须在${min} ${max}之间`,
  confirmed: (field, [confirmedField]) => `两次密码不一致`,
  date_between: (field, [min, max]) => ` 必须在${min}和${max}之间`,
  date_format: (field, [format]) => ` 必须在在${format}格式中`,
  decimal: (field, [decimals] = ['*']) => `必须是数字的而且能够包含${decimals === '*' ? '' : decimals} 小数点`,
  digits: (field, [length]) => ` 必须是数字，且精确到 ${length}数`,
  dimensions: (field, [width, height]) => ` 必须是 ${width} 像素到 ${height} 像素`,
  email: (field) => ` 必须是有效的邮箱`,
  ext: (field) => ` 必须是有效的文件`,
  image: (field) => ` 必须是图片`,
  in: (field) => ` 必须是一个有效值`,
  ip: (field) => ` 必须是一个有效的地址`,
  max: (field, [length]) => ` 不能大于${length}字符`,
  max_value: (field, [max]) => `必须小于或等于${max}.`,
  mimes: (field) => ` 必须是有效的文件类型`,
  min: (field, [length]) => ` 必须至少有 ${length} 字符`,
  min_value: (field, [min]) => `必须大于或等于${min}.`,
  not_in: (field) => ` 必须是一个有效值`,
  numeric: (field) => ` 只能包含数字字符`,
  regex: (field) => ` 格式无效`,
  required: (field) => `此项必填`,
  size: (field, [size]) => ` ${field} 必须小于 ${formatFileSize(size)}.`,
  url: (field) => ` 不是有效的url`
}

/**
 * Formates file size.
 *
 * @param {Number|String} size
 */
export const formatFileSize = (size) => {
  const units = ['Byte', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const threshold = 1024
  size = Number(size) * threshold
  const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(threshold))
  return `${(size / Math.pow(threshold, i)).toFixed(2) * 1} ${units[i]}`
}

const locale = {
  name: 'zh_CN',
  messages,
  attributes: {}
}

if (typeof VeeValidate !== 'undefined' && VeeValidate && typeof VeeValidate.Validator) {
  VeeValidate.Validator.localize(locale.name, locale)
}

export default locale
