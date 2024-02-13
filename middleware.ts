/** @format */

import {authMiddleware} from "@clerk/nextjs"

export default authMiddleware({
  //if authed, constraint routes to /board
  publicRoutes: ["/", "/about"],
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
