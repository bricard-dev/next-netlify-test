import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "639jdwjd",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  },
  typegen: {
    enabled: true,
    generates: "./src/sanity/sanity.types.ts",
    overloadClientMethods: false,
  },
});
