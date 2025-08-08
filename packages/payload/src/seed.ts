import { getPayload } from "payload";
import config from "@payload-config";

const seed = async () => {
  // Get a local copy of Payload by passing your config
  const payload = await getPayload({ config });

  const user = await payload.create({
    collection: "users",
    data: {
      email: "editor@payloadcms.com",
      password: "editor@payloadcms.com",
      name: "Editor 1",
      roles: ["editor"],
    },
  });
};

// Call the function here to run your seed script
await seed();
