import { lucia } from "@/auth/client";
import * as trpcNext from "@trpc/server/adapters/next";

const decodeAndVerifyJwtToken = async (token: string) => {
  return { name: "test" };
};

export async function createContext({
  req,
  res,
}: trpcNext.CreateNextContextOptions) {
  // Create your context based on the request object
  // Will be available as `ctx` in all your resolvers

  // This is just an example of something you might want to do in your ctx fn
  async function getUserFromHeader() {
    // if (req.headers.authorization) {
    //   const user = await decodeAndVerifyJwtToken(
    //     // req.headers.authorization.split(" ")[1]
    //     "thsisstring"
    //   );
    //   return user;
    // }
    if (req.headers.cookie) {
      const sessionId = req.cookies[lucia.sessionCookieName];
      if (!sessionId) {
        return null;
      }
      const cookieHeader = req.headers.cookie || "";
      const { session, user } = await lucia.validateSession(sessionId);
    }
    return { name: "admin" };
  }
  const user = await getUserFromHeader();
  console.log(user);
  return {
    user,
  };
}
export type Context = Awaited<ReturnType<typeof createContext>>;
