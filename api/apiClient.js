import axios from "axios"
import { getToken } from "../utils/tokenStorage"

const apiClient = axios.create({
  baseURL:"https://moovuruli-server.vercel.app/api"
})

apiClient.interceptors.request.use(async (config)=>{

  const token = await getToken()

  if(token){
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

apiClient.interceptors.response.use(

  response => response,

  async error => {

    if(error.response?.status === 401){

      console.log("Token expired - redirect login")

    }

    return Promise.reject(error)
  }
)

export default apiClient