import { defineStore } from "pinia";
import KalenderService from "@/core/services/KalenderService";

interface KalenderState {
  kalender: any;
  loading: boolean;
  error: string | null;
}

export const useKalenderStore = defineStore("kalender", {
  state: (): KalenderState => ({
    kalender: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchKalender() {
      this.loading = true;
      this.error = null;
      try {
        const response = await KalenderService.getAll();
        this.kalender = response.data;
      } catch (error: any) {
        this.error = error.message || "Failed to fetch kalender";
        console.error("Error fetching kalender:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
