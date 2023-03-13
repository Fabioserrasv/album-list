import { searchAlbum, Album } from "../api/lastfm";

export class LastmService{
  static async searchAlbum(album: string): Promise<Album[]>{
    const response = await searchAlbum(album);
    return response
  }
}