import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "@/sanity/schema-types";
import { projectId, dataset } from "@/sanity/env";
import { structure } from "@/structure";

export default defineConfig({
  name: "default",
  title: "Next Netlify Test",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes,
  },
});
