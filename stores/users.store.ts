import { defineStore } from "pinia";
import usersService from "~/services/users.service";

export const useUsersStore = defineStore("users", {
  state: () => ({
    users: [],
  }),
  actions: {
    async fetchAllStudents() {
      return await usersService.fetchAllStudents();
    },
    async fetchStudent(userId: number) {
      return await usersService.fetchOneStudent(userId);
    },
  },
});
