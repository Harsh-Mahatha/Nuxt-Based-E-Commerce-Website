interface Order {
  id: string;
  time: string;
  total: number;
  items: { id: string; thumbnail: string }[];
}

export default defineEventHandler(async (event) => {
  const storage = useStorage("data");

  const keys = await storage.getKeys("orders");

  const orders = (
    await Promise.all(
      keys.map(async (key) => {
        return await storage.getItem<Order>(key);
      }),
    )
  ).filter((o): o is Order => Boolean(o));

  return orders.sort(
    (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime(),
  );
});
