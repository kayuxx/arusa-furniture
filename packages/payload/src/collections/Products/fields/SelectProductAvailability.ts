import type { Field } from "payload";
import { continents } from "../../../constants";

type Region = {
  region: string;
};
const RegionField: Field = {
  name: "region",
  label: "Region",
  type: "select",
  options: Object.keys(continents).map((e) => ({
    label: e,
    value: e,
  })),
  filterOptions: ({ options, data, siblingData }) => {
    if (!data.regions) return options;
    const dataExcludingCurrentSelection = data.regions.filter(
      (e: Region) => e.region !== siblingData.region,
    );

    return options.filter((e) =>
      dataExcludingCurrentSelection.every(
        (d: Region) => d.region !== (e as { value: string }).value,
      ),
    );
  },
  admin: {
    isClearable: false,
    components: {
      // Field: "@repo/payload/components/SelectField/SelectProductAvailability",
    },
  },
  required: true,
  unique: true,
};

const MarketsField: Field = {
  name: "markets",
  label: "Markets",
  type: "array",
  fields: [
    {
      name: "market",
      type: "text",
    },
  ],
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
