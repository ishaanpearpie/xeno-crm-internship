export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/campaigns/:path*", "/segments/:path*"],
};


