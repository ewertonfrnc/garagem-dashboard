import api from "./api.service";
import type { RegisterData, LoginData } from "@/interfaces/auth.interfaces";

class AuthService {
  async register(data: RegisterData) {
    const response = await api().post("/users/signup", data);
    return response.data;
  }

  async login(data: LoginData) {
    const response = await api().post("/users/login", data);
    return response.data;
  }
}

export default new AuthService();
