---
name: module-template
description: Standard 7-step checklist and guide for creating, implementing, and registering new ERP modules in StudioERP.
---

# StudioERP Module Creation & Registration Checklist (7-Step Guide)

This document specifies the mandatory 7-step workflow required to build, configure, and cleanly register a new functional module into the StudioERP single-page application architecture. Following this template ensures that no module becomes orphaned, unroutable, or inaccessible.

---

## Architecture Overview

A complete StudioERP module consists of four primary components:
1. **View Partial (`Mod_<ModuleName>_View.html`)**: Frontend HTML template layout with Tailwind CSS styling.
2. **Logic Partial (`Mod_<ModuleName>_Logic.html`)**: Client-side JavaScript encapsulation attached to `window.MOD_<MODULE_KEY>`.
3. **Server Handler (`Mod_<ModuleName>_Server.js`)**: Google Apps Script (GAS) backend controller providing data fetching, filtering, and CRUD operations.
4. **Registration Hooks (`Config.js`, `Shell.html`, `Shell_JS.html`, `SchemaConfig.js`)**: Routing, permissions, menu configuration, and database schema mappings.

---

## 7-Step Module Checklist

### Step 1: Module View Creation (`Mod_<ModuleName>_View.html`)
- Create the HTML template file `Mod_<ModuleName>_View.html` inside the project root (`Build-dashboard/Dash_Master_Portal`).
- Wrap the entire module viewport inside a container element with class `mod-container hidden`:
  ```html
  <div id="mod-container-<ModuleName>" class="mod-container hidden">
    <!-- Header & Action Bar -->
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-bold text-slate-800 dark:text-white"><i class="fa-solid fa-<icon> mr-2"></i><ModuleName Title></h2>
      ...
    </div>
    <!-- Filter Controls & Data Tables -->
    ...
  </div>
  ```
- Use standard UI components (Tailwind classes, FontAwesome icons, responsive grid/flex layouts).

---

### Step 2: Module Logic Implementation (`Mod_<ModuleName>_Logic.html`)
- Create `Mod_<ModuleName>_Logic.html` containing script logic encapsulated under a dedicated global window object:
  ```html
  <script>
    window.MOD_<MODULE_KEY> = {
      rawRecords: [],
      filteredRecords: [],

      init: function() {
        console.log("Initializing module: <ModuleName>");
        this.fetchData();
      },

      fetchData: function() {
        showLoader("Đang tải dữ liệu <ModuleName>...");
        google.script.run
          .withSuccessHandler(function(response) {
            hideLoader();
            var result = typeof response === 'string' ? JSON.parse(response) : response;
            if (result.success) {
              window.MOD_<MODULE_KEY>.rawRecords = result.data || [];
              window.MOD_<MODULE_KEY>.render();
            } else {
              showError(result.message || "Lỗi tải dữ liệu");
            }
          })
          .withFailureHandler(function(err) {
            hideLoader();
            showError("Lỗi kết nối máy chủ: " + err.message);
          })
          .get<ModuleName>InitialData(JSON.stringify(USER_PROFILE));
      },

      render: function() {
        // Render tables, charts, or summaries
      },

      cleanup: function() {
        this.rawRecords = [];
        this.filteredRecords = [];
      }
    };

    // Auto-register pointer to active module
    window.MOD_ACTIVE = window.MOD_<MODULE_KEY>;
  </script>
  ```

---

### Step 3: Server-Side Handler (`Mod_<ModuleName>_Server.js`)
- Create `Mod_<ModuleName>_Server.js` to implement Google Apps Script functions.
- Ensure all Date objects returned to client are formatted using `formatAppDate` helper:
  ```javascript
  function get<ModuleName>InitialData(userProfileJson) {
    try {
      var profile = JSON.parse(userProfileJson);
      // Validate permissions
      if (!hasAccess(profile, '<ModuleName>')) {
        return JSON.stringify({ success: false, message: "Không có quyền truy cập module này." });
      }
      
      var data = CacheService.getScriptCache().get("<ModuleName>_DATA");
      if (!data) {
        // Read sheet data, apply formatAppDate to all date columns
        var rawData = readTableData("<sheet_name>");
        data = rawData.map(function(row) {
          if (row.ngay) row.ngay = formatAppDate(row.ngay);
          if (row.ngay_tao) row.ngay_tao = formatAppDate(row.ngay_tao);
          return row;
        });
      }
      
      return JSON.stringify({ success: true, data: data });
    } catch (e) {
      return JSON.stringify({ success: false, message: e.message });
    }
  }
  ```

---

### Step 4: Central Configuration (`Config.js`)
1. Add module declaration to `ENABLED_MODULES` object in `Config.js`:
   ```javascript
   <MODULE_KEY>: {
     id: "<ModuleName>",
     name: "<Human Readable Name>",
     icon: "fa-<icon-name>",
     viewFile: "Mod_<ModuleName>_View",
     logicFile: "Mod_<ModuleName>_Logic"
   }
   ```
2. Add physical Google Sheet column ordering to `ACTUAL_SHEET_COLUMNS` in `Config.js`:
   ```javascript
   "<sheet_name>": ["id_<pk>", "col1", "col2", "trang_thai", "ghi_chu", "nguoi_tao", "thoi_gian_tao", "nguoi_cap_nhat", "ngay_cap_nhat"]
   ```

---

### Step 5: Shell Viewport Inclusion (`Shell.html`)
- Inside `#mod-content` viewport in `Shell.html`, add the container markup with server-side includes:
  ```html
  <div id="mod-container-<ModuleName>" class="mod-container hidden">
    <?!= include('Mod_<ModuleName>_View'); ?>
    <?!= include('Mod_<ModuleName>_Logic'); ?>
  </div>
  ```

---

### Step 6: Shell Router & Sidebar Navigation Wiring (`Shell_JS.html`)
1. **Navigation Menu Group**: Add menu item object to the target group in `MENU_GROUPS`:
   ```javascript
   { id: "<ModuleName>", name: "<Human Readable Name>", icon: "fa-<icon-name>" }
   ```
2. **Permission Gate**: Verify that `hasAccessToModule(moduleId, profile)` in `Shell_JS.html` permits target roles to access `<ModuleName>`.
3. **Cache Invalidation Map**: Add server function mapping to `cacheMap` in `Shell_JS.html`:
   ```javascript
   "get<ModuleName>InitialData": "<ModuleName>"
   ```
4. **Router Instance Mapping**: Register the window instance in `Router.navigateTo` `moduleMap` in `Shell_JS.html`:
   ```javascript
   "<ModuleName>": window.MOD_<MODULE_KEY>
   ```

---

### Step 7: Database Schema Configuration (`SchemaConfig.js`)
- Add or verify table schema declaration in `TABLE_SCHEMAS["<sheet_name>"]` inside `SchemaConfig.js`:
  ```javascript
  "<sheet_name>": {
    "key": "id_<pk>",
    "label": "ten_<name>",
    "columns": {
      "_RowNumber": { "type": "Number", "virtual": false, "read_only": true },
      "id_<pk>": { "type": "Text", "virtual": false, "read_only": true, "initial_value": "=\"ID\" & TEXT(NOW(), \"yyMMdd\")" },
      "trang_thai": { "type": "Enum", "virtual": false, "read_only": false },
      "ghi_chu": { "type": "Text", "virtual": false, "read_only": false }
    }
  }
  ```

---

## Verification & Audit Checklist

Before submitting a new module for code review, verify:
- [ ] View partial `<div id="mod-container-<ModuleName>" class="mod-container hidden">` present in `Shell.html`.
- [ ] Global window instance `window.MOD_<MODULE_KEY>` exported in `Mod_<ModuleName>_Logic.html`.
- [ ] `formatAppDate` applied to all date attributes in `Mod_<ModuleName>_Server.js`.
- [ ] `ENABLED_MODULES` and `ACTUAL_SHEET_COLUMNS` updated in `Config.js`.
- [ ] Menu item declared in `MENU_GROUPS` in `Shell_JS.html`.
- [ ] Mapped in `Router.navigateTo` `moduleMap` in `Shell_JS.html`.
- [ ] `TABLE_SCHEMAS` present in `SchemaConfig.js`.
- [ ] Router navigation test: `Router.navigateTo('<ModuleName>')` sets `window.MOD_ACTIVE` and unhides target container without JS errors.
