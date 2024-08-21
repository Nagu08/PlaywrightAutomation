import { test, expect } from '@playwright/test';
const{pageobject_Login}=require('../SwagLabsproject/PageObjectModel/pageobject_Login');
const testuserdetails1 =require('../Testdata/testuserdetails.json')
const testuserdetails2 =require('../Testdata/testuserdetails.json')





test('test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/v1/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.getByRole('button', { name: 'LOGIN' }).click();
  await page.locator('div').filter({ hasText: /^\$29\.99ADD TO CART$/ }).getByRole('button').click();
  await page.getByRole('link', { name: '1' }).click();
  await page.getByRole('button', { name: 'REMOVE' }).click();
  await page.getByRole('link', { name: 'Continue Shopping' }).click();
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.getByRole('link', { name: 'Logout' }).click();
});

test('test1', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/v1/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  
});

/*Validate locked out error message*/
test('test2', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/v1/');
  await page.locator('[data-test="username"]').fill('locked_out_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.getByRole('button', { name: 'LOGIN' }).click();
  //Validate locked out error message
  await expect(page.getByText('Epic sadface: Sorry, this user has been locked out.')).toBeVisible();
});

/*Validate Order Confirmation Message*/
test('test3', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/v1/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.getByRole('button', { name: 'LOGIN' }).click();
  await page.locator('.inventory_item_name').filter({ has: page.getByText('Sauce Labs Backpack')}).click();
  await page.getByRole('button', { name: 'ADD TO CART' }).click();
  await page.locator('.shopping_cart_container').filter({ has: page.getByText('1')}).click();
  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
  await page.getByRole('link', { name: 'CHECKOUT' }).click();
  await page.locator('[data-test="firstName"]').fill('abc');
  await page.locator('[data-test="lastName"]').fill('xyz');
  await page.locator('[data-test="postalCode"]').fill('123');
  await page.getByRole('button', { name: 'CONTINUE' }).click(); 
  await page.getByRole('link', { name: 'FINISH' }).click(); 
  //Validate Order Confirmation Message
  await expect(page.getByText('THANK YOU FOR YOUR ORDER')).toBeVisible();
});

/*Validate Product is not Displayed and Also Validate that 1 at top icon is removed*/
test('test4', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/v1/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.getByRole('button', { name: 'LOGIN' }).click();
  await page.locator('.inventory_item_name').filter({ has: page.getByText('Sauce Labs Bolt T-Shirt')}).click();
  await page.getByRole('button', { name: 'ADD TO CART' }).click();
  await expect(page.locator('.shopping_cart_container')).toBeVisible(1);
  await page.locator('.shopping_cart_container').filter({ has: page.getByText('1')}).click();
  await expect(page.locator('.cart_item')).toBeVisible('Sauce Labs Bolt T-Shirt');
  await page.locator('.cart_item_label').filter({ has: page.getByText('Sauce Labs Bolt T-Shirt')}).getByRole('button', { name: 'REMOVE' }).click();
  const locator = page.locator('div.removed_cart_item');
  await expect(locator).toBeEmpty();
  //Validate Product is not Displayed
  await expect(page.locator('.cart_item_label').filter({ has: page.getByText('Sauce Labs Bolt T-Shirt')})).toBeHidden();
  //Validate that 1 at top icon is removed
  await expect(page.locator('div.shopping_cart_container .shopping_cart_link fa-layers fa-fw .fa-layers-counter shopping_cart_badge').filter({ has: page.getByText('1')})).toBeHidden();
  const locator2 = page.locator('div.shopping_cart_container');
  await expect(locator2).toBeEmpty();
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.getByRole('link', { name: 'Logout' }).click();
});

/*Verify Removed Item Is Not Displayed 
and Validate Others 2 items are displayed and also Validate Count is now reduced to 2.*/
test('test5', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/v1/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.getByRole('button', { name: 'LOGIN' }).click();
  await page.locator('.inventory_item_name').filter({ has: page.getByText('Sauce Labs Bolt T-Shirt')}).click();
  await page.getByRole('button', { name: 'ADD TO CART' }).click();
  await page.getByRole('button', { name: '<- Back' }).click();
  await page.locator('.inventory_item_name').filter({ has: page.getByText('Sauce Labs Backpack')}).click();
  await page.getByRole('button', { name: 'ADD TO CART' }).click();
  await page.getByRole('button', { name: '<- Back' }).click();
  await page.locator('.inventory_item_name').filter({ has: page.getByText('Sauce Labs Bike Light')}).click();
  await page.getByRole('button', { name: 'ADD TO CART' }).click();
  await expect(page.locator('.shopping_cart_container')).toBeVisible(3);
  await page.locator('.shopping_cart_container').filter({ has: page.getByText('3')}).click();
  const locator1 = page.locator('div.cart_item');
  await expect(locator1).toHaveCount(3);
  //Verify Removed Item
  await page.locator('.cart_item_label').filter({ has: page.getByText('Sauce Labs Bolt T-Shirt')}).getByRole('button', { name: 'REMOVE' }).click();
  //Verify Removed Item Is Not Displayed 
  await expect(page.locator('.cart_item_label').filter({ has: page.getByText('Sauce Labs Bolt T-Shirt')})).toBeHidden();
  const locator2 = page.locator('div.cart_item');
  await expect(locator2).toHaveCount(2);
  //Validate Others 2 items are displayed
  await expect(page.locator('.cart_item_label').filter({ has: page.getByText('Sauce Labs Backpack')})).toBeVisible();
  await expect(page.locator('.cart_item_label').filter({ has: page.getByText('Sauce Labs Bike Light')})).toBeVisible();
  //Validate Count is now reduced to 2
  await expect(page.locator('.shopping_cart_container')).toBeVisible(2);
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.getByRole('link', { name: 'Logout' }).click();
});

/*test('test6', async ({ page }) => {
  const loginPage = new pageobject_Login(page);
  await loginPage.goto();
  await loginPage.user_enter_username();
  await loginPage.user_enter_password();
  await loginPage.user_click_on_Login_Button();
});*/

/*test('test7', async ({ page }) => {
  const loginPage = new pageobject_Login(page);
  await loginPage.goto();
  await loginPage.user_enter_username('standard_user');
  await loginPage.user_enter_password('secret_sauce');
  await loginPage.user_click_on_Login_Button();
});*/

/*test('test8', async ({ page }) => {
  const loginPage = new pageobject_Login(page);
  await loginPage.goto();
  await loginPage.user_enter_username('problem_user');
  await loginPage.user_enter_password('secret_sauce');
  await loginPage.user_click_on_Login_Button();
}); */

/*[
  { username: 'standard_user', password: 'secret_sauce' },
  { username: 'locked_out_user', password: 'secret_sauce' },
  { username: 'problem_user', password: 'secret_sauce' },
].forEach(({ username, password }) => {
 
  test('test for user - '+username,{
    tag: '@smoke',
  }, async ({ page }) => {
    const loginPage = new pageobject_Login(page);
    await loginPage.goto();
    await loginPage.user_enter_username(username);
    await loginPage.user_enter_password(password);
    await loginPage.user_click_on_Login_Button();
    
  }); */

testuserdetails1.forEach((Testdata) => {
   
    test('test for user - '+Testdata.username,{
      tag: '@smoke',
    }, async ({page}) => {

     
      const loginPage = new pageobject_Login(page);
      await loginPage.goto();
      await loginPage.user_enter_username(Testdata.username);
      await loginPage.user_enter_password(Testdata.password);
      await loginPage.user_click_on_Login_Button(); 
      
    });

    

    
 
});


