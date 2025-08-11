import type { Field, TextFieldClientProps } from "payload";

import { formatSlugHook } from "./formatSlug";
type Overrides = Omit<TextFieldClientProps["field"], "name"> | undefined;

type Slug = (fieldToUse?: string, overrides?: Overrides) => Field;

export const slugField: Slug = (fieldToUse = "title", overrides) => {
  //@ts-ignore
  const slugField: Field = {
    name: "slug",
    type: "text",
    index: true,
    label: "Slug",
    localized: true,
    ...overrides,
    hooks: {
      // Kept this in for hook or API based updates
      beforeValidate: [formatSlugHook(fieldToUse)],
    },
    admin: {
      position: "sidebar",
      ...(overrides?.admin || {}),
      components: {
        Field: {
          path: "@repo/payload/fields/slug/SlugComponent#SlugComponent",
          clientProps: {
            fieldToUse,
            readOnly: true,
          },
        },
      },
    },
  };

  return slugField;
};
slugField;
