const { expect } = require('@playwright/test');

exports.pageobject_productlist = class pageobject_productlist {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.product=page.locator('.inventory_item_name');
    this.product_bag = page.locator('.inventory_item_name').filter({ has: page.getByText('Sauce Labs Backpack')});
    this.product_bikelight = page.locator('.inventory_item_name').filter({ has: page.getByText('Sauce Labs Bike Light')});
    this.product_tshirt = page.locator('.inventory_item_name').filter({ has: page.getByText('Sauce Labs Bolt T-Shirt')});
    this.product_fleecejacket = page.locator('.inventory_item_name').filter({ has: page.getByText('Sauce Labs Fleece Jacket')});
    this.product_Onesie = page.locator('.inventory_item_name').filter({ has: page.getByText('Sauce Labs Onesie')});
    this.product_tshirtred = page.locator('.inventory_item_name').filter({ has: page.getByText('Test.allTheThings() T-Shirt (Red)')});  
    this.button_addtocart =page.getByRole('button', { name: 'ADD TO CART' });
    this.button_back= page.getByRole('button', { name: '<- Back' });

}

  
  async user_selects_product(product) {
  await this.product.getByText(product).click();
  }

  async user_selects_product_bag() {
    await this.product_bag.click();
  }

  async user_selects_product_bikelight() {
    await this.product_bikelight.click();
  }

  async user_selects_product_tshirt() {
    await this.product_tshirt.click();
  }

  async user_selects_product_fleecejacket() {
    await this.product_fleecejacket.click();
  }
 
  async user_click_on_addtocart_button() {
    await this.button_addtocart.click();
  }

  async user_click_on_back_button() {
    await this.button_back.click();
  }

};