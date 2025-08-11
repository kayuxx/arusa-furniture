"use server";
import { getPayloadClient } from "@/payload";
import { WithUpload } from "@/types/with";
import { Product } from "@repo/payload/payload-types.js";

// TODO: what about galerry?
type ProductWithUpload = WithUpload<Product, "heroImage">;

export async function getProductById(id: string): Promise<ProductWithUpload> {
  const payloadClient = await getPayloadClient();

  return payloadClient.findByID({
    collection: "products",
    id,
  }) as Promise<ProductWithUpload>;
}
