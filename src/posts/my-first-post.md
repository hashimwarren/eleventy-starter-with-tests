---
title: "My First Post"
date: 2025-05-18
tags: [blog, beginner, eleventy]
layout: layouts/post.liquid
---

This is my first blog post using Eleventy with Tailwind CSS and Liquid templates.

## Getting Started

Eleventy is a simple static site generator that's perfect for blogs and documentation sites. It's flexible and allows you to use various template languages.

### Why Eleventy?

- Zero client-side JavaScript by default
- Highly customizable
- Supports multiple template languages
- Fast build times

## Tailwind Integration

Tailwind CSS is integrated using PostCSS, which compiles during the build process:

```js
// Example of Tailwind compilation in Eleventy
eleventyConfig.on("eleventy.before", async () => {
  await compileCSS();
});
```

## Next Steps

In future posts, I'll cover more advanced features of Eleventy and Tailwind.
