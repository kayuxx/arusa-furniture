"use client";
import { Option, OptionObject } from "payload";
import {
  ShimmerEffect,
  useField,
  SelectInput,
  useForm,
  FieldLabel,
} from "@payloadcms/ui";
import React, { useCallback, useEffect, useRef, useState } from "react";
import getMarketsAction from "./getRegionsAction";
import { getCountryFlag } from "@repo/payload/utilities/getCountryFlag";
import { getCountryName } from "./getCountryName";
import { ArrayFieldClientComponent } from "payload";

type RegionEnums = "Asia" | "Europe" | "Africa" | "Americas";

type RegionMarket = {
  id: string;
  market: string;
};

type RegionType = {
  id: string;
  region: string;
  markets: RegionMarket[] | 0;
};

type onChangeContextType =
  | {
      action: "remove-value" | "pop-value";
      option: undefined;
      removedValue: OptionObject;
      removedValues: undefined;
    }
  | {
      action: "select-option";
      option: OptionObject;
      removedValue: undefined;
      removedValues: undefined;
    }
  | {
      action: "clear";
      option: undefined;
      removedValue: undefined;
      removedValues: OptionObject[];
    };

export const SelectMarkets: ArrayFieldClientComponent = ({ field, path }) => {
  const { rows } = useField<RegionMarket[]>({
    path: path,
    hasRows: true,
  });
  const {
    addFieldRow,
    removeFieldRow,
    setModified,
    fields,
    replaceState,
    getSiblingData,
  } = useForm();
  const { value: regionName } = useField<RegionEnums>({
    path: path.replace(/\.[^.]+$/, ".region"),
  });
  const region = getSiblingData(path) as RegionType;
  const regionMarkets = region.markets || [];
  const markets = regionMarkets.map((e) => e.market);
  const [options, setOptions] = useState<Option[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const prevRegionName = useRef<string | undefined>(undefined);

  const addRow = useCallback(
    (option: OptionObject) => {
      addFieldRow({
        path,
        schemaPath: path,
        rowIndex: rows?.length,
        subFieldState: {
          market: {
            initialValue: option.value,
            valid: true,
            value: option.value,
          },
        },
      });
      setModified(true);
    },
    [rows?.length],
  );

  const removeRow = useCallback((rowIndex: number) => {
    removeFieldRow({
      path: path,
      rowIndex,
    });
    setModified(true);
  }, []);

  const clearRows = useCallback(() => {
    // There's no official guide from PayloadCMS on resetting the array state yet
    // Also, there are many gaps in the PayloadCMS documentation
    // the Github issues page have so many workarounds,
    // PayloadCMS working on a better way to handle the array state,
    // until then this approach works fine just for now.
    if (!rows?.length) return;

    const newState = { ...fields };
    for (const key of Object.keys(newState)) {
      if (key === path) continue;
      if (key.includes(path)) delete newState[key];
    }

    newState[path] = {
      initialValue: 0,
      value: 0,
      valid: true,
      rows: [],
      customComponents: {
        Field: <SelectMarkets field={field} path={path} />,
      },
    };

    replaceState(newState);
    setModified(true);
  }, [fields, rows?.length]);

  const handleChange = useCallback(
    ({ action, option, removedValue }: onChangeContextType) => {
      switch (action) {
        case "remove-value":
          const currIndex = regionMarkets.findIndex(
            (e) => e.market === removedValue.value,
          );
          removeRow(currIndex);
          break;
        case "pop-value":
          if (rows?.length) {
            removeRow(rows.length - 1);
          }
          break;
        case "select-option":
          addRow(option);
          break;
        case "clear":
          clearRows();
          break;
      }
    },
    [rows?.length, regionMarkets, removeRow, clearRows, addRow],
  );

  useEffect(() => {
    if (prevRegionName.current && prevRegionName.current !== regionName) {
      clearRows();
    }
    const fetchOptions = async () => {
      setIsLoading(true);
      const result = await getMarketsAction();
      if (!result) {
        setIsLoading(false);
        return;
      }
      const regionMarkets =
        result[
          `${regionName.toLowerCase() as Lowercase<RegionEnums>}_markets`
        ] ?? [];
      const fetchedOptions = await Promise.all(
        regionMarkets.map(async (e) => ({
          label:
            getCountryFlag(e.market) + " " + (await getCountryName(e.market)),
          value: e.market!,
        })),
      );
      setOptions(fetchedOptions);
      setIsLoading(false);
    };
    fetchOptions();
    prevRegionName.current = regionName;
  }, [regionName]);

  return isLoading ? (
    <ShimmerEffect
      animationDelay="0"
      height="calc(var(--base) * 2 + 2px)"
      width="100%"
    />
  ) : (
    <>
      <FieldLabel
        label={field.label}
        required={field.required}
        localized={field.localized}
      />
      <SelectInput
        options={options as OptionObject[]}
        value={markets}
        //@ts-expect-error type match
        // react-select provide two arguments, why there's only one argument?
        onChange={(_, context) => handleChange(context)}
        hasMany
        path={path}
        name={field.name}
      />
    </>
  );
};

export default SelectMarkets;
