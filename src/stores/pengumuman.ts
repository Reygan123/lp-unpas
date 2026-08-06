import { defineStore } from "pinia";
import PengumumanService from "@/core/services/PengumumanService";

interface PengumumanState {
  pengumuman: any;
  loading: boolean;
  error: string | null;
}

export const usePengumumanStore = defineStore("pengumuman", {
  state: (): PengumumanState => ({
    pengumuman: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchPengumuman() {
      this.loading = true;
      this.error = null;
      try {
        const response = await PengumumanService.getAll();
        this.pengumuman = response.data;
      } catch (error: any) {
        this.error = error.message || "Failed to fetch pengumuman";
        console.error("Error fetching pengumuman:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
