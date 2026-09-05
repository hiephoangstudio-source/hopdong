const fs = require('fs');
const content = fs.readFileSync('Build-dashboard/Dash_Master_Portal/SchemaConfig.js', 'utf8');

// We will evaluate the TABLE_SCHEMAS object safely by creating a function wrapping it
try {
  // Replace const TABLE_SCHEMAS with global.TABLE_SCHEMAS
  const evalContent = content.replace('const TABLE_SCHEMAS =', 'global.TABLE_SCHEMAS =');
  eval(evalContent);
  
  console.log("GIAT_VAY schema keys:", Object.keys(global.TABLE_SCHEMAS.giat_vay || {}));
  console.log("GIAT_VAY columns:", Object.keys(global.TABLE_SCHEMAS.giat_vay.columns || {}));
  console.log("THIET_BI schema keys:", Object.keys(global.TABLE_SCHEMAS.thiet_bi || {}));
  console.log("THIET_BI columns:", Object.keys(global.TABLE_SCHEMAS.thiet_bi.columns || {}));
} catch (e) {
  console.error("Eval error:", e);
}
