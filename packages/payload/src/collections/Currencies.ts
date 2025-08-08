import type { CollectionConfig } from "payload";

import { authenticated } from "@repo/payload/access/authenticated";
import { currencies } from "@repo/payload/constants";

export const Currencies: CollectionConfig = {
  slug: "currencies",
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  fields: [
    {
      type: "select",
      name: "currency",
      options: currencies.map((e) => ({
        label: e.name,
        value: e.code,
      })),
      required: true,
    },
    {
      type: "text",
      name: "name",
      admin: {
        components: {
          Field: "@repo/payload/components/TextField/CurrencyName",
        },
      },
      required: true,
    },
    {
      name: "is_default",
      type: "checkbox",
      hidden: false,
      label: "Set as default currency",
      defaultValue: false,
      admin: {
        components: {
          Field: "@repo/payload/components/CheckBoxField/CheckBoxIsDefault",
        },
      },
      unique: true,
    },
  ],
};
