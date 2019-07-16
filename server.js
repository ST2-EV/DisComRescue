const fs = require("fs");
const Cloudant = require("@cloudant/cloudant");
const path = require("path");
const express = require("express");
const app = express();
const port = 3000;
const cloudant = new Cloudant({
  account: "1e04787e-e7b3-4fe1-9288-8b2d56aa29ad-bluemix",
  plugins: {
    iamauth: {
      iamApiKey: "1OvWJHv1kqWuS6Suk-FSQtFDb1qnPZ_gpD73pPp9jhFK"
    }
  }
});
app.use(express.json({ extended: false }));
app.post("/", (req, res) => {
  const blockchain = req.body;
  async function asyncCall() {
    let surv = await cloudant.use("survivors");
    return await surv.insert(blockchain);
  }

  asyncCall()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// let rawdata = fs.readFileSync(path.join(__dirname, "data", "blockchain.json"));
// let blockchain = JSON.parse(rawdata);
