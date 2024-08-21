import { test, expect } from '@playwright/test';
const{pageobject_Login}=require('../SwagLabsproject/PageObjectModel/pageobject_Login');

//Validate locked out error message
test('scenario1', async ({ page }) => {
  const loginPage = new pageobject_Login(page);
  await loginPage.goto();
  await loginPage.user_enter_username('locked_out_user');
  await loginPage.user_enter_password('secret_sauce');
  await loginPage.user_click_on_Login_Button();
  await loginPage.verify_login_error_message();

}); 

