import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";

export default defineConfig(({ mode }) => {
  const envDir = fileURLToPath(new URL("./", import.meta.url));
  const env = { ...loadEnv(mode, envDir, ""), ...process.env };
  const port = Number(env.PORT ?? 5173);
  const proxy = {
    "/api": {
      target: env.API_URL ?? "http://localhost:11000",
    },
  };

  return {
    envDir,
    plugins: [react(), tailwindcss()],
    server: { port, strictPort: true, proxy },
    preview: { port, strictPort: true, proxy },
    build: { outDir: "dist", sourcemap: true },
  };
});
