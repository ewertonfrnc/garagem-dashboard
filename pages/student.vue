<template>
  <div class="profile">
    <div v-if="!state.loading && state.user">
      <div class="profile__header">
        <h1>{{ state.user.name }}</h1>
      </div>

      <Tabs :value="tabItems[0].route">
        <TabList>
          <Tab v-for="tab in tabItems" :key="tab.label" :value="tab.route">
            <router-link :to="tab.route">
              <i :class="tab.icon" />
              <span>{{ tab.label }}</span>
            </router-link>
          </Tab>
        </TabList>
      </Tabs>
    </div>

    <NuxtPage :state="state" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { StudentState, User } from "~/interfaces/user.interfaces";

const route = useRoute();
const router = useRouter();
const store = useUsersStore();

const state = reactive<StudentState>({
  loading: false,
  user: null as User | null,
});

const tabItems = ref([
  {
    route: `/student/${route.params.id}/overview`,
    label: "Visão Geral",
    icon: "pi pi-home",
  },
  {
    route: `/student/${route.params.id}/calendar`,
    label: "Calendário",
    icon: "pi pi-calendar",
  },
]);

async function getUser() {
  state.loading = true;

  const { data, error } = await tryCatch(
    store.fetchStudent(Number(route.params.id))
  );

  if (error) {
    console.error(error);
  } else if (data) {
    state.user = data.user;
  }

  state.loading = false;
}

onMounted(() => {
  getUser();
});
</script>

<style scoped lang="scss">
.profile {
}
</style>
