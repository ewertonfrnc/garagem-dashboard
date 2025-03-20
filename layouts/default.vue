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
      <!-- <Breadcrumb :home="home" :model="breadcrumbItem" /> -->

      <!-- <Divider /> -->

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
      { label: "Treinos", icon: "pi pi-map", command: () => {} },
    ],
  },
]);

const home = ref({
  label: "Página Inicial",
});

const breadcrumbItem = ref([{ label: "Alunos" }, { label: "Perfil do aluno" }]);
</script>

<style lang="scss" scoped>
.layout {
  background-color: #f8fafc;
  height: 100vh;
  display: flex;

  &__aside {
    width: 250px;
    padding: 1rem;
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
    margin: 1rem 1rem 1rem 0;
    background-color: #fff;
    border-radius: 1rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
}
</style>
