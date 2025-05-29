import { post, get, put, del } from "./api";

export const getHomeData = async () => {
  return get("/web/homepage");
};

export const getTrackArts = async (data) => {
  return get("/fetch-v2/track-arts", data);
};

// Add more API functions here as needed
// For example:
// - Order functions
// - Product functions
// - Payment functions
// - etc.
