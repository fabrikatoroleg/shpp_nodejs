
const express = require('express');
const { readFile, writeFile } = require('fs/promises');
const app = express();
const port = 8000;
// asynchronous reading of the counter from the file and processing of possible errors
async function readVisitCounter() {
  try {
    const data = await readFile('counter_data.json', 'utf-8');
    return parseInt(data) || 0;
  } catch (err) {
    console.error('Error reading counter_data.json:', err.message);
    throw err;
  }
}
// asynchronous saving of the counter to the file visitCounter and processing of possible errors
async function writeVisitCounter(visitCounter) {
  try {
    await writeFile('counter_data.json', visitCounter.toString());
    console.log('Visit counter saved to counter_data.json');
  } catch (err) {
    console.error('Error writing counter_data.json:', err.message);
    throw err;
  }
}
//  we create an Express route that is responsible for the page ('/hello')
app.get('/hello', async (req, res) => {
  try {
    let visitCounter = await readVisitCounter();
    visitCounter++;
    await writeVisitCounter(visitCounter);
    res.send(`This page has been visited ${visitCounter} times.`);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});
// we create a server listener Express
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});