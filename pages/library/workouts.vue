<template>
  <div class="workouts">
    <div class="workouts__header">
      <h1>Treinos</h1>
    </div>

    <LibraryHeaderActions @refreshWorkouts="getWorkouts" />

    <div class="workouts__content">
      <DataTable :value="state.workouts" striped-rows>
        <Column field="name" header="Nome" />

        <template #empty>
          <div>Nenhum exercício encontrado</div>
        </template>
      </DataTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Workout } from "~/interfaces/workouts.interfaces";

const store = useWorkoutsStore();

const state = reactive({
  loading: false,
  workouts: [] as Workout[],
});

async function getWorkouts() {
  const { data, error } = await tryCatch(store.fetchAllWorkouts());

  if (error) {
    console.error("Error fetching workouts:", error);
    return;
  }

  state.workouts = data.workouts;
}

onMounted(() => {
  getWorkouts();
});
</script>

<style lang="scss" scoped>
.workouts {
  padding: 1rem;

  h1 {
    font-size: 1.5em;
  }
}
</style>
