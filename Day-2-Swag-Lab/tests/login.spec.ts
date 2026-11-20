import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";

test.describe("Login Tests", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test("LOGIN_01 - Valid user can login", async ({ page }) => {
    await loginPage.login("standard_user", "secret_sauce");
    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator(".inventory_list")).toBeVisible();
  });

  test("LOGIN_02 - Login with locked-out user", async ({ page }) => {
    await loginPage.login("locked_out_user", "secret_sauce");

    await expect(loginPage.errorMessage).toHaveText(
      "Epic sadface: Sorry, this user has been locked out.",
    );

    await expect(page).toHaveURL("/");
  });

  test("LOGIN_03 - Login with invalid password", async ({ page }) => {
    await loginPage.login("standard_use", "wrong_password");
    await expect(loginPage.errorMessage).toHaveText(
      "Epic sadface: Username and password do not match any user in this service",
    );

    await expect(page).toHaveURL("/");
  });

  test("LOGIN_04 - Login with empty username", async ({ page }) => {
    await loginPage.login("", "secret_sauce");
    await expect(loginPage.errorMessage).toHaveText(
      "Epic sadface: Username is required",
    );
    await expect(page).toHaveURL("/");
  });

  test("LOGIN_05 - Login with empty password", async ({ page }) => {
    await loginPage.login("standard_user", "");

    await expect(loginPage.errorMessage).toHaveText(
      "Epic sadface: Password is required",
    );

    await expect(page).toHaveURL("/");
  });

  test("LOGIN_06 - Login with empty username and password", async ({
    page,
  }) => {
    await loginPage.login("", "");
    await expect(loginPage.errorMessage).toHaveText(
      "Epic sadface: Username is required",
    );

    await expect(page).toHaveURL("/");
  });

  test("LOGIN_07 – Problem user", async ({ page }) => {
    await loginPage.login("problem_user", "secret_sauce");
    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator(".inventory_list")).toBeVisible();
  });

  test("LOGIN_08 – Performance glitch user", async ({ page }) => {
    await loginPage.login("performance_glitch_user", "secret_sauce");

    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator(".inventory_list")).toBeVisible();
  });
});
