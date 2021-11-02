import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require( "path");
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
   alias: {
    "/pubjs/": path.resolve(__dirname, "public/js"),
    "pubimg": path.resolve(__dirname, "public/img"),
     "pubimg2": path.resolve(__dirname, "src/assets"),
    }
})
