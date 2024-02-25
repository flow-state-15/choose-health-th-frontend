import { toast } from "sonner";

export const history = {
  navigate: null,
  location: null,
}

export function fetchFromAPI(segment, options) {
  return fetch(`https://ch-th-api-6e4fa9aecbd8.herokuapp.com${segment}`, {
    credentials: "include",
    headers: {
      "Access-Control-Allow-Credentials": true,
    },
    ...options
  }).then((res) => {
    if (res.status === 401) {
      history.navigate("/login");
      toast.error("Unauthorized");
    }
    return res.json(); 
  });
}