import { ProfileData, getUserProfileInformation } from "../api/profile";
import { Profile } from "../entities/profile";
import { convertAlbumServerToScoreAlbum } from "./album-service";
import { convertPostServerToPost } from "./post-service";

function convertProfileServerDataToProfile(profileData: ProfileData): Profile {
  return {
    "email": profileData.email,
    "username": profileData.username,
    "aboutMe": profileData.about_me,
    "profilePic": profileData.profile_pic,
    "posts": profileData.posts.map(convertPostServerToPost),
    "albums": profileData.albums.map(convertAlbumServerToScoreAlbum)
  }
}

export class ProfileService {
  static async getProfileInformation(username: string): Promise<Profile> {
    const profile = await getUserProfileInformation(username);
    return convertProfileServerDataToProfile(profile);
  }
}