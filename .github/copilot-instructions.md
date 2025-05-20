# Project Overview

This repository is a **standard Eleventy 3.1** project configured with **Liquid** templates and **Tailwind 4**, driven entirely by **ESM**. We use Eleventy hooks (`eleventy.before` + `eleventy.beforeWatch`) to compile Tailwind via PostCSS (with Autoprefixer and cssnano). Unit testing is provided by **Jest** (configured for ESM), linting by **Stylelint** for CSS, **liquid-linter-cli** for templates, **markdownlint-cli** for Markdown content, and **Playwright** for end‑to‑end checks. Deployment is handled by **Netlify**, with the **Netlify CLI** used locally, and **Netlify Forms** for form handling.

All generated site files go into the default `_site/` folder. We always invoke Eleventy via `npx @11ty/eleventy` to ensure the locally installed version is used.

---

## Conventions

### Directory Structure

```text
my-project/
├── package.json           # "type": "module" enables ESM
├── netlify.toml           # Netlify build & dev settings
├── .eleventy.js           # Eleventy config with CSS hooks & collections
├── jest.config.cjs        # Jest ESM config
├── playwright.config.ts   # Playwright E2E config
├── stylelint.config.cjs   # CSS lint rules
├── markdownlint.config.cjs# Markdown lint rules
├── tailwind.config.js     # Tailwind utilities config
└── src/
    ├── _data/             # JSON/YAML for global data
    ├── _includes/         # layouts + components
    │   ├── layouts/
    │   └── components/
    ├── assets/
    │   ├── styles/        # Tailwind entrypoint: index.css
    │   └── js/            # static scripts passthrough
    ├── index.liquid       # homepage
    ├── about.liquid       # about page
    ├── posts/             # blog posts (Markdown files)
    │   └── my-first-post.md
```

- **ESM**: All config and scripts use `import`/`export`.
- **Scripts** (in `package.json`):

  ```jsonc
  {
    "scripts": {
      "build": "npx @11ty/eleventy",
      "start": "npx @11ty/eleventy --serve",
      "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js",
      "test:e2e": "npx playwright test",
      "lint:css": "stylelint \"src/assets/styles/**/*.css\"",
      "lint:liquid": "liquid-linter-cli \"src/**/*.{liquid,html}\"",
      "lint:md": "markdownlint "src/posts/**/*.md"",
      "lint": "npm run lint:css && npm run lint:liquid && npm run lint:md",
      "deploy": "npx netlify deploy --prod --dir=_site"
    }
  }
  ```

### Eleventy Collections

Use Eleventy’s collections API to gather Markdown blog posts:

1. **Define** a `posts` collection in `.eleventy.js`:

   ```js
   eleventyConfig.addCollection("posts", (collection) =>
     collection
       .getFilteredByGlob("src/posts/*.md")
       .sort((a, b) => b.date - a.date)
   );
   ```

2. **Frontmatter** in each post (`src/posts/*.md`):

   ```yaml
   ---
   title: "My First Post"
   date: 2025-05-18
   tags: [blog]
   layout: layouts/base.liquid
   ---
   Your Markdown content here.
   ```

3. **Render** in a template, e.g., `src/index.liquid`:

   ```liquid
   <h1>Blog Posts</h1>
   <ul>
     {% for post in collections.posts %}
       <li>
         <a href="{{ post.url }}">{{ post.data.title }}</a>
         <time datetime="{{ post.date }}">{{ post.date | date: "%B %-d, %Y" }}</time>
       </li>
     {% endfor %}
   </ul>
   ```

This setup organizes Markdown-based blog posts with consistent ordering and access to metadata.

---

## CSS Pipeline

1. **Entrypoint**: `src/assets/styles/index.css` contains only:

   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

2. **Build hooks** in `.eleventy.js`:

   - `eleventy.before`: compiles Tailwind + Autoprefixer + cssnano on the initial build.
   - `eleventy.beforeWatch`: recompiles CSS only when `.css` changes during `--serve`.

3. **Output**: `_site/assets/css/styles.css`.

---

## Testing & Linting

- **Jest**: unit tests (`*.test.js`) under `src/`, runs in Node ESM.
- **Playwright**: E2E tests under `e2e/`, runs across mobile/tablet/desktop viewports, verifies HTML structure and CSS utilities using Eleventy’s dev server.
- **Stylelint**: enforces `stylelint-config-standard` on CSS.
- **Liquid Linter**: checks `.liquid` and `.html` templates.
- **Markdownlint**: enforces rules on `src/posts/**/*.md` via `markdownlint-cli`.

---

## Tailwind Guidelines

- **Do not** extend the default theme in `tailwind.config.js`. Rely exclusively on utility classes to maintain bundle size and predictability.
- **Do** create reusable UI _components_ in `src/_includes/components/` (e.g., `button.liquid`, `card.liquid`), composing utility classes into higher-level building blocks.

---

## Deployment to Netlify

1. **`netlify.toml`** at project root:

   ```toml
   [build]
     command   = "npm run build"
     publish   = "_site"

   [dev]
     command   = "npx @11ty/eleventy --serve"
     port      = 8080

   [[plugins]]
     package = "@netlify/plugin-lighthouse"
   ```

2. **Netlify CLI**:

   - Install locally as a dev dependency:

     ```bash
     npm install -D netlify-cli
     ```

   - Deploy via:

     ```bash
     npx netlify deploy --prod --dir=_site
     ```

---

## Netlify Forms

To capture form submissions without a backend, use Netlify Forms:

1. **Form include**: `src/_includes/components/form-contact.liquid`:

   ```liquid
   <form name="contact" method="POST" data-netlify="true">
     <input type="hidden" name="form-name" value="contact">
     <label>Name: <input type="text" name="name" required></label>
     <label>Email: <input type="email" name="email" required></label>
     <button type="submit">Send</button>
   </form>
   ```

2. **Include**:

   ```liquid
   {% include "components/form-contact.liquid" %}
   ```

3. **Thank-you** page: Create `thank-you.liquid` and set form `action="/thank-you/"`.

---

## Footguns to Avoid

1. **Stale CSS**: Template changes don’t trigger `eleventy.beforeWatch`. Edit CSS files to rebuild.
2. **Global Overrides**: Avoid custom global CSS outside Tailwind layers.
3. **Path mismatches**: Ensure CSS hook paths (`SRC_CSS`, `OUT_CSS`) and `netlify.toml` `publish` dir align.
4. **Missing `npx`**: Always use `npx @11ty/eleventy`.
5. **Liquid syntax**: Include `.liquid` file extensions explicitly.
6. **ESM mismatch**: Keep all JS as ESM; do not mix CommonJS.
7. **Netlify Forms hidden input**: Required `<input name="form-name">`.
8. **Markdown frontmatter**: Missing `---` delimiters breaks collections.
9. **Markdownlint config**: Forgetting a config file may use defaults but miss custom rules.

---

Adhering to these guidelines ensures a consistent, fast, and reliable workflow—for both developers and any AI tooling you integrate.
