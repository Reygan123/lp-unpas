import { defineStore } from "pinia";
import ProgramService from "@/core/services/ProgramService";

interface ProgramState {
  program: any;
  loading: boolean;
  error: string | null;
}

export const useProgramStore = defineStore("program", {
  state: (): ProgramState => ({
    program: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchProgram() {
      this.loading = true;
      this.error = null;
      try {
        const response = await ProgramService.getAll();
        this.program = response.data;
      } catch (error: any) {
        this.error = error.message || "Failed to fetch program";
        console.error("Error fetching program:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
