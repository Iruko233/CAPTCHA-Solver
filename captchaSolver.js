const puppeteer = require("puppeteer-extra");
const express = require('express');
const chalk = require('chalk');
const app = express();
const port = 3000;

const sleep = duration => new Promise(resolve => setTimeout(resolve, duration * 1000));

async function main() {
    app.get('/api', async (req, res) => {
        const targetURL = req.query.target;

        if (targetURL) {
            try {
                const { title, cookie, userAgent } = await openBrowser(targetURL);
                res.send({ title, userAgent, cookie });
            } catch (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
            }
        } else {
            res.status(400).send('Bad Request');
        }
    });

    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}


async function openBrowser(targetURL) {
    const userAgents = [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"
    ];

    const randomIndex = Math.floor(Math.random() * userAgents.length);
    const randomUserAgent = userAgents[randomIndex];

    const options = {
        headless: false,
        ignoreHTTPSErrors: true,
        args: [
            "--no-sandbox",
            "--no-first-run",
            "--ignore-certificate-errors",
            "--disable-extensions",
            "--test-type",
            "--user-agent="
            + randomUserAgent
        ]
    };

    const browser = await puppeteer.launch(options);
    const [page] = await browser.pages();
    const client = page._client();
    page.on("framenavigated", (frame) => {
        if (frame.url().includes("challenges.cloudflare.com") === true) client.send("Target.detachFromTarget", { targetId: frame._id });
    });
    page.setDefaultNavigationTimeout(60 * 1000);
    const userAgent = await page.evaluate(function () {
        return navigator.userAgent;
    });
    await page.goto(targetURL, {
        waitUntil: "domcontentloaded"
    });
    const content = await page.content();

    if (content.includes("challenge-platform") === true) {
        console.log(chalk.yellow('Found CloudFlare challenge'));
        try {
            await sleep(20);
            const captchaContainer = await page.$("iframe[src*='challenges']");
            await captchaContainer.click({
                offset: {
                    x: 20,
                    y: 20
                }
            });
        } finally {
            await sleep(10);
            const title = await page.title();
            const cookies = await page.cookies();
            const cookie = cookies.map(cookie => cookie.name + "=" + cookie.value).join("; ").trim();
            console.log("Title:", title);
            console.log("Cookies:", cookie);
            console.log("UserAgent:", userAgent);
            const content = await page.content();
            if (content.includes("challenge-platform") === false) {
                console.log(chalk.green('Challenge solved'));
            }
            await browser.close();
            return { title, cookie, userAgent };
        }
    }

    console.log(chalk.green('No challenge detected'));
    await sleep(10);
    const title = await page.title();
    const cookies = await page.cookies();
    const cookie = cookies.map(cookie => cookie.name + "=" + cookie.value).join("; ").trim();
    console.log("Title:", title);
    console.log("Cookies:", cookie);
    console.log("UserAgent:", userAgent);
    await browser.close();
    return { title, cookie, userAgent };
}

main();
