import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.ELEVENTY_RUN_MODE === 'build';

export default function() {
  // For development
  if (!isProd) {
    return {
      isProd: false,
      cssPath: '/assets/css/styles.css',  // CSS is now handled by postcss-cli
      jsPath: 'http://localhost:5173/src/assets/js/main.js'
    };
  }

  // For production
  const manifestPath = path.resolve(__dirname, '../../../_site/assets/js/.vite/manifest.json');
  
  if (!fs.existsSync(manifestPath)) {
    console.warn(`Vite manifest not found at ${manifestPath}. Assets may not be available.`);
    return {
      isProd: true,
      cssPath: '',
      jsPath: ''
    };
  }

  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    const mainEntry = manifest['src/assets/js/main.js'];
    
    // CSS is now handled by postcss-cli
    const cssPath = '/assets/css/styles.css';
    
    // Extract JS path from the manifest
    let jsPath = '';
    if (mainEntry) {
      jsPath = `/assets/js/${mainEntry.file}`;
    }

    return {
      isProd: true,
      cssPath,
      jsPath
    };
  } catch (error) {
    console.error('Error parsing Vite manifest:', error);
    return {
      isProd: true,
      cssPath: '',
      jsPath: ''
    };
  }
}
