import { test, type Page, type Locator, expect } from "@playwright/test";

interface VerifyProductNameInput {
  productName: string;
  itemNumber?: number;
}

interface VerifyProductQuantityInput {
  productName: string;
  productQuantity: number;
  itemNumber?: number;
}

interface verifyProductDescriptionInput {
  productName: string;
  productDescription: string;
  itemNumber?: number;
}

interface verifyProductPriceInput {
  productName: string;
  productPrice: string;
  itemNumber?: number;
}

export class ShoppingCartPage {
  readonly page: Page;
  readonly productName: Locator;
  readonly productQuantity: Locator;
  readonly productDescription: Locator;
  readonly productPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.getByTestId("inventory-item-name");
    this.productQuantity = page.getByTestId("item-quantity");
    this.productDescription = page.getByTestId("inventory-item-desc");
    this.productPrice = page.getByTestId("inventory-item-price");
  }

  async verifyProductName(input: VerifyProductNameInput): Promise<void> {
    const { productName, itemNumber = 1 } = input;

    await test.step(`Verify product name in shopping cart must be ${productName}`, async () => {
      expect(await this.productName.nth(itemNumber - 1).textContent()).toBe(
        productName
      );
    });
  }

  async verifyProductQuantity(
    input: VerifyProductQuantityInput
  ): Promise<void> {
    const { productName, productQuantity, itemNumber = 1 } = input;

    await test.step(`Verify quantity of ${productName} in shopping cart must be ${productQuantity}`, async () => {
      expect(
        Number(await this.productQuantity.nth(itemNumber - 1).textContent())
      ).toBe(productQuantity);
    });
  }

  async verifyProductDescription(
    input: verifyProductDescriptionInput
  ): Promise<void> {
    const { productName, productDescription, itemNumber = 1 } = input;

    await test.step(`Verify description of ${productName} in shopping cart must be ${
      productDescription.slice(0, 20) + " ..."
    }`, async () => {
      expect(
        await this.productDescription.nth(itemNumber - 1).textContent()
      ).toBe(productDescription);
    });
  }

  async verifyProductPrice(input: verifyProductPriceInput): Promise<void> {
    const { productName, productPrice, itemNumber = 1 } = input;

    await test.step(`Verify price of ${productName} in shopping cart must be ${productPrice}`, async () => {
      expect(await this.productPrice.nth(itemNumber - 1).textContent()).toBe(
        productPrice
      );
    });
  }
}
