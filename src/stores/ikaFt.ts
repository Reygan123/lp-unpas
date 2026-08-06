import { defineStore } from "pinia";
import IkaFtService from "@/core/services/IkaFtService";

interface IkaFtState {
  ikaft: any;
  loading: boolean;
  error: string | null;
}

export const useIkaFtStore = defineStore("ikaft", {
  state: (): IkaFtState => ({
    ikaft: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchIkaFt() {
      this.loading = true;
      this.error = null;
      try {
        const response = await IkaFtService.getAll();
        this.ikaft = response.data;
      } catch (error: any) {
        this.error = error.message || "Failed to fetch ikaft";
        console.error("Error fetching ikaft:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
