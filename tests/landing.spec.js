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
