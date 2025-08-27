"use client";
import React, { useEffect } from "react";
import { TextField, useField } from "@payloadcms/ui";
import type { TextFieldClientComponent } from "payload";
import { currencies } from "@repo/payload/constants";

export const Locale: TextFieldClientComponent = (props) => {
  const { setValue: setTextValue } = useField({ path: props.path });
  const { value: currencyCode } = useField({
    path: props.path.replace(/\.[^.]+$/, ".currency"),
  });

  useEffect(() => {
    if (currencyCode) {
      const currencyObj = currencies.find((e) => e.code == currencyCode)!;
      setTextValue(currencyObj.locale);
    }
  }, [currencyCode, setTextValue]);

  return (
    <div style={{ display: "none" }}>
      <TextField {...props} readOnly />
    </div>
  );
};

export default Locale;
