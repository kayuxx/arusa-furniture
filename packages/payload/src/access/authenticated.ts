import type { AccessArgs } from "payload";

import type { User } from "@/payload-types";

type isAuthenticated = (args: AccessArgs<User>) => boolean;

export const authenticated: isAuthenticated = ({ req }) => {
  const authHeader = req.headers.get("authorization");
  const token = `Bearer ${process.env.CRON_SECRET}`;
  if (authHeader === token) return true;
  return Boolean(req.user);
};
