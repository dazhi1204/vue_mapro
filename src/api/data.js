import $axios from './index'
export default class dataApi {
  // 登录接口
  static login (data) {
    const url = '/gis-web/login/login'
    return $axios.post(url, data)
  }

}