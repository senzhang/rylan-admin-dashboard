import axios from 'axios'
export const api = axios.create({
  baseURL: '/api', // 可替换为真实后端
  timeout: 8000,
})
api.interceptors.request.use((config)=>{
  // 可在此注入 token
  return config
})
api.interceptors.response.use(
  r=>r,
  async (err)=>{
    // 全局错误处理占位：可根据状态码分类
    return Promise.reject(err)
  }
)
