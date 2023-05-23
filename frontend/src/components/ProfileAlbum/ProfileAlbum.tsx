import './profilealbum.styles.css';
import ImageDisco from "../../assets/images/disco.png";

type ProfileAlbumProps = {
  image?: string;
  name: string;
  artist: string;
  score?: number;
}

export function ProfileAlbum({
  image,
  name,
  artist,
  score
}: ProfileAlbumProps) {
  return (
    <div className='profile-album' style={{
       backgroundImage: `url(${image}), url(${ImageDisco})` 
       }}>
      {score != null && (
      <div className='score-info'>
        <span>{score}</span>
      </div>)}
      <div className='album-info'>
        <span>{name}</span>
        <span>{artist}</span>
      </div>
    </div>
  )
}