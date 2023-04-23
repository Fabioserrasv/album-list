import { AlbumServer, sendScoreAlbum, TrackServer } from "../api/album";
import { Album, ScoreAlbum, Track } from "../entities/Album";
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

function convertAlbumServerToScoreAlbum({
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

async function testAlbumServers(): Promise<AlbumServer[]> {
  return [
    {
      score: 5,
      artist: {
        name: "NCT 127",
        image_url: "",
      },
      album: {
        image_url: "",
        name: "NCT #127",
        tracks: [],
        url: "oioi oioii"
      }
    },
    {
      score: 6,
      artist: {
        name: "Odd Future",
        image_url: "",
      },
      album: {
        image_url: "",
        name: "12 Odd Future Songs",
        tracks: [],
        url: "oioi oioii"
      }
    }
  ]
}

export class AlbumService {
  static async sendScore(score: number, album: Album) {
    const scoreAlbum = convertFormatterSendScoreAlbumToAlbumServer(score, album);
    await sendScoreAlbum(scoreAlbum);
  }

  static async getAlbums(): Promise<ScoreAlbum[]> {
    const albums = await testAlbumServers();
    return albums.map(convertAlbumServerToScoreAlbum);
  }

  static async getScore(album: string, artist: string): Promise<number> {  
    return 6;
  }
}