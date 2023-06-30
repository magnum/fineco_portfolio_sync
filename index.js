const puppeteer = require('puppeteer');
const pry = require("pryjs")
async function main() {
  const browser = await puppeteer.launch({
    headless: 'new'
  });
  const page = await browser.newPage();
  await page.goto('https://it.finecobank.com/login/');
  
  await page.type('input[name=LOGIN]', 'username');
  await page.type('input[name=PASSWD]', 'password');
  await page.evaluate(() => {
    document.querySelector('[type=submit]').click();
  });
  await page.waitForNavigation({ waitUntil: "load" });
  
  const selector = 'body'
  const value1 = await page.$eval(
    selector,
    els => els.map(e => e.textContent)
  );
  console.log(value1);

  await browser.close();
}
main();