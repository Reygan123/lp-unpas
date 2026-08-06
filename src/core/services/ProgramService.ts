import ApiService from "./ApiService";

const ProgramService = {
  getAll() {
    return ApiService.get("akademik/program-perkuliahan");
  },
};

export default ProgramService;
