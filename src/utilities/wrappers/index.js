import { toast } from "sonner";
import { API_DOMAIN } from "../constants";

export const history = {
  navigate: null,
  location: null,
}

export function fetchFromAPI(segment, options) {
  // todo: add logout dispatcher on 401s from auth middleware
  // only use this url when deployed to vercel
  // return fetch(`https://ch-th-api-6e4fa9aecbd8.herokuapp.com${segment}`, {
  return fetch(`http://localhost:8000${segment}`, {
    credentials: "include",
    ...options
  }).then((res) => {
    if (res.status === 401) {
      history.navigate("/login");
      toast.error("Unauthorized");
    }
    return res.json(); 
  });
}