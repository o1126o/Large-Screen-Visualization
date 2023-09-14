import axios from 'axios'
// import { getToken } from './cookie'
import type { InternalAxiosRequestConfig, AxiosResponse, Method } from 'axios'
import type { Data } from '@/types/request'

const service = axios.create({
  baseURL: 'https://api-hmzs.itheima.net/v1',
  timeout: 5000
})

// 请求拦截
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 请求头发送token
    // const token = getToken()
    // console.log(token, 'token')
    config.headers.Authorization =
      'eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjQwMThkM2UwLWJmNzctNDVmYy1hMzY5LTFiOTRkM2U4OWM4ZCJ9.GZhc6kwDpSUN6ZzSlQ5P9N3gBS8YWMhVkyOfmVnaZ3OoLc67-4NfwTwqNrMLw9LhP3fgXhfwu8i9X8BV0jMxeQ'
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

const request = <T>(url: string, method: Method, submitData?: object) => {
  return service.request<T, Data<T>>({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}

export default request
