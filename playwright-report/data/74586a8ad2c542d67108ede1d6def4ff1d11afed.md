# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: DemoApp.spec.js >> @Web User Logging with credentials
- Location: tests\DemoApp.spec.js:3:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('button').filter({ hasText: 'Checkout' })
Expected: visible
Timeout: 40000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 40000ms
  - waiting for locator('button').filter({ hasText: 'Checkout' })

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
  1  | const { test, expect } = require('@playwright/test');
  2  | 
  3  | test("@Web User Logging with credentials", async ({ browser }) => {
  4  |   const context = await browser.newContext();
  5  |   const page = await context.newPage();
  6  |   const email = "saikrishnareddy@gmail.com";
  7  | 
  8  |   await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  9  |   await page.locator("#userEmail").fill(email);
  10 |   await page.locator("#userPassword").fill("Sai@12345");
  11 |   await page.locator("#login").click();
  12 | 
  13 |   await page.waitForLoadState('networkidle');
  14 |   await page.locator(".card-body b").first().waitFor();
  15 | 
  16 |   const titles = await page.locator(".card-body b").allTextContents();
  17 |   console.log(titles);
  18 | 
  19 |   await page.locator(".card-body", { hasText: "ADIDAS ORIGINAL" })
  20 |     .locator("text=Add To Cart").click();
  21 | 
  22 |   await page.locator("[routerlink*='/dashboard/cart']").click();
  23 | 
  24 |   // ✅ Wait for Checkout button before clicking
  25 |   const checkoutBtn = page.locator('button').filter({ hasText: 'Checkout' });
> 26 |   await expect(checkoutBtn).toBeVisible();
     |                             ^ Error: expect(locator).toBeVisible() failed
  27 |   await checkoutBtn.click();
  28 | 
  29 |   await page.locator("[value*='4542 9931 9292 2293']").fill("4542 9931 9292 2293");
  30 |   await page.locator(".input.ddl").nth(0).selectOption("02");
  31 |   await page.locator(".input.ddl").nth(1).selectOption("17");
  32 |   await page.locator(".input.txt").nth(1).fill("678");
  33 |   await page.locator(".input.txt").nth(2).fill("Saikrishna Magunta");
  34 |   await page.locator(".input.txt").nth(3).fill("rahulshettyacademy");
  35 | 
  36 |   await page.locator("[type*='submit']").click();
  37 |   await expect(page.locator(".mt-1.ng-star-inserted")).toHaveText("* Coupon Applied");
  38 | 
  39 |   await page.locator(".input.txt").nth(4).fill("saikrishnareddy@gmail.com");
  40 | 
  41 |   const countryBox = page.getByRole('textbox', { name: 'Select Country' }).first();
  42 |   await expect(countryBox).toBeVisible();
  43 |   await countryBox.pressSequentially("Ind", { delay: 150 });
  44 | 
  45 |   const DropDown = page.locator(".ta-results");
  46 |   await DropDown.waitFor();
  47 | 
  48 |   const countryCount = await DropDown.locator("button").count();
  49 |   for (let i = 0; i < countryCount; ++i) {
  50 |     const Text = await DropDown.locator("button").nth(i).textContent();
  51 |     if (Text === "India") {
  52 |       await DropDown.locator("button").nth(i).click();
  53 |       break;
  54 |     }
  55 |   }
  56 | 
  57 |   await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
  58 |   await page.locator('.ta-backdrop').click();
  59 | });
```