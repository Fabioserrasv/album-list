export type AlbumImage = {
  large: string;
  medium: string;
  small: string;
  extralarge: string;
  mega: string;
}

export type Track = {
  duration: number;
  name: string;
  position: number;
}

export type Album = {
  artist: string;
  name: string;
  image: Partial<AlbumImage>;
  url: string;
  tracks?: Track[]
}

export type ScoreAlbum = {
  score: number;
  album:{
    name: string;
    url: string;
    imageUrl: string;
    tracks: Track[];
  },
  artist: {
    name: string,
    imageUrl: string;
  }
}

