const express = require('express');
const app = express();
const db = require('./database.js');
const scrape = require('./scraper');
require('./routes')(app, db);

const PORT = process.env.PORT || 3000;
  
app.listen(PORT, async () => {
    await scrape();
    console.log(`A szerver fut a http://localhost:${PORT}/api/list címen.`);
});