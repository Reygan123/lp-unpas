import ApiService from "./ApiService";

const OrmawaService = {
  getAll() {
    return ApiService.get("ormawa");
  },
  getBySlug(slug: string) {
    return ApiService.get("ormawa", slug);
  },
  getPengurus(slug: string) {
    return ApiService.get(`ormawa/${slug}/pengurus`);
  },
  getProgramKerja(slug: string) {
    return ApiService.get(`ormawa/${slug}/program-kerja`);
  },
  getBerita(slug: string) {
    return ApiService.get(`ormawa/${slug}/berita`);
  },
  getGaleri(slug: string) {
    return ApiService.get(`ormawa/${slug}/galeri`);
  },
  getDokumen(slug: string) {
    return ApiService.get(`ormawa/${slug}/dokumen`);
  },
};

export default OrmawaService;