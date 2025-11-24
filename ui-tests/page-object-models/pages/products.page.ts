import { test, type Page, type Locator, expect } from "@playwright/test";

export class ProductsPage {
  readonly page: Page;
  readonly shoppingCartLink: Locator;
  readonly shoppingCartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shoppingCartLink = page.getByTestId("shopping-cart-link");
    this.shoppingCartBadge = page.getByTestId("shopping-cart-badge");
  }

  async addProductToCart(productName: string): Promise<void> {
    await test.step(`Add "${productName}" product to shopping cart`, async () => {
      const dataTest = `add-to-cart-${productName
        .toLowerCase()
        .replaceAll(" ", "-")}`;
      const addToCartButton = this.page.getByTestId(dataTest);
      await addToCartButton.click();
    });
  }

  async viewShoppingCart(): Promise<void> {
    await test.step("View shopping cart", async () => {
      await this.shoppingCartLink.click();
    });
  }

  async verifyNumberOfProductInShoppingCart(
    numberOfProducts: number
  ): Promise<void> {
    await test.step(`Verify number of profucts in shopping cart must be ${numberOfProducts}`, async () => {
      const numberOfProductsInShoppingCart = Number(
        await this.shoppingCartBadge.textContent()
      );
      expect(numberOfProductsInShoppingCart).toBe(numberOfProducts);
    });
  }
}
