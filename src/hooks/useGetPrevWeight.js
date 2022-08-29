import setApi from "@api/set";
import { useQuery } from "react-query";

const useGetPrevWeight = (name, order) => {
  return useQuery(["prev", name, order], () => setApi.getPrevious(name, order));
};

export default useGetPrevWeight;
