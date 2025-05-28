import * as api from "./api_functions";
import sandboxValues from "./sandbox";

export const handleLogin = async (
  identifier,
  setIsLoading,
  setError,
  navigate
) => {
  try {
    setIsLoading(true);
    const res = await api.login(identifier);

    if (res.success) {
      navigate("/verify", {
        state: {
          name: res.data.name || identifier,
          identifier: res.data.identifier,
          isNew: res.data.is_new_user,
        },
      });
      return;
    }

    setError(res.message);
  } catch (error) {
    setError(error.message);
  } finally {
    setIsLoading(false);
  }
};

export const handleLogout = async (navigate) => {
  try {
    await api.logout();
    navigate("/login");
    return;
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

export const handleVerify = async (
  identifier,
  code,
  setIsLoading,
  setError,
  navigate
) => {
  if (code.trim().length < 4) {
    return;
  }

  try {
    setIsLoading(true);
    const res = await api.verify(identifier, code);

    if (res.success) {
      navigate("/home");
      return;
    }

    setError(res.message);
  } catch (error) {
    setError(error.message);
  } finally {
    setIsLoading(false);
  }
};

export const handleHomepage = async (
  handleProfileUpdate,
  setIsLoading,
  setError
) => {
  try {
    setIsLoading(true);
    const res = await api.profileInfo();
    if (res.success) {
      handleProfileUpdate(res.data);
      return;
    }

    setError(res.message);
  } catch (error) {
    setError(error.message);
  } finally {
    setIsLoading(false);
  }
};

export const handleFetchProfile = async (onSuccess, onError, setIsLoading) => {
  try {
    setIsLoading(true);
    const res = await api.fetchProfile();
    if (res.success) {
      onSuccess(res);
    }

    onError(res);
  } catch (error) {
    onError(error.message);
  } finally {
    setIsLoading(false);
  }
};

export const handleUpdateProfile = async (
  data,
  onSuccess,
  onError,
  setIsLoading
) => {
  try {
    setIsLoading(true);
    const res = await api.updateProfile(data);
    if (res.success) {
      onSuccess({ ...res, action: "profile" });
      return;
    }

    onError(res);
  } catch (error) {
    onError(error);
  } finally {
    setIsLoading(false);
  }
};

export const handleSendOtp = async (data, onSuccess, onError, setIsLoading) => {
  try {
    setIsLoading(true);
    const res = await api.sendOtp(data);
    if (res.success) {
      onSuccess(res);
      return;
    }

    onError(res);
  } catch (error) {
    onError(error);
  } finally {
    setIsLoading(false);
  }
};

export const handleUpdateEmail = async (
  data,
  onSuccess,
  onError,
  setIsLoading
) => {
  try {
    setIsLoading(true);
    const res = await api.updateEmail(data);
    if (res.success) {
      onSuccess({ ...res, action: "email" });
      return;
    }

    onError(res);
  } catch (error) {
    onError(error);
  } finally {
    setIsLoading(false);
  }
};

export const handleUpdateMobile = async (
  data,
  onSuccess,
  onError,
  setIsLoading
) => {
  try {
    setIsLoading(true);
    const res = await api.updateMobile(data);
    if (res.success) {
      onSuccess({ ...res, action: "mobile" });
      return;
    }

    onError(res);
  } catch (error) {
    onError(error);
  } finally {
    setIsLoading(false);
  }
};

export const handleVerifyAccount = async (
  data,
  onSuccess,
  onError,
  setIsLoading
) => {
  try {
    setIsLoading(true);
    const res = await api.verifyAccount(data);
    if (res.success) {
      onSuccess(res);
      return;
    }

    onError(res);
  } catch (error) {
    onError(error);
  } finally {
    setIsLoading(false);
  }
};

export const handleFetchAccountType = async (
  onSuccess,
  onError,
  setIsLoading
) => {
  try {
    setIsLoading(true);
    const res = await api.fetchAccountType();
    if (res.success) {
      onSuccess(res);
      return;
    }

    onError(res);
  } catch (error) {
    onError(error);
  } finally {
    setIsLoading(false);
  }
};

export const handleUploadFile = async (
  data,
  onSuccess,
  onError,
  setIsLoading
) => {
  try {
    setIsLoading(true);
    const res = await api.uploadFile(data);
    if (res.success) {
      onSuccess(res);
      return;
    }

    onError(res);
  } catch (error) {
    onError(error);
  } finally {
    setIsLoading(false);
  }
};

export const handleVerifyOtp = async (
  data,
  onSuccess,
  onError,
  setIsLoading
) => {
  try {
    setIsLoading(true);
    console.log(data);
    const res = await api.verifyOtp(data);
    if (res.success) {
      onSuccess({ ...res.data, action: "otp" });
      return;
    }

    onError(res);
  } catch (error) {
    onError(error);
  } finally {
    setIsLoading(false);
  }
};

//Order functions
export const handleFetchCountries = async (
  onSuccess,
  onError,
  setIsLoading
) => {
  try {
    setIsLoading(true);
    const res = await api.fetchCountries();
    if (res.success) {
      onSuccess(res);
      return;
    }

    onError(res);
  } catch (error) {
    onError(error);
  } finally {
    setIsLoading(false);
  }
};

//Order functions
export const handleFetchCities = async (
  data,
  onSuccess,
  onError,
  setIsLoading = () => {}
) => {
  try {
    setIsLoading(true);
    const res = await api.fetchCities(data);
    if (res.success) {
      onSuccess(res);
      return;
    }

    onError(res);
  } catch (error) {
    onError(error);
  } finally {
    setIsLoading(false);
  }
};

//WIP
export const handleCarriers = async (onSuccess, onError) => {
  try {
    const res = await api.getCarriers();
    if (res.success) {
      onSuccess(res);
      return;
    }

    onError(res);
  } catch (error) {
    onError(error);
  } finally {
  }
};

export const handleValidateOrder = async (
  data,
  onSuccess,
  onError,
  setIsLoading
) => {
  //TODO: Sandbox code
  // if (1 == 1) {
  //   setIsLoading(true);
  //   setTimeout(() => {
  //     setIsLoading(false);

  //     if (data.step == 1) {
  //       onSuccess({
  //         success: true,
  //         message: "Order validated successfully",
  //         data: {
  //           carriers: sandboxValues.carrierRates,
  //           pickupMethods: sandboxValues.pickupMethods,
  //           serviceTypes: sandboxValues.serviceTypes,
  //         },
  //       });

  //       // onError({
  //       //   success: false,
  //       //   message: "Failed to validate order from API",
  //       //   data: {
  //       //     "customer.district": ["Very far. cannot reach"],
  //       //     "customer.name": ["Only Mubashir allowed"],
  //       //   },
  //       // });
  //       return;
  //     }

  //     if (data.step == 2) {
  //       onSuccess({
  //         success: true,
  //         message: "Order validated successfully",
  //         data: {
  //           bill: sandboxValues.bill,
  //           total_amount: 87.67,
  //         },
  //       });
  //     }

  //     if (data.step == 3) {
  //       onSuccess({
  //         success: true,
  //         message: "Order created successfully",
  //       });
  //     }
  //   }, 1000);
  //   return;
  // }

  try {
    setIsLoading(true);
    const res = await api.validateOrder(data);
    if (res.success) {
      onSuccess(res);
      return;
    }

    onError(res);
  } catch (error) {
    onError(error);
  } finally {
    setIsLoading(false);
  }
};

export const handleGetOrder = async (data, onSuccess, onError, setIsLoading) => {
  try {
    setIsLoading(true);
    const res = await api.getOrder(data);
    if (res.success) {
      onSuccess(res);
      return;
    }

    onError(res);
  } catch (error) {
    onError(error);
  } finally {
    setIsLoading(false);
  }
};

export const handleGetOrders = async (onSuccess, onError, setIsLoading) => {
  try {
    setIsLoading(true);
    const res = await api.getOrders();
    if (res.success) {
      onSuccess(res);
      return;
    }

    onError(res);
  } catch (error) {
    onError(error);
  } finally {
    setIsLoading(false);
  }
};
