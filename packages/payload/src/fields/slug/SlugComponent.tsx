"use client";
import React, { useEffect } from "react";
import { TextFieldClientComponent, TextFieldClientProps } from "payload";

import { useField, useFormFields, TextField } from "@payloadcms/ui";

import { formatSlug } from "./formatSlug";
import "./index.scss";

type SlugComponentProps = TextFieldClientProps & {
  fieldToUse: string;
};

export const SlugComponent = ({ fieldToUse, ...props }: SlugComponentProps) => {
  const { value, setValue } = useField<string>({
    path: props.path || props.field.name,
  });

  // The value of the field we're listening to for the slug
  const targetFieldValue = useFormFields(([fields]) => {
    return fields[fieldToUse]?.value as string;
  });

  useEffect(() => {
    if (targetFieldValue) {
      const formattedSlug = formatSlug(targetFieldValue);

      if (value !== formattedSlug) setValue(formattedSlug);
    } else {
      if (value !== "") setValue("");
    }
  }, [targetFieldValue, setValue, value]);

  return <TextField {...props} />;
};
