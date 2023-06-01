import './profilepic.styles.css';
import ImageDisco from "../../assets/images/disco.png";

type ProfilePicProps = {
  image?: string | null;
}

export function ProfilePic({
  image
}: ProfilePicProps) {
  return (
    <div className='profile-pic' style={{
       backgroundImage: `url(${image}), url(${ImageDisco})` 
       }}>
    </div>
  )
}