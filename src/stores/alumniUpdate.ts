import { defineStore } from "pinia";
import AlumniUpdateService from "@/core/services/AlumniUpdateService";

interface AlumniUpdateState {
    alumni: [],
  submitting: boolean;
  success: boolean;
  error: string | null;
  loading: boolean;
}

export const useAlumniUpdateStore = defineStore("alumni", {
  state: (): AlumniUpdateState => ({
    alumni: [],
    submitting: false,
    success: false,
    error: null,
    loading: false,
  }),

  actions: {
    async fetchAlumni() {
      this.loading = true;
      this.error = null;
      try {
        const response = await AlumniUpdateService.getAll();
        this.alumni = response.data;
      } catch (error: any) {
        this.error = error.message || "Failed to fetch alumni";
        console.error("Error fetching alumni:", error);
      } finally {
        this.loading = false;
      }
    },

    async submitAlumniUpdateRequest(params: any) {
      this.submitting = true;
      this.error = null;
      this.success = false;
      try {
        await AlumniUpdateService.storeAlumniData(params);
        this.success = true;
      } catch (error: any) {
        this.error = error.message || "Failed to submit alumni data";
        console.error("Error submitting alumni data:", error);
      } finally {
        this.submitting = false;
      }
    },
  },
});