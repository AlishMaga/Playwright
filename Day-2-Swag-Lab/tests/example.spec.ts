import { test, expect } from "@playwright/test";

test("Login Successful", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  const userName = page.getByPlaceholder("Username");
  const password = page.getByPlaceholder("Password");

  await userName.fill("standard_user");
  await password.fill("secret_sauce");

  await page.locator(".submit-button").click();

  await expect(page.getByText("Products", { exact: true })).toBeVisible();
});

test("Wrong Password Error Messege check", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  const userName = page.getByPlaceholder("Username");
  const password = page.getByPlaceholder("Password");

  await userName.fill("Wrong username");
  await password.fill("wrong password");

  await page.locator(".submit-button").click();

  const errorMessage = page.getByText(
    "Username and password do not match any user in this service",
  );

  await expect(errorMessage).toBeVisible();
});

test("Password wrong/ empty password", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  const userName = page.getByPlaceholder("Username");
  const password = page.getByPlaceholder("Password");

  await userName.fill("Wrong username");
  await password.fill("");

  await page.locator(".submit-button").click();

  const errorMessage = page.getByText("Password is required");

  await expect(errorMessage).toBeVisible();
});
