import { apiAxios } from "../infra/apiAxios";

export type EventServer = {
  name: string;
  description: string;
  address: string;
  city: string;
  datatime: string;
  user: {
    username: string;  
  } 
}


export async function sendScoreAlbum(
  name: string,
  description: string,
  address: string,
  city: string,
  datatime: string
): Promise<void> {
	await apiAxios.post("/album/score", {
    name,
    description,
    address,
    city,
    datatime
  });
}

export async function getCloseEventServers(): Promise<EventServer[]> {
  const response = await apiAxios.get("/event/list");
  return response.data;
}
