import { defineStore } from "pinia";
import CdcService from "@/core/services/CdcService";

interface WebinarState {
  webinar: any;
  loading: boolean;
  error: string | null;
}

export const useWebinarStore = defineStore("webinar", {
  state: (): WebinarState => ({
    webinar: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchWebinar() {
      this.loading = true;
      this.error = null;
      try {
        const response = await CdcService.getWebinar();
        this.webinar = response.data;
      } catch (error: any) {
        this.error = error.message || "Failed to fetch webinar";
        console.error("Error fetching webinar:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});