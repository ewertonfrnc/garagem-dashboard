import api from "./api.service";
import type {
  CreateExercisePayload,
  CreateExerciseResponse,
  ExerciseModalityResponse,
  GetAllExercisesResponse,
  MuscleGroupResponse,
} from "~/interfaces/exercises.interfaces";

class ExercisesService {
  async getAllExercises(): Promise<GetAllExercisesResponse> {
    const response = await api().get("/exercises");
    return response.data;
  }

  async getExerciseModalities(): Promise<ExerciseModalityResponse> {
    const response = await api().get("/exercise-modalities");
    return response.data;
  }

  async getMuscleGroups(): Promise<MuscleGroupResponse> {
    const response = await api().get("/muscle-groups");
    return response.data;
  }

  async createExercise(
    payload: CreateExercisePayload
  ): Promise<CreateExerciseResponse> {
    const response = await api().post("/exercises", payload);
    return response.data;
  }
}

export default new ExercisesService();
