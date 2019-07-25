// require Cloudant for DB
const Cloudant = require("@cloudant/cloudant");
const express = require("express");
const app = express();
const port = 3000;
const geocenter = require("geographic-center");

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
function sortByProp(property) {
  return function(x, y) {
    return x[property] === y[property] ? 0 : x[property] > y[property] ? 1 : -1;
  };
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
        uniqData.sort(sortByProp("battery"));
        //console.log(uniqData);
        res.render("index", {
          title: "DisCom",
          message: "Survivor's List:",
          data: uniqData
        });
      }
    );
  });
});

//END Point for the multimarker map
app.get("/map", (req, res) => {
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
        let value = helper(uniqData);
        //console.log(value[0]);
        //console.log(value[1]);
        const data = value[0];

        let points = new Array();
        for (var j = 0; j < data.length; j++) {
          points.push({
            lat: parseFloat(data[j][1]),
            lon: parseFloat(data[j][2])
          });
        }
        points.shift();
        let cent = geocenter(points);
        //console.log(cent);
        var midsy = JSON.parse(
          JSON.stringify(cent).replace('"lon":', '"lng":')
        );
        //console.log(midsy);
        res.render("map", {
          mids: midsy,
          data: value[0],
          count: value[1]
        });
      }
    );
  });
});

function helper(uniqData) {
  let locData = new Array();
  let countOfNoLocation = 0;
  for (x in uniqData) {
    if (uniqData[x].locations !== "") {
      var patt = new RegExp("gps((.*))hA");
      var res = patt.exec(uniqData[x].locations);
      var newarr = [
        uniqData[x].message +
          "\n" +
          uniqData[x].time +
          "\n" +
          uniqData[x].battery +
          "%",
        uniqData[x].latitude,
        uniqData[x].longitude
      ];
      locData.push(newarr);
    } else {
      countOfNoLocation = countOfNoLocation + 1;
    }
  }
  return [locData, countOfNoLocation];
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
