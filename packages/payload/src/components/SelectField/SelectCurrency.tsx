"use client";
import "./index.scss";
import {
  Data,
  Option,
  SelectFieldClient,
  TextFieldClientComponent,
} from "payload";
import { SelectField, ShimmerEffect, useWatchForm } from "@payloadcms/ui";
import React, { useEffect, useState } from "react";
import getCurrenciesAction from "./getCurrenciesAction";

type Pricing = {
  amunt: number;
  currency: string;
  discount: string;
};

function filterOptions(
  options: Option[],
  prices: Pricing[] = [],
  siblingData: Data,
) {
  const dataExcludingCurrentSelection = prices.filter(
    (e: Pricing) => e.currency !== siblingData.currency,
  );
  return options.filter((e) =>
    dataExcludingCurrentSelection.every(
      (d: { currency: string }) =>
        d.currency !== (e as { value: string }).value,
    ),
  );
}

export const SelectCurrency: TextFieldClientComponent = ({
  field,
  path,
  permissions,
  schemaPath,
}) => {
  const { getData, getSiblingData } = useWatchForm();
  const [options, setOptions] = useState<Option[] | []>([]);
  const data = getData();
  const siblingData = getSiblingData(path);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOptions = async () => {
      if (!isLoading) setLoading(true);
      const result = await getCurrenciesAction();
      const fetchedOptions = result.currencies.map((e) => ({
        label: e.name,
        value: e.currency,
      }));
      setOptions(filterOptions(fetchedOptions, data.prices, siblingData));
      setLoading(false);
    };
    fetchOptions();
  }, [data.prices, siblingData.currency]);

  const clientSelectField: Omit<SelectFieldClient, "type"> &
    Partial<Pick<SelectFieldClient, "type">> = {
    name: field.name,
    options,
    label: field.label,
    required: field.required,
    unique: field.unique,
    admin: {
      isSortable: false,
      isClearable: false,
      placeholder: field.admin?.placeholder,
      description: field.admin?.description,
      disabled: field.admin?.disabled,
      style: field.admin?.style,
    },
  };

  return isLoading ? (
    <LoadingEffect />
  ) : (
    <SelectField
      path={path}
      schemaPath={schemaPath}
      field={clientSelectField}
      permissions={permissions}
    />
  );
};

export default SelectCurrency;

function LoadingEffect() {
  return (
    <div className="field-type select" style={{ flex: "1 1 auto" }}>
      <label className="field-label" style={{ paddingBlock: "8.5px" }}>
        <ShimmerEffect width={70} height={8} />
      </label>
      <div className="field-type__wrap">
        <ShimmerEffect height={40} />
      </div>
    </div>
  );
}
