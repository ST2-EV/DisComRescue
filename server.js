// require Cloudant for DB
const Cloudant = require("@cloudant/cloudant");
const express = require("express");
const app = express();
const port = 3000;

//Cloudant authentication
const cloudant = new Cloudant({
  account: "1e04787e-e7b3-4fe1-9288-8b2d56aa29ad-bluemix",
  plugins: {
    iamauth: {
      iamApiKey: "1OvWJHv1kqWuS6Suk-FSQtFDb1qnPZ_gpD73pPp9jhFK"
    }
  }
});
app.use(express.json({ extended: false }));
app.use(express.static("public"));
app.set("view engine", "pug");
//Endpoint for nodes to send Data
app.post("/api/sendData", (req, res) => {
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
function getUnique(arr, comp) {
  const unique = arr
    .map(e => e[comp])

    // store the keys of the unique objects
    .map((e, i, final) => final.indexOf(e) === i && i)

    // eliminate the dead keys & store unique objects
    .filter(e => arr[e])
    .map(e => arr[e]);

  return unique;
}

//Endpoint for home screen
app.get("/home", (req, res) => {
  var db = cloudant.db.use("survivors");
  let mainData = new Array();
  db.index(function(err, result) {
    db.find(
      {
        selector: {
          _id: {
            $gt: null
          }
        }
      },
      function(err, result) {
        if (err) {
          throw err;
        }

        console.log(
          "Found %d documents with name survivors",
          result.docs.length
        );
        for (var i = 0; i < result.docs.length; i++) {
          mainData.push(...result.docs[i].array);
        }
        const uniqData = getUnique(mainData, "prehash");
        console.log(uniqData);
        res.render("index", {
          title: "DisCom",
          message: "Survivor's List:",
          data: uniqData
        });
      }
    );
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// let rawdata = fs.readFileSync(path.join(__dirname, "data", "blockchain.json"));
// let blockchain = JSON.parse(rawdata);
