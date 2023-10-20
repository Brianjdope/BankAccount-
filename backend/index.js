const express = require('express')
const cors = require("cors");
const app = express()
const port = 3000


app.use(cors());

const response = {
    name: "Test",
    color: "Blue",
    location: "Test City",
}

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(response));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})