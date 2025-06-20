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
    async fetchUserWorkouts(userId: number) {
      return await workoutsService.getUserWorkouts(userId);
    },
    async createWorkout(workout) {
      console.log("Store Creating workout:", workout);
      return await workoutsService.createWorkout(workout);
    },
  },
});
