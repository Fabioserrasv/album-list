import { EventServer, createEvent, getCloseEventServers } from "../api/event";
import { Event } from "../entities/event";

function convertEventServerToEvent(eventServer: EventServer): Event {
  return {
    name: eventServer.name,
    description: eventServer.description,
    address: eventServer.address,
    city: eventServer.city,
    datetime: eventServer.datetime,
    user: {
      username: eventServer.user.username
    }
  }
}


export class EventService {
  static async getCloseEvents(): Promise<Event[]> {
    const eventServers = await getCloseEventServers();
    return eventServers.map(convertEventServerToEvent);
  }

  static async add(
    name: string,
    description: string,
    address: string,
    city: string,
    datetime: string
  ): Promise<Event> {
    const event = await createEvent(
      name,
      description,
      address,
      city,
      datetime
    );
    return convertEventServerToEvent(event);
  }
}