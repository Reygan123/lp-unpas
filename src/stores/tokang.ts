import { defineStore } from "pinia";
import TokangService from "@/core/services/TokangService";

interface TokangState {
  tokang: any;
  loading: boolean;
  error: string | null;
}

export const useTokangStore = defineStore("tokang", {
  state: (): TokangState => ({
    tokang: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchTokang() {
      this.loading = true;
      this.error = null;
      try {
        const response = await TokangService.getAll();
        this.tokang = response.data;
      } catch (error: any) {
        this.error = error.message || "Failed to fetch tokang";
        console.error("Error fetching tokang:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
