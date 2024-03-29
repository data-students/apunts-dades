import { withAuth } from "next-auth/middleware"

export default withAuth(function middleware(req) {}, {
  callbacks: {
    authorized: ({ req, token }) => {
      if (
        req.nextUrl.pathname &&
        req.nextUrl.pathname.startsWith("/") &&
        !req.nextUrl.pathname.startsWith("/sign-in") &&
        !req.nextUrl.pathname.startsWith("/api/uploadthing") &&
        token === null
      ) {
        return false
      }
      return true
    },
  },
})
