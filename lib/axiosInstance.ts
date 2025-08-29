import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = async <T = unknown>(
  config: AxiosRequestConfig
): Promise<T> => {
  const onSuccess = (response: AxiosResponse<T>) => {
    return response.data;
  };
  const onError = (error: { response?: { data: unknown } }) => {
    throw error?.response?.data;
  };

  return axios(config).then(onSuccess).catch(onError);
};

export default axiosInstance;

// TODO: uses Example -- how to use  axiosInstance
// For known response types
// interface UserData {
//   id: number;
//   name: string;
// }

// The type will be inferred automatically
// const userData = await axiosInstance<UserData>({
//   url: '/users',
//   method: 'GET'
// });
