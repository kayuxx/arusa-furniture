import {
  managerOrCustomerService,
  orderManager,
} from "@repo/payload/access/manager";
import { noOne } from "@repo/payload/access/noOne";
import type { CollectionConfig } from "payload";

export const Orders: CollectionConfig = {
  slug: "orders",
  access: {
    create: noOne,
    update: orderManager,
    delete: noOne,
    read: managerOrCustomerService,
  },
  admin: {
    useAsTitle: "order-id",
  },
  fields: [
    {
      name: "order-id",
      type: "text",
      required: true,
      unique: true,
      admin: { readOnly: true },
    },
    {
      name: "product",
      type: "relationship",
      relationTo: "products",
      required: true,
      admin: { readOnly: true },
    },
    {
      name: "fullname",
      type: "text",
      required: true,
      admin: { readOnly: true },
    },
    {
      name: "email",
      type: "email",
      required: true,
      admin: { readOnly: true },
    },
    {
      name: "phonenumber",
      type: "text",
      required: true,
      admin: { readOnly: true },
    },
    {
      name: "shipping-address",
      type: "group",
      admin: { readOnly: true },
      fields: [
        {
          name: "country",
          type: "text",
          required: true,
        },
        {
          name: "state",
          type: "text",
          required: true,
        },
        {
          name: "zipcode",
          type: "text",
          required: true,
        },
        {
          name: "address-1",
          type: "text",
          required: true,
        },
        {
          name: "address-2",
          type: "text",
        },
      ],
    },
    {
      name: "payment",
      type: "group",
      admin: { readOnly: true },
      fields: [
        {
          name: "method",
          type: "text",
          required: true,
        },
        { name: "transaction-id", type: "text", required: true, unique: true },
      ],
    },
    {
      name: "order",
      type: "group",
      required: true,
      fields: [
        { name: "updatedAt", type: "date", required: true },
        {
          name: "status",
          type: "select",
          options: [
            {
              label: "Pending",
              value: "pending",
            },
            {
              label: "Processed",
              value: "processed",
            },
            {
              label: "Shipped",
              value: "shipped",
            },
            {
              label: "Delivered",
              value: "delivered",
            },
            {
              label: "Canceled",
              value: "canceled",
            },
            {
              label: "Refunded",
              value: "refunded",
            },
          ],
          required: true,
        },
      ],
    },
  ],
};
