// clerk auth middleware
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { type NextRequest, NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/setup-profile",
  "/setup-team",
]);
const isSetupProfileRoute = createRouteMatcher(["/setup-profile"]);
const isSetupTeamRoute = createRouteMatcher(["/setup-team"]);
const isPublicRoute = createRouteMatcher(["/"]);

export default clerkMiddleware((auth, req: NextRequest) => {
  if (isProtectedRoute(req)) auth().protect();

  const { userId, sessionClaims, redirectToSignIn } = auth();

  // For users visiting /setup-profile don't try to redirect
  if (userId && isSetupProfileRoute(req)) {
    return NextResponse.next();
  }

  // if user is visiting /setup-team and has profileComplete, don't try to redirect
  if (
    userId &&
    sessionClaims?.metadata?.profileComplete &&
    isSetupTeamRoute(req)
  ) {
    return NextResponse.next();
  }

  // If the user isn't signed in and the route is private, redirect to sign-in
  if (!userId && !isPublicRoute(req))
    return redirectToSignIn({ returnBackUrl: req.url });

  // Catch users who do not have `profileComplete: true` in their publicMetadata
  // Redirect them to the /setup-profile route
  if (userId && !sessionClaims?.metadata?.profileComplete) {
    const setupProfileUrl = new URL("/setup-profile", req.url);
    return NextResponse.redirect(setupProfileUrl);
  }

  // Catch users who do not have `profileComplete` but not `teamSetupComplete`
  // Redirect them to the /setup-team route
  if (
    userId &&
    sessionClaims?.metadata?.profileComplete &&
    !sessionClaims?.metadata?.setupTeamComplete
  ) {
    const setupTeamUrl = new URL("/setup-team", req.url);
    return NextResponse.redirect(setupTeamUrl);
  }

  // If the user is logged in and the route is protected, let them view.
  if (userId && !isPublicRoute(req)) return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
