import { defineStore } from "pinia";
import type { Faculty } from "@/core/types/fakultas";
import FakultasService from "@/core/services/FakultasService";
import { hexToCssHsl, hexToRgb } from "@/core/helpers/helper";

interface FakultasState {
  fakultas: Faculty | null;
  currentFacultyColor: string | null;
}

let fetchPromise: Promise<any> | null = null;

export const useFakultasStore = defineStore("fakultas", {
  state: (): FakultasState => ({
    fakultas: null,
    currentFacultyColor: null,
  }),

  actions: {
    async fetchFakultas() {
      if (this.fakultas) return;
      if (fetchPromise) {
        await fetchPromise;
        return;
      }
      fetchPromise = FakultasService.getDetail().then(response => {
        this.fakultas = response.data;
      }).catch(error => {
        console.error("Error fetching fakultas:", error);
      }).finally(() => {
        fetchPromise = null;
      });
      await fetchPromise;
    },

    async getFacultyColor() {
      if (this.currentFacultyColor && this.fakultas) {
        return this.currentFacultyColor;
      }

      try {
        await this.fetchFakultas();
        if (this.fakultas?.color1) {
          this.currentFacultyColor = this.fakultas.color1;

          const rgbColor = hexToRgb(this.fakultas.color1);
          const hslColor = hexToCssHsl(this.fakultas.color1);

          document.documentElement.style.setProperty('--color-primary-r', rgbColor.r.toString());
          document.documentElement.style.setProperty('--color-primary-g', rgbColor.g.toString());
          document.documentElement.style.setProperty('--color-primary-b', rgbColor.b.toString());
          document.documentElement.style.setProperty('--background', hslColor);

          return this.fakultas.color1;
        }
        return null;
      } catch (error) {
        console.error("Error fetching faculty color:", error);
        return null;
      }
    },
  },
});
