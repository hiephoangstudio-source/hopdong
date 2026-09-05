const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  try {
    const browser = await chromium.launchPersistentContext(
      'C:\\Users\\Hiep Hoang\\AppData\\Local\\Google\\Chrome\\User Data',
      {
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        headless: true,
        args: ['--profile-directory=Default'] // Or whatever profile they use
      }
    );
    const page = await browser.newPage();
    await page.goto('https://script.google.com/macros/s/AKfycbx_Gc8Qd4ljWa_eCpRtMiJk--mjz4tREqX_qDryaZpeDhmC_uvKdqI828QLxf7PX2rhAg/exec');
    await page.waitForTimeout(10000); // Wait for load
    await page.screenshot({ path: 'login_check_with_profile.png' });
    await browser.close();
    console.log("Screenshot saved.");
  } catch (error) {
    console.error("Error launching Chrome with profile:", error);
  }
})();
