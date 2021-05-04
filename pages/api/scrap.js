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
  let data = {};
  await cors(req, res);
  const browser = await chromium.puppeteer.launch(
    {
      args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    }
  )
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto(JSON.parse(req.body), { waitUntil: 'domcontentloaded' });
  switch (JSON.parse(req.body).substring(12, 16)) {
    case 'lade':
      data = await page.$eval('head script[type="application/ld+json"]', el => el.text);
      break;
    case 'econ':
      const query = JSON.parse(await page.$eval('#__NEXT_DATA__', el => el.text));
      let articleBody = '';
      query.props.pageProps.content[0].text.forEach(item => {
        if (item.name = 'p') {
          item.children.forEach(child => {
            if (child.name !== 'img') {
              if (child.data) {
                articleBody += child.data;
              } else {
                child.children.forEach(item => {//problems with links that as to be parse again -> treat them later
                  console.log(item);
                  if (item.data) {
                    articleBody += item.data
                  } else {
                    item.children.forEach(lastChild => {
                      articleBody += lastChild.data
                    });
                  }
                });
              }
            }
          });
        }
        articleBody += ' ';
      });
      const body = {
        image: { url: query.props.pageProps.content[0].image.main.url.canonical },
        headline: query.props.pageProps.content[0].headline,
        articleBody,
        medium: 'econ'
      };
      data=JSON.stringify(body);
      break;
    default:
      throw new Error('Medium non supporté')

  }

  res.status(200).json({ data });
};
