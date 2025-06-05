import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
export const headersGit = {
  Accept: 'application/vnd.github.cloak-preview+json',
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  'X-GitHub-Api-Version': '2022-11-28',
};
const axiosiInstance = axios.create({
  baseURL: process.env.API_URL,
});

const api = (axios: AxiosInstance) => {
  return {
    get: function <T>(url: string, config: AxiosRequestConfig = {}) {
      return axios.get<T>(url, config);
    },
    put: function <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) {
      return axios.put<T>(url, body, config);
    },
    post: function <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) {
      return axios.post<T>(url, body, config);
    },
    delete: function <T>(url: string, config: AxiosRequestConfig = {}) {
      return axios.delete<T>(url, config);
    },
  };
};

export default api(axiosiInstance);
