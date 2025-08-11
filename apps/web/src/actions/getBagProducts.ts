"use server";
import { prisma } from "@/lib/prisma";
import { getProductById } from "./getProductById";

export default async function getBagProducts(user_id: string) {
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
