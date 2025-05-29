import { post, get, put, del } from "./api";

export const getHomeData = async () => {
  return get("/web/homepage");
};

export const getTrackArts = async (data) => {
  return post("/fetch-v2/track-arts", data);
};
export const getGenre = async () => {
  return get("/fetch-v2/genre");
};

// Add more API functions here as needed
// For example:
// - Order functions
// - Product functions
// - Payment functions
// - etc.
