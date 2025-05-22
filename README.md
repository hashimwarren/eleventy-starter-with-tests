# eleventy-starter-with-tests

This is a starter project for building websites with [Eleventy](https://www.11ty.dev/), a simpler static site generator. It comes pre-configured with:

*   **Tailwind CSS:** For utility-first styling.
*   **Vite:** For frontend asset bundling and a fast development server.
*   **Jest:** For JavaScript unit testing.
*   **Playwright:** For end-to-end testing.
*   **Linters:** For code quality (Stylelint for CSS, ESLint implicitly via Vite for JS, liquid-linter-cli for Liquid templates, and Markdownlint for Markdown).
*   **Netlify:** For continuous deployment.

## Available Scripts

This project includes the following scripts, which can be run using `npm run <script_name>` (or `npm <script_name>` for `start`, `test`, `build`):

*   `start`: Starts the development server with live reloading. This runs Eleventy, Vite, and PostCSS in watch mode.
*   `build`: Builds the production-ready static site to the `_site` directory. This includes running Eleventy, PostCSS, and Vite builds.
*   `test`: Runs unit tests using Jest.
*   `test:e2e`: Builds the project and then runs end-to-end tests using Playwright.
*   `lint`: Runs all linters (Stylelint for CSS, liquid-linter-cli for Liquid, and Markdownlint for Markdown).
*   `lint:css`: Runs Stylelint to lint CSS files.
*   `lint:liquid`: Runs liquid-linter-cli to lint Liquid template files.
*   `lint:md`: Runs Markdownlint to lint Markdown files.
*   `deploy`: Deploys the contents of the `_site` directory to Netlify.

**Development-specific scripts (usually run via `npm start`):**

*   `css:dev`: Compiles Tailwind CSS with PostCSS and watches for changes.
*   `eleventy:serve`: Runs Eleventy in serve mode, watching for content and template changes.
*   `vite:serve`: Runs Vite's development server.

**Build-specific scripts (usually run via `npm run build`):**

*   `css:build`: Compiles and minifies Tailwind CSS with PostCSS for production.
*   `eleventy:build`: Runs Eleventy to build the site.
*   `vite:build`: Builds and bundles frontend assets with Vite for production.

## Project Structure

A brief overview of the key directories:

*   `src/`: Contains the source files for your website.
    *   `_data/`: Global data files accessible in your templates.
    *   `_includes/`: Reusable template partials and layouts.
    *   `assets/`: Static assets like CSS, JavaScript, and images.
    *   `posts/`: Example collection for blog posts (Markdown files).
    *   Other files (e.g., `index.liquid`, `about.liquid`) are top-level pages.
*   `_site/`: The generated static website output. This directory is created during the build process and should not be committed to version control.
*   `e2e/`: Contains end-to-end tests written with Playwright.
*   `test/`: Contains unit tests (example `utils.test.js` for `src/assets/js/utils.js`).
*   `.github/`: GitHub specific files, like workflow actions or issue templates.
*   Configuration files (e.g., `.eleventy.js`, `tailwind.config.js`, `vite.config.js`) are at the root of the project.

## Key Technologies

This starter project leverages several modern web development tools:

*   **[Eleventy (11ty)](https://www.11ty.dev/):** A simpler static site generator. It's flexible and allows you to use various templating languages.
*   **[Tailwind CSS](https://tailwindcss.com/):** A utility-first CSS framework for rapidly building custom user interfaces.
*   **[Vite](https://vitejs.dev/):** A modern frontend build tool that provides an extremely fast development server and optimized builds for production. It handles JavaScript and other assets.
*   **[Jest](https://jestjs.io/):** A delightful JavaScript testing framework with a focus on simplicity. Used here for unit tests.
*   **[Playwright](https://playwright.dev/):** A framework for end-to-end testing. It allows you to automate browser interactions and verify your application's behavior from a user's perspective.
*   **[PostCSS](https://postcss.org/):** A tool for transforming CSS with JavaScript plugins. Used here primarily for Tailwind CSS and Autoprefixer.
*   **[Netlify](https://www.netlify.com/):** A platform for deploying and hosting web projects. This starter is configured for easy deployment to Netlify.
*   **Linters:**
    *   **[Stylelint](https://stylelint.io/):** For linting CSS.
    *   **[liquid-linter-cli](https://github.com/yo1dog/liquid-linter-cli):** For linting Liquid templates.
    *   **[Markdownlint](https://github.com/DavidAnson/markdownlint):** For linting Markdown files.

## Getting Started

To get a local copy up and running, follow these simple steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/eleventy-starter-with-tests.git # Replace with the actual URL if forked/copied
    cd eleventy-starter-with-tests
    ```

2.  **Install NPM packages:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm start
    ```
    This will open the site in your browser (usually at `http://localhost:8080` for Eleventy, and Vite will manage its port, often `http://localhost:5173`). Changes to your files will trigger live reloads.

## Testing

This project is configured with both unit and end-to-end tests.

### Unit Tests

Unit tests are written with [Jest](https://jestjs.io/).

*   Run all unit tests:
    ```bash
    npm test
    ```
*   Test files are typically located alongside the code they test or within a `test/` or `__tests__/` directory (e.g., `src/assets/js/utils.test.js` tests `src/assets/js/utils.js`).

### End-to-End (E2E) Tests

End-to-end tests are written with [Playwright](https://playwright.dev/). These tests simulate user interactions in a real browser environment.

*   Run all E2E tests:
    ```bash
    npm run test:e2e
    ```
    This script will first build the project (`npm run build`) and then run the Playwright tests located in the `e2e/` directory.
*   Playwright will typically run tests in headless mode. Configuration can be found in `playwright.config.ts`.

## Linting

This project uses several linters to ensure code quality and consistency.

*   **Run all linters:**
    ```bash
    npm run lint
    ```
    This will execute all the individual linting scripts.

*   **Individual linters:**
    *   CSS (Stylelint): `npm run lint:css`
        *   Configuration: `stylelint.config.cjs`
    *   Liquid Templates (liquid-linter-cli): `npm run lint:liquid`
    *   Markdown (Markdownlint): `npm run lint:md`
        *   Configuration: `markdownlint.config.cjs`
    *   JavaScript linting is typically handled by Vite/ESLint during development and build, but you can add a specific `eslint` script if needed.

## Building for Production

To create a production-ready build of your website:

```bash
npm run build
```

This command will:
1.  Run Eleventy to generate the static HTML from your templates and content.
2.  Compile and minify your CSS using PostCSS (including Tailwind CSS).
3.  Bundle and optimize your JavaScript and other assets using Vite.

The output will be placed in the `_site` directory, which is the directory that should be deployed.
