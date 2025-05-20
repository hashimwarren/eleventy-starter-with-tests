import fs from "fs";
import path from "path";
import postcss from "postcss";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/postcss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";

// Get __dirname equivalent in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SRC_CSS = "src/assets/styles/index.css";
const OUT_CSS = "_site/assets/css/styles.css";

export default function (eleventyConfig) {
  // Copy JS
  eleventyConfig.addPassthroughCopy("src/assets/js");

  // Tailwind CSS compilation
  async function compileCSS() {
    console.log("Compiling Tailwind CSS...");
    try {
      const css = fs.readFileSync(SRC_CSS, "utf-8");

      // Create a full Tailwind build including all classes for testing
      // This helps ensure all classes are available for tests regardless of purging
      const result = await postcss(
        [
          tailwindcss({
            config: path.resolve(__dirname, "tailwind.config.js"),
            mode: process.env.NODE_ENV === "production" ? "build" : "watch",
          }),
          autoprefixer,
          process.env.NODE_ENV === "production" ? cssnano : null,
        ].filter(Boolean)
      ).process(css, {
        from: SRC_CSS,
        to: OUT_CSS,
      });

      fs.mkdirSync("_site/assets/css", { recursive: true });
      fs.writeFileSync(OUT_CSS, result.css);

      // Verify important classes are included
      const importantClasses = ["bg-gray-800", "text-white", "container"];
      const missingClasses = importantClasses.filter(
        (cls) => !result.css.includes(cls)
      );

      if (missingClasses.length > 0) {
        console.warn(
          `Warning: Some important Tailwind classes are missing: ${missingClasses.join(
            ", "
          )}`
        );
      } else {
        console.log(
          "✅ All important Tailwind classes are included in the output"
        );
      }

      console.log(
        `Tailwind CSS compilation complete (${result.css.length} bytes)`
      );
    } catch (error) {
      console.error("Error compiling CSS:", error);
      throw error; // Re-throw to stop the build if CSS compilation fails
    }
  }

  eleventyConfig.on("eleventy.before", async () => {
    await compileCSS();
  });
  eleventyConfig.on("eleventy.beforeWatch", async ({ changedFiles }) => {
    if (changedFiles && [...changedFiles].some((f) => f.endsWith(".css"))) {
      await compileCSS();
    }
  });

  // Collections
  eleventyConfig.addCollection("posts", (collection) =>
    collection
      .getFilteredByGlob("src/posts/*.md")
      .sort((a, b) => b.date - a.date)
  );

  // Passthrough for static assets
  eleventyConfig.addPassthroughCopy({ "src/assets/images": "assets/images" });

  return { dir: { input: "src", output: "_site" } };
}
