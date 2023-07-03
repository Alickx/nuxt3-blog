import * as common from '~/constant/resultConstant'
export class R {

  public static ok(data?: any) {
    return {
      code: common.SUCCESS_CODE,
      msg: common.SUCCESS_MSG,
      data
    }
  }

  public static error(msg: string) {
    return {
      code: common.ERROR_CODE,
      msg,
      data: null
    }
  }

}
