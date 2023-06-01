import { AlbumServer, sendScoreAlbum, TrackServer, getAlbums as getAlbumsServer, getAlbumInfo } from "../api/album";
import { Album, ScoreAlbum, Track } from "../entities/album";
import { getImageExtraLarge } from "../utils/utils";

function convertTrackToTrackServer(track: Track): TrackServer {
  return track;
}

function convertTrackServerToTrack(track: TrackServer): Track {
  return track;
}

function convertFormatterSendScoreAlbumToAlbumServer(score: number, album: Album): AlbumServer {
  const tracks = album.tracks || [];

  return {
    score: score,
    artist: {
      name: album.artist,
      image_url: getImageExtraLarge(album.image || {}),
    },
    album: {
      name: album.name,
      image_url: getImageExtraLarge(album.image || {}),
      url: album.url,
      tracks: tracks.map(convertTrackToTrackServer)
    }
  }
}

export function convertAlbumServerToScoreAlbum({
  album,
  artist,
  score
}: AlbumServer): ScoreAlbum {
  const tracks = album.tracks || [];

  return {
    score,
    album:{
      name: album.name,
      url: album.url,
      imageUrl: album.image_url,
      tracks: tracks.map(convertTrackServerToTrack)
    },
    artist: {
      name: artist.name,
      imageUrl: artist.image_url
    }
  }
}


export class AlbumService {
  static async sendScore(score: number, album: Album) {
    const scoreAlbum = convertFormatterSendScoreAlbumToAlbumServer(score, album);
    await sendScoreAlbum(scoreAlbum);
  }

  static async getAlbums(): Promise<ScoreAlbum[]> {
    const albums = await getAlbumsServer();
    return albums.map(convertAlbumServerToScoreAlbum);
  }

  static async getScore(album: string, artist: string): Promise<number> { 
    const albumServer = await getAlbumInfo(album, artist);
    return albumServer.score;
  }
}