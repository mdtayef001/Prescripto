import axios from "axios";

const severUrl = import.meta.env.VITE_SERVER_URL;
const instance = axios.create({
  baseURL: severUrl,
});
const useAxiosPublic = () => {
  return instance;
};

export default useAxiosPublic;
