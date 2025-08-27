"use client";
import {
  Data,
  Option,
  SelectFieldClient,
  TextFieldClientComponent,
} from "payload";
import { SelectField, useWatchForm } from "@payloadcms/ui";
import React, { useEffect, useState } from "react";
import getCurrenciesAction from "./getCurrenciesAction";

type Pricing = {
  amunt: number;
  currency: string;
  discount: string;
};

function filterOptions(options: Option[], data: Data, siblingData: Data) {
  const prices = data.pricing;
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

  useEffect(() => {
    const fetchOptions = async () => {
      const result = await getCurrenciesAction();
      const fetchedOptions = result.currencies.map((e) => ({
        label: e.name,
        value: e.currency,
      }));
      setOptions(filterOptions(fetchedOptions, data, siblingData));
    };
    fetchOptions();
  }, []);

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

  return (
    <SelectField
      path={path}
      schemaPath={schemaPath}
      field={clientSelectField}
      permissions={permissions}
    />
  );
};

export default SelectCurrency;
