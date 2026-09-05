const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  try {
    console.log("Launching browser...");
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    
    console.log("Navigating to ERP...");
    await page.goto('https://script.google.com/macros/s/AKfycbx_Gc8Qd4ljWa_eCpRtMiJk--mjz4tREqX_qDryaZpeDhmC_uvKdqI828QLxf7PX2rhAg/exec', { waitUntil: 'networkidle' });
    
    const findFrame = async (selector, timeout = 30) => {
      for(let i=0; i<timeout; i++) {
        for(const frame of page.frames()) {
          try {
            const el = await frame.$(selector);
            if (el) return frame;
          } catch(e) {}
        }
        await page.waitForTimeout(1000);
      }
      return null;
    };

    let targetFrame = await findFrame('#email', 10);
    
    if (targetFrame) {
      console.log("Login page detected in frame. Logging in...");
      await targetFrame.fill('#email', 'hiephoangstudio@gmail.com');
      await targetFrame.fill('#password', 'admin123');
      await targetFrame.click('#submitBtn');
      console.log("Waiting for dashboard (re-finding frame)...");
    } else {
      console.log("No login page detected, continuing...");
    }
    
    targetFrame = await findFrame('#sidebar', 30);
    if (!targetFrame) {
      console.log("Could not find dashboard frame!");
      process.exit(1);
    }
    
    console.log("Dumping frame content...");
    const content = await targetFrame.content();
    fs.writeFileSync('dashboard_dom.txt', content);
    console.log("Saved dashboard_dom.txt");
    
    await browser.close();
    console.log("Done.");
  } catch(e) {
    console.error("Error:", e);
    process.exit(1);
  }
})();
