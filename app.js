let express = require("express");
let db = require("./configs/db");
let user = require("./routes/user.js");
let cors = require("cors");
let app = express();
let axios = require("axios");
app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/user", user);
app.get("/", (req, res) => {
  res.send("Server set");
});

app.post("/run", (req, res) => {
  var data = JSON.stringify({
    code: req.body.code,
    language: req.body.language,
    input: req.body.input,
  });

  var config = {
    method: "post",
    url: "https://codexweb.netlify.app/.netlify/functions/enforceCode",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(response.data);
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});
