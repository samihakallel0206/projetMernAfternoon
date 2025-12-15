import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:4500/api",
    withCredentials:true, //pour les cookies
})

export default api