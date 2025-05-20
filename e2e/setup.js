// e2e/setup.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const cssPath = path.join(projectRoot, "_site", "assets", "css", "styles.css");

// Verify CSS file exists before running tests
try {
  if (fs.existsSync(cssPath)) {
    const stats = fs.statSync(cssPath);
    console.log(`CSS file exists (${stats.size} bytes): ${cssPath}`);

    // Read a few bytes to verify it contains Tailwind classes
    const cssContent = fs.readFileSync(cssPath, "utf-8").substring(0, 200);
    console.log("CSS content preview:", cssContent);

    if (cssContent.includes(".bg-gray-800")) {
      console.log("✅ CSS contains Tailwind classes");
    } else {
      console.log("⚠️ Warning: CSS may not contain expected Tailwind classes!");
    }
  } else {
    console.error("❌ CSS file does not exist:", cssPath);
    process.exit(1); // Fail fast if CSS doesn't exist
  }
} catch (error) {
  console.error("Error checking CSS file:", error);
}
