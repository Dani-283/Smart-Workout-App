import axios from "./base";
import queryString from "query-string";

const getUser = (email) => axios.get(`/user/exists/?email=${email}`);
const createUser = (body) => axios.post(`/user/create`, body);

export default {
  getUser,
  createUser,
};
