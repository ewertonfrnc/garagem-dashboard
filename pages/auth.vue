<template>
  <div class="auth">
    <Toast />

    <div class="auth__card">
      <Card>
        <template #content>
          <AuthRegisterForm v-if="!isLogin" />
          <AuthLoginForm v-else />
        </template>
        <template #footer>
          <div class="auth__card-footer">
            <p>
              <span>Já possui uma conta?</span>
              <Button label="Iniciar sessão" link @click="toggleForm" />
            </p>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const isLogin = ref(false);

function toggleForm() {
  isLogin.value = !isLogin.value;
}
</script>

<style lang="scss" scoped>
.auth {
  display: grid;
  place-content: center;
  height: 100vh;
  background-color: #f0f0f0;

  &__card {
    width: 600px;
  }

  &__card-content {
    display: flex;
    flex-direction: column;
    padding: 2rem 3rem;
  }

  &__card-footer {
    display: flex;
    justify-content: center;
  }
}
</style>
