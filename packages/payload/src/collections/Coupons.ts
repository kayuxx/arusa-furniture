import type { CollectionConfig } from "payload";

import { marketingManager } from "@repo/payload/access/manager";
// TODO: we may delete a coupon that is already expired using hooks.
export const Coupons: CollectionConfig = {
  slug: "coupons",
  access: {
    create: marketingManager,
    delete: marketingManager,
    read: marketingManager,
    update: marketingManager,
  },
  admin: {
    group: "Sales & Marketing",
  },
  fields: [
    {
      type: "number",
      name: "percentage",
      admin: { description: "Enter the percentage discount for this coupon." },
      max: 100,
      min: 5,
      required: true,
    },
    {
      type: "relationship",
      relationTo: "categories",
      name: "categories",
      hasMany: true,
      admin: {
        description:
          "Specify which categories you want the coupon code to be applied. if left empty, all categories are included.",
      },
    },
    {
      type: "text",
      name: "coupon_code",
      label: "Coupon",
      admin: {
        position: "sidebar",
        description:
          "Coupon codes are auto-generated, you can manually re-genereate it by using the button above.",
        readOnly: true,
        components: {
          Field: "@repo/payload/components/TextField/CouponGenerator",
        },
      },
      required: true,
      unique: true,
    },
    {
      type: "date",
      name: "expiredAt",
      label: "Expiration",
      admin: {
        position: "sidebar",
      },
      required: true,
    },
  ],
};
