import { defineQuery } from "next-sanity";
import { client } from "./client";
import { PRODUCT_QUERY } from "./queries";
import { Product } from "@/types/sanity";

export async function getProduct(id: string): Promise<Product> {
  return await client.fetch(defineQuery(PRODUCT_QUERY), {
    id,
  });
}
