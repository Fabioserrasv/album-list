import { apiLastFm } from "../infra/apiLastfm";
import { API_LASTFM_KEY } from "../config/env";

export type Album = {
  artist: string;
  name: string;
  image: string[];
  url: string;
  mbid: string;
}

const essentialParameters = '&api_key=' + API_LASTFM_KEY + '&format=json';

export async function searchAlbum(album: string): Promise<Album[]> {
	const response = await apiLastFm.get("?method=album.search&album="+album+essentialParameters);
  return response.data.results.albummatches;
}