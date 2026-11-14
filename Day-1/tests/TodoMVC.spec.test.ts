import { test, expect } from "@playwright/test";

test("Add 3 tasks", async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc/#/");

  const input = page.getByRole("textbox", {
    name: "What needs to be done?",
  });

  await input.fill("Learn TypeScript");
  await input.press("Enter");

  await input.fill("Learn Playwright");
  await input.press("Enter");

  await input.fill("Practice Locators");
  await input.press("Enter");

  const totalTaskCount = page.getByTestId("todo-item");
  await expect(totalTaskCount).toHaveCount(3);

  await expect(
    page.getByText("Learn TypeScript", { exact: true }),
  ).toBeVisible();

  await expect(
    page.getByText("Learn Playwright", { exact: true }),
  ).toBeVisible();

  await expect(
    page.getByText("Practice Locators", { exact: true }),
  ).toBeVisible();
});

test("Complete one task", async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc/#/");

  const inputField = page.getByRole("textbox", {
    name: "What needs to be done?",
  });

  await inputField.fill("Learn TypeScript");
  await inputField.press("Enter");

  const CompletedTask = page
    .getByTestId("todo-item")
    .filter({ hasText: "Learn TypeScript" });

  await CompletedTask.getByRole("checkbox").check();

  expect(CompletedTask.getByRole("checkbox")).toBeChecked();

  await inputField.fill("Learn Playwright");
  await inputField.press("Enter");
  await inputField.fill("Practice Locators");
  await inputField.press("Enter");

  const InCompletedTask = page
    .getByTestId("todo-item")
    .filter({ hasNotText: "Learn TypeScript" });

  await expect(
    InCompletedTask.getByRole("checkbox", { checked: true }),
  ).toHaveCount(0);
});

test("Add task using placeholder locator", async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc/#/");
  const input = page.getByPlaceholder("What needs to be done?");

  await input.fill("Learning geByPlaceholder");
  await input.press("Enter");

  await expect(
    page.getByText("Learning geByPlaceholder", { exact: true }),
  ).toBeVisible();
});

test("Removing the Task and viewing completed task and pending Tasks", async ({
  page,
}) => {
  await page.goto("https://demo.playwright.dev/todomvc/#/");

  const input = page.getByPlaceholder("What needs to be done?");
  await input.fill("Complete this");
  await input.press("Enter");

  const completedTask = page
    .getByTestId("todo-item")
    .filter({ hasText: "Complete this" });

  await completedTask.getByRole("checkbox").check();

  await input.fill("Pending");
  await input.press("Enter");
  await page.getByRole("link", { name: "Completed" }).click();
  await expect(page.getByText("Complete this", { exact: true })).toBeVisible();
  await page.getByRole("link", { name: "Active" }).click();

  await expect(page.getByText("Pending", { exact: true })).toBeVisible();
});
