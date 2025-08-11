"use client";
import {
  Data,
  Option,
  SelectFieldClient,
  TextFieldClientComponent,
} from "payload";
import { SelectField, useDocumentInfo } from "@payloadcms/ui";
import React, { useEffect, useState } from "react";
import getCurrenciesAction from "./getCurrenciesAction";

function filterOptions(options: Option[], savedDocumentData: Data) {
  return options.filter((e) =>
    savedDocumentData.price.every(
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
  const { savedDocumentData } = useDocumentInfo();
  const [options, setOptions] = useState<Option[] | []>([]);

  useEffect(() => {
    const fetchOptions = async () => {
      const result = await getCurrenciesAction();
      const fetchedOptions = result.currencies.map((e) => ({
        label: e.name,
        value: e.currency,
      }));
      setOptions(
        savedDocumentData
          ? filterOptions(fetchedOptions, savedDocumentData)
          : fetchedOptions,
      );
    };
    fetchOptions();
  }, [savedDocumentData]);

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
