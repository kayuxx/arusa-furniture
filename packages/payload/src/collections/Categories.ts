import type { CollectionConfig } from "payload";

import { anyone } from "@repo/payload/access/anyone";
import { authenticated } from "@repo/payload/access/authenticated";
import { slugField } from "@repo/payload/fields/slug";

export const Categories: CollectionConfig = {
  slug: "categories",
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      localized: true,
      type: "text",
      required: true,
    },
    slugField(),
  ],
};
