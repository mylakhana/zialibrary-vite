import * as api from "./api_functions";
import sandboxValues from "./sandbox";

export const handleGetHomeData = async (
  onSuccess,
  onError,
  setIsLoading = () => {}
) => {
  try {
    setIsLoading(true);
    const res = await api.getHomeData();
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
