import axios from "axios";

export default function api() {
  const {
    public: { baseUrl },
  } = useRuntimeConfig();

  const cookiesToken = useCookie("token");
  const token = cookiesToken.value;

  const axiosInstance = axios.create({
    baseURL: String(baseUrl),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return axiosInstance;
}
