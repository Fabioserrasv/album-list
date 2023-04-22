import { apiAxios } from "../infra/apiAxios";

type Track = {
  name: string;
  duration: number;
  position: number;
}

type SendScoreAlbum = {
  score: number;
  album:{
    name: string;
    url: string;
    image_url: string;
    tracks: Track[];
  },
  artist: {
    name: string,
    image_url: string;
  },
}



export async function sendAlbum(data: SendScoreAlbum): Promise<void> {
	await apiAxios.post("/album/score", data);
}