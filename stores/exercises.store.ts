import { defineStore } from "pinia";
import type {
  CreateExercisePayload,
  Exercise,
} from "~/interfaces/exercises.interfaces";
import exercisesService from "~/services/exercises.service";

export const useExercisesStore = defineStore("exercises", {
  state: () => ({
    loading: false,
    exercises: [] as Exercise[],
  }),
  actions: {
    async fetchAllExercises() {
      const { data, error } = await tryCatch(
        exercisesService.getAllExercises()
      );

      if (error) {
        console.error("Erro ao buscar os exercícios", error);
        return;
      }

      this.exercises = data.exercises;
    },
    async fetchExerciseModalities() {
      return await exercisesService.getExerciseModalities();
    },
    async fetchMuscleGroups() {
      return await exercisesService.getMuscleGroups();
    },
    async createExercise(payload: CreateExercisePayload) {
      this.loading = true;

      const { data, error } = await tryCatch(
        exercisesService.createExercise(payload)
      );

      if (error) {
        console.error("Erro ao criar o exercício", error);
        return;
      }

      this.exercises.push(data.exercise);
      this.loading = false;
    },
  },
});
