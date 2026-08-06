import ApiService from "./ApiService";

const TokangService = {
  getAll() {
    return ApiService.get("tokang-kampus");
  },
};

export default TokangService;
