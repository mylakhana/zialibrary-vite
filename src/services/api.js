import axios from "axios";

// Create axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    config.headers.lang = localStorage.getItem("language") || "ar";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    //testing purposes
    // if (error.response?.status === 401) {
    //   // Handle unauthorized access
    //   localStorage.removeItem('token');
    //   window.location.href = '/login';
    // }
    return Promise.reject(error);
  }
);

/**
 * Generic function to make API requests
 * @param {string} url - The API endpoint
 * @param {string} method - HTTP method (get, post, put, delete, etc.)
 * @param {object} data - Request payload (optional)
 * @param {object} config - Additional axios config (optional)
 * @returns {Promise} - Axios response
 */
const fetchApi = async (url, method = "get", data = null, config = {}) => {
  try {
    const response = await api({
      url,
      method,
      data,
      ...config,
    });
    return response.data;
  } catch (error) {
    // Handle specific error cases
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw {
        status: error.response.status,
        message: error.response.data?.message || "An error occurred",
        data: error.response.data,
      };
    } else if (error.request) {
      // The request was made but no response was received
      throw {
        status: 0,
        message: "No response received from server",
      };
    } else {
      // Something happened in setting up the request that triggered an Error
      throw {
        status: -1,
        message: error.message,
      };
    }
  }
};

// Helper methods for common HTTP methods
export const get = (url, config = {}) => fetchApi(url, "get", null, config);
export const post = (url, data, config = {}) =>
  fetchApi(url, "post", data, config);
export const put = (url, data, config = {}) =>
  fetchApi(url, "put", data, config);
export const patch = (url, data, config = {}) =>
  fetchApi(url, "patch", data, config);
export const del = (url, config = {}) => fetchApi(url, "delete", null, config);

export default fetchApi;
