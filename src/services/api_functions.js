import { post, get, put, del } from "./api";

// Authentication functions
export const login = async (identifier) => {
  return post("/auth/login", { identifier });
};

export const logout = async () => {
  return post("/auth/logout");
};

export const verify = async (identifier, code) => {
  return post("/auth/verify", { identifier, code });
};

//profile info for homepage and sidebar
export const profileInfo = async () => {
  return get("/profile/info");
};

//settings/profile
export const fetchProfile = async () => {
  return get("/profile/fetch-profile");
};

//settings/profile submit
export const updateProfile = async (data) => {
  return post("/profile/update-profile", data);
};

export const updateEmail = async (data) => {
  return post("/profile/update-email", data);
};

export const updateMobile = async (data) => {
  return post("/profile/update-mobile", data);
};

export const sendOtp = async (data) => {
  return post("/profile/send-otp", data);
};

export const verifyOtp = async (data) => {
  return post("/profile/verify-otp", data);
};

//Order functions
export const fetchCountries = async () => {
  return get("/web/fetch-countries");
};

export const fetchCities = async (data) => {
  return post("/web/fetch-cities", data);
};

export const searchAddress = async (data) => {
  return post("/web/search-address", data);
};

export const getCarriers = async () => {
  return get("/web/all-carriers");
};

// User functions
export const getUserProfile = async () => {
  return get("/user/profile");
};

export const updateUserProfile = async (data) => {
  return put("/user/profile", data);
};

export const fetchAccountType = async () => {
  return get("/profile/fetch-account-type");
};

export const verifyAccount = async (data) => {
  return post("/profile/verify-account", data);
};

export const uploadFile = async (data) => {
  return post("/profile/upload", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const validateOrder = async (data) => {
  return post("/order/validate-order", data);
};

export const getOrder = async (data) => {
  return post("/order/get-single-order", data);
};


/**********************/
/********TABLE*********/
/**********************/

export const getOrders = async () => {
  return get("/table/orders");
};

// Add more API functions here as needed
// For example:
// - Order functions
// - Product functions
// - Payment functions
// - etc.
