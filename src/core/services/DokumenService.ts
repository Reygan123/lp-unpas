import ApiService from "./ApiService";

const DokumenService = {
  getAll() {
    return ApiService.get("akademik/panduan");
  },
  getDownloadUrl(id: number | string) {
    return `${import.meta.env.VITE_APP_BE_URL}akademik/dokumen/${id}/download`;
  },
};

export default DokumenService;