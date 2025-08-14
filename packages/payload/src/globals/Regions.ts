import type { Field, GlobalConfig } from "payload";
import countries from "i18n-iso-countries";

import { continents } from "../constants";
import { getCountryFlag } from "@repo/payload/utilities/getCountryFlag";
import { admin } from "../access/admin";
import { revalidateTag } from "next/cache";

function buildMerketField(region: keyof typeof continents): Field {
  return {
    name: `${region.toLowerCase()}_markets`,
    label: region,
    type: "array",
    fields: [
      {
        name: "market",
        type: "select",
        filterOptions: ({ options }) => {
          return options.filter((e) =>
            continents[region].find((d) => d == (e as { value: string }).value),
          );
        },
        options: Object.entries(countries.getNames("en")).map((e) => ({
          label: getCountryFlag(e[0]) + " " + e[1],
          value: e[0],
        })),
        required: true,
      },
      {
        name: "business_address",
        type: "array",
        fields: [
          {
            name: "address",
            type: "text",
            required: true,
          },
        ],
        required: true,
      },
    ],
  };
}

export const Regions: GlobalConfig = {
  slug: "regions",
  access: {
    read: admin,
    update: admin,
  },
  hooks: {
    afterChange: [() => revalidateTag("g_regions")],
  },
  fields: [
    buildMerketField("Europe"),
    buildMerketField("Asia"),
    buildMerketField("Africa"),
    buildMerketField("Americas"),
  ],
};
