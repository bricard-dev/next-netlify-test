import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  typegen: {
    enabled: true,
    generates: "./src/sanity/sanity.types.ts",
    overloadClientMethods: false,
  },
});
