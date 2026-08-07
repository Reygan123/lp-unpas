import { defineStore } from "pinia";
import OrmawaService from "@/core/services/OrmawaService";

interface OrmawaDetailState {
  ormawa: any;
  pengurus: any;
  programKerja: any;
  berita: any;
  galeri: any;
  dokumen: any;
  loading: boolean;
  error: string | null;
}

export const useOrmawaDetailStore = defineStore("ormawaDetail", {
  state: (): OrmawaDetailState => ({
    ormawa: null,
    pengurus: [],
    programKerja: [],
    berita: [],
    galeri: [],
    dokumen: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchOrmawaDetail(slug: string) {
      this.loading = true;
      this.error = null;
      try {
        const response = await OrmawaService.getBySlug(slug);
        this.ormawa = response.data;
      } catch (error: any) {
        this.error = error.message || "Failed to fetch ormawa detail";
        console.error("Error fetching ormawa detail:", error);
      } finally {
        this.loading = false;
      }
    },

    async fetchPengurus(slug: string) {
      this.loading = true;
      this.error = null;
      try {
        const response = await OrmawaService.getPengurus(slug);
        this.pengurus = response.data;
      } catch (error: any) {
        this.error = error.message || "Failed to fetch pengurus";
        console.error("Error fetching pengurus:", error);
      } finally {
        this.loading = false;
      }
    },

    async fetchProgramKerja(slug: string) {
      this.loading = true;
      this.error = null;
      try {
        const response = await OrmawaService.getProgramKerja(slug);
        this.programKerja = response.data;
      } catch (error: any) {
        this.error = error.message || "Failed to fetch program kerja";
        console.error("Error fetching program kerja:", error);
      } finally {
        this.loading = false;
      }
    },

    async fetchBerita(slug: string) {
      this.loading = true;
      this.error = null;
      try {
        const response = await OrmawaService.getBerita(slug);
        this.berita = response.data;
      } catch (error: any) {
        this.error = error.message || "Failed to fetch berita";
        console.error("Error fetching berita:", error);
      } finally {
        this.loading = false;
      }
    },

    async fetchGaleri(slug: string) {
      this.loading = true;
      this.error = null;
      try {
        const response = await OrmawaService.getGaleri(slug);
        this.galeri = response.data;
      } catch (error: any) {
        this.error = error.message || "Failed to fetch galeri";
        console.error("Error fetching galeri:", error);
      } finally {
        this.loading = false;
      }
    },

    async fetchDokumen(slug: string) {
      this.loading = true;
      this.error = null;
      try {
        const response = await OrmawaService.getDokumen(slug);
        this.dokumen = response.data;
      } catch (error: any) {
        this.error = error.message || "Failed to fetch dokumen";
        console.error("Error fetching dokumen:", error);
      } finally {
        this.loading = false;
      }
    },

    async fetchAllDetail(slug: string) {
      this.loading = true;
      this.error = null;
      try {
        const [ormawaRes, pengurusRes, programKerjaRes, beritaRes, galeriRes, dokumenRes] = await Promise.all([
          OrmawaService.getBySlug(slug),
          OrmawaService.getPengurus(slug),
          OrmawaService.getProgramKerja(slug),
          OrmawaService.getBerita(slug),
          OrmawaService.getGaleri(slug),
          OrmawaService.getDokumen(slug),
        ]);
        this.ormawa = ormawaRes.data;
        this.pengurus = pengurusRes.data;
        this.programKerja = programKerjaRes.data;
        this.berita = beritaRes.data;
        this.galeri = galeriRes.data;
        this.dokumen = dokumenRes.data;
      } catch (error: any) {
        this.error = error.message || "Failed to fetch ormawa detail data";
        console.error("Error fetching ormawa detail data:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});