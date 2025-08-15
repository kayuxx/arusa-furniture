"use client";
import type { TextFieldClientComponent } from "payload";
import "./index.scss";
import { TextInput, Button, FieldLabel, useField } from "@payloadcms/ui";
import React, { useCallback, useEffect } from "react";

const SelectProductAvailability: TextFieldClientComponent = (props) => {
  const { value: couponCode, setValue: setCouponCode } = useField<string>({
    path: props.path,
  });

  const generateCoupon = useCallback(() => {
    const coupon = Math.random().toString(36).substring(2, 8).toUpperCase();
    setCouponCode(coupon);
  }, []);

  useEffect(() => {
    if (!couponCode) setTimeout(() => generateCoupon());
  }, []);

  return (
    <div className="field-type">
      <div className="label-wrapper">
        <FieldLabel
          label={props.field.label}
          required={props.field.required}
          htmlFor={`field-${props.path}`}
        />

        <Button
          className="generate-button"
          buttonStyle="none"
          size="large"
          onClick={generateCoupon}
        >
          Generate
        </Button>
      </div>

      <TextInput
        description={props.field.admin?.description}
        path={props.path}
        value={couponCode}
        readOnly={true}
      />
    </div>
  );
};

export default SelectProductAvailability;
