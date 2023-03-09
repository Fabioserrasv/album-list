import { PUBLIC_URL } from "./env"

const url = new URL(PUBLIC_URL)
const basePathname = url.pathname === "/" ? "" : url.pathname;

export const ROUTE = {
  APP: {
    HOME: `${basePathname}/home`,
    SIGN_UP: `${basePathname}/signup`,
    SIGN_IN: `${basePathname}/sign-in`,
    LOGIN: `${basePathname}/login`
  }
}

export const DYNAMIC_ROUTE = {
  APP: {
    
  }
}