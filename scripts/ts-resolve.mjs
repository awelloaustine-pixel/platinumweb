// Lets Node (with built-in TypeScript type stripping) import the app's extensionless
// relative imports, e.g. `./lineBuilder` → `./lineBuilder.ts`.
// Usage: node --import ./scripts/ts-resolve.mjs scripts/<script>.ts
import { registerHooks } from "node:module";

registerHooks({
  resolve(specifier, context, next) {
    if (/^\.{1,2}\//.test(specifier) && !/\.[cm]?[jt]sx?$/.test(specifier)) {
      try {
        return next(`${specifier}.ts`, context);
      } catch {
        // fall through to the default resolution
      }
    }
    return next(specifier, context);
  },
});
