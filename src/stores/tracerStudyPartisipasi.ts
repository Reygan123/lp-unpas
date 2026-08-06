import { defineStore } from "pinia";
import CdcService from "@/core/services/CdcService";

interface TracerStudyPartisipasiState {
  tracerStudyPartisipasi: any;
  loading: boolean;
  error: string | null;
}

export const useTracerStudyPartisipasiStore = defineStore("tracerStudyPartisipasi", {
  state: (): TracerStudyPartisipasiState => ({
    tracerStudyPartisipasi: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchTracerStudyPartisipasi() {
      this.loading = true;
      this.error = null;
      try {
        const response = await CdcService.getTracerStudyPartisipasi();
        this.tracerStudyPartisipasi = response.data;
      } catch (error: any) {
        this.error = error.message || "Failed to fetch tracer study partisipasi";
        console.error("Error fetching tracer study partisipasi:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});