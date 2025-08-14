import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  admin: {
    group: "Storage",
  },
  fields: [
    {
      name: "alt",
      type: "text",
      localized: true,
      required: true,
    },
  ],
  upload: {
    disableLocalStorage: true,
    cacheTags: false,
    allowRestrictedFileTypes: false,
    mimeTypes: ["image/*", "video/*"],
  },
};
