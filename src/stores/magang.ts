import { defineStore } from "pinia";
import CdcService from "@/core/services/CdcService";

interface MagangState {
  magang: any;
  loading: boolean;
  error: string | null;
}

export const useMagangStore = defineStore("magang", {
  state: (): MagangState => ({
    magang: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchMagang() {
      this.loading = true;
      this.error = null;
      try {
        const response = await CdcService.getMagang();
        this.magang = response.data;
      } catch (error: any) {
        this.error = error.message || "Failed to fetch magang";
        console.error("Error fetching magang:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});