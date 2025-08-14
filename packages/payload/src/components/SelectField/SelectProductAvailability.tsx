"use client";
import type { SelectFieldClientComponent } from "payload";

import { SelectField, useField } from "@payloadcms/ui";
import React from "react";

const SelectProductAvailability: SelectFieldClientComponent = (props) => {
  const { setValue: setMarketsValue } = useField({
    path: props.path.replace(/\bregion\b/i, "markets"),
  });

  return (
    <SelectField
      {...props}
      onChange={() => {
        setMarketsValue("");
      }}
    />
  );
};

export default SelectProductAvailability;
