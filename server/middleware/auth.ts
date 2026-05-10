export default defineEventHandler((event) => {
  const token = getCookie(event, "auth_token");

  if (token === "secure-jwt-example-token") {
    event.context.user = { id: "1847", role: "customer" };
  } else {
    event.context.user = null;
  }
});
