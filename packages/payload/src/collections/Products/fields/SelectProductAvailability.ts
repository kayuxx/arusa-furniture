import type { Field } from "payload";
import countries from "i18n-iso-countries";
import { continents } from "../../../constants";
import { getCountryFlag } from "@repo/payload/utilities/getCountryFlag";

const RegionField: Field = {
  name: "region",
  label: "Region",
  type: "select",
  options: Object.keys(continents).map((e) => ({
    label: e,
    value: e,
  })),
  //@ts-expect-error type error
  validate: () => true,
  filterOptions: ({ options, data }) => {
    if (!data.regions) return options;
    return options.filter((e) =>
      data.regions.every(
        (d: { region: string }) => d.region !== (e as { value: string }).value,
      ),
    );
  },
  admin: {
    isClearable: false,
    components: {
      Field: "@repo/payload/components/SelectField/SelectProductAvailability",
    },
  },
  required: true,
  unique: true,
};

const MarketsField: Field = {
  name: "markets",
  label: "Markets",
  type: "select",
  hasMany: true,
  options: Object.entries(countries.getNames("en")).map((e) => ({
    label: getCountryFlag(e[0]) + " " + e[1],
    value: e[0],
  })),
  admin: {
    condition: (_, siblingData) => Boolean(siblingData?.region),
    isSortable: false,
  },
  filterOptions: ({ options, data: _, siblingData }) => {
    const region = siblingData.region as keyof typeof continents;
    const markets = continents[region] || [];
    return options.filter((o) =>
      markets.includes(typeof o === "string" ? o : o.value),
    );
  },
  required: true,
};

const SelectProductAvailability = [RegionField, MarketsField];

export default SelectProductAvailability;
