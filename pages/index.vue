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
        selectionMode="single"
        @row-select="onRowSelect"
      >
        <Column field="name" header="Nome" />
        <Column field="email" header="Email" />
      </DataTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import type { User } from "~/interfaces/user.interfaces";

const store = useUsersStore();

const state = reactive({
  options: [] as User[],
});

async function getAllStudents() {
  const { data, error } = await tryCatch(store.fetchAllStudents());

  if (error) {
    console.error(error);
    return;
  }

  state.options = data.users;
}

const router = useRouter();

function onRowSelect(event) {
  if (!event.data) return;
  router.push(`/student/${event.data.id}/overview`);
}

onMounted(async () => {
  getAllStudents();
});
</script>

<style lang="scss" scoped>
.users {
  padding: 1rem;

  &__header {
    h1 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
  }
}
</style>
