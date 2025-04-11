import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";

export default defineConfig({
  integrations: [react()],
  output: "server",
  image: {
    domains: ["chefcloud-assets.s3.sa-east-1.amazonaws.com"],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
