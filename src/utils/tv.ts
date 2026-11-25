import { createTV } from "tailwind-variants/config";

// every --spacing-* and --container-* token from @theme in global.css
const spacing = ["sm", "md", "lg", "2xl", "3xl", "4xl", "5xl", "kern-default"];
const container = ["a11y"];
// every @utility kern-heading-* from @theme in kern-utils.css
const kernHeading = ["display", "x-large", "large", "medium", "small"];
const twMergeConfig = {
  extend: {
    theme: { spacing, container },
    classGroups: { "kern-heading": [{ "kern-heading": kernHeading }] },
  },
};
export const tv = createTV({ twMergeConfig });
