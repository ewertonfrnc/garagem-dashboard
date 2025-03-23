<template>
  <DataTable :value="tableData" striped-rows>
    <Column field="name" header="Nome" />
    <Column field="exerciseModality.label" header="Modalidade" />

    <template #empty>
      <div>Nenhum exercício encontrado</div>
    </template>
  </DataTable>
</template>

<script lang="ts" setup>
const store = useExercisesStore();

const tableData = computed(() => store.exercises);

onMounted(() => {
  store.fetchAllExercises();
});
</script>
