import { PUBLIC_URL } from "./env"

const url = new URL(PUBLIC_URL)
const basePathname = url.pathname === "/" ? "" : url.pathname;

export const ROUTE = {
  APP: {
    HOME: `${basePathname}/home`,
    SIGN_UP: `${basePathname}/signup`,
    SIGN_IN: `${basePathname}/sign-in`,
    LOGIN: `${basePathname}/login`,
    PROFILE: `${basePathname}/profile`,
  
    ALBUM_DETAIL: `${basePathname}/album/:artist/:album`,
    MY_LIST_ALBUMS: `${basePathname}/my-list-albums`
  }
}

export const DYNAMIC_ROUTE = {
  APP: {
    ALBUM_DETAIL: (artist: string, album: string) => `${basePathname}/album/${artist}/${album}`
  }
}