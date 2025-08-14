"use client";
import { Option, SelectFieldClient, TextFieldClientComponent } from "payload";
import { SelectField, ShimmerEffect, useField } from "@payloadcms/ui";
import React, { useEffect, useState } from "react";
import getMarketsAction from "./getRegionsAction";
import { getCountryFlag } from "@repo/payload/utilities/getCountryFlag";
import { getCountryName } from "./getCountryName";

type RegionEnums = "asia" | "europe" | "africa" | "americas";
export const SelectMarkets: TextFieldClientComponent = ({
  field,
  path,
  permissions,
  schemaPath,
}) => {
  const { value } = useField({ path: path.replace(/\.[^.]+$/, ".region") });
  const [options, setOptions] = useState<Option[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log({ isLoading });

  useEffect(() => {
    const fetchOptions = async () => {
      setIsLoading(true);
      const result = await getMarketsAction();
      const region: RegionEnums = (
        value as RegionEnums
      ).toLowerCase() as RegionEnums;
      const markets = result[`${region}_markets`] ?? [];
      const fetchedOptions = await Promise.all(
        markets.map(async (e) => ({
          label:
            getCountryFlag(e.market) + " " + (await getCountryName(e.market)),
          value: e.market!,
        })),
      );

      setOptions(fetchedOptions);
      setIsLoading(false);
    };
    fetchOptions();
  }, [value]);

  const clientSelectField: Omit<SelectFieldClient, "type"> &
    Partial<Pick<SelectFieldClient, "type">> = {
    name: field.name,
    options,
    label: field.label,
    required: field.required,
    unique: field.unique,
    hasMany: true,
    admin: {
      isSortable: false,
      isClearable: false,
      placeholder: field.admin?.placeholder,
      description: field.admin?.description,
      disabled: field.admin?.disabled,
    },
  };

  return isLoading ? (
    <ShimmerEffect
      animationDelay="0"
      height="calc(var(--base) * 2 + 2px)"
      width="100%"
    />
  ) : (
    <SelectField
      path={path}
      schemaPath={schemaPath}
      field={clientSelectField}
      permissions={permissions}
    />
  );
};

export default SelectMarkets;
