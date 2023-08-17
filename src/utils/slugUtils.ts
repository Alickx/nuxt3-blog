import { log } from 'console';
import pinyin from 'pinyin'

/**
 * 中文转拼音
 * @param cnStr 中文字符串
 * @returns
 */
const toPinyin = (cnStr: string) => {
  return pinyin(cnStr, {style: pinyin.STYLE_NORMAL,});
}

/**
 * 扁平化拼音数组
 * @param pinyinArr 拼音数组
 */
const flattenPinyin = (pinyinArr: string[][]) => {
  return pinyinArr.map((item) => item[0])
}

export function getSlug(cnStr: string) {
  const pinyinArr = toPinyin(cnStr)
  const flattenArr = flattenPinyin(pinyinArr)
  return flattenArr.join('-')
}
