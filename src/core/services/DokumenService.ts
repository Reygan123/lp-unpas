import ApiService from "./ApiService";

const DokumenService = {
  getAll() {
    return ApiService.get("akademik/panduan");
  },
};

export default DokumenService;
