import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    plugins: [ vue() ],
    server: {
        port: 11111
    },
    resolve: {
        alias: {
            '@': resolve("src")
        }
    }
})
