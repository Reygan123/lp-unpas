import { defineStore } from "pinia";
import LegalitasService from "@/core/services/LegalitasService";

interface LegalitasState {
  legalitas: any[];
  currentLegalitas: any[];
  loading: boolean;
  error: string | null;
}

export const useLegalitasStore = defineStore("legalitas", {
  state: (): LegalitasState => ({
    legalitas: [],
    currentLegalitas: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchLegalitas() {
      this.loading = true;
      this.error = null;
      try {
        const response = await LegalitasService.getAll();
        this.legalitas = response.data;
      } catch (error: any) {
        this.error = error.message || "Failed to fetch legalitas";
        console.error("Error fetching legalitas:", error);
      } finally {
        this.loading = false;
      }
    },

    async fetchLegalitasHome() {
      this.loading = true;
      this.error = null;
      try {
        const response = await LegalitasService.getAllHome();
        this.legalitas = response.data;
      } catch (error: any) {
        this.error = error.message || "Failed to fetch legalitas";
        console.error("Error fetching legalitas:", error);
      } finally {
        this.loading = false;
      }
    },

    async fetchLegalitasbyId(id: number) {
      this.loading = true;
      this.error = null;
      try {
        const legalitas = await LegalitasService.getById(id);
        this.currentLegalitas = legalitas.data;
      } catch (error: any) {
        this.error = error.message || "Failed to fetch legalitas";
        console.error("Error fetching legalitas:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
