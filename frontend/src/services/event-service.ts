import { EventServer, getCloseEventServers } from "../api/event";
import { Event } from "../entities/event";

function convertEventServerToEvent(eventServer: EventServer): Event {
  return {
    name: eventServer.name,
    description: eventServer.description,
    address: eventServer.address,
    city: eventServer.city,
    datatime: eventServer.datatime,
    user: {
      username: eventServer.user.username
    } 
  }
}


export class EventService {
  static async getCloseEvents(): Promise<Event[]>  {
    const eventServers = await getCloseEventServers();
    return eventServers.map(convertEventServerToEvent);
  }
}