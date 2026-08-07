import ApiService from "./ApiService";

const PengabdianService = {
  getAll() {
    return ApiService.get("pengabdian");
  },
};

export default PengabdianService;
