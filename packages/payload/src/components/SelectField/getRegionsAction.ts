"use server";
import { getPayload } from "payload";
import config from "@repo/payload/payload.config";

import { unstable_cache } from "next/cache";
import { Region } from "@payload-types";

export default async function getMarketsAction(): Promise<Region> {
  return unstable_cache(
    async () => {
      const payload = await getPayload({ config });
      return await payload.findGlobal({
        slug: "regions",
      });
    },
    undefined,
    { tags: ["g_regions"] },
  )();
}
