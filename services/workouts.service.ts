import api from "./api.service";
import type { WorkoutsResponse } from "~/interfaces/workouts.interfaces";

class WorkoutsService {
  async getAllWorkouts() {
    const response = await api().get<WorkoutsResponse>("/workouts");
    return response.data;
  }
}

export default new WorkoutsService();
