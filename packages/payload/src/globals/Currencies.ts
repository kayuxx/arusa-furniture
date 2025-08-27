import type { Data, GlobalConfig } from "payload";

import { currencies } from "@repo/payload/constants";
import { admin } from "../access/admin";
import { isValid } from "i18n-iso-countries";

type Currency = {
  name: string;
  currency: string;
  locale: string;
};
export const Currencies: GlobalConfig = {
  slug: "currenciesList",
  label: "Currencies",
  access: {
    read: admin,
    update: admin,
  },
  admin: {
    group: "Markets",
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
          filterOptions: ({ options, data, siblingData }) => {
            if (!data.currencies) return options;

            const dataExcludingCurrentSelection = data.currencies.filter(
              (e: Currency) => e.currency !== siblingData.currency,
            );
            return options.filter((e) =>
              dataExcludingCurrentSelection.every(
                (d: Currency) => d.currency !== (e as { value: string }).value,
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
          type: "text",
          name: "locale",
          admin: {
            components: {
              Field: "@repo/payload/components/TextField/Locale",
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
