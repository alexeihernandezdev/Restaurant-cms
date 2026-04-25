import "@testing-library/jest-dom";

import type { Assertion } from "@testing-library/jest-dom/matchers";

declare module "vitest" {
  interface Expect<T = unknown> extends Assertion<T> {}
}
