import { test as base } from '@playwright/test';
import { LoginPage, ProductsPage, ShoppingCartPage } from './pages';

export const test = base.extend<{
  loginPage: LoginPage;
  productsPage: ProductsPage;
  shoppingCartPage: ShoppingCartPage;
}>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  productsPage: async ({ page }, use) => {
    const productsPage = new ProductsPage(page);
    await use(productsPage);
  },
  shoppingCartPage: async ({ page }, use) => {
    const shoppingCartPage = new ShoppingCartPage(page);
    await use(shoppingCartPage);
  },
});
