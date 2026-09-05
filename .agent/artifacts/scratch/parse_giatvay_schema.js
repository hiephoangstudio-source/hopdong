const fs = require('fs');
const content = fs.readFileSync('Build-dashboard/Dash_Master_Portal/SchemaConfig.js', 'utf8');

try {
  const evalContent = content.replace('const TABLE_SCHEMAS =', 'global.TABLE_SCHEMAS =');
  eval(evalContent);
  console.log("GIAT_VAY SCHEMA:", JSON.stringify(global.TABLE_SCHEMAS.giat_vay, null, 2));
} catch (e) {
  console.error(e);
}
