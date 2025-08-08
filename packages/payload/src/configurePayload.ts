// storage-adapter-import-placeholder
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig, Config, PayloadRequest } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Media } from "./collections/Media";
import { Products } from "./collections/Products";
import { Coupons } from "./collections/Coupons";
import { Categories } from "./collections/Categories";
import { plugins } from "./plugins";
import { getServerSideURL } from "./utilities/getURL";
import { Currencies } from "./collections/Currencies";
import { Orders } from "./collections/Orders";
import { Users } from "./collections/Users";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const baseConfig: Config = {
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Products,
    Coupons,
    Categories,
    Media,
    Currencies,
    Users,
    Orders,
  ],
  cors: [getServerSideURL()].filter(Boolean),
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.PAYLOAD_DATABASE_URI || "",
    },
  }),
  sharp,
  plugins: [
    ...plugins,
    // storage-adapter-placeholder
  ],
  upload: {
    limits: {
      fileSize: 25000000, // 25MB
    },
  },
  localization: {
    locales: [
      {
        label: "English",
        code: "en",
      },
      {
        label: "Arabic",
        code: "ar",
        // opt-in to setting default text-alignment on Input fields to rtl (right-to-left)
        // when current locale is rtl
        rtl: true,
      },
    ],
    defaultLocale: "en",
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true;

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get("authorization");
        return authHeader === `Bearer ${process.env.PAYLOAD_CRON_SECRET}`;
      },
    },
    tasks: [],
  },
};

export const configurePayload = () => {
  return buildConfig(baseConfig);
};
