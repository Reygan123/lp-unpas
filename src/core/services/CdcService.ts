import ApiService from "./ApiService";

const CdcService = {
  getMagang() {
    return ApiService.get("cdc/magang");
  },
  getLowongan() {
    return ApiService.get("cdc/lowongan");
  },
  getWebinar() {
    return ApiService.get("cdc/webinar");
  },
  storeCvReviewRequest(params: any) {
    return ApiService.post("cdc/review-request", params);
  },
  getAlumniNetworking() {
    return ApiService.get("cdc/alumni-networking");
  },
  getTracerStudyPartisipasi() {
    return ApiService.get("cdc/tracer-study-partisipasi");
  },
};

export default CdcService;