import type { Product } from "~/types/product";
import type { loginResponse, user } from "~/types/user";
export const useAuthStore = defineStore(
  "user",
  () => {
    const user = ref<user | null>(null);
    const wishlist = ref<Product[]>([]);
    const token = useCookie("auth_token");

    const isLoggedIn = computed(() => !!user.value || !!token.value);

    async function login(credentials: { email: string; password: string }) {
      try {
        const data = await $fetch<loginResponse>("/api/auth/login", {
          method: "POST",
          body: credentials,
        });

        user.value = data.user;
        wishlist.value = data.wishlist;

        return { success: true };
      } catch (error: any) {
        const message = error.data?.statusMessage || "Something went wrong";
        return { success: false, message };
      }
    }
    function logout() {
      user.value = null;
      wishlist.value = [];
      navigateTo("/login");
    }
    return {
      user,
      wishlist,
      isLoggedIn,
      login,
      logout,
    };
  },
  {
    persist: true,
  },
);
