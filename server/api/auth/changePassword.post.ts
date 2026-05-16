export default defineEventHandler(async (event) => {
  const { oldPassword, newPassword } = await readBody(event);
  const storage = useStorage("data");

  const storedPass = await storage.getItem(`auth:password`);
  console.log(storedPass);

  const currentPassword = String(storedPass ?? "1234");

  if (oldPassword !== currentPassword) {
    throw createError({
      statusCode: 401,
      statusMessage: "The old password you entered is incorrect.",
    });
  }

  await storage.setItem(`auth:password`, newPassword);

  return { success: true };
});
