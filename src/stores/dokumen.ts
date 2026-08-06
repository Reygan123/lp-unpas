import { defineStore } from "pinia";
import DokumenService from "@/core/services/DokumenService";

interface DokumenState {
  dokumen: any;
  loading: boolean;
  error: string | null;
}

export const useDokumenStore = defineStore("dokumen", {
  state: (): DokumenState => ({
    dokumen: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchDokumen() {
      this.loading = true;
      this.error = null;
      try {
        const response = await DokumenService.getAll();
        this.dokumen = response.data;
      } catch (error: any) {
        this.error = error.message || "Failed to fetch dokumen";
        console.error("Error fetching dokumen:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
