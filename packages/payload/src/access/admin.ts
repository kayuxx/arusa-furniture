import type { Access, FieldAccess } from "payload";

import type { User } from "@/payload-types";

type isAdmin = Access<User>;

export const admin: isAdmin = ({ req: { user } }) => {
  return Boolean(user?.roles.includes("admin"));
};

type isAdminFieldLevel = FieldAccess<User>;

export const adminFieldLevel: isAdminFieldLevel = ({ req: { user } }) => {
  return Boolean(user?.roles.includes("admin"));
};

type isAdminOrSelf = Access<User>;

export const adminOrSelf: isAdminOrSelf = ({ req: { user } }) => {
  if (user) {
    if (user.roles.includes("admin")) {
      return true;
    }
    return {
      id: {
        equals: user.id,
      },
    };
  }

  return false;
};
