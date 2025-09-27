import { defineConfig } from "vite";
    import react from "@vitejs/plugin-react";
    import { VitePWA } from "vite-plugin-pwa";

    export default defineConfig({
      plugins: [
        react(),
        VitePWA({
          registerType: "autoUpdate",
          includeAssets: ["icons/icon-192x192.png", "icons/icon-512x512.png"],
          manifest: {
            name: "Amana Supermarket Auditing App",
            short_name: "Amana Audit",
            description: "PWA for supermarket shelf auditing and analytics.",
            theme_color: "#64A70B",
            background_color: "#ffffff",
            display: "standalone",
            start_url: "/",
            icons: [
              {
                src: "/icons/icon-192x192.png",
                sizes: "192x192",
                type: "image/png"
              },
              {
                src: "/icons/icon-512x512.png",
                sizes: "512x512",
                type: "image/png"
              }
            ]
          }
        })
      ]
    });
