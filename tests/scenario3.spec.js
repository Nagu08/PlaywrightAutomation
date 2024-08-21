import { test, expect } from '@playwright/test';
const{pageobject_Login}=require('../SwagLabsproject/PageObjectModel/pageobject_Login');
const{pageobject_productlist}=require('../SwagLabsproject/PageObjectModel/pageobject_productlist');
const{pageobject_shoppingcart}=require('../SwagLabsproject/PageObjectModel/pageobject_shoppingcart');
const{pageobject_checkout}=require('../SwagLabsproject/PageObjectModel/pageobject_checkout');




 ///*Validate Product is not Displayed and Also Validate that 1 at top icon is removed
test('scenario3', async ({ page }) => {
  const loginPage = new pageobject_Login(page);
  const productlistPage = new pageobject_productlist(page);
  const shoppingcartPage = new pageobject_shoppingcart(page);
  const checkoutPage = new pageobject_checkout(page);
  await loginPage.goto();
  await loginPage.user_enter_username('standard_user');
  await loginPage.user_enter_password('secret_sauce');
  await loginPage.user_click_on_Login_Button();

  await productlistPage.user_selects_product('Sauce Labs Bolt T-Shirt');
  await productlistPage.user_click_on_addtocart_button();

  await shoppingcartPage.verify_product_count_under_cart('1'); 
  await shoppingcartPage.user_clicks_on_cart();
  await shoppingcartPage.verify_product_visible_under_cart('Sauce Labs Bolt T-Shirt');
  //await shoppingcartPage.user_clicks_on_removebutton_for_product('Sauce Labs Bolt T-Shirt');
  await shoppingcartPage.user_clicks_on_removebutton_for_tshirt();
  await shoppingcartPage.verify_product_removed_from_cart('Sauce Labs Bolt T-Shirt');
  await shoppingcartPage.verify_product_count_removed_from_cart('');
  
  await checkoutPage.user_click_on_menu();
  await checkoutPage.user_click_on_logout();

}); 
