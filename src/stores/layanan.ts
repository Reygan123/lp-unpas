import { defineStore } from "pinia";
import LayananService from "@/core/services/LayananService";

interface LayananState {
  layanan: any;
  loading: boolean;
  error: string | null;
}

export const useLayananStore = defineStore("layanan", {
  state: (): LayananState => ({
    layanan: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchLayanan() {
      this.loading = true;
      this.error = null;
      try {
        const response = await LayananService.getAll();
        this.layanan = response.data;
      } catch (error: any) {
        this.error = error.message || "Failed to fetch layanan";
        console.error("Error fetching layanan:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
