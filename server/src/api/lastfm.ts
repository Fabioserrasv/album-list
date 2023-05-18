import { apiLastFm } from "../infra/apiLastfm";
import { API_LASTFM_KEY } from "../config/env";

export type AlbumImage = {
  '#text': string;
  size: 'large' | 'medium' | 'small' | 'extralarge';
}

export type Track = {
  "streamable": {
    "fulltrack": string;
    "#text": string;
  },
  "duration": any,
  "url": string;
  "name": string;
  "@attr": {
    "rank": number
  },
  "artist": {
    "url": string;
    "name": string;
    "mbid": string;
  }
}

export type Album = {
  artist: string;
  name: string;
  image: AlbumImage[];
  url: string;
  mbid: string;
  tracks?: {
    track: Track[] | Track
  }
}

const essentialParameters = '&api_key=' + API_LASTFM_KEY + '&format=json';

export async function searchAlbum(album: string): Promise<Album[]> {
	const response = await apiLastFm.get("?method=album.search&album="+album+essentialParameters);
  return response.data.results.albummatches.album;
}

export async function getAlbumInfo(album: string, artist: string): Promise<Album>{
  const response = await apiLastFm.get(`?method=album.getinfo&artist=${artist}&album=${album}${essentialParameters}`)
  return response.data.album
}