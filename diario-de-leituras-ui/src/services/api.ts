import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080' // A URL base de toda a nossa API
})

export default api
