import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import vike from "vike/plugin";
import { UserConfig } from "vite";

export default {
  plugins: [react(), vike()],
  server: {},
} satisfies UserConfig;
