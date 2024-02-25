console.warn("mode env: ", import.meta.env.MODE);
console.warn("import.meta.PROD: ", import.meta.env.PROD);
console.log("API_DOMAIN: ", import.meta.env.VITE_API_DOMAIN);

export const API_DOMAIN =
  import.meta.env.PROD ? import.meta.env.VITE_API_DOMAIN : "http://localhost:8000";
