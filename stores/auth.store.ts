import type { LoginData, RegisterData } from "~/interfaces/auth.interfaces";
import authService from "~/services/auth.service";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    async register(data: RegisterData) {
      const response = await authService.register(data);
      this.user = response.user;
      this.token = response.token;

      const cookiesToken = useCookie("token");
      cookiesToken.value = this.token;
    },
    async login(data: LoginData) {
      const response = await authService.login(data);

      console.log("responselogin ", response);
      this.user = response.user;
      this.token = response.token;

      const cookiesToken = useCookie("token");
      cookiesToken.value = this.token;
    },
    logUserOut() {
      const cookiesToken = useCookie("token");
      cookiesToken.value = null;
      this.user = null;
      this.token = null;
    },
  },
});
