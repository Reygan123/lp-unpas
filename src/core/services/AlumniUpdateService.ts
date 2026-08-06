import ApiService from "./ApiService";

const AlumniUpdateService = {
    getAll() {
    return ApiService.get("alumni");
  },
    storeAlumniData(params: any) {
        return ApiService.post("alumni/perbarui-data", params);
    },
};

export default AlumniUpdateService;
