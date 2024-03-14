import { Lucia, Session, User } from "lucia";
import { NodePostgresAdapter } from "@lucia-auth/adapter-postgresql";
import { DatabaseUser, drizz, pool } from "@/db/client";
import { IncomingMessage, ServerResponse } from "http";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
// const adapter = new NodePostgresAdapter(pool, {
//   user: "auth_user",
//   session: "user_session",
// });

export const userTable = pgTable("auth_user", {
  id: varchar("id").primaryKey(),
  hashedPassword: varchar("hashed_password"),
  username: varchar("username"),
});

const sessionTable = pgTable("session", {
  id: varchar("id").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

const adapter = new DrizzlePostgreSQLAdapter(drizz, sessionTable, userTable);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: true,
    },
  },
  getUserAttributes: (attributes) => {
    return {
      username: attributes.username,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: Omit<DatabaseUser, "id">;
  }
}

export async function validateRequest(
  req: IncomingMessage,
  res: ServerResponse
): Promise<{ user: User; session: Session } | { user: null; session: null }> {
  const sessionId = lucia.readSessionCookie(req.headers.cookie ?? "");
  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }
  const result = await lucia.validateSession(sessionId);
  if (result.session && result.session.fresh) {
    res.appendHeader(
      "Set-Cookie",
      lucia.createSessionCookie(result.session.id).serialize()
    );
  }
  if (!result.session) {
    res.appendHeader(
      "Set-Cookie",
      lucia.createBlankSessionCookie().serialize()
    );
  }
  return result;
}
