"use server";

import { prisma } from "@/lib/prisma";
import { getPayload } from "payload";
import config from "@repo/payload/payload-config";

export default async function getBagProducts(user_id: string) {
  // const payload = await getPayload({ config: config });
  // const currencies = await payload.find({
  //   collection: "currencies",
  // });
  // console.log({ currencies });
  const bagProducts = await prisma.bagProducts.findMany({
    where: {
      userId: user_id,
    },
  });

  return bagProducts.map((e) => ({
    ...e,
    quantity: e.quantity.toNumber(),
  }));
}
