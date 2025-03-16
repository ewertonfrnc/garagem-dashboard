<template>
  <div class="register-form">
    <div class="register-form__header">
      <h1>Criar conta</h1>
      <p>Vamos começar</p>
    </div>

    <Form
      v-slot="$form"
      :initial-values
      :resolver
      class="register-form__form"
      @submit="onFormSubmit"
    >
      <div class="register-form__form-field">
        <IconField>
          <InputIcon class="pi pi-user" />
          <InputText name="name" type="text" placeholder="Nome" fluid />
        </IconField>
        <Message
          v-if="$form.name?.invalid"
          size="small"
          severity="error"
          variant="simple"
          >{{ $form.name.error?.message }}</Message
        >
      </div>

      <div class="register-form__form-field">
        <IconField>
          <InputIcon class="pi pi-envelope" />
          <InputText name="email" type="email" placeholder="Email" fluid />
        </IconField>
        <Message
          v-if="$form.email?.invalid"
          size="small"
          severity="error"
          variant="simple"
          >{{ $form.email.error?.message }}</Message
        >
      </div>

      <div class="register-form__form-field">
        <IconField>
          <InputIcon class="pi pi-lock" />
          <InputText
            name="password"
            type="password"
            placeholder="Senha"
            fluid
          />
        </IconField>
        <Message
          v-if="$form.password?.invalid"
          size="small"
          severity="error"
          variant="simple"
          >{{ $form.password.error?.message }}</Message
        >
      </div>

      <Button
        type="submit"
        label="Registrar"
        severity="contrast"
        :loading="state.loading"
      />
    </Form>
  </div>
</template>

<script lang="ts" setup>
import { z } from "zod";
import { reactive } from "vue";
import { useToast } from "primevue/usetoast";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import type { FormSubmitEvent } from "@primevue/forms/form";

const store = useAuthStore();

const toast = useToast();

const state = reactive({
  loading: false,
});

const initialValues = reactive({
  name: "",
  email: "",
  password: "",
});

const resolver = ref(
  zodResolver(
    z.object({
      name: z
        .string()
        .trim()
        .min(1, { message: "Nome de usuário é obrigatório." }),
      email: z.string().email({
        message: "Email inválido.",
      }),
      password: z
        .string()
        .min(8, { message: "Senha deve ter pelo menos 8 caracteres." }),
    })
  )
);

async function onFormSubmit({ valid, values, reset }: FormSubmitEvent) {
  if (!valid) {
    return toast.add({
      severity: "warn",
      summary: "Atenção!",
      detail: "Por favor, preencha todos os campos corretamente.",
      life: 3000,
    });
  }

  state.loading = true;

  try {
    const DEFAULT_ROLE_ID = 1;
    const payload = {
      name: values.name,
      email: values.email,
      password: values.password,
      roleId: DEFAULT_ROLE_ID,
    };

    await store.register(payload);
    navigateTo("/");
  } catch {
    toast.add({
      severity: "error",
      summary: "Erro!",
      detail: "Ocorreu um erro ao registrar o usuário.",
      life: 3000,
    });
  } finally {
    state.loading = false;
    reset();
  }
}
</script>

<style lang="scss" scoped>
.register-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem 3rem;

  &__form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
