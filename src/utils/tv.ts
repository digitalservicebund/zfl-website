import { createTV } from "tailwind-variants/config";

// every --spacing-* and --container-* token from @theme in global.css
const spacing = ["sm", "md", "lg", "2xl", "3xl", "4xl", "5xl", "kern-default"];
const container = ["a11y"];
const twMergeConfig = { extend: { theme: { spacing, container } } };
export const tv = createTV({ twMergeConfig });
