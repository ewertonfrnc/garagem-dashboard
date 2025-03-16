export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie("token").value;

  if (token && to?.name === "auth") {
    return navigateTo("/");
  }

  if (!token && to?.name !== "auth") {
    return navigateTo("/auth");
  }
});
