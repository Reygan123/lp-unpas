import { defineStore } from "pinia";
import CdcService from "@/core/services/CdcService";

interface CvReviewState {
  submitting: boolean;
  success: boolean;
  error: string | null;
}

export const useCvReviewStore = defineStore("cvReview", {
  state: (): CvReviewState => ({
    submitting: false,
    success: false,
    error: null,
  }),

  actions: {
    async submitCvReviewRequest(params: any) {
      this.submitting = true;
      this.error = null;
      this.success = false;
      try {
        await CdcService.storeCvReviewRequest(params);
        this.success = true;
      } catch (error: any) {
        this.error = error.message || "Failed to submit cv review request";
        console.error("Error submitting cv review request:", error);
      } finally {
        this.submitting = false;
      }
    },
  },
});