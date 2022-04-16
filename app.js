const puppeteer = require('puppeteer');
const ProxyChain = require('proxy-chain');


const gmailFirstPage="https://accounts.google.com/signup/v2/webcreateaccount?service=mail&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&flowName=GlifWebSignIn&flowEntry=SignUp&hl=en";



// const proxies = {
//   'session_1': 'http://189.164.87.226:3128',
//   'session_2': 'http://78.157.254.58:51008',
//   'session_3': 'http://181.129.243.101:999',
// };

// const server = new ProxyChain.Server({
//   port: 8080,
//   prepareRequestFunction: ({ request }) => {
//       const sessionId = request.headers['session-id'];
//       const proxy = proxies[sessionId];
//       return { upstreamProxyUrl: proxy };
//   }
// });

// server.listen(() => {
//     console.log('Rotating proxy server started.');
//     main();
// });




async function main() {
    // const browser = await puppeteer.launch();
  const browser = await puppeteer.launch({
      args: [ '--proxy-server=http://202.62.10.51:8080' ]
  });
    // const context = browser.defaultBrowserContext();
    // context.clearPermissionOverrides();
    const context = await browser.createIncognitoBrowserContext();
  const page = await context.newPage();
//   const page = await browser.newPage();
  page.setCacheEnabled(false);
  await page.goto(gmailFirstPage,{
      timeout: 90000,
    });
  await page.screenshot({ path: 'before.png' });

  const pageInfo=page.evaluate(() => {
    const firstName=document.getElementById("firstName");
    const lastName=document.getElementById("lastName");
    const email=document.querySelector("input[type='email']");
    const password=document.querySelector("input[name='Passwd']");
    const confirmPassword=document.querySelector("input[name='ConfirmPasswd']");
    const nextButton=document.querySelector("button");

    // firstName.setAttribute("data-initial-value","Jhon");
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


//   const context = browser.defaultBrowserContext();
// context.overridePermissions('https://example.com', ['clipboard-read']);
// context.clearPermissionOverrides();
};


main();


