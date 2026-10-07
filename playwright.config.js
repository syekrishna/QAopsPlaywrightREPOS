// @ts-check
const { devices } = require('@playwright/test');
const { trace } = require('node:console');
const config = {
  testDir: './tests',
  testMatch: '**/*.{spec,specs}.js',
  retries:0,
  timeout: 50 *1000,
  expect: {
    timeout: 40 *1000
  },
reporter: 'html',
   use: {
    
    browserName: 'chromium',
    headless : true,
    screenshot : 'only-on-failure',
    trace : 'retain-on-failure',

},
};
module.exports = config