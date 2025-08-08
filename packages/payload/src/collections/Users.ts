import {
  admin,
  adminFieldLevel,
  adminOrSelf,
} from "@repo/payload/access/admin";
import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  access: {
    create: admin,
    update: adminOrSelf,
    read: adminOrSelf,
    delete: admin,
  },
  admin: {
    useAsTitle: "name",
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      type: "text",
      name: "name",
      required: true,
    },
    {
      access: {
        create: adminFieldLevel,
        update: adminFieldLevel,
      },
      type: "select",
      name: "roles",
      defaultValue: ["editor"],
      hasMany: true,
      saveToJWT: true,
      options: [
        {
          label: "Admin",
          value: "admin",
        },
        {
          label: "Editor",
          value: "editor",
        },
        {
          label: "Order Manager",
          value: "order-manager",
        },
        {
          label: "Marketing Manager",
          value: "marketing-manager",
        },
        {
          label: "Customer Service",
          value: "customer-service",
        },
      ],
      required: true,
    },
  ],
};
