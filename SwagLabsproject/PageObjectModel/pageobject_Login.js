const { expect } = require('@playwright/test');

exports.pageobject_Login = class pageobject_Login {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.txtUserName = page.locator('[data-test="username"]');
    this.txtPassword = page.locator('[data-test="password"]');
    this.button_Login = page.getByRole('button', { name: 'LOGIN' });
    this.login_error_mesage = page.getByText('Epic sadface: Sorry, this user has been locked out.');
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/v1/');
  }

  /*async user_enter_username() {
    await this.txtUserName.fill('standard_user');
  }*/
  //using parameter passing 
  async user_enter_username(strUserName) {
    await this.txtUserName.fill(strUserName);
  }

  /*async user_enter_password() {
    await this.txtPassword.fill('secret_sauce');
  }*/
  //using parameter passing
  async user_enter_password(stsPassword) {
    await this.txtPassword.fill(stsPassword);
  }

  async user_click_on_Login_Button() {
    await this.button_Login.click();
  }

  async verify_login_error_message() {
    await expect(this.login_error_mesage).toBeVisible();
  }


};