import ApiService from "./ApiService";

const LegalitasService = {
  getAll() {
    return ApiService.get("legalitas");
  },

  getAllHome() {
    return ApiService.get("legalitas-home");
  },

  getById(id: number) {
    return ApiService.get(`legalitas/${id}`)
  },
};

export default LegalitasService;
