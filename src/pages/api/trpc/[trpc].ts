import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter } from "@/src/server/router/_app";
import { createContext } from "@/src/server/context";

// export API handler
// @link https://trpc.io/docs/v11/server/adapters
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});
