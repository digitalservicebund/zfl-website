// central registry for feature flags
// example: export const myFeatureFlag = !isProduction // true

import { isDevelopment } from "./stage";

export const liveAi = isDevelopment;
