import { useAuth } from "../../hooks/contexts/useAuth";
import { ProfilePage } from "./ProfilePage";


export function AuthedUserProfile(){
  const { user } = useAuth();

  if(!user) return <></>

  return (
      <ProfilePage username={user.name} />
  )
}