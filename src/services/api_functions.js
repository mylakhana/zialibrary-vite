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

export const getArtistGenres = async (id) => {
  return post("/fetch-v2/genre-of-artist", { id });
};

export const getArtistTracks = async (data) => {
  return post("/fetch-v2/tracks-of-artist", data);
};

export const getArtists = async () => {
  return get("/fetch-v2/artists");
};

export const getAlbumGroups = async () => {
  return get("/fetch-v2/dynamic-album-groups");
};

export const getSubAlbums = async (data) => {
  return post("/fetch-v2/dynamic-sub-albums", data);
};

export const getPlaylist = async (data) => {
  return post("/web/playlist", data);
};

export const getAlbumDetails = async (data) => {
  return post("/web/album", data);
};

export const getAlbumTracks = async (data) => {
  return post("/fetch-v2/tracks-of-album", data);
};


// Add more API functions here as needed
// For example:
// - Order functions
// - Product functions
// - Payment functions
// - etc.
