const puppeteer = require('puppeteer');
const ProxyChain = require('proxy-chain');


const gmailFirstPage="https://accounts.google.com/signup/v2/webcreateaccount?service=mail&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&flowName=GlifWebSignIn&flowEntry=SignUp&hl=en";


async function main() {
    // const browser = await puppeteer.launch();
    const browser = await puppeteer.launch({
        headless: true,
        args: [
             '--proxy-server=http://185.82.96.50:9091' ,
             '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:73.0) Gecko/20100101 Firefox/73.0'
            ]
    });
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();
//   const page = await browser.newPage();
    page.evaluateOnNewDocument(() => {
        Object.defineProperty(navigator,"platform",{get: ()=> "Win32"});
        Object.defineProperty(navigator,"productSub",{get: ()=> "20100101"});
        Object.defineProperty(navigator,"vendor",{get: ()=> ""});
        Object.defineProperty(navigator,"oscpu",{get: ()=> "Windows NT 10.0; Win64; x64"});
    });
    page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:73.0) Gecko/20100101 Firefox/73.0");
    page.setCacheEnabled(false);
    await page.goto(gmailFirstPage,{
        timeout: 90000,
        waitUntil: 'networkidle0',
        });
    await page.screenshot({ path: 'before.png' });

    const pageInfo=page.evaluate(() => {
        const firstName=document.getElementById("firstName");
        const lastName=document.getElementById("lastName");
        const email=document.querySelector("input[type='email']");
        const password=document.querySelector("input[name='Passwd']");
        const confirmPassword=document.querySelector("input[name='ConfirmPasswd']");
        const nextButton=document.querySelector("button");

        firstName.focus();
        firstName.value="Jhon";

        lastName.focus();
        lastName.value="Doe";

        email.focus();
        email.value="jhondoe480588";

        password.focus();
        password.value="Jhon.1122334805";

        confirmPassword.focus();
        confirmPassword.value="Jhon.1122334805";
        
        nextButton.click();

    });
        setTimeout(() => {
            page.screenshot({ path: 'after.png' });
        },10000);
        // console.log(pageInfo);
    //   await browser.close();
};


main();


