import { defineQuery } from "next-sanity";
import { client } from "./client";
import { PRODUCTS_QUERY } from "./queries";
import { Product } from "@/types/sanity";

export async function getProducts(): Promise<Product[]> {
  return await client.fetch(defineQuery(PRODUCTS_QUERY));
}
