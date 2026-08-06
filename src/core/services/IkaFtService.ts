import ApiService from "./ApiService";

const IkaFtService = {
  getAll() {
    return ApiService.get("ika-ft");
  },
};

export default IkaFtService;
