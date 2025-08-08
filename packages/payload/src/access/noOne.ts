import { User } from "@/payload-types";
import { Access } from "payload";

type noOne = Access<User>;

export const noOne: noOne = () => {
  return false;
};
