import type {
  FetchStudentResponse,
  FetchStudentsResponse,
} from "~/interfaces/user.interfaces";
import api from "./api.service";

export class UsersService {
  async fetchAllStudents() {
    const response = await api().get<FetchStudentsResponse>("/users", {
      params: {},
    });
    return response.data;
  }

  async fetchOneStudent(userId: number) {
    const response = await api().get<FetchStudentResponse>(`/users/${userId}`);
    return response.data;
  }
}

export default new UsersService();
