import { defineStore } from "pinia";
import CdcService from "@/core/services/CdcService";

interface AlumniNetworkingState {
  alumniNetworking: any;
  loading: boolean;
  error: string | null;
}

export const useAlumniNetworkingStore = defineStore("alumniNetworking", {
  state: (): AlumniNetworkingState => ({
    alumniNetworking: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchAlumniNetworking() {
      this.loading = true;
      this.error = null;
      try {
        const response = await CdcService.getAlumniNetworking();
        this.alumniNetworking = response.data;
      } catch (error: any) {
        this.error = error.message || "Failed to fetch alumni networking";
        console.error("Error fetching alumni networking:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});