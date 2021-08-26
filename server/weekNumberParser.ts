const puppeteer = require("puppeteer")

export const parseWeekNumber = async (req, res) => {
    const link = "https://etu.ru/";
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.goto(link, { waitUntil: "domcontentloaded" });

        const html = await page.evaluate(() => {
            return (document.querySelector('.date') as HTMLElement).innerText;
        });

        await browser.close();

        res.send(html);
    } catch(e) {
        console.log(e);
    }
}