import type { Access } from "payload";

import type { User } from "@/payload-types";

type AccessType = Access<User>;

export const orderManager: AccessType = ({ req: { user } }) => {
  if (user?.roles.includes("admin")) return true;
  return Boolean(user?.roles.includes("order-manager"));
};

export const managerOrCustomerService: AccessType = ({ req: { user } }) => {
  if (user?.roles.includes("admin")) return true;

  const roles: User["roles"] = [
    "order-manager",
    "marketing-manager",
    "customer-service",
  ];
  return roles.some((role) => user?.roles.includes(role));
};

export const marketingManager: AccessType = ({ req: { user } }) => {
  if (user?.roles.includes("admin")) return true;
  return Boolean(user?.roles.includes("marketing-manager"));
};
