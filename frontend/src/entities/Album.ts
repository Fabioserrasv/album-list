export type AlbumImage = {
  large: string;
  medium: string;
  small: string;
  extralarge: string;
  mega: string;
}

export type Track = {
  duration: any;
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

