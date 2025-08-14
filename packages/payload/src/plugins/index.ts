import { getServerSideURL } from "@repo/payload/utilities/getURL";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { nestedDocsPlugin } from "@payloadcms/plugin-nested-docs";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { GenerateTitle, GenerateURL } from "@payloadcms/plugin-seo/types";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { type Plugin } from "payload";
import { Product } from "@payload-types";

// TODO: a dashboard analytics is mandatory in our app,
// the analytics plugin https://github.com/NouanceLabs/payload-dashboard-analytics
// does not support payload v3 yet may #44 PR get merged
// there's already a package support v3 built in top of the NouanceLabs package,
// which is `payload-analytics`
// how can we achieve that?
// integrate an analytics plugin service such as Google Analytics to the nextjs (front-end) app
// then we can use that on our payloadcms app.
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
    token: process.env.BLOB_READ_WRITE_TOKEN,
    addRandomSuffix: true,
  }),
  payloadCloudPlugin(),
];
