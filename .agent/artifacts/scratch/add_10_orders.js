const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  let browser;
  let page;
  try {
    console.log("Launching browser...");
    browser = await chromium.launch({ headless: true });
    page = await browser.newPage();
    
    console.log("Navigating to ERP...");
    page.on('dialog', async dialog => {
      console.log(`[DIALOG] ${dialog.type()}: ${dialog.message()}`);
      await dialog.accept();
    });
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

    console.log("Waiting for #email in any frame...");
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
    
    console.log("Clicking DonHang menu...");
    await targetFrame.click('#nav-item-DonHang');
    await page.waitForTimeout(2000);
    
    for (let i = 1; i <= 10; i++) {
      console.log(`Creating Order ${i}/10...`);
      
      await targetFrame.evaluate(() => window.AppCRUD.openCreateForm('don_hang'));
      await targetFrame.waitForSelector('#crud-modal', { state: 'visible' });
      await page.waitForTimeout(2000);
      
      const setSelect = async (nameSelector, idx) => {
        try {
          await targetFrame.evaluate((args) => {
            const sel = document.querySelector(args.sel);
            if (sel) {
              const options = Array.from(sel.options).filter(o => o.value !== "");
              if (options.length > 0) {
                const opt = options[(args.idx - 1) % options.length];
                if (sel.tomselect) {
                  sel.tomselect.setValue(opt.value);
                } else {
                  sel.value = opt.value;
                  sel.dispatchEvent(new Event('change'));
                }
              }
            }
          }, { sel: nameSelector, idx: idx });
          await page.waitForTimeout(300);
        } catch(e) {
          console.error(`Failed to set ${nameSelector}:`, e);
        }
      };
      
      await setSelect('select[name="id_khach_hang"]', i);
      await setSelect('select[name="chi_nhanh"]', 1);
      await setSelect('select[name="trang_thai"]', (i % 3) + 1);
      
      const dateStr = `2026-08-${(i % 28) + 1 < 10 ? '0' : ''}${(i % 28) + 1}`;
      await targetFrame.fill('input[name="ngay"]', dateStr);
      
      await targetFrame.click('button[data-form-tab="form-tab-dichvu"]');
      await page.waitForTimeout(500);
      await targetFrame.click('#btn-form-add-detail');
      await page.waitForTimeout(1000);
      
      await setSelect('select[name="details[0][id_dich_vu]"]', i);
      await targetFrame.fill('input[name="details[0][so_luong]"]', '1');
      await targetFrame.fill('input[name="details[0][don_gia]"]', String(1000000 * i));
      
      await targetFrame.click('button[data-form-tab="form-tab-thuchi"]');
      await page.waitForTimeout(500);
      await targetFrame.click('#btn-form-add-payment');
      await page.waitForTimeout(1000);
      
      await setSelect('select[name="payments[0][hinh_thuc_tt]"]', 1);
      await targetFrame.fill('input[name="payments[0][so_tien]"]', String(500000 * i));
      
      console.log(`  Saving Order ${i}...`);
      await targetFrame.click('button[onclick="window.AppCRUD.submitForm()"]');
      
      await targetFrame.waitForSelector('#crud-modal.opacity-0', { timeout: 30000 });
      console.log(`  Order ${i} saved successfully!`);
      await page.waitForTimeout(1000);
    }
    
    console.log("All 10 orders created!");
    await page.screenshot({ path: '10_orders_done.png' });
    await browser.close();
    console.log("Done.");
  } catch(e) {
    console.error("Error:", e);
    if (page) {
      await page.screenshot({ path: 'error_screenshot.png' });
    }
    process.exit(1);
  }
})();
