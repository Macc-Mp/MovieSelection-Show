// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Movie List/);
});

test('Visible Navbar Buttons', async ({ page }) => {
  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
  await expect(page.getByRole('link', { name: /Home/i })).toBeVisible(); 
  await expect(page.getByRole('link', { name: /Favorites/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /About/i })).toBeVisible();
});

test('get started link', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'See reviews of the latest movies and TV shows.' })).toBeVisible();
});
