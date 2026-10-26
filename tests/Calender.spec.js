const {test,expect} = require("@playwright/test");
test ('@Web calender Demo',async({page})=>
{
    const Date ="6";
    const Month ="12";
    const Year = "2027";
    const expectedList =[Month,Date,Year];
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(Year).click();
    await page.locator(".react-calendar__tile").nth(Number(Month)-1).click();
    //Xpath locator for Date field check
    //Calender App demo
    await page.locator("//abbr[text()='"+Date+"']").click();

    const inputs =  page.locator('.react-date-picker__inputGroup__input')
    
    for(let i=0; i<expectedList.length; i++)
    {
        
        const value = await inputs.nth(i).inputValue();
        expect(value).toEqual(expectedList[i]);
    }
    
}
);