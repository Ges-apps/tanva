import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextRequest } from "next/server";

export default withAuth(
  async function proxy(req: NextRequest) {
    // اینجا می‌تونی از req استفاده کنی
    console.log(req.nextUrl.pathname);

    // منطق Proxy
  },
  {
    publicPaths: ["/"],
  }
);

export const config = {
  matcher: [
 "/dashboard/:path*"],
};