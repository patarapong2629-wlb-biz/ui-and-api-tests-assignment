import { type Page, type Locator, expect } from '@playwright/test';

export class ShoppingCartPage {
  readonly page: Page;
  readonly productName: Locator;
  readonly productQuantity: Locator;
  readonly productDescription: Locator;
  readonly productPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.getByTestId('inventory-item-name');
    this.productQuantity = page.getByTestId('item-quantity');
    this.productDescription = page.getByTestId('inventory-item-desc');
    this.productPrice = page.getByTestId('inventory-item-price');
  }

  async checkProductName(productName: string, itemNumber: number = 1) {
    expect(await this.productName.nth(itemNumber - 1).textContent()).toBe(
      productName
    );
  }

  async checkProductQuantity(quantity: number, itemNumber: number = 1) {
    expect(
      Number(await this.productQuantity.nth(itemNumber - 1).textContent())
    ).toBe(quantity);
  }

  async checkProductDescription(description: string, itemNumber: number = 1) {
    expect(
      await this.productDescription.nth(itemNumber - 1).textContent()
    ).toBe(description);
  }

  async checkProductPrice(price: string, itemNumber: number = 1) {
    expect(await this.productPrice.nth(itemNumber - 1).textContent()).toBe(
      price
    );
  }
}
