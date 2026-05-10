export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;

  const storage = useStorage("data");
  const storedEmail =
    (await storage.getItem<string>("auth:email")) ?? "harsh@gmail.com";
  const storedPassword =
    (await storage.getItem<string>("auth:password")) ?? "1234";

  if (email === storedEmail && password === storedPassword) {
    const user = {
      id: "1847",
      name: "Harsh Mahatha",
      email: storedEmail,
      role: "customer",
    };
    const token = "secure-jwt-example-token";
    setCookie(event, "auth_token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24, // 1 day in seconds
    });
    return {
      user,
      wishlist: [],
    };
  }

  throw createError({
    statusCode: 401,
    statusMessage: "Invalid email or password",
  });
});
