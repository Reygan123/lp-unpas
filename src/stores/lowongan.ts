import { defineStore } from "pinia";
import CdcService from "@/core/services/CdcService";

interface LowonganState {
  lowongan: any;
  loading: boolean;
  error: string | null;
}

export const useLowonganStore = defineStore("lowongan", {
  state: (): LowonganState => ({
    lowongan: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchLowongan() {
      this.loading = true;
      this.error = null;
      try {
        const response = await CdcService.getLowongan();
        this.lowongan = response.data;
      } catch (error: any) {
        this.error = error.message || "Failed to fetch lowongan";
        console.error("Error fetching lowongan:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});