const { expect } = require('@playwright/test');

exports.pageobject_checkout = class pageobject_checkout {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.txtfirstname = page.locator('[data-test="firstName"]');
    this.txtlastname = page.locator('[data-test="lastName"]');
    this.txtpostalCode = page.locator('[data-test="postalCode"]');
    this.button_continue = page.getByRole('button', { name: 'CONTINUE' });
    this.button_finish= page.getByRole('link', { name: 'FINISH' });
    this.menu =page.getByRole('button', { name: 'Open Menu' });
    this.logout =page.getByRole('link', { name: 'Logout' });
    this.orderconfirmationmessage = page.getByText('THANK YOU FOR YOUR ORDER');
    

}

  
async user_enter_firstname(firstName) {
    await this.txtfirstname.fill(firstName);
  }

  async user_enter_lastname(lastName) {
    await this.txtlastname.fill(lastName);
  }

  async user_enter_postalCode(postalCode) {
    await this.txtpostalCode.fill(postalCode);
  }
  
  async user_clicks_on_continue_button() {
    await this.button_continue.click();
  }


  async user_click_on_finish_button() {
    await this.button_finish.click();
  }

  async verify_order_confirmation_message() {
    await expect(this.orderconfirmationmessage).toBeVisible();
  }
 
  async user_click_on_menu() {
    await this.menu.click();
  }

  async user_click_on_logout() {
    await this.logout.click();
  }

};