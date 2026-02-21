import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { schemaTypes } from "@/sanity/schema-types";
import { projectId, dataset } from "@/sanity/env";
import { structure } from "@/structure";

export default defineConfig({
  name: "default",
  title: "Next Netlify Test",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: {
        initial: process.env.SANITY_STUDIO_PREVIEW_ORIGIN ?? "http://localhost:3000",
        preview: "/",
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
