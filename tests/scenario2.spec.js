import { test, expect } from '@playwright/test';
const{pageobject_Login}=require('../SwagLabsproject/PageObjectModel/pageobject_Login');
const{pageobject_productlist}=require('../SwagLabsproject/PageObjectModel/pageobject_productlist');
const{pageobject_shoppingcart}=require('../SwagLabsproject/PageObjectModel/pageobject_shoppingcart');
const{pageobject_checkout}=require('../SwagLabsproject/PageObjectModel/pageobject_checkout');




 //Validate Order Confirmation Message
test('scenario2', async ({ page }) => {
  const loginPage = new pageobject_Login(page);
  const productlistPage = new pageobject_productlist(page);
  const shoppingcartPage = new pageobject_shoppingcart(page);
  const checkoutPage = new pageobject_checkout(page);
  await loginPage.goto();
  await loginPage.user_enter_username('standard_user');
  await loginPage.user_enter_password('secret_sauce');
  await loginPage.user_click_on_Login_Button();

  await productlistPage.user_selects_product_bag();
  await productlistPage.user_click_on_addtocart_button();

  await shoppingcartPage.verify_product_count_under_cart('1'); 
  await shoppingcartPage.user_clicks_on_cart();
  await shoppingcartPage.verify_product_visible_under_cart('Sauce Labs Backpack');
  await shoppingcartPage.user_click_on_checkout_button();

  await checkoutPage.user_enter_firstname('abc');
  await checkoutPage.user_enter_lastname('xyz');
  await checkoutPage.user_enter_postalCode('123');
  await checkoutPage.user_clicks_on_continue_button();
  await checkoutPage.user_click_on_finish_button();
  await checkoutPage.verify_order_confirmation_message();

}); 
