import api from "./api.service";

export class UsersService {
  async fetchAllStudents() {
    const response = await api().get("/users", {
      params: {
        roleId: 1,
      },
    });
    return response.data;
  }

  async fetchOneStudent(userId: number) {
    const response = await api().get(`/users/${userId}`);
    return response.data;
  }
}

export default new UsersService();
