const puppeteer = require('puppeteer');

export default async (req, res) => {

  const browser = await puppeteer.launch(
    { headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--single-process'
      ],
    }
  )

  const page = await browser.newPage();

  await page.goto(JSON.parse(req.body));

  const data =  await page.$eval('head script[type="application/ld+json"]', el => el.text);
  res.status(200).json({ data: data });
};
