import ApiService from "./ApiService";

const KalenderService = {
  getAll() {
    return ApiService.get("akademik/kalender");
  },
};

export default KalenderService;
