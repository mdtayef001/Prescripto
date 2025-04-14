import axios from "axios";

const severUrl = import.meta.env.VITE_SERVER_URL;
const instance = axios.create({
  baseURL: severUrl,
});
// only for admin
const useAxiosSecure = () => {
  instance.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("atoken") || "";
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  return instance;
};

export default useAxiosSecure;
