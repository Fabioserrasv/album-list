import ImageDisco from "../assets/images/disco.png";
import { AlbumImage } from "../entities/Album";

export function getImageExtraLarge(albumImage: Partial<AlbumImage>): string {
  return albumImage.large || ImageDisco;
}