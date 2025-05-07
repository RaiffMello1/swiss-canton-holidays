import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000
});

// Response interceptor for global error handling
apiClient.interceptors.response.use(
  response => response,
  error => {
    const { response } = error;
    // Handle server errors
    if (response && response.status >= 500) {
      console.error('Server error occurred:', error);
    }
    return Promise.reject(error);
  }
);

const apiService = {
  async get(endpoint: string, params = {}) {
    try {
      const response = await apiClient.get(endpoint, { params });
      return response.data;
    } catch (error) {
      console.error(`GET ${endpoint} error:`, error);
      throw error;
    }
  }
};

export default apiService;