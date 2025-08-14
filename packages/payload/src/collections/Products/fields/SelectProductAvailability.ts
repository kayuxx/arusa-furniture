import type { Field } from "payload";
import { continents } from "../../../constants";

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
  type: "text",
  admin: {
    condition: (_, siblingData) => Boolean(siblingData?.region),
    components: {
      Field: "@repo/payload/components/SelectField/SelectMarkets",
    },
  },
  required: true,
};

const SelectProductAvailability = [RegionField, MarketsField];

export default SelectProductAvailability;
