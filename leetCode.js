const path = require("path");
const fs = require('fs');

const {chooseFunctionality} = require('./chooseFunctionality');

/*-----Function -> to got to leetcode website and  extract desired output-----*/
async function leetCodeFn(browser, title, readFilePath, choice, username, password){
    
    let newPage = await browser.newPage();
    await newPage.goto("https://leetcode.com/accounts/login/");
    await newPage.waitForTimeout(2000)
    await newPage.waitForSelector('a[data-icon="google-c"]');
    await newPage.click('a[data-icon="google-c"]');
    await newPage.waitForSelector('input[type="email"]');
    await newPage.type('input[type="email"]', username, {delay : 100});
    await newPage.click('span[jsname="V67aGc"]');
    await newPage.waitForTimeout(3000)
    await newPage.waitForSelector('input[type="password"]');
    await newPage.click('input[type="password"]');
    await newPage.type('input[type="password"]', password, {delay : 100});
    await newPage.click('span[jsname="V67aGc"]');
    await newPage.waitForSelector('div[data-tour-index="7"]');
    await newPage.click('div[data-tour-index="7"]');
    await newPage.waitForSelector('a[href="/list"]');
    await newPage.click('a[href="/list"]');
    await newPage.waitForSelector('span[title = "Favorite"]');
    await newPage.click('span[title = "Favorite"]');

    
    let folderPath = path.join(__dirname, 'leetCode');
    dirCreater(folderPath);
    let filePath = path.join(folderPath, title + '.xlsx');
    
    await chooseFunctionality(newPage, filePath, readFilePath, browser, choice, title);    

}

function dirCreater(folderPath) {
    if (fs.existsSync(folderPath) == false) {
        fs.mkdirSync(folderPath);
    }
}

module.exports = {
    leetCodeFn : leetCodeFn
}