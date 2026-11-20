import { Page, Locator } from "@playwright/test";

export class LoginPage {
  private readonly page: Page;
  private readonly userName: Locator;
  private readonly password: Locator;
  private readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.userName = page.getByPlaceholder("Username");
    this.password = page.getByPlaceholder("Password");
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async open(): Promise<void> {
    await this.page.goto("/");
  }

  async login(username: string, password: string): Promise<void> {
    await this.userName.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}
