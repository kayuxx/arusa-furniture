import type { Field, GlobalConfig } from "payload";
import countries from "i18n-iso-countries";

import { continents } from "../constants";
import { getCountryFlag } from "@repo/payload/utilities/getCountryFlag";
import { adminOrSelf } from "../access/admin";

function buildMerketField(region: keyof typeof continents): Field {
  return {
    name: `${region.toLowerCase()}_markets`,
    label: region,
    type: "array",
    required: true,
    fields: [
      {
        name: "markets",
        type: "select",
        filterOptions: ({ options }) => {
          return options.filter((e) =>
            continents.Europe.find((d) => d == (e as { value: string }).value),
          );
        },
        options: Object.entries(countries.getNames("en")).map((e) => ({
          label: getCountryFlag(e[0]) + " " + e[1],
          value: e[0],
        })),
      },
      {
        name: "business_address",
        type: "array",
        fields: [
          {
            name: "address",
            type: "text",
          },
        ],
      },
    ],
  };
}

export const Regions: GlobalConfig = {
  slug: "regions",
  access: {
    read: adminOrSelf,
    update: adminOrSelf,
  },

  fields: [
    buildMerketField("Europe"),
    buildMerketField("Asia"),
    buildMerketField("Africa"),
    buildMerketField("Americas"),
  ],
};
