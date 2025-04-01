<template>
  <div class="users">
    <div class="users__header">
      <h1>Seus alunos</h1>
    </div>

    <div class="users__list">
      <DataTable
        :value="state.options"
        striped-rows
        table-style="min-width: 50rem"
      >
        <Column field="name" header="Nome" />
        <Column field="email" header="Email" />
      </DataTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
const usersStore = useUsersStore();

const state = reactive({
  selectedOption: null,
  options: [],
});

async function getAllStudents() {
  const response = await usersStore.fetchAllStudents();
  state.options = response.users;
}

onMounted(async () => {
  getAllStudents();
});
</script>

<style lang="scss" scoped></style>
