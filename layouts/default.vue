<template>
  <div class="layout">
    <aside class="layout__aside">
      <div class="layout__aside-content">
        <div class="layout__logo">
          <h3>LOGO</h3>
        </div>

        <Divider />

        <Menu :model="items" />
      </div>
    </aside>

    <Toast />

    <main class="layout__main">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

const items = ref([
  {
    label: "Clientes",
    items: [
      {
        label: "Todos os clientes",
        icon: "pi pi-users",
        command: () => {
          router.push("/");
        },
      },
      { label: "Arquivados", icon: "pi pi-inbox", command: () => {} },
    ],
  },
  {
    label: "Biblioteca",
    items: [
      {
        label: "Exercícios",
        icon: "pi pi-wave-pulse",
        command: () => {
          router.push("/library/exercises");
        },
      },
      {
        label: "Treinos",
        icon: "pi pi-map",
        command: () => {
          router.push("/library/workouts");
        },
      },
    ],
  },
]);
</script>

<style lang="scss" scoped>
.layout {
  background-color: #f8fafc;
  display: flex;
  position: relative;

  &__aside {
    position: fixed;
    top: 0;
    left: 0;
    width: 250px;
    height: 100vh;
    padding: 1rem;
    background-color: #f8fafc;
    overflow-y: auto;
  }

  &__aside-content {
    display: flex;
    flex-direction: column;
  }

  &__logo {
    margin-bottom: 1rem;
  }

  &__main {
    flex: 1;
    position: relative;
    border: 1px solid #e2e9f0;
    padding: 1rem;
    margin: 1rem 1rem 1rem 250px;
    background-color: #fff;
    border-radius: 1rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    min-height: calc(100vh - 2rem);
    overflow-y: auto;
  }
}
</style>
