# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: DemoAppPO.spec.js >> User Logging with credentials
- Location: tests\DemoAppPO.spec.js:4:5

# Error details

```
Test timeout of 50000ms exceeded.
```

```
Error: locator.waitFor: Test timeout of 50000ms exceeded.
Call log:
  - waiting for locator('h3').filter({ hasText: 'iphone 13 pro' }) to be visible

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e5]:
    - generic [ref=e7]:
      - link "Automation Automation Practice":
        - /url: ""
        - generic [ref=e8] [cursor=pointer]:
          - heading "Automation" [level=3] [ref=e9]
          - paragraph [ref=e10]: Automation Practice
    - text: 
    - link "🎯 I'll help you prepare for your next QA job — Explore the QA Career Accelerator." [ref=e11] [cursor=pointer]:
      - /url: https://rahulshettyacademy.com/qa-career-accelerator-job-ready
    - list [ref=e12]:
      - listitem [ref=e13] [cursor=pointer]:
        - button " HOME" [ref=e14]:
          - generic [ref=e15]: 
          - text: HOME
      - listitem
      - listitem [ref=e16] [cursor=pointer]:
        - button " ORDERS" [ref=e17]:
          - generic [ref=e18]: 
          - text: ORDERS
      - listitem [ref=e19] [cursor=pointer]:
        - button " Cart" [ref=e20]:
          - generic [ref=e21]: 
          - text: Cart
      - listitem [ref=e22] [cursor=pointer]:
        - button "Sign Out" [ref=e23]:
          - generic [ref=e24]: 
          - text: Sign Out
  - generic [ref=e25]:
    - generic [ref=e26]:
      - heading "My Cart" [level=1] [ref=e27]
      - button "Continue Shopping❯" [ref=e28] [cursor=pointer]
    - heading "No Products in Your Cart !" [level=1] [ref=e30]
```

# Test source

```ts
  1  | export class CartPage {
  2  |     page;
  3  |     cartItems;
  4  |     checkoutButton;
  5  |     constructor(page) {
  6  |         this.page = page;
  7  |         this.cartItems = page.locator("div li");
  8  |         this.checkoutButton = page.locator("button").filter({
  9  |             hasText: "Checkout"
  10 |         });
  11 |     }
  12 |     async verifyProduct(productName) {
  13 |         const product = this.page.locator("h3", {
  14 |             hasText: productName
  15 |         });
> 16 |         await product.waitFor();
     |                       ^ Error: locator.waitFor: Test timeout of 50000ms exceeded.
  17 |     }
  18 |     async checkout() {
  19 |         await this.checkoutButton.click();
  20 |     }
  21 | }
  22 | 
```