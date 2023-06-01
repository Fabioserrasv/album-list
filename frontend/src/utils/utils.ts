import ImageDisco from "../assets/images/disco.png";
import { AlbumImage } from "../entities/album";

export function getImageExtraLarge(albumImage: Partial<AlbumImage>): string {
  return albumImage.large || ImageDisco;
}