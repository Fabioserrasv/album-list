import { apiLastFm } from "../infra/apiLastfm";
import { API_LASTFM_KEY } from "../config/env";

export type AlbumImage = {
  '#text': string;
  size: 'large' | 'medium' | 'small' | 'extralarge';
}

export type Album = {
  artist: string;
  name: string;
  image: AlbumImage[];
  url: string;
  mbid: string;
}

const essentialParameters = '&api_key=' + API_LASTFM_KEY + '&format=json';

export async function searchAlbum(album: string): Promise<Album[]> {
	const response = await apiLastFm.get("?method=album.search&album="+album+essentialParameters);
  return response.data.results.albummatches.album;
}