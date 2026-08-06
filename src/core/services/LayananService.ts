import ApiService from "./ApiService";

const LayananService = {
  getAll() {
    return ApiService.get("akademik/layanan");
  },
};

export default LayananService;
