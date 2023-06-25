const puppeteer = require('puppeteer');
async function main() {
  const browser = await puppeteer.launch({
    headless: 'new'
  });
  const page = await browser.newPage();
  await page.goto('https://it.finecobank.com/login/');
  
  await page.type('input[name=LOGIN]', '69111084');
  await page.type('input[name=PASSWD]', 'tKJ3N!De');
  await page.evaluate(() => {
    document.querySelector('[type=submit]').click();
  });
  await page.waitForNavigation({ waitUntil: "load" });
  
  await page.goto('https://finecobank.com/portafoglio/i-miei-investimenti/json/portafoglio-elenco-json?sintesi=true');
  await page.content(); 
  const json = await page.evaluate(() =>  {
      return JSON.parse(document.querySelector("body").innerText); 
  }); 
  const portfolioValue = json[0].reduce((sum, item) => sum += parseFloat(item.marketValueSintesiEur), 0);
  console.log(`value: ${portfolioValue}`)
  
  
  // const element1 = await page.waitForSelector('#main-widget .col-8 .PUC-title-row .text-right.col-6 h3.graph-detail-title > span'); 
  // const value1 = await element1.evaluate(el => el.textContent);
  // console.log(value1)

  // await page.goto('https://finecobank.com/portafoglio/i-miei-investimenti/portafoglio-elenco');
  // const element2 = await page.waitForSelector('.valori-header .h1'); 
  // const value2 = await element2.evaluate(el => el.textContent);
  // console.log(value2)

  await browser.close();
}
main();