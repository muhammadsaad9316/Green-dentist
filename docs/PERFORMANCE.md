# Performance Monitoring

## Lighthouse CI

We use Lighthouse CI (`lhci`) to monitor performance, accessibility, best practices, and SEO.

### Configuration

Configuration is located in `lighthouserc.js`. We use the `collect` command to run Lighthouse against a local production build.

### Running Locally

1.  **Build the production bundle:**
    ```bash
    npm run build
    ```

2.  **Run Lighthouse CI:**
    ```bash
    npm run lighthouse
    ```

This will:
1.  Start the production server (`npm run start`) on port 3000.
2.  Run Lighthouse audits 3 times (configured in `lighthouserc.js`).
3.  Save HTML reports to `./lhci_reports`.

### Assertions

We enforce the following minimum scores in `lighthouserc.js`:

-   **Performance:** 0.9 (Warning)
-   **Accessibility:** 0.9 (Error)
-   **Best Practices:** 0.9 (Warning)
-   **SEO:** 0.9 (Warning)

### CI Integration

To integrate with CI (e.g., GitHub Actions), use the `@lhci/cli` and configure the `upload` target to a temporary public storage or a LHCI server. Currently, it is configured to save reports to the local filesystem.
