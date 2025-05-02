<template>
  <div class="calendar">
    <div class="calendar__container">
      <div class="calendar__list">
        <div
          v-for="userWorkout in state.userWorkouts"
          :key="userWorkout.id"
          class="calendar__item"
        >
          <div class="calendar__item-header">
            <div class="calendar__item-date">
              {{ formatWorkoutDate(userWorkout.date) }}
            </div>

            <div class="calendar__item-name">
              {{ userWorkout.workout.name }}
            </div>
          </div>

          <div class="calendar__item-exercises">
            <div
              v-for="exercise in userWorkout.workout.exercises"
              :key="exercise.id"
              class="calendar__item-exercise"
            >
              <span class="calendar__item-exercise-name">
                {{ exercise.name }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { User } from "~/interfaces/user.interfaces";
import type { StudentWorkouts } from "~/interfaces/workouts.interfaces";

type Props = { user: User };
const props = defineProps<Props>();
const store = useWorkoutsStore();

const state = reactive({
  loading: false,
  userWorkouts: [] as StudentWorkouts[],
});

function formatWorkoutDate(date: Date | string) {
  return formatDate(date, { day: "numeric", weekday: "short", month: "short" });
}

async function getUserWorkouts() {
  if (!props.user) return;

  const { data, error } = await tryCatch(
    store.fetchUserWorkouts(props.user.id),
  );

  if (error) {
    console.log(error);
    return;
  }

  state.userWorkouts = data.studentWorkouts;
}

onMounted(() => {
  getUserWorkouts();
});
</script>

<style lang="scss" scoped>
.calendar {
  &__item {
    padding: 1rem 2rem;
    border-bottom: 1px solid #dde3ea;

    display: grid;
    grid-template-columns: 1fr 3fr;

    &-header {
      margin-bottom: 0.5rem;
      display: flex;
      gap: 0.5rem;
    }

    &-date {
      font-weight: 500;
      color: #64748b;
    }

    &-name {
      font-weight: 600;
    }

    &-exercises {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  }
}
</style>
