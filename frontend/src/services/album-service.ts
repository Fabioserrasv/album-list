import { AlbumServer, sendScoreAlbum, TrackServer } from "../api/album";
import { Album, Track } from "../entities/Album";
import { getImageExtraLarge } from "../utils/utils";

function convertTrackToTrackServer(track: Track): TrackServer {
  return track;
}

function formatterSendScoreAlbum(score: number, album: Album): AlbumServer {
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


export class AlbumService {
  static async sendScore(score: number, album: Album) {
    const scoreAlbum = formatterSendScoreAlbum(score, album);
    await sendScoreAlbum(scoreAlbum);
  }

  static async getAlbums(): Promise<[]> {
    return [];
  }
}