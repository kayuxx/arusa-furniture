import type { CollectionConfig } from "payload";
import SelectProductAvailability from "./fields/SelectProductAvailability";

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from "@payloadcms/plugin-seo/fields";
import { slugField } from "@repo/payload/fields/slug";
import {
  editor,
  editorOrMarketingManager,
  selfEditor,
} from "@repo/payload/access/editor";

// TODO: sellers shouldn't be an array of sellers it should be only one seller and defined to the current user that is selling the product (as  role seller) and its read only value

export const Products: CollectionConfig = {
  slug: "products",
  // This config controls what's populated by default when a post is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'posts'>
  defaultPopulate: {
    name: true,
    slug: true,
    categories: true,
    meta: {
      image: true,
      description: true,
    },
  },
  versions: {
    drafts: {
      autosave: {
        showSaveDraftButton: true,
        interval: 500, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 10,
  },
  admin: {
    useAsTitle: "name",
    // defaultColumns: ['name', 'slug', 'updatedAt'],
  },
  access: {
    create: editor,
    delete: selfEditor,
    read: editorOrMarketingManager,
    update: selfEditor,
  },
  fields: [
    {
      name: "publisher",
      type: "relationship",
      admin: {
        position: "sidebar",
        readOnly: true,
      },
      relationTo: "users",
      defaultValue: ({ user }) => (user ? user.id : null),
      required: true,
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
        position: "sidebar",
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === "published" && !value) {
              return new Date();
            }
            return value;
          },
        ],
      },
    },
    {
      name: "name",
      type: "text",
      localized: true,
      required: true,
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "Details",
          fields: [
            ...slugField("name"),
            {
              type: "upload",
              name: "heroImage",
              relationTo: "media",
              required: true,
            },
            {
              type: "upload",
              name: "gallery",
              hasMany: true,
              relationTo: "media",
              required: true,
            },
            {
              type: "textarea",
              name: "description",
              localized: true,
              admin: {
                rows: 10,
              },
              required: true,
            },
            {
              name: "price",
              admin: {
                description: "Set a price for each currency.",
              },
              type: "array",
              validate: async (values, { req: { payload } }) => {
                const currencies = await payload.find({
                  collection: "currencies",
                });
                const defaultCurrency = currencies.docs.find(
                  (e) => e.is_default,
                );
                const defaultPrice = (values as { currency: string }[]).find(
                  (e) =>
                    defaultCurrency
                      ? e.currency == defaultCurrency.currency
                      : undefined,
                );
                if (defaultCurrency) {
                  if (defaultPrice) return true;
                  return `A default currency must be set at minimum, ${defaultCurrency.name} is required.`;
                }

                return `A default currency is not set yet, Please go to the currencies collection and set one.`;
              },
              fields: [
                {
                  name: "currency",
                  type: "text",
                  admin: {
                    components: {
                      Field:
                        "@repo/payload/components/SelectField/SelectCurrency",
                    },
                  },
                  required: true,
                },
                {
                  name: "amount",
                  type: "number",
                  required: true,
                },
              ],
              required: true,
              unique: true,
            },
            {
              name: "discount",
              type: "number",
              min: 5,
              max: 100,
            },
            {
              type: "array",
              name: "regions",
              fields: [...SelectProductAvailability],
              required: true,
              unique: true,
            },
            {
              name: "quantity",
              type: "number",
              min: 10,
              required: true,
            },
            { name: "model", type: "text", required: true, localized: true },
            { name: "origin", type: "text", required: true, localized: true },
            {
              name: "categories",
              type: "relationship",
              relationTo: "categories",
              admin: { isSortable: false },

              localized: true,
              required: true,
            },
            {
              name: "variations",
              type: "array",
              required: true,
              fields: [
                {
                  name: "size",
                  type: "text",
                  required: true,
                  unique: true,
                  localized: true,
                },
                { name: "height", type: "text", required: true },
                { name: "width", type: "text", required: true },
                { name: "depth", type: "text", required: true },
                { name: "weight", type: "text", required: true },
                {
                  type: "upload",
                  name: "dimensionImage",
                  relationTo: "media",
                },
              ],
            },
          ],
        },
        {
          name: "meta",
          label: "SEO",
          fields: [
            OverviewField({
              titlePath: "meta.title",
              descriptionPath: "meta.description",
              imagePath: "meta.image",
            }),
            MetaTitleField({
              hasGenerateFn: true,
              overrides: {
                localized: true,
                required: true,
              },
            }),
            MetaImageField({
              relationTo: "media",
              overrides: {
                localized: false,
                required: true,
              },
            }),

            MetaDescriptionField({
              overrides: {
                localized: true,
                required: true,
              },
            }),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: "meta.title",
              descriptionPath: "meta.description",
            }),
          ],
        },
      ],
    },
  ],
};
