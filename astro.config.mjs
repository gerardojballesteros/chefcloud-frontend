import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  image: {
    domains: ["chefcloud-assets.s3.sa-east-1.amazonaws.com"],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
