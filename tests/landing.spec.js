// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Movie List by Paule/i);
});

test('Visible Navbar Btns', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  
  await page.getByRole('link', { name: /home/i }).isVisible();
  await page.getByRole('link', { name: /favorites/i }).isVisible();
  await page.getByRole('link', { name: /about/i }).isVisible();

});

test('get started link', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: /See reviews of the latest movies and TV shows./i })).toBeVisible();
});

test('Visual Regression - Landing Page', async ({ page }) => {
  await page.goto('/'); // Navigates to your base URL
  
  // Wait for the page to be fully stable
  await page.waitForLoadState('networkidle'); 
  
  // Asserts the visual output of the page against a saved "golden" image
  await expect(page).toHaveScreenshot('landing-page.png', {
    fullPage: true,
    animations: 'disabled', // Suppresses CSS animations to prevent flaky diffs
  });
});