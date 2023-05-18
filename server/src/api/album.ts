import { apiAxios } from "../infra/apiAxios";

export type TrackServer = {
  name: string;
  duration: number;
  position: number;
}

export type AlbumServer = {
  score: number;
  album:{
    name: string;
    url: string;
    image_url: string;
    tracks: TrackServer[];
  },
  artist: {
    name: string,
    image_url: string;
  },
}

export async function sendScoreAlbum(data: AlbumServer): Promise<void> {
	await apiAxios.post("/album/score", data);
}

export async function getAlbums(): Promise<AlbumServer[]> {
  const response = await apiAxios.get("/album/user-album-list");
  return response.data;
}

export async function getAlbumInfo(album: string, artist: string): Promise<AlbumServer>{
  const response = await apiAxios.get(`/album/album-info?album=${album}&artist=${artist}`);
  return response.data
}