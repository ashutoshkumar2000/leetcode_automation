
/*--------------Important npm libraries-----------------------*/
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const prompt = require('prompt-sync')();
const readlineSync = require('readline-sync');

/*-----------------Imported Function-----------------------------*/
const {leetCodeFn} = require('./leetCode');


/* ----------------login credentials and functionality chooser------------------------- */
puppeteer.use(StealthPlugin())
var curr = new Date();
var date = curr.getDate() + "-" + curr.getMonth() + "-" + curr.getFullYear();
let title = date;
let userName = prompt("Username: ");
let password = readlineSync.question('password: ', {hideEchoBack: true});
console.log(`Choose the functionality (type 1 or 2)
1. Download Question List in excel format
2. Bookmark questions present in an Excel Sheet`);
let choice = prompt();
let readFilePath;
if(choice == 2){
    console.log("Enter the path of the excel file (without double quotes)");
    readFilePath = prompt();
}

/* -------------------------------------Main Function------------------------------------ */
puppeteer.launch({ headless: false }).then (async browser => {

    await leetCodeFn(browser, title, readFilePath, choice, userName, password);
    await browser.close();
})
