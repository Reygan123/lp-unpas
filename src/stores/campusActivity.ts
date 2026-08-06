import { defineStore } from "pinia";
import ActivityService from "@/core/services/CampusActivityService";

interface ActivityStore {
  activity: any[];
  currentActivity: any[];
  loading: boolean;
  error: string | null;
}

export const useActivityStore = defineStore("activity", {
  state: (): ActivityStore => ({
    activity: [],
    currentActivity: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchActivity() {
      this.loading = true;
      this.error = null;
      try {
        const response = await ActivityService.getAll();
        this.activity = response.data;
      } catch (error: any) {
        this.error = error.message || "Failed to fetch activity";
        console.error("Error fetching activity:", error);
      } finally {
        this.loading = false;
      }
    },

    async fetchActivitybySlug(slug: string) {
      this.loading = true;
      this.error = null;
      try {
        const activity = await ActivityService.getById(slug);
        this.currentActivity = activity.data;
      } catch (error: any) {
        this.error = error.message || "Failed to fetch activity";
        console.error("Error fetching activity:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
