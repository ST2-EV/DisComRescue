const express = require("express");
const port = 3000;
const connectDB = require("./config/db");
const block = require('./models/blockchain');
const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.post("/sendData", (req, res) => {
    for(var i = 0; i < req.body.length; i++) {
        var obj = json[i];
        const {
            index,
            time,
            locations, 
            message,
            nounce,
            battery,
            prehash
          } = obj;
      
          const blockFields = {};
          if (index) jobFields.CustomerName = CustomerName;
          if (time) jobFields.MemoNumber = MemoNumber;
          //@todo need to handle the json array passed in locations and added to the db
          if (locations) jobFields.CustomerAddress = CustomerAddress;
          if (message) jobFields.TelephoneNumber = TelephoneNumber;
          if (nounce) jobFields.Equipment = Equipment;
          if (battery) jobFields.Make = Make;
          if (prehash) jobFields.Model = Model;
          try {
            //@todo code to update the chain if something new is getting added
            // let job = await Job.findOne({ MemoNumber });
            // if (job) {
            //   job = await Job.findOneAndUpdate(
            //     { MemoNumber: MemoNumber },
            //     { $set: jobFields },
            //     { new: true }
            //   );
            //   return res.json(job);
            // }
      
            block = new Block(blockFields);
            await block.save();
            res.json(block);
          } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
          }
    
        
    }
};

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
