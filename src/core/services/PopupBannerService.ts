import ApiService from "./ApiService";

const PopupBannerService = {
  getBanner() {
    return ApiService.get("popup-banner");
  },
};

export default PopupBannerService;
