const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  fs.readFile("token", (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res
        .status(200)
        .header({ "Content-Type": "application/json" })
        .send(data.toString());
    }
  });
});

app.post("/", (req, res) => {
  fs.writeFile("token", JSON.stringify(req.body), (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log(req.body);
      res.status(200).send(req.body);
    }
  });
});

//get ip
const { networkInterfaces } = require("os");

const nets = networkInterfaces();
var result;

for (const name of Object.keys(nets)) {
  for (const net of nets[name]) {
    // skip over non-ipv4 and internal (i.e. 127.0.0.1) addresses
    if (net.family === "IPv4" && !net.internal) {
      result = net.address;
    }
  }
}

app.listen(port, () => {
  console.log(`
  ____              _   _  __       _ _ _      
 / ___| _ __   ___ | |_(_)/ _| __ _(_) | | ___ 
 \\___ \\| '_ \\ / _ \\| __| | |_ / _\` | | | |/ _ \\
  ___) | |_) | (_) | |_| |  _| (_| | | | |  __/
 |____/| .__/ \\___/ \\__|_|_|  \\__,_|_|_|_|\\___|
       |_|                                     
`);
  console.log(`Spotifaille node server listening on ${result}:${port}!`);
});
