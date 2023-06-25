import { apiAxios } from "../infra/apiAxios";

export type EventServer = {
  name: string;
  description: string;
  address: string;
  city: string;
  datetime: string;
  user: {
    username: string;
  } 
}


export async function createEvent(
  name: string,
  description: string,
  address: string,
  city: string,
  datetime: string
): Promise<EventServer> {
	const response = await apiAxios.post("/event/create", {
    name,
    description,
    address,
    city,
    datetime
  });

  return response.data;
}

export async function getCloseEventServers(): Promise<EventServer[]> {
  const response = await apiAxios.get("/event/list");
  return response.data;
}
