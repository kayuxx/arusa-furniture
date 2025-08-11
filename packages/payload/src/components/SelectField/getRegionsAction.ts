"use server";
import { getPayload, PaginatedDocs } from "payload";
import config from "@repo/payload/payload.config";

import { unstable_cache } from "next/cache";
import { Currency } from "@payload-types";

export default async function getCurrenciesAction(): Promise<
  PaginatedDocs<Currency>
> {
  return unstable_cache(async () => {
    const payload = await getPayload({ config });
    return await payload.find({
      collection: "currencies",
    });
  })();
}
