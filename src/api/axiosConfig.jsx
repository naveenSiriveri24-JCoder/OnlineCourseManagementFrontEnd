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
          console.error("Unauthorized");

          localStorage.removeItem("token");
          localStorage.removeItem("profile");

          window.location.href = "/login";
          break;

        case 403:
          console.error("Access Denied");
          localStorage.removeItem("token");
          localStorage.removeItem("profile");
          localStorage.removeItem("user")
          localStorage.removeItem("Admin")
          window.location.href = "/session_expire";
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