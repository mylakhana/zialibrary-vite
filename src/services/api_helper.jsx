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

export const handleGetTrackArts = async (
  data,
  onSuccess,
  onError,
  setIsLoading = () => {}
) => {
  try {
    setIsLoading(true);
    const res = await api.getTrackArts(data);
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

export const handleGetGenre = async (
  onSuccess,
  onError,
  setIsLoading = () => {}
) => {
  try {
    setIsLoading(true);
    const res = await api.getGenre();
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

export const handleGetArtistGenres = async (
  id,
  onSuccess,
  onError,
  setIsLoading = () => {}
) => {
  try {
    setIsLoading(true);
    const res = await api.getArtistGenres(id);
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

export const handleGetArtistTracks = async (
  data,
  onSuccess,
  onError,
  setIsLoading = () => {}
) => {
  try {
    setIsLoading(true);
    const res = await api.getArtistTracks(data);
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

export const handleGetArtists = async (
  onSuccess,
  onError,
  setIsLoading = () => {}
) => {
  try {
    setIsLoading(true);
    const res = await api.getArtists();
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

export const handleGetAlbumGroups = async (
  onSuccess,
  onError,
  setIsLoading = () => {}
) => {
  try {
    setIsLoading(true);
    const res = await api.getAlbumGroups();
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

export const handleGetPlaylist = async (
  data,
  onSuccess,
  onError,
  setIsLoading = () => {}
) => {
  try {
    setIsLoading(true);
    const res = await api.getPlaylist(data);
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

export const handleGetAlbumDetails = async (
  data,
  onSuccess,
  onError,
  setIsLoading = () => {}
) => {
  try {
    setIsLoading(true);
    const res = await api.getAlbumDetails(data);
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

export const handleGetSubAlbums = async (
  data,
  onSuccess,
  onError,
  setIsLoading = () => {}
) => {
  try {
    setIsLoading(true);
    const res = await api.getSubAlbums(data);
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

export const handleGetAlbumTracks = async (
  data,
  onSuccess,
  onError,
  setIsLoading = () => {}
) => {
  try {
    setIsLoading(true);
    const res = await api.getAlbumTracks(data);
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
