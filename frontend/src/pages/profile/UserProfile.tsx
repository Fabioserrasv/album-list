import { useParams } from "react-router-dom";
import { ProfilePage } from "./ProfilePage";


export function UserProfile(){
  const { username } = useParams();
  console.log(username);
  if(!username) return <></>

  return (
      <ProfilePage username={username} />
  )
}