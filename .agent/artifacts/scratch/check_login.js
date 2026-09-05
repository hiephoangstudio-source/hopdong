const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://script.google.com/macros/s/AKfycbx_Gc8Qd4ljWa_eCpRtMiJk--mjz4tREqX_qDryaZpeDhmC_uvKdqI828QLxf7PX2rhAg/exec');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'login_check.png' });
  await browser.close();
  console.log("Screenshot saved.");
})();
