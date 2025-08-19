const { webkit } = require("playwright");

(async () => {
  try {
    console.log("Launching browser...");
    const browser = await webkit.launch({ headless: true }); // Try headless first
    console.log("Browser launched!");
    const page = await browser.newPage();
    console.log("Page created!");
    await page.goto("https://www.google.com");
    console.log("Navigated to Google!");
    await browser.close();
    console.log("Browser closed.");
  } catch (error) {
    console.error("Playwright test failed:", error);
  }
})();

