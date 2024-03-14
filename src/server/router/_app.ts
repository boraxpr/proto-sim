import { z } from "zod";
import { procedure, router } from "../trpc";
import { TRPCError, initTRPC } from "@trpc/server";
import { Context } from "../context";
import { t } from "@/src/server/trpc";
import { drizz } from "@/db/client";
import { userTable } from "@/auth/client";

export const protectedProcedure = t.procedure.use(async function isAuthed(
  opts
) {
  const { ctx } = opts;
  // `ctx.user` is nullable
  if (!ctx.user) {
    //     ^?
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return opts.next({
    ctx: {
      // ✅ user value is known to be non-null now
      user: ctx.user,
      // ^?
    },
  });
});

export const appRouter = t.router({
  hello: t.procedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),

  admin: t.router({
    secret: protectedProcedure
      .input(
        z.object({
          text: z.string(),
        })
      )
      .query((opts) => {
        return {
          secret: opts + "sauce",
        };
      }),
  }),

  user: t.procedure.query(async (opts) => {
    const users = await drizz.select().from(userTable);
    return {
      users: users,
    };
  })
});

// export type definition of API
export type AppRouter = typeof appRouter;
