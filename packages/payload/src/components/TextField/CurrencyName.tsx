"use client";
import React, { useEffect } from "react";
import { TextField, useField, useFormFields } from "@payloadcms/ui";
import type { TextFieldClientComponent } from "payload";
import { currencies } from "@repo/payload/constants";

export const CurrencyName: TextFieldClientComponent = (props) => {
  const { setValue: setTextValue } = useField({ path: "name" });
  const { value: currencyCode } = useFormFields(([fields]) => fields.currency);

  useEffect(() => {
    if (currencyCode) {
      const currencyObj = currencies.find((e) => e.code == currencyCode)!;
      setTextValue(currencyObj.name);
    }
  }, [currencyCode, setTextValue]);

  return (
    <div style={{ display: "none" }}>
      <TextField {...props} readOnly />
    </div>
  );
};

export default CurrencyName;
