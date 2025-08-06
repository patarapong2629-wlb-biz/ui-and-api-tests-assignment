import { type Page, type Locator, expect } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly shoppingCartLink: Locator;
  readonly shoppingCartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shoppingCartLink = page.getByTestId('shopping-cart-link');
    this.shoppingCartBadge = page.getByTestId('shopping-cart-badge');
  }

  async addProductToCart(productName: string) {
    const dataTest = `add-to-cart-${productName
      .toLowerCase()
      .replaceAll(' ', '-')}`;
    const addToCartButton = this.page.getByTestId(dataTest);
    await addToCartButton.click();
  }

  async viewShoppingCart() {
    await this.shoppingCartLink.click();
  }

  async checkNumberOfItemsInShoppingCart(numberOfItems: number) {
    const numberOfItemsInShoppingCart = Number(
      await this.shoppingCartBadge.textContent()
    );
    expect(numberOfItemsInShoppingCart).toBe(numberOfItems);
  }
}
