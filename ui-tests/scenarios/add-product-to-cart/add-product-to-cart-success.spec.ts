import { test } from "../../page-object-models";
import testData from "./test-data/add-product-to-cart-success.test-data.json";

test.describe("Add product to cart success", () => {
  for (const [_, data] of Object.entries(testData)) {
    const {
      username,
      password,
      productName,
      productDescription,
      productPrice,
      productQuantity,
    } = data;

    test(`A ${username} logs in and adds a ${productName} product to the shopping cart`, async ({
      loginPage,
      productsPage,
      shoppingCartPage,
    }) => {
      const PRODUCT_NAME = "Sauce Labs Backpack";
      const PRODUCT_DESC =
        "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.";
      const PRODUCT_PRICE = "$29.99";

      await loginPage.visit();

      await loginPage.login({ username, password });

      await loginPage.verifyRedirectToProductsPageAfterLoggedIn();

      await productsPage.addProductToCart(productName);

      await productsPage.verifyNumberOfProductInShoppingCart(productQuantity);

      await productsPage.viewShoppingCart();

      await shoppingCartPage.verifyProductName({ productName });

      await shoppingCartPage.verifyProductQuantity({
        productName,
        productQuantity,
      });

      await shoppingCartPage.verifyProductDescription({
        productName,
        productDescription,
      });

      await shoppingCartPage.verifyProductPrice({
        productName,
        productPrice,
      });
    });
  }
});
