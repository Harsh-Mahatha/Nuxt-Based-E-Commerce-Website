export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { items, total, time } = body;

  if (!items || items.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "Cannot place an empty order",
    });
  }

  const orderId = `ORD-${Date.now()}-${Math.random().toString(36).toUpperCase().substring(2, 6)}`;

  const newOrder = {
    id: orderId,
    items,
    total,
    time,
    status: "Placed",
  };

  const storage = useStorage("data");
  await storage.setItem(`orders:${orderId}`, newOrder);

  return {
    success: true,
    id: orderId,
  };
});
