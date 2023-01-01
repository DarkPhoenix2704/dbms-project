import Axios from "axios";

export const api = Axios.create({
  baseURL: "https://dev.dbms.anbarasu.me",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
