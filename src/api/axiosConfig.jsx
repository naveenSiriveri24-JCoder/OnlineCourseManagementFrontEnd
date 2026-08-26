import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;

  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {

    if (error.response) {

      switch (error.response.status) {

        case 401:
          const errorMessage = error.response.data?.message || "JWT token is expired or invalid.";
          alert(errorMessage);
          localStorage.removeItem("token");
          localStorage.removeItem("profile");
          localStorage.removeItem("user");
          localStorage.removeItem("Admin");
          window.location.href = "/session_expire";
          break;

        case 403:
          console.error("Access Denied");
          break;

        case 404:
          console.error("Resource Not Found");
          break;

        case 500:
          console.error("Server Error");
          break;

        default:
          console.error("Unexpected Error");
      }
    }

    return Promise.reject(error);
  }
);

export default api;