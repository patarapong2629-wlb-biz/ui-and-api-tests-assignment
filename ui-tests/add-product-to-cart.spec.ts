import { test } from './utils';

test.describe('Add product to cart', () => {
  test('A standard_user logs in and adds a "Sauce Labs Backpack" product to the shopping cart', async ({
    loginPage,
    productsPage,
    shoppingCartPage,
  }) => {
    const USERNAME = 'standard_user';
    const PASSWORD = 'secret_sauce';
    const PRODUCT_NAME = 'Sauce Labs Backpack';
    const PRODUCT_DESC =
      'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.';
    const PRODUCT_PRICE = '$29.99';
    const QUANTITY = 1;

    await test.step('Visit login page', async () => {
      await loginPage.visit();
    });

    await test.step(`Login with ${USERNAME}`, async () => {
      await loginPage.login(USERNAME, PASSWORD);
    });

    await test.step('Check redirect to products page after logged in', async () => {
      await loginPage.checkRedirectToProductsPageAfterLoggedIn();
    });

    await test.step(`Add "${PRODUCT_NAME}" product to shopping cart`, async () => {
      await productsPage.addProductToCart(PRODUCT_NAME);
    });

    await test.step(`Check number of items in shopping cart must be ${QUANTITY}`, async () => {
      await productsPage.checkNumberOfItemsInShoppingCart(QUANTITY);
    });

    await test.step('View shopping cart', async () => {
      await productsPage.viewShoppingCart();
    });

    await test.step(`Check product name in shopping cart must be ${PRODUCT_NAME}`, async () => {
      await shoppingCartPage.checkProductName(PRODUCT_NAME);
    });

    await test.step(`Check quantity of ${PRODUCT_NAME} in shopping cart must be ${QUANTITY}`, async () => {
      await shoppingCartPage.checkProductQuantity(QUANTITY);
    });

    await test.step(`Check description of ${PRODUCT_NAME} in shopping cart must be ${
      PRODUCT_DESC.slice(0, 20) + ' ...'
    }`, async () => {
      await shoppingCartPage.checkProductDescription(PRODUCT_DESC);
    });

    await test.step(`Check price of ${PRODUCT_NAME} in shopping cart must be ${PRODUCT_PRICE}`, async () => {
      await shoppingCartPage.checkProductPrice(PRODUCT_PRICE);
    });
  });
});
