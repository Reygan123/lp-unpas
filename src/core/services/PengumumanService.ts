import ApiService from "./ApiService";

const PengumumanService = {
  getAll() {
    return ApiService.get("akademik/pengumuman");
  },
};

export default PengumumanService;
