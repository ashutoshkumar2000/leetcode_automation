
const {excelReader} = require('./excelWork');
const {excelWriter} = require('./excelWork');

/* Function is responsible to select whether we want to download the question list or upload the list to our leetcode profile */

async function chooseFunctionality(newPage, filePath, readFilePath, browser, choice, title){
    if(choice == 1){
        let listOfProblems = await newPage.evaluate(getProblemsFn);
        excelWriter(filePath , listOfProblems, title);
    }
    else{
        let readProblems = excelReader(readFilePath, title);
        let name = [];
        for(let i = 0; i < readProblems.length; i++){
            name.push(readProblems[i].link);
        }
        for(let i = 0; i < name.length; i++){
            let page = await browser.newPage();
            await page.goto(name[i]);
            await page.waitForTimeout(1000);
            await page.waitForSelector('path[d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"]');
            await page.hover('path[d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"]');
            await page.waitForTimeout(500);
            await page.waitForSelector('.favorite-name-wrapper__3eeC');
            await page.click('.favorite-name-wrapper__3eeC');
            await page.close();
        }
        let newPage = await browser.newPage();
        newPage.on('dialog', async dialog => {
            console.log(dialog.accept());
        });
        await newPage.goto('https://leetcode.com/list/');
        await newPage.waitForSelector('#clone-button');
        await newPage.click('#clone-button');
        await newPage.waitForTimeout(500);
        await newPage.waitForSelector('.btn-group.btn-group-sm .btn.btn-default.btn-xs');
        await newPage.click(".btn-group.btn-group-sm .btn.btn-default.btn-xs");
        await newPage.waitForTimeout(500);
        await newPage.waitForSelector('span[title="Favorite"]');
        await newPage.click('span[title="Favorite"]');

    }
}

//DOM function
function getProblemsFn(){
    let problemArr = document.querySelectorAll('div[class = "question-title"] a[target = "_blank"]');
    let problems = []
    for(let i = 0; i < problemArr.length; i++){
        if(problemArr){
            let name = problemArr[i].innerText;
            let link = problemArr[i].href;
            problems.push({name, link});
        }
    }
    return problems;
}

module.exports = {
    chooseFunctionality : chooseFunctionality
}