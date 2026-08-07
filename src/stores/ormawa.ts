import { defineStore } from "pinia";
import OrmawaService from "@/core/services/OrmawaService";

interface OrmawaState {
  ormawa: any;
  loading: boolean;
  error: string | null;
}

export const useOrmawaStore = defineStore("ormawa", {
  state: (): OrmawaState => ({
    ormawa: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchOrmawa() {
      this.loading = true;
      this.error = null;
      try {
        const response = await OrmawaService.getAll();
        this.ormawa = response.data;
      } catch (error: any) {
        this.error = error.message || "Failed to fetch ormawa";
        console.error("Error fetching ormawa:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});