export default defineNitroPlugin(async () => {
  const storage = useStorage("data");

  const existingEmail = await storage.getItem<string>("auth:email");
  if (!existingEmail) {
    await storage.setItem("auth:email", "harsh@gmail.com");
    await storage.setItem("auth:password", "1234");
  }
});
