import { PUBLIC_URL, API_URL } from "./env"

const urlApp = new URL(PUBLIC_URL)
const basePathnameApp = urlApp.pathname === "/" ? "" : urlApp.pathname;

export const ROUTE = {
  APP: {
    HOME: `${basePathnameApp}/home`,
    SIGN_UP: `${basePathnameApp}/signup`,
    SIGN_IN: `${basePathnameApp}/sign-in`,
    LOGIN: `${basePathnameApp}/login`,
    PROFILE: `${basePathnameApp}/profile`,
    USER_PROFILE: `${basePathnameApp}/profile/:username`,

    ALBUM_DETAIL: `${basePathnameApp}/album/:artist/:album`,
    MY_LIST_ALBUMS: `${basePathnameApp}/my-list-albums`,
    SEARCH_ALBUM: `${basePathnameApp}/search-album`
  }
}

export const DYNAMIC_ROUTE = {
  APP: {
    ALBUM_DETAIL: (artist: string, album: string) => `${basePathnameApp}/album/${artist}/${album}`,
    USER_PROFILE: (username: string) => `${basePathnameApp}/profile/${username}`
  },
  API: {
    PROFILE_PICTURE: (path: string) => `${API_URL}${path}`
  }
}