import { getPayload, Payload } from "payload";
import config from "@repo/payload/payload-config";

export const getPayloadClient = () => getPayload({ config });
