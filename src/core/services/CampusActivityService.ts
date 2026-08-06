import ApiService from "./ApiService";

const ActivityService = {
  getAll() {
    return ApiService.get("kemahasiswaan/kegiatan");
  },

  getById(slug: string) {
    return ApiService.get(`kemahasiswaan/kegiatan/${slug}`)
  },
};

export default ActivityService;
