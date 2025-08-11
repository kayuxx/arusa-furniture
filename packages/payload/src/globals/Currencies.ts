import type { GlobalConfig } from "payload";

import { authenticated } from "@repo/payload/access/authenticated";
import { currencies } from "@repo/payload/constants";

export const Currencies: GlobalConfig = {
  slug: "currenciesList",
  label: "Currencies",
  access: {
    read: authenticated,
    update: authenticated,
  },
  fields: [
    {
      name: "currencies",
      label: "Currencies",
      type: "array",
      unique: true,
      required: true,
      fields: [
        {
          type: "select",
          name: "currency",
          filterOptions: ({ options, data }) => {
            if (!data.currencies) return options;
            return options.filter((e) =>
              data.currencies.every(
                (d: { name: string; currency: string }) =>
                  d.currency !== (e as { value: string }).value,
              ),
            );
          },
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
          label: "Set as default currency",
          defaultValue: false,
          admin: {
            components: {
              Field: "@repo/payload/components/CheckBoxField/CheckBoxIsDefault",
            },
          },
        },
      ],
    },
  ],
};
