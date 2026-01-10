import axios from "axios";
const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true
})

axiosInstance.interceptors.request.use(
    (config) => {
        console.log("hello");
        if(!config.url.includes("/login") && !config.url.includes("/logout") && !config.url.includes("/refresh")){
            const token = localStorage.getItem("token");
            if(token){
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  // Success handler
  response => response,

  // Error handler
  async error => {
    const originalRequest = error.config;
    console.log("Interceptor triggered:", originalRequest);
    
    if (!originalRequest) return Promise.reject(error);

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/refresh')
    ) {
      originalRequest._retry=true;

      try {
        // Import here to avoid circular dependency
        // cookieStore.getAll().then(cookies => {
        //     console.log(cookies);
        // });
        const res = await axios.post("http://localhost:8080/refresh",{},{withCredentials:true});
        localStorage.setItem("token", res.data);

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // await logoutApi();
        // console.log("refresh token is expired as well")
        localStorage.removeItem("token");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
export default axiosInstance;