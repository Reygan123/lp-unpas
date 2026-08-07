// src/stores/agenda.ts
import { defineStore } from "pinia";
import type { Agenda } from "@/core/types/agenda";
import AgendaService from "@/core/services/AgendaService";

interface AgendaState {
  agendas: Agenda[];
  currentAgenda: Agenda | null;
  calendar: any[];
  loading: boolean;
  error: string | null;
}

export const useAgendaStore = defineStore("agenda", {
  state: (): AgendaState => ({
    agendas: [],
    currentAgenda: null,
    calendar: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchAgendas() {
      this.loading = true;
      this.error = null;
      try {
        const response = await AgendaService.getAll();
        this.agendas = response.data;
      } catch (error: any) {
        this.error = error.message || "Failed to fetch agendas";
        console.error("Error fetching agendas:", error);
      } finally {
        this.loading = false;
      }
    },

    async fetchAgendaBySlug(slug: string) {
      this.loading = true;
      this.error = null;
      try {
        const agenda = await AgendaService.getBySlug(slug);
        this.currentAgenda = agenda;
      } catch (error: any) {
        this.error = error.message || "Failed to fetch agenda";
        console.error("Error fetching agenda:", error);
      } finally {
        this.loading = false;
      }
    },

    async fetchCalendarAkademik() {
      this.loading = true;
      this.error = null;
      try {
        const response = await AgendaService.getCalendarAkademik();
        // Assuming the response contains a list of agendas, you can handle it accordingly
        this.calendar = response.data;
      } catch (error: any) {
        this.error = error.message || "Failed to fetch calendar akademik";
        console.error("Error fetching calendar akademik:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
