import { post, get, put, del } from "./api";

export const getHomeData = async () => {
  return get("/web/homepage");
};

// Add more API functions here as needed
// For example:
// - Order functions
// - Product functions
// - Payment functions
// - etc.
