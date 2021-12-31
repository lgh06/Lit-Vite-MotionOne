import { defineConfig } from "vite";
import { resolve } from "path"

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    base: "./",
    server:{
      host: true,
    },
    build: {
      // https://vitejs.dev/guide/build.html#library-mode
      // https://vitejs.dev/config/#build-lib
      lib: mode === "lib" ? {
        entry: "src/components.ts",
        formats: ["es"],
        fileName: "components",
      }: null,
      rollupOptions: {
        // https://rollupjs.org/guide/en/#external
        // if one lib marked as external, then it will not bundled inside our js files.
        external: (mode === "production" || mode === "lib") ? "" : [/^lit/, "motion", "json5"],
        // https://vitejs.dev/guide/build.html#multi-page-app
        input: mode === "lib" ? null : {
          components: resolve(__dirname, 'index.html'), // index.html's entry js
          another: resolve(__dirname, 'another.html') //  key "another" produces another.[hash].js
        },
        output:{
          // make all 'lit' to one single file.
          // https://rollupjs.org/guide/en/#outputmanualchunks
          manualChunks:{
            lit: ['lit']
          },
          // https://rollupjs.org/guide/en/#outputentryfilenames
          // entryFileNames only affect no index.html js files
          entryFileNames:  mode === "lib" ? "[name].js": '[name].[hash].js'
        }
      },
    },
  };
});
