# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: DemoApp3.specs.js >> User Logging with credentials with iphone 13 pro
- Location: tests\DemoApp3.specs.js:60:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('h3:has-text(\'iphone 13 pro\')')
Expected: visible
Timeout: 40000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 40000ms
  - waiting for locator('h3:has-text(\'iphone 13 pro\')')

```

```yaml
- navigation:
  - link "Automation Automation Practice":
    - /url: ""
    - heading "Automation" [level=3]
    - paragraph: Automation Practice
  - link "🎯 I'll help you prepare for your next QA job — Explore the QA Career Accelerator.":
    - /url: https://rahulshettyacademy.com/qa-career-accelerator-job-ready
  - list:
    - listitem:
      - button " HOME"
    - listitem
    - listitem:
      - button " ORDERS"
    - listitem:
      - button " Cart"
    - listitem:
      - button "Sign Out"
- heading "My Cart" [level=1]
- button "Continue Shopping❯"
- heading "No Products in Your Cart !" [level=1]
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test')
  2  | const { POManager } = require('../pageobjects/POManager')
  3  | const { customtest } = require('../utlis/test-base')
  4  | 
  5  | // Json->String->JavaScript Object
  6  | const dataset = JSON.parse(JSON.stringify(require("../utlis/PrdParameter.json")))
  7  | const dataset1 = JSON.parse(JSON.stringify(require("../utlis/ProductDatasetTest.json")))
  8  | 
  9  | test("User Logging with credentials", async ({ page }) => {
  10 |   const poManager = new POManager(page)
  11 |   const loginpage = poManager.getLoginPage()
  12 |   await loginpage.goto()
  13 |   await loginpage.validLogin(dataset1.username, dataset1.password)
  14 | 
  15 |   const dashboardPage = poManager.getDashboardPage()
  16 |   await dashboardPage.searchTextAddCart(dataset1.productName)
  17 |   await dashboardPage.navigateToCart()
  18 | 
  19 |   // ✅ Wait for product heading instead of generic div li
  20 |   await expect(page.locator(`h3:has-text('${dataset1.productName}')`)).toBeVisible()
  21 | 
  22 |   const bool = await page.locator(`h3:has-text('${dataset1.productName}')`).isVisible()
  23 |   console.log(await page.locator(`h3:has-text('${dataset1.productName}')`).textContent())
  24 |   expect(bool).toBeTruthy()
  25 | 
  26 |   await page.locator('button').filter({ hasText: 'Checkout' }).click()
  27 |   await page.locator(".input.txt").first().waitFor()
  28 |   await page.locator("[placeholder*=Country]").pressSequentially("India")
  29 | 
  30 |   const dropdown = page.locator(".ta-results button")
  31 |   await dropdown.first().waitFor()
  32 |   await dropdown.last().click()
  33 | 
  34 |   await expect(page.locator(".user__name [type='text']").first()).toHaveText(dataset1.username)
  35 |   await page.locator('a:has-text("PLACE ORDER")').click()
  36 |   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")
  37 | 
  38 |   const OrderId = await page.locator(".em-spacer-1 .ng-star-inserted").first().textContent()
  39 |   console.log(OrderId)
  40 | 
  41 |   await page.locator("button[routerlink*='myorders']").click()
  42 |   await page.locator("tbody").waitFor()
  43 |   const rows = await page.locator("tbody tr")
  44 | 
  45 |   for (let i = 0; i < await rows.count(); ++i) {
  46 |     const roworderID = await rows.nth(i).locator("th").textContent()
  47 |     if (OrderId.includes(roworderID)) {
  48 |       await rows.nth(i).locator("button").first().click()
  49 |       break
  50 |     }
  51 |   }
  52 | 
  53 |   const OrderIdDeatils = await page.locator("div.col-text.-main").textContent()
  54 |   expect(OrderId.includes(OrderIdDeatils)).toBeTruthy()
  55 |   console.log(OrderIdDeatils)
  56 | })
  57 | 
  58 | // ✅ Same fix applied in dataset loop
  59 | for (const data of dataset) {
  60 |   test(`User Logging with credentials with ${data.productName}`, async ({ page }) => {
  61 |     const poManager = new POManager(page)
  62 |     const loginpage = poManager.getLoginPage()
  63 |     await loginpage.goto()
  64 |     await loginpage.validLogin(data.username, data.password)
  65 | 
  66 |     const dashboardPage = poManager.getDashboardPage()
  67 |     await dashboardPage.searchTextAddCart(data.productName)
  68 |     await dashboardPage.navigateToCart()
  69 | 
> 70 |     await expect(page.locator(`h3:has-text('${data.productName}')`)).toBeVisible()
     |                                                                      ^ Error: expect(locator).toBeVisible() failed
  71 | 
  72 |     const bool = await page.locator(`h3:has-text('${data.productName}')`).isVisible()
  73 |     console.log(await page.locator(`h3:has-text('${data.productName}')`).textContent())
  74 |     expect(bool).toBeTruthy()
  75 | 
  76 |     // ... rest unchanged
  77 |   })
  78 | }
  79 | 
  80 | // ✅ Apply same fix in customtest
  81 | customtest(`User Logging`, async ({ page, testforProduct }) => {
  82 |   const poManager = new POManager(page)
  83 |   const loginpage = poManager.getLoginPage()
  84 |   await loginpage.goto()
  85 |   await loginpage.validLogin(testforProduct.username, testforProduct.password)
  86 | 
  87 |   const dashboardPage = poManager.getDashboardPage()
  88 |   await dashboardPage.searchTextAddCart(testforProduct.productName)
  89 |   await dashboardPage.navigateToCart()
  90 | 
  91 |   await expect(page.locator(`h3:has-text('${testforProduct.productName}')`)).toBeVisible()
  92 | 
  93 |   const bool = await page.locator(`h3:has-text('${testforProduct.productName}')`).isVisible()
  94 |   console.log(await page.locator(`h3:has-text('${testforProduct.productName}')`).textContent())
  95 |   expect(bool).toBeTruthy()
  96 | 
  97 |   // ... rest unchanged
  98 | })
```