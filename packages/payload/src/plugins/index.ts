import { getServerSideURL } from "@repo/payload/utilities/getURL";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { nestedDocsPlugin } from "@payloadcms/plugin-nested-docs";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { GenerateTitle, GenerateURL } from "@payloadcms/plugin-seo/types";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { type Plugin } from "payload";
import { Product } from "../payload-types";

const generateTitle: GenerateTitle<Product> = ({ doc }) => {
  return doc?.name
    ? `${doc.name} | Payload Website Template`
    : "Payload Website Template";
};

const generateURL: GenerateURL<Product> = ({ doc }) => {
  const url = getServerSideURL();

  return doc?.slug ? `${url}/${doc.slug}` : url;
};

export const plugins: Plugin[] = [
  nestedDocsPlugin({
    collections: ["categories"],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ""),
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  vercelBlobStorage({
    collections: {
      media: true,
    },
    token: process.env.PAYLOAD_BLOB_READ_WRITE_TOKEN,
  }),
  payloadCloudPlugin(),
];
