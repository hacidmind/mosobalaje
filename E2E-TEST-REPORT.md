# End-to-end test report

Testing started September 7, 2026; final connectivity rechecks September 10, 2026.

## Result

Not a full pass. The build and static checks passed, and the main browsing/authentication flows worked while MongoDB was reachable. Five public pages lack a top-level heading. MongoDB DNS failures subsequently blocked persistence and sign-out verification.

## Executed checks

| Check | Result |
| --- | --- |
| `npm run typecheck` | Passed, including a second run after adding test files |
| `npm run lint` | Passed |
| `npm run test:auth` | Passed: password hashes, incorrect-password rejection, TOTP, secret lengths |
| `npx tsx tests/sanitize-description.check.ts` | Passed |
| `npm run build` | Passed; production compilation, TypeScript, and route generation completed |
| Original desktop/mobile suite, 24 cases | 21 passed, 2 locator failures, 1 skipped |
| Extended desktop/mobile suite plus authentication, 30 cases | 18 passed, 10 missing-heading failures, 2 staff-heading locator failures |
| Corrected staff-route/sign-out recheck | Mobile passed; desktop blocked at login by temporary authentication unavailability |
| Isolated production persistence suite, 6 cases | Setup blocked by MongoDB DNS; no persistence case ran |

The suite counts overlap; they must not be added together as unique test cases. Both original authentication locator failures were fixed and passed in the extended run. The staff locator was also scoped to the main content; its mobile rerun passed while desktop could not get past authentication. Targeted ESLint verification of all added test/configuration files also passed.

## Confirmed issues

1. `/about`, `/contact`, `/import-process`, `/request-vehicle`, and `/vehicles` return HTTP 200 but have no `h1`. Each failed on desktop and mobile. Their page titles use section-level headings. These failures remain in `tests/full-journey.spec.ts` as reproducible checks. Since the heading assertion failed first, the later overflow/runtime assertions did not complete on these pages.
2. Settings and leads are read-only in the current UI. Source inspection confirmed no editing controls on these pages, despite the README describing editing/workflow capabilities. This is a feature/documentation mismatch, not a failed mutation test.
3. During the final recheck MongoDB SRV lookup returned `ETIMEOUT`, then `ESERVFAIL`, including an execution outside the sandbox. Desktop login displayed its temporary-unavailability message. Mobile subsequently passed staff navigation, sign-out, and API rejection after logout, indicating intermittent connectivity. Isolated database setup remained blocked.

## Verified user flows

- Anonymous staff-route redirects and unauthorized inventory API response.
- Mobile authenticated navigation across all staff pages, followed by sign-out and a 401 inventory API response.
- Generic incorrect-credential feedback; real Admin and CEO password/TOTP login on desktop and mobile before the connectivity failure.
- Inventory search, clear, empty-result reset, and sort-control selection.
- Homepage links, reduced motion, mobile navigation, and tested overflow checks.
- Real inventory-to-detail navigation and fullscreen gallery open/close.
- Failed-image fallback and simulated inventory API failure/retry.
- Rich-text vehicle-description formatting (mock inventory, without saving).
- Multi-step request validation and keyboard navigation (without final submission).
- Empty contact-form validation and unknown-page/vehicle feedback.
- Inquiry detail/workflow controls and email-link presence. Request controls passed on mobile; the earlier desktop case skipped because no requests were present.

Email and WhatsApp links were inspected without contacting anyone. No business records were intentionally changed by the completed tests; authentication created normal session/throttling records.

## Added regression coverage

- `tests/full-journey.spec.ts`: public route checks, staff protection, staff page loading/logout, vehicle details/gallery, contact validation, and not-found cases.
- `tests/persistence.spec.ts`: inventory create/edit/delete and public-detail verification; contact/custom-request submission, staff status transitions, and database verification of lead creation.
- `playwright.isolated.config.ts` and `tests/isolated-setup.ts`: production server on port 3100 with a unique disposable database. Setup refuses nonempty databases; successful setup registers teardown to remove its test database. It does not run the destructive seed script.
- `tests/auth.spec.ts`: authentication alert lookup scoped to the form to exclude Next.js's route-announcement alert.

## Rerun

With MongoDB reachable and local bootstrap/E2E credentials available:

```sh
npm run test:e2e -- --workers=1 --trace=off
npm run build
npx playwright test --config=playwright.isolated.config.ts
```

The ordinary suite deliberately skips persistence cases; they run only with the isolated configuration. The five missing-heading checks are expected to remain red until the application headings are corrected. Port 3100 must be free.

## Limits

Tested Microsoft Edge in desktop and 390px mobile emulation, not physical phones or Safari/Firefox. No live email/WhatsApp delivery, load testing, complete accessibility audit, or penetration test was performed. Valid vehicle-inquiry submission, settings editing, and lead editing were not verified. Real persistence tests are authored but remain unexecuted because setup failed.

Failure screenshots and contexts are under `test-results/` and `test-results-extended/`; these ignored local artifacts may contain application data and should not be published without review.
