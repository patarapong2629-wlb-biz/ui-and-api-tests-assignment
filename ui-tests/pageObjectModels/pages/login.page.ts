import { test, type Page, type Locator, expect } from "@playwright/test";

interface LoginInput {
  username: string;
  password: string;
}

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByTestId("username");
    this.passwordInput = page.getByTestId("password");
    this.loginButton = page.getByTestId("login-button");
  }

  async visit(): Promise<void> {
    await test.step("Visit login page", async () => {
      await this.page.goto("/");
    });
  }

  async login(input: LoginInput): Promise<void> {
    const { username, password } = input;

    await test.step(`Login with username ${username}`, async () => {
      await this.usernameInput.fill(username);
      await this.passwordInput.fill(password);
      await this.loginButton.click();
    });
  }

  async verifyRedirectToProductsPageAfterLoggedIn(): Promise<void> {
    await test.step("Verify redirect to products page after logged in", async () => {
      await expect(this.page).toHaveURL(/inventory/);
    });
  }
}
