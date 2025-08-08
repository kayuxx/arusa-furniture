import type { Access } from "payload";

import type { User } from "@repo/payload/payload-types.ts";

type AccessType = Access<User>;

export const editor: AccessType = ({ req: { user } }) => {
  if (user?.roles.includes("admin")) return true;
  return Boolean(user?.roles.includes("editor"));
};

export const selfEditor: AccessType = ({ req: { user } }) => {
  if (user?.roles.includes("admin")) return true;
  return {
    id: {
      equals: user?.id,
    },
  };
};

export const editorOrMarketingManager: AccessType = ({ req: { user } }) => {
  if (user?.roles.includes("admin")) return true;
  const roles: User["roles"] = ["editor", "marketing-manager"];
  return Boolean(roles.some((role) => user?.roles.includes(role)));
};
