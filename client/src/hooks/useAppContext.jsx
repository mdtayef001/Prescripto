import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const useAppContext = () => {
  const provider = useContext(AppContext);
  return provider;
};

export default useAppContext;
