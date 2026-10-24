const ExcelJs=require('exceljs');
const {test,expect} =require('@playwright/test');

async function WriteExcel(searchText,ReplaceText,change,Filepath)
{
   
    const workbook=new ExcelJs.Workbook();
    await workbook.xlsx.readFile(Filepath);
    const worksheet=workbook.getWorksheet('Sheet1');
    const output =await ReadExcel(worksheet,searchText);
    
   const cell= worksheet.getCell(output.row,output.column+change.colChange);
   cell.value=ReplaceText;
   await workbook.xlsx.writeFile(Filepath);

}
async function ReadExcel(worksheet,searchText)
{
     let output = {row:1, column:1};
    worksheet.eachRow((row,rowNumber) =>
        {
            row.eachCell((cell,colNumber) =>
            {
                if (cell.value=== searchText)
                    {
                        output.row=rowNumber;
                        output.column=colNumber;
                }

            })
        })
        return output;
}
//WriteExcel("Mango",400,{rowChange:0,colChange:2},"C:/Users/syekr/Downloads/ExcelTest.xlsx");
test('@Web Download-upload',async({page})=>{
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const DownloadPromise =  page.waitForEvent("download");
    await page.getByRole('button',{name:'Download'}).click();
    await DownloadPromise;
    await  WriteExcel("Mango","499",{rowChange:0,colChange:2},"C:/Users/syekr/Downloads/download.xlsx");
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles("C:/Users/syekr/Downloads/download.xlsx");
    await expect(page.getByText("499")).toBeVisible();
    await expect(page.getByText("Updated Excel Data Successfully.")).toBeVisible();
})