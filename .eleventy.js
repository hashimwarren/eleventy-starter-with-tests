import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default function (eleventyConfig) {
  // Collections
  eleventyConfig.addCollection("posts", (collection) =>
    collection
      .getFilteredByGlob("src/posts/*.md")
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  );

  // Passthrough for static assets like images
  eleventyConfig.addPassthroughCopy({"src/assets/images": "assets/images"});

  return {
    dir: {
      input: "src",
      output: "_site",
      // Ensure _includes is correctly specified if not default
      includes: "_includes", 
      data: "_data",
    },
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "liquid",
    templateFormats: ["html", "liquid", "md"],
  };
}
