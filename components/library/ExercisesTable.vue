<template>
  <DataTable :value="tableData" striped-rows>
    <Column field="name" header="Nome" />
    <Column field="exerciseModality.label" header="Modalidade" />
    <Column :field="getMuscleGroups" header="Grupo muscular" />

    <template #empty>
      <div>Nenhum exercício encontrado</div>
    </template>
  </DataTable>
</template>

<script lang="ts" setup>
import type { Exercise } from "~/interfaces/exercises.interfaces";
const store = useExercisesStore();

const tableData: ComputedRef<Exercise[]> = computed(() => store.exercises);

function getMuscleGroups(exercise: Exercise) {
  const muscleGroups = exercise.muscleGroups;
  const muscleGroupsLabels = muscleGroups.map((muscleGroup) => {
    return muscleGroup.label;
  });

  return muscleGroupsLabels.join(", ");
}

onMounted(() => {
  store.fetchAllExercises();
});
</script>
