module.exports = {
  default: true,
  MD041: false, // allow first line heading without blank line
  MD013: false, // disable line length restrictions
  MD033: {
    // allow specific HTML elements
    allowed_elements: ["a", "br", "code", "pre", "em", "strong", "img"],
  },
  MD024: {
    // no duplicate headings in different sections
    siblings_only: true,
  },
};
