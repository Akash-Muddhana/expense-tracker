const API = import.meta.env.VITE_API_URL?.replace(/\/+$/, "");

if (!API) {
  throw new Error("VITE_API_URL is not defined");
}

export default API;
