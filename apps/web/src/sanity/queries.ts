import { groq } from "next-sanity";

export const PRODUCT_QUERY = groq`*[_type == "product" && _id == $id][0]`;

export const PRODUCTS_QUERY = groq`*[_type == "product"]`;
