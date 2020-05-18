import axios from 'axios'
// import Qs from 'qs'
import Vue from 'vue'
import { Message } from 'element-ui' // 引用element-ui的加载和消息提示组件

const $axios = axios.create({
  // 设置超时时间
  timeout: 50000,
  // 基础url，会在请求url中自动添加前置链接
  baseURL:  '/api'
})
Vue.prototype.$http = axios // 并发请求

// 请求拦截器
$axios.interceptors.request.use(
  config => {
    config.headers['charset'] = 'UTF-8'
    config.headers['content-type'] = 'application/json'
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 响应拦截器
$axios.interceptors.response.use(
  response => {
    const code = response.status
    if ((code >= 200 && code < 300) || code === 304) {
      return Promise.resolve(response.data)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    console.log(error)
    if (error.response) {
      switch (error.response.status) {
        case 401:
          break
        case 404:
          Message.error('网络请求不存在')
          break
        default:
          Message.error(error.response.data.message)
      }
    } else {
      // 请求超时或者网络有问题
      if (error.message.includes('timeout')) {
        Message.error('请求超时！请检查网络是否正常')
      } else {
        Message.error('请求失败，请检查网络是否已连接')
      }
    }
    return Promise.reject(error)
  }
)

// get，post请求方法
export default {
  sendRequest ({
    method = 'GET',
    url,
    data,
    params = {},
    timeout = 1000 * 60,
    binary = false,
    cache = false,
    useFormData = false,
    responseType
  }) {
    // const namespace = sessionStorage.getItem('namespace')
    // const token = sessionStorage.getItem('token')
    // Most rubick ajax calls are subject to namespace
    // if (!params.namespace && addNamespace) {
    //   params.namespace = namespace
    // }

    // combine params & data and assign to data
    if (!(data instanceof FormData) && !(data instanceof Array)) {
      data = Object.assign({}, data, params)
    }
    const config = {
      method,
      url,
      timeout,
      cache,
      data,
      params,
      // xsrfHeaderName: 'X-CSRFToken',
      // xsrfCookieName: '294f62ecd0',
      // client: 'rbHttp',
      responseType
    }
    config.headers = {}
    config.headers['Content-Type'] = 'application/json'
    config.headers.Accept = 'application/json, text/plain, */*'
    // config.headers.Authorization = 'Bearer ' + token
    if (useFormData) {
      if (!(data instanceof FormData)) {
        config.data = this._buildFormData(data)
      }
      config.headers['Content-Type'] = 'multipart/form-data'
    }

    if (binary) {
      config.responseType = 'arraybuffer'
    }
    return $axios(config)
  },
  post(url, data = {}) {
    return $axios({
      method: 'post',
      url,
      data: data,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    })
  },
  get(url, params) {
    return $axios({
      method: 'get',
      url,
      params
    })
  }
}
