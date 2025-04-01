import { defineStore } from "pinia";
import workoutsService from "~/services/workouts.service";

export const useWorkoutsStore = defineStore("workouts", {
  state: () => ({
    workouts: [],
  }),
  actions: {
    async fetchAllWorkouts() {
      return await workoutsService.getAllWorkouts();
    },
  },
});
