import { test, expect } from "@playwright/test";

test("LOGIN_01 - Valid user can login", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  const userName = page.getByPlaceholder("Username");
  const password = page.getByPlaceholder("Password");

  await userName.fill("standard_user");
  await password.fill("secret_sauce");

  await page.locator(".submit-button").click();

  await expect(page).toHaveURL(/inventory/);
  await expect(page.locator(".inventory_list")).toBeVisible();
});

test("LOGIN_02 - Login with locked-out user", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  const userName = page.getByPlaceholder("Username");
  const password = page.getByPlaceholder("Password");

  await userName.fill("locked_out_user");
  await password.fill("secret_sauce");

  await page.locator(".submit-button").click();

  const errorMessage = page.getByText(
    "Epic sadface: Sorry, this user has been locked out.",
  );

  await expect(errorMessage).toBeVisible();
  await expect(page).toHaveURL("https://www.saucedemo.com/");
});

test("LOGIN_03 - Login with invalid password", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  const userName = page.getByPlaceholder("Username");
  const password = page.getByPlaceholder("Password");

  await userName.fill("standard_use");
  await password.fill("wrong_password");

  await page.locator(".submit-button").click();

  const errorMessage = page.locator('[data-test="error"]');

  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText(
    "Epic sadface: Username and password do not match any user in this service",
  );

  await expect(page).toHaveURL("https://www.saucedemo.com/");
});

test("LOGIN_04 - Login with empty username", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  const userName = page.getByPlaceholder("Username");
  const password = page.getByPlaceholder("Password");

  await userName.fill("");
  await password.fill("secret_sauce");

  await page.locator(".submit-button").click();

  const errorMessage = page.locator('[data-test="error"]');

  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText("Epic sadface: Username is required");

  await expect(page).toHaveURL("https://www.saucedemo.com/");
});

test("LOGIN_05 - Login with empty password", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  const userName = page.getByPlaceholder("Username");
  const password = page.getByPlaceholder("Password");

  await userName.fill("standard_user");
  await password.fill("");

  await page.locator(".submit-button").click();

  const errorMessage = page.locator('[data-test="error"]');

  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText("Epic sadface: Password is required");

  await expect(page).toHaveURL("https://www.saucedemo.com/");
});

test("LOGIN_06 - Login with empty username and password", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  await page.locator(".submit-button").click();

  const errorMessage = page.locator('[data-test="error"]');

  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText("Epic sadface: Username is required");

  await expect(page).toHaveURL("https://www.saucedemo.com/");
});
