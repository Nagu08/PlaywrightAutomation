import { test, expect } from '@playwright/test';
const{pageobject_Login}=require('../SwagLabsproject/PageObjectModel/pageobject_Login');
const testuserdetails1 =require('../Testdata/testuserdetails.json')
const testuserdetails2 =require('../Testdata/testuserdetails.json')


testuserdetails1.forEach((Testdata) => {
   
    test('test api for user - '+Testdata.username,{
      tag: '@smoke',
    }, async ({request}) => {
    
      //Get
      /*const  issues=await request.get('http://34.45.142.80:8180/api/catalogue-rest/product/eeb0da370c7b447eb3416c04189cb76e');
      console.log(issues)
      console.log(await issues.json());*/
     
      //random email generated
      let email = Math.random().toString(36).substring(2, 12)+ "@nomail.com";
      //Post
      const registerUserResponse = await request.post(`http://34.45.142.80:8180/api/customer-rest/customer/register`, {
          data: {
            "err": "",
            "firstName": "ABC",
            "lastName": "EFG",
            "email": email,
            //"email": "testuser123@gmail.com",
            "password": "qwerty",
            "confirmpassword": "qwerty"
        }
      });
   
      expect (registerUserResponse.status()).toEqual(200);
      expect (registerUserResponse.statusText()).toEqual('OK');
      //expect(registerUserResponse.statusText()).toEqual("Not Found");
      //expect(registerUserResponse.status()).toEqual(404);
      console.log(registerUserResponse)
      console.log(await registerUserResponse.json())

      expect(await registerUserResponse.json()).toMatchObject(
        {
          id: expect.any(Number),
          firstName: "DSSDFSDFSD",
          lastName: "P",
          email: email,
          password: "qwerty"
      }
      );
      
    });
});  

test("mocks a fruit and doesn't call api", async ({ page }) => {
  // Mock the api call before navigating
  await page.route('*/**/api/v1/fruits', async route => {
    const json = [{ name: 'Strawberry', id: 21 },{ name: 'Mango', id: 22 },{ name: 'Orange', id: 22 }];
    await route.fulfill({ json });
  });
  // Go to the page
  await page.goto('https://demo.playwright.dev/api-mocking');
  await page.pause();//Only for debugging

  // Assert that the Strawberry fruit is visible
  await expect(page.getByText('Strawberry')).toBeVisible();
});

testuserdetails2.forEach((Testdata) => {
   
  test('test api for user2 - '+Testdata.username,{
    tag: '@smoke',
  }, async ({request}) => {
  
    //Get
    /*const  issues=await request.get('http://34.45.142.80:8180/api/catalogue-rest/product/eeb0da370c7b447eb3416c04189cb76e');
    console.log(issues)
    console.log(await issues.json());*/
   
    //random email generated
    let email = Math.random().toString(36).substring(2, 12)+ "@nomail.com";
    //Post
    const registerUserResponse = await request.post(`http://34.45.142.80:8180/api/customer-rest/customer/register`, {
        data: {
          "err": "",
          "firstName": "ABC",
          "lastName": "EFG",
          "email": email,
          //"email": "testuser123@gmail.com",
          "password": "qwerty",
          "confirmpassword": "qwerty"
      }
    });
 
    expect (registerUserResponse.status()).toEqual(200);
    expect (registerUserResponse.statusText()).toEqual('OK');
    //expect(registerUserResponse.statusText()).toEqual("Not Found");
    //expect(registerUserResponse.status()).toEqual(404);
    console.log(registerUserResponse)
    console.log(await registerUserResponse.json())

    expect(await registerUserResponse.json()).toMatchObject(
      {
        id: expect.any(Number),
        firstName: "DSSDFSDFSD",
        lastName: "P",
        email: email,
        password: "qwerty"
    }
    );
    
  });
});      
 
test("test user 3", async ({ page }) => {

  
  // Go to the page
  await page.goto('http://34.45.142.80:3000/');
  await page.pause();
  await expect(page.locator(".footer")).toHaveScreenshot({ maxDiffPixels: 100});

 
});
