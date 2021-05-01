const puppeteer = require('puppeteer');
import initMiddleware from '../../helpers/init-middleware';
import Cors from 'cors'
import chromium from 'chrome-aws-lambda';

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST'],
  })
);

export default async (req, res) => {

  await cors(req, res);

  const browser = await chromium.puppeteer.launch(
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
