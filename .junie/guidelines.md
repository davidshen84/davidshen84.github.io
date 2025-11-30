Project development guidelines

Audience: advanced Angular developers working on this repository.

Build and configuration
- Toolchain: Angular 21 with the standalone application builder (@angular/build:application). Typescript 5.9.3. Strict TS and Angular template checks enabled (see tsconfig.json and angularCompilerOptions).
- Commands (package.json):
  - Install: npm ci (preferred) or npm install
  - Local dev: npm start → ng serve (dev configuration)
  - Build: npm run build (production by default via architect defaultConfiguration). Use --configuration=development for non‑optimized builds.
  - Lint: npm run lint
  - Test: npm test → Karma/Jasmine via @angular/build:karma
- Builder options (angular.json):
  - Output path: dist/blog
  - Polyfills: zone.js
  - Service worker: ngsw-config.json is wired; @angular/service-worker is a dependency. Be mindful of caching when testing production builds.
  - Global styles: src/styles.scss; includes node_modules/katex/dist/katex.min.css
  - Global scripts: emoji-toolkit/joypixels.min.js
  - Allowed CommonJS: seedrandom, qrcode, moment, remarkable-katex (suppresses CLI warnings)
  - Style preprocessor includePaths: ["."] so Sass @use/@import can be root-relative
- Testing configuration (angular.json → architect.test):
  - Polyfills: zone.js and zone.js/testing
  - tsconfig: src/tsconfig.spec.json includes **/*.spec.ts
  - karmaConfig: src/karma.conf.js

Running tests
- Headless run (recommended):
  - npm test -- --browsers=ChromeHeadlessCI --watch=false
  - The ChromeHeadlessCI launcher is defined in src/karma.conf.js (base ChromeHeadless with --disable-gpu flag). This works in CI or headless Linux.
- Interactive run: npm test (defaults: autoWatch true, browsers [Chrome])
- Coverage: add --code-coverage to collect coverage output to coverage/ (configured reporter: html, lcovonly, text-summary). Example: npm test -- --browsers=ChromeHeadlessCI --watch=false --code-coverage
- Notes:
  - Jasmine and Karma versions are aligned with Angular 21 builder.
  - The CLI prints a Browserslist notice about Node targets being ignored; this is expected and harmless for test runs.

Adding tests
- Location/pattern: Any *.spec.ts under src/ will be picked up (see src/tsconfig.spec.json: "**/*.spec.ts").
- Example component/service tests exist across src/app; mirror their setup for new features.
- Minimal smoke test template that was verified locally during this update:
  - Create a file like src/demo/smoke.spec.ts with:
    describe('Smoke test', () => {
      it('runs the Jasmine/Karma test environment', () => {
        expect(true).toBeTrue();
      });
    });
  - Run: npm test -- --browsers=ChromeHeadlessCI --watch=false
  - Remove the demo test when done to keep the suite clean.

Development notes and conventions
- TypeScript/Angular strictness: strict, noImplicitReturns, strict templates, strict DI parameters, strict input access modifiers. Favor explicit types and immutable patterns.
- Signals: The codebase uses Angular signals (e.g., TitleService uses signal() and asReadonly()). Prefer signals for local reactive state; use RxJS only when stream composition or interop is required.
- Styling: SCSS is the default for components (schematics set style=scss). Global style includes KaTeX CSS; keep math rendering consistent by using Remarkable + remarkable-katex (already configured at runtime).
- Routing and feature areas: Several feature components exist (blog, crypto, tfjs, webcam, etc.). Follow existing folder structure under src/app/<feature> for co-location of component, template, and spec files.
- PWA/service worker: Service worker is enabled in the build configuration. When testing prod builds locally, clear caches between rebuilds to avoid stale assets.
- CommonJS deps: angular.json whitelists a few CommonJS packages. If adding new CommonJS libraries, extend allowedCommonJsDependencies to silence warnings, or prefer ESM alternatives.

Linting and formatting
- ESLint via @angular-eslint with template linting is configured (npm run lint). Target globs: src/**/*.ts, src/**/*.html.
- Prettier is included. Prefer running Prettier before commits; the rules are integrated via eslint-plugin-prettier and eslint-config-prettier.

Troubleshooting
- Chrome in CI: If Chrome is not available, install it or use Chromium with the same flags; alternatively set CHROME_BIN to the executable path. The predefined ChromeHeadlessCI launcher works well in containers.
- Port conflicts on ng serve: default dev-server runs on 4200; pass --port to npm start if needed.
- Test flakiness due to service worker: Service worker is not active during ng test or ng serve by default, but can cache during prod previews. Disable SW or clear site data if tests interact with network.
- Large bundles in test build: This project includes tfjs and other heavy deps; test bundling can be slow. Use --watch=false for faster one-off CI runs.

Repro steps executed for this documentation
- Verified the following succeeded locally:
  - npm test -- --browsers=ChromeHeadlessCI --watch=false (39/39 specs passing at the time of writing)
  - A demo smoke test compiled and ran successfully, then was removed.
