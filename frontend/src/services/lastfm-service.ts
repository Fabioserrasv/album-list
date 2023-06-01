import { searchAlbum, Album as AlbumServer, Track as TrackServer, AlbumImage as AlbumImageServer, getAlbumInfo } from "../api/lastfm";
import { Album, AlbumImage, Track } from "../entities/album";

function convertTrackServerToTrack(track: TrackServer): Track {
  return {
    duration: track.duration || 0,
    name: track.name,
    position: track["@attr"].rank || 0
  }
}

function convertTracksServerToTracks(tracks: TrackServer[] | TrackServer): Track[]{
  if(tracks instanceof Array){
    return tracks.map(convertTrackServerToTrack)
  }

  return [tracks].map(convertTrackServerToTrack)
}

function convertAlbumImageServerToAlbumImage(albumImgs: AlbumImageServer[]): Partial<AlbumImage> {
  return albumImgs.reduce((acc, item) => {
    acc[item['size']] = item['#text']; 
     return acc
  }, {} as Partial<AlbumImage>)
}

function convertAlbumServerToAlbum(album: AlbumServer): Album {
  return {
    artist: album.artist,
    name: album.name,
    image: convertAlbumImageServerToAlbumImage(album.image),
    url: album.url,
    tracks: album.tracks && convertTracksServerToTracks(album.tracks.track) 
  }
}

export class LastmService{
  static async searchAlbum(album: string): Promise<Album[]>{
    const albums = await searchAlbum(album);
    return albums.map(convertAlbumServerToAlbum)
  }

  static async getAlbumInfo(album: string, artist: string): Promise<Album>{
    return convertAlbumServerToAlbum(await getAlbumInfo(album, artist))
  }
}