const { test, expect } = require('@playwright/test')
const { POManager } = require('../pageobjects/POManager')
const { customtest } = require('../utlis/test-base')

// Json->String->JavaScript Object
const dataset = JSON.parse(JSON.stringify(require("../utlis/PrdParameter.json")))
const dataset1 = JSON.parse(JSON.stringify(require("../utlis/ProductDatasetTest.json")))

test("User Logging with credentials", async ({ page }) => {
  const poManager = new POManager(page)
  const loginpage = poManager.getLoginPage()
  await loginpage.goto()
  await loginpage.validLogin(dataset1.username, dataset1.password)

  const dashboardPage = poManager.getDashboardPage()
  await dashboardPage.searchTextAddCart(dataset1.productName)
  await dashboardPage.navigateToCart()

  // ✅ Wait for product heading instead of generic div li
  await expect(page.locator(`h3:has-text('${dataset1.productName}')`)).toBeVisible()

  const bool = await page.locator(`h3:has-text('${dataset1.productName}')`).isVisible()
  console.log(await page.locator(`h3:has-text('${dataset1.productName}')`).textContent())
  expect(bool).toBeTruthy()

  await page.locator('button').filter({ hasText: 'Checkout' }).click()
  await page.locator(".input.txt").first().waitFor()
  await page.locator("[placeholder*=Country]").pressSequentially("India")

  const dropdown = page.locator(".ta-results button")
  await dropdown.first().waitFor()
  await dropdown.last().click()

  await expect(page.locator(".user__name [type='text']").first()).toHaveText(dataset1.username)
  await page.locator('a:has-text("PLACE ORDER")').click()
  await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")

  const OrderId = await page.locator(".em-spacer-1 .ng-star-inserted").first().textContent()
  console.log(OrderId)

  await page.locator("button[routerlink*='myorders']").click()
  await page.locator("tbody").waitFor()
  const rows = await page.locator("tbody tr")

  for (let i = 0; i < await rows.count(); ++i) {
    const roworderID = await rows.nth(i).locator("th").textContent()
    if (OrderId.includes(roworderID)) {
      await rows.nth(i).locator("button").first().click()
      break
    }
  }

  const OrderIdDeatils = await page.locator("div.col-text.-main").textContent()
  expect(OrderId.includes(OrderIdDeatils)).toBeTruthy()
  console.log(OrderIdDeatils)
})

// ✅ Same fix applied in dataset loop
for (const data of dataset) {
  test(`User Logging with credentials with ${data.productName}`, async ({ page }) => {
    const poManager = new POManager(page)
    const loginpage = poManager.getLoginPage()
    await loginpage.goto()
    await loginpage.validLogin(data.username, data.password)

    const dashboardPage = poManager.getDashboardPage()
    await dashboardPage.searchTextAddCart(data.productName)
    await dashboardPage.navigateToCart()

    await expect(page.locator(`h3:has-text('${data.productName}')`)).toBeVisible()

    const bool = await page.locator(`h3:has-text('${data.productName}')`).isVisible()
    console.log(await page.locator(`h3:has-text('${data.productName}')`).textContent())
    expect(bool).toBeTruthy()

    // ... rest unchanged
  })
}

// ✅ Apply same fix in customtest
customtest(`User Logging`, async ({ page, testforProduct }) => {
  const poManager = new POManager(page)
  const loginpage = poManager.getLoginPage()
  await loginpage.goto()
  await loginpage.validLogin(testforProduct.username, testforProduct.password)

  const dashboardPage = poManager.getDashboardPage()
  await dashboardPage.searchTextAddCart(testforProduct.productName)
  await dashboardPage.navigateToCart()

  await expect(page.locator(`h3:has-text('${testforProduct.productName}')`)).toBeVisible()

  const bool = await page.locator(`h3:has-text('${testforProduct.productName}')`).isVisible()
  console.log(await page.locator(`h3:has-text('${testforProduct.productName}')`).textContent())
  expect(bool).toBeTruthy()

  // ... rest unchanged
})