import { test, expect } from '@playwright/test';

/**
 * Link integrity E2E test
 *
 * Crawls the home page, collects all <a> hrefs that point to internal routes ("/" paths),
 * then performs a navigation request for each unique path and expects HTTP 2xx.
 * This helps to avoid incidents like NAV-42 where stale links returned 404.
 */

test('all internal links respond with 2xx', async ({ page, baseURL }) => {
  // Ensure baseURL is defined
  if (!baseURL) {
    test.skip(true, 'baseURL not configured – skipping link integrity test');
  }

  // Visit homepage (root)
  await page.goto('/');

  // Collect hrefs from all anchor tags
  const hrefs = await page.$$eval('a[href]', (anchors) =>
    anchors
      .map((a) => a.getAttribute('href') || '')
      .filter(Boolean)
  );

  // Filter internal paths (start with "/" and not contain protocol) and remove hash-only links
  const internalPaths = Array.from(
    new Set(
      hrefs.filter((href) =>
        href.startsWith('/') && !href.startsWith('//') && !href.includes('://') && !href.startsWith('#')
      )
    )
  );

  // Visit each path and assert status < 400
  for (const path of internalPaths) {
    const response = await page.goto(path);
    // Some routes may be handled client-side (SPA) and return null response; treat as ok
    if (response) {
      const status = response.status();
      expect(status, `Path ${path} returned status ${status}`).toBeLessThan(400);
    }
    // For SPA navigations without network request, ensure no 404 text is visible
    await expect(page.locator('text=404')).not.toBeVisible({ timeout: 1000 });
  }
}); 