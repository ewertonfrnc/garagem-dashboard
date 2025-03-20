<template>
  <div class="profile">
    <div v-if="state.user">
      <h1>{{ state.user.name }}</h1>

      <p><strong>ID:</strong> {{ state.user.id }}</p>
      <p><strong>Name:</strong> {{ state.user.name }}</p>
      <p><strong>Email:</strong> {{ state.user.email }}</p>
    </div>

    <div v-else>
      <p>Carregando...</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const store = useUsersStore();

const state = reactive({
  Loading: false,
  user: null,
});

async function getUser() {
  state.Loading = true;

  const response = await store.fetchStudent(route.params.id);
  console.log(response);
  state.user = response.user;

  state.Loading = false;
}

onMounted(() => {
  getUser();
});
</script>

<style scoped>
.profile {
  padding: 0 1rem;

  h1 {
    font-size: 1.5em;
    margin-bottom: 1rem;
  }
}
</style>
