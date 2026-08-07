import { defineStore } from "pinia";
import PengabdianService from "@/core/services/PengabdianService";

interface PengabdianState {
  pengabdian: any;
  loading: boolean;
  error: string | null;
}

export const usePengabdianStore = defineStore("pengabdian", {
  state: (): PengabdianState => ({
    pengabdian: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchPengabdian() {
      this.loading = true;
      this.error = null;
      try {
        const response = await PengabdianService.getAll();
        this.pengabdian = response.data;
      } catch (error: any) {
        this.error = error.message || "Failed to fetch pengabdian";
        console.error("Error fetching pengabdian:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
