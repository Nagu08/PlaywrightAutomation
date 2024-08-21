const { expect } = require('@playwright/test');

exports.pageobject_shoppingcart = class pageobject_shoppingcart {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.cart_productcount = page.locator('.shopping_cart_container');
    this.cart = page.locator('.shopping_cart_container');
    this.button_remove_tshirt =page.locator('.cart_item_label').filter({ has: page.getByText('Sauce Labs Bolt T-Shirt')}).getByRole('button', { name: 'REMOVE' });
    this.button_remove_product =page.locator('.cart_item_label').getByRole('button', { name: 'REMOVE' });
    this.cartproduct= page.locator('.cart_item .cart_item_label .inventory_item_name');
    this.button_checkout= page.getByRole('link', { name: 'CHECKOUT' });
    this.product_removed_from_cart=page.locator('.cart_item_label');
}

  
  async verify_product_count_under_cart(count) {
    await expect(this.cart_productcount).toHaveText(count);
  }
  
  async verify_product_count_removed_from_cart(count) {
    await expect(this.cart_productcount).toHaveText(count);
  }


  async user_clicks_on_cart() {
    await this.cart.click();
  }

  async user_clicks_on_removebutton_for_tshirt() {
    await this.button_remove_tshirt.click();
  }

  async user_clicks_on_removebutton_for_product(product) {
    await this.button_remove_product.getByText(product).click();
  }
  
  async verify_product_removed_from_cart(product) {
    await expect(this.product_removed_from_cart.getByText(product)).toBeHidden();
  }

  async verify_product_visible_under_cart(product) {
    await expect(this.cartproduct.getByText(product)).toBeVisible();
  }
 
  async user_click_on_checkout_button() {
    await this.button_checkout.click();
  }

};