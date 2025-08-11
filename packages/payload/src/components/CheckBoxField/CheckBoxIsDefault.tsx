"use client";
import type React from "react";
import {
  CheckboxField,
  FieldLabel,
  useDocumentInfo,
  useField,
  useFormFields,
  useWatchForm,
} from "@payloadcms/ui";
import type { CheckboxFieldClientComponent } from "payload";
import { useEffect, useState } from "react";

export const CheckBoxIsDefault: CheckboxFieldClientComponent = ({
  field: clientField,
  path,
  schemaPath,
  permissions,
}) => {
  const [shouldShow, setShoudShow] = useState(false);
  const { getData } = useWatchForm();
  const { value: currencyCode } = useField({
    path: path.replace(/\.[^.]+$/, ".currency"),
  });
  const data = getData();
  const defaultCurrency = (
    data["currencies"] as [
      { is_default: boolean; name: string; currency: string },
    ]
  ).find((e) => e.is_default);

  useEffect(() => {
    if (currencyCode !== defaultCurrency?.currency) {
      setShoudShow(Boolean(defaultCurrency));
    }
  }, [data]);

  return (
    <>
      <CheckboxField
        readOnly={shouldShow}
        field={clientField}
        path={path}
        schemaPath={schemaPath}
        permissions={permissions}
      />
      {shouldShow && (
        <FieldLabel
          label={`You can't edit this value since the ${defaultCurrency?.name} currency already set to be a default currency.`}
        />
      )}
    </>
  );
};
export default CheckBoxIsDefault;
